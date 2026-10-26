import React from 'react';
import { ArrowUpRight, MapPin, Phone, Mail, Building, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  return (
    <footer id="consultation" className="bg-[#070A0F] border-t border-white/10 pt-20 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Pre-Footer Action Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#111722] to-[#151D2A] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E5A93C] block mb-2">
              Ready to Break Ground in Nairobi?
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-white mb-3">
              Engage Kenya’s Foremost Master Builders.
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              From geotechnical soil stabilization to final interior handover, we deliver structural permanence with unyielding integrity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Engineering Discovery</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+254207903400"
              className="w-full sm:w-auto px-6 py-3.5 text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-colors text-center cursor-pointer"
            >
              +254 20 790 3400
            </a>
          </div>
        </div>

        {/* Main Footer Links & Statutory Registration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="inline-block py-1" aria-label="JENGA Home">
              <img
                src="/assets/aistudio/jenga_logo_black_e7ec8d3d.svg"
                alt="JENGA"
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain transition-transform duration-200 hover:scale-105"
              />
            </a>
            <p className="text-sm text-white/60 leading-relaxed">
              Master builders and structural engineers headquartered in Nairobi. Setting the standard for luxury residential villas, commercial high-rises, and industrial facilities across East Africa.
            </p>
            <div className="pt-2 text-xs font-mono text-white/40">
              <p>The Mirage, Tower 2, 7th Floor</p>
              <p>Chiromo Road, Westlands, Nairobi, Kenya</p>
              <p>P.O. Box 48920 - 00100 GPO Nairobi</p>
            </div>
          </div>

          {/* Practice Areas (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-[#E5A93C] tracking-wider mb-2">
              Practice Domains
            </div>
            <ul className="space-y-2 text-sm text-white/70 font-medium">
              <li><a href="#portfolio" className="hover:text-white transition-colors">Bespoke Luxury Residences (Karen, Runda)</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Commercial Towers & Headquarters</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Multi-Family Biophilic Apartments</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Industrial Superflat Flooring & Logistics</a></li>
              <li><a href="#engineering-craft" className="hover:text-white transition-colors">Geotechnical Soil & Piling Stabilization</a></li>
            </ul>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase text-[#E5A93C] tracking-wider mb-2">
              Exploration
            </div>
            <ul className="space-y-2 text-sm text-white/70 font-medium">
              <li><a href="#architectural-3d" className="hover:text-white transition-colors">3D BIM Model</a></li>
              <li><a href="#cost-estimator" className="hover:text-white transition-colors">Cost Estimator</a></li>
              <li><a href="#engineering-craft" className="hover:text-white transition-colors">Structural Craft</a></li>
              <li><a href="#sites-map" className="hover:text-white transition-colors">Nairobi Sites Map</a></li>
              <li><button onClick={onOpenConsultation} className="hover:text-[#E5A93C] transition-colors text-left cursor-pointer">Request BQ Audit</button></li>
            </ul>
          </div>

          {/* Accreditations & Statutory Licensure (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase text-[#E5A93C] tracking-wider mb-2">
              Statutory Licensure
            </div>
            <div className="space-y-2 font-mono text-xs text-white/60">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-white block font-semibold">NCA 1 Building Works</span>
                <span>Reg: NCA1/BLD/2019/0421</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-white block font-semibold">Engineers Board of Kenya</span>
                <span>EBK Consulting Firm: F-0382</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-white block font-semibold">BORAQS Corporate</span>
                <span>Practice Registration No: A492</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © {new Date().getFullYear()} JENGA Construction Group Kenya Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#E5A93C] italic font-display">Tujenge Pamoja</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Health & Safety (OSHA) Code</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
