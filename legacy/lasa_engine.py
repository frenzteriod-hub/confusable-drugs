import os
import json
import re

# Standard ISMP / FDA Tall Man Lettering Map for known confusable drugs
OFFICIAL_TALL_MAN = {
    "tramadol": "traMADol",
    "trazodone": "traZODone",
    "hydroxyzine": "hydrOXYzine",
    "hydralazine": "hydrALAzine",
    "metformin": "metFORmin",
    "metronidazole": "metRONidazole",
    "prednisone": "predniSONE",
    "prednisolone": "predniSOLONE",
    "bupropion": "buPROpropion",
    "buspirone": "busPIRone",
    "ranitidine": "ranitidine",
    "cetirizine": "cetirizine",
    "celecoxib": "celecoxib",
    "citalopram": "citalopram",
    "lamotrigine": "lamotrigine",
    "terbinafine": "terbinafine",
    "olanzapine": "olanzapine",
    "amphetamine/dextroamphetamine": "amphetamine/dextroamphetamine",
    "propranolol": "propranolol",
    "amlodipine": "amLODIPine",
    "amiodarone": "aMIODarone",
    "clonazepam": "clonazepam",
    "clonidine": "clONIdine",
    "dopamine": "Dopamine",
    "dobutamine": "Dobutamine",
    "ephedrine": "ephedrine",
    "epinephrine": "epinephrine",
    "paroxetine": "paroxetine",
    "clopidogrel": "clopidogrel",
    "fexofenadine": "fexofenadine",
    "sildenafil": "sildenafil",
    "niacin/lovastatin": "niacin/lovastatin",
    "fluticasone/salmeterol": "fluticasone/salmeterol",
    "loratadine": "loratadine",
    "desloratadine": "desloratadine",
    "paclitaxel": "paclitaxel",
    "docetaxel": "docetaxel",
    "vinblastine": "vinBLAStine",
    "vincristine": "vinCRIStine",
    # Brand equivalents
    "ultram": "Ultram",
    "desyrel": "Desyrel",
    "atarax": "Atarax",
    "apresoline": "Apresoline",
    "glucophage": "Glucophage",
    "flagyl": "Flagyl",
    "deltasone": "Deltasone",
    "prelone": "Prelone",
    "wellbutrin": "Wellbutrin",
    "buspar": "Buspar",
    "zantac": "Zantac",
    "zyrtec": "Zyrtec",
    "celebrex": "Celebrex",
    "celexa": "Celexa",
    "lamictal": "Lamictal",
    "lamisil": "Lamisil",
    "zyprexa": "Zyprexa",
    "adderall": "Adderall",
    "inderal": "Inderal",
    "norvasc": "Norvasc",
    "cordarone": "Cordarone",
    "klonopin": "Klonopin",
    "catapres": "Catapres",
    "intropin": "Intropin",
    "dobutrex": "Dobutrex",
    "akovaz": "Akovaz",
    "epipen": "EpiPen",
    "paxil": "Paxil",
    "plavix": "Plavix",
    "allegra": "Allegra",
    "viagra": "Viagra",
    "advicor": "Advicor",
    "advair": "Advair",
    "claritin": "Claritin",
    "clarinex": "Clarinex",
    "taxol": "Taxol",
    "taxotere": "Taxotere",
    "velban": "Velban",
    "oncovin": "Oncovin"
}

def levenshtein_distance(s1, s2):
    s1 = s1.lower()
    s2 = s2.lower()
    if len(s1) < len(s2):
        s1, s2 = s2, s1
    if len(s2) == 0:
        return len(s1)
    
    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
        
    return previous_row[-1]

def levenshtein_similarity(s1, s2):
    max_len = max(len(s1), len(s2))
    if max_len == 0:
        return 1.0
    return 1.0 - (levenshtein_distance(s1, s2) / max_len)

def jaro_similarity(s1, s2):
    s1 = s1.lower()
    s2 = s2.lower()
    len1, len2 = len(s1), len(s2)
    if len1 == 0 and len2 == 0:
        return 1.0
    if len1 == 0 or len2 == 0:
        return 0.0
    
    match_distance = max(len1, len2) // 2 - 1
    if match_distance < 0:
        match_distance = 0
        
    s1_matches = [False] * len1
    s2_matches = [False] * len2
    
    matches = 0
    for i in range(len1):
        start = max(0, i - match_distance)
        end = min(len2, i + match_distance + 1)
        for j in range(start, end):
            if not s2_matches[j] and s1[i] == s2[j]:
                s1_matches[i] = True
                s2_matches[j] = True
                matches += 1
                break
                
    if matches == 0:
        return 0.0
        
    t = 0
    k = 0
    for i in range(len1):
        if s1_matches[i]:
            while not s2_matches[k]:
                k += 1
            if s1[i] != s2[k]:
                t += 1
            k += 1
    transpositions = t // 2
    
    return (matches / len1 + matches / len2 + (matches - transpositions) / matches) / 3.0

def jaro_winkler_similarity_raw(s1, s2, p=0.1, max_prefix_len=4):
    j_sim = jaro_similarity(s1, s2)
    prefix_len = 0
    for c1, c2 in zip(s1.lower(), s2.lower()):
        if c1 == c2:
            prefix_len += 1
            if prefix_len == max_prefix_len:
                break
        else:
            break
            
    return j_sim + prefix_len * p * (1.0 - j_sim)

def jaro_winkler_similarity(s1, s2, p=0.1, max_prefix_len=4):
    raw_sim = jaro_winkler_similarity_raw(s1, s2, p, max_prefix_len)
    
    tokens1 = [t for t in s1.split() if len(t) >= 4]
    tokens2 = [t for t in s2.split() if len(t) >= 4]
    
    if len(tokens1) > 1 or len(tokens2) > 1:
        max_token_sim = 0.0
        for t1 in tokens1:
            for t2 in tokens2:
                sim = jaro_winkler_similarity_raw(t1, t2, p, max_prefix_len)
                if sim > max_token_sim:
                    max_token_sim = sim
                    
        if max_token_sim > raw_sim:
            return raw_sim * 0.4 + max_token_sim * 0.6
            
    return raw_sim

def soundex_encode(name):
    if not name:
        return "0000"
    name = re.sub(r'[^A-Z]', '', name.upper())
    if not name:
        return "0000"
    
    first_letter = name[0]
    
    mappings = {
        'B': '1', 'F': '1', 'P': '1', 'V': '1',
        'C': '2', 'G': '2', 'J': '2', 'K': '2', 'Q': '2', 'S': '2', 'X': '2', 'Z': '2',
        'D': '3', 'T': '3',
        'L': '4',
        'M': '5', 'N': '5',
        'R': '6'
    }
    
    encoded = [first_letter]
    prev_code = mappings.get(first_letter, '0')
    
    for char in name[1:]:
        code = mappings.get(char, '0')
        if code != '0':
            if code != prev_code:
                encoded.append(code)
                prev_code = code
        else:
            if char not in ('H', 'W'):
                prev_code = '0'
                
    code_str = "".join(encoded[1:])
    code_str = code_str.replace('0', '')
    return (first_letter + code_str + "000")[:4]

def soundex_similarity(s1, s2):
    code1 = soundex_encode(s1)
    code2 = soundex_encode(s2)
    if code1 == code2:
        return 1.0
    
    # Partial matching: match characters by index
    matches = sum(1 for c1, c2 in zip(code1, code2) if c1 == c2)
    return matches / 4.0

def generate_tallman_lettering(s1, s2):
    # Lookup in standard map first
    s1_key = s1.lower()
    s2_key = s2.lower()
    if s1_key in OFFICIAL_TALL_MAN:
        return OFFICIAL_TALL_MAN[s1_key], OFFICIAL_TALL_MAN.get(s2_key, s2)
    if s2_key in OFFICIAL_TALL_MAN:
        return OFFICIAL_TALL_MAN.get(s1_key, s1), OFFICIAL_TALL_MAN[s2_key]
        
    # Fallback alignment algorithm
    s1_lower = s1.lower()
    s2_lower = s2.lower()
    
    prefix_len = 0
    min_len = min(len(s1), len(s2))
    for i in range(min_len):
        if s1_lower[i] == s2_lower[i]:
            prefix_len += 1
        else:
            break
            
    suffix_len = 0
    for i in range(1, min_len - prefix_len + 1):
        if s1_lower[-i] == s2_lower[-i]:
            suffix_len += 1
        else:
            break
            
    prefix = s1[:prefix_len]
    suffix = s1[len(s1)-suffix_len:] if suffix_len > 0 else ""
    
    mid1 = s1[prefix_len:len(s1)-suffix_len] if suffix_len > 0 else s1[prefix_len:]
    mid2 = s2[prefix_len:len(s2)-suffix_len] if suffix_len > 0 else s2[prefix_len:]
    
    if not mid1 or not mid2 or len(mid1) < 2 or len(mid2) < 2:
        start_cap = max(0, prefix_len - 3)
        if start_cap < 3 and prefix_len >= 3:
            start_cap = 3
        
        s1_tml = s1[:start_cap] + s1[start_cap:].upper()
        s2_tml = s2[:start_cap] + s2[start_cap:].upper()
    else:
        s1_tml = prefix.lower() + mid1.upper() + suffix.lower()
        s2_tml = prefix.lower() + mid2.upper() + suffix.lower()
    
    # Capitalize the first letter for normal display if needed
    if s1_tml:
        s1_tml = s1_tml[0].upper() + s1_tml[1:] if s1_tml[0].islower() else s1_tml
    if s2_tml:
        s2_tml = s2_tml[0].upper() + s2_tml[1:] if s2_tml[0].islower() else s2_tml
        
    return s1_tml, s2_tml

# Verified High-Risk Clinical LASA Overrides (ISMP Reference List)
KNOWN_LASA_PAIRS = {
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
}

def normalize_drug_name(name):
    if not name:
        return ""
    name = name.lower().strip()
    salt_suffixes = [
        r'\bhydrochloride\b', r'\bphosphate\b', r'\bsulfate\b', r'\bsulphate\b',
        r'\bmaleate\b', r'\bsodium\b', r'\bcalcium\b', r'\bpotassium\b',
        r'\btartrate\b', r'\bmesylate\b', r'\bacetate\b', r'\bvalerate\b',
        r'\bfumarate\b', r'\bsuccinate\b', r'\bchloride\b', r'\bbromide\b',
        r'\biodide\b', r'\bbesylate\b', r'\bmonohydrate\b', r'\bdihydrate\b',
        r'\btrihydrate\b', r'\bhemihydrate\b', r'\banhydrous\b',
        r'\btopical\b', r'\bgel\b', r'\bcream\b', r'\bointment\b',
        r'\binjection\b', r'\bophthalmic\b', r'\bnasal\b', r'\bspray\b'
    ]
    for pattern in salt_suffixes:
        name = re.sub(pattern, '', name)
    name = re.sub(r'[^\w\s]', '', name).strip()
    name = re.sub(r'\s+', ' ', name).strip()
    return name


class LASADetector:
    def __init__(self, db_path="/Users/fritzhelrosenacario/Desktop/confusable drugs/data/raw_drugs.json"):
        self.drugs = []
        if os.path.exists(db_path):
            try:
                with open(db_path, "r", encoding="utf-8") as f:
                    self.drugs = json.load(f)
            except Exception as e:
                print(f"Error loading database: {e}")
        else:
            print(f"Warning: Database path {db_path} does not exist. Engine initialized empty.")
            
    def search_drug(self, query):
        """Search database for matching brand or generic names."""
        query = query.lower().strip()
        results = []
        for d in self.drugs:
            if query in d["generic_name"] or query in d["brand_name"].lower():
                results.append(d)
        return results

    def find_similar_drugs(self, target_name, threshold=0.80):
        """Find drugs in the database similar to target_name."""
        target_norm = normalize_drug_name(target_name)
        if not target_norm:
            return []
            
        similar = []
        
        for d in self.drugs:
            gen_norm = normalize_drug_name(d["generic_name"])
            brand_norm = normalize_drug_name(d["brand_name"])
            
            # Skip if active ingredient bases are equal (same drug)
            if gen_norm == target_norm or brand_norm == target_norm:
                continue
                
            # Length optimization (skip widely different lengths)
            if abs(len(target_norm) - len(gen_norm)) > 4:
                # Still check if they are explicitly in override list
                is_override = (KNOWN_LASA_PAIRS.get(target_norm) == gen_norm)
                if not is_override:
                    continue
            
            gen_sim = jaro_winkler_similarity(target_norm, gen_norm)
            brand_sim = jaro_winkler_similarity(target_norm, brand_norm)
            sim = max(gen_sim, brand_sim)
            
            soundex_sim = soundex_similarity(target_norm, gen_norm)
            
            # Match condition:
            # 1. Meets explicit JW threshold
            # 2. Meets JW >= 0.75 AND Soundex >= 0.75 (phonetic match)
            # 3. Exists in clinical override list
            is_lasa = (
                sim >= threshold or 
                (sim >= 0.75 and soundex_sim >= 0.75) or
                (KNOWN_LASA_PAIRS.get(target_norm) == gen_norm)
            )
            
            if is_lasa:
                lev_dist = levenshtein_distance(target_norm, gen_norm)
                
                # Format with Tall Man Lettering
                tml_target, tml_match = generate_tallman_lettering(target_norm, gen_norm)
                
                similar.append({
                    "drug": d,
                    "similarity": sim,
                    "levenshtein_distance": lev_dist,
                    "soundex_similarity": soundex_sim,
                    "tml_target": tml_target,
                    "tml_match": tml_match
                })
                
        # Sort by similarity descending
        return sorted(similar, key=lambda x: x["similarity"], reverse=True)

    def scan_prescription(self, text, threshold=0.85):
        """Scans prescription text and identifies potentially confusable drugs or dispensing warnings."""
        text_lower = text.lower()
        warnings = []
        
        # 1. Search for exact matches in the text
        found_drugs = []
        for d in self.drugs:
            gen_norm = normalize_drug_name(d["generic_name"])
            brand_norm = normalize_drug_name(d["brand_name"])
            
            # Match base generic or brand name with word boundaries
            if (re.search(r'\b' + re.escape(gen_norm) + r'\b', text_lower) or 
                re.search(r'\b' + re.escape(brand_norm) + r'\b', text_lower)):
                found_drugs.append(d)
                
        # 2. LASA check on exact matches
        for d in found_drugs:
            sim_drugs = self.find_similar_drugs(d["generic_name"], threshold=threshold)
            if sim_drugs:
                warnings.append({
                    "type": "LASA_WARNING",
                    "term": d["brand_name"],
                    "matched_drug": d,
                    "confusable_with": sim_drugs[:3],
                    "message": f"Prescribed drug '{d['brand_name']}' is a Look-Alike Sound-Alike (LASA) risk!"
                })
                
        # 3. Typo check
        words = re.findall(r'\b[a-zA-Z]+(?:\/[a-zA-Z]+)?\b', text)
        for word in words:
            if len(word) < 4:
                continue
            word_lower = word.lower()
            if word_lower in ["tablet", "tablets", "capsule", "capsules", "daily", "every", "dose", "twice", "times", "water", "food", "take", "with", "oral", "mg", "ml"]:
                continue
                
            is_part_of_matched = False
            for d in found_drugs:
                gen_norm = normalize_drug_name(d["generic_name"])
                brand_norm = normalize_drug_name(d["brand_name"])
                if word_lower in gen_norm or word_lower in brand_norm:
                    is_part_of_matched = True
                    break
            if is_part_of_matched:
                continue
                
            similar_drugs = self.find_similar_drugs(word_lower, threshold=threshold)
            if similar_drugs:
                warnings.append({
                    "type": "SPELLING_CORRECTION",
                    "term": word,
                    "suggestions": similar_drugs[:3],
                    "message": f"Unrecognized drug '{word}'. Did you mean one of these?"
                })
                
        return warnings

