export type LanguageCode =
  | "en"
  | "hi"
  | "bn"
  | "ta"
  | "te"
  | "mr"
  | "gu"
  | "kn";

export interface IdentifiedMedicine {
  name: string;
  brandName: string;
  genericSalt: string;
  strength: string;
  timing: string; // e.g. "TDS (3 times daily after food)"
  latinAbbreviation?: string; // "TDS", "BD", "OD", "SOS", "HS"
  purpose: string;
  brandedPriceINR: number;
  janAushadhiPriceINR: number;
  savingsPercentage: number;
  warnings: string[];
  foodPrecautions: string;
  scheduleCategory?: string; // e.g. "Schedule H", "OTC"
}

export interface LabTestMetric {
  testName: string;
  category: "Hematology" | "Biochemistry" | "Lipid" | "Liver" | "Renal" | "Serology";
  observedValue: number | string;
  referenceRange: string;
  unit: string;
  status: "normal" | "low" | "high" | "critical";
  clinicalSignificance: string;
  indianStandardNote?: string;
}

export interface MedicalAnalysisResult {
  title: string;
  summary: string;
  confidenceScore: number;
  flagLevel: "normal" | "caution" | "critical";
  documentType: "prescription" | "lab_report" | "medicine_strip" | "symptom_triage";
  medicines?: IdentifiedMedicine[];
  labMetrics?: LabTestMetric[];
  potentialConditions: string[];
  dietaryAdvice: string[];
  doctorConsultationQuestions: string[];
  emergencyHelplines: string[];
  disclaimer: string;
  timestamp: string;
}

export interface SampleDocument {
  id: string;
  title: string;
  hospitalOrLab: string;
  city: string;
  type: "prescription" | "lab_report" | "medicine_strip";
  description: string;
  previewImage: string;
  rawText: string;
  preparsedResult: MedicalAnalysisResult;
}

export interface JanAushadhiStore {
  id: string;
  storeName: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  contactNumber: string;
  distanceKm: number;
  timings: string;
}

export interface AbhaProfile {
  abhaNumber: string; // "14-digit format: 12-3456-7890-1234"
  abhaAddress: string; // e.g. "rahul.sharma@abdm"
  name: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  bloodGroup: string;
  state: string;
  district: string;
  isVerified: boolean;
}
