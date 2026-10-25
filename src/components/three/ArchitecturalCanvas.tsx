import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createArchitecturalModel, ArchitecturalModelRig } from './ArchitecturalModel';
import { ViewerDock } from './ViewerDock';

// Pre-allocated math variables for zero garbage collection
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 3, 0);

export const ArchitecturalCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<ArchitecturalModelRig | null>(null);

  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'blueprint'>('solid');
  const [explodeFactor, setExplodeFactor] = useState<number>(0);
  const [cameraPreset, setCameraPreset] = useState<'perspective' | 'plan' | 'cantilever' | 'ground'>('perspective');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Mouse drag tracking for manual Orbiting
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ radius: 18, theta: 0.8, phi: 1.1 });

  // Update camera preset coordinates
  useEffect(() => {
    if (cameraPreset === 'perspective') {
      sphericalRef.current.radius = 18;
      sphericalRef.current.phi = 1.1;
      _targetLookAt.set(0, 3, 0);
    } else if (cameraPreset === 'plan') {
      sphericalRef.current.radius = 22;
      sphericalRef.current.phi = 0.15; // Top-down
      _targetLookAt.set(0, 2, 0);
    } else if (cameraPreset === 'cantilever') {
      sphericalRef.current.radius = 12;
      sphericalRef.current.phi = 1.3;
      _targetLookAt.set(2, 4.5, 1);
    } else if (cameraPreset === 'ground') {
      sphericalRef.current.radius = 16;
      sphericalRef.current.phi = 1.5;
      _targetLookAt.set(0, 1.5, 0);
    }
  }, [cameraPreset]);

  // Handle Explode Change
  const handleExplodeChange = useCallback((factor: number) => {
    setExplodeFactor(factor);
    if (rigRef.current) {
      rigRef.current.updateExplode(factor);
    }
  }, []);

  // Handle Render Mode Change
  const handleRenderModeChange = useCallback((mode: 'solid' | 'wireframe' | 'blueprint') => {
    setRenderMode(mode);
    if (rigRef.current) {
      rigRef.current.setRenderMode(mode);
    }
  }, []);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Detect software WebGL per Three.js guidelines
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B0F15);
    scene.fog = new THREE.FogExp2(0x0B0F15, 0.025);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(14, 10, 14);

    // 3. Renderer with SRGB & ACESFilmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Room Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig
    const warmKeyLight = new THREE.DirectionalLight(0xFFF2DC, 2.2);
    warmKeyLight.position.set(12, 18, 10);
    warmKeyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      warmKeyLight.shadow.mapSize.width = 1024;
      warmKeyLight.shadow.mapSize.height = 1024;
      warmKeyLight.shadow.bias = -0.0005;
      warmKeyLight.shadow.normalBias = 0.02;
      warmKeyLight.shadow.camera.near = 1;
      warmKeyLight.shadow.camera.far = 40;
      warmKeyLight.shadow.camera.left = -12;
      warmKeyLight.shadow.camera.right = 12;
      warmKeyLight.shadow.camera.top = 12;
      warmKeyLight.shadow.camera.bottom = -12;
    }
    scene.add(warmKeyLight);

    const coolSkyFill = new THREE.HemisphereLight(0x7692A8, 0x1E242E, 1.1);
    scene.add(coolSkyFill);

    const accentRim = new THREE.DirectionalLight(0xE5A93C, 1.4);
    accentRim.position.set(-14, 8, -12);
    scene.add(accentRim);

    // 6. Architectural Model Rig
    const rig = createArchitecturalModel();
    rigRef.current = rig;
    scene.add(rig.root);

    // 7. Event listeners for Orbit Interaction
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      sphericalRef.current.theta -= dx * 0.006;
      sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, sphericalRef.current.phi - dy * 0.006));
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      sphericalRef.current.radius = Math.max(8, Math.min(32, sphericalRef.current.radius + e.deltaY * 0.015));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Animation & Render Loop
    let animationFrameId = 0;
    let clock = new THREE.Clock();

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Auto rotation
      if (autoRotate && !isDraggingRef.current) {
        sphericalRef.current.theta += delta * 0.15;
      }

      // Convert spherical to Cartesian target
      const s = sphericalRef.current;
      _targetCamPos.x = s.radius * Math.sin(s.phi) * Math.sin(s.theta);
      _targetCamPos.y = s.radius * Math.cos(s.phi);
      _targetCamPos.z = s.radius * Math.sin(s.phi) * Math.cos(s.theta);

      // Silky smooth exponential damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 5, delta);

      _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _targetLookAt.x, 5, delta);
      _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _targetLookAt.y, 5, delta);
      _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _targetLookAt.z, 5, delta);

      camera.lookAt(_currentLookAt);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);

      rig.dispose();
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [autoRotate]);

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-500 ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen bg-[#0B0F15]'
          : 'h-[580px] lg:h-[680px] rounded-2xl border border-white/10 shadow-2xl bg-[#0B0F15]'
      }`}
    >
      {/* 3D WebGL mount container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle top watermark spec badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-0.5">
        <span className="text-[11px] font-mono tracking-wider text-[#E5A93C] uppercase">
          Interactive BIM Pavilion
        </span>
        <span className="text-sm font-semibold text-white/90">
          Cantilever Structural Study · Karen Model 04
        </span>
      </div>

      {/* Orbit Hint badge */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/60">
        <span>Drag to rotate · Scroll to zoom</span>
      </div>

      {/* Sleek bottom control dock */}
      <ViewerDock
        renderMode={renderMode}
        onRenderModeChange={handleRenderModeChange}
        explodeFactor={explodeFactor}
        onExplodeChange={handleExplodeChange}
        cameraPreset={cameraPreset}
        onCameraPresetChange={setCameraPreset}
        autoRotate={autoRotate}
        onAutoRotateToggle={() => setAutoRotate(!autoRotate)}
        isFullscreen={isFullscreen}
        onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
        isCollapsed={isCollapsed}
        onCollapseToggle={() => setIsCollapsed(!isCollapsed)}
      />
    </div>
  );
};
