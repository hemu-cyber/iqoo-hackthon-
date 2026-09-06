import React, { useState } from "react";
import {
  Search,
  IndianRupee,
  MapPin,
  Phone,
  CheckCircle2,
  TrendingDown,
  Building2,
  Users,
  Calculator,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { LanguageCode } from "../types";
import { INDIAN_MEDICINES_DATABASE, SAMPLE_JAN_AUSHADHI_KENDRA_LIST } from "../data/indianMedicines";

interface JanAushadhiFinderProps {
  currentLanguage: LanguageCode;
}

export const JanAushadhiFinder: React.FC<JanAushadhiFinderProps> = ({
  currentLanguage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  // Household savings calculator state
  const [diabeticMembers, setDiabeticMembers] = useState(1);
  const [hypertensionMembers, setHypertensionMembers] = useState(1);
  const [antibioticPrescriptionsPerYear, setAntibioticPrescriptionsPerYear] = useState(3);

  // Calculate annual savings
  // Average monthly branded cost for Diabetes (Metformin + Glimepiride): ~₹320/month -> PMBJP: ~₹48/month (Save ~₹272/mo * 12 = ₹3,264/yr per person)
  // Average monthly branded cost for BP (Telmisartan): ~₹290/month -> PMBJP: ~₹33/month (Save ~₹257/mo * 12 = ₹3,084/yr per person)
  // Average branded antibiotic strip (Augmentin/Azithral): ~₹230 -> PMBJP: ~₹38 (Save ~₹192 per prescription)
  const annualDiabetesSavings = diabeticMembers * 3264;
  const annualHypertensionSavings = hypertensionMembers * 3084;
  const annualAntibioticSavings = antibioticPrescriptionsPerYear * 192;
  const totalAnnualHouseholdSavings =
    annualDiabetesSavings + annualHypertensionSavings + annualAntibioticSavings;

  // Filter medicines
  const medicineList = Object.values(INDIAN_MEDICINES_DATABASE);
  const filteredMedicines = medicineList.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.genericSalt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Kendras
  const filteredKendras =
    selectedCity === "All"
      ? SAMPLE_JAN_AUSHADHI_KENDRA_LIST
      : SAMPLE_JAN_AUSHADHI_KENDRA_LIST.filter(
          (k) =>
            k.state.toLowerCase().includes(selectedCity.toLowerCase()) ||
            k.district.toLowerCase().includes(selectedCity.toLowerCase())
        );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-[#0a0a0a] border border-white/10 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-tr from-orange-500/10 via-transparent to-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ministry of Chemicals & Fertilizers, Govt. of India</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-light text-white mb-2 leading-tight">
            Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)
          </h1>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
            High-quality generic medicines matching the bioequivalence of leading Indian pharmaceutical brands at 50% to 90% lesser cost. Discover price comparisons and find your nearest Kendra.
          </p>
        </div>
      </div>

      {/* Household Annual Savings Calculator */}
      <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Indian Household Annual Savings Calculator
              </h3>
              <p className="text-xs text-white/50 font-light">
                Estimate how much your family saves each year by switching to Jan Aushadhi generic medicines
              </p>
            </div>
          </div>

          {/* Big Savings Metric */}
          <div className="bg-green-950/20 border border-green-500/30 px-5 py-2.5 rounded-2xl text-right">
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block font-mono">
              Estimated Family Annual Savings
            </span>
            <span className="text-2xl font-black text-green-300 font-mono">
              ₹{totalAnnualHouseholdSavings.toLocaleString("en-IN")} / year
            </span>
          </div>
        </div>

        {/* Input sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-white/70">Family Members with Diabetes:</span>
              <span className="font-bold font-mono text-green-400">{diabeticMembers} person(s)</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={diabeticMembers}
              onChange={(e) => setDiabeticMembers(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <p className="text-[11px] text-white/40 font-light">
              Saves ~₹{annualDiabetesSavings.toLocaleString("en-IN")}/yr on Metformin & Glimepiride
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-white/70">Family Members with High Blood Pressure:</span>
              <span className="font-bold font-mono text-green-400">{hypertensionMembers} person(s)</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={hypertensionMembers}
              onChange={(e) => setHypertensionMembers(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <p className="text-[11px] text-white/40 font-light">
              Saves ~₹{annualHypertensionSavings.toLocaleString("en-IN")}/yr on Telmisartan / Amlodipine
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-white/70">Acute Illness Prescriptions / Year:</span>
              <span className="font-bold font-mono text-green-400">{antibioticPrescriptionsPerYear} courses</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              value={antibioticPrescriptionsPerYear}
              onChange={(e) => setAntibioticPrescriptionsPerYear(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <p className="text-[11px] text-white/40 font-light">
              Saves ~₹{annualAntibioticSavings.toLocaleString("en-IN")}/yr on Antibiotics & Antipyretics
            </p>
          </div>
        </div>
      </div>

      {/* Branded vs PMBJP Generic Medicine Price Comparator */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Branded Medicine vs PMBJP Generic Price Table
            </h3>
            <p className="text-xs text-white/50 font-light">
              Search by Indian brand name (e.g. Dolo, Augmentin, Pantocid, Telma) or generic salt
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search medicine or salt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-white/10 rounded-xl focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none bg-[#121212] text-white placeholder-white/30"
            />
          </div>
        </div>

        {/* Medicines Table */}
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] border-b border-white/10 text-white/50 font-bold uppercase tracking-widest text-[10px] font-mono">
                <tr>
                  <th className="p-4">Popular Indian Brand</th>
                  <th className="p-4">Generic Salt (Active IP Formulation)</th>
                  <th className="p-4">Branded MRP</th>
                  <th className="p-4">Jan Aushadhi MRP</th>
                  <th className="p-4">You Save</th>
                  <th className="p-4">Dosage / Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMedicines.map((med, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-white">
                      {med.brandName}
                    </td>
                    <td className="p-4 font-medium text-green-400">
                      {med.genericSalt} ({med.strength})
                    </td>
                    <td className="p-4 line-through text-white/40 font-mono">
                      ₹{med.brandedPriceINR.toFixed(1)}
                    </td>
                    <td className="p-4 font-bold text-green-300 font-mono bg-green-500/10">
                      ₹{med.janAushadhiPriceINR.toFixed(1)}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center space-x-1 font-bold text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full font-mono">
                        <TrendingDown className="w-3 h-3" />
                        <span>{med.savingsPercentage}% Off</span>
                      </span>
                    </td>
                    <td className="p-4 text-white/60 max-w-xs font-light">
                      {med.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Jan Aushadhi Kendra Store Locator Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span>Nearby Pradhan Mantri Jan Aushadhi Kendras</span>
            </h3>
            <p className="text-xs text-white/50 font-light">
              Government authorized generic pharmacies operating 7 days a week
            </p>
          </div>

          {/* City Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-white/60 font-medium">Filter City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs border border-white/10 rounded-lg px-2.5 py-1.5 bg-[#121212] text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="All">All Cities</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredKendras.map((kendra) => (
            <div
              key={kendra.id}
              className="bg-[#0a0a0a] rounded-2xl p-5 border border-white/10 shadow-lg space-y-3 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10 font-mono">
                    {kendra.id}
                  </span>
                  <span className="text-xs font-bold font-mono text-orange-400">
                    {kendra.distanceKm} km away
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">
                  {kendra.storeName}
                </h4>

                <p className="text-xs text-white/60 flex items-start space-x-1.5 leading-relaxed font-light">
                  <MapPin className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
                  <span>
                    {kendra.address}, {kendra.district}, {kendra.state} - {kendra.pincode}
                  </span>
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-white/40 text-[11px] font-mono">{kendra.timings}</span>
                <a
                  href={`tel:${kendra.contactNumber}`}
                  className="font-bold text-orange-400 hover:text-orange-300 flex items-center space-x-1 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-xl transition-colors text-xs"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
