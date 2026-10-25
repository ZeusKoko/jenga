import React, { useState } from 'react';
import { SiteLocation } from '../types';
import { MapPin, HardHat, Calendar, CheckCircle, Clock, Thermometer, ShieldCheck } from 'lucide-react';

const ACTIVE_SITES: SiteLocation[] = [
  {
    id: 'site-karen',
    name: 'The Mbagathi Ridge Pavilion',
    suburb: 'Karen',
    coordinates: { x: 26, y: 72 },
    type: 'Luxury Residential Estate',
    stage: 'Superstructure',
    progress: 84,
    area: '1,100 m²',
    leadEngineer: 'Eng. David Kariuki, PE',
    lastInspection: 'Yesterday (NCA Grade A Pass)',
  },
  {
    id: 'site-westlands',
    name: 'Apex Financial Center',
    suburb: 'Westlands',
    coordinates: { x: 52, y: 38 },
    type: 'Commercial High-Rise',
    stage: 'MEP & Glazing',
    progress: 92,
    area: '18,500 m²',
    leadEngineer: 'Eng. Sarah Mwangi, MIEK',
    lastInspection: '3 days ago (Glazing Seal Audit)',
  },
  {
    id: 'site-kilimani',
    name: 'Valley View Residences',
    suburb: 'Kilimani',
    coordinates: { x: 45, y: 56 },
    type: 'Multi-Family Residential',
    stage: 'Superstructure',
    progress: 68,
    area: '9,400 m²',
    leadEngineer: 'Eng. Peter Omondi, PE',
    lastInspection: 'This morning (Slab Level 7 Pour)',
  },
  {
    id: 'site-upperhill',
    name: 'East Africa Medical Suites',
    suburb: 'Upper Hill',
    coordinates: { x: 62, y: 60 },
    type: 'Healthcare & Specialized Facility',
    stage: 'Substructure',
    progress: 42,
    area: '14,200 m²',
    leadEngineer: 'Eng. Grace Muthoni, BORAQS',
    lastInspection: '4 days ago (Foundation Piles)',
  },
  {
    id: 'site-tatucity',
    name: 'Eco-Industrial Terminal Phase II',
    suburb: 'Tatu City',
    coordinates: { x: 78, y: 22 },
    type: 'Industrial Logistics Hub',
    stage: 'Final Handover',
    progress: 98,
    area: '24,000 m²',
    leadEngineer: 'Eng. Joseph Ndegwa, PE',
    lastInspection: 'Yesterday (Pre-Handover Snagging)',
  },
  {
    id: 'site-gigiri',
    name: 'The Embassy Crescent',
    suburb: 'Gigiri',
    coordinates: { x: 42, y: 24 },
    type: 'Diplomatic Compound',
    stage: 'Excavation',
    progress: 26,
    area: '4,500 m²',
    leadEngineer: 'Eng. Sarah Mwangi, MIEK',
    lastInspection: '5 days ago (Rock Trenching Signoff)',
  },
];

export const SiteMapSection: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<SiteLocation>(ACTIVE_SITES[0]);

  return (
    <section id="sites-map" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#E5A93C] uppercase mb-2">
            <span>Live Footprint</span>
            <span aria-hidden="true">·</span>
            <span>Nairobi Active Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Active Construction Sites Across Nairobi.
          </h2>
          <p className="text-sm text-white/70 mt-3 leading-relaxed">
            Real-time milestone tracking for ongoing site excavations, superstructure concrete pours, and structural handovers.
          </p>
        </div>

        {/* Live Weather & Climate Bar */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111722] border border-white/10 font-mono text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-white/70">Nairobi Metropolis:</span>
          <span className="text-white font-semibold">22°C Moderate · Optimal Curing</span>
        </div>
      </div>

      {/* Main Grid: Schematic Map (7 cols) + Selected Site Card (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Schematic Nairobi Metro Map Container */}
        <div className="lg:col-span-7 relative bg-[#0E131C] border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[460px] flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Subtle architectural schematic grid */}
          <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

          {/* Stylized Nairobi Highway Arteries (Expressway, Thika Superhighway, Southern Bypass, Waiyaki Way) */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Waiyaki Way to CBD / Mombasa Rd */}
            <path d="M 0,35 Q 40,45 60,65 T 100,85" fill="none" stroke="#E5A93C" strokeWidth="0.8" strokeDasharray="2,2" />
            {/* Southern Bypass */}
            <path d="M 15,85 Q 45,80 80,75" fill="none" stroke="#718096" strokeWidth="0.6" />
            {/* Thika Road */}
            <path d="M 55,55 Q 65,30 90,10" fill="none" stroke="#718096" strokeWidth="0.6" />
            {/* Western Ring Road */}
            <path d="M 35,20 Q 45,50 35,80" fill="none" stroke="#718096" strokeWidth="0.6" />
          </svg>

          {/* Suburb Label Markers in Background */}
          <div className="absolute top-6 left-8 text-[11px] font-mono text-white/20 select-none">GIGIRI / UN</div>
          <div className="absolute top-20 right-8 text-[11px] font-mono text-white/20 select-none">TATU CITY</div>
          <div className="absolute top-36 left-44 text-[11px] font-mono text-white/20 select-none">WESTLANDS</div>
          <div className="absolute bottom-28 left-16 text-[11px] font-mono text-white/20 select-none">KAREN / RUNDA</div>
          <div className="absolute bottom-24 left-44 text-[11px] font-mono text-white/20 select-none">KILIMANI</div>
          <div className="absolute bottom-20 right-28 text-[11px] font-mono text-white/20 select-none">UPPER HILL / CBD</div>

          {/* Active Site Pins */}
          <div className="relative w-full h-full min-h-[360px]">
            {ACTIVE_SITES.map((site) => {
              const isSelected = selectedSite.id === site.id;
              return (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  style={{ left: `${site.coordinates.x}%`, top: `${site.coordinates.y}%` }}
                  aria-label={`Select site in ${site.suburb}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                >
                  {/* Pin Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#E5A93C] text-[#0B0F15] scale-125 shadow-[0_0_15px_#E5A93C]'
                        : 'bg-[#151D2A] text-white/80 border border-white/20 hover:border-[#E5A93C] hover:scale-110'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Suburb Name tag */}
                  <div
                    className={`mt-1.5 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-[#E5A93C] text-[#0B0F15] font-bold'
                        : 'bg-[#0B0F15]/80 text-white/70 group-hover:text-white'
                    }`}
                  >
                    {site.suburb}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="text-[11px] font-mono text-white/40 pt-4 border-t border-white/5 flex items-center justify-between">
            <span>6 Active Commercial & Residential Sites</span>
            <span>Nairobi Metropolitan Area</span>
          </div>

        </div>

        {/* Selected Site Detail Inspection Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#111722] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-wider">
                Site Inspection Data
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                {selectedSite.stage}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-1">
              <span>{selectedSite.suburb}, Nairobi</span>
              <span>·</span>
              <span>{selectedSite.type}</span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-4">
              {selectedSite.name}
            </h3>

            {/* Progress Meter */}
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/60">Milestone Progress</span>
                <span className="text-[#E5A93C] font-semibold tabular-nums">{selectedSite.progress}% Complete</span>
              </div>
              <div className="w-full h-2 bg-[#1A2230] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E5A93C] rounded-full transition-all duration-500"
                  style={{ width: `${selectedSite.progress}%` }}
                />
              </div>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3.5 font-mono text-xs mb-6">
              <div className="p-3 rounded-xl bg-[#0B0F15] border border-white/5">
                <span className="text-white/40 block text-[10px] uppercase">Built Footprint</span>
                <span className="text-white font-semibold text-sm">{selectedSite.area}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0F15] border border-white/5">
                <span className="text-white/40 block text-[10px] uppercase">Current Phase</span>
                <span className="text-white font-semibold text-sm">{selectedSite.stage}</span>
              </div>
            </div>

            {/* Lead Engineer & Inspection Stamp */}
            <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5 font-mono text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <HardHat className="w-4 h-4 text-[#E5A93C]" />
                <span>Lead Engineer: <strong>{selectedSite.leadEngineer}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Last Quality Audit: {selectedSite.lastInspection}</span>
              </div>
            </div>

          </div>

          {/* Live site visit invite */}
          <div className="pt-6 border-t border-white/10 mt-6">
            <div className="text-xs text-white/60 mb-3">
              Would you like to schedule an accompanied technical site visit to our {selectedSite.suburb} active build?
            </div>
            <a
              href="#consultation"
              className="block w-full py-3 text-center rounded-xl text-xs font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] transition-colors cursor-pointer"
            >
              Book Site Walk with Resident Engineer
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};
