import React, { useState } from "react";
import {
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  HeartPulse,
  Droplet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Utensils,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { LanguageCode, LabTestMetric, MedicalAnalysisResult } from "../types";
import { SAMPLE_DOCUMENTS } from "../data/indianLabTests";
import { UI_TRANSLATIONS } from "../data/indianLanguages";

interface LabReportAnalyzerProps {
  currentLanguage: LanguageCode;
  onSaveToAbha: (result: MedicalAnalysisResult) => void;
}

export const LabReportAnalyzer: React.FC<LabReportAnalyzerProps> = ({
  currentLanguage,
  onSaveToAbha,
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  // Selected preset or active report
  const [activeReport, setActiveReport] = useState<MedicalAnalysisResult>(
    SAMPLE_DOCUMENTS[1].preparsedResult // Dr Lal PathLabs CBC report
  );

  // Custom interactive test values to test in real time
  const [plateletValue, setPlateletValue] = useState<number>(48000);
  const [wbcValue, setWbcValue] = useState<number>(3100);
  const [hbValue, setHbValue] = useState<number>(11.2);
  const [hba1cValue, setHba1cValue] = useState<number>(6.2);
  const [fbgValue, setFbgValue] = useState<number>(115);

  // Quick evaluation function for live changes
  const evaluateLiveMetrics = () => {
    const isCriticalPlatelet = plateletValue < 50000;
    const isLowPlatelet = plateletValue < 150000;
    const isHighHba1c = hba1cValue >= 7.0;

    const updatedMetrics: LabTestMetric[] = [
      {
        testName: "Platelet Count (Automated Impedance)",
        category: "Hematology",
        observedValue: `${plateletValue.toLocaleString("en-IN")} /uL`,
        referenceRange: "150,000 - 450,000 /uL",
        unit: "/uL",
        status: isCriticalPlatelet ? "critical" : isLowPlatelet ? "low" : "normal",
        clinicalSignificance: isCriticalPlatelet
          ? "CRITICAL THROMBOCYTOPENIA: High risk of spontaneous bleeding (gums, petechiae). Urgent hospital admission or IV monitoring required under Indian NVBDCP protocols."
          : isLowPlatelet
          ? "Thrombocytopenia: Typical in viral pyrexia / early Dengue fever. Daily serial platelet counts advised."
          : "Platelet count is within healthy normal limits.",
        indianStandardNote: "Calibrated to Dr Lal PathLabs & Apollo Reference Standards.",
      },
      {
        testName: "Total Leucocyte Count (TLC / WBC)",
        category: "Hematology",
        observedValue: `${wbcValue.toLocaleString("en-IN")} /uL`,
        referenceRange: "4,000 - 11,000 /uL",
        unit: "/uL",
        status: wbcValue < 4000 ? "low" : wbcValue > 11000 ? "high" : "normal",
        clinicalSignificance:
          wbcValue < 4000
            ? "Leucopenia: Viral bone marrow suppression. Common in Dengue, Typhoid, or acute viral infections."
            : "White blood cell count is normal.",
      },
      {
        testName: "Hemoglobin (Hb)",
        category: "Hematology",
        observedValue: `${hbValue} g/dL`,
        referenceRange: "12.0 - 15.0 g/dL",
        unit: "g/dL",
        status: hbValue < 12.0 ? "low" : "normal",
        clinicalSignificance:
          hbValue < 12.0
            ? "Mild anemia. ICMR recommends iron-rich Indian dietary sources (jaggery/gur, spinach, chana, pomegranate)."
            : "Healthy oxygen-carrying capacity.",
      },
      {
        testName: "Glycated Hemoglobin (HbA1c)",
        category: "Biochemistry",
        observedValue: `${hba1cValue} %`,
        referenceRange: "< 5.7% (Normal), 5.7-6.4% (Pre-diabetic), >= 6.5% (Diabetic)",
        unit: "%",
        status: isHighHba1c ? "high" : hba1cValue >= 5.7 ? "low" : "normal",
        clinicalSignificance: isHighHba1c
          ? "Uncontrolled Glycemia. Elevated 3-month average glucose. Review anti-diabetic medication and diet."
          : hba1cValue >= 5.7
          ? "Pre-diabetes range. Lifestyle and diet modification strongly recommended."
          : "Optimal long-term glucose control.",
      },
    ];

    setActiveReport((prev) => ({
      ...prev,
      title: "Interactive Indian Pathology Diagnostic Assessment",
      summary: isCriticalPlatelet
        ? "CRITICAL ALERT: Platelets under 50,000/uL requires immediate physician review. Dengue serology correlation mandatory."
        : "Interactive parameters updated based on Indian Diagnostic Reference standards.",
      flagLevel: isCriticalPlatelet ? "critical" : isLowPlatelet || isHighHba1c ? "caution" : "normal",
      labMetrics: updatedMetrics,
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-[#0a0a0a] border border-white/10 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-tr from-orange-500/10 via-transparent to-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>Calibrated to Dr Lal, Apollo, Metropolis & Thyrocare Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-light text-white mb-2 leading-tight">
            Indian Diagnostic Lab Report AI Analyzer
          </h1>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
            Understand complex blood test metrics in plain language. Features automated Dengue Thrombocytopenia early warning, ICMR diabetic thresholds, and personalized Indian dietary suggestions.
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Lab Value Controls & Visual Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Values Tester */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-orange-400" />
                <span>Interactive Lab Values</span>
              </h3>
              <span className="text-[10px] uppercase font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                Simulator
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Adjust any slider or number to test how MedLens AI dynamically flags Indian health risks.
            </p>

            {/* Platelet slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white/70">Platelet Count:</span>
                <span className={`font-bold font-mono ${plateletValue < 50000 ? "text-red-400" : plateletValue < 150000 ? "text-amber-400" : "text-green-400"}`}>
                  {plateletValue.toLocaleString("en-IN")} /uL
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="450000"
                step="5000"
                value={plateletValue}
                onChange={(e) => setPlateletValue(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-mono">
                <span>20k (Critical)</span>
                <span>1.5L (Normal)</span>
                <span>4.5L (High)</span>
              </div>
            </div>

            {/* TLC / WBC */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white/70">Total Leucocytes (WBC):</span>
                <span className={`font-bold font-mono ${wbcValue < 4000 ? "text-amber-400" : "text-white"}`}>
                  {wbcValue.toLocaleString("en-IN")} /uL
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="200"
                value={wbcValue}
                onChange={(e) => setWbcValue(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Hemoglobin */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white/70">Hemoglobin (Hb):</span>
                <span className="font-bold font-mono text-white">{hbValue} g/dL</span>
              </div>
              <input
                type="range"
                min="6.0"
                max="18.0"
                step="0.1"
                value={hbValue}
                onChange={(e) => setHbValue(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* HbA1c */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white/70">HbA1c (3-Month Sugar):</span>
                <span className={`font-bold font-mono ${hba1cValue >= 7.0 ? "text-red-400" : hba1cValue >= 5.7 ? "text-amber-400" : "text-green-400"}`}>
                  {hba1cValue}%
                </span>
              </div>
              <input
                type="range"
                min="4.5"
                max="12.0"
                step="0.1"
                value={hba1cValue}
                onChange={(e) => setHba1cValue(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            <button
              onClick={evaluateLiveMetrics}
              id="btn-re-evaluate-labs"
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-950/40 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Update Clinical Interpretation</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Report Findings */}
        <div className="lg:col-span-8 space-y-6">
          {/* Status Header */}
          <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    activeReport.flagLevel === "critical"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                      : activeReport.flagLevel === "caution"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-green-500/20 text-green-400 border border-green-500/30"
                  }`}
                >
                  Status: {activeReport.flagLevel.toUpperCase()}
                </span>
                <span className="text-xs text-white/40 font-medium font-mono">
                  {SAMPLE_DOCUMENTS[1].hospitalOrLab}
                </span>
              </div>

              <button
                onClick={() => onSaveToAbha(activeReport)}
                className="text-xs font-semibold px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span>Export to ABHA Record</span>
              </button>
            </div>

            <h2 className="text-lg font-bold text-white">
              {activeReport.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              {activeReport.summary}
            </p>
          </div>

          {/* Test Metrics Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">
              Analyzed Biomarkers & Reference Ranges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeReport.labMetrics?.map((metric, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-4 border shadow-lg space-y-2 transition-all ${
                    metric.status === "critical"
                      ? "border-red-500/30 bg-red-950/20"
                      : metric.status === "low" || metric.status === "high"
                      ? "border-amber-500/30 bg-amber-950/15"
                      : "border-white/10 bg-[#0a0a0a]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 font-mono">
                        {metric.category}
                      </span>
                      <h4 className="font-bold text-white text-sm">
                        {metric.testName}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        metric.status === "critical"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : metric.status === "low"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : metric.status === "high"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-green-500/20 text-green-300 border border-green-500/30"
                      }`}
                    >
                      {metric.status}
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-black text-white font-mono">
                      {metric.observedValue}
                    </span>
                    <span className="text-xs text-white/40">
                      (Ref: {metric.referenceRange})
                    </span>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed pt-2 border-t border-white/5 font-light">
                    {metric.clinicalSignificance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Indian Food Advice for Lab Results */}
          <div className="bg-[#0a0a0a] rounded-3xl p-5 border border-white/10 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 flex items-center space-x-2">
              <Utensils className="w-4 h-4 text-orange-400" />
              <span>Recommended Indian Nutritional Support</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/60">
              {activeReport.dietaryAdvice?.map((advice, i) => (
                <div key={i} className="flex items-start space-x-2 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                  <span className="text-orange-400 font-bold">•</span>
                  <span>{advice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
