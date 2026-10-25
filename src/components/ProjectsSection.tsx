import React, { useState, useEffect } from 'react';
import { ProjectItem, Currency } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Pause, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  currency: Currency;
  onBookConsultation: () => void;
}

const VILLA_SLIDES = [
  {
    id: 'exterior-pool',
    room: '01 / 05',
    title: 'Cantilever Facade & Reflection Pool',
    category: 'Exterior Architecture',
    caption: '6.2m post-tensioned cantilever slab floating above basalt terrace and infinity lap pool.',
    image: '/src/assets/images/project_karen_villa_1792929285613.jpg',
  },
  {
    id: 'living-pavilion',
    room: '02 / 05',
    title: 'Living Pavilion & Forest Panorama',
    category: 'Interior Great Room',
    caption: 'Floor-to-ceiling frameless glass sliders opening directly into ancient Karen Acacia groves.',
    image: '/src/assets/images/karen_villa_living_pavilion_1792930361343.jpg',
  },
  {
    id: 'master-suite',
    room: '03 / 05',
    title: 'Cantilevered Master Suite',
    category: 'Private Residence Wing',
    caption: 'Panoramic glass corner terrace suspended over the canopy with acoustic decoupled slab.',
    image: '/src/assets/images/karen_villa_master_suite_1792930363120.jpg',
  },
  {
    id: 'designer-kitchen',
    room: '04 / 05',
    title: 'Gourmet Basalt Waterfall Kitchen',
    category: 'Culinary Architecture',
    caption: 'Monolithic honed black basalt island paired with fluted natural oak and courtyard glazing.',
    image: '/src/assets/images/karen_villa_designer_kitchen_1792930363168.jpg',
  },
  {
    id: 'sunken-lounge',
    room: '05 / 05',
    title: 'Sunken Fire Pit & Twilight Deck',
    category: 'Outdoor Entertaining',
    caption: 'Sub-level fire lounge with teak banquettes sheltered under the raw board-formed cantilever.',
    image: '/src/assets/images/karen_villa_sunken_lounge_1792930363693.jpg',
  },
];

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'karen-ridge-villa',
    title: 'The Karen Ridge Villa',
    location: 'Karen, Nairobi',
    category: 'residential',
    area: '920 m²',
    year: '2026',
    client: 'Private Family Office',
    description: 'An architectural tour de force set on two acres in Karen. Features a signature 6.2-meter post-tensioned concrete cantilever, frameless thermal curtain walls, integrated rainwater harvesting, and locally quarried basalt accents.',
    image: '/src/assets/images/project_karen_villa_1792929285613.jpg',
    ncaRating: 'NCA 1 Certified',
    structuralHighlight: '6.2m Cantilevered Post-Tensioned Slab with zero deflection under dynamic load.',
    concreteGrade: 'C35/45 Self-Compacting',
    completionTimeline: '14 Months Handover',
    metrics: [
      { label: 'Cantilever Reach', value: '6.2 Meters Clear Span' },
      { label: 'High-Yield Steel', value: '42 Metric Tonnes BS 4449' },
      { label: 'Solar Independence', value: '18.4 kWp Hybrid Storage' },
      { label: 'Thermal Glazing', value: 'Double Insulated Low-E' },
    ],
  },
  {
    id: 'westlands-tower',
    title: 'Apex Financial Center',
    location: 'Westlands, Nairobi',
    category: 'commercial',
    area: '18,500 m²',
    year: '2025',
    client: 'Pan-African Investment Trust',
    description: 'A 24-storey landmark corporate tower in the heart of Westlands. Built with a continuous slip-form shear wall core, high-efficiency aerodynamic brise-soleil, and seismic Grade IV Rift Valley stabilization.',
    image: '/src/assets/images/project_westlands_tower_1792929285561.jpg',
    ncaRating: 'NCA 1 Mega Project',
    structuralHighlight: 'Slip-form core erected at 1.8 vertical meters every 24 hours.',
    concreteGrade: 'C40/50 High-Strength Micro-Silica',
    completionTimeline: '22 Months Handover',
    metrics: [
      { label: 'Vertical Height', value: '94 Meters (24 Storeys)' },
      { label: 'Foundation Piling', value: '148 Friction Piles to Basalt Bedrock' },
      { label: 'EDGE Certification', value: 'Level 2 Advanced Green Standard' },
      { label: 'High-Speed Lifts', value: '6 Destination-Dispatch Units' },
    ],
  },
  {
    id: 'kilimani-terraces',
    title: 'The Terraces at Kilimani',
    location: 'Kilimani, Nairobi',
    category: 'residential',
    area: '12,400 m²',
    year: '2025',
    client: 'Urban Living Development Ltd',
    description: 'A 56-unit biophilic residential condominium featuring stepped landscaped terraces, handcrafted local terracotta shading louvers, and subterranean double-stack automated parking.',
    image: '/src/assets/images/project_kilimani_residence_1792929390371.jpg',
    ncaRating: 'NCA 1 Certified',
    structuralHighlight: 'Acoustic floating slab design reducing inter-floor reverberation to <38dB.',
    concreteGrade: 'C30/37 Volcanic Pozzolana Blend',
    completionTimeline: '18 Months Handover',
    metrics: [
      { label: 'Residential Units', value: '56 Luxury Apartments' },
      { label: 'Acoustic Isolation', value: 'Floating Elastomeric Slabs' },
      { label: 'Water Autonomy', value: '120,000L Underground Cistern' },
      { label: 'Facade Louvers', value: 'Machakos Terracotta Extrusions' },
    ],
  },
  {
    id: 'tatu-logistics',
    title: 'Nairobi Eco-Industrial Terminal',
    location: 'Tatu City, Kiambu/Nairobi',
    category: 'industrial',
    area: '24,000 m²',
    year: '2024',
    client: 'East Africa Freight Consortium',
    description: 'High-tolerance industrial logistics hub featuring 32-meter clear span steel portals, laser-screeded jointless FM2 superflat industrial flooring, and heavy vehicle turning aprons.',
    image: '/src/assets/images/hero_jenga_architecture_1792929285580.jpg',
    ncaRating: 'NCA 1 Certified',
    structuralHighlight: 'Superflat industrial floor slab with zero micro-cracking over 24,000 m².',
    concreteGrade: 'C35 Steel Fiber Reinforced',
    completionTimeline: '12 Months Handover',
    metrics: [
      { label: 'Clear Span Grid', value: '32 Meters Pillarless' },
      { label: 'Floor Tolerance', value: 'DIN 18202 Class 4 FM2' },
      { label: 'Rooftop Solar Array', value: '1.2 Megawatt Peak' },
      { label: 'Loading Bays', value: '18 Automated Hydraulic Docks' },
    ],
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  currency,
  onBookConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto advance slides every 5 seconds unless hovered/paused
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % VILLA_SLIDES.length);
    }, 4800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + VILLA_SLIDES.length) % VILLA_SLIDES.length);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % VILLA_SLIDES.length);
  };

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const featured = PROJECTS_DATA[0];

  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#E5A93C] uppercase mb-2">
            <span>Portfolio of Distinction</span>
            <span aria-hidden="true">·</span>
            <span>Commercial & Residential</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Engineering Precision Engineered for Kenya’s Topography.
          </h2>
        </div>

        {/* Category Filter Tabs (functional segmented controls per frontend constitution) */}
        <div className="flex items-center gap-1 p-1 bg-[#111722] border border-white/10 rounded-xl overflow-x-auto">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'residential', label: 'Residential' },
            { id: 'commercial', label: 'Commercial' },
            { id: 'industrial', label: 'Industrial' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#E5A93C] text-[#0B0F15] font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Project with Smooth Villa Room Slideshow */}
      <div className="mb-14 rounded-2xl border border-white/10 bg-[#111722] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* Smooth Villa Room Slideshow Container */}
          <div
            className="lg:col-span-7 relative min-h-[420px] sm:min-h-[480px] select-none overflow-hidden group bg-[#070A0F]"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Render slides with smooth opacity / scale transition */}
            {VILLA_SLIDES.map((slide, index) => {
              const isActive = index === activeSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Contrast gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F15] via-black/20 to-black/40" />
                </div>
              );
            })}

            {/* Top Room Badge & Auto-Play Status */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0B0F15]/85 backdrop-blur-md border border-white/10 text-xs font-mono text-[#E5A93C] flex items-center gap-1.5 shadow-lg">
                <span>Room {VILLA_SLIDES[activeSlide].room}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/80">{VILLA_SLIDES[activeSlide].category}</span>
              </span>
            </div>

            {/* Top Right Controls (Play/Pause & Arrow navigation) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
                className="p-2 rounded-full bg-[#0B0F15]/80 hover:bg-[#0B0F15] backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer shadow-md"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={prevSlide}
                aria-label="Previous room shot"
                className="p-2 rounded-full bg-[#0B0F15]/80 hover:bg-[#0B0F15] backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next room shot"
                className="p-2 rounded-full bg-[#0B0F15]/80 hover:bg-[#0B0F15] backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer shadow-md"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Room Caption & Progress Indicator */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2.5">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0B0F15]/90 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold font-display text-white">
                    {VILLA_SLIDES[activeSlide].title}
                  </h4>
                  <span className="text-[11px] font-mono text-[#E5A93C] tabular-nums">
                    {activeSlide + 1} / {VILLA_SLIDES.length}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                  {VILLA_SLIDES[activeSlide].caption}
                </p>
              </div>

              {/* Room Quick Nav Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {VILLA_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`py-1.5 px-2.5 rounded-lg text-[11px] font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                      activeSlide === idx
                        ? 'bg-[#E5A93C] text-[#0B0F15] border-[#E5A93C] font-bold shadow-md'
                        : 'bg-[#0B0F15]/80 text-white/60 hover:text-white hover:bg-[#0B0F15] border-white/10'
                    }`}
                  >
                    <span>0{idx + 1}</span>
                    <span className="hidden sm:inline">{slide.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Featured Project Information Panel */}
          <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C] uppercase tracking-wider mb-2">
                <span>Featured Masterwork</span>
                <span>·</span>
                <span>{featured.location}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                {featured.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {featured.description}
              </p>

              {/* Technical badges */}
              <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/40 block text-[10px] uppercase">Built Area</span>
                  <span className="text-white font-semibold text-sm">{featured.area}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/40 block text-[10px] uppercase">Concrete Spec</span>
                  <span className="text-white font-semibold text-sm">{featured.concreteGrade}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedProject(featured)}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-[#0B0F15] bg-[#E5A93C] hover:bg-[#F2B952] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inspect Structural Specs</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBookConsultation}
                className="py-3 px-4 rounded-xl text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                Book Survey
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Grid of Marquee Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.slice(1).map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group rounded-2xl border border-white/10 bg-[#111722] overflow-hidden hover:border-[#E5A93C]/50 transition-all duration-300 shadow-xl flex flex-col cursor-pointer"
          >
            {/* Project Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-3 left-3 bg-[#0B0F15]/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-[#E5A93C]">
                {project.location}
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-white group-hover:text-[#E5A93C] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">{project.area}</span>
                <span className="text-[#E5A93C] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Spec Modal */}
      <ProjectDetailModal
        project={selectedProject}
        currency={currency}
        onClose={() => setSelectedProject(null)}
        onBookConsultation={onBookConsultation}
      />

    </section>
  );
};
