import React, { useState } from 'react';
import { ShieldCheck, Award, Layers, Compass, CheckCircle2, FileCheck } from 'lucide-react';
import concreteCraftImage from '../assets/images/craft_materials_concrete_1792929390805.jpg';

export const EngineeringCraft: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concrete' | 'steel' | 'geotech' | 'glazing'>('concrete');

  const tabsContent = {
    concrete: {
      title: 'High-Performance Structural Concrete Mixes',
      subtitle: 'Engineered for Nairobi’s climatic conditions with Kenyan volcanic pozzolana.',
      specifications: [
        { label: 'Standard Compressive Strength', value: 'C25/30 to C40/50 MPa' },
        { label: 'Quality Assurance', value: 'Every batch cube-tested at 7 & 28 days' },
        { label: 'Pozzolana Blends', value: 'Reduces hydration heat and micro-fissuring' },
        { label: 'Finish Techniques', value: 'Architectural board-formed & polished aggregate' },
      ],
      description: 'Our concrete design balances load-bearing density with thermal massing. By utilizing certified volcanic pozzolanic cements sourced in the Rift Valley, we attain high early strength while minimizing the embodied carbon footprint by up to 28% compared to standard OPC.',
    },
    steel: {
      title: 'BS 4449 Grade 500B High-Yield Deformed Steel',
      subtitle: 'Seismic tensile resilience designed for East African Rift Valley tectonic codes.',
      specifications: [
        { label: 'Yield Strength', value: '500 N/mm² Minimum Characteristic' },
        { label: 'Ductility Class', value: 'Class B (High Seismic Plasticity)' },
        { label: 'Bendability Standard', value: '180° Cold Bend without micro-cracking' },
        { label: 'Testing Protocol', value: '100% mill test certified with heat traceability' },
      ],
      description: 'Every metric tonne of reinforcement steel on JENGA sites is independently lab-tested for tensile yield, chemical elongation, and weldability according to BS 4449 / KS 573 Kenyan standards. We reject substandard rebar without exception.',
    },
    geotech: {
      title: 'Nairobi Geotechnical Soil & Piling Engineering',
      subtitle: 'Solving black cotton expansive soils and deep volcanic ash layers.',
      specifications: [
        { label: 'Foundation Types', value: 'Reinforced Rafts, Pad Footings, Bored Piles' },
        { label: 'Soil Mitigation', value: 'Full black cotton excavation or lime stabilization' },
        { label: 'Bedrock Anchor', value: 'Drilled into solid Nairobi phonolite basalt' },
        { label: 'Ground Testing', value: 'Dynamic Cone Penetrometer (DCP) & Plate Load' },
      ],
      description: 'Nairobi topography ranges from expansive black cotton clay in Kilimani and Syokimau to volcanic red soil in Karen and Kiambu. Our in-house geotechnical engineers engineer custom foundation solutions tailored specifically to the borehole log of your exact plot.',
    },
    glazing: {
      title: 'Architectural Façade & Low-E Double Glazing',
      subtitle: 'Bioclimatic comfort engineered to eliminate air conditioning loads in Nairobi’s high altitude.',
      specifications: [
        { label: 'Glass Composition', value: '6mm Low-E Toughened + 12mm Argon + 6mm Clear' },
        { label: 'Solar Heat Gain (SHGC)', value: '0.34 for optimal thermal rejection' },
        { label: 'Acoustic Attenuation', value: 'Sound Transmission Class (STC) 42 dB' },
        { label: 'Frame Alloy', value: 'Structural anodized aluminum 6063-T6' },
      ],
      description: 'At 1,795 meters above sea level, Nairobi experiences strong solar radiation during midday and crisp evening temperatures. Our double-glazed thermal break assemblies keep interiors naturally cool by day and warm by night without relying on energy-intensive chillers.',
    },
  };

  const current = tabsContent[activeTab];

  return (
    <section id="engineering-craft" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
      
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#E5A93C] uppercase mb-2">
          <span>Structural Discipline</span>
          <span aria-hidden="true">·</span>
          <span>Material Science</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
          Obsessive Craftsmanship. Uncompromising Material Rigor.
        </h2>
        <p className="text-sm text-white/70 mt-3 leading-relaxed">
          Behind every elegant silhouette is rigorous structural engineering tested to international British Standards (BS EN) and Kenya Bureau of Standards (KEBS) benchmarks.
        </p>
      </div>

      {/* Main Material Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        
        {/* Left: Real High-Res Macro Image */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl min-h-[380px]">
          <img
            src={concreteCraftImage}
            alt="Board formed concrete and structural steel joinery by JENGA"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[11px] font-mono text-[#E5A93C] uppercase block mb-1">
              Material Detail · Karen Villa 04
            </span>
            <div className="text-sm font-semibold text-white">
              Board-Formed C35 Concrete Meeting Precision Black Oxide Steel Joinery
            </div>
          </div>
        </div>

        {/* Right: Interactive Tabs & Lab Specs */}
        <div className="lg:col-span-7 bg-[#111722] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          
          <div>
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto">
              {[
                { id: 'concrete', label: 'Concrete Form' },
                { id: 'steel', label: 'BS 4449 Rebar' },
                { id: 'geotech', label: 'Soil & Piling' },
                { id: 'glazing', label: 'Thermal Glazing' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#E5A93C] text-[#0B0F15] font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Current Spec Details */}
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
              {current.title}
            </h3>
            <p className="text-xs font-mono text-[#E5A93C] mb-4">
              {current.subtitle}
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {current.description}
            </p>

            {/* Spec grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
              {current.specifications.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0B0F15] border border-white/5">
                  <span className="text-white/40 block text-[10px] uppercase">{s.label}</span>
                  <span className="text-white font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection assurance */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#E5A93C] shrink-0" />
            <span className="text-xs text-white/80">
              100% of concrete pours and steel deliveries undergo independent third-party laboratory verification before sign-off.
            </span>
          </div>

        </div>

      </div>

      {/* Official Kenyan Regulatory Badges & Accreditations */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F141E] border border-white/10">
        <div className="text-xs font-mono text-center uppercase tracking-wider text-white/50 mb-6">
          Official Kenyan Statutory Accreditations & Licensure
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-lg font-bold font-mono text-[#E5A93C]">NCA 1</span>
            <span className="text-xs font-semibold text-white">National Construction Authority</span>
            <span className="text-[11px] text-white/50">Category 1 (Unlimited Contract Value)</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-lg font-bold font-mono text-white">BORAQS</span>
            <span className="text-xs font-semibold text-white">Architects & Quantity Surveyors</span>
            <span className="text-[11px] text-white/50">Corporate Practice Registration</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-lg font-bold font-mono text-white">EBK</span>
            <span className="text-xs font-semibold text-white">Engineers Board of Kenya</span>
            <span className="text-[11px] text-white/50">Registered Structural Engineers</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-lg font-bold font-mono text-[#E5A93C]">NEMA EIA</span>
            <span className="text-xs font-semibold text-white">Environmental Authority</span>
            <span className="text-[11px] text-white/50">Licensed Environmental Impact Auditing</span>
          </div>

        </div>
      </div>

    </section>
  );
};
