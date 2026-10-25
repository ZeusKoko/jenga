import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Building,
  HardHat,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Activity,
  Layers,
  Clock,
  Compass,
  CheckCircle2,
  X,
  Truck,
  Flame,
  Grid,
  ChevronRight
} from 'lucide-react';
import { Currency } from '../types';
import heroSunsetImg from '../assets/images/hero_jenga_architecture_1792929285580.jpg';

interface HeroProps {
  currency: Currency;
  onOpenConsultation: () => void;
}

type SceneMode = 'video' | 'sunset' | 'blueprint';

export const Hero: React.FC<HeroProps> = ({ currency, onOpenConsultation }) => {
  // Video & Scene states
  const [activeScene, setActiveScene] = useState<SceneMode>('video');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [servicesDrawerOpen, setServicesDrawerOpen] = useState(false);

  // Live telemetry clock
  const [currentTime, setCurrentTime] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Update real-time clock for Nairobi HQ telemetry
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Africa/Nairobi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ensure video element autoplays properly with DOM muted property
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = isMuted;

    if (activeScene === 'video' && isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay waiting for user interaction:', err);
        });
      }
    }
  }, [activeScene, isPlaying, isMuted]);

  // Video playback management
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const servicesList = [
    {
      title: 'Heavy Construction',
      tag: 'Commercial & High-Rise',
      desc: 'Deep core foundation engineering, multi-story structural frameworks, and specialized high-density architectural developments.',
      icon: Building,
    },
    {
      title: 'Infrastructure & Civil',
      tag: 'Bridges, Roads & Pylons',
      desc: 'National grade highways, pre-stressed concrete spans, subterranean culverts, and heavy transport corridors.',
      icon: Truck,
    },
    {
      title: 'Earthwork & Deep Piling',
      tag: 'Excavation & Geotechnical',
      desc: 'Site preparation, mass rock blasting, micro-piling, bored caissons, and geotechnical soil stabilization.',
      icon: HardHat,
    },
    {
      title: 'Reinforced Concrete',
      tag: 'C35/C45 Precision Mix',
      desc: 'High-strength seismic casting, post-tensioned slabs, retaining structures, and architectural fair-face concrete.',
      icon: Layers,
    },
    {
      title: 'Structural Steel Erection',
      tag: 'Heavy Truss & Fabrication',
      desc: 'Precision welded trusses, high-bay industrial spans, composite steel-concrete decks, and seismic bracing.',
      icon: Flame,
    },
    {
      title: 'Turnkey BIM Management',
      tag: 'BORAQS / NCA 1 Oversight',
      desc: 'Full 4D CAD/BIM schedule coordination, cost-variance mitigation, and institutional handover guarantees.',
      icon: Compass,
    },
  ];

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 overflow-hidden bg-[#0B0F15]">
      
      {/* =========================================================================
          BACKGROUND LAYER (z-0 to ensure it is always visible behind content)
         ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        
        {/* 1. Looping Construction Video */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            activeScene === 'video' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Always have sunset poster behind video so screen is NEVER black during buffer */}
          <img
            src={heroSunsetImg}
            alt="Construction backdrop fallback"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.65]"
          />
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={heroSunsetImg}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => {
              console.warn('Video failed to load, falling back to static poster');
              setVideoError(true);
            }}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
          >
            <source src="/videos/construction.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 2. Sunset Megastructure Rig (Original Jenga Golden-Hour Architectural Visual) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            activeScene === 'sunset' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={heroSunsetImg}
            alt="Heavy brutalist architectural structure at golden hour in Nairobi by JENGA"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[10000ms] ease-out filter brightness-[0.75] contrast-[1.1]"
          />
        </div>

        {/* 3. Interactive BIM / CAD Blueprint Schematic View */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-[#080d16] ${
            activeScene === 'blueprint' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Architectural Technical Coordinate Grid */}
          <div className="w-full h-full architectural-grid opacity-60" />

          {/* SVG CAD Blueprint Elevation Wireframe */}
          <svg
            className="absolute inset-0 w-full h-full opacity-40 text-[#E5A93C]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="cadSubGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="rgba(229, 169, 60, 0.4)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cadSubGrid)" />

            {/* Architectural structural framing vectors */}
            <g stroke="#38BDF8" strokeWidth="1.2" opacity="0.4" fill="none">
              <line x1="180" y1="120" x2="180" y2="820" strokeDasharray="6,4" />
              <line x1="420" y1="120" x2="420" y2="820" strokeDasharray="6,4" />
              <line x1="720" y1="120" x2="720" y2="820" strokeDasharray="6,4" />
              <line x1="1020" y1="120" x2="1020" y2="820" strokeDasharray="6,4" />
              <line x1="1260" y1="120" x2="1260" y2="820" strokeDasharray="6,4" />

              {/* Horizontal datum levels */}
              <line x1="100" y1="260" x2="1340" y2="260" strokeDasharray="3,3" />
              <line x1="100" y1="460" x2="1340" y2="460" strokeDasharray="3,3" />
              <line x1="100" y1="680" x2="1340" y2="680" strokeDasharray="3,3" />
            </g>

            {/* Diagonal cantilever truss lines */}
            <g stroke="#E5A93C" strokeWidth="1.5" opacity="0.4" fill="none">
              <path d="M 650 720 L 850 420 L 1050 720 Z" />
              <path d="M 850 420 L 1050 180 L 1250 420 Z" />
              <line x1="850" y1="420" x2="850" y2="180" strokeDasharray="4,4" />
              <line x1="1050" y1="720" x2="1050" y2="420" strokeDasharray="4,4" />
            </g>

            {/* Coordinate annotations */}
            <text x="185" y="145" fill="#E5A93C" fontSize="11" fontFamily="monospace" opacity="0.8">GRID AXIS A-01 [N 1°17'11"]</text>
            <text x="725" y="145" fill="#38BDF8" fontSize="11" fontFamily="monospace" opacity="0.8">LOAD BEARING CORE C-03</text>
            <text x="1025" y="145" fill="#E5A93C" fontSize="11" fontFamily="monospace" opacity="0.8">SHEAR WALL D-08 [+64.20m]</text>
            <text x="120" y="255" fill="#E5A93C" fontSize="10" fontFamily="monospace" opacity="0.7">LEVEL 14: +48,600 mm</text>
            <text x="120" y="455" fill="#E5A93C" fontSize="10" fontFamily="monospace" opacity="0.7">LEVEL 08: +27,400 mm</text>
            <text x="120" y="675" fill="#E5A93C" fontSize="10" fontFamily="monospace" opacity="0.7">PODIUM SLAB: +0.00 mm</text>
          </svg>
        </div>

        {/* Balanced Architectural Scrims: Dark enough for sharp text readability, clear enough to see the video/scenes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F15]/95 via-[#0B0F15]/75 to-[#0B0F15]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15] via-transparent to-[#0B0F15]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,169,60,0.14),transparent_55%)]" />

        {/* Top subtle yellow architectural rule */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5A93C]/60 to-transparent" />
      </div>

      {/* =========================================================================
          FOREGROUND CONTENT (relative z-10 for full user interactivity)
         ========================================================================= */}
      
      {/* 1. TOP INDUSTRIAL HUD TELEMETRY BAR */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full mb-4 sm:mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white/70 py-2 border-b border-white/10"
        >
          {/* Live camera & site status */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-ping" />
              <span>LIVE SITE CAM</span>
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-white/80">
              NAIROBI SITE 04 · WESTLANDS SECTOR
            </span>
            <span className="hidden lg:inline text-white/40">|</span>
            <span className="hidden lg:inline text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> ZERO INCIDENTS REPORTED
            </span>
          </div>

          {/* Time & Audio controls */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <span className="text-[#E5A93C] font-bold flex items-center gap-1.5 tabular-nums">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentTime || '20:20:00 EAT'}</span>
            </span>

            {/* Video Audio Mute/Unmute */}
            {activeScene === 'video' && (
              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="p-1.5 rounded border border-white/10 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#E5A93C]" />
                )}
              </button>
            )}

            {/* Video Play/Pause */}
            {activeScene === 'video' && (
              <button
                onClick={togglePlay}
                title={isPlaying ? 'Pause Video' : 'Play Video'}
                className="p-1.5 rounded border border-white/10 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-[#E5A93C]" />
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* 2. MAIN HERO HEADLINE & ACTIONS (Clean Industrial Aesthetic in Original Yellow) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl lg:max-w-4xl">
          
          {/* Subheader Kicker with Yellow Accent Marker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-10 sm:w-14 h-[3px] bg-[#E5A93C] block rounded-full" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase text-[#E5A93C]">
              HEAVY CONSTRUCTION. SOLID FUTURES.
            </span>
          </motion.div>

          {/* Monumental Condensed Headline with Bright Yellow Highlight */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-industrial font-extrabold uppercase leading-[0.92] tracking-wide text-white mb-6 select-none"
          >
            <span className="block text-white drop-shadow-md">WE BUILD</span>
            <span className="block text-[#FBBF24] glow-text-yellow font-extrabold">
              WHAT MATTERS
            </span>
          </motion.h1>

          {/* Subtitle Body Prose */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/85 font-normal leading-relaxed mb-8 max-w-2xl"
          >
            JENGA delivers end-to-end heavy civil engineering, luxury high-rises, and critical infrastructure across East Africa with unmatched structural strength, millimeter precision, and lifelong commitment.
          </motion.p>

          {/* Action CTAs in Signature Yellow & Blue Palette */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            {/* Primary Action Button: OUR SERVICES in Signature Yellow */}
            <button
              onClick={() => setServicesDrawerOpen(true)}
              className="group px-7 py-4 text-sm sm:text-base font-bold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] rounded-xl transition-all duration-200 shadow-xl hover:shadow-[#E5A93C]/25 hover:shadow-2xl active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <span className="tracking-wide uppercase font-condensed text-base sm:text-lg font-bold">
                OUR SERVICES
              </span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Secondary Action Button: VIEW PROJECTS (Translucent navy button) */}
            <a
              href="#portfolio"
              className="group px-7 py-4 text-sm sm:text-base font-bold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#E5A93C]/70 rounded-xl transition-all duration-200 backdrop-blur-sm active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <span className="tracking-wide uppercase font-condensed text-base sm:text-lg font-bold">
                VIEW PROJECTS
              </span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 text-white/60 group-hover:text-[#E5A93C]" />
            </a>

            {/* Quick Consultation Link */}
            <button
              onClick={onOpenConsultation}
              className="text-xs sm:text-sm font-mono tracking-wider text-white/70 hover:text-[#E5A93C] underline underline-offset-4 transition-colors cursor-pointer px-2 py-1"
            >
              Schedule Site Survey & Feasibility →
            </button>
          </motion.div>

        </div>
      </div>

      {/* 3. BACKGROUND SCENE SWITCHER / CAROUSEL PILLS (Original Yellow Accents) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full my-4 flex items-center justify-between">
        
        {/* Scene Switcher Pills */}
        <div className="flex items-center gap-2 bg-[#111722]/85 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveScene('video')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScene === 'video'
                ? 'bg-[#E5A93C] text-[#0B0F15] font-bold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Active Worker Cam</span>
          </button>

          <button
            onClick={() => setActiveScene('sunset')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScene === 'sunset'
                ? 'bg-[#E5A93C] text-[#0B0F15] font-bold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Building className="w-3 h-3" />
            <span>Sunset Rig</span>
          </button>

          <button
            onClick={() => setActiveScene('blueprint')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScene === 'blueprint'
                ? 'bg-[#E5A93C] text-[#0B0F15] font-bold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Grid className="w-3 h-3" />
            <span>BIM CAD Grid</span>
          </button>
        </div>

        {/* Reference dot indicator */}
        <div className="hidden sm:flex items-center gap-2">
          <div
            onClick={() => setActiveScene('video')}
            className={`cursor-pointer transition-all ${
              activeScene === 'video'
                ? 'w-8 h-2 bg-[#E5A93C] rounded-full'
                : 'w-2.5 h-2 bg-white/30 hover:bg-white/60 rounded-full'
            }`}
          />
          <div
            onClick={() => setActiveScene('sunset')}
            className={`cursor-pointer transition-all ${
              activeScene === 'sunset'
                ? 'w-8 h-2 bg-[#E5A93C] rounded-full'
                : 'w-2.5 h-2 bg-white/30 hover:bg-white/60 rounded-full'
            }`}
          />
          <div
            onClick={() => setActiveScene('blueprint')}
            className={`cursor-pointer transition-all ${
              activeScene === 'blueprint'
                ? 'w-8 h-2 bg-[#E5A93C] rounded-full'
                : 'w-2.5 h-2 bg-white/30 hover:bg-white/60 rounded-full'
            }`}
          />
        </div>

      </div>

      {/* 4. HIGH-IMPACT 4-COLUMN STATS RIBBON (Original Architectural Navy & Yellow) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full mt-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-[#111722]/90 border border-white/10 backdrop-blur-xl shadow-2xl p-5 sm:p-6"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            {/* Stat 1: Years of Experience */}
            <div className="flex items-center gap-4 py-3 sm:py-1 sm:px-4">
              <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center shrink-0 text-[#E5A93C]">
                <HardHat className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-industrial font-extrabold text-white tracking-wide">
                  25+
                </span>
                <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white/70">
                  Years of Experience
                </span>
              </div>
            </div>

            {/* Stat 2: Projects Completed */}
            <div className="flex items-center gap-4 py-3 sm:py-1 sm:px-4">
              <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center shrink-0 text-[#E5A93C]">
                <Building className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-industrial font-extrabold text-white tracking-wide">
                  650+
                </span>
                <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white/70">
                  Projects Completed
                </span>
              </div>
            </div>

            {/* Stat 3: Skilled Professionals */}
            <div className="flex items-center gap-4 py-3 sm:py-1 sm:px-4">
              <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center shrink-0 text-[#E5A93C]">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-industrial font-extrabold text-[#FBBF24] tracking-wide">
                  1,200+
                </span>
                <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white/70">
                  Skilled Professionals
                </span>
              </div>
            </div>

            {/* Stat 4: Safety Commitment */}
            <div className="flex items-center gap-4 py-3 sm:py-1 sm:px-4">
              <div className="w-12 h-12 rounded-xl bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center shrink-0 text-[#E5A93C]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-industrial font-extrabold text-white tracking-wide">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white/70">
                  Safety Commitment
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* 5. INTERACTIVE SERVICES DRAWER / MODAL (Signature Navy & Yellow Theme) */}
      <AnimatePresence>
        {servicesDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111722] border border-white/15 p-6 sm:p-8 shadow-2xl text-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C] uppercase tracking-wider mb-1">
                    <span>JENGA Specialized Engineering</span>
                    <span>·</span>
                    <span>NCA 1 Certified</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-industrial uppercase tracking-wide text-white">
                    Heavy Construction & Engineering Capabilities
                  </h3>
                </div>
                <button
                  onClick={() => setServicesDrawerOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 6 Core Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {servicesList.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0B0F15] border border-white/10 hover:border-[#E5A93C]/50 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono text-[#E5A93C] block mb-1">
                          {service.tag}
                        </span>
                        <h4 className="text-lg font-bold text-white mb-2">
                          {service.title}
                        </h4>
                        <p className="text-xs text-white/70 leading-relaxed mb-3">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer action */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-white/60 font-mono">
                  All projects backed by institutional performance bonds and guarantees.
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setServicesDrawerOpen(false);
                      onOpenConsultation();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#F2B952] text-sm font-bold text-[#0B0F15] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Technical Survey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
