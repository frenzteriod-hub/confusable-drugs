import json

with open("data/raw_drugs.json", "r") as f:
    drugs = json.load(f)

print(f"Total drugs loaded: {len(drugs)}")

estradiol_drugs = [d['generic_name'] for d in drugs if 'estradiol' in d['generic_name'].lower() or 'norethindrone' in d['generic_name'].lower()]

print("\n--- Estradiol / Norethindrone entries ---")
for e in sorted(estradiol_drugs):
    print(e)
