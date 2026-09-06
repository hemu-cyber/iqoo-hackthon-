import React, { useState } from "react";
import {
  ShieldCheck,
  QrCode,
  Download,
  Share2,
  Calendar,
  User,
  HeartPulse,
  FileText,
  Clock,
  Printer,
  Sparkles,
} from "lucide-react";
import { LanguageCode, AbhaProfile, MedicalAnalysisResult } from "../types";

interface AbhaHealthCardProps {
  currentLanguage: LanguageCode;
  linkedRecords: MedicalAnalysisResult[];
}

export const AbhaHealthCard: React.FC<AbhaHealthCardProps> = ({
  currentLanguage,
  linkedRecords,
}) => {
  const [profile, setProfile] = useState<AbhaProfile>({
    abhaNumber: "14-8921-3049-5512",
    abhaAddress: "rohit.verma@abdm",
    name: "Rohit Verma",
    gender: "Male",
    dob: "14-08-1995",
    bloodGroup: "B +ve",
    state: "Delhi",
    district: "South Delhi",
    isVerified: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const printRecord = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Banner */}
      <div className="bg-[#0a0a0a] border border-white/10 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-tr from-orange-500/10 via-transparent to-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>National Health Authority (NHA) • ABDM Standard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-light text-white mb-2 leading-tight">
            Ayushman Bharat Health Account (ABHA) Digital Locker
          </h1>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
            Your 14-digit universal Indian digital health identity. Securely store and link doctor prescriptions, lab diagnostic trends, and generic medicine schedules in full compliance with ABDM guidelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Authentic Indian ABHA Health Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/15 shadow-2xl relative overflow-hidden space-y-5 text-white">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-green-500/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Top National Health Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2.5">
                {/* Indian Tricolor emblem */}
                <div className="w-3.5 h-7 flex flex-col rounded-xs overflow-hidden border border-white/20">
                  <div className="h-1/3 bg-[#FF9933]"></div>
                  <div className="h-1/3 bg-white flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#000080]"></div>
                  </div>
                  <div className="h-1/3 bg-[#138808]"></div>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white tracking-wider leading-none uppercase font-mono">
                    National Health Authority
                  </h4>
                  <span className="text-[10px] text-white/50 font-light">
                    Government of India
                  </span>
                </div>
              </div>

              <span className="bg-green-500/20 text-green-300 border border-green-500/30 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-widest font-mono">
                ABHA Verified
              </span>
            </div>

            {/* Profile Info & Simulated QR */}
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest font-mono">
                    Patient Full Name
                  </span>
                  <h3 className="text-xl font-serif italic text-white font-light">
                    {profile.name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-light">
                  <div>
                    <span className="text-[10px] text-white/40 font-mono block">Gender</span>
                    <p className="font-medium text-white/90">{profile.gender}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 font-mono block">DOB</span>
                    <p className="font-medium text-white/90 font-mono">{profile.dob}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 font-mono block">Blood Group</span>
                    <p className="font-bold text-red-400 font-mono">{profile.bloodGroup}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 font-mono block">State</span>
                    <p className="font-medium text-white/90">{profile.state}</p>
                  </div>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="bg-[#121212] p-2.5 rounded-2xl border border-white/10 shadow-lg text-center shrink-0">
                <div className="w-20 h-20 bg-white p-1 rounded-lg flex items-center justify-center">
                  <QrCode className="w-full h-full text-black" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 mt-1.5 block">
                  Scan for ABDM
                </span>
              </div>
            </div>

            {/* 14-Digit ABHA ID Box */}
            <div className="relative z-10 bg-white/[0.03] border border-white/10 text-white rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block font-mono">
                  14-Digit ABHA Number
                </span>
                <span className="text-base sm:text-lg font-mono font-bold tracking-widest text-white">
                  {profile.abhaNumber}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/40 block font-mono uppercase tracking-wider">ABHA Address</span>
                <span className="text-xs font-mono font-semibold text-white/80">
                  {profile.abhaAddress}
                </span>
              </div>
            </div>

            {/* Card Action Controls */}
            <div className="relative z-10 flex items-center justify-between pt-1">
              <button
                onClick={printRecord}
                className="text-xs font-semibold px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print ABHA Card</span>
              </button>
              <span className="text-[11px] text-white/40 font-mono">
                Linked Records: {linkedRecords.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Linked Clinical Prescription Records */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Linked Digital Health Records (MedLens AI Locker)
                </h3>
                <p className="text-xs text-white/50 font-light">
                  Prescriptions & diagnostic reports deciphered and securely synced
                </p>
              </div>
              <button
                onClick={printRecord}
                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg shadow-orange-950/40 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Clinical Summary</span>
              </button>
            </div>

            {/* Records List */}
            {linkedRecords.length === 0 ? (
              <div className="p-10 text-center border border-dashed border-white/10 rounded-2xl text-white/40 space-y-2">
                <FileText className="w-8 h-8 mx-auto text-white/20" />
                <p className="text-xs font-semibold text-white/60">
                  No records linked to ABHA yet
                </p>
                <p className="text-[11px] text-white/40 max-w-xs mx-auto font-light leading-relaxed">
                  Scan a doctor's prescription or lab report in the Rx Scanner tab and click "Link to ABHA" to store it here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {linkedRecords.map((rec, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-white/10 bg-[#0e0e0e] hover:border-white/20 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/25 uppercase font-mono tracking-wider">
                          {rec.documentType}
                        </span>
                        <h4 className="font-bold text-white text-sm mt-1.5">
                          {rec.title}
                        </h4>
                      </div>
                      <span className="text-xs text-white/40 font-mono">
                        {rec.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {rec.summary}
                    </p>

                    {/* Medicines preview */}
                    {rec.medicines && rec.medicines.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {rec.medicines.map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-white/5 border border-white/10 text-white/80 px-2.5 py-0.5 rounded-md font-medium"
                          >
                            {m.name} ({m.genericSalt})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
