import React from "react";
import { Activity, ShieldCheck, PhoneCall, Globe, Sparkles, AlertTriangle } from "lucide-react";
import { LanguageCode } from "../types";
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from "../data/indianLanguages";

interface HeaderProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenEmergency: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenEmergency,
  activeTab,
  setActiveTab,
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      {/* Top Indian Healthcare Ribbon */}
      <div className="bg-[#080808] text-white/60 px-4 py-1.5 text-xs border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            {/* Subtle Indian Tricolor Badge */}
            <span className="inline-flex items-center overflow-hidden rounded-xs border border-white/20">
              <span className="w-2.5 h-3 bg-[#FF9933]" title="Saffron"></span>
              <span className="w-2.5 h-3 bg-white flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[#000080]"></span>
              </span>
              <span className="w-2.5 h-3 bg-[#138808]" title="Green"></span>
            </span>
            <span className="font-semibold text-white/80 tracking-wide uppercase text-[11px]">
              Empowering Bharat's Healthcare
            </span>
            <span className="text-white/20">•</span>
            <span className="text-white/40 hidden sm:inline text-[11px] font-mono">
              ABDM INTEGRATED • JAN AUSHADHI 1,900+ GENERICS
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenEmergency}
              id="emergency-top-btn"
              className="inline-flex items-center space-x-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors animate-pulse cursor-pointer"
            >
              <PhoneCall className="w-3 h-3" />
              <span>India Emergency: 108 / 112</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center space-x-1.5 text-white/60">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <select
                id="language-select-header"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-[#0e0e0e] text-xs text-white border border-white/10 rounded-lg px-2.5 py-1 focus:outline-none focus:border-orange-500/50 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0e0e0e] text-white">
                    {lang.nativeLabel} ({lang.label})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("scanner")}>
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-950/40 shrink-0">
            <div className="w-5 h-5 border-2 border-white rounded-full relative">
              <div className="absolute inset-0 m-auto w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                MedLens<span className="text-orange-500">AI</span>
              </span>
              <span className="inline-block px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-[10px] font-bold uppercase tracking-widest">
                India Edition
              </span>
            </div>
            <p className="text-[11px] text-white/40 hidden md:block">
              Prescription Vision, Pathology AI & Jan Aushadhi Generic Finder
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab("scanner")}
            id="nav-tab-scanner"
            className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "scanner"
                ? "bg-white/10 text-white border border-white/20 shadow-md shadow-black/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {t.tabPrescription}
          </button>
          <button
            onClick={() => setActiveTab("labs")}
            id="nav-tab-labs"
            className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "labs"
                ? "bg-white/10 text-white border border-white/20 shadow-md shadow-black/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {t.tabLabReport}
          </button>
          <button
            onClick={() => setActiveTab("triage")}
            id="nav-tab-triage"
            className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "triage"
                ? "bg-white/10 text-white border border-white/20 shadow-md shadow-black/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {t.tabSymptom}
          </button>
          <button
            onClick={() => setActiveTab("janaushadhi")}
            id="nav-tab-janaushadhi"
            className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "janaushadhi"
                ? "bg-white/10 text-white border border-white/20 shadow-md shadow-black/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {t.tabJanAushadhi}
          </button>
          <button
            onClick={() => setActiveTab("abha")}
            id="nav-tab-abha"
            className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "abha"
                ? "bg-white/10 text-white border border-white/20 shadow-md shadow-black/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {t.tabAbha}
          </button>
        </nav>
      </div>
    </header>
  );
};
