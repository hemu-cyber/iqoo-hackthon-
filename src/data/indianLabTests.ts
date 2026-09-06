import { LabTestMetric, SampleDocument } from "../types";
import { INDIAN_MEDICINES_DATABASE } from "./indianMedicines";

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: "sample-rx-apollo",
    title: "Apollo Hospitals OPD Prescription (Acute Viral / Dengue Triage)",
    hospitalOrLab: "Apollo Hospitals, Sarita Vihar",
    city: "New Delhi",
    type: "prescription",
    description: "Doctor's OPD prescription for sudden high fever (102.4°F), retro-orbital eye pain, and acute body ache during Delhi monsoon season.",
    previewImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    rawText: `APOLLO HOSPITALS - OUTPATIENT CONSULTATION
Dr. Rajesh K. Sharma, MD (Internal Medicine), Reg: DMC-48912
Patient: Rohit Verma (Age: 29 / M) Date: 14 Aug 2026

Chief Complaints: High grade fever x 3 days with chills, severe retro-orbital headache, generalized myalgia.
O/E: Temp: 102.4 F, BP: 118/76 mmHg, PR: 96/min. No active petechiae.
Advice Investigations: CBC with Platelets, Dengue NS1 Antigen, MP Rapid.

Rx:
1. Tab Dolo 650 mg - 1 tab TDS x 4 days (Post meals)
2. Tab Pantocid 40 mg - 1 tab OD (Empty stomach morning) x 5 days
3. Tab Montair-LC - 1 tab HS (Bedtime) x 5 days
4. Syp Grilinctus - 10 ml TDS if dry cough persists
5. Sachet Electral (ORS) - 1 sachet in 1 Litre boiled water sip throughout day.

Advice: Plenty of fluids (minimum 3.5 Litres/day: coconut water, fresh lime water, thin dal water).
Strict warning: Review immediately if severe abdominal pain, persistent vomiting, or mucosal bleeding.`,
    preparsedResult: {
      title: "Apollo Hospitals OPD Prescription Analysis",
      summary: "Prescription evaluated for Acute Viral / Dengue Syndrome. Antipyretic, gastric protection, antihistamine, and oral rehydration therapy identified.",
      confidenceScore: 97,
      flagLevel: "caution",
      documentType: "prescription",
      medicines: [
        INDIAN_MEDICINES_DATABASE.dolo650,
        INDIAN_MEDICINES_DATABASE.pantocid40,
        INDIAN_MEDICINES_DATABASE.montairLC,
      ],
      potentialConditions: ["Dengue Viral Fever (Early Phase)", "Seasonal Tropical Viral Pyrexia"],
      dietaryAdvice: [
        "Drink minimum 3 to 4 litres of fluids daily (fresh tender coconut water, diluted Electral ORS, and warm strained moong dal water).",
        "Papaya leaf extract syrup (Caripill) or fresh juice is widely used under clinical supervision to support platelet stability.",
        "Strictly avoid oily parathas, roadside street foods, spicy pickles, and NSAID painkillers like Ibuprofen/Combiflam (which increase bleeding risk in Dengue).",
      ],
      doctorConsultationQuestions: [
        "Doctor, my platelets were tested today—when should I repeat the CBC to track the trend?",
        "Are there any warning signs like gum bleeding, black stools, or severe abdominal pain that require immediate admission?",
        "Can I switch to Jan Aushadhi generic Paracetamol 650mg and Pantoprazole 40mg?",
      ],
      emergencyHelplines: [
        "108 - Emergency Ambulance (All Indian States)",
        "112 - National Emergency Response Center",
        "104 - Health Information & Tele-Advice Helpline",
      ],
      disclaimer: "MedLens AI complies with Indian Telemedicine Guidelines 2020. Never self-prescribe or alter prescription without attending physician authorization.",
      timestamp: "Today, 10:15 AM",
    },
  },
  {
    id: "sample-lab-drlal",
    title: "Dr Lal PathLabs - CBC Blood Report (Thrombocytopenia Alert)",
    hospitalOrLab: "Dr Lal PathLabs National Reference Lab",
    city: "Gurugram / New Delhi",
    type: "lab_report",
    description: "Complete Blood Count (CBC) with automated 5-part differential showing significant thrombocytopenia (low platelets) common in Indian vector-borne diseases.",
    previewImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
    rawText: `DR LAL PATHLABS LTD.
National Reference Laboratory: Sector 18, Block E, Rohini, Delhi
Patient: Smt. Ananya Sen (Age: 34 / F) Ref By: Dr. P. Mukhopadhyay MD
Specimen: Whole Blood EDTA (Collected: 10:00 AM)

TEST RESULTS: COMPLETE BLOOD COUNT (CBC)
Hemoglobin: 11.2 g/dL (Normal Range: 12.0 - 15.0 g/dL) [LOW]
Total Leucocyte Count (TLC): 3,100 /uL (Normal Range: 4,000 - 11,000 /uL) [LOW - LEUCOPENIA]
Platelet Count: 48,000 /uL (Normal Range: 150,000 - 450,000 /uL) [CRITICAL LOW - THROMBOCYTOPENIA]
PCV (Hematocrit): 41.5 % (Normal Range: 36.0 - 46.0 %) [NORMAL / MILD HEMOCONCENTRATION]
Neutrophils: 52 % (Range: 40 - 70 %)
Lymphocytes: 40 % (Range: 20 - 40 %)
Dengue Serology: NS1 Antigen POSITIVE (Reactive, Index: 4.8)`,
    preparsedResult: {
      title: "Dr Lal PathLabs CBC Analysis: Critical Thrombocytopenia",
      summary: "CRITICAL ALERT: Platelet count has dropped to 48,000 /uL (Normal: 1.5 - 4.5 Lakhs) with Leucopenia and positive Dengue NS1 antigen. High risk of Dengue Hemorrhagic symptoms.",
      confidenceScore: 99,
      flagLevel: "critical",
      documentType: "lab_report",
      labMetrics: [
        {
          testName: "Platelet Count (Automated + Smear Checked)",
          category: "Hematology",
          observedValue: "48,000 /uL",
          referenceRange: "150,000 - 450,000 /uL",
          unit: "/uL",
          status: "critical",
          clinicalSignificance: "Severe thrombocytopenia. Critical danger threshold in Dengue. Patient needs immediate clinical evaluation for IV hydration or platelet transfusion standby.",
          indianStandardNote: "NVBDCP (National Vector Borne Disease Control Programme) protocol mandates close monitoring if platelets fall below 50,000.",
        },
        {
          testName: "Total Leucocyte Count (TLC / WBC)",
          category: "Hematology",
          observedValue: "3,100 /uL",
          referenceRange: "4,000 - 11,000 /uL",
          unit: "/uL",
          status: "low",
          clinicalSignificance: "Leucopenia. Typical viral bone marrow suppression seen in early dengue or enteric fever.",
          indianStandardNote: "Standard across Indian pathology labs.",
        },
        {
          testName: "Hemoglobin (Hb)",
          category: "Hematology",
          observedValue: "11.2 g/dL",
          referenceRange: "12.0 - 15.0 g/dL",
          unit: "g/dL",
          status: "low",
          clinicalSignificance: "Mild microcytic/normocytic anemia. Common in Indian reproductive age females.",
        },
        {
          testName: "Dengue NS1 Antigen",
          category: "Serology",
          observedValue: "POSITIVE",
          referenceRange: "Negative",
          unit: "Qualitative",
          status: "critical",
          clinicalSignificance: "Active Dengue virus replication detected. Correlates with fever onset within day 1-5.",
        },
      ],
      potentialConditions: ["Dengue Fever with Severe Thrombocytopenia", "Viral Bone Marrow Suppression"],
      dietaryAdvice: [
        "Continuous oral hydration: Electral ORS, coconut water (rich in potassium & electrolytes), pomegranate juice.",
        "Soft easily digestible Indian food: Khichdi with moong dal, soft daliya, steamed idli, curd rice.",
        "Papaya leaf extract (Carica papaya) 10-20ml twice daily under physician oversight.",
        "ABSOLUTELY NO Brufen/Ibuprofen, Combiflam, or Aspirin (Disprin) as they precipitate severe gastric and internal hemorrhages.",
      ],
      doctorConsultationQuestions: [
        "Doctor, my platelet count is 48,000—does the patient require day-care IV fluids or hospital admission?",
        "What is the daily schedule for repeat hematocrit and platelet checks?",
        "Are any prophylactic medications or hospital emergency beds needed?",
      ],
      emergencyHelplines: [
        "108 - Immediate Government Emergency Ambulance Service",
        "112 - National Emergency Integrated Number",
      ],
      disclaimer: "CRITICAL FINDING: Platelet levels under 50,000 require immediate in-person evaluation by a registered physician at the nearest hospital emergency department.",
      timestamp: "Today, 11:30 AM",
    },
  },
  {
    id: "sample-rx-aiims",
    title: "AIIMS New Delhi - Endocrinology & Cardio-Metabolic Prescription",
    hospitalOrLab: "All India Institute of Medical Sciences (AIIMS)",
    city: "New Delhi",
    type: "prescription",
    description: "Follow-up consultation for South Asian Metabolic Syndrome: Type-2 Diabetes Mellitus, Essential Hypertension, and Dyslipidemia.",
    previewImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    rawText: `ALL INDIA INSTITUTE OF MEDICAL SCIENCES (AIIMS)
Department of Endocrinology & Metabolism, Ansari Nagar, New Delhi
Prof. (Dr.) S. Roy, DM (Endocrinology) AIIMS
UHID: 105892341 Date: 20 Aug 2026
Patient: Ramesh Chandra Gupta (Age: 56 / M)

Diagnosis: T2DM (Known 8 yrs) + Hypertension + Dyslipidemia.
Recent Labs: HbA1c: 8.4 %, Fasting Blood Glucose: 168 mg/dL, Sr. Creatinine: 1.0 mg/dL, LDL: 138 mg/dL.
Target: HbA1c < 7.0%, BP < 130/80 mmHg.

Rx:
1. Tab Glycomet-GP 2 Forte - 1 tab OD just before breakfast x 3 months
2. Tab Telma 40 mg - 1 tab OD (Morning 8 AM) x 3 months
3. Tab Rosuvas 10 mg - 1 tab HS (At bedtime) x 3 months
4. Tab Ecosprin 75 mg - 1 tab OD (Post lunch) x 3 months

Lifestyle Advice:
- 45 mins brisk walking 5 days/week.
- Indian Diabetic Diet: Replace polished white rice with brown rice or bajra/jowar rotis. No sugar in tea/coffee.
- Review after 3 months with repeat HbA1c, LFT, KFT.`,
    preparsedResult: {
      title: "AIIMS Cardio-Metabolic Prescription Analysis",
      summary: "Four chronic maintenance medications identified for Diabetes, Blood Pressure, Cholesterol, and Antiplatelet protection. High generic savings potential available through Jan Aushadhi Kendras.",
      confidenceScore: 98,
      flagLevel: "normal",
      documentType: "prescription",
      medicines: [
        INDIAN_MEDICINES_DATABASE.glycometGP2,
        INDIAN_MEDICINES_DATABASE.telma40,
        {
          name: "Rosuvas 10 Tablet",
          brandName: "Rosuvas 10 (Sun Pharma) / Rozavel 10 (Lupin)",
          genericSalt: "Rosuvastatin Calcium IP",
          strength: "10 mg",
          timing: "HS - Once daily at night before sleep",
          latinAbbreviation: "HS",
          purpose: "HMG-CoA reductase inhibitor (Statin) to lower LDL 'bad' cholesterol and prevent arterial plaques",
          brandedPriceINR: 198.0,
          janAushadhiPriceINR: 22.0,
          savingsPercentage: 89,
          warnings: ["Take consistently at night as cholesterol synthesis peaks during sleep."],
          foodPrecautions: "Avoid grapefruit juice. Maintain low-cholesterol Indian diet (cut down ghee, vanaspati, and deep-fried samosas/kachoris).",
          scheduleCategory: "Schedule H Prescription Drug",
        },
        {
          name: "Ecosprin 75 Tablet",
          brandName: "Ecosprin 75 (USV)",
          genericSalt: "Aspirin (Acetylsalicylic Acid) Gastro-Resistant IP",
          strength: "75 mg",
          timing: "OD - Once daily strictly after lunch with a full glass of water",
          latinAbbreviation: "OD (Post Lunch)",
          purpose: "Low-dose antiplatelet agent for cardiovascular and stroke prevention in diabetic patients",
          brandedPriceINR: 12.0,
          janAushadhiPriceINR: 4.5,
          savingsPercentage: 62,
          warnings: ["Never take on an empty stomach to prevent gastric erosions."],
          foodPrecautions: "Take immediately following a substantial meal.",
          scheduleCategory: "Schedule H Prescription Drug",
        },
      ],
      potentialConditions: ["Type-2 Diabetes Mellitus", "Essential Hypertension", "South Asian Dyslipidemia"],
      dietaryAdvice: [
        "Incorporate whole grains: Millets (Ragi, Jowar, Bajra) and whole wheat instead of refined Maida and polished white rice.",
        "Add Methi (Fenugreek) seeds soaked in water overnight and Jamun seed powder, shown to support glycemic control in Indian clinical trials.",
        "Reduce saturated fats: Limit Dalda, deep-fried snacks, and sweets like Gulab Jamun/Jalebi.",
        "Salt restriction: Maximum 1 level teaspoon (5g) iodized salt per day across all curries.",
      ],
      doctorConsultationQuestions: [
        "Doctor, my branded 3-month medicine bill is ~₹1,540. Can I safely switch to Jan Aushadhi generic salts (costing ~₹195) with identical bioequivalence?",
        "Should I add a home blood glucose glucometer log (fasting and 2-hour postprandial)?",
        "Are annual diabetic eye (fundoscopy) and foot neurological screenings scheduled?",
      ],
      emergencyHelplines: [
        "108 - Emergency Ambulance",
        "112 - National Emergency",
      ],
      disclaimer: "Chronic medications must be continued under physician supervision. Do not alter doses without regular clinical monitoring.",
      timestamp: "Today, 02:45 PM",
    },
  },
  {
    id: "sample-strip-augmentin",
    title: "Augmentin 625 Duo - Indian Blister Pack Inspection",
    hospitalOrLab: "CDSCO Approved Indian Pharmaceutical Strip",
    city: "Mumbai / Bengaluru",
    type: "medicine_strip",
    description: "Real photo of blister pack strip of Augmentin 625 Duo showing CDSCO Schedule H1 warning, Batch number, and Salt formulation.",
    previewImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    rawText: `AUGMENTIN 625 DUO TABLETS
Amoxicillin and Potassium Clavulanate Tablets IP
Each film-coated tablet contains:
Amoxicillin Trihydrate IP eq. to Amoxicillin: 500 mg
Potassium Clavulanate Diluted IP eq. to Clavulanic Acid: 125 mg
Mfg Lic No: G/25/1820
Batch No: B24098 Mfg Date: 03/2026 Exp Date: 02/2028
M.R.P. ₹ 232.00 per strip of 10 tablets (Inclusive of all taxes)
SCHEDULE H1 PRESCRIPTION DRUG - CAUTION:
- It is dangerous to take this preparation except in accordance with the medical advice.
- Not to be sold by retail without the prescription of a Registered Medical Practitioner.`,
    preparsedResult: {
      title: "Augmentin 625 Duo Blister Pack OCR Verification",
      summary: "Authentic CDSCO Schedule H1 antibiotic detected. Contains Amoxicillin 500mg + Potassium Clavulanate 125mg. Strip is valid until Feb 2028.",
      confidenceScore: 99,
      flagLevel: "normal",
      documentType: "medicine_strip",
      medicines: [INDIAN_MEDICINES_DATABASE.augmentin625],
      potentialConditions: ["Bacterial Pharyngitis / Sinusitis", "Lower Respiratory Tract Infection", "Dental Abscess"],
      dietaryAdvice: [
        "Take with meals to prevent acidity and nausea.",
        "Consume natural probiotics like homemade Indian curd / Dahi or Chaas (buttermilk) to replenish healthy gut flora during antibiotic course.",
      ],
      doctorConsultationQuestions: [
        "Confirm total number of days (usually 5 to 7 days). Should I stop once symptoms clear? (Answer: Never stop early).",
        "Can I purchase the Jan Aushadhi generic version (Amoxyclav 625) for ₹38 instead of ₹232?",
      ],
      emergencyHelplines: ["108 - Ambulance", "112 - Emergency"],
      disclaimer: "Schedule H1 drugs require a valid Indian prescription. Never share antibiotics.",
      timestamp: "Today, 04:10 PM",
    },
  },
];
