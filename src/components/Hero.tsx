import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, ShieldCheck, Ruler, Building, Award } from 'lucide-react';
import { Currency } from '../types';

interface HeroProps {
  currency: Currency;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currency, onOpenConsultation }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/src/assets/images/hero_jenga_architecture_1792929285580.jpg"
          alt="Modern brutalist architecture in Nairobi by JENGA"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured scrim according to frontend-design constitution */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15] via-[#0B0F15]/75 to-[#0B0F15]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,169,60,0.12),transparent_50%)]" />
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl">
          
          {/* Unboxed clean metadata kicker (anti-slop, no pill) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-[#E5A93C] uppercase mb-4"
          >
            <span>Nairobi, Kenya</span>
            <span aria-hidden="true">·</span>
            <span>NCA 1 Registered Contractor</span>
            <span aria-hidden="true">·</span>
            <span>BORAQS Certified</span>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.12] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Architectural Rigor. Bespoke Craft. Structures Built to Endure Generations.
          </motion.h1>

          {/* Subtitle Body Prose */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/80 font-normal leading-relaxed mb-8 max-w-2xl"
          >
            Headquartered in Nairobi, JENGA designs, engineers, and constructs premier luxury residences, commercial towers, and sustainable developments across East Africa with unyielding geometric precision.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3.5 text-sm font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Site Feasibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#cost-estimator"
              className="px-6 py-3.5 text-sm font-medium text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all duration-200 backdrop-blur-sm cursor-pointer"
            >
              Calculate Construction Cost
            </a>
          </motion.div>

        </div>
      </div>

      {/* Full-width 4-column KPI strip below the hero (adjacent quantitative proof) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full mt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-[#111722]/85 border border-white/10 backdrop-blur-md shadow-2xl"
        >
          {/* Stat 1 */}
          <div className="flex flex-col gap-1 pr-4 border-r border-white/10">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              {currency === 'KES' ? 'KES 18.4B+' : '$142M+'}
            </span>
            <span className="text-xs text-white/60 font-medium">
              Portfolio Value Delivered
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col gap-1 px-0 sm:px-4 sm:border-r border-white/10">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              142+
            </span>
            <span className="text-xs text-white/60 font-medium">
              Completed High-Spec Structures
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col gap-1 pr-4 sm:px-4 border-r border-white/10">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[#E5A93C] tabular-nums">
              100%
            </span>
            <span className="text-xs text-white/60 font-medium">
              On-Time Handover Record
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col gap-1 pl-0 sm:pl-4">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
              NCA 1
            </span>
            <span className="text-xs text-white/60 font-medium">
              Kenya Unlimited Tender Grade
            </span>
          </div>
        </motion.div>
      </div>

    </section>
  );
};
