import sys
from lasa_engine import LASADetector, generate_tallman_lettering

def main():
    print("=" * 60)
    print("        LOOK-ALIKE SOUND-ALIKE (LASA) PRESCRIPTION AUDITOR")
    print("=" * 60)
    
    # Initialize detector
    detector = LASADetector()
    
    if not detector.drugs:
        print("\nERROR: No drug database found. Please run ingest_fda.py first.")
        sys.exit(1)
        
    print(f"Loaded {len(detector.drugs)} drugs from openFDA database.")
    print("Ready to audit prescriptions. Enter 'exit' to quit.\n")
    
    while True:
        try:
            rx_input = input("Enter mock prescription (or 'exit'): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nExiting.")
            break
            
        if not rx_input:
            continue
            
        if rx_input.lower() == 'exit':
            print("Goodbye.")
            break
            
        print("\n" + "-" * 50)
        print("AUDIT RESULTS:")
        print("-" * 50)
        
        # Scan prescription
        warnings = detector.scan_prescription(rx_input, threshold=0.85)
        
        if not warnings:
            print("✅ No critical Look-Alike Sound-Alike (LASA) warnings or unrecognized drugs detected.")
            print("Note: Always perform standard clinical double-checks.")
        else:
            for idx, warn in enumerate(warnings, 1):
                w_type = warn["type"]
                term = warn["term"]
                message = warn["message"]
                
                if w_type == "LASA_WARNING":
                    matched = warn["matched_drug"]
                    print(f"\n⚠️  Warning #{idx}: HIGH-RISK CONFUSABLE DRUG FOUND")
                    print(f"   • Prescribed: '{term}' (Matched: {matched['brand_name']} / {matched['generic_name']})")
                    print(f"   • Class:      {matched['therapeutic_class']}")
                    print(f"   • Warning:    {message}")
                    print(f"   • Highly confusable with:")
                    
                    for conf in warn["confusable_with"]:
                        conf_drug = conf["drug"]
                        sim = conf["similarity"] * 100
                        tml_target, tml_match = conf["tml_target"], conf["tml_match"]
                        
                        print(f"     - {tml_match} (Brand: {conf_drug['brand_name']})")
                        print(f"       Similarity: {sim:.1f}% | Class: {conf_drug['therapeutic_class']}")
                        print(f"       Indication: {conf_drug['indication']}")
                        
                elif w_type == "SPELLING_CORRECTION":
                    print(f"\n❓ Warning #{idx}: UNRECOGNIZED DRUG (Potential Typo)")
                    print(f"   • Prescribed: '{term}'")
                    print(f"   • Suggestion: {message}")
                    print(f"   • Close matches in database:")
                    
                    for sugg in warn["suggestions"]:
                        sugg_drug = sugg["drug"]
                        sim = sugg["similarity"] * 100
                        tml_target, tml_match = sugg["tml_target"], sugg["tml_match"]
                        
                        print(f"     - {tml_match} (Brand: {sugg_drug['brand_name']})")
                        print(f"       Similarity: {sim:.1f}% | Class: {sugg_drug['therapeutic_class']}")
                        print(f"       Indication: {sugg_drug['indication']}")
                        
        print("-" * 50 + "\n")

if __name__ == "__main__":
    main()
