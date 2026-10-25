import React, { useState, useMemo } from 'react';
import { Currency, CostEstimateInput, CostEstimateResult } from '../types';
import { Calculator, Download, ArrowRight, Check, SlidersHorizontal, Sparkles } from 'lucide-react';

interface CostEstimatorProps {
  currency: Currency;
  onOpenConsultationWithEstimate: (estimateSummary: string) => void;
}

// 2026/2027 Nairobi Quantity Surveyors Standard Benchmarks (per m² in KES)
const BASE_RATES: Record<CostEstimateInput['buildingType'], Record<CostEstimateInput['finishTier'], number>> = {
  residential_villa: {
    standard: 54000,
    executive: 76000,
    bespoke: 112000,
  },
  commercial_office: {
    standard: 58000,
    executive: 82000,
    bespoke: 124000,
  },
  apartments: {
    standard: 48000,
    executive: 68000,
    bespoke: 98000,
  },
  industrial_warehouse: {
    standard: 36000,
    executive: 52000,
    bespoke: 74000,
  },
};

const SUBURB_MODIFIERS: Record<string, number> = {
  'Karen / Runda': 1.08, // soil/distance logistics & luxury zoning guidelines
  'Westlands': 1.05,
  'Kilimani / Lavington': 1.04,
  'Upper Hill': 1.06,
  'Tatu City': 1.02,
  'Syokimau / Athi River': 0.98,
};

const ADDON_COSTS = {
  solar: 2400000, // 15kWp hybrid solar with lithium storage
  waterHarvesting: 950000, // 40,000L underground cistern & filtration
  smartAutomation: 1800000, // Lutron/KNX architectural lighting & HVAC control
  borehole: 1400000, // 200m drilling, casing, test pump & solar pump
};

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  currency,
  onOpenConsultationWithEstimate,
}) => {
  const [buildingType, setBuildingType] = useState<CostEstimateInput['buildingType']>('residential_villa');
  const [location, setLocation] = useState<string>('Karen / Runda');
  const [areaSqM, setAreaSqM] = useState<number>(450);
  const [finishTier, setFinishTier] = useState<CostEstimateInput['finishTier']>('executive');
  const [includeSolar, setIncludeSolar] = useState<boolean>(true);
  const [includeWaterHarvesting, setIncludeWaterHarvesting] = useState<boolean>(true);
  const [includeSmartAutomation, setIncludeSmartAutomation] = useState<boolean>(false);
  const [includeBorehole, setIncludeBorehole] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Calculation
  const result: CostEstimateResult = useMemo(() => {
    const baseRate = BASE_RATES[buildingType][finishTier];
    const suburbMod = SUBURB_MODIFIERS[location] || 1.0;
    const adjustedRate = baseRate * suburbMod;

    const baseConstructionKES = areaSqM * adjustedRate;

    let addonsKES = 0;
    if (includeSolar) addonsKES += ADDON_COSTS.solar;
    if (includeWaterHarvesting) addonsKES += ADDON_COSTS.waterHarvesting;
    if (includeSmartAutomation) addonsKES += ADDON_COSTS.smartAutomation;
    if (includeBorehole) addonsKES += ADDON_COSTS.borehole;

    const totalKES = baseConstructionKES + addonsKES;
    const totalUSD = totalKES / 130; // 1 USD ~ 130 KES
    const ratePerSqM_KES = Math.round(totalKES / areaSqM);

    // Approximate timeline in months
    let timelineMonths = 8;
    if (areaSqM > 300) timelineMonths = 12;
    if (areaSqM > 800) timelineMonths = 16;
    if (areaSqM > 2000) timelineMonths = 22;

    const breakdown = [
      { category: 'Substructure & Foundation', percentage: 28, amountKES: Math.round(totalKES * 0.28) },
      { category: 'Superstructure (Concrete & Rebar)', percentage: 34, amountKES: Math.round(totalKES * 0.34) },
      { category: 'Finishes & Architectural Glazing', percentage: 23, amountKES: Math.round(totalKES * 0.23) },
      { category: 'Mechanical, Electrical & Solar MEP', percentage: 15, amountKES: Math.round(totalKES * 0.15) },
    ];

    return {
      totalKES,
      totalUSD,
      ratePerSqM_KES,
      timelineMonths,
      breakdown,
    };
  }, [
    buildingType,
    location,
    areaSqM,
    finishTier,
    includeSolar,
    includeWaterHarvesting,
    includeSmartAutomation,
    includeBorehole,
  ]);

  const formatCurrency = (amountKES: number, amountUSD: number) => {
    if (currency === 'KES') {
      return `KES ${amountKES.toLocaleString()}`;
    }
    return `$${Math.round(amountUSD).toLocaleString()}`;
  };

  const handleDownloadSummary = () => {
    const reportText = `
======================================================
JENGA BUILDERS & STRUCTURAL ENGINEERING NAIROBI
PRELIMINARY FEASIBILITY & ESTIMATE SUMMARY (2026/2027)
======================================================
Project Type: ${buildingType.replace('_', ' ').toUpperCase()}
Location: ${location}, Nairobi, Kenya
Gross Floor Area: ${areaSqM} m² (${Math.round(areaSqM * 10.764)} sq ft)
Finishes Specification: ${finishTier.toUpperCase()}
------------------------------------------------------
Sustainable & Off-Grid Addons:
- Solar PV Hybrid: ${includeSolar ? 'YES' : 'NO'}
- Rainwater Cistern & Filter: ${includeWaterHarvesting ? 'YES' : 'NO'}
- Smart Automation & KNX: ${includeSmartAutomation ? 'YES' : 'NO'}
- Deep Borehole System: ${includeBorehole ? 'YES' : 'NO'}
------------------------------------------------------
FINANCIAL VALUATION:
Total Projected Cost: KES ${result.totalKES.toLocaleString()} (approx. $${Math.round(result.totalUSD).toLocaleString()} USD)
Effective Cost / m²: KES ${result.ratePerSqM_KES.toLocaleString()} / m²
Projected Execution Window: ${result.timelineMonths} Months
------------------------------------------------------
STRUCTURAL BREAKDOWN:
- Substructure & Foundations: KES ${result.breakdown[0].amountKES.toLocaleString()}
- Concrete & Steel Frame: KES ${result.breakdown[1].amountKES.toLocaleString()}
- Finishes & Glass Curtain Walls: KES ${result.breakdown[2].amountKES.toLocaleString()}
- MEP Services & Green Tech: KES ${result.breakdown[3].amountKES.toLocaleString()}
------------------------------------------------------
NCA 1 Registered Contractor | BORAQS Compliant
Contact: feasibility@jenga.co.ke | +254 20 790 3400
The Mirage, Chiromo Road, Westlands, Nairobi
======================================================
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JENGA_Feasibility_Estimate_${location.replace(/[^a-zA-Z]/g, '_')}_${areaSqM}sqm.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleBookWithCurrentEstimate = () => {
    const summary = `${buildingType.replace('_', ' ')} in ${location} (${areaSqM} m², ${finishTier} spec) · Estimated KES ${result.totalKES.toLocaleString()}`;
    onOpenConsultationWithEstimate(summary);
  };

  return (
    <section id="cost-estimator" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
      
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#E5A93C] uppercase mb-2">
          <span>Feasibility Engine</span>
          <span aria-hidden="true">·</span>
          <span>Nairobi BORAQS Benchmark Rates</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
          Nairobi Construction Cost & Feasibility Calculator.
        </h2>
        <p className="text-sm text-white/70 mt-3 leading-relaxed">
          Calibrated with Q1 2026 Kenyan material indices, cement tariffs, high-yield steel imports, and professional labor standards in Nairobi.
        </p>
      </div>

      {/* Main Calculator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-[#111722] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-7 shadow-2xl">
          
          {/* 1. Building Type */}
          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2.5">
              1. Project Typology
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'residential_villa', label: 'Luxury Villa' },
                { id: 'commercial_office', label: 'Commercial HQ' },
                { id: 'apartments', label: 'Apartments' },
                { id: 'industrial_warehouse', label: 'Logistics Hub' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setBuildingType(t.id as any)}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                    buildingType === t.id
                      ? 'border-[#E5A93C] bg-[#E5A93C]/10 text-white font-semibold'
                      : 'border-white/5 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Suburb Location */}
          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2.5">
              2. Nairobi Location / Zoning
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.keys(SUBURB_MODIFIERS).map((suburb) => (
                <button
                  key={suburb}
                  type="button"
                  onClick={() => setLocation(suburb)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left truncate cursor-pointer ${
                    location === suburb
                      ? 'border-[#E5A93C] bg-[#E5A93C]/10 text-white font-semibold'
                      : 'border-white/5 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {suburb}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Built-Up Area Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-white/60 uppercase">3. Gross Floor Area</span>
              <span className="text-white font-semibold text-sm tabular-nums">
                {areaSqM} m² <span className="text-white/40 font-normal">({Math.round(areaSqM * 10.764)} sq ft)</span>
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="3500"
              step="25"
              value={areaSqM}
              onChange={(e) => setAreaSqM(Number(e.target.value))}
              className="w-full h-2 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-[#E5A93C]"
            />
            <div className="flex justify-between text-[11px] font-mono text-white/40 mt-1">
              <span>150 m² (Compact Villa)</span>
              <span>1,200 m² (Executive Block)</span>
              <span>3,500 m² (Large Estate)</span>
            </div>
          </div>

          {/* 4. Quality Finish Specification */}
          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2.5">
              4. Architectural Finish Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'standard', name: 'Standard Commercial', desc: 'Local porcelain, painted render, UPVC frames' },
                { id: 'executive', name: 'Executive High-Spec', desc: 'Imported stone, Low-E glass, custom gypsum, Teak' },
                { id: 'bespoke', name: 'Bespoke Ultra-Luxury', desc: 'Post-tensioned concrete, Italian marble, Smart HVAC' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setFinishTier(tier.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    finishTier === tier.id
                      ? 'border-[#E5A93C] bg-[#E5A93C]/10 text-white'
                      : 'border-white/5 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold text-xs text-white">{tier.name}</div>
                  <div className="text-[11px] text-white/50 mt-1 leading-snug">{tier.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Sustainable Addons */}
          <div>
            <label className="block text-xs font-mono uppercase text-white/60 mb-2.5">
              5. Sustainable & Off-Grid Infrastructure
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSolar}
                  onChange={(e) => setIncludeSolar(e.target.checked)}
                  className="rounded border-white/20 text-[#E5A93C] focus:ring-[#E5A93C] accent-[#E5A93C] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-white/80">
                  <span className="font-semibold text-white block">15kWp Hybrid Solar + Lithium</span>
                  <span className="text-[11px] text-white/50">+KES 2.4M approx</span>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeWaterHarvesting}
                  onChange={(e) => setIncludeWaterHarvesting(e.target.checked)}
                  className="rounded border-white/20 text-[#E5A93C] focus:ring-[#E5A93C] accent-[#E5A93C] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-white/80">
                  <span className="font-semibold text-white block">40kL Rainwater Cistern</span>
                  <span className="text-[11px] text-white/50">+KES 950K approx</span>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSmartAutomation}
                  onChange={(e) => setIncludeSmartAutomation(e.target.checked)}
                  className="rounded border-white/20 text-[#E5A93C] focus:ring-[#E5A93C] accent-[#E5A93C] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-white/80">
                  <span className="font-semibold text-white block">KNX Smart Automation</span>
                  <span className="text-[11px] text-white/50">+KES 1.8M approx</span>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBorehole}
                  onChange={(e) => setIncludeBorehole(e.target.checked)}
                  className="rounded border-white/20 text-[#E5A93C] focus:ring-[#E5A93C] accent-[#E5A93C] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-white/80">
                  <span className="font-semibold text-white block">200m Deep Borehole + Pump</span>
                  <span className="text-[11px] text-white/50">+KES 1.4M approx</span>
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Output Valuation Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#111722] border border-[#E5A93C]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl sticky top-24">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="text-xs font-mono uppercase text-[#E5A93C] tracking-wider">
              Feasibility Valuation Output
            </span>
            <span className="text-xs font-mono text-white/50">
              Est. Window: {result.timelineMonths} Mos
            </span>
          </div>

          {/* Big Number Valuation */}
          <div>
            <div className="text-xs font-mono text-white/60 mb-1">Total Estimated Project Value</div>
            <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white tabular-nums">
              {formatCurrency(result.totalKES, result.totalUSD)}
            </div>
            <div className="text-xs text-white/50 mt-1 font-mono">
              ≈ KES {result.ratePerSqM_KES.toLocaleString()} per m² ({Math.round(result.ratePerSqM_KES / 10.764).toLocaleString()} KES/sq ft)
            </div>
          </div>

          {/* Real-time Structural Cost Breakdown Bars */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase text-white/50">Component Allocation</div>
            {result.breakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/70">{item.category}</span>
                  <span className="text-white font-semibold tabular-nums">{item.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E5A93C] rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <button
              onClick={handleBookWithCurrentEstimate}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Schedule On-Site Survey with This Spec</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadSummary}
              className="w-full py-3 px-4 rounded-xl text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Downloaded Feasibility Report!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#E5A93C]" />
                  <span>Download Feasibility Summary (.TXT)</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[11px] text-white/40 leading-relaxed font-mono">
            *Preliminary estimate for architectural budgeting. Subject to site geotechnical soil testing, topography survey, and detailed structural drawings.
          </div>

        </div>

      </div>

    </section>
  );
};
