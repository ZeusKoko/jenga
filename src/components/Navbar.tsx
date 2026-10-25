import React, { useState, useEffect } from 'react';
import { Currency } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currency: Currency;
  onCurrencyToggle: () => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyToggle,
  onOpenConsultation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F15]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between gap-6">
          
          {/* Brand Logo with Original Yellow Architectural Bar */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-white whitespace-nowrap shrink-0 group select-none font-display"
          >
            <span className="w-2.5 h-6 bg-[#E5A93C] inline-block transition-transform group-hover:scale-y-110 rounded-xs" />
            <span className="tracking-wider">JENGA</span>
          </a>

          {/* Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider font-condensed text-white/75">
            <a
              href="#portfolio"
              className="hover:text-[#E5A93C] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Projects
            </a>
            <a
              href="#cost-estimator"
              className="hover:text-[#E5A93C] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Cost Estimator
            </a>
            <a
              href="#engineering-craft"
              className="hover:text-[#E5A93C] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Structural Craft
            </a>
            <a
              href="#architectural-3d"
              className="hover:text-[#E5A93C] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              3D BIM Model
            </a>
            <a
              href="#sites-map"
              className="hover:text-[#E5A93C] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Nairobi Sites
            </a>
          </nav>

          {/* Action Area: Currency + GET A QUOTE Button in Original Yellow */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency toggle */}
            <button
              onClick={onCurrencyToggle}
              title={`Switch currency to ${currency === 'KES' ? 'USD' : 'KES'}`}
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/80 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className={currency === 'KES' ? 'text-[#E5A93C] font-bold' : 'text-white/40'}>KES</span>
              <span className="mx-1 text-white/30">/</span>
              <span className={currency === 'USD' ? 'text-[#E5A93C] font-bold' : 'text-white/40'}>USD</span>
            </button>

            {/* GET A QUOTE / Consult Button in Original Yellow */}
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider font-condensed text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>GET A QUOTE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-white/80 hover:text-white rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111722] border-b border-white/10 px-6 py-6 mt-3 space-y-4 shadow-2xl">
          <nav className="flex flex-col gap-3.5 text-base font-semibold uppercase tracking-wider font-condensed text-white/80">
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#E5A93C] transition-colors py-1"
            >
              Projects Portfolio
            </a>
            <a
              href="#cost-estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#E5A93C] transition-colors py-1"
            >
              Cost & Feasibility Estimator
            </a>
            <a
              href="#engineering-craft"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#E5A93C] transition-colors py-1"
            >
              Structural Craft & Materials
            </a>
            <a
              href="#architectural-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#E5A93C] transition-colors py-1"
            >
              Interactive 3D BIM Model
            </a>
            <a
              href="#sites-map"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#E5A93C] transition-colors py-1"
            >
              Nairobi Active Sites Map
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider font-condensed text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] rounded-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <span>GET A QUOTE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
