import React from 'react';
import { ProjectItem, Currency } from '../types';
import { X, MapPin, Calendar, Building2, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  currency: Currency;
  onClose: () => void;
  onBookConsultation: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  currency,
  onClose,
  onBookConsultation,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070A0F]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#111722] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-white">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-[#111722]/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C] uppercase tracking-wider mb-1.5">
              <span>{project.location}</span>
              <span>·</span>
              <span>NCA {project.ncaRating}</span>
              <span>·</span>
              <span>Completed {project.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Overview Prose */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-white/50 mb-2">
              Architectural & Engineering Summary
            </h3>
            <p className="text-base text-white/80 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Engineering Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#0B0F15] border border-white/5 font-mono text-xs">
            <div>
              <span className="text-white/40 block">Built-Up Area</span>
              <span className="text-white font-semibold text-sm">{project.area}</span>
            </div>
            <div>
              <span className="text-white/40 block">Structural Concrete</span>
              <span className="text-white font-semibold text-sm">{project.concreteGrade}</span>
            </div>
            <div>
              <span className="text-white/40 block">Construction Window</span>
              <span className="text-white font-semibold text-sm">{project.completionTimeline}</span>
            </div>
            <div>
              <span className="text-white/40 block">Client Entity</span>
              <span className="text-white font-semibold text-sm">{project.client}</span>
            </div>
          </div>

          {/* Engineering Highlights */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white/50">
              Structural Invariants & Innovations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-white block">{m.value}</span>
                    <span className="text-xs text-white/60">{m.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="text-xs text-white/60">
              Need a similar engineering blueprint for your site in Nairobi?
            </div>
            <button
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
              className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Structural Feasibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
