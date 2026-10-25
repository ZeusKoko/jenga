import * as THREE from 'three';

export interface ArchitecturalModelRig {
  root: THREE.Group;
  foundationGroup: THREE.Group;
  groundFloorGroup: THREE.Group;
  cantileverGroup: THREE.Group;
  roofGroup: THREE.Group;
  updateExplode: (factor: number) => void;
  setRenderMode: (mode: 'solid' | 'wireframe' | 'blueprint') => void;
  dispose: () => void;
}

// Helper to create procedural subtle board-formed concrete texture
function createConcreteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm concrete grey base
  ctx.fillStyle = '#9E9A92';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle horizontal board grain
  for (let y = 0; y < 512; y += 64) {
    ctx.fillStyle = y % 128 === 0 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)';
    ctx.fillRect(0, y, 512, 2);
  }

  // Noise flecks
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const val = Math.random() * 20 - 10;
    ctx.fillStyle = val > 0 ? `rgba(255,255,255,${val / 200})` : `rgba(0,0,0,${-val / 200})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createArchitecturalModel(): ArchitecturalModelRig {
  const root = new THREE.Group();
  root.position.y = 0;

  const concreteTex = createConcreteTexture();

  // Base materials
  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0xB5B1A8,
    map: concreteTex,
    roughness: 0.85,
    metalness: 0.1,
  });

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x22262E,
    roughness: 0.35,
    metalness: 0.8,
  });

  const accentGoldMat = new THREE.MeshStandardMaterial({
    color: 0xD4A038,
    roughness: 0.25,
    metalness: 0.9,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x8AA8B8,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.7,
    ior: 1.5,
  });

  const woodLouversMat = new THREE.MeshStandardMaterial({
    color: 0x8D5B3A,
    roughness: 0.65,
    metalness: 0.05,
  });

  // Wireframe material for X-ray
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xE5A93C,
    wireframe: true,
  });

  // Blueprint material
  const blueprintMat = new THREE.MeshBasicMaterial({
    color: 0x0EA5E9,
    wireframe: true,
  });

  const allMeshes: { mesh: THREE.Mesh; originalMat: THREE.Material }[] = [];

  function registerMesh(mesh: THREE.Mesh, mat: THREE.Material) {
    mesh.material = mat;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    allMeshes.push({ mesh, originalMat: mat });
  }

  // --- 1. FOUNDATION GROUP (Base podium + rebar ground beams) ---
  const foundationGroup = new THREE.Group();

  // Main ground podium slab
  const podiumGeo = new THREE.BoxGeometry(10, 0.4, 7);
  const podiumMesh = new THREE.Mesh(podiumGeo, concreteMat);
  podiumMesh.position.y = 0.2;
  registerMesh(podiumMesh, concreteMat);
  foundationGroup.add(podiumMesh);

  // Pool / reflecting water plane cutout
  const waterGeo = new THREE.BoxGeometry(3.5, 0.05, 2.2);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1E465A,
    roughness: 0.1,
    metalness: 0.3,
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.position.set(-2.8, 0.42, 1.8);
  registerMesh(waterMesh, waterMat);
  foundationGroup.add(waterMesh);

  // Basalt stone garden steps
  for (let i = 0; i < 3; i++) {
    const stepGeo = new THREE.BoxGeometry(2, 0.12, 0.8);
    const stepMesh = new THREE.Mesh(stepGeo, concreteMat);
    stepMesh.position.set(2 + i * 0.2, 0.3 + i * 0.1, 3.2 + i * 0.5);
    registerMesh(stepMesh, concreteMat);
    foundationGroup.add(stepMesh);
  }

  // Column footings (4 structural pillars)
  const footingPositions = [
    [-3.8, -2],
    [3.8, -2],
    [-3.8, 1.5],
    [3.8, 1.5],
  ];
  footingPositions.forEach(([x, z]) => {
    const footingGeo = new THREE.BoxGeometry(0.8, 0.2, 0.8);
    const footingMesh = new THREE.Mesh(footingGeo, steelMat);
    footingMesh.position.set(x, 0.45, z);
    registerMesh(footingMesh, steelMat);
    foundationGroup.add(footingMesh);
  });

  root.add(foundationGroup);

  // --- 2. GROUND FLOOR GROUP (Enclosed living pavilion, core shear wall, floor slab) ---
  const groundFloorGroup = new THREE.Group();

  // Concrete Core Shear Wall
  const shearWallGeo = new THREE.BoxGeometry(0.5, 3.2, 3.5);
  const shearWallMesh = new THREE.Mesh(shearWallGeo, concreteMat);
  shearWallMesh.position.set(-2.5, 2.0, -0.5);
  registerMesh(shearWallMesh, concreteMat);
  groundFloorGroup.add(shearWallMesh);

  // Ground Floor Columns (Matte black structural steel I-sections)
  const colPositions = [
    [3.8, 2.0, -2],
    [3.8, 2.0, 1.5],
    [-3.8, 2.0, -2],
    [-3.8, 2.0, 1.5],
    [0.5, 2.0, -2.5],
  ];
  colPositions.forEach(([x, y, z]) => {
    const colGeo = new THREE.BoxGeometry(0.25, 3.2, 0.25);
    const colMesh = new THREE.Mesh(colGeo, steelMat);
    colMesh.position.set(x, y, z);
    registerMesh(colMesh, steelMat);
    groundFloorGroup.add(colMesh);
  });

  // Ground Floor Glass Facade (Sliding curtain panels)
  const glassGeo = new THREE.BoxGeometry(6.5, 3.0, 0.08);
  const glassMesh = new THREE.Mesh(glassGeo, glassMat);
  glassMesh.position.set(0.5, 2.0, 1.4);
  registerMesh(glassMesh, glassMat);
  groundFloorGroup.add(glassMesh);

  // Interior warm brass feature partition
  const partitionGeo = new THREE.BoxGeometry(0.1, 2.8, 1.8);
  const partitionMesh = new THREE.Mesh(partitionGeo, accentGoldMat);
  partitionMesh.position.set(1.2, 1.9, -0.6);
  registerMesh(partitionMesh, accentGoldMat);
  groundFloorGroup.add(partitionMesh);

  root.add(groundFloorGroup);

  // --- 3. CANTILEVER GROUP (2nd level terrace & master architectural wing) ---
  const cantileverGroup = new THREE.Group();

  // The Signature Cantilever Slab (protrudes dramatically over ground floor)
  const cantileverSlabGeo = new THREE.BoxGeometry(11, 0.45, 6);
  const cantileverSlabMesh = new THREE.Mesh(cantileverSlabGeo, concreteMat);
  cantileverSlabMesh.position.set(0.8, 3.8, 0.2);
  registerMesh(cantileverSlabMesh, concreteMat);
  cantileverGroup.add(cantileverSlabMesh);

  // Cantilever structural steel support truss beam
  const trussGeo = new THREE.BoxGeometry(10.8, 0.3, 0.3);
  const trussMesh = new THREE.Mesh(trussGeo, steelMat);
  trussMesh.position.set(0.8, 3.55, 3.1);
  registerMesh(trussMesh, steelMat);
  cantileverGroup.add(trussMesh);

  // Upper level residential enclosure
  const upperEnclosureGeo = new THREE.BoxGeometry(7, 2.6, 3.8);
  const upperEnclosureMesh = new THREE.Mesh(upperEnclosureGeo, concreteMat);
  upperEnclosureMesh.position.set(1.8, 5.3, -0.4);
  registerMesh(upperEnclosureMesh, concreteMat);
  cantileverGroup.add(upperEnclosureMesh);

  // Upper Glass Gallery Facing Sunset
  const upperGlassGeo = new THREE.BoxGeometry(6.6, 2.4, 0.08);
  const upperGlassMesh = new THREE.Mesh(upperGlassGeo, glassMat);
  upperGlassMesh.position.set(1.8, 5.3, 1.55);
  registerMesh(upperGlassMesh, glassMat);
  cantileverGroup.add(upperGlassMesh);

  // Glass Terrace Balustrade
  const balustradeGeo = new THREE.BoxGeometry(3.5, 0.9, 0.05);
  const balustradeMesh = new THREE.Mesh(balustradeGeo, glassMat);
  balustradeMesh.position.set(-3.2, 4.45, 1.8);
  registerMesh(balustradeMesh, glassMat);
  cantileverGroup.add(balustradeMesh);

  root.add(cantileverGroup);

  // --- 4. ROOF & PERGOLA GROUP (Solar canopy & teak louvers) ---
  const roofGroup = new THREE.Group();

  // Concrete roof slab
  const roofSlabGeo = new THREE.BoxGeometry(9.5, 0.35, 5.2);
  const roofSlabMesh = new THREE.Mesh(roofSlabGeo, concreteMat);
  roofSlabMesh.position.set(1.2, 6.8, -0.1);
  registerMesh(roofSlabMesh, concreteMat);
  roofGroup.add(roofSlabMesh);

  // Solar canopy louvers (array of slender teak/steel slats)
  for (let i = 0; i < 9; i++) {
    const louverGeo = new THREE.BoxGeometry(0.12, 0.25, 4.8);
    const louverMesh = new THREE.Mesh(louverGeo, woodLouversMat);
    louverMesh.position.set(-2.8 + i * 0.75, 7.15, -0.1);
    registerMesh(louverMesh, woodLouversMat);
    roofGroup.add(louverMesh);
  }

  // Steel perimeter fascia beam
  const fasciaGeo = new THREE.BoxGeometry(9.6, 0.2, 5.3);
  const fasciaMesh = new THREE.Mesh(fasciaGeo, steelMat);
  fasciaMesh.position.set(1.2, 6.95, -0.1);
  registerMesh(fasciaMesh, steelMat);
  roofGroup.add(fasciaMesh);

  root.add(roofGroup);

  // Soft Ground Contact Shadow Plane
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext('2d')!;
  const gradient = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(0,0,0,0.4)');
  gradient.addColorStop(0.6, 'rgba(0,0,0,0.15)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  sCtx.fillStyle = gradient;
  sCtx.fillRect(0, 0, 256, 256);

  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.5,
  });
  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(16, 12), shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.01;
  root.add(shadowPlane);

  // Architectural Grid Plane for CAD feel
  const gridHelper = new THREE.GridHelper(22, 22, 0xE5A93C, 0x2A3444);
  gridHelper.position.y = 0.005;
  root.add(gridHelper);

  // Explode view handler (Smooth spring separation)
  function updateExplode(factor: number) {
    // factor ranges from 0.0 to 1.0
    groundFloorGroup.position.y = factor * 0.6;
    cantileverGroup.position.y = factor * 1.8;
    roofGroup.position.y = factor * 3.4;
  }

  // Set render mode (solid, wireframe, blueprint)
  function setRenderMode(mode: 'solid' | 'wireframe' | 'blueprint') {
    allMeshes.forEach(({ mesh, originalMat }) => {
      if (mode === 'solid') {
        mesh.material = originalMat;
      } else if (mode === 'wireframe') {
        mesh.material = wireMat;
      } else if (mode === 'blueprint') {
        mesh.material = blueprintMat;
      }
    });
  }

  function dispose() {
    concreteTex.dispose();
    shadowTex.dispose();
    concreteMat.dispose();
    steelMat.dispose();
    accentGoldMat.dispose();
    glassMat.dispose();
    woodLouversMat.dispose();
    wireMat.dispose();
    blueprintMat.dispose();
    shadowMat.dispose();
  }

  return {
    root,
    foundationGroup,
    groundFloorGroup,
    cantileverGroup,
    roofGroup,
    updateExplode,
    setRenderMode,
    dispose,
  };
}
