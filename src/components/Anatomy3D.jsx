import React, { useState, useRef, Suspense, useCallback, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  useProgress,
} from '@react-three/drei';
import * as THREE from 'three';
import { ORGAN_SYSTEMS_DATA } from '../data/organSystems.js';

// ─── GLB Model Loader (per-system) with useGLTF ───────────────────────────────
function SystemModel({ systemId, wireframe, activeOrgan, onOrganClick }) {
  const system = ORGAN_SYSTEMS_DATA.find(s => s.id === systemId);
  const gltfPath = system?.modelPath || `/models/${systemId}.glb`;
  const { scene } = useGLTF(gltfPath);
  const clonedScene = useRef(null);

  // Deep-clone the GLTF scene so switching systems cleanly unmounts/remounts
  useEffect(() => {
    clonedScene.current = scene.clone(true);
    return () => { clonedScene.current = null; };
  }, [scene]);

  if (!clonedScene.current) return null;

  return (
    <primitive
      object={clonedScene.current}
      scale={1.15}
      position={[0, 0.5, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (e.object?.name && onOrganClick) onOrganClick(e.object.name);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = e.object?.name ? 'pointer' : 'grab';
      }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {/* Apply wireframe to all meshes */}
      {clonedScene.current && wireframe && clonedScene.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = true;
        }
      })}
    </primitive>
  );
}

// Preload all 4 system models so switching is instant
ORGAN_SYSTEMS_DATA.forEach(sys => {
  if (sys.modelPath) useGLTF.preload(sys.modelPath);
});

// ─── Loading spinner (custom HTML via drei's Html) ────────────────────────────
function ModelLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="r3f-loader">
        <div className="r3f-loader-spinner" />
        <div className="r3f-loader-text">
          {progress === 100 ? 'Preparing scene...' : `Loading 3D Model (${Math.round(progress)}%)…`}
        </div>
      </div>
    </Html>
  );
}

// ─── Bounding-box camera focus helper ─────────────────────────────────────────
function CameraController({ targetPos, autoRotate }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    if (controlsRef.current && targetPos) {
      controlsRef.current.target.lerp(
        new THREE.Vector3(...targetPos),
        0.05
      );
    }
    if (autoRotate && controlsRef.current) {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = 1.2;
    } else if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      maxPolarAngle={Math.PI / 1.7}
      minDistance={1.8}
      maxDistance={9.0}
      makeDefault
    />
  );
}

// ─── Main Anatomy3D Component ─────────────────────────────────────────────────
export default function Anatomy3D() {
  const [activeSystemId, setActiveSystemId] = useState('digestive');
  const [activeOrgan, setActiveOrgan] = useState(null);
  const [lang, setLang] = useState('en');
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  const activeSystem = ORGAN_SYSTEMS_DATA.find(s => s.id === activeSystemId);

  const handleOrganClick = useCallback((name) => {
    if (!activeSystem || !name) return;

    // Smart mapping from detailed GLB mesh names to organ IDs
    const lower = name.toLowerCase();

    // Nervous system has many named meshes that map to 3 organs
    const nervousMap = {
      // Brain → cerebrum hemispheres, cerebellum, brainstem, fissure
      brain: ['cerebral', 'cerebellum', 'brainstem', 'fissure'],
      // Spinal cord
      spinal_cord: ['spinal', 'vertebra'],
      // Peripheral nerves → cranial + peripheral nerve branches
      peripheral_nerves: ['cranialnerve', 'peripheralnerve'],
    };

    let match;
    if (activeSystem.id === 'nervous') {
      for (const [organId, keywords] of Object.entries(nervousMap)) {
        if (keywords.some(kw => lower.includes(kw))) {
          match = activeSystem.organs.find(o => o.id === organId);
          break;
        }
      }
    }

    // Generic fallback matching for other systems
    if (!match) {
      match = activeSystem.organs.find(o =>
        lower.includes(o.id.toLowerCase()) ||
        o.id.toLowerCase().includes(lower) ||
        o.name.en.toLowerCase().includes(lower)
      );
    }

    if (match) setActiveOrgan(match);
  }, [activeSystem]);

  // Set first organ as active when system changes
  useEffect(() => {
    if (activeSystem?.organs?.length) {
      setActiveOrgan(activeSystem.organs[0]);
    }
  }, [activeSystemId]);

  const targetPos = activeOrgan?.pos || [0, 0.8, 0];
  const t = (key) => activeSystem?.[key]?.[lang] || '';

  return (
    <>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h1>3D Major <span>Organ Systems</span></h1>
            <p id="anatomyHeaderSub">
              {lang === 'si'
                ? 'අන්තර්ක්‍රියාකාරී 3D දේහ පද්ධති - ශ්‍රී ලංකා උසස් පෙළ ජීව විද්‍යාව (5 වන ඒකකය)'
                : 'Interactive 3D Anatomy Visualizer — Sri Lanka A/L Biology (Unit 5 Resource Book)'}
            </p>
          </div>
          <div className="lang-switch">
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
            <button className={`lang-btn ${lang === 'si' ? 'active' : ''}`} onClick={() => setLang('si')}>සිංහල</button>
          </div>
        </div>
      </div>

      <div className="anatomy-layout">
        {/* LEFT: System Selector */}
        <div className="systems-panel">
          <h3 style={{ fontSize: '0.95rem', marginBottom: 4 }}>Major Organ Systems</h3>
          <small style={{ color: 'var(--text-muted)', marginBottom: 10, display: 'block' }}>
            Select a system from Unit 5:
          </small>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ORGAN_SYSTEMS_DATA.map(sys => (
              <div
                key={sys.id}
                className={`system-card ${activeSystemId === sys.id ? 'active' : ''}`}
                onClick={() => setActiveSystemId(sys.id)}
              >
                <div className={`system-icon icon-box-${sys.color}`}>
                  <i className={`fa-solid ${sys.icon}`} />
                </div>
                <div className="system-info">
                  <div className="system-title-en">{sys.name[lang]}</div>
                  <div className="system-title-si">{sys.name[lang === 'en' ? 'si' : 'en']}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE: 3D Canvas */}
        <div className="canvas-container">
          <div className="canvas-controls">
            <div className="control-btn-group">
              <button className="btn btn-secondary btn-sm" onClick={() => {
                // Reset view
                setActiveOrgan(activeSystem?.organs?.[0] || null);
              }}>
                <i className="fa-solid fa-rotate-left" /> Reset View
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setWireframe(w => !w)}>
                <i className="fa-solid fa-vector-square" /> Wireframe
              </button>
              <button
                className={`btn btn-secondary btn-sm ${autoRotate ? 'active' : ''}`}
                onClick={() => setAutoRotate(r => !r)}
              >
                <i className="fa-solid fa-arrows-spin" /> Auto Rotate
              </button>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'rgba(13,21,38,0.85)', padding: '4px 12px', borderRadius: 8, backdropFilter: 'blur(8px)' }}>
              <i className="fa-solid fa-hand-pointer" /> Drag to rotate · Scroll to zoom · Click organ to inspect
            </div>
          </div>

          <Canvas
            shadows
            camera={{ position: [0, 1.2, 5.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'radial-gradient(ellipse at center, #0f172a 0%, #070b14 100%)' }}
          >
            <Suspense fallback={<ModelLoader />}>
              {/* Studio environment for realistic PBR lighting & reflections */}
              <Environment preset="studio" />

              {/* Key light with shadow map */}
              <directionalLight
                position={[5, 12, 7]}
                intensity={1.4}
                color="#22c55e"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-8}
                shadow-camera-right={8}
                shadow-camera-top={8}
                shadow-camera-bottom={-8}
              />

              {/* Fill light */}
              <directionalLight
                position={[-5, 5, -5]}
                intensity={0.8}
                color="#06b6d4"
              />

              {/* Rim / back light */}
              <directionalLight
                position={[0, -10, -5]}
                intensity={0.6}
                color="#a855f7"
              />

              {/* Contact shadows on floor plane */}
              <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.45}
                scale={5}
                blur={2.5}
                far={4.5}
                color="#000000"
              />

              <SystemModel
                systemId={activeSystemId}
                wireframe={wireframe}
                activeOrgan={activeOrgan?.id}
                onOrganClick={handleOrganClick}
              />

              <CameraController targetPos={targetPos} autoRotate={autoRotate} />
            </Suspense>
          </Canvas>
        </div>

        {/* RIGHT: Organ Info Panel */}
        <div className="info-panel">
          <div className="unit5-badge">
            <i className="fa-solid fa-book-bookmark" /> {t('resourceRef') || activeSystem?.resourceRef}
          </div>
          <div className="info-header" id="infoTitle">
            {activeSystem && (
              <>
                <div className="info-title-en">{activeSystem.name[lang]}</div>
                {activeOrgan && (
                  <div className="info-title-si">
                    <i className="fa-solid fa-location-crosshairs" style={{ color: 'var(--accent-green)', marginRight: 6 }} />
                    {activeOrgan.name[lang]}
                  </div>
                )}
              </>
            )}
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: 6 }}>
              Select Organ / Part:
            </label>
            <div className="organ-select-list" id="organChips">
              {activeSystem?.organs.map(o => (
                <div
                  key={o.id}
                  className={`organ-chip ${activeOrgan?.id === o.id ? 'active' : ''}`}
                  onClick={() => setActiveOrgan(o)}
                >
                  {o.name[lang]}
                </div>
              ))}
            </div>
          </div>

          <div id="infoDesc">
            {activeSystem && (
              <div style={{ marginBottom: 14, color: 'var(--text-secondary)' }}>
                {activeSystem.description[lang]}
              </div>
            )}
            {activeOrgan && (
              <div className="detail-box">
                <h4>
                  🔬 {activeOrgan.name[lang]} - {lang === 'si' ? 'ප්‍රධාන කෘත්‍යයන්' : 'Key Functions'}
                </h4>
                <p>{activeOrgan.info[lang]}</p>
              </div>
            )}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }} id="resourceRef">
              {activeSystem?.resourceRef}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
