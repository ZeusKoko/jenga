import React from 'react';
import { Eye, Layers, Compass, RotateCcw, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

interface ViewerDockProps {
  renderMode: 'solid' | 'wireframe' | 'blueprint';
  onRenderModeChange: (mode: 'solid' | 'wireframe' | 'blueprint') => void;
  explodeFactor: number;
  onExplodeChange: (factor: number) => void;
  cameraPreset: 'perspective' | 'plan' | 'cantilever' | 'ground';
  onCameraPresetChange: (preset: 'perspective' | 'plan' | 'cantilever' | 'ground') => void;
  autoRotate: boolean;
  onAutoRotateToggle: () => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

export const ViewerDock: React.FC<ViewerDockProps> = ({
  renderMode,
  onRenderModeChange,
  explodeFactor,
  onExplodeChange,
  cameraPreset,
  onCameraPresetChange,
  autoRotate,
  onAutoRotateToggle,
  isFullscreen,
  onFullscreenToggle,
  isCollapsed,
  onCollapseToggle,
}) => {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[94%] max-w-[860px] z-30 transition-all duration-300 pointer-events-auto">
      {/* Collapsible drawer handle */}
      <div className="flex justify-center mb-1">
        <button
          onClick={onCollapseToggle}
          aria-label={isCollapsed ? 'Expand 3D Controls' : 'Collapse 3D Controls'}
          className="bg-[#141B26] hover:bg-[#1C2534] border border-white/10 text-white/70 hover:text-white px-3 py-1 rounded-t-lg text-xs font-mono flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Show Structural Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Hide Controls (Zen View)</span>
            </>
          )}
        </button>
      </div>

      {/* Main control dock */}
      {!isCollapsed && (
        <div className="bg-[#101622]/95 border border-white/10 rounded-2xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
            
            {/* 1. Exploded view slider */}
            <div className="md:col-span-4 flex flex-col gap-1.5 bg-[#0B0F15]/60 p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-white/60 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Exploded Assemblies</span>
                </span>
                <span className="font-mono text-[#E5A93C] font-semibold tabular-nums">
                  {Math.round(explodeFactor * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(explodeFactor * 100)}
                onChange={(e) => onExplodeChange(Number(e.target.value) / 100)}
                className="w-full h-1.5 bg-[#1F2937] rounded-lg appearance-none cursor-pointer accent-[#E5A93C]"
              />
            </div>

            {/* 2. Render Mode Segmented Control */}
            <div className="md:col-span-4 flex items-center gap-1 bg-[#0B0F15]/60 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => onRenderModeChange('solid')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  renderMode === 'solid'
                    ? 'bg-[#E5A93C] text-[#0B0F15] font-semibold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Poured Concrete
              </button>
              <button
                onClick={() => onRenderModeChange('wireframe')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  renderMode === 'wireframe'
                    ? 'bg-[#E5A93C] text-[#0B0F15] font-semibold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Rebar Steel
              </button>
              <button
                onClick={() => onRenderModeChange('blueprint')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  renderMode === 'blueprint'
                    ? 'bg-[#0EA5E9] text-white font-semibold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                CAD Blueprint
              </button>
            </div>

            {/* 3. Camera Presets & Utilities */}
            <div className="md:col-span-4 flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1 bg-[#0B0F15]/60 p-1 rounded-xl border border-white/5 flex-1">
                {(['perspective', 'plan', 'cantilever'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => onCameraPresetChange(preset)}
                    className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-mono capitalize transition-all ${
                      cameraPreset === preset
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {preset === 'perspective' ? '3D' : preset === 'plan' ? 'Top' : 'Zoom'}
                  </button>
                ))}
              </div>

              {/* Auto rotate toggle */}
              <button
                onClick={onAutoRotateToggle}
                title={autoRotate ? 'Pause Rotation' : 'Auto Orbit Model'}
                className={`p-2 rounded-xl border border-white/5 transition-all ${
                  autoRotate ? 'bg-[#E5A93C]/20 text-[#E5A93C]' : 'bg-[#0B0F15]/60 text-white/50 hover:text-white'
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              </button>

              {/* Fullscreen toggle */}
              <button
                onClick={onFullscreenToggle}
                title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                className="p-2 rounded-xl border border-white/5 bg-[#0B0F15]/60 text-white/50 hover:text-white transition-all"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
