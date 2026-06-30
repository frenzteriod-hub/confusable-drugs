import re

def standardize_formatting(brand, generic):
    brand_clean = re.sub(r'\s+', ' ', str(brand).strip())
    generic_clean = re.sub(r'\s+', ' ', str(generic).strip().lower())
    
    # Normalize generic combination separators
    generic_clean = re.sub(r'\s*(?:/|and|&|\+)\s*', ' and ', generic_clean, flags=re.IGNORECASE)
    
    # Standardize the Estradiol and Norethindrone Acetate variations
    generic_clean = re.sub(r'estradiol\s*(?:and\s*)?norethindrone(?:\s*acetate)?', 'estradiol and norethindrone acetate', generic_clean)
    
    brand_clean = brand_clean.title()
    brand_clean = brand_clean.rstrip(',.;- ')
    generic_clean = generic_clean.rstrip(',.;- ')
    return brand_clean, generic_clean

print(standardize_formatting("Lopreeza Brand", "estradiol / norethindrone acetate"))
print(standardize_formatting("Brand", "estradiol/norethindrone acetate"))
print(standardize_formatting("Generic", "EstradIOL NORETHINDRONE"))
print(standardize_formatting("Generic", "EstradIOLNORETHINDRONE"))
print(standardize_formatting("Brand", "Estradiol And Norethindrone Acetate"))
