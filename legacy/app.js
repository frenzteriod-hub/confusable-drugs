// ==========================================================================
// CDSS Application State & Globals
// ==========================================================================
let drugsDatabase = [];
let selectedDrug = null;
let currentThreshold = 0.82;
let activePage = "auditor"; // "auditor", "directory", "alerts", "settings", "filipino"
let directorySearchQuery = "";
let directoryCategoryQuery = "";
let alertsSearchQuery = "";
let alertsMode = "generic";
let filipinoNameMode = "generic";
let filipinoSearchQuery = "";
let filipinoPairsCache = null;
let preparedDrugRecords = [];
let preparedDrugRecordsById = new Map();
const alertsPairsCache = new Map();
const filipinoPairsCacheByKey = new Map();
const MAX_RENDERED_PAIRS = 500;

window.handleDirectoryCategoryChange = function(val) {
    directoryCategoryQuery = val;
    renderDirectory();
};

window.applyDirectorySearchCorrection = function(correctedName) {
    document.getElementById("directory-search-input").value = correctedName;
    directorySearchQuery = correctedName.toLowerCase().trim();
    renderDirectory();
};

// Hardcoded Official TML Map for Known Confusable Medications
const OFFICIAL_TALL_MAN = {
    "tramadol": "traMADol", "trazodone": "traZODone",
    "hydroxyzine": "hydrOXYzine", "hydralazine": "hydrALAzine",
    "metformin": "metFORmin", "metronidazole": "metRONidazole",
    "prednisone": "predniSONE", "prednisolone": "predniSOLONE",
    "bupropion": "buPROpropion", "buspirone": "busPIRone",
    "ranitidine": "ranitidine", "cetirizine": "cetirizine",
    "celecoxib": "celecoxib", "citalopram": "citalopram",
    "lamotrigine": "lamotrigine", "terbinafine": "terbinafine",
    "olanzapine": "olanzapine", "propranolol": "propranolol",
    "amlodipine": "amLODIPine", "amiodarone": "aMIODarone",
    "clonazepam": "clonazepam", "clonidine": "clONIdine",
    "dopamine": "Dopamine", "dobutamine": "Dobutamine",
    "ephedrine": "ephedrine", "epinephrine": "epinephrine",
    "paroxetine": "paroxetine", "clopidogrel": "clopidogrel",
    "fexofenadine": "fexofenadine", "sildenafil": "sildenafil",
    "niacin/lovastatin": "niacin/lovastatin", "fluticasone/salmeterol": "fluticasone/salmeterol",
    "loratadine": "loratadine", "desloratadine": "desloratadine",
    "paclitaxel": "paclitaxel", "docetaxel": "docetaxel",
    "vinblastine": "vinBLAStine", "vincristine": "vinCRIStine",
    "ultram": "Ultram", "desyrel": "Desyrel", "atarax": "Atarax",
    "apresoline": "Apresoline", "glucophage": "Glucophage", "flagyl": "Flagyl",
    "deltasone": "Deltasone", "prelone": "Prelone", "wellbutrin": "Wellbutrin",
    "buspar": "Buspar", "zantac": "Zantac", "zyrtec": "Zyrtec",
    "celebrex": "Celebrex", "celexa": "Celexa", "lamictal": "Lamictal",
    "lamisil": "Lamisil", "zyprexa": "Zyprexa", "adderall": "Adderall",
    "inderal": "Inderal", "norvasc": "Norvasc", "cordarone": "Cordarone",
    "klonopin": "Klonopin", "catapres": "Catapres", "intropin": "Intropin",
    "dobutrex": "Dobutrex", "akovaz": "Akovaz", "epipen": "EpiPen",
    "paxil": "Paxil", "plavix": "Plavix", "allegra": "Allegra",
    "viagra": "Viagra", "advicor": "Advicor", "advair": "Advair",
    "claritin": "Claritin", "clarinex": "Clarinex", "taxol": "Taxol",
    "taxotere": "Taxotere", "velban": "Velban", "oncovin": "Oncovin"
};

// Verified High-Risk Clinical LASA Overrides (ISMP Reference List)
const KNOWN_LASA_PAIRS = {
    "tramadol": "trazodone", "trazodone": "tramadol",
    "hydroxyzine": "hydralazine", "hydralazine": "hydroxyzine",
    "metformin": "metronidazole", "metronidazole": "metformin",
    "prednisone": "prednisolone", "prednisolone": "prednisone",
    "bupropion": "buspirone", "buspirone": "bupropion",
    "ranitidine": "cetirizine", "cetirizine": "ranitidine",
    "amlodipine": "amiodarone", "amiodarone": "amlodipine",
    "clonazepam": "clonidine", "clonidine": "clonazepam",
    "dopamine": "dobutamine", "dobutamine": "dopamine",
    "ephedrine": "epinephrine", "epinephrine": "ephedrine",
    "vinblastine": "vincristine", "vincristine": "vinblastine",
    "paclitaxel": "docetaxel", "docetaxel": "paclitaxel"
};

const NAME_TYPE_META = {
    generic: { label: "Generic", badge: "generic" },
    brand: { label: "Brand", badge: "brand" }
};

function getDrugNameByType(drug, type) {
    return type === "generic" ? drug.generic_name : drug.brand_name;
}

function getOppositeDrugName(drug, type) {
    return type === "generic" ? drug.brand_name : drug.generic_name;
}

function getComparisonCandidates(drugA, drugB, mode) {
    const typePairs = {
        generic: [["generic", "generic"]],
        brand: [["brand", "brand"]],
        cross: [["generic", "brand"], ["brand", "generic"]],
        all: [["generic", "generic"], ["brand", "brand"], ["generic", "brand"], ["brand", "generic"]]
    }[mode] || [["generic", "generic"]];

    return typePairs.map(([typeA, typeB]) => ({
        drugA,
        drugB,
        typeA,
        typeB,
        nameA: getDrugNameByType(drugA, typeA),
        nameB: getDrugNameByType(drugB, typeB),
        oppNameA: getOppositeDrugName(drugA, typeA),
        oppNameB: getOppositeDrugName(drugB, typeB)
    })).filter(candidate => candidate.nameA && candidate.nameB);
}

function buildPreparedDrugRecords() {
    preparedDrugRecords = drugsDatabase.map(drug => {
        const genericNorm = normalizeDrugName(drug.generic_name);
        const brandNorm = normalizeDrugName(drug.brand_name);

        return {
            drug,
            generic: {
                type: "generic",
                name: drug.generic_name,
                otherName: drug.brand_name,
                norm: genericNorm,
                lower: (drug.generic_name || "").toLowerCase(),
                otherLower: (drug.brand_name || "").toLowerCase(),
                length: genericNorm.length,
                soundex: soundexEncode(genericNorm)
            },
            brand: {
                type: "brand",
                name: drug.brand_name,
                otherName: drug.generic_name,
                norm: brandNorm,
                lower: (drug.brand_name || "").toLowerCase(),
                otherLower: (drug.generic_name || "").toLowerCase(),
                length: brandNorm.length,
                soundex: soundexEncode(brandNorm)
            }
        };
    });
    preparedDrugRecordsById = new Map(preparedDrugRecords.map(record => [record.drug.id, record]));
    alertsPairsCache.clear();
    filipinoPairsCacheByKey.clear();
    filipinoPairsCache = null;
}

function getPreparedEntries(recordA, recordB, mode) {
    const typePairs = {
        generic: [["generic", "generic"]],
        brand: [["brand", "brand"]],
        cross: [["generic", "brand"], ["brand", "generic"]],
        all: [["generic", "generic"], ["brand", "brand"], ["generic", "brand"], ["brand", "generic"]]
    }[mode] || [["generic", "generic"]];

    return typePairs.map(([typeA, typeB]) => ({
        drugA: recordA.drug,
        drugB: recordB.drug,
        typeA,
        typeB,
        entryA: recordA[typeA],
        entryB: recordB[typeB],
        nameA: recordA[typeA].name,
        nameB: recordB[typeB].name,
        oppNameA: recordA[typeA].otherName,
        oppNameB: recordB[typeB].otherName
    })).filter(candidate => candidate.entryA.norm && candidate.entryB.norm);
}

function codesSimilarity(code1, code2) {
    if (code1 === code2) return 1.0;
    let matches = 0;
    for (let i = 0; i < 4; i++) if (code1[i] === code2[i]) matches++;
    return matches / 4.0;
}

function isLikelySameDrugVariant(normA, normB, soundexSim = 0) {
    if (!normA || !normB) return true;
    if (normA === normB) return true;

    const tokensA = normA.split(/\s+/).filter(Boolean);
    const tokensB = normB.split(/\s+/).filter(Boolean);
    const extraTerms = new Set([
        "hcl", "hfa", "hct", "af", "er", "xr", "sr", "dr", "cr", "cd", "od", "la", "xl",
        "delayed", "extended", "release", "solution", "tablet", "capsule"
    ]);

    const stripExtraTerms = tokens => tokens.filter(token => !extraTerms.has(token)).join(" ");
    if (stripExtraTerms(tokensA) === stripExtraTerms(tokensB)) return true;

    const shorter = normA.length <= normB.length ? normA : normB;
    const longer = normA.length > normB.length ? normA : normB;
    if (longer.startsWith(shorter) && longer.slice(shorter.length).trim().split(/\s+/).every(token => extraTerms.has(token))) {
        return true;
    }

    if (tokensA.length === 1 && tokensB.length === 1 && Math.min(normA.length, normB.length) >= 7) {
        return levenshteinDistance(normA, normB) <= 1 && soundexSim >= 0.75;
    }

    if (tokensA.length === tokensB.length) {
        let changedLongTokenCount = 0;
        for (let i = 0; i < tokensA.length; i++) {
            if (tokensA[i] === tokensB[i]) continue;
            if (Math.min(tokensA[i].length, tokensB[i].length) < 6 || levenshteinDistance(tokensA[i], tokensB[i]) > 1) {
                return false;
            }
            changedLongTokenCount++;
        }
        return changedLongTokenCount === 1 && soundexSim >= 0.75;
    }

    return false;
}

function namesMatchSearch(candidate, query) {
    if (!query) return true;
    return (
        candidate.entryA.lower.includes(query) ||
        candidate.entryB.lower.includes(query) ||
        candidate.entryA.otherLower.includes(query) ||
        candidate.entryB.otherLower.includes(query)
    );
}

function isStandardLASAMatch(jw, soundexSim, normA, normB, threshold) {
    return (
        jw >= threshold ||
        (jw >= 0.75 && soundexSim >= 0.75) ||
        (KNOWN_LASA_PAIRS[normA] === normB || KNOWN_LASA_PAIRS[normB] === normA)
    );
}

function isFilipinoLASAMatch(pocaBlended, normA, normB, threshold) {
    const override = KNOWN_LASA_PAIRS[normA] === normB || KNOWN_LASA_PAIRS[normB] === normA;
    if (override) return true;
    if (Math.min(normA.length, normB.length) < 5) return false;
    return pocaBlended >= threshold;
}

function getPreparedNameEntries(mode) {
    const entries = [];
    for (const record of preparedDrugRecords) {
        if (mode === "generic" || mode === "cross" || mode === "all") {
            entries.push({ record, entry: record.generic });
        }
        if (mode === "brand" || mode === "cross" || mode === "all") {
            entries.push({ record, entry: record.brand });
        }
    }
    return entries;
}

function getLengthSortedNameEntries(mode) {
    return getPreparedNameEntries(mode).sort((a, b) => a.entry.length - b.entry.length);
}

function getFilipinoLengthSortedEntries(mode) {
    return getPreparedNameEntries(mode).sort((a, b) => {
        return getFilipinoPrepared(a.entry).length - getFilipinoPrepared(b.entry).length;
    });
}

function isAllowedNameTypePair(typeA, typeB, mode) {
    if (mode === "generic") return typeA === "generic" && typeB === "generic";
    if (mode === "brand") return typeA === "brand" && typeB === "brand";
    if (mode === "cross") return typeA !== typeB;
    return true;
}

function makePairCandidate(left, right) {
    return {
        drugA: left.record.drug,
        drugB: right.record.drug,
        typeA: left.entry.type,
        typeB: right.entry.type,
        entryA: left.entry,
        entryB: right.entry,
        nameA: left.entry.name,
        nameB: right.entry.name,
        oppNameA: left.entry.otherName,
        oppNameB: right.entry.otherName
    };
}

function normalizeDrugName(name) {
    if (!name) return "";
    let norm = name.toLowerCase().trim();
    const saltSuffixes = [
        /\bhydrochloride\b/g, /\bphosphate\b/g, /\bsulfate\b/g, /\bsulphate\b/g,
        /\bmaleate\b/g, /\bsodium\b/g, /\bcalcium\b/g, /\bpotassium\b/g,
        /\btartrate\b/g, /\bmesylate\b/g, /\bacetate\b/g, /\bvalerate\b/g,
        /\bfumarate\b/g, /\bsuccinate\b/g, /\bchloride\b/g, /\bbromide\b/g,
        /\biodide\b/g, /\bbesylate\b/g, /\bmonohydrate\b/g, /\bdihydrate\b/g,
        /\btrihydrate\b/g, /\bhemihydrate\b/g, /\banhydrous\b/g,
        /\btopical\b/g, /\bgel\b/g, /\bcream\b/g, /\bointment\b/g,
        /\binjection\b/g, /\bophthalmic\b/g, /\bnasal\b/g, /\bspray\b/g
    ];
    for (let pattern of saltSuffixes) {
        norm = norm.replace(pattern, '');
    }
    norm = norm.replace(/[^\w\s]/g, '');
    norm = norm.replace(/\band\b/g, ' ');
    norm = norm.replace(/\s+/g, ' ').trim();
    return norm;

}

// ==========================================================================
// Initialization & Loading Data
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    loadDatabase();
    
    // Bind Enter key on audit console
    document.getElementById("smart-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            triggerSmartCheck();
        }
    });
});

function loadDatabase() {
    // Load from hardcoded database (drugs_db.js) — no fetch needed for Vercel deployment
    if (typeof DRUGS_DATABASE !== 'undefined' && DRUGS_DATABASE.length > 0) {
        drugsDatabase = DRUGS_DATABASE;
        buildPreparedDrugRecords();
        console.log(`CDSS loaded ${drugsDatabase.length} medications from hardcoded database.`);
        renderDirectory();
    } else {
        console.error("Error: DRUGS_DATABASE not found. Ensure drugs_db.js is loaded.");
        document.getElementById("auditor-report-box").innerHTML = `
            <div class="welcome-box" style="border-color: var(--color-danger); color: var(--color-danger)">
                <h3>⚠️ Database Not Found</h3>
                <p>Failed to load medication database. Ensure <code>drugs_db.js</code> is included before <code>app.js</code>.</p>
            </div>
        `;
    }
}

// ==========================================================================
// Page Routing Navigation
// ==========================================================================
window.switchPage = function(pageId) {
    activePage = pageId;
    
    // Toggle active link highlights
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    document.getElementById(`nav-btn-${pageId}`).classList.add("active");
    
    // Toggle active page views
    document.querySelectorAll(".page-view").forEach(view => {
        view.classList.remove("active");
    });
    document.getElementById(`page-${pageId}`).classList.add("active");
    
    // Render target page contents
    if (pageId === "directory") {
        renderDirectory();
        document.getElementById("directory-search-input").focus();
    } else if (pageId === "alerts") {
        renderAlerts();
        document.getElementById("alerts-search-input").focus();
    } else if (pageId === "filipino") {
        renderFilipinoLASA();
        document.getElementById("filipino-search-input").focus();
    }
};

// ==========================================================================
// Page 1: Prescription Auditor Logic
// ==========================================================================
window.clearSmartInput = function() {
    document.getElementById("smart-input").value = "";
    
    // Restore guide instructions
    document.getElementById("auditor-report-box").innerHTML = `
        <div class="welcome-box glass-card">
            <h3>💡 Clinical Decision Guide</h3>
            <p class="welcome-text">Use this CDSS portal to verify prescription safety and identify orthographic look-alike sound-alike drug name confusions.</p>
            <div class="guide-steps">
                <div class="step-item">
                    <span class="step-num">1</span>
                    <div>
                        <strong>Verify Prescription</strong>
                        <p>Paste medical orders in the audit console above to identify typos and critical drug name overlaps.</p>
                    </div>
                </div>
                <div class="step-item">
                    <span class="step-num">2</span>
                    <div>
                        <strong>Explore Drug Profiles</strong>
                        <p>Browse the Drug Directory or look at the active LASA alert table to explore FDA reference safety reports.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.triggerSmartCheck = function() {
    const text = document.getElementById("smart-input").value.trim();
    if (!text) {
        alert("Please enter prescription text to audit.");
        return;
    }
    
    // Check if single word -> load drug modal details directly
    const words = text.split(/\s+/).filter(w => w.length > 0);
    if (words.length === 1) {
        const matches = drugsDatabase.filter(d => 
            d.brand_name.toLowerCase().includes(text.toLowerCase()) || 
            d.generic_name.toLowerCase().includes(text.toLowerCase())
        );
        if (matches.length > 0) {
            openDrugModal(matches[0].id);
            return;
        }
    }
    
    // Multi-word audit
    auditPrescription(text);
};

// ==========================================================================
// ClinicalBERT Contextual ML & Embedding Space Simulation
// ==========================================================================
const DIAGNOSIS_VECTORS = {
    depression:   [0.0, 1.0, 0.0, 0.0, 0.0],  // Cardiology, Psychiatry/Neurology, Immunology/Pain, Endocrinology, Pulmonology
    arthritis:    [0.0, 0.2, 0.9, 0.0, 0.0],
    hypertension: [0.95, 0.0, 0.0, 0.1, 0.0],
    diabetes:     [0.1, 0.0, 0.0, 0.95, 0.0],
    infection:    [0.0, 0.0, 0.95, 0.0, 0.0]
};

function getDrugVector(d) {
    const lowerGen = d.generic_name.toLowerCase();
    const lowerBrand = d.brand_name.toLowerCase();
    
    // Explicit overrides for the classic Celebrex vs Celexa vs Cerebyx confusion
    if (lowerBrand.includes("celebrex") || lowerGen.includes("celecoxib")) {
        return [0.0, 0.2, 0.9, 0.0, 0.0]; // Rheumatoid Arthritis/Pain
    }
    if (lowerBrand.includes("celexa") || lowerGen.includes("citalopram")) {
        return [0.0, 1.0, 0.0, 0.0, 0.0]; // Psychiatry/Depression
    }
    if (lowerBrand.includes("cerebyx") || lowerGen.includes("fosphenytoin")) {
        return [0.0, 0.95, 0.1, 0.0, 0.0]; // Neurology/Seizures
    }

    // Common overrides
    if (lowerBrand.includes("zantac") || lowerGen.includes("ranitidine")) {
        return [0.0, 0.0, 0.1, 0.0, 0.0]; // GI / Acid
    }
    if (lowerBrand.includes("xanax") || lowerGen.includes("alprazolam")) {
        return [0.0, 1.0, 0.0, 0.0, 0.0]; // CNS
    }

    // Default mappings based on broad category
    switch (d.broad_category) {
        case "Cardiovascular System":
            return [0.95, 0.05, 0.05, 0.1, 0.05];
        case "Central Nervous System":
            return [0.05, 0.95, 0.05, 0.05, 0.05];
        case "Antimicrobials & Infectious Diseases":
            return [0.05, 0.05, 0.95, 0.05, 0.05];
        case "Endocrine & Metabolic":
            return [0.15, 0.05, 0.05, 0.95, 0.05];
        case "Respiratory & Allergy":
            return [0.05, 0.05, 0.05, 0.05, 0.95];
        case "Gastrointestinal System":
            return [0.05, 0.05, 0.2, 0.1, 0.05];
        case "Oncology & Immunology":
            return [0.05, 0.1, 0.9, 0.1, 0.05];
        default:
            return [0.2, 0.2, 0.2, 0.2, 0.2];
    }
}

function cosineSimilarity(v1, v2) {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < v1.length; i++) {
        dot += v1[i] * v2[i];
        normA += v1[i] * v1[i];
        normB += v2[i] * v2[i];
    }
    return normB === 0 || normA === 0 ? 0 : dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function auditPrescription(text) {
    const reportBox = document.getElementById("auditor-report-box");
    const words = text.match(/\b[a-zA-Z]+(?:\/[a-zA-Z]+)?\b/g) || [];
    const warnings = [];
    const scannedTerms = new Set();
    const foundDrugs = [];
    
    const textLower = text.toLowerCase();
    for (let d of drugsDatabase) {
        const genRegex = new RegExp(`\\b${escapeRegExp(d.generic_name)}\\b`);
        const brandRegex = new RegExp(`\\b${escapeRegExp(d.brand_name.toLowerCase())}\\b`);
        
        if (genRegex.test(textLower) || brandRegex.test(textLower)) {
            foundDrugs.push(d);
        }
    }

    // Context Anomaly Checks (ClinicalBERT Vector Embeddings check)
    const selectedDiag = document.getElementById("patient-diagnosis-select").value;
    if (selectedDiag !== "none") {
        const diagVector = DIAGNOSIS_VECTORS[selectedDiag];
        for (let d of foundDrugs) {
            const drugVector = getDrugVector(d);
            const contextScore = cosineSimilarity(diagVector, drugVector);
            
            if (contextScore < 0.3) {
                let bestAlt = null;
                let bestAltScore = 0;
                
                for (let other of drugsDatabase) {
                    if (other.id === d.id) continue;
                    
                    const normA = normalizeDrugName(d.generic_name);
                    const normB = normalizeDrugName(other.generic_name);
                    const sim = jaroWinklerSimilarity(normA, normB);
                    
                    if (sim >= 0.72) {
                        const otherVector = getDrugVector(other);
                        const otherContextScore = cosineSimilarity(diagVector, otherVector);
                        if (otherContextScore >= 0.8 && otherContextScore > bestAltScore) {
                            bestAltScore = otherContextScore;
                            bestAlt = other;
                        }
                    }
                }
                
                warnings.push({
                    type: "CONTEXT_ANOMALY",
                    term: d.brand_name,
                    matchedDrug: d,
                    diagnosis: document.getElementById("patient-diagnosis-select").options[document.getElementById("patient-diagnosis-select").selectedIndex].text.split(" (")[0],
                    similarity: contextScore,
                    suggestion: bestAlt,
                    suggestionContextScore: bestAltScore
                });
            }
        }
    }
    
    // LASA Warnings
    for (let d of foundDrugs) {
        let similar = findSimilarDrugsLocal(d.generic_name, 0.83);
        if (similar.length > 0) {
            warnings.push({
                type: "LASA_WARNING",
                term: d.brand_name,
                matchedDrug: d,
                confusableWith: similar.slice(0, 3)
            });
        }
    }
    
    // Spelling Typos
    for (let word of words) {
        if (word.length < 4) continue;
        let wordLower = word.toLowerCase();
        if (scannedTerms.has(wordLower)) continue;
        
        if (["tablet", "tablets", "capsule", "capsules", "daily", "every", "dose", "twice", "times", "water", "food", "take", "with", "oral", "mg", "ml", "at", "bedtime", "orally"].includes(wordLower)) {
            continue;
        }
        
        scannedTerms.add(wordLower);
        
        let isMatched = false;
        for (let d of foundDrugs) {
            if (d.generic_name.includes(wordLower) || d.brand_name.toLowerCase().includes(wordLower)) {
                isMatched = true;
                break;
            }
        }
        if (isMatched) continue;
        
        let similar = findSimilarDrugsLocal(wordLower, 0.83);
        if (similar.length > 0) {
            warnings.push({
                type: "SPELLING_CORRECTION",
                term: word,
                suggestions: similar.slice(0, 3)
            });
        }
    }
    
    // Render Report Items
    if (warnings.length === 0) {
        reportBox.innerHTML = `
            <div class="audit-report-wrapper">
                <div class="audit-alert-card alert-success">
                    <span class="audit-icon">✅</span>
                    <div class="audit-details-block">
                        <h4>All Verification Audits Cleared</h4>
                        <p>No critical Look-Alike Sound-Alike (LASA) safety warnings or spelling errors were flagged in this prescription.</p>
                        <p class="small-text text-muted">Checked ${drugsDatabase.length} records. Standard clinical validation should always be executed prior to dispensing.</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        reportBox.innerHTML = `
            <div class="audit-report-wrapper">
                <h3 style="color: var(--color-primary); font-size: 1.15rem; margin-bottom: 4px;">Audit Scan Report (${warnings.length} alerts)</h3>
                ${warnings.map(w => {
                    if (w.type === "CONTEXT_ANOMALY") {
                        const suggestionHTML = w.suggestion 
                            ? `<div style="margin-top: 8px; padding: 10px; background: rgba(255, 255, 255, 0.7); border-radius: 4px; border-left: 3px solid #10b981;">
                                  <strong>💡 ClinicalBERT Suggestion:</strong> Did you mean <strong>${w.suggestion.brand_name}</strong> <span class="badge-brand">Brand</span> (generic: <em>${w.suggestion.generic_name}</em>) which has a <strong>${(w.suggestionContextScore * 100).toFixed(0)}% Context Match</strong>?
                               </div>`
                            : '';
                        return `
                            <div class="audit-alert-card alert-danger" style="background: #fff7ed; border-color: #ffedd5; color: #c2410c; border-left: 4px solid #f97316;">
                                <span class="audit-icon" style="color: #f97316;">🧠</span>
                                <div class="audit-details-block">
                                    <h4 style="color: #9a3412;">Clinical Context Anomaly Detected</h4>
                                    <p>Prescribed drug <strong>${w.term}</strong> (${w.matchedDrug.generic_name}) has a <strong>${(w.similarity * 100).toFixed(0)}% ClinicalBERT context match</strong> with the patient's diagnosis of <strong>${w.diagnosis}</strong>.</p>
                                    <p class="small-text" style="color: #ea580c; margin-top: 4px;">Anomalous vector placement detected in ClinicalBERT embedding space.</p>
                                    ${suggestionHTML}
                                </div>
                            </div>
                        `;
                    } else if (w.type === "LASA_WARNING") {
                        return `
                            <div class="audit-alert-card alert-danger">
                                <span class="audit-icon">⚠️</span>
                                <div class="audit-details-block">
                                    <h4>Critical LASA warning: ${w.matchedDrug.brand_name} <span class="badge-brand">Brand</span></h4>
                                    <p>Prescribed term matches generic name: <em>${w.matchedDrug.generic_name}</em> <span class="badge-generic">Generic</span> (${w.matchedDrug.therapeutic_class}).</p>
                                    <div class="audit-sub-box">
                                        <div class="small-text text-muted font-bold" style="margin-bottom: 6px;">HIGH-RISK CONFUSABLE INVENTORY:</div>
                                        ${w.confusableWith.map(c => `
                                            <div class="lasa-warning-row">
                                                <span class="lasa-warning-name" style="cursor: pointer; text-decoration: underline;" onclick="openDrugModal('${c.drug.id}')">${formatTallmanHTML(c.tmlMatch)} <span class="badge-generic">Generic</span> (${c.drug.brand_name} <span class="badge-brand">Brand</span>)</span>
                                                <span class="lasa-score-badge score-danger">${(c.similarity * 100).toFixed(0)}% Similarity</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="audit-alert-card alert-warning">
                                <span class="audit-icon">❓</span>
                                <div class="audit-details-block">
                                    <h4>Unrecognized Drug spelling: '${w.term}'</h4>
                                    <p>Term matches zero records exactly. Did you mean one of these?</p>
                                    <div class="audit-sub-box">
                                        ${w.suggestions.map(s => `
                                            <div class="lasa-warning-row" style="cursor: pointer" onclick="replaceTypo('${w.term}', '${s.drug.brand_name}')">
                                                <span class="lasa-warning-name">👉 ${formatTallmanHTML(s.tmlMatch)} <span class="badge-generic">Generic</span> (${s.drug.brand_name} <span class="badge-brand">Brand</span>)</span>
                                                <div style="display: flex; align-items: center; gap: 8px;">
                                                    <span class="lasa-score-badge score-warning">${(s.similarity * 100).toFixed(0)}% Similarity</span>
                                                    <button class="btn btn-secondary btn-sm" style="padding: 2px 6px; font-size: 0.72rem;" onclick="event.stopPropagation(); openDrugModal('${s.drug.id}')">ℹ️ Info</button>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        `;
    }
}

window.replaceTypo = function(original, replacement) {
    const textarea = document.getElementById("smart-input");
    const regex = new RegExp(`\\b${original}\\b`, 'g');
    textarea.value = textarea.value.replace(regex, replacement);
    triggerSmartCheck();
};

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ==========================================================================
// Page 2: Drug Directory Logic
// ==========================================================================
window.handleDirectorySearch = function(val) {
    directorySearchQuery = val.toLowerCase().trim();
    renderDirectory();
};

function renderDirectory() {
    const grid = document.getElementById("directory-list-container");
    const countBadge = document.getElementById("directory-count");
    
    if (drugsDatabase.length === 0) {
        grid.innerHTML = `<div class="text-muted text-center" style="grid-column: 1/-1; padding: 40px;">Database empty.</div>`;
        return;
    }
    
    const filtered = drugsDatabase.filter(d => {
        const matchSearch = !directorySearchQuery || 
            d.brand_name.toLowerCase().includes(directorySearchQuery) || 
            d.generic_name.toLowerCase().includes(directorySearchQuery) || 
            d.therapeutic_class.toLowerCase().includes(directorySearchQuery) ||
            (d.broad_category && d.broad_category.toLowerCase().includes(directorySearchQuery));
            
        const matchCategory = !directoryCategoryQuery || 
            d.broad_category === directoryCategoryQuery;
            
        return matchSearch && matchCategory;
    });
    
    countBadge.innerText = `${filtered.length} Medications`;
    
    if (filtered.length === 0) {
        let suggestionHTML = "";
        if (directorySearchQuery && directorySearchQuery.length >= 3) {
            const similar = findSimilarDrugsLocal(directorySearchQuery, 0.72);
            if (similar.length > 0) {
                const bestMatch = similar[0].drug.brand_name;
                suggestionHTML = `
                    <div class="search-did-you-mean-container">
                        🔍 No exact matches found. Did you mean: 
                        <span class="search-did-you-mean" onclick="applyDirectorySearchCorrection('${bestMatch}')">${bestMatch}</span>?
                    </div>
                `;
            }
        }
        grid.innerHTML = `
            <div class="text-muted text-center" style="grid-column: 1/-1; padding: 20px 40px;">
                No medications found matching your criteria.
            </div>
            ${suggestionHTML}
        `;
        return;
    }
    
    // Sort directory cards alphabetically by brand name
    const sorted = [...filtered].sort((a, b) => a.brand_name.localeCompare(b.brand_name));
    
    grid.innerHTML = sorted.map(d => `
        <div class="directory-item-card" onclick="openDrugModal('${d.id}')">
            <div>
                <div class="directory-card-brand">${d.brand_name} <span class="badge-brand">Brand</span></div>
                <div class="directory-card-generic">${d.generic_name} <span class="badge-generic">Generic</span></div>
            </div>
            <div class="directory-card-class">
                <span class="class-label">${d.therapeutic_class}</span>
                ${d.broad_category ? `<span class="category-badge cat-${d.broad_category.toLowerCase().replace(/[^a-z0-9]/g, '-')}">${d.broad_category}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// ==========================================================================
// Page 3: LASA Alerts Table Logic
// ==========================================================================
window.handleAlertsModeChange = function(val) {
    alertsMode = val;
    renderAlerts();
};

window.handleAlertsSearch = function(val) {
    alertsSearchQuery = val.toLowerCase().trim();
    renderAlerts();
};

function inflateCachedPair(row) {
    const recordA = preparedDrugRecordsById.get(row[0]);
    const recordB = preparedDrugRecordsById.get(row[2]);
    if (!recordA || !recordB) return null;

    const typeA = row[1];
    const typeB = row[3];
    const left = { record: recordA, entry: recordA[typeA] };
    const right = { record: recordB, entry: recordB[typeB] };
    const candidate = makePairCandidate(left, right);
    const normA = candidate.entryA.norm;
    const normB = candidate.entryB.norm;
    const sdxMatch = row[6];
    if (isLikelySameDrugVariant(normA, normB, sdxMatch)) return null;
    const [tmlA, tmlB] = generateTallManLettering(normA, normB);

    return {
        ...candidate,
        normA,
        normB,
        similarity: row[5],
        levDistance: levenshteinDistance(normA, normB),
        sdxMatch,
        tmlA,
        tmlB
    };
}

function computeAlertsLASAPairs(mode, threshold) {
    const cacheKey = `${mode}|${threshold.toFixed(2)}`;
    if (alertsPairsCache.has(cacheKey)) {
        return alertsPairsCache.get(cacheKey);
    }

    if (typeof LASA_PAIRS_CACHE !== "undefined" && Array.isArray(LASA_PAIRS_CACHE)) {
        const cachedPairs = LASA_PAIRS_CACHE
            .filter(row => {
                const rowMode = row[4];
                const jw = row[5];
                const sdx = row[6];
                const override = row[7] === 1;
                return (mode === "all" || rowMode === mode) && (
                    jw >= threshold ||
                    (jw >= 0.75 && sdx >= 0.75) ||
                    override
                );
            })
            .map(row => inflateCachedPair(row))
            .filter(Boolean)
            .sort((a, b) => b.similarity - a.similarity);
        alertsPairsCache.set(cacheKey, cachedPairs);
        return cachedPairs;
    }

    const pairs = [];
    const seen = new Set();
    const entries = getLengthSortedNameEntries(mode);
    const len = entries.length;

    for (let i = 0; i < len; i++) {
        const left = entries[i];

        for (let j = i + 1; j < len; j++) {
            const right = entries[j];
            if (left.record.drug.id === right.record.drug.id) continue;
            if (!isAllowedNameTypePair(left.entry.type, right.entry.type, mode)) continue;

            const normA = left.entry.norm;
            const normB = right.entry.norm;
            if (normA === normB) continue;

            if (right.entry.length - left.entry.length > 4) break;

            const sim = jaroWinklerSimilarity(normA, normB);
            const soundexSim = codesSimilarity(left.entry.soundex, right.entry.soundex);
            if (isLikelySameDrugVariant(normA, normB, soundexSim)) continue;

            const isLasa = isStandardLASAMatch(sim, soundexSim, normA, normB, threshold);

            if (!isLasa) continue;

            const pairKey = [
                `${left.record.drug.id}:${left.entry.type}:${normA}`,
                `${right.record.drug.id}:${right.entry.type}:${normB}`
            ].sort().join("::");
            if (seen.has(pairKey)) continue;
            seen.add(pairKey);

            const candidate = makePairCandidate(left, right);
            const [tmlA, tmlB] = generateTallManLettering(normA, normB);
            pairs.push({
                ...candidate,
                normA,
                normB,
                similarity: sim,
                levDistance: levenshteinDistance(normA, normB),
                sdxMatch: soundexSim,
                tmlA,
                tmlB
            });
        }
    }

    pairs.sort((a, b) => b.similarity - a.similarity);
    alertsPairsCache.set(cacheKey, pairs);
    return pairs;
}

function renderAlerts() {
    const tbody = document.getElementById("alerts-tbody");
    const countBadge = document.getElementById("alerts-count");
    
    tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 40px;">Calculating ${alertsMode} LASA matches across the database...</td></tr>`;
    
    setTimeout(() => {
        const pairs = computeAlertsLASAPairs(alertsMode, currentThreshold);
        const filtered = alertsSearchQuery ? pairs.filter(p => namesMatchSearch(p, alertsSearchQuery)) : pairs;
        const renderedPairs = filtered.slice(0, MAX_RENDERED_PAIRS);
        countBadge.innerText = filtered.length > MAX_RENDERED_PAIRS
            ? `${filtered.length} Pairs Detected · Showing ${MAX_RENDERED_PAIRS}`
            : `${filtered.length} Pairs Detected`;
        
        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 40px;">No confusable pairs found under current similarity configurations.</td></tr>`;
            return;
        }
        
        tbody.innerHTML = renderedPairs.map(p => {
            const metaA = NAME_TYPE_META[p.typeA];
            const metaB = NAME_TYPE_META[p.typeB];
            
            return `
            <tr>
                <td class="clickable-cell" style="cursor: pointer;" onclick="openDrugModal('${p.drugA.id}')">
                    <strong>${p.nameA}</strong> <span class="badge-${metaA.badge}">${metaA.label}</span><br>
                    <span class="small-text text-muted">${p.oppNameA}</span>
                </td>
                <td class="clickable-cell" style="cursor: pointer;" onclick="openDrugModal('${p.drugB.id}')">
                    <strong>${p.nameB}</strong> <span class="badge-${metaB.badge}">${metaB.label}</span><br>
                    <span class="small-text text-muted">${p.oppNameB}</span>
                </td>
                <td>
                    <span class="lasa-score-badge ${p.similarity >= 0.85 ? 'score-danger' : 'score-warning'}">
                        ${(p.similarity * 100).toFixed(0)}% Match
                    </span>
                </td>
                <td class="font-mono">${p.levDistance}</td>
                <td class="font-mono">${(p.sdxMatch * 100).toFixed(0)}%</td>
                <td>
                    <div class="font-mono" style="font-size:0.82rem; line-height: 1.4;">
                        ${formatTallmanHTML(p.tmlA)}<br>
                        ${formatTallmanHTML(p.tmlB)}
                    </div>
                </td>
            </tr>
        `}).join('');
    }, 10);
}

// ==========================================================================
// Drug Details Modal Logic
// ==========================================================================
window.openDrugModal = function(drugId) {
    const drug = drugsDatabase.find(d => d.id === drugId);
    if (!drug) return;
    
    const modal = document.getElementById("drug-detail-modal");
    const bodyContent = document.getElementById("modal-body-content");
    
    const similar = findSimilarDrugsLocal(drug.generic_name, 0.80);
    const similarHTML = similar.length === 0
        ? `<div class="text-muted small-text">No similar drugs detected above 0.80 threshold.</div>`
        : similar.slice(0, 5).map(s => `
            <div class="lasa-warning-row">
                <span class="lasa-warning-name">${formatTallmanHTML(s.tmlMatch)}</span>
                <span class="lasa-score-badge ${s.similarity >= 0.85 ? 'score-danger' : 'score-warning'}">
                    ${(s.similarity * 100).toFixed(0)}% Similarity
                </span>
            </div>
          `).join('');
          
    bodyContent.innerHTML = `
        <div class="profile-header-block">
            <div class="profile-names">
                <h2>${drug.brand_name} <span class="badge-brand">Brand</span></h2>
                <span class="profile-subtext">Active Substance: ${drug.generic_name} <span class="badge-generic">Generic</span></span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
                <span class="profile-class-badge">${drug.therapeutic_class}</span>
                ${drug.broad_category ? `<span class="category-badge cat-${drug.broad_category.toLowerCase().replace(/[^a-z0-9]/g, '-')}">${drug.broad_category}</span>` : ''}
            </div>
        </div>
        <div class="profile-section-item">
            <h4>Description</h4>
            <p>${drug.description}</p>
        </div>
        <div class="profile-section-item">
            <h4>Indications & Clinical Usage</h4>
            <p>${drug.indication}</p>
        </div>
        <div class="lasa-warnings-sidebar">
            <h5>⚠️ Confusable Counterparts (LASA Warning)</h5>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                ${similarHTML}
            </div>
        </div>
    `;
    
    modal.classList.add("active");
};

window.closeDrugModal = function(event) {
    const modal = document.getElementById("drug-detail-modal");
    modal.classList.remove("active");
};

// ==========================================================================
// Algorithm Ports (Local JS Operations)
// ==========================================================================
function levenshteinDistance(s1, s2) {
    s1 = s1.toLowerCase(); s2 = s2.toLowerCase();
    if (s1.length < s2.length) { let temp = s1; s1 = s2; s2 = temp; }
    if (s2.length === 0) return s1.length;
    let prev = Array.from({length: s2.length + 1}, (_, i) => i);
    for (let i = 0; i < s1.length; i++) {
        let curr = [i + 1];
        for (let j = 0; j < s2.length; j++) {
            curr.push(Math.min(prev[j + 1] + 1, curr[j] + 1, prev[j] + (s1[i] !== s2[j] ? 1 : 0)));
        }
        prev = curr;
    }
    return prev[prev.length - 1];
}

function jaroSimilarity(s1, s2) {
    s1 = s1.toLowerCase(); s2 = s2.toLowerCase();
    let l1 = s1.length, l2 = s2.length;
    if (l1 === 0 && l2 === 0) return 1.0;
    if (l1 === 0 || l2 === 0) return 0.0;
    let matchDist = Math.floor(Math.max(l1, l2) / 2) - 1;
    if (matchDist < 0) matchDist = 0;
    let m1 = new Array(l1).fill(false), m2 = new Array(l2).fill(false);
    let m = 0;
    for (let i = 0; i < l1; i++) {
        let start = Math.max(0, i - matchDist), end = Math.min(l2, i + matchDist + 1);
        for (let j = start; j < end; j++) {
            if (!m2[j] && s1[i] === s2[j]) {
                m1[i] = true; m2[j] = true; m++; break;
            }
        }
    }
    if (m === 0) return 0.0;
    let t = 0, k = 0;
    for (let i = 0; i < l1; i++) {
        if (m1[i]) {
            while (!m2[k]) k++;
            if (s1[i] !== s2[k]) t++;
            k++;
        }
    }
    return (m / l1 + m / l2 + (m - Math.floor(t / 2)) / m) / 3.0;
}

function jaroWinklerSimilarityRaw(s1, s2, p = 0.1, maxPrefix = 4) {
    let j = jaroSimilarity(s1, s2);
    let prefix = 0;
    for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
        if (s1[i].toLowerCase() === s2[i].toLowerCase()) {
            prefix++; if (prefix === maxPrefix) break;
        } else break;
    }
    return j + prefix * p * (1.0 - j);
}

function jaroWinklerSimilarity(s1, s2, p = 0.1, maxPrefix = 4) {
    const rawSim = jaroWinklerSimilarityRaw(s1, s2, p, maxPrefix);
    
    // Split into tokens to handle multi-word comparisons (e.g., combination drugs or salts)
    const tokens1 = s1.split(/\s+/).filter(t => t.length >= 4);
    const tokens2 = s2.split(/\s+/).filter(t => t.length >= 4);
    
    if (tokens1.length > 1 || tokens2.length > 1) {
        let maxTokenSim = 0;
        
        for (let t1 of tokens1) {
            for (let t2 of tokens2) {
                const sim = jaroWinklerSimilarityRaw(t1, t2, p, maxPrefix);
                if (sim > maxTokenSim) {
                    maxTokenSim = sim;
                }
            }
        }
        
        // If a specific token pair matches very closely, blend it to highlight the overlap
        if (maxTokenSim > rawSim) {
            return rawSim * 0.4 + maxTokenSim * 0.6;
        }
    }
    
    return rawSim;
}

function soundexEncode(name) {
    if (!name) return "0000";
    name = name.toUpperCase().replace(/[^A-Z]/g, '');
    if (!name) return "0000";
    let first = name[0];
    const mappings = {
        'B': '1', 'F': '1', 'P': '1', 'V': '1', 'C': '2', 'G': '2', 'J': '2', 'K': '2',
        'Q': '2', 'S': '2', 'X': '2', 'Z': '2', 'D': '3', 'T': '3', 'L': '4', 'M': '5', 'N': '5', 'R': '6'
    };
    let encoded = [first], prev = mappings[first] || '0';
    for (let i = 1; i < name.length; i++) {
        let code = mappings[name[i]] || '0';
        if (code !== '0') {
            if (code !== prev) { encoded.push(code); prev = code; }
        } else if (name[i] !== 'H' && name[i] !== 'W') prev = '0';
    }
    return (first + encoded.slice(1).join('').replace(/0/g, '') + "000").slice(0, 4);
}

function soundexSimilarity(s1, s2) {
    let c1 = soundexEncode(s1), c2 = soundexEncode(s2);
    if (c1 === c2) return 1.0;
    let m = 0;
    for (let i = 0; i < 4; i++) if (c1[i] === c2[i]) m++;
    return m / 4.0;
}

function generateTallManLettering(s1, s2) {
    let s1K = s1.toLowerCase(), s2K = s2.toLowerCase();
    if (OFFICIAL_TALL_MAN[s1K]) return [OFFICIAL_TALL_MAN[s1K], OFFICIAL_TALL_MAN[s2K] || s2];
    if (OFFICIAL_TALL_MAN[s2K]) return [OFFICIAL_TALL_MAN[s1K] || s1, OFFICIAL_TALL_MAN[s2K]];
    let min = Math.min(s1.length, s2.length);
    let LCP = 0; for (let i = 0; i < min; i++) if (s1K[i] === s2K[i]) LCP++; else break;
    let LCS = 0; for (let i = 1; i <= min - LCP; i++) if (s1K[s1.length - i] === s2K[s2.length - i]) LCS++; else break;
    let prefix = s1.slice(0, LCP), suffix = LCS > 0 ? s1.slice(s1.length - LCS) : "";
    let mid1 = LCS > 0 ? s1.slice(LCP, s1.length - LCS) : s1.slice(LCP);
    let mid2 = LCS > 0 ? s2.slice(LCP, s2.length - LCS) : s2.slice(LCP);
    let t1, t2;
    if (!mid1 || !mid2 || mid1.length < 2 || mid2.length < 2) {
        let cap = Math.max(0, LCP - 3); if (cap < 3 && LCP >= 3) cap = 3;
        t1 = s1.slice(0, cap) + s1.slice(cap).toUpperCase();
        t2 = s2.slice(0, cap) + s2.slice(cap).toUpperCase();
    } else {
        t1 = prefix.toLowerCase() + mid1.toUpperCase() + suffix.toLowerCase();
        t2 = prefix.toLowerCase() + mid2.toUpperCase() + suffix.toLowerCase();
    }
    if (t1.length > 0) t1 = t1[0].toUpperCase() + t1.slice(1);
    if (t2.length > 0) t2 = t2[0].toUpperCase() + t2.slice(1);
    return [t1, t2];
}

function findSimilarDrugsLocal(targetName, threshold) {
    const targetNorm = normalizeDrugName(targetName);
    if (!targetNorm) return [];
    const targetSoundex = soundexEncode(targetNorm);
    
    let similar = [];
    for (let record of preparedDrugRecords) {
        const genEntry = record.generic;
        const brandEntry = record.brand;
        const genNorm = genEntry.norm;
        const brandNorm = brandEntry.norm;
        
        if (genNorm === targetNorm || brandNorm === targetNorm) {
            continue;
        }
        
        if (Math.abs(targetNorm.length - genNorm.length) > 4) {
            const isOverride = (KNOWN_LASA_PAIRS[targetNorm] === genNorm);
            if (!isOverride) continue;
        }
        
        let genSim = jaroWinklerSimilarity(targetNorm, genNorm);
        let brandSim = jaroWinklerSimilarity(targetNorm, brandNorm);
        let sim = Math.max(genSim, brandSim);
        
        let soundexSim = codesSimilarity(targetSoundex, genEntry.soundex);
        
        const isLasa = (
            sim >= threshold ||
            (sim >= 0.75 && soundexSim >= 0.75) ||
            (KNOWN_LASA_PAIRS[targetNorm] === genNorm)
        );
        
        if (isLasa) {
            let [t, m] = generateTallManLettering(targetNorm, genNorm);
            similar.push({ drug: record.drug, similarity: sim, tmlTarget: t, tmlMatch: m });
        }
    }
    return similar.sort((a, b) => b.similarity - a.similarity);
}

function formatTallmanHTML(tmlWord) {
    let html = "";
    for (let char of tmlWord) {
        if (char === char.toUpperCase() && char !== char.toLowerCase() && isNaN(char)) {
            html += `<span class="tml-part-caps">${char}</span>`;
        } else html += char;
    }
    return html;
}

// ==========================================================================
// Page 5: Filipino-Aware LASA Detection Engine
// ==========================================================================

// Unified Filipino phonological transformation rules (digraphs, consonants, and vowel collapses)
const FILIPINO_G2P_RULES = [
    { from: 'ph', to: 'p', label: 'ph→p' },
    { from: 'th', to: 't', label: 'th→t' },
    { from: 'sh', to: 's', label: 'sh→s' },
    { from: 'f', to: 'p', label: 'f→p' },
    { from: 'v', to: 'b', label: 'v→b' },
    { from: 'z', to: 's', label: 'z→s' },
    { from: 'e', to: 'i', label: 'e→i' },
    { from: 'o', to: 'u', label: 'o→u' },
];

function filipinoG2P(drugName) {
    let name = drugName.toLowerCase();
    const appliedRules = [];

    for (const rule of FILIPINO_G2P_RULES) {
        if (name.includes(rule.from)) {
            name = name.split(rule.from).join(rule.to);
            appliedRules.push(rule.label);
        }
    }

    return { result: name, rules: appliedRules };
}

function filipinoPhoneticEncode(name) {
    const g2p = filipinoG2P(name);
    return soundexEncode(g2p.result);
}

function filipinoPhoneticSimilarity(s1, s2) {
    const c1 = filipinoPhoneticEncode(s1);
    const c2 = filipinoPhoneticEncode(s2);
    if (c1 === c2) return 1.0;
    let m = 0;
    for (let i = 0; i < 4; i++) if (c1[i] === c2[i]) m++;
    return m / 4.0;
}

function articulatoryPhoneticDistance(s1, s2) {
    const len1 = s1.length;
    const len2 = s2.length;
    const dp = Array.from({ length: len1 + 1 }, () => new Float32Array(len2 + 1));
    
    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;
    
    const isVowel = c => 'aeiou'.includes(c);
    const isBilabial = c => 'pbmw'.includes(c);
    const isAlveolarDental = c => 'tdsnlr'.includes(c);
    const isVelar = c => 'kg'.includes(c);
    
    for (let i = 1; i <= len1; i++) {
        const c1 = s1[i - 1];
        for (let j = 1; j <= len2; j++) {
            const c2 = s2[j - 1];
            
            if (c1 === c2) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                let subCost = 1.0;
                
                // Filipino Phonology Mergers (Consonants + Vowels)
                const isFilipinoMerge = 
                    (c1 === 'f' && c2 === 'p') || (c1 === 'p' && c2 === 'f') ||
                    (c1 === 'v' && c2 === 'b') || (c1 === 'b' && c2 === 'v') ||
                    (c1 === 't' && c2 === 'd') || (c1 === 'd' && c2 === 't') ||
                    (c1 === 's' && c2 === 'z') || (c1 === 'z' && c2 === 's') ||
                    (c1 === 'e' && c2 === 'i') || (c1 === 'i' && c2 === 'e') ||
                    (c1 === 'o' && c2 === 'u') || (c1 === 'u' && c2 === 'o');
                
                const isFilipinoRdMerge = (c1 === 'r' && c2 === 'd') || (c1 === 'd' && c2 === 'r');
                
                if (isFilipinoMerge) {
                    subCost = ('eiou'.includes(c1) && 'eiou'.includes(c2)) ? 0.08 : 0.15;
                } else if (isFilipinoRdMerge) {
                    subCost = 0.25;
                } else if (isVowel(c1) && isVowel(c2)) {
                    subCost = 0.40;
                } else if (isBilabial(c1) && isBilabial(c2)) {
                    subCost = 0.45;
                } else if (isAlveolarDental(c1) && isAlveolarDental(c2)) {
                    subCost = 0.45;
                } else if (isVelar(c1) && isVelar(c2)) {
                    subCost = 0.45;
                }
                
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1.0,      // deletion
                    dp[i][j - 1] + 1.0,      // insertion
                    dp[i - 1][j - 1] + subCost // substitution
                );
            }
        }
    }
    
    const distance = dp[len1][len2];
    const maxLength = Math.max(len1, len2);
    return maxLength === 0 ? 1.0 : 1.0 - (distance / maxLength);
}

function getFilipinoPrepared(entry) {
    if (!entry.filipino) {
        const g2p = filipinoG2P(entry.norm);
        entry.filipino = {
            g2p,
            length: g2p.result.length,
            soundex: soundexEncode(g2p.result)
        };
    }
    return entry.filipino;
}

function renderG2PHTML(g2pResult) {
    if (g2pResult.rules.length === 0) {
        return `<span class="g2p-unchanged">${g2pResult.result}</span>`;
    }
    return `<span class="g2p-result">${g2pResult.result}</span><span class="g2p-rules">${g2pResult.rules.map(r => `<span class="g2p-rule-tag">${r}</span>`).join('')}</span>`;
}

window.handleFilipinoSearch = function(val) {
    filipinoSearchQuery = val.toLowerCase().trim();
    renderFilipinoLASA();
};

window.handleFilipinoModeChange = function(val) {
    filipinoNameMode = val;
    filipinoPairsCache = null;
    renderFilipinoLASA();
};

function computeFilipinoLASAPairs() {
    const cacheKey = `${filipinoNameMode}|${currentThreshold.toFixed(2)}`;
    if (filipinoPairsCacheByKey.has(cacheKey)) {
        return filipinoPairsCacheByKey.get(cacheKey);
    }

    const pairs = [];
    const seen = new Set();
    const entries = getFilipinoLengthSortedEntries(filipinoNameMode);
    const len = entries.length;

    for (let i = 0; i < len; i++) {
        const left = entries[i];

        for (let j = i + 1; j < len; j++) {
            const right = entries[j];
            if (left.record.drug.id === right.record.drug.id) continue;
            if (!isAllowedNameTypePair(left.entry.type, right.entry.type, filipinoNameMode)) continue;

            const normA = left.entry.norm;
            const normB = right.entry.norm;
            if (normA === normB) continue;

            const filipinoA = getFilipinoPrepared(left.entry);
            const filipinoB = getFilipinoPrepared(right.entry);

            // Length optimization on Filipino-transformed names
            if (filipinoB.length - filipinoA.length > 4) break;

            const phoneticSim = articulatoryPhoneticDistance(filipinoA.g2p.result, filipinoB.g2p.result);
            const englishJW = jaroWinklerSimilarity(normA, normB);
            const pocaBlended = (englishJW + phoneticSim) / 2;
            const englishSdx = codesSimilarity(left.entry.soundex, right.entry.soundex);
            if (isLikelySameDrugVariant(normA, normB, englishSdx)) continue;

            const isFilipinoLASA = isFilipinoLASAMatch(pocaBlended, normA, normB, currentThreshold);
            if (!isFilipinoLASA) continue;

            // Skip if no G2P rules were applied to either name (not a Filipino-specific confusion)
            if (filipinoA.g2p.rules.length === 0 && filipinoB.g2p.rules.length === 0) {
                continue;
            }

            const pairKey = [
                `${left.record.drug.id}:${left.entry.type}:${normA}`,
                `${right.record.drug.id}:${right.entry.type}:${normB}`
            ].sort().join('::');
            if (seen.has(pairKey)) continue;
            seen.add(pairKey);

            const isEnglishLASA = (
                englishJW >= currentThreshold ||
                (englishJW >= 0.75 && englishSdx >= 0.75) ||
                (KNOWN_LASA_PAIRS[normA] === normB || KNOWN_LASA_PAIRS[normB] === normA)
            );

            let flag;
            if (!isEnglishLASA) {
                flag = 'filipino-only';
            } else if (pocaBlended > englishJW + 0.01) {
                flag = 'amplified';
            } else {
                continue; // Skip standard matches to prevent English pairs from cluttering the Filipino tab
            }

            pairs.push({
                ...makePairCandidate(left, right),
                normA,
                normB,
                g2pA: filipinoA.g2p,
                g2pB: filipinoB.g2p,
                phoneticSim,
                englishJW,
                pocaBlended,
                flag
            });
        }
    }

    pairs.sort((a, b) => {
        const flagOrder = { 'filipino-only': 0, 'amplified': 1, 'standard': 2 };
        if (flagOrder[a.flag] !== flagOrder[b.flag]) return flagOrder[a.flag] - flagOrder[b.flag];
        return b.pocaBlended - a.pocaBlended;
    });

    filipinoPairsCacheByKey.set(cacheKey, pairs);
    return pairs;
}

function renderFilipinoLASA() {
    const tbody = document.getElementById('filipino-tbody');
    const countBadge = document.getElementById('filipino-count');
    const modeLabel = document.querySelector(`#filipino-mode-select option[value="${filipinoNameMode}"]`)?.textContent || 'Generic-to-Generic';

    tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 40px;">Analyzing ${drugsDatabase.length} medications through Filipino phonological filter (${modeLabel})...</td></tr>`;

    setTimeout(() => {
        if (!filipinoPairsCache) {
            filipinoPairsCache = computeFilipinoLASAPairs();
        }

        let filtered = filipinoPairsCache;
        if (filipinoSearchQuery) {
            filtered = filipinoPairsCache.filter(p => namesMatchSearch(p, filipinoSearchQuery));
        }

        const totalPairs = filtered.length;
        const filipinoOnlyCount = filtered.filter(p => p.flag === 'filipino-only').length;
        const amplifiedCount = filtered.filter(p => p.flag === 'amplified').length;

        document.getElementById('stat-total-pairs').textContent = totalPairs;
        document.getElementById('stat-filipino-only').textContent = filipinoOnlyCount;
        document.getElementById('stat-amplified').textContent = amplifiedCount;
        countBadge.textContent = totalPairs > MAX_RENDERED_PAIRS
            ? `${totalPairs} Pairs Detected · Showing ${MAX_RENDERED_PAIRS}`
            : `${totalPairs} Pairs Detected`;

        if (totalPairs === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 40px;">No Filipino-context confusable pairs found under current configurations.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.slice(0, MAX_RENDERED_PAIRS).map(p => {
            const flagHTML = p.flag === 'filipino-only'
                ? '<br><span class="flag-badge flag-filipino-only" style="margin-top: 4px; display: inline-block;">🇵🇭 Filipino-Only</span>'
                : p.flag === 'amplified'
                ? '<br><span class="flag-badge flag-amplified" style="margin-top: 4px; display: inline-block;">⬆️ Amplified</span>'
                : '<br><span class="flag-badge flag-standard" style="margin-top: 4px; display: inline-block;">● Standard</span>';

            const crossTypeHTML = p.typeA !== p.typeB
                ? '<br><span class="flag-badge" style="margin-top: 4px; display: inline-block; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;">🔀 Cross-Type Match</span>'
                : '';

            return `
                <tr class="${p.flag === 'filipino-only' ? 'row-filipino-only' : p.flag === 'amplified' ? 'row-amplified' : ''}">
                    <td class="clickable-cell" style="cursor:pointer" onclick="openDrugModal('${p.drugA.id}')">
                        <strong>${p.nameA}</strong> <span class="badge-${NAME_TYPE_META[p.typeA].badge}">${NAME_TYPE_META[p.typeA].label}</span><br>
                        <span class="small-text text-muted">${p.oppNameA}</span>
                    </td>
                    <td class="font-mono g2p-cell">${renderG2PHTML(p.g2pA)}</td>
                    <td class="clickable-cell" style="cursor:pointer" onclick="openDrugModal('${p.drugB.id}')">
                        <strong>${p.nameB}</strong> <span class="badge-${NAME_TYPE_META[p.typeB].badge}">${NAME_TYPE_META[p.typeB].label}</span><br>
                        <span class="small-text text-muted">${p.oppNameB}</span>
                    </td>
                    <td class="font-mono g2p-cell">${renderG2PHTML(p.g2pB)}</td>
                    <td><span class="lasa-score-badge score-muted">${(p.phoneticSim * 100).toFixed(0)}%</span></td>
                    <td><span class="lasa-score-badge score-muted">${(p.englishJW * 100).toFixed(0)}%</span></td>
                    <td>
                        <span class="lasa-score-badge ${p.pocaBlended >= 0.75 ? 'score-danger' : p.pocaBlended >= 0.65 ? 'score-warning' : 'score-muted'}">
                            ${(p.pocaBlended * 100).toFixed(0)}% Risk
                        </span>
                        ${flagHTML}
                        ${crossTypeHTML}
                    </td>
                </tr>
            `;
        }).join('');
    }, 10);
}

// ==========================================================================
// Footer config slider hooks
// ==========================================================================
window.updateThreshold = function(val) {
    document.getElementById("threshold-val").innerText = val;
    currentThreshold = parseFloat(val);
    filipinoPairsCache = null; // Invalidate Filipino cache

    if (activePage === "alerts") renderAlerts();
    if (activePage === "filipino") renderFilipinoLASA();
};
