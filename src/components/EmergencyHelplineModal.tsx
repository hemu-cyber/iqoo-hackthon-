import React from "react";
import { PhoneCall, X, ShieldAlert, HeartPulse, Sparkles, ExternalLink } from "lucide-react";
import { INDIAN_HELPLINES, INDIAN_GOVT_HEALTH_SCHEMES } from "../data/indianEmergency";

interface EmergencyHelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyHelplineModal: React.FC<EmergencyHelplineModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0a0a0a] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        {/* Header */}
        <div className="bg-red-950/40 border-b border-red-500/20 text-white p-5 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Government of India Emergency Helplines</h2>
              <p className="text-xs text-red-200/80 font-light">
                Toll-free 24x7 emergency medical transport & clinical advice
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="close-emergency-modal"
            className="text-white/60 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Helplines Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {INDIAN_HELPLINES.map((helpline) => (
              <div
                key={helpline.number}
                className="border border-white/10 rounded-2xl p-4 bg-white/[0.02] hover:bg-white/[0.04] hover:border-red-500/40 transition-all shadow-lg group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-mono uppercase tracking-wider">
                      Dial {helpline.number}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-1.5">
                      {helpline.name}
                    </h3>
                  </div>
                  <a
                    href={`tel:${helpline.number}`}
                    id={`dial-helpline-${helpline.number}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-red-600 hover:bg-red-500 text-white group-hover:scale-105 transition-transform shadow-md"
                    title={`Call ${helpline.number}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-white/60 mb-2 leading-relaxed font-light">
                  {helpline.purpose}
                </p>
                <div className="text-[11px] text-white/40 font-mono flex items-center justify-between pt-2 border-t border-white/5">
                  <span>{helpline.department}</span>
                  <span className="text-green-400 font-semibold">{helpline.availability}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Government Health Schemes Notice */}
          <div className="bg-green-950/20 border border-green-500/25 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-green-400 font-bold text-xs uppercase tracking-widest font-mono">
              <ShieldAlert className="w-4 h-4 text-green-400" />
              <span>National Health Protection & Support Schemes</span>
            </div>
            <p className="text-xs text-green-200/80 leading-relaxed font-light">
              Did you know? Under Ayushman Bharat PM-JAY, eligible Indian families receive up to ₹5,00,000 annual cashless coverage. Jan Aushadhi Kendras provide over 1,900+ generic drugs at up to 90% discount.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              {INDIAN_GOVT_HEALTH_SCHEMES.map((scheme) => (
                <a
                  key={scheme.acronym}
                  href={scheme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-green-500/40 text-white/80 hover:text-green-300 transition-colors"
                >
                  <span className="font-semibold text-xs">{scheme.title} ({scheme.acronym})</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#050505] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors cursor-pointer border border-white/10"
          >
            Close Helplines
          </button>
        </div>
      </div>
    </div>
  );
};
