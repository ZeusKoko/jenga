import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, CheckCircle, ArrowRight, Upload, Phone, Mail, User, ShieldCheck } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEstimateSummary?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialEstimateSummary = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    plotLocation: '',
    budgetRange: 'KES 35M - 60M',
    drawingsStatus: 'Have Architectural Drawings (Need BQ / Contractor)',
    meetingType: 'On-Site Plot Survey (Nairobi Metro)',
    preferredDate: '',
    notes: '',
  });

  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (initialEstimateSummary) {
      setFormData((prev) => ({
        ...prev,
        notes: `Estimated Spec via Calculator:\n${initialEstimateSummary}`,
      }));
    }
  }, [initialEstimateSummary]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketId(`JNG-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070A0F]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Window */}
      <div className="relative bg-[#111722] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl z-10 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-[#E5A93C] uppercase tracking-wider mb-1">
              Direct Engineering Consultation
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Schedule Feasibility & Site Survey
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C] text-[#E5A93C] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  Consultation Confirmed
                </h3>
                <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Our senior quantity surveying and structural team in Westlands has received your dossier.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0F15] border border-white/5 max-w-sm mx-auto font-mono text-xs text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-white/40">Reference File:</span>
                  <span className="text-[#E5A93C] font-semibold">{ticketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Assigned Lead:</span>
                  <span className="text-white">Eng. David Kariuki, PE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Format:</span>
                  <span className="text-white">{formData.meetingType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Direct Line:</span>
                  <span className="text-white">+254 20 790 3400</span>
                </div>
              </div>

              <p className="text-xs text-white/50">
                A calendar invitation and pre-survey geotechnical checklist have been dispatched to <strong>{formData.email}</strong>.
              </p>

              <button
                onClick={onClose}
                className="px-6 py-3 text-xs font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] rounded-xl transition-all cursor-pointer"
              >
                Close & Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Contact info row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Peter Kokonya"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#0B0F15] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+254 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0B0F15] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Corporate / Personal Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="peter@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0B0F15] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Plot / Site Location in Kenya
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Karen, Mbagathi Ridge"
                      value={formData.plotLocation}
                      onChange={(e) => setFormData({ ...formData, plotLocation: e.target.value })}
                      className="w-full bg-[#0B0F15] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Meeting format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Target Construction Budget
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#0B0F15] border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                  >
                    <option value="KES 20M - 35M">KES 20M - 35M (~$150k - $270k)</option>
                    <option value="KES 35M - 60M">KES 35M - 60M (~$270k - $460k)</option>
                    <option value="KES 60M - 120M">KES 60M - 120M (~$460k - $920k)</option>
                    <option value="KES 120M+">KES 120M+ (Commercial / Mega-Villa)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Consultation Format
                  </label>
                  <select
                    value={formData.meetingType}
                    onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
                    className="w-full bg-[#0B0F15] border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                  >
                    <option value="On-Site Plot Survey (Nairobi Metro)">On-Site Plot Survey (Nairobi)</option>
                    <option value="HQ Meeting at Westlands (The Mirage)">In-Person at Westlands HQ</option>
                    <option value="Video Conference (Diaspora Investor)">Video Call (Diaspora Clients)</option>
                  </select>
                </div>
              </div>

              {/* Drawings Status */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                  Architectural & Engineering Drawings Status
                </label>
                <select
                  value={formData.drawingsStatus}
                  onChange={(e) => setFormData({ ...formData, drawingsStatus: e.target.value })}
                  className="w-full bg-[#0B0F15] border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#E5A93C]"
                >
                  <option value="Have Architectural Drawings (Need BQ / Contractor)">Have Approved Architectural Drawings (Need BQ & Contractor)</option>
                  <option value="Concept Stage (Need Turnkey Design + Build)">Concept Stage (Need Full Design + Engineering + Build)</option>
                  <option value="Vacant Plot (Need Feasibility & Soil Test)">Vacant Plot (Need Topography, Soil Test & Masterplan)</option>
                </select>
              </div>

              {/* File Attachment (Optional DWG / PDF) */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                  Attach Architectural Drawings or Plot Deed (Optional PDF/DWG)
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Upload className="w-4 h-4 text-[#E5A93C]" />
                    <span>{attachedFile ? attachedFile : 'Click to select architectural CAD or PDF'}</span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.dwg,.dxf,.png,.jpg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="text-[11px] font-mono text-white/40">Max 25MB</span>
                </label>
              </div>

              {/* Project Brief / Notes */}
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                  Project Notes & Specific Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Detail number of bedrooms, levels, cantilever desires, or specific site constraints..."
                  className="w-full bg-[#0B0F15] border border-white/10 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#E5A93C] font-mono text-xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering with Quantity Surveyors...</span>
                  ) : (
                    <>
                      <span>Dispatch Site Survey Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 font-mono text-center mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Confidentiality Guaranteed · Non-Disclosure Agreement (NDA) Protected</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
