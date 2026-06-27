import sys
from lasa_engine import LASADetector

def verify():
    detector = LASADetector()
    print("Database loaded size:", len(detector.drugs))
    assert len(detector.drugs) == 1495, f"Expected 1495 drugs, got {len(detector.drugs)}"
    
    # Check similar drug detection
    similar_to_tramadol = detector.find_similar_drugs("tramadol hydrochloride", threshold=0.8)
    print("Similar to tramadol hydrochloride:")
    for s in similar_to_tramadol[:3]:
        print(f"  - {s['tml_match']} (Brand: {s['drug']['brand_name']}), similarity={s['similarity']:.3f}")
        
    # Find trazodone hydrochloride match
    trazodone_matches = [s for s in similar_to_tramadol if s['drug']['generic_name'] == 'trazodone hydrochloride']
    assert len(trazodone_matches) > 0, "Expected trazodone hydrochloride to be confusable with tramadol hydrochloride"
    print("trazodone similarity match verified!")
    
    # Check prescription scanner - spelling correction
    warnings = detector.scan_prescription("take tranzodone hydrochloride daily")
    print("Scanner warning for spelling correction:")
    for w in warnings:
        print(f"  - Type: {w['type']}, term: {w['term']}, message: {w['message']}")
        for s in w['suggestions'][:2]:
            print(f"    Suggestion: {s['tml_match']}")
            
    assert len(warnings) > 0, "Expected a spelling warning for 'tranzodone'"
    assert warnings[0]['type'] == 'SPELLING_CORRECTION', "Expected type SPELLING_CORRECTION"
    print("Spelling correction verified!")
    
    # Check prescription scanner - LASA warning
    warnings = detector.scan_prescription("take tramadol hydrochloride 50mg daily")
    print("Scanner warning for LASA:")
    for w in warnings:
        print(f"  - Type: {w['type']}, term: {w['term']}, message: {w['message']}")
        for c in w['confusable_with'][:2]:
            print(f"    Confusable with: {c['tml_match']}")
            
    assert len(warnings) > 0, "Expected a LASA warning for 'tramadol hydrochloride'"
    assert warnings[0]['type'] == 'LASA_WARNING', "Expected type LASA_WARNING"
    print("LASA warning verified!")
    
    print("\n✅ ALL PROGRAMMATIC VERIFICATION PASSED!")

if __name__ == "__main__":
    verify()
