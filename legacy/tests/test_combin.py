import re

def standardize(text):
    text = re.sub(r'\s+', ' ', text.strip().lower())
    text = re.sub(r'\s*(?:/|and|&|\+)\s*', ' and ', text, flags=re.IGNORECASE)
    # Also standardize multiple 'and's
    text = re.sub(r'(?:and\s*)+', 'and ', text)
    return text

print(standardize("estradiol / norethindrone acetate"))
print(standardize("estradiol/norethindrone acetate"))
print(standardize("EstradIOL NORETHINDRONE"))
print(standardize("Estradiol And Norethindrone Acetate"))
