export interface IndianHelpline {
  number: string;
  name: string;
  department: string;
  purpose: string;
  availability: string;
  iconType: "ambulance" | "emergency" | "maternity" | "mental_health" | "telehealth";
}

export const INDIAN_HELPLINES: IndianHelpline[] = [
  {
    number: "108",
    name: "National Emergency Ambulance",
    department: "MoHFW & State Health Departments",
    purpose: "Free 24x7 emergency medical transport, cardiac arrest, road accidents, and acute trauma.",
    availability: "24x7 Toll-Free across India",
    iconType: "ambulance",
  },
  {
    number: "112",
    name: "National Unified Emergency Number",
    department: "Ministry of Home Affairs / ERSS",
    purpose: "All-in-one emergency helpline combining Police, Fire, and Medical Dispatch.",
    availability: "24x7 Nationwide",
    iconType: "emergency",
  },
  {
    number: "102",
    name: "Janani Shishu Suraksha Karyakram (JSSK)",
    department: "National Health Mission (NHM)",
    purpose: "Free ambulance service for pregnant mothers, newborn deliveries, and postnatal emergencies.",
    availability: "24x7 Toll-Free",
    iconType: "maternity",
  },
  {
    number: "14416",
    name: "Tele-MANAS Mental Health Helpline",
    department: "NIMHANS & Ministry of Health & Family Welfare",
    purpose: "Free professional psychological counseling, stress, depression, and crisis intervention in 20+ Indian languages.",
    availability: "24x7 Multilingual Toll-Free",
    iconType: "mental_health",
  },
  {
    number: "104",
    name: "State Medical Information & Advice Helpline",
    department: "State Health Societies",
    purpose: "Health advice by qualified doctors, blood availability information, and public health guidance.",
    availability: "24x7 Across Most States",
    iconType: "telehealth",
  },
  {
    number: "1075",
    name: "National Health Portal / Epidemic Helpline",
    department: "Ministry of Health & Family Welfare",
    purpose: "Public health advisories, vaccination tracking, and seasonal outbreak inquiries (Dengue, Swine Flu, etc.).",
    availability: "24x7 Toll-Free",
    iconType: "telehealth",
  },
];

export interface IndianGovtScheme {
  title: string;
  acronym: string;
  authority: string;
  benefit: string;
  eligibility: string;
  website: string;
}

export const INDIAN_GOVT_HEALTH_SCHEMES: IndianGovtScheme[] = [
  {
    title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
    acronym: "PM-JAY",
    authority: "National Health Authority (NHA)",
    benefit: "Cashless secondary and tertiary hospitalization cover up to ₹5,00,000 per family per year across 28,000+ empaneled hospitals.",
    eligibility: "Bottom 40% vulnerable families identified via SECC database and Asha worker verification.",
    website: "https://pmjay.gov.in",
  },
  {
    title: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana",
    acronym: "PMBJP",
    authority: "Pharmaceuticals & Medical Devices Bureau of India (PMBI)",
    benefit: "Access to 1,965+ generic medicines and 293 surgical items at 50% to 90% lesser cost than branded formulations.",
    eligibility: "Open to every Indian citizen without any income threshold.",
    website: "https://janaushadhi.gov.in",
  },
  {
    title: "Ayushman Bharat Digital Mission (ABHA Card)",
    acronym: "ABDM",
    authority: "Ministry of Health & Family Welfare",
    benefit: "14-digit unique health account to digitally store and share prescriptions, lab reports, and vaccination records across hospitals.",
    eligibility: "Universal for all Indian citizens via Aadhaar or Driving License.",
    website: "https://abdm.gov.in",
  },
  {
    title: "Nikshay Poshan Yojana",
    acronym: "NPY",
    authority: "Central TB Division, MoHFW",
    benefit: "Direct Benefit Transfer (DBT) of ₹500 - ₹1,000 per month directly into bank account for nutritional support during TB treatment.",
    eligibility: "All registered TB patients in India on treatment under the National TB Elimination Program.",
    website: "https://nikshay.in",
  },
];
