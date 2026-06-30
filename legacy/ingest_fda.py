import json
import os
import re

LOCAL_FILE_PATH = os.path.join(os.path.dirname(__file__), "data", "drug-drugsfda-0001-of-0001.json")

# Mandatory clinical drugs for safety alerts validation
MANDATORY_MAPPINGS = {
    "tramadol": "Ultram", "trazodone": "Desyrel",
    "hydroxyzine": "Atarax", "hydralazine": "Apresoline",
    "metformin": "Glucophage", "metronidazole": "Flagyl",
    "prednisone": "Deltasone", "prednisolone": "Prelone",
    "bupropion": "Wellbutrin", "buspirone": "Buspar",
    "ranitidine": "Zantac", "cetirizine": "Zyrtec",
    "celecoxib": "Celebrex", "citalopram": "Celexa",
    "lamotrigine": "Lamictal", "terbinafine": "Lamisil",
    "olanzapine": "Zyprexa", "propranolol": "Inderal",
    "amlodipine": "Norvasc", "amiodarone": "Cordarone",
    "clonazepam": "Klonopin", "clonidine": "Catapres",
    "dopamine": "Intropin", "dobutamine": "Dobutrex",
    "ephedrine": "Akovaz", "epinephrine": "EpiPen",
    "paroxetine": "Paxil", "clopidogrel": "Plavix",
    "fexofenadine": "Allegra", "sildenafil": "Viagra",
    "loratadine": "Claritin", "desloratadine": "Clarinex",
    "paclitaxel": "Taxol", "docetaxel": "Taxotere",
    "vinblastine": "Velban", "vincristine": "Oncovin"
}

# --- DATA SANITIZATION PIPELINE MODULES ---

# Step 1: The Classification Fixer (Rule-Based Logic)
GENERIC_SALT_KEYWORDS = [
    "citrate", "hydrochloride", "sulfate", "macrocrystals", "sodium", 
    "potassium", "phosphate", "chloride", "maleate", "tartrate", 
    "mesylate", "acetate", "fumarate", "calcium"
]

def sanitize_classification(brand, generic):
    brand_lower = brand.lower()
    # Check if a generic chemical salt is in the brand name column
    for keyword in GENERIC_SALT_KEYWORDS:
        if keyword in brand_lower:
            print(f"Classification Fixer: Swapping generic brand candidate '{brand}' with generic '{generic}'")
            return generic, brand
    return brand, generic

# Step 2: The Typo Fixer (Levenshtein Distance Logic)
GROUND_TRUTH_GENERICS = [
    "tramadol", "trazodone", "hydroxyzine", "hydralazine", "metformin", "metronidazole", 
    "prednisone", "prednisolone", "bupropion", "buspirone", "ranitidine", "cetirizine", 
    "celecoxib", "citalopram", "lamotrigine", "terbinafine", "olanzapine", "propranolol", 
    "amlodipine", "amiodarone", "clonazepam", "clonidine", "dopamine", "dobutamine", 
    "ephedrine", "epinephrine", "paroxetine", "clopidogrel", "fexofenadine", "sildenafil", 
    "loratadine", "desloratadine", "paclitaxel", "docetaxel", "vinblastine", "vincristine", 
    "nitrofurantoin", "tizanidine", "guanfacine", "atorvastatin", "simvastatin", "lisinopril", 
    "losartan", "valsartan", "gabapentin", "ibuprofen", "acetaminophen", "aspirin", 
    "furosemide", "spironolactone", "carvedilol", "metoprolol", "atenolol", "duloxetine", 
    "escitalopram", "sertraline", "fluoxetine", "venlafaxine", "alprazolam", "lorazepam", 
    "diazepam", "zolpidem", "melatonin", "omeprazole", "pantoprazole", "esomeprazole", 
    "famotidine", "ondansetron", "dexamethasone", "methylprednisolone", "hydrocortisone", 
    "levothyroxine", "liothyronine"
]

# Build comprehensive MASTER Whitelist Dictionary of safe drug active ingredients
MASTER_DICTIONARY = set(GROUND_TRUTH_GENERICS + [
    "abacavir", "abatacept", "abciximab", "abiraterone", "abrocitinib", "acalabrutinib", 
    "acebutolol", "acetazolamide", "acetylcholine", "acetylcysteine", "acitretin", 
    "actinomucin", "acyclovir", "adalimumab", "adapalene", "adefovir", "adenosine", 
    "afatinib", "aflibercept", "albiglutide", "albuterol", "alcaftadine", "alectinib", 
    "alendronate", "alfuzosin", "alirocumab", "allopurinol", "almotriptan", "alogliptin", 
    "alosetron", "alpelisib", "alprazolam", "alprostadil", "altretamine", "ambrisentan", 
    "ambroxol", "amcinonide", "amikacin", "amiloride", "aminocaproic", "aminophylline", 
    "amiodarone", "amitriptyline", "amlodipine", "amoxapine", "amoxicillin", "amphetamine", 
    "amphotericin", "ampicillin", "amrinone", "anagrelide", "anakinra", "anastrozole", 
    "apalsutamide", "apixaban", "apomorphine", "apraclonidine", "aprepitant", "arformoterol", 
    "argatroban", "aripiprazole", "armodafinil", "arsenic", "artemether", "ascorbic", 
    "asenapine", "asparaginase", "aspirin", "atazanavir", "atenolol", "atomoxetine", 
    "atorvastatin", "atovaquone", "atracurium", "atropine", "avanafil", "axitinib", 
    "azacitidine", "azathioprine", "azelaic", "azelastine", "azithromycin", "aztreonam", 
    "baclofen", "balsalazide", "bamilostim", "baricitinib", "bazedoxifene", "beclomethasone", 
    "belimumab", "bempedoic", "benazepril", "bendamustine", "benoxinate", "benzocaine", 
    "benzoyl", "benztropine", "bepotastine", "beractant", "besifloxacin", "betamethasone", 
    "betaxolol", "bethanechol", "betrixaban", "bexarotene", "bicalutamide", "bictegravir", 
    "bimatoprost", "biperiden", "bisoprolol", "bivalirudin", "bleomycin", "blinatumomab", 
    "bortezomib", "bosentan", "bosutinib", "brexpiprazole", "brimonidine", "brinzolamide", 
    "brivaracetam", "bromocriptine", "brompheniramine", "budesonide", "bumetanide", 
    "buprenorphine", "bupropion", "buspirone", "busulfan", "butoconazole", "butorphanol", 
    "cabazitaxel", "cabozantinib", "caffeine", "calcipotriene", "calcitonin", "calcitriol", 
    "candesartan", "capecitabine", "capreomycin", "captopril", "carbamazepine", "carbidopa", 
    "carbinoxamine", "carboplatin", "carfilzomib", "carisoprodol", "carmustine", "carteolol", 
    "carvedilol", "caspofungin", "cefaclor", "cefadroxil", "cefazolin", "cefdinir", 
    "cefditoren", "cefepime", "cefixime", "cefotaxime", "cefotetan", "cefoxitin", 
    "cefpodoxime", "cefprozil", "ceftazidime", "ceftibuten", "ceftobiprole", "ceftriaxone", 
    "cefuroxime", "celecoxib", "celiprolol", "cephalexin", "ceritinib", "certolizumab", 
    "cetirizine", "cetuximab", "cevimeline", "chlordiazepoxide", "chlorhexidine", 
    "chloroquine", "chlorothiazide", "chlorpheniramine", "chlorpromazine", "chlorpropamide", 
    "chlorthalidone", "chlorzoxazone", "cholestyramine", "choriogonadotropin", "ciclesonide", 
    "ciclopirox", "cidofovir", "cilostazol", "cimetidine", "cinacalcet", "ciprofloxacin", 
    "cisplatin", "citalopram", "cladribine", "clarithromycin", "clemastine", "clevidipine", 
    "clindamycin", "clobetasol", "clocortolone", "clofarabine", "clomiphene", "clomipramine", 
    "clonazepam", "clonidine", "clopidogrel", "clorazepate", "clotrimazole", "clozapine", 
    "cobicistat", "cobimetinib", "codeine", "colchicine", "colesevelam", "colestipol", 
    "colistimethate", "copanlisib", "corticotropin", "cortisone", "cresol", "crizotinib", 
    "cromolyn", "crotamiton", "cyanocobalamin", "cyclobenzaprine", "cyclopentolate", 
    "cyclophosphamide", "cyclosporine", "cyproheptadine", "cysteamine", "cytarabine", 
    "dacarbazine", "dacomitinib", "dactinomycin", "daminostim", "dapagliflozin", "dapsone", 
    "daptomycin", "darolutamide", "darbepoetin", "darifenacin", "darunavir", "dasatinib", 
    "daunorubicin", "decitabine", "deferasirox", "deferiprone", "deferoxamine", "deflazacort", 
    "degarelix", "delafloxacin", "delavirdine", "demeclocycline", "desipramine", "desloratadine", 
    "desmopressin", "desonide", "desoximetasone", "desvenlafaxine", "deutetrabenazine", 
    "dexamethasone", "dexlansoprazole", "dexmedetomidine", "dexmethylphenidate", 
    "dexrazoxane", "dextroamphetamine", "dextromethorphan", "diazepam", "diazoxide", 
    "diclofenac", "dicloxacillin", "dicyclomine", "didanosine", "dienestrol", "diethylpropion", 
    "diflorasone", "diflunisal", "digoxin", "dihydroergotamine", "diltiazem", "dimenhydrinate", 
    "dimethyl", "dinutuximab", "diphenhydramine", "diphenoxylate", "dipyridamole", 
    "disopyramide", "disulfiram", "divalproex", "dobutamine", "docetaxel", "docusate", 
    "dofetilide", "dolutegravir", "donepezil", "dopamine", "doravirine", "dorzolamide", 
    "doxazosin", "doxepin", "doxercalciferol", "doxorubicin", "doxycycline", "dronabinol", 
    "dronedarone", "drospirenone", "droxidopa", "dulaglutide", "duloxetine", "dutasteride", 
    "duvelisib", "echothiophate", "econazole", "eculizumab", "edoxaban", "efavirenz", 
    "efinaconazole", "eflornithine", "elagolix", "eliglustat", "elmitrin", "eltrombopag", 
    "eluxadoline", "elvitegravir", "empagliflozin", "emtricitabine", "enalapril", "enalaprilat", 
    "enamostim", "enfuvirtide", "enoxaparin", "entacapone", "entecavir", "entinostat", 
    "entrectinib", "enzalutamide", "ephedrine", "epinastine", "epinephrine", "epirubicin", 
    "eplerenone", "epoetin", "eprosartan", "eptifibatide", "eribulin", "erlotinib", 
    "ertapenem", "erythromycin", "escitalopram", "esmolol", "esomeprazole", "estazolam", 
    "estradiol", "estramustine", "estriol", "estrogen", "estrone", "eszopiclone", 
    "ethacrynic", "ethambutol", "ethinyl", "ethiodized", "ethosuximide", "etidronate", 
    "etodolac", "etomidate", "etoposide", "etravirine", "everolimus", "exemestane", 
    "exenatide", "ezetimibe", "factor", "famciclovir", "famotidine", "fedratinib", 
    "felodipine", "femostim", "fenofibrate", "fenoldopam", "fenoprofen", "fentanyl", 
    "ferumoxytol", "fesoterodine", "fexofenadine", "fidaxomicin", "filgrastim", "finasteride", 
    "fingolimod", "flecainide", "flibanserin", "fluconazole", "flucytosine", "fludarabine", 
    "fludrocortisone", "flumazenil", "flunisolide", "fluocinolone", "fluocinonide", 
    "fluorometholone", "fluorouracil", "fluoxetine", "fluphenazine", "flurandrenolide", 
    "flurazepam", "flurbiprofen", "flutamide", "fluticasone", "fluvastatin", "fluvoxamine", 
    "folic", "follitropin", "fomepizole", "fondaparinux", "formoterol", "fosamprenavir", 
    "fosaprepitant", "foscarnet", "fosfomycin", "fosinopril", "fosphenytoin", "fostemsavir", 
    "frovatriptan", "fulvestrant", "furosemide", "gabapentin", "galantamine", "ganciclovir", 
    "ganirelix", "gatifloxacin", "gefitinib", "gemcitabine", "gemfibrozil", "gemtuzumab", 
    "gentamicin", "glatiramer", "glecaprevir", "glimepiride", "glipizide", "glucagon", 
    "glyburide", "glycerin", "glycopyrrolate", "gonadorelin", "goserelin", "granisetron", 
    "griseofulvin", "guaifenesin", "guanfacine", "guanidine", "halcinonide", "halobetasol", 
    "haloperidol", "heparin", "homatropine", "hydralazine", "hydrochlorothiazide", 
    "hydrocodone", "hydrocortisone", "hydromorphone", "hydroxocobalamin", "hydroxychloroquine", 
    "hydroxyprogesterone", "hydroxyurea", "hydroxyzine", "hyoscyamine", "ibandronate", 
    "ibrutinib", "ibuprofen", "ibutilide", "icatibant", "icosapent", "idarubicin", 
    "idartrast", "idursulfase", "isavuconazonium", "isocarboxazid", "isoflurane", 
    "isoniazid", "isoproterenol", "isosorbide", "isotretinoin", "isradipine", "itraconazole", 
    "ivabradine", "ivacaftor", "ixabepilone", "ixazomib", "ketoconazole", "ketoprofen", 
    "ketorolac", "labetalol", "lacosamide", "lactulose", "lamivudine", "lamotrigine", 
    "lansoprazole", "lanthanum", "lapatinib", "larotrectinib", "latanoprost", "leflunomide", 
    "lenalidomide", "lenvatinib", "letrozole", "leucovorin", "leuprolide", "levalbuterol", 
    "levetiracetam", "levobunolol", "levocabastine", "levocarnitine", "levocetirizine", 
    "levofloxacin", "levoleucovorin", "levomilnacipran", "levonorgestrel", "levorphanol", 
    "levothyroxine", "lidocaine", "linaclotide", "linagliptin", "linezolid", "liothyronine", 
    "lisinopril", "lithium", "lodoxamide", "lofexidine", "lomustine", "loperamide", 
    "lopinavir", "loratadine", "lorazepam", "lorlatinib", "losartan", "loteprednol", 
    "lovastatin", "loxapine", "lubiprostone", "luliconazole", "lurasidone", "lusutrombopag", 
    "macitentan", "maprotiline", "maraviroc", "mazindol", "mebendazole", "mechlorethamine", 
    "meclizine", "meclofenamate", "medrysone", "medroxyprogesterone", "mefenamic", 
    "mefloquine", "megestrol", "meloxicam", "melphalan", "memantine", "mepenzolate", 
    "meperidine", "mephentermine", "mephenytoin", "mephobarbital", "mepivacaine", 
    "meprobamate", "mercaptopurine", "meropenem", "mesalamine", "mesna", "metaproterenol", 
    "metaxalone", "metformin", "methadone", "methamphetamine", "methazolamide", 
    "methenamine", "methimazole", "methocarbamol", "methohexital", "methotrexate", 
    "methoxsalen", "methscopolamine", "methyclothiazide", "methyldopa", "methyldopate", 
    "methylene", "methylergonovine", "methylphenidate", "methylprednisolone", "methyltestosterone", 
    "metipranolol", "metoclopramide", "metolazone", "metoprolol", "metronidazole", 
    "metyrosine", "mexiletine", "midodrine", "mifepristone", "miglitol", "milnacipran", 
    "milrinone", "mineral", "minocycline", "minoxidil", "mirtazapine", "misoprostol", 
    "mitomycin", "mitotane", "mitoxantrone", "modafinil", "moexipril", "mometasone", 
    "montelukast", "morphine", "moxifloxacin", "mupirocin", "mycophenolate", "nabilone", 
    "nabumetone", "nadolol", "naftifine", "naldemedine", "nalexol", "nalmefene", 
    "naloxone", "naltrexone", "napadostim", "naproxen", "naratriptan", "natamycin", 
    "nateglinide", "nebivolol", "nedocromil", "nefazodone", "nelarabine", "nelfinavir", 
    "neomycin", "nepafenac", "neratinib", "nesiritide", "nevirapine", "niacin", 
    "nicardipine", "nicotine", "nifedipine", "nilutamide", "nimodipine", "nintedanib", 
    "nisoldipine", "nitazoxanide", "nitrofurantoin", "nitroglycerin", "nizatidine", 
    "norepinephrine", "norethindrone", "norfloxacin", "nortriptyline", "nystatin", 
    "obinutuzumab", "obiltoxaximab", "ocrelizumab", "octreotide", "ofloxacin", "olanzapine", 
    "olapatadine", "olaparib", "olmesartan", "olodaterol", "olsalazine", "omalizumab", 
    "omeprazole", "ondansetron", "opipramol", "oritavancin", "orlistat", "orphenadrine", 
    "oseltamivir", "osimertinib", "oxacillin", "oxaliplatin", "oxandrolone", "oxaprozin", 
    "oxazepam", "oxcarbazepine", "oxiconazole", "otilonium", "oxybutynin", "oxycodone", 
    "oxymorphone", "oxytetracycline", "oxytocin", "paclitaxel", "palbociclib", "paliperidone", 
    "palonosetron", "pamidronate", "pancrelipase", "pancuronium", "panobinostat", 
    "pantoprazole", "paricalcitol", "paromomycin", "paroxetine", "pazopanib", "pegademase", 
    "pegaspargase", "pegfilgrastim", "pemetrexed", "penbutolol", "penciclovir", "penicillamine", 
    "penicillin", "pentamidine", "pentazocine", "pentobarbital", "pentosan", "pentoxifylline", 
    "perampanel", "pergolide", "perindopril", "permethrin", "perphenazine", "phenazopyridine", 
    "phenelzine", "phenobarbital", "phenoxybenzamine", "phentermine", "phentolamine", 
    "phenylephrine", "phenytoin", "physostigmine", "phytonadione", "pibrentasvir", 
    "pilocarpine", "pimecrolimus", "pimozide", "pindolol", "pioglitazone", "piperacillin", 
    "pirfenidone", "piroxicam", "plazomicin", "plecanatide", "polymyxin", "posaconazole", 
    "potassium", "pramipexole", "pramlintide", "prasugrel", "pravastatin", "praziquantel", 
    "prazosin", "prednicarbate", "prednisolone", "prednisone", "pregabalin", "primidone", 
    "probenecid", "procainamide", "procarbazine", "prochlorperazine", "progesterone", 
    "promethazine", "propafenone", "propantheline", "proparacaine", "propofol", "propranolol", 
    "propylthiouracil", "protriptyline", "prucalopride", "pyrazinamide", "pyridostigmine", 
    "pyrimethamine", "quetiapine", "quinapril", "quinidine", "quinine", "rabeprazole", 
    "raloxifene", "raltegravir", "ramelteon", "ramipril", "ranolazine", "rasagiline", 
    "regadenoson", "regorafenib", "repaglinide", "reserpine", "ribavirin", "rifabutin", 
    "rifampin", "rifapentine", "rifaximin", "riluzole", "rimantadine", "rimexolone", 
    "riociguat", "risperidone", "ritonavir", "rivaroxaban", "rivastigmine", "rizatriptan", 
    "roflumilast", "ropinirole", "ropivacaine", "rosiglitazone", "rosuvastatin", "ruboxistaurin", 
    "rufinamide", "ruxolitinib", "sacubitril", "salmeterol", "sancuso", "sapropterin", 
    "saquinavir", "sarecycline", "secobarbital", "selegiline", "selenium", "selexipag", 
    "semaglutide", "sertaconazole", "sertraline", "sevelamer", "sevoflurane", "sildenafil", 
    "silodosin", "silver", "simvastatin", "sincalide", "siponimod", "sirolimus", 
    "sitagliptin", "sodium", "sofosbuvir", "solifenacin", "somatropin", "sorafenib", 
    "sotalol", "spironolactone", "sucralfate", "sufentanil", "sulconazole", "sulfacetamide", 
    "sulfadiazine", "sulfamethoxazole", "sulfasalazine", "sulindac", "sumatriptan", 
    "sunitinib", "suvorexant", "tacrolimus", "tadalafil", "tafluprost", "talazoparib", 
    "tamoxifen", "tamsulosin", "tasonermin", "tavaborole", "tazarotene", "tazobactam", 
    "tazemetostat", "telmisartan", "temazepam", "temozolomide", "temsirolimus", "tenofovir", 
    "terazosin", "terbinafine", "terbutaline", "terconazole", "teriparatide", "testosterone", 
    "tetracycline", "tetrahydrozoline", "thalidomide", "theophylline", "thioridazine", 
    "thiothixene", "thyroid", "tiagabine", "ticagrelor", "ticlopidine", "tigecycline", 
    "timolol", "timidazole", "tioconazole", "tiotropium", "tipranavir", "tirapatest", 
    "tirzepatide", "tizanidine", "tobramycin", "tocainide", "tofacitinib", "tolazamide", 
    "tolbutamide", "tolcapone", "tolmetin", "tolterodine", "tolvaptan", "topiramate", 
    "topotecan", "torsemide", "toviaz", "tramadol", "trametinib", "trandolapril", 
    "tranexamic", "tranylcypromine", "trastuzumab", "travoprost", "trazodone", "treprostinil", 
    "tretinoin", "triamcinolone", "triamterene", "triazolam", "trifluoperazine", "trifluridine", 
    "trihexyphenidyl", "trimethobenzamide", "trimethoprim", "trimipramine", "triptorelin", 
    "trospium", "tucatinib", "ublituximab", "ulipristal", "umeclidinium", "upadacitinib", 
    "uracil", "urea", "ursodiol", "valacyclovir", "valganciclovir", "valproate", 
    "valproic", "valsartan", "vancomycin", "vardenafil", "varenicline", "vecuronium", 
    "velpatasvir", "vemurafenib", "venlafaxine", "verapamil", "vigabatrin", "vilazodone", 
    "vinblastine", "vincristine", "vinorelbine", "voriconazole", "vortioxetine", "voxelotor", 
    "warfarin", "yamostim", "zafirlukast", "zalcitabine", "zaleplon", "zanamivir", 
    "zidovudine", "zileuton", "ziprasidone", "zoledronic", "zolmitriptan", "zolpidem", 
    "zonisamide", "zopiclone", "zotepine"
])

# Track items flagged for manual clinical review
manual_review_queue = []

def levenshtein_distance(s1, s2):
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
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

def sanitize_typos(generic_name, record_id=""):
    gen_lower = generic_name.strip().lower()
    
    # Step 1: Whitelist check (Exact Match Override)
    # If the full generic active ingredient already exists in the whitelist, immediately save
    if gen_lower in MASTER_DICTIONARY:
        return gen_lower
        
    words = gen_lower.split()
    corrected_words = []
    
    for word in words:
        # Check components of combination therapies
        if word in MASTER_DICTIONARY:
            corrected_words.append(word)
            continue
            
        # Ignore chemical salt descriptors and common combo connectors
        is_salt = False
        for salt in ["hydrochloride", "sulfate", "sodium", "phosphate", "chloride", "maleate", "potassium", "calcium", "acetate", "tartrate", "mesylate", "and"]:
            if word == salt:
                is_salt = True
                break
                
        if is_salt:
            corrected_words.append(word)
            continue
            
        # Step 2: Typo check via Levenshtein edit distance <= 2
        candidates = []
        for gt in MASTER_DICTIONARY:
            dist = levenshtein_distance(word, gt)
            if dist <= 2:
                candidates.append((gt, dist))
                
        if len(candidates) == 1:
            best_match = candidates[0][0]
            print(f"Typo Fixer: Auto-corrected generic misspelling '{word}' -> '{best_match}'")
            corrected_words.append(best_match)
        elif len(candidates) > 1:
            # Step 3: Ambiguous safety net (Multiple matches found, flag for human review!)
            matches_names = [c[0] for c in candidates]
            print(f"Typo Fixer [CRITICAL]: Ambiguous misspelling '{word}'. Matches: {matches_names}. Sent to manual review.")
            manual_review_queue.append({
                "record_id": record_id,
                "input_string": word,
                "context_full": gen_lower,
                "candidates": matches_names,
                "reason": "Ambiguous distance alignment between multiple whitelisted drugs"
            })
            corrected_words.append(word)
        else:
            # No matching whitelisted drug at distance <= 2, keep original and flag
            print(f"Typo Fixer [WARNING]: Unknown drug term '{word}'. Sent to manual review.")
            manual_review_queue.append({
                "record_id": record_id,
                "input_string": word,
                "context_full": gen_lower,
                "candidates": [],
                "reason": "No match found in master dictionary within distance threshold"
            })
            corrected_words.append(word)
            
    return " ".join(corrected_words)

# Step 3: The Formatting Standardizer (Regex & Capitalization)
def standardize_formatting(brand, generic):
    brand_clean = re.sub(r'\s+', ' ', str(brand).strip())
    generic_clean = re.sub(r'\s+', ' ', str(generic).strip().lower())
    
    # Normalize generic combination separators
    generic_clean = re.sub(r'\s*(?:/|and|&|\+)\s*', ' and ', generic_clean, flags=re.IGNORECASE)
    
    # Standardize the Estradiol and Norethindrone Acetate variations
    generic_clean = re.sub(r'estradiol\s*(?:and\s*)?norethindrone(?:\s*acetate)?', 'estradiol and norethindrone acetate', generic_clean)
    
    # Capitalize Brand Name
    brand_clean = brand_clean.title()
    
    # Strip punctuation borders
    brand_clean = brand_clean.rstrip(',.;- ')
    generic_clean = generic_clean.rstrip(',.;- ')
    
    return brand_clean, generic_clean

# Biosimilar Suffix Cleansing Helper
def clean_generic_name(generic_name):
    # Strip trailing biosimilar suffixes (e.g. "-aacf", "-fkjp")
    name = re.sub(r'-[a-z]{4}$', "", generic_name.strip().lower())
    return name

# --- DYNAMIC AGGREGATION HELPERS ---
def generate_description(sponsor, dosage_form, route):
    desc = "FDA Approved Prescription Drug."
    if sponsor and sponsor.lower() != "unknown sponsor":
        desc += f" Manufactured by {sponsor}."
    else:
        desc += " Manufactured by various generic providers."
    if dosage_form and route:
        desc += f" Formulation: {dosage_form} for {route} administration."
    return desc

def generate_indication(epc_class):
    if epc_class and epc_class.lower() != "unknown class":
        return f"Used as a therapeutic agent for indications related to: {epc_class}."
    return "Therapeutic classification and specific indication data are not natively provided in this dataset."

def update_drug_record(unique_drugs, generic_clean, brand_clean, sponsor, epc_class, dosage_form, route):
    # Strip cross-contaminated generic names from the brand column
    if brand_clean:
        brand_items = [b.strip() for b in brand_clean.split(",") if b.strip()]
        cleaned_items = []
        for b in brand_items:
            b_words = b.lower().split()
            is_contaminated = False
            for w in b_words:
                # If a word matches another generic in MASTER_DICTIONARY, filter it out
                if w in MASTER_DICTIONARY and w != generic_clean.split()[0].lower():
                    is_contaminated = True
                    break
            if is_contaminated:
                print(f"Cross-contamination Filter: Discarding brand name '{b}' for generic '{generic_clean}'")
                continue
            cleaned_items.append(b)
        brand_clean = ", ".join(cleaned_items)
        
    # Fallback for common generic brand mappings if they end up empty or generic
    if not brand_clean or brand_clean.strip().lower() in ["", "generic product", "afatinib", "imatinib"]:
        fallbacks = {
            "imatinib mesylate": "Gleevec",
            "afatinib": "Gilotrif",
            "afatinib mesylate": "Gilotrif"
        }
        brand_clean = fallbacks.get(generic_clean.lower(), "Generic Product")

    if generic_clean not in unique_drugs:
        desc = generate_description(sponsor, dosage_form, route)
        ind = generate_indication(epc_class)
        broad_cat = classify_drug(generic_clean, brand_clean, epc_class, desc, ind)
        
        unique_drugs[generic_clean] = {
            "id": "",
            "generic_name": generic_clean,
            "brand_name": brand_clean,
            "brand_names_set": {brand_clean} if brand_clean else set(),
            "therapeutic_class": epc_class if epc_class else "Unknown Class",
            "broad_category": broad_cat,
            "description": desc,
            "indication": ind,
            "sponsor": sponsor if sponsor else "Unknown Sponsor",
            "dosage_form": dosage_form,
            "route": route
        }
    else:
        existing = unique_drugs[generic_clean]
        
        # Aggregate brand names
        if brand_clean:
            existing["brand_names_set"].add(brand_clean)
            sorted_brands = sorted(list(existing["brand_names_set"]))
            existing["brand_name"] = ", ".join(sorted_brands)
            
        # Backfill missing data
        if existing["therapeutic_class"] == "Unknown Class" and epc_class and epc_class != "Unknown Class":
            existing["therapeutic_class"] = epc_class
            existing["indication"] = generate_indication(epc_class)
            
        if existing["sponsor"] == "Unknown Sponsor" and sponsor and sponsor != "Unknown Sponsor":
            existing["sponsor"] = sponsor
            existing["description"] = generate_description(sponsor, existing["dosage_form"], existing["route"])
# --- GENERAL EXCLUSIONS FILTER ---
EXCLUDED_SUBSTRINGS = [
    "oxygen", "nitrogen", "carbon dioxide", "helium", "xenon", "air", "water", 
    "barium", "gadolinium", "technetium", "irrigation", "saline", "sodium chloride",
    "dextrose", "ringer", "imaging", "contrast", "diagnostic", "sulfur", "isotone",
    "glacial", "anhydrous", "foam", "device", "reagent", "lubricant", "shampoo",
    "toothpaste", "mouthwash", "fluoride", "calcium chloride", "potassium chloride",
    "magnesium sulfate", "trace elements", "lipids", "amino acids", "electrolytes",
    "sterile"
]

def is_clean_drug(generic, brand):
    gen_lower = generic.lower()
    brand_lower = brand.lower()
    
    # Exclude technical/junk matches
    for s in EXCLUDED_SUBSTRINGS:
        if s in gen_lower or s in brand_lower:
            return False
            
    # Length limits to exclude massive mixtures
    if len(generic) > 35 or len(brand) > 35:
        return False
        
    # Exclude generic brand names
    clean_gen = gen_lower
    for salt in [" hydrochloride", " sulfate", " sodium", " phosphate", " chloride", " maleate", " potassium", " calcium", " acetate", " tartrate", " mesylate"]:
        clean_gen = clean_gen.replace(salt, "")
        
    clean_brand = brand_lower
    for salt in [" hydrochloride", " sulfate", " sodium", " phosphate", " chloride", " maleate", " potassium", " calcium", " acetate", " tartrate", " mesylate"]:
        clean_brand = clean_brand.replace(salt, "")
        
    if clean_brand in clean_gen or clean_gen in clean_brand:
        return False
        
    # Exclude names with numbers or chemical formulas
    if any(char.isdigit() for char in generic) or any(char.isdigit() for char in brand):
        return False
        
    # Exclude weird symbols
    if re.search(r'[^a-zA-Z\s\/\-\,]', generic) or re.search(r'[^a-zA-Z\s\/\-\,]', brand):
        return False
        
    return True

# --- THERAPEUTIC CLASS CLASSIFIER ---
def classify_drug(generic_name, brand_name, epc_class, description, indication):
    # 1. Try USAN generic stems first
    stems = {
        "Cardiovascular System": [
            "olol", "pril", "sartan", "dipine", "statin", "fibrat", "grel", "osin", "artan"
        ],
        "Central Nervous System": [
            "azepam", "azolam", "oxetine", "triptan", "caine", "tal", "adol", "idone",
            "pine", "phetamine", "barb", "pam"
        ],
        "Antimicrobials & Infectious Diseases": [
            "cillin", "cef", "ceph", "mycin", "cyclines", "oxacin", "conazole", "vir",
            "penem", "floxacin", "thromycin", "dazole"
        ],
        "Endocrine & Metabolic": [
            "sone", "olone", "glitazone", "gli", "steride", "formin", "pred", "estrol",
            "gest", "trin", "tide"
        ],
        "Respiratory & Allergy": [
            "terol", "phylline", "lukast", "relix", "tidine", "rizine", "dine", "mine"
        ],
        "Gastrointestinal System": [
            "prazole", "setron", "carb", "luma"
        ],
        "Oncology & Immunology": [
            "mab", "nib", "taxel", "poside", "platin", "rubicin", "imus", "cept"
        ]
    }
    
    name = generic_name.lower()
    for category, stem_list in stems.items():
        for stem in stem_list:
            if stem in name:
                return category

    # 2. Fallback to keyword matching in description and class
    text_to_search = f"{generic_name} {brand_name} {epc_class} {description} {indication}".lower()
    keywords = {
        "Cardiovascular System": [
            "calcium channel blocker", "beta blocker", "antiarrhythmic", "angiotensin",
            "diuretic", "statin", "hmg-coa", "antihypertensive", "vasodilator", "cardiovascular",
            "blood pressure", "hypertension", "angina", "arrhythmia", "cholesterol", "lipid",
            "heart failure", "clopidogrel", "platelet"
        ],
        "Central Nervous System": [
            "antidepressant", "antipsychotic", "anxiolytic", "sedative", "anticonvulsant",
            "epilepsy", "opioid", "analgesic", "stimulant", "migraine", "pain", "depression",
            "anxiety", "schizophrenia", "bipolar", "seizure", "parkinson", "alzheimer", "anesthetic",
            "tramadol", "trazodone", "bupropion", "buspirone", "clonazepam", "diazepam", "gaba"
        ],
        "Antimicrobials & Infectious Diseases": [
            "antibiotic", "antibacterial", "antifungal", "antiviral", "antiparasitic",
            "penicillin", "cephalosporin", "macrolide", "fluoroquinolone", "nitroimidazole",
            "infection", "bacterial", "fungal", "virus", "tuberculosis", "malaria", "metronidazole",
            "acyclovir", "terbinafine"
        ],
        "Endocrine & Metabolic": [
            "antidiabetic", "insulin", "thyroid", "corticosteroid", "hormone", "bisphosphonate",
            "diabetes", "hypoglycemic", "glucagon", "estrogen", "progesterone", "testosterone",
            "steroid", "metformin", "prednisone", "prednisolone"
        ],
        "Respiratory & Allergy": [
            "antihistamine", "bronchodilator", "corticosteroid inhalant", "asthma", "allergy",
            "rhinitis", "copd", "inhaler", "h1 antagonist", "decongestant", "cough", "hives",
            "cetirizine", "loratadine", "fexofenadine", "montelukast"
        ],
        "Gastrointestinal System": [
            "h2 blocker", "proton pump inhibitor", "antacid", "laxative", "antiemetic",
            "gerd", "acid reflux", "ulcer", "heartburn", "constipation", "nausea", "diarrhea",
            "ranitidine", "famotidine", "omeprazole"
        ],
        "Oncology & Immunology": [
            "chemotherapy", "immunomodulator", "immunosuppressant", "antineoplastic",
            "monoclonal antibody", "cancer", "tumor", "immuno", "rheumatoid", "autoimmune",
            "paclitaxel", "docetaxel", "vinblastine", "vincristine", "abatacept"
        ]
    }
    
    for category, words in keywords.items():
        for word in words:
            if word in text_to_search:
                return category
                
    return "Miscellaneous / Other"

# --- MAIN INGESTION RUNNER ---
def ingest_data_local(max_records=1500):
    print(f"Starting Sanitized local openFDA Drugs@FDA parsing from: {LOCAL_FILE_PATH}...")
    
    if not os.path.exists(LOCAL_FILE_PATH):
        print(f"Error: Local file {LOCAL_FILE_PATH} not found.")
        return
        
    try:
        with open(LOCAL_FILE_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        results = data.get("results", [])
        print(f"Loaded {len(results)} application records from archive.")
        
        unique_drugs = {}
        
        # Pass 1: Seed mandatory clinical safety validation entries
        for record in results:
            openfda = record.get("openfda", {})
            generic_names = openfda.get("generic_name", [])
            app_no = record.get("application_number", "UNKNOWN")
            
            if generic_names:
                for gen in generic_names:
                    # Apply Sanitizer: Biosimilar Stripping
                    gen_clean = clean_generic_name(gen)
                    
                    # Apply Sanitizer: Whitelisted typo corrector
                    gen_clean = sanitize_typos(gen_clean, record_id=app_no)
                    
                    # Remove common salt suffixes for stem key matching
                    base_key = gen_clean
                    for salt in [" hydrochloride", " sulfate", " sodium", " phosphate", " chloride", " maleate", " potassium", " calcium", " acetate", " tartrate", " mesylate"]:
                        base_key = base_key.replace(salt, "")
                    base_key = base_key.strip()
                    
                    if base_key in MANDATORY_MAPPINGS:
                        brand_name = MANDATORY_MAPPINGS[base_key]
                        
                        # Apply Sanitizer: Classification Fixer
                        brand_name, gen_clean = sanitize_classification(brand_name, gen_clean)
                        
                        # Apply Sanitizer: Formatting Standardizer
                        brand_name, gen_clean = standardize_formatting(brand_name, gen_clean)
                        
                        sponsor = record.get("sponsor_name")
                        sponsor_name = str(sponsor).strip().title() if sponsor else "Unknown Sponsor"
                        
                        pharm_classes = openfda.get("pharm_class_epc", [])
                        epc_class = str(pharm_classes[0]).strip() if pharm_classes and pharm_classes[0] else "Unknown Class"
                        
                        products = record.get("products", [])
                        dosage_form = "Tablet"
                        route = "Oral"
                        if products and products[0]:
                            df = products[0].get("dosage_form")
                            rt = products[0].get("route")
                            if df:
                                dosage_form = str(df).strip().title()
                            if rt:
                                route = str(rt).strip().title()
                                
                        update_drug_record(unique_drugs, gen_clean, brand_name, sponsor_name, epc_class, dosage_form, route)
                        
        print(f"Ingested {len(unique_drugs)} mandatory clinical safety validation entries.")
        
        # Pass 2: Ingest other clean branded entries
        for record in results:
            if len(unique_drugs) >= max_records:
                break
                
            openfda = record.get("openfda", {})
            products = record.get("products", [])
            app_no = record.get("application_number", "UNKNOWN")
            
            is_rx = False
            for p in products:
                if p.get("marketing_status") == "Prescription":
                    is_rx = True
                    break
            if not is_rx:
                continue
                
            brand_names = openfda.get("brand_name", [])
            generic_names = openfda.get("generic_name", [])
            
            if not brand_names and products:
                brand_names = [p.get("brand_name") for p in products if p.get("brand_name")]
            if not generic_names and products:
                for p in products:
                    for ing in p.get("active_ingredients", []):
                        if ing.get("name"):
                            generic_names.append(ing.get("name"))
                            
            if not brand_names or not generic_names:
                continue
                
            first_brand = brand_names[0]
            first_generic = generic_names[0]
            if not first_brand or not first_generic:
                continue
                
            raw_brand = str(first_brand)
            raw_generic = str(first_generic)
            
            # Apply Sanitizer: Biosimilar Suffix Stripping
            generic_clean = clean_generic_name(raw_generic)
            
            # Apply Sanitizer: Whitelisted Typo Corrector
            generic_clean = sanitize_typos(generic_clean, record_id=app_no)
            
            # Apply Sanitizer: Classification Fixer
            brand_clean, generic_clean = sanitize_classification(raw_brand, generic_clean)
            
            # Apply Sanitizer: Formatting Standardizer
            brand_clean, generic_clean = standardize_formatting(brand_clean, generic_clean)
            
            # Aggregate or add by generic name
            if is_clean_drug(generic_clean, brand_clean):
                sponsor = record.get("sponsor_name")
                sponsor_name = str(sponsor).strip().title() if sponsor else "Unknown Sponsor"
                
                pharm_classes = openfda.get("pharm_class_epc", [])
                epc_class = str(pharm_classes[0]).strip() if pharm_classes and pharm_classes[0] else "Unknown Class"
                
                dosage_form = "Tablet"
                route = "Oral"
                if products and products[0]:
                    df = products[0].get("dosage_form")
                    rt = products[0].get("route")
                    if df:
                        dosage_form = str(df).strip().title()
                    if rt:
                        route = str(rt).strip().title()
                
                update_drug_record(unique_drugs, generic_clean, brand_clean, sponsor_name, epc_class, dosage_form, route)
                
        # Save output
        data_dir = os.path.dirname(LOCAL_FILE_PATH)
        os.makedirs(data_dir, exist_ok=True)
        output_path = os.path.join(data_dir, "raw_drugs.json")
        review_path = os.path.join(data_dir, "manual_review_queue.json")
        
        drug_list = sorted(list(unique_drugs.values()), key=lambda x: x["generic_name"])
        
        # Re-assign sequential IDs and cleanup temporary properties
        for idx, drug in enumerate(drug_list):
            drug["id"] = f"RAW_{idx + 1:04d}"
            if "brand_names_set" in drug:
                del drug["brand_names_set"]
            if "sponsor" in drug:
                del drug["sponsor"]
            if "dosage_form" in drug:
                del drug["dosage_form"]
            if "route" in drug:
                del drug["route"]
            
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(drug_list, f, indent=2, ensure_ascii=False)
            
        with open(review_path, "w", encoding="utf-8") as f:
            json.dump(manual_review_queue, f, indent=2, ensure_ascii=False)
            
        print(f"\nSuccessfully parsed {len(drug_list)} unique Sanitized Drugs@FDA records. Saved to {output_path}")
        print(f"Flagged {len(manual_review_queue)} entries for human review. Saved to {review_path}")
        
        # Print statistics
        category_counts = {}
        for d in drug_list:
            cat = d["broad_category"]
            category_counts[cat] = category_counts.get(cat, 0) + 1
            
        print("\nBroad Categories Statistics:")
        for cat, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
            print(f" - {cat}: {count}")
            
    except Exception as e:
        print(f"Error parsing local archive: {e}")

if __name__ == "__main__":
    ingest_data_local()
