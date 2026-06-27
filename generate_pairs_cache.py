import json
import re


CURRENT_THRESHOLD_FLOOR = 0.70

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
    "paclitaxel": "docetaxel", "docetaxel": "paclitaxel",
}

OFFICIAL_TALL_MAN = {
    "tramadol": "traMADol", "trazodone": "traZODone",
    "hydroxyzine": "hydrOXYzine", "hydralazine": "hydrALAzine",
    "metformin": "metFORmin", "metronidazole": "metRONidazole",
    "prednisone": "predniSONE", "prednisolone": "predniSOLONE",
    "bupropion": "buPROpropion", "buspirone": "busPIRone",
    "amlodipine": "amLODIPine", "amiodarone": "aMIODarone",
    "clonidine": "clONIdine", "vinblastine": "vinBLAStine",
    "vincristine": "vinCRIStine",
}


def normalize_drug_name(name):
    if not name:
        return ""
    name = name.lower().strip()
    salt_suffixes = [
        r"\bhydrochloride\b", r"\bphosphate\b", r"\bsulfate\b", r"\bsulphate\b",
        r"\bmaleate\b", r"\bsodium\b", r"\bcalcium\b", r"\bpotassium\b",
        r"\btartrate\b", r"\bmesylate\b", r"\bacetate\b", r"\bvalerate\b",
        r"\bfumarate\b", r"\bsuccinate\b", r"\bchloride\b", r"\bbromide\b",
        r"\biodide\b", r"\bbesylate\b", r"\bmonohydrate\b", r"\bdihydrate\b",
        r"\btrihydrate\b", r"\bhemihydrate\b", r"\banhydrous\b",
        r"\btopical\b", r"\bgel\b", r"\bcream\b", r"\bointment\b",
        r"\binjection\b", r"\bophthalmic\b", r"\bnasal\b", r"\bspray\b",
    ]
    for pattern in salt_suffixes:
        name = re.sub(pattern, "", name)
    name = re.sub(r"[^\w\s]", "", name).strip()
    return re.sub(r"\s+", " ", name).strip()


def levenshtein_distance(s1, s2):
    s1 = s1.lower()
    s2 = s2.lower()
    if len(s1) < len(s2):
        s1, s2 = s2, s1
    if not s2:
        return len(s1)
    previous = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current = [i + 1]
        for j, c2 in enumerate(s2):
            current.append(min(previous[j + 1] + 1, current[j] + 1, previous[j] + (c1 != c2)))
        previous = current
    return previous[-1]


def jaro_similarity(s1, s2):
    s1 = s1.lower()
    s2 = s2.lower()
    len1, len2 = len(s1), len(s2)
    if len1 == 0 and len2 == 0:
        return 1.0
    if len1 == 0 or len2 == 0:
        return 0.0
    match_distance = max(max(len1, len2) // 2 - 1, 0)
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
    return (matches / len1 + matches / len2 + (matches - t // 2) / matches) / 3.0


def jaro_winkler_similarity(s1, s2, p=0.1, max_prefix=4):
    j = jaro_similarity(s1, s2)
    prefix = 0
    for c1, c2 in zip(s1.lower(), s2.lower()):
        if c1 != c2:
            break
        prefix += 1
        if prefix == max_prefix:
            break
    return j + prefix * p * (1.0 - j)


def soundex_encode(name):
    name = re.sub(r"[^A-Z]", "", (name or "").upper())
    if not name:
        return "0000"
    mappings = {
        "B": "1", "F": "1", "P": "1", "V": "1",
        "C": "2", "G": "2", "J": "2", "K": "2", "Q": "2", "S": "2", "X": "2", "Z": "2",
        "D": "3", "T": "3", "L": "4", "M": "5", "N": "5", "R": "6",
    }
    first = name[0]
    encoded = [first]
    prev = mappings.get(first, "0")
    for char in name[1:]:
        code = mappings.get(char, "0")
        if code != "0":
            if code != prev:
                encoded.append(code)
                prev = code
        elif char not in ("H", "W"):
            prev = "0"
    return (first + "".join(encoded[1:]).replace("0", "") + "000")[:4]


def code_similarity(code1, code2):
    return 1.0 if code1 == code2 else sum(a == b for a, b in zip(code1, code2)) / 4.0


def generate_tallman_lettering(s1, s2):
    if s1 in OFFICIAL_TALL_MAN:
        return OFFICIAL_TALL_MAN[s1], OFFICIAL_TALL_MAN.get(s2, s2)
    if s2 in OFFICIAL_TALL_MAN:
        return OFFICIAL_TALL_MAN.get(s1, s1), OFFICIAL_TALL_MAN[s2]
    min_len = min(len(s1), len(s2))
    prefix_len = 0
    for i in range(min_len):
        if s1[i] == s2[i]:
            prefix_len += 1
        else:
            break
    suffix_len = 0
    for i in range(1, min_len - prefix_len + 1):
        if s1[-i] == s2[-i]:
            suffix_len += 1
        else:
            break
    mid1 = s1[prefix_len:len(s1) - suffix_len] if suffix_len else s1[prefix_len:]
    mid2 = s2[prefix_len:len(s2) - suffix_len] if suffix_len else s2[prefix_len:]
    if not mid1 or not mid2 or len(mid1) < 2 or len(mid2) < 2:
        cap = max(0, prefix_len - 3)
        if cap < 3 and prefix_len >= 3:
            cap = 3
        t1 = s1[:cap] + s1[cap:].upper()
        t2 = s2[:cap] + s2[cap:].upper()
    else:
        suffix1 = s1[len(s1) - suffix_len:] if suffix_len else ""
        suffix2 = s2[len(s2) - suffix_len:] if suffix_len else ""
        t1 = s1[:prefix_len].lower() + mid1.upper() + suffix1.lower()
        t2 = s2[:prefix_len].lower() + mid2.upper() + suffix2.lower()
    return t1[:1].upper() + t1[1:], t2[:1].upper() + t2[1:]


def filipino_g2p(name, dialect):
    rules = [("ph", "p", "ph→p"), ("th", "t", "th→t"), ("sh", "s", "sh→s"), ("f", "p", "f→p"), ("v", "b", "v→b"), ("z", "s", "z→s")]
    if dialect == "bisaya":
        rules += [("e", "i", "e→i"), ("o", "u", "o→u")]
    result = name.lower()
    applied = []
    for old, new, label in rules:
        if old in result:
            result = result.replace(old, new)
            applied.append(label)
    return {"result": result, "rules": applied}


def mode_for_types(type_a, type_b):
    if type_a == "generic" and type_b == "generic":
        return "generic"
    if type_a == "brand" and type_b == "brand":
        return "brand"
    return "cross"


with open("data/raw_drugs.json", "r", encoding="utf-8") as f:
    drugs = json.load(f)

entries = []
for drug in drugs:
    for name_type, name, other in (
        ("generic", drug["generic_name"], drug["brand_name"]),
        ("brand", drug["brand_name"], drug["generic_name"]),
    ):
        norm = normalize_drug_name(name)
        entries.append({
            "drug_id": drug["id"],
            "type": name_type,
            "name": name,
            "other": other,
            "norm": norm,
            "length": len(norm),
            "soundex": soundex_encode(norm),
            "tagalog": filipino_g2p(norm, "tagalog"),
            "bisaya": filipino_g2p(norm, "bisaya"),
        })

entries.sort(key=lambda item: item["length"])
pairs = []
seen = set()

for i, left in enumerate(entries):
    for right in entries[i + 1:]:
        if right["length"] - left["length"] > 4:
            break
        if left["drug_id"] == right["drug_id"] or left["norm"] == right["norm"]:
            continue
        pair_key = tuple(sorted((f"{left['drug_id']}:{left['type']}:{left['norm']}", f"{right['drug_id']}:{right['type']}:{right['norm']}")))
        if pair_key in seen:
            continue

        jw = jaro_winkler_similarity(left["norm"], right["norm"])
        sdx = code_similarity(left["soundex"], right["soundex"])
        override = KNOWN_LASA_PAIRS.get(left["norm"]) == right["norm"] or KNOWN_LASA_PAIRS.get(right["norm"]) == left["norm"]

        dialect_metrics = {}
        filipino_hit = False
        for dialect in ("tagalog", "bisaya"):
            l_g2p = left[dialect]
            r_g2p = right[dialect]
            if abs(len(l_g2p["result"]) - len(r_g2p["result"])) > 4 and not override:
                continue
            f_jw = jaro_winkler_similarity(l_g2p["result"], r_g2p["result"])
            f_sdx = code_similarity(soundex_encode(l_g2p["result"]), soundex_encode(r_g2p["result"]))
            dialect_metrics[dialect] = {
                "jw": round(f_jw, 6),
                "sdx": round(f_sdx, 6),
                "g2pA": l_g2p,
                "g2pB": r_g2p,
            }
            filipino_hit = filipino_hit or f_jw >= CURRENT_THRESHOLD_FLOOR or (f_jw >= 0.75 and f_sdx >= 0.75)

        standard_hit = jw >= CURRENT_THRESHOLD_FLOOR or (jw >= 0.75 and sdx >= 0.75) or override
        if not standard_hit and not filipino_hit:
            continue

        seen.add(pair_key)
        pairs.append([
            left["drug_id"],
            left["type"],
            right["drug_id"],
            right["type"],
            mode_for_types(left["type"], right["type"]),
            round(jw, 6),
            round(sdx, 6),
            1 if override else 0,
            round(dialect_metrics.get("tagalog", {}).get("jw", -1), 6),
            round(dialect_metrics.get("tagalog", {}).get("sdx", -1), 6),
            round(dialect_metrics.get("bisaya", {}).get("jw", -1), 6),
            round(dialect_metrics.get("bisaya", {}).get("sdx", -1), 6),
        ])

with open("lasa_pairs_cache.js", "w", encoding="utf-8") as f:
    f.write("// Precomputed LASA pair metrics generated from data/raw_drugs.json for static hosting.\n")
    f.write("// Format: [drugAId,typeA,drugBId,typeB,mode,jw,sdx,override,tagalogJw,tagalogSdx,bisayaJw,bisayaSdx]\n")
    f.write("var LASA_PAIRS_CACHE = ")
    json.dump(pairs, f, ensure_ascii=False, separators=(",", ":"))
    f.write(";\n")

print(f"Wrote {len(pairs)} cached LASA candidate pairs.")
