import React, { useState, useRef } from "react";
import {
  Camera,
  Upload,
  FileText,
  Sparkles,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
  ShieldCheck,
  Clock,
  Pill,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Utensils,
  Share2,
} from "lucide-react";
import { LanguageCode, MedicalAnalysisResult, SampleDocument } from "../types";
import { UI_TRANSLATIONS } from "../data/indianLanguages";
import { SAMPLE_DOCUMENTS } from "../data/indianLabTests";
import { analyzeMedicalDocument } from "../services/medicalAiService";

interface PrescriptionScannerProps {
  currentLanguage: LanguageCode;
  onSaveToAbha: (result: MedicalAnalysisResult) => void;
}

export const PrescriptionScanner: React.FC<PrescriptionScannerProps> = ({
  currentLanguage,
  onSaveToAbha,
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.en;

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<MedicalAnalysisResult | null>(
    SAMPLE_DOCUMENTS[0].preparsedResult
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(
    SAMPLE_DOCUMENTS[0].previewImage
  );
  const [customText, setCustomText] = useState<string>("");
  const [activeCamera, setActiveCamera] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Start Camera
  const startCamera = async () => {
    try {
      setActiveCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn("Camera access not available or denied:", err);
      alert("Camera access was not permitted or not supported in this browser. Please use file upload or sample presets!");
      setActiveCamera(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setActiveCamera(false);
  };

  // Capture Frame
  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setSelectedImage(dataUrl);
      stopCamera();
      triggerAnalysis(dataUrl, "Live captured prescription or medicine strip");
    }
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      triggerAnalysis(base64, file.name);
    };
    reader.readAsDataURL(file);
  };

  // Trigger Analysis
  const triggerAnalysis = async (imgBase64: string | null, textPrompt: string) => {
    setAnalyzing(true);
    try {
      const analysis = await analyzeMedicalDocument({
        taskType: "prescription",
        userInput: textPrompt,
        imageBase64: imgBase64,
        targetLanguage: t.tagline,
      });
      setResult(analysis);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Quick Demo Samples
  const handleSelectSample = (sample: SampleDocument) => {
    setSelectedImage(sample.previewImage);
    setResult(sample.preparsedResult);
  };

  // Text-to-Speech audio reader in Indian languages
  const toggleSpeech = () => {
    if (!("speechSynthesis" in window) || !result) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const medicinesSummary = result.medicines
      ?.map(
        (m, idx) =>
          `Medicine ${idx + 1}: ${m.name}. Active Salt: ${m.genericSalt}. Dosage timing: ${m.timing}. Food advice: ${m.foodPrecautions}`
      )
      .join(". ");

    const speechText = `${result.title}. ${result.summary}. ${medicinesSummary}`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Total savings calculation across identified medicines
  const totalBranded =
    result?.medicines?.reduce((sum, m) => sum + (m.brandedPriceINR || 0), 0) || 0;
  const totalJanAushadhi =
    result?.medicines?.reduce((sum, m) => sum + (m.janAushadhiPriceINR || 0), 0) || 0;
  const netSavings = Math.max(0, totalBranded - totalJanAushadhi);
  const overallSavingsPct = totalBranded > 0 ? Math.round((netSavings / totalBranded) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Hero Intro */}
      <div className="bg-[#0a0a0a] border border-white/10 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-tr from-orange-500/10 via-transparent to-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CDSCO & Indian Telemedicine Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif italic font-light leading-tight text-white mb-3">
            Intelligent Insights for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">1.4 Billion Lives.</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 font-light">
            Upload doctor's handwritten OPD slips, hospital discharge summaries, or medicine blister strips.
            MedLens AI decodes Latin dosage notations (TDS, BD, OD), verifies salts, and highlights generic equivalents saving up to 85% at Pradhan Mantri Jan Aushadhi Kendras.
          </p>

          {/* Preset Buttons for Instant Demo */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-orange-400/90 mb-2.5 flex items-center space-x-1.5">
              <span>Try Authentic Indian Hospital Prescriptions:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_DOCUMENTS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  id={`btn-sample-${sample.id}`}
                  className="bg-white/5 hover:bg-white/10 active:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-white text-xs px-3 py-2 rounded-xl transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-medium text-white/90">{sample.hospitalOrLab}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input (Camera / Upload / Text) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center space-x-2">
              <Camera className="w-4 h-4 text-orange-400" />
              <span>Input Prescription or Blister Strip</span>
            </h2>

            {/* Camera Viewfinder if Active */}
            {activeCamera ? (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 flex items-center justify-center border border-white/10">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                ></video>
                <div className="absolute inset-0 border-2 border-orange-400/70 pointer-events-none rounded-xl m-4 flex items-center justify-center">
                  <div className="text-orange-300 text-xs font-medium bg-black/80 px-3 py-1 rounded-full border border-orange-500/30">
                    Align Doctor's Prescription or Medicine Strip Here
                  </div>
                </div>
                <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-4">
                  <button
                    onClick={captureCameraFrame}
                    id="camera-capture-frame-btn"
                    className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-orange-950/60 transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Capture Snapshot</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    id="camera-cancel-btn"
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border border-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Drag and drop upload box */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/15 hover:border-orange-500/60 rounded-2xl p-6 text-center cursor-pointer transition-all bg-white/[0.02] hover:bg-orange-500/[0.03] group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                  className="hidden"
                  id="prescription-file-input"
                />
                <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-3 transition-colors border border-white/10">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-white mb-1">
                  Upload Prescription or Medicine Photo
                </p>
                <p className="text-xs text-white/40 max-w-xs mx-auto mb-4">
                  Supports JPG, PNG, or clear camera snapshots from your phone
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera();
                    }}
                    id="start-camera-scanner-btn"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-500 transition-colors shadow-md shadow-orange-950/40 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Open Camera</span>
                  </button>
                  <span className="text-xs text-white/40">or browse files</span>
                </div>
              </div>
            )}

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 max-h-56">
                <img
                  src={selectedImage}
                  alt="Prescription preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/20">
                  Active Document
                </div>
              </div>
            )}

            {/* Optional Manual Text / Doctor's Notes */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-white/70 flex items-center justify-between">
                <span>Or Enter Prescription Notes / Medicine Names:</span>
                <span className="text-[11px] text-white/40 font-normal">Optional</span>
              </label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. Tab Dolo 650 TDS x 4 days, Tab Pantocid 40 OD morning empty stomach, Tab Montair-LC HS..."
                className="w-full text-xs p-3.5 border border-white/10 rounded-xl focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-[#121212] text-white placeholder-white/30 min-h-[75px]"
              />
              <button
                onClick={() => triggerAnalysis(selectedImage, customText || "Evaluate prescription for Indian patient")}
                disabled={analyzing}
                id="btn-run-analysis"
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-white/10 disabled:text-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-950/40 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing with Indian Clinical Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run MedLens AI Clinical Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction & Savings Results */}
        <div className="lg:col-span-7 space-y-6">
          {analyzing ? (
            <div className="bg-[#0a0a0a] rounded-3xl p-12 border border-white/10 text-center space-y-4 shadow-xl animate-pulse">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mx-auto">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-white">
                {t.analyzingMedical}
              </h3>
              <p className="text-xs text-white/50 max-w-md mx-auto">
                Comparing against Indian Pharmacopoeia standards, CDSCO Schedule H1 mandates, and PMBJP Jan Aushadhi generic catalog.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Summary Header Card */}
              <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                      Indian Clinical Extraction • {result.confidenceScore}% Confidence
                    </span>
                    <h2 className="text-lg font-bold text-white mt-1.5 font-sans">
                      {result.title}
                    </h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Audio Reader Button */}
                    <button
                      onClick={toggleSpeech}
                      id="btn-voice-reader"
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isPlayingAudio
                          ? "bg-red-500/20 text-red-300 border border-red-500/40"
                          : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-red-400" />
                          <span>{t.stopAudio}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-orange-400" />
                          <span>{t.listenAloud}</span>
                        </>
                      )}
                    </button>

                    {/* Save to ABHA */}
                    <button
                      onClick={() => onSaveToAbha(result)}
                      id="btn-save-to-abha"
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                      <span>Link to ABHA</span>
                    </button>
                  </div>
                </div>

                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {result.summary}
                </p>

                {/* Overall Generic Savings Card */}
                {totalBranded > 0 && (
                  <div className="bg-gradient-to-r from-orange-950/30 to-green-950/20 border border-orange-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5 text-orange-400 font-bold text-xs uppercase tracking-wider">
                        <IndianRupee className="w-4 h-4 text-orange-400" />
                        <span>Jan Aushadhi Generic Savings Available</span>
                      </div>
                      <p className="text-xs text-white/60">
                        Total Branded Pharmacy Cost: <span className="line-through text-white/40 font-semibold">₹{totalBranded.toFixed(1)}</span>
                        {" → "}
                        PMBJP Generic Cost: <span className="font-bold text-green-400">₹{totalJanAushadhi.toFixed(1)}</span>
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-600 to-green-600 text-white text-center px-4 py-2 rounded-xl shadow-lg shadow-orange-950/40 whitespace-nowrap">
                      <div className="text-lg font-black tracking-tight">
                        Save ₹{netSavings.toFixed(1)}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-white/90">
                        {overallSavingsPct}% Cheaper at Jan Aushadhi
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Identified Medicines List */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 flex items-center space-x-2">
                  <Pill className="w-4 h-4 text-orange-400" />
                  <span>Identified Medicines & Timing Schedule</span>
                </h3>

                <div className="space-y-3.5">
                  {result.medicines?.map((med, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0a0a0a] rounded-2xl p-5 border border-white/10 shadow-lg hover:border-white/20 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-white text-base">
                              {med.name}
                            </h4>
                            {med.scheduleCategory && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10">
                                {med.scheduleCategory}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-green-400 mt-0.5">
                            Active Salt: {med.genericSalt} ({med.strength})
                          </p>
                        </div>

                        {/* Timing Tag */}
                        <div className="flex items-center space-x-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-lg text-xs font-bold">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span>{med.timing}</span>
                        </div>
                      </div>

                      {/* Purpose & Food instructions */}
                      <p className="text-xs text-white/70 leading-relaxed font-light">
                        <strong className="text-white">Therapeutic Purpose:</strong> {med.purpose}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        <div>
                          <span className="font-semibold text-white/70 flex items-center space-x-1">
                            <Utensils className="w-3 h-3 text-white/40" />
                            <span>Food Precaution:</span>
                          </span>
                          <p className="text-white/60 mt-0.5">{med.foodPrecautions}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-amber-400 flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            <span>Clinical Warning:</span>
                          </span>
                          <p className="text-white/60 mt-0.5">
                            {med.warnings?.[0] || "Take exactly as directed by physician."}
                          </p>
                        </div>
                      </div>

                      {/* Jan Aushadhi Generic Comparison */}
                      <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="text-white/60">
                          <span>PMBJP Generic Equivalent: </span>
                          <span className="font-bold text-white">{med.genericSalt}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-white/40 line-through">₹{med.brandedPriceINR}</span>
                          <span className="font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full">
                            ₹{med.janAushadhiPriceINR} ({med.savingsPercentage}% off)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indian Dietary Advice & Doctor Consultation Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Indian Dietary Guidelines */}
                <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-white/10 shadow-lg space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 flex items-center space-x-2">
                    <Utensils className="w-4 h-4 text-orange-400" />
                    <span>{t.indianDietAdviceTitle}</span>
                  </h4>
                  <ul className="text-xs text-white/60 space-y-2 leading-relaxed">
                    {result.dietaryAdvice?.map((advice, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-orange-400 font-bold">•</span>
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Questions for next OPD visit */}
                <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-white/10 shadow-lg space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/70 flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-blue-400" />
                    <span>{t.doctorQuestionsTitle}</span>
                  </h4>
                  <ul className="text-xs text-white/60 space-y-2 leading-relaxed">
                    {result.doctorConsultationQuestions?.map((q, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-[11px] text-white/40 bg-white/[0.02] p-4 rounded-xl border border-white/10 leading-relaxed font-mono">
                <strong className="text-white/60">INDIAN TELEMEDICINE COMPLIANCE:</strong> {result.disclaimer}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
