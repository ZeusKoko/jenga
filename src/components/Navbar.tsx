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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F15]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display group"
          >
            <span className="w-2.5 h-6 bg-[#E5A93C] inline-block transition-transform group-hover:scale-y-110" />
            <span>JENGA</span>
          </a>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
            <a
              href="#portfolio"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5A93C] hover:after:w-full after:transition-all"
            >
              Projects
            </a>
            <a
              href="#architectural-3d"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5A93C] hover:after:w-full after:transition-all"
            >
              3D BIM Model
            </a>
            <a
              href="#cost-estimator"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5A93C] hover:after:w-full after:transition-all"
            >
              Cost Estimator
            </a>
            <a
              href="#engineering-craft"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5A93C] hover:after:w-full after:transition-all"
            >
              Structural Craft
            </a>
            <a
              href="#sites-map"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E5A93C] hover:after:w-full after:transition-all"
            >
              Nairobi Sites
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Currency Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency toggle */}
            <button
              onClick={onCurrencyToggle}
              title={`Switch currency to ${currency === 'KES' ? 'USD' : 'KES'}`}
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white/80 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className={currency === 'KES' ? 'text-[#E5A93C] font-semibold' : 'text-white/50'}>KES</span>
              <span className="mx-1 text-white/30">/</span>
              <span className={currency === 'USD' ? 'text-[#E5A93C] font-semibold' : 'text-white/50'}>USD</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Consult Our Engineers</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
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
        <div className="lg:hidden bg-[#0F141E] border-b border-white/10 px-6 py-6 mt-3 space-y-4 shadow-2xl">
          <nav className="flex flex-col gap-3.5 text-base font-medium text-white/80">
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#E5A93C] transition-colors py-1"
            >
              Projects Portfolio
            </a>
            <a
              href="#architectural-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#E5A93C] transition-colors py-1"
            >
              Interactive 3D BIM Model
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
              className="w-full py-2.5 text-center text-sm font-semibold text-[#0B0F15] bg-[#E5A93C] rounded-lg cursor-pointer"
            >
              Consult Our Engineers
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
