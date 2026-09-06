import React, { useState } from "react";
import { Header } from "./components/Header";
import { PrescriptionScanner } from "./components/PrescriptionScanner";
import { LabReportAnalyzer } from "./components/LabReportAnalyzer";
import { SymptomTriage } from "./components/SymptomTriage";
import { JanAushadhiFinder } from "./components/JanAushadhiFinder";
import { AbhaHealthCard } from "./components/AbhaHealthCard";
import { EmergencyHelplineModal } from "./components/EmergencyHelplineModal";
import { LanguageCode, MedicalAnalysisResult } from "./types";
import { SAMPLE_DOCUMENTS } from "./data/indianLabTests";
import { ShieldCheck, HeartPulse, Sparkles, ExternalLink } from "lucide-react";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const [activeTab, setActiveTab] = useState<string>("scanner");
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [abhaRecords, setAbhaRecords] = useState<MedicalAnalysisResult[]>([
    SAMPLE_DOCUMENTS[0].preparsedResult, // Default sample Apollo prescription linked
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveToAbha = (record: MedicalAnalysisResult) => {
    setAbhaRecords((prev) => [record, ...prev]);
    showToast("Prescription record successfully synchronized with your ABHA Digital Locker!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#e5e5e5] selection:bg-orange-500/30 selection:text-orange-200 relative overflow-x-hidden">
      {/* Ambient background glow matching Sophisticated Dark design */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-48 left-1/4 w-[650px] h-[500px] bg-gradient-to-tr from-orange-500/10 via-transparent to-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d0d0d] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2.5 border border-orange-500/30 animate-bounce backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {activeTab === "scanner" && (
          <PrescriptionScanner
            currentLanguage={currentLanguage}
            onSaveToAbha={handleSaveToAbha}
          />
        )}

        {activeTab === "labs" && (
          <LabReportAnalyzer
            currentLanguage={currentLanguage}
            onSaveToAbha={handleSaveToAbha}
          />
        )}

        {activeTab === "triage" && (
          <SymptomTriage
            currentLanguage={currentLanguage}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {activeTab === "janaushadhi" && (
          <JanAushadhiFinder currentLanguage={currentLanguage} />
        )}

        {activeTab === "abha" && (
          <AbhaHealthCard
            currentLanguage={currentLanguage}
            linkedRecords={abhaRecords}
          />
        )}
      </main>

      {/* Emergency Helpline Modal */}
      <EmergencyHelplineModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Indian Healthcare Footer */}
      <footer className="bg-[#080808] text-white/50 border-t border-white/10 text-xs py-8 px-4 sm:px-6 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-950/40">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight font-serif">
                MedLens<span className="text-orange-500">AI</span>
              </span>
              <p className="text-[11px] text-white/40">
                Advancing Bharat's Digital Health Mission • Hackathon Edition
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/60">
            <a
              href="https://pmjay.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors flex items-center space-x-1"
            >
              <span>Ayushman Bharat PM-JAY</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://janaushadhi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors flex items-center space-x-1"
            >
              <span>PMBJP Jan Aushadhi</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://abdm.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors flex items-center space-x-1"
            >
              <span>ABDM (ABHA)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
            >
              Emergency 108 / 112
            </button>
          </div>

          <div className="text-[11px] text-white/40 text-center sm:text-right font-mono">
            ABDM INTEGRATED STACK v2.4 • 240ms @ Edge
          </div>
        </div>
      </footer>
    </div>
  );
}
