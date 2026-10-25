/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Currency } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { Architectural3DSection } from './components/Architectural3DSection';
import { CostEstimator } from './components/CostEstimator';
import { EngineeringCraft } from './components/EngineeringCraft';
import { SiteMapSection } from './components/SiteMapSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('KES');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationEstimateSummary, setConsultationEstimateSummary] = useState('');

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'KES' ? 'USD' : 'KES'));
  };

  const handleOpenConsultation = () => {
    setConsultationEstimateSummary('');
    setIsConsultationOpen(true);
  };

  const handleOpenConsultationWithEstimate = (summary: string) => {
    setConsultationEstimateSummary(summary);
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F15] text-[#EDEDED] flex flex-col font-sans selection:bg-[#E5A93C] selection:text-[#0B0F15]">
      
      {/* 1. Global Navigation */}
      <Navbar
        currency={currency}
        onCurrencyToggle={toggleCurrency}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 2. Flagship Hero Section */}
        <Hero
          currency={currency}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 3. Projects Portfolio with CAD Blueprint Comparison Slider */}
        <ProjectsSection
          currency={currency}
          onBookConsultation={handleOpenConsultation}
        />

        {/* 4. Tasteful 3D BIM Pavilion & Structural Model Showcase */}
        <Architectural3DSection />

        {/* 5. Nairobi Construction Cost & Feasibility Calculator */}
        <CostEstimator
          currency={currency}
          onOpenConsultationWithEstimate={handleOpenConsultationWithEstimate}
        />

        {/* 6. Structural Craftsmanship & Material Science Lab */}
        <EngineeringCraft />

        {/* 7. Active Nairobi Construction Sites & Drone Map */}
        <SiteMapSection />

        {/* 8. Verified Client Testimonials & Institutional Trust */}
        <TestimonialsSection />
      </main>

      {/* 9. Comprehensive Corporate Footer */}
      <Footer onOpenConsultation={handleOpenConsultation} />

      {/* 10. Direct Engineering Consultation & Survey Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialEstimateSummary={consultationEstimateSummary}
      />

    </div>
  );
}
