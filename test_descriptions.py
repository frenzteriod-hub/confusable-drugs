import json

with open("data/raw_drugs.json", "r") as f:
    drugs = json.load(f)

# Pick a few drugs to showcase
sample_drugs = ["estradiol and norethindrone acetate", "ibuprofen", "tramadol hydrochloride"]

for name in sample_drugs:
    for d in drugs:
        if d['generic_name'] == name:
            print(f"Generic: {d['generic_name']}")
            print(f"Brands: {d['brand_name']}")
            print(f"Description: {d['description']}")
            print(f"Indication: {d['indication']}")
            print("-" * 40)
            break
