import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Michael Wachira',
      role: 'Diaspora Homeowner & Neurosurgeon',
      location: 'London / Karen, Nairobi',
      project: 'The Karen Ridge Villa (920 m²)',
      quote:
        'Managing a bespoke home build in Kenya while practicing surgery in London usually spells disaster with contractors. JENGA transformed the experience: bi-weekly drone scans, rigorous Bill of Quantities transparency, and millimetre-accurate post-tensioned concrete. They handed over keys 2 weeks ahead of our scheduled family move.',
      highlight: 'Delivered 14 days ahead of schedule with zero price creep.',
    },
    {
      name: 'Amina Kassam',
      role: 'Managing Partner, Apex Capital East Africa',
      location: 'Westlands, Nairobi',
      project: 'Apex Financial Center (24 Storeys)',
      quote:
        'For our flagship 24-storey tower in Westlands, we needed an NCA 1 contractor capable of continuous slip-form pouring and Tier-2 EDGE green certification. JENGA’s engineering team managed the structural core flawlessly. Their coordination between structural, electrical, and façade subcontractors set a new benchmark in Nairobi commercial construction.',
      highlight: 'Attained Level 2 EDGE Green Building Certification.',
    },
    {
      name: 'Eng. Patrick Njoroge',
      role: 'Director of Infrastructure, Tatu Logistics Group',
      location: 'Kiambu / Nairobi Metro',
      project: 'Eco-Industrial Terminal (24,000 m²)',
      quote:
        'Industrial flooring requires exacting FM2 DIN standard tolerances for autonomous robotic reach trucks. Other contractors claimed it was impossible in Kenya; JENGA imported laser screeds, formulated specialized steel-fiber mix designs, and passed European flatness inspections on the very first pass.',
      highlight: 'First-pass compliance with DIN 18202 Class 4 FM2 flatness.',
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-5 sm:px-8 border-t border-white/5">
      
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#E5A93C] uppercase mb-2">
          <span>Client Verifications</span>
          <span aria-hidden="true">·</span>
          <span>Proven Outcomes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
          Entrusted by Discerning Homeowners and Institutional Developers.
        </h2>
      </div>

      {/* Testimonials 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-7 rounded-2xl bg-[#111722] border border-white/10 flex flex-col justify-between shadow-xl"
          >
            <div>
              <Quote className="w-6 h-6 text-[#E5A93C] mb-4 opacity-75" />
              <p className="text-sm text-white/80 leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-[#E5A93C]">
                {t.highlight}
              </div>

              <div>
                <div className="text-sm font-bold text-white font-display">{t.name}</div>
                <div className="text-xs text-white/60">{t.role}</div>
                <div className="text-[11px] text-white/40 font-mono mt-0.5">{t.location} · {t.project}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
