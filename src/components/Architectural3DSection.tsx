import React from 'react';
import { ArchitecturalCanvas } from './three/ArchitecturalCanvas';
import { Box, Layers, Eye, Shield, Compass } from 'lucide-react';

export const Architectural3DSection: React.FC = () => {
  return (
    <section id="architectural-3d" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#E5A93C] uppercase mb-2">
            <span>Spatial Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time 3D BIM Viewer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Deconstruct Our Structural Pavilion in Real Time.
          </h2>
          <p className="text-sm text-white/70 mt-3 leading-relaxed">
            Interact with our parametric architectural study. Use the bottom dock to explode floor assemblies, toggle between raw rebar steel wireframes and poured concrete finishes, or inspect structural elevations.
          </p>
        </div>

        {/* Feature summary */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
            Three.js WebGL Engine
          </span>
          <span>·</span>
          <span>Zero External Assets</span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <ArchitecturalCanvas />

      {/* Architectural Callout Cards below the 3D model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        
        <div className="p-4 rounded-xl bg-[#111722] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#E5A93C] uppercase">01. Substructure</span>
            <Box className="w-4 h-4 text-white/40" />
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">
            Basalt Bedrock Anchorage
          </h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Pad footings and monolithic raft slab eliminating settlement on Nairobi volcanic geology.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111722] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#E5A93C] uppercase">02. Superstructure</span>
            <Layers className="w-4 h-4 text-white/40" />
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">
            6.2m Cantilevered Mezzanine
          </h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Post-tensioned unbonded tendons engineered for zero dynamic vibration and maximum overhang.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111722] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#E5A93C] uppercase">03. Envelope</span>
            <Eye className="w-4 h-4 text-white/40" />
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">
            Curtain Wall Thermal Break
          </h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Low-E double glazing with structural silicone sealant resisting high-altitude equatorial UV.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111722] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#E5A93C] uppercase">04. Rooftop</span>
            <Compass className="w-4 h-4 text-white/40" />
          </div>
          <h4 className="text-sm font-semibold text-white mb-1">
            Solar Louver Pergola
          </h4>
          <p className="text-xs text-white/60 leading-relaxed">
            Bioclimatic cedar & steel canopy oriented to block harsh midday western sun while capturing breezes.
          </p>
        </div>

      </div>

    </section>
  );
};
