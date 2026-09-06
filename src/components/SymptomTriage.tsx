import React, { useState } from "react";
import {
  Thermometer,
  Wind,
  Sun,
  AlertOctagon,
  HeartCrack,
  Droplets,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { LanguageCode } from "../types";
import { UI_TRANSLATIONS } from "../data/indianLanguages";

interface SymptomScenario {
  id: string;
  name: string;
  category: "Tropical Infection" | "Pollution & Respiratory" | "Metabolic & Chronic" | "Emergency";
  symptoms: string[];
  severity: "Emergency (108)" | "High (Immediate OPD)" | "Moderate (Home Care / Telehealth)";
  suspectedCondition: string;
  icmrGuidelines: string;
  indianDiet: string;
  emergencyTrigger: boolean;
}

const INDIAN_SYMPTOM_SCENARIOS: SymptomScenario[] = [
  {
    id: "dengue-monsoon",
    name: "Monsoon High Fever with Eye Pain & Joint Aches",
    category: "Tropical Infection",
    symptoms: ["Sudden fever 103°F", "Severe ache behind eyeballs (retro-orbital)", "Breakbone joint pain", "Mild red rash"],
    severity: "High (Immediate OPD)",
    suspectedCondition: "Suspected Dengue Viral Infection or Chikungunya",
    icmrGuidelines: "NVBDCP guidelines mandate CBC with daily platelet count and Dengue NS1 / IgM test. Strictly avoid Aspirin / Brufen to prevent bleeding.",
    indianDiet: "Hydrate with fresh coconut water, Electral ORS, and warm moong dal khichdi. Papaya leaf juice can be taken under supervision.",
    emergencyTrigger: false,
  },
  {
    id: "typhoid-enteric",
    name: "Step-Ladder Fever with Abdominal Pain after Street Food",
    category: "Tropical Infection",
    symptoms: ["Fever rising in steps every evening", "Loss of appetite", "Coated white tongue", "Constipation or mild diarrhea"],
    severity: "High (Immediate OPD)",
    suspectedCondition: "Enteric Fever (Typhoid - Salmonella typhi)",
    icmrGuidelines: "Blood culture or Widal test indicated. Prescribed Schedule H1 antibiotics (Azithromycin or Cefixime) must be completed fully.",
    indianDiet: "Boiled and cooled drinking water only. Soft daliya, boiled potatoes, curd rice. Strictly avoid raw chutney, street pani-puri, and uncooked salads.",
    emergencyTrigger: false,
  },
  {
    id: "smog-aqi",
    name: "Winter Smog Wheezing & Eye Irritation (AQI > 350)",
    category: "Pollution & Respiratory",
    symptoms: ["Dry hacking cough", "Throat irritation", "Chest tightness outdoors", "Watering eyes in Delhi/NCR/Mumbai smog"],
    severity: "Moderate (Home Care / Telehealth)",
    suspectedCondition: "PM2.5 / PM10 Particulate Induced Acute Bronchitis & Allergic Rhinitis",
    icmrGuidelines: "Wear N95 masks outdoors. Steam inhalation with Karvol plus capsules. Antihistamine like Levocetirizine at bedtime if prescribed.",
    indianDiet: "Warm water with Ginger, Tulsi, and pure Honey. Haldi Doodh (Turmeric milk) at bedtime for its natural anti-inflammatory curcumin content.",
    emergencyTrigger: false,
  },
  {
    id: "cardiac-alert",
    name: "Crushing Central Chest Pain Radiating to Left Arm",
    category: "Emergency",
    symptoms: ["Crushing heaviness in chest center", "Pain radiating to left shoulder/jaw", "Cold sweating", "Sudden breathlessness"],
    severity: "Emergency (108)",
    suspectedCondition: "Acute Myocardial Infarction (Heart Attack Alert)",
    icmrGuidelines: "CRITICAL LIFE-THREATENING EMERGENCY: Dial 108 immediately. Keep patient calm, chew Disprin 300mg if no active bleeding or allergy, rush to nearest CathLab/ICU.",
    indianDiet: "Do not give heavy food or water during active acute distress. Call 108 ambulance now.",
    emergencyTrigger: true,
  },
  {
    id: "heat-stroke",
    name: "Extreme Weakness & Heat Exhaustion in Summer (44°C Loo)",
    category: "Tropical Infection",
    symptoms: ["Body temp > 102°F without sweat", "Dizziness", "Dark colored urine", "Intense thirst & muscle cramps"],
    severity: "High (Immediate OPD)",
    suspectedCondition: "Heat Stroke / Severe Heat Exhaustion (Loo Exposure)",
    icmrGuidelines: "Move immediately to shaded/air-conditioned room. Sponge forehead with cool water. Rehydrate rapidly with electrolyte solutions.",
    indianDiet: "Aam Panna (raw mango cooler with black salt and cumin), tender coconut water, Chaas (buttermilk), and Nimbu Paani with a pinch of rock salt.",
    emergencyTrigger: false,
  },
];

interface SymptomTriageProps {
  currentLanguage: LanguageCode;
  onOpenEmergency: () => void;
}

export const SymptomTriage: React.FC<SymptomTriageProps> = ({
  currentLanguage,
  onOpenEmergency,
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;
  const [selectedScenario, setSelectedScenario] = useState<SymptomScenario>(
    INDIAN_SYMPTOM_SCENARIOS[0]
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    INDIAN_SYMPTOM_SCENARIOS[0].symptoms
  );

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#0a0a0a] border border-white/10 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-tr from-orange-500/10 via-transparent to-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calibrated for Indian Tropical & Environmental Health</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-light text-white mb-2 leading-tight">
            Smart Indian Symptom Triage & Risk Evaluator
          </h1>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
            Quickly assess symptoms common in Indian cities and towns—such as monsoon dengue, winter smog bronchitis, typhoid, or acute heat exhaustion—with immediate Indian emergency helpline dispatch.
          </p>
        </div>
      </div>

      {/* Grid of Scenarios & Detailed Triage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Pre-configured Scenarios */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">
            Select an Indian Clinical Scenario
          </h3>

          <div className="space-y-3">
            {INDIAN_SYMPTOM_SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => {
                  setSelectedScenario(scenario);
                  setSelectedSymptoms(scenario.symptoms);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-lg ${
                  selectedScenario.id === scenario.id
                    ? scenario.emergencyTrigger
                      ? "border-red-500/60 bg-red-950/20 shadow-red-950/30"
                      : "border-orange-500/60 bg-orange-950/20 shadow-orange-950/30"
                    : "border-white/10 bg-[#0a0a0a] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 font-mono">
                      {scenario.category}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-0.5">
                      {scenario.name}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wider ${
                      scenario.severity.includes("Emergency")
                        ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                        : scenario.severity.includes("High")
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-green-500/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    {scenario.severity}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {scenario.symptoms.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white/5 text-white/70 border border-white/5 px-2.5 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Triage Advice */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 shadow-xl space-y-5">
            {/* Red Alert Banner if Emergency */}
            {selectedScenario.emergencyTrigger && (
              <div className="bg-red-500/20 border border-red-500/40 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-pulse">
                <div className="flex items-center space-x-3">
                  <AlertOctagon className="w-8 h-8 text-red-400 shrink-0" />
                  <div>
                    <h4 className="font-black text-sm text-red-300 uppercase tracking-wider">CRITICAL MEDICAL EMERGENCY DETECTED</h4>
                    <p className="text-xs text-red-200/80">
                      Do not wait or rely on online advice. Call Government Emergency Ambulance immediately.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenEmergency}
                  className="bg-red-600 hover:bg-red-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs transition-colors shadow-md whitespace-nowrap cursor-pointer uppercase tracking-wider"
                >
                  Dial 108 / 112 Now
                </button>
              </div>
            )}

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                Suspected Clinical Diagnosis
              </span>
              <h2 className="text-xl font-bold text-white mt-2">
                {selectedScenario.suspectedCondition}
              </h2>
            </div>

            {/* Checkable Symptoms */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-white/70">
                Check symptoms that you are experiencing:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedScenario.symptoms.map((sym, i) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <div
                      key={i}
                      onClick={() => toggleSymptom(sym)}
                      className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? "bg-orange-500/15 border-orange-500/40 text-white font-bold"
                          : "bg-[#121212] border-white/10 text-white/60 hover:bg-white/5"
                      }`}
                    >
                      <span>{sym}</span>
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isChecked ? "text-orange-400" : "text-white/20"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ICMR / Clinical Protocol */}
            <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/10 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/80 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>ICMR & National Health Protocol Guidance</span>
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                {selectedScenario.icmrGuidelines}
              </p>
            </div>

            {/* Indian Diet & Home Comforts */}
            <div className="bg-green-950/20 rounded-2xl p-4 border border-green-500/20 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-green-400">
                Recommended Indian Supportive Diet
              </h4>
              <p className="text-xs text-green-200/80 leading-relaxed font-light">
                {selectedScenario.indianDiet}
              </p>
            </div>

            {/* Call to action */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
              <div className="text-xs text-white/50">
                Need ambulance transport or doctor advice?
              </div>
              <button
                onClick={onOpenEmergency}
                className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-red-950/40 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call India Helplines (108 / 112)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
