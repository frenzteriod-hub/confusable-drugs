import sys
import random
from lasa_engine import LASADetector, generate_tallman_lettering, OFFICIAL_TALL_MAN

def get_choices(correct_answer, all_options, num_choices=4):
    choices = [correct_answer]
    options_pool = [opt for opt in all_options if opt != correct_answer]
    choices.extend(random.sample(options_pool, min(num_choices - 1, len(options_pool))))
    random.shuffle(choices)
    return choices

def generic_brand_quiz(detector):
    print("\n--- Generic-to-Brand / Brand-to-Generic Matcher ---")
    score = 0
    total = 5
    
    # Select 5 random drugs
    sample_drugs = random.sample(detector.drugs, min(total, len(detector.drugs)))
    all_brands = [d["brand_name"] for d in detector.drugs]
    all_generics = [d["generic_name"] for d in detector.drugs]
    
    for idx, drug in enumerate(sample_drugs, 1):
        # 50% chance of asking Generic -> Brand or Brand -> Generic
        if random.choice([True, False]):
            correct = drug["brand_name"]
            question = f"What is the brand name of generic '{drug['generic_name']}'?"
            choices = get_choices(correct, all_brands)
        else:
            correct = drug["generic_name"]
            question = f"What is the generic name of brand '{drug['brand_name']}'?"
            choices = get_choices(correct, all_generics)
            
        print(f"\nQuestion {idx}/{total}: {question}")
        for i, choice in enumerate(choices, 1):
            print(f"  {i}. {choice}")
            
        while True:
            try:
                ans = input("Your choice (1-4): ").strip()
                if ans.lower() == 'exit':
                    return
                choice_idx = int(ans) - 1
                if 0 <= choice_idx < len(choices):
                    selected = choices[choice_idx]
                    break
            except ValueError:
                pass
            print("Invalid input. Enter a number between 1 and 4.")
            
        if selected == correct:
            print("✅ Correct!")
            score += 1
        else:
            print(f"❌ Incorrect. The correct answer was: {correct}")
            
    print(f"\nQuiz Finished! Your score: {score}/{total} ({(score/total)*100:.0f}%)")

def tallman_quiz(detector):
    print("\n--- Tall Man Lettering Spelling Quiz ---")
    score = 0
    
    # Filter drugs that have active Tall Man lettering defined in our official map
    tml_drugs = [d for d in detector.drugs if d["generic_name"] in OFFICIAL_TALL_MAN and OFFICIAL_TALL_MAN[d["generic_name"]] != d["generic_name"]]
    
    if not tml_drugs:
        print("No Tall Man Lettering drugs available in database.")
        return
        
    total = min(5, len(tml_drugs))
    sample_drugs = random.sample(tml_drugs, total)
    
    for idx, drug in enumerate(sample_drugs, 1):
        gen = drug["generic_name"]
        correct = OFFICIAL_TALL_MAN[gen]
        
        print(f"\nQuestion {idx}/{total}: Enter the correct Tall Man Lettering for the drug:")
        print(f"   Name (lowercase): {gen}")
        print(f"   (Hint Class: {drug['therapeutic_class']} | Indication: {drug['indication']})")
        
        ans = input("Your spelling: ").strip()
        if ans.lower() == 'exit':
            return
            
        if ans == correct:
            print("✅ Perfect! That is the correct Tall Man Lettering.")
            score += 1
        else:
            print(f"❌ Incorrect. Correct format is: {correct}")
            print(f"   (Remember: Capitalize the unique syllables to distinguish from its look-alike.)")
            
    print(f"\nQuiz Finished! Your score: {score}/{total} ({(score/total)*100:.0f}%)")

def rx_error_quiz(detector):
    print("\n--- Prescription Error Spotter ---")
    print("Analyze the Doctor's prescription vs. what was fetched on the Pill Bottle.")
    score = 0
    total = 5
    
    # Select a pool of drugs
    lasa_groups = {}
    for d in detector.drugs:
        # In this context, we can find confusable pairs dynamically to act as realistic errors!
        sims = detector.find_similar_drugs(d["generic_name"], threshold=0.82)
        if sims:
            lasa_groups[d["generic_name"]] = [s["drug"]["generic_name"] for s in sims]
            
    if not lasa_groups:
        print("No confusable drug pairs found in database to create scenarios.")
        return
        
    for idx in range(1, total + 1):
        # Choose a random drug as the prescribed drug
        prescribed_gen = random.choice(list(lasa_groups.keys()))
        prescribed_drug = next(d for d in detector.drugs if d["generic_name"] == prescribed_gen)
        
        # Decide scenario type:
        # 0: Correct match
        # 1: LASA dispensing error (confusable drug)
        # 2: Totally wrong drug error
        scenario = random.choice([0, 1, 2])
        
        if scenario == 0:
            bottle_name = prescribed_drug["brand_name"]
            bottle_generic = prescribed_drug["generic_name"]
            correct_ans = 1 # Safe to dispense
            dispensing_log = "The brand/generic names match the prescription perfectly."
        elif scenario == 1:
            conf_gen = random.choice(lasa_groups[prescribed_gen])
            conf_drug = next(d for d in detector.drugs if d["generic_name"] == conf_gen)
            # Use either brand or generic on the bottle
            if random.choice([True, False]):
                bottle_name = conf_drug["brand_name"]
            else:
                bottle_name = conf_drug["generic_name"].upper()
            bottle_generic = conf_drug["generic_name"]
            correct_ans = 2 # LASA error
            dispensing_log = f"LASA DISPENSING ERROR: Dispensed '{bottle_name}' ({bottle_generic}) instead of prescribed '{prescribed_drug['brand_name']}' ({prescribed_gen})."
        else:
            # Totally different drug
            unrelated = random.choice([d for d in detector.drugs if d["generic_name"] != prescribed_gen and d["generic_name"] not in lasa_groups.get(prescribed_gen, [])])
            bottle_name = unrelated["brand_name"]
            bottle_generic = unrelated["generic_name"]
            correct_ans = 3 # Unrelated error
            dispensing_log = f"DISPENSING ERROR: Dispensed completely wrong drug '{bottle_name}' ({bottle_generic}) for prescribed '{prescribed_drug['brand_name']}' ({prescribed_gen})."
            
        # Display the prompt
        print(f"\nCase #{idx} of {total}:")
        print(f"   [PRESCRIPTION]  Rx: Take 1 tablet of {prescribed_drug['brand_name']} ({prescribed_drug['generic_name']}) daily.")
        print(f"                   For: {prescribed_drug['indication']}")
        print(f"   [PILL BOTTLE]   Label: {bottle_name} (Active: {bottle_generic})")
        print(f"                   Indication: {next((d['indication'] for d in detector.drugs if d['generic_name'] == bottle_generic), 'Unknown')}")
        
        print("\nWhat is your assessment?")
        print("  1. SAFE TO DISPENSE (Correct match)")
        print("  2. CRITICAL DISPENSING ERROR: Look-Alike Sound-Alike (LASA) risk!")
        print("  3. DISPENSING ERROR: Completely wrong drug selected!")
        
        while True:
            try:
                ans = input("Your answer (1-3): ").strip()
                if ans.lower() == 'exit':
                    return
                choice = int(ans)
                if 1 <= choice <= 3:
                    break
            except ValueError:
                pass
            print("Invalid input. Enter 1, 2, or 3.")
            
        if choice == correct_ans:
            print("✅ Correct Assessment!")
            if scenario != 0:
                print(f"   • {dispensing_log}")
            score += 1
        else:
            print("❌ Incorrect Assessment!")
            print(f"   • Real Situation: {dispensing_log}")
            
    print(f"\nQuiz Finished! Your score: {score}/{total} ({(score/total)*100:.0f}%)")

def main():
    detector = LASADetector()
    if not detector.drugs:
        print("\nERROR: No drug database found. Please run ingest_fda.py first.")
        sys.exit(1)
        
    print("=" * 60)
    print("            CLINICIAN LASA SAFETY TRAINING SYSTEM")
    print("=" * 60)
    print(f"Database contains {len(detector.drugs)} prescription drugs.")
    
    while True:
        print("\nSelect Training Mode:")
        print("  1. Brand-Generic Matcher")
        print("  2. Tall Man Lettering Spelling Quiz")
        print("  3. Prescription Error Spotter")
        print("  4. Exit")
        
        choice = input("Enter choice (1-4): ").strip()
        if choice == '1':
            generic_brand_quiz(detector)
        elif choice == '2':
            tallman_quiz(detector)
        elif choice == '3':
            rx_error_quiz(detector)
        elif choice == '4' or choice.lower() == 'exit':
            print("Exiting training. Stay safe!")
            break
        else:
            print("Invalid selection. Please choose 1, 2, 3, or 4.")

if __name__ == "__main__":
    main()
