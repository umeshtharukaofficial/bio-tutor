#!/usr/bin/env node
/**
 * generate-anatomy-glb.mjs
 *
 * Procedurally constructs high-polygon organic anatomical system models
 * and exports them as valid binary .glb files using Three.js + GLTFExporter.
 *
 * Output: /home/Asus/bio-tutor/public/models/{digestive, circulatory, respiratory, excretory}.glb
 *
 * Usage: node generate-anatomy-glb.mjs
 */

import * as THREE from 'three';
import fs from 'node:fs';
import path from 'node:path';
import { Blob } from 'node:buffer';

// ── Polyfill browser APIs required by GLTFExporter in Node.js ──────────────
// GLTFExporter calls: reader.readAsArrayBuffer(blob), THEN sets reader.onloadend
// So our polyfill must be truly async: readAsArrayBuffer starts the read,
// and the onloadend setter fires the callback when the read completes.

class NodeFileReader {
  constructor() {
    this.result = null;
    this._onload = null;
    this._onloadend = null;
    this._onerror = null;
    this._pending = null;
  }
  get onload() { return this._onload; }
  set onload(fn) { this._onload = fn; this._tryFire(); }
  get onloadend() { return this._onloadend; }
  set onloadend(fn) { this._onloadend = fn; this._tryFire(); }
  get onerror() { return this._onerror; }
  set onerror(fn) { this._onerror = fn; }

  readAsArrayBuffer(blob) {
    this._pending = blob.arrayBuffer()
      .then(buf => {
        this.result = buf;
        this._pending = 'done';
        this._tryFire();
      })
      .catch(err => {
        this._pending = 'error';
        if (this._onerror) this._onerror(err);
      });
  }

  _tryFire() {
    if (this._pending === 'done' && this.result != null) {
      const evt = { target: this };
      if (this._onload) this._onload(evt);
      if (this._onloadend) this._onloadend(evt);
    }
  }
}
globalThis.FileReader = NodeFileReader;
globalThis.Blob = Blob;
globalThis.TextEncoder = class { encode(s) { return Buffer.from(s, 'utf-8'); } };
globalThis.TextDecoder = class { decode(b) { return Buffer.from(b).toString('utf-8'); } };

// Now safe to import GLTFExporter
const { GLTFExporter } = await import('three/addons/exporters/GLTFExporter.js');

const OUT_DIR = '/home/Asus/bio-tutor/public/models';
fs.mkdirSync(OUT_DIR, { recursive: true });

// ─── Material factory ───────────────────────────────────────────────────────
function anatomicalMaterial(colorHex) {
  return new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.32,
    metalness: 0.05,
  });
}

// ─── Helper: write scene to .glb ────────────────────────────────────────────
function exportGLB(scene, filename) {
  const exporter = new GLTFExporter();
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (glb) => {
        const outPath = path.join(OUT_DIR, filename);
        const buf = glb instanceof ArrayBuffer ? Buffer.from(glb) : Buffer.from(JSON.stringify(glb), 'utf-8');
        fs.writeFileSync(outPath, buf);
        console.log(`  Exported ${outPath}  (${(buf.length / 1024).toFixed(1)} KB)`);
        resolve(outPath);
      },
      (err) => {
        console.error(`  FAILED ${filename}:`, err.message || err);
        reject(err);
      },
      { binary: true, embedImages: false }
    );
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MODEL BUILDERS
// ═══════════════════════════════════════════════════════════════════════════════

function buildDigestive() {
  const root = new THREE.Group();
  root.name = 'DigestiveSystem';

  // Mouth / pharynx
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.18, 28, 28), anatomicalMaterial(0xe67e22));
  mouth.position.set(0, 2.05, 0.05);
  mouth.scale.set(1.15, 0.85, 1.0);
  mouth.name = 'MouthPharynx';
  root.add(mouth);

  // Esophagus
  const esoCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 1.75, 0), new THREE.Vector3(0.04, 1.1, -0.04),
    new THREE.Vector3(-0.02, 0.6, 0.04), new THREE.Vector3(0.1, 0.2, 0.08)
  );
  const esophagus = new THREE.Mesh(
    new THREE.TubeGeometry(esoCurve, 44, 0.085, 16, false),
    anatomicalMaterial(0xd35400)
  );
  esophagus.name = 'Esophagus';
  root.add(esophagus);

  // Stomach — LatheGeometry with bean-shaped profile
  const stomachProfile = [];
  for (let i = 0; i <= 32; i++) {
    const t = i / 32;
    const y = 0.65 - t * 1.05;
    const r = 0.20 + 0.15 * Math.sin(t * Math.PI);
    stomachProfile.push(new THREE.Vector2(r, y));
  }
  const stomach = new THREE.Mesh(
    new THREE.LatheGeometry(stomachProfile, 40),
    anatomicalMaterial(0xe74c3c)
  );
  stomach.position.set(0.25, 0.2, 0.1);
  stomach.name = 'Stomach';
  root.add(stomach);

  // Liver
  const liver = new THREE.Mesh(new THREE.SphereGeometry(0.38, 40, 40), anatomicalMaterial(0x8e44ad));
  liver.scale.set(1.0, 0.55, 0.55);
  liver.position.set(-0.35, 0.55, 0.1);
  liver.name = 'Liver';
  root.add(liver);

  // Gallbladder
  const gb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 20, 20), anatomicalMaterial(0x27ae60));
  gb.position.set(-0.25, 0.35, 0.22);
  gb.name = 'Gallbladder';
  root.add(gb);

  // Small intestine — helical coil
  const siPts = [];
  for (let t = 0; t < Math.PI * 5.5; t += 0.13) {
    const r = 0.30 + 0.05 * Math.sin(t * 2.7);
    siPts.push(new THREE.Vector3(Math.cos(t) * r, -0.15 + t * 0.035, Math.sin(t) * r + 0.15));
  }
  const si = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(siPts), 96, 0.075, 14, false),
    anatomicalMaterial(0xf1c40f)
  );
  si.name = 'SmallIntestine';
  root.add(si);

  // Large intestine — rectangular frame
  const colonPts = [
    new THREE.Vector3(0.5, 0.0, 0.08), new THREE.Vector3(0.5, -0.42, 0.08),
    new THREE.Vector3(-0.48, -0.42, 0.08), new THREE.Vector3(-0.48, 0.18, 0.08),
    new THREE.Vector3(0.3, 0.18, 0.08),
  ];
  const colon = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(colonPts, true, 'catmullrom', 0.5), 72, 0.135, 16, false),
    anatomicalMaterial(0x27ae60)
  );
  colon.position.set(0, -0.48, 0.08);
  colon.name = 'LargeIntestine';
  root.add(colon);

  // Pancreas
  const pancreas = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.35, 12, 20), anatomicalMaterial(0xf39c12));
  pancreas.position.set(0.05, -0.1, 0.25);
  pancreas.rotation.z = 0.3;
  pancreas.name = 'Pancreas';
  root.add(pancreas);

  return root;
}

function buildCirculatory() {
  const root = new THREE.Group();
  root.name = 'CirculatorySystem';

  // Heart — 4-chamber shape
  const heartGeo = new THREE.SphereGeometry(0.42, 52, 52);
  const hp = heartGeo.attributes.position;
  for (let i = 0; i < hp.count; i++) {
    let x = hp.getX(i), y = hp.getY(i), z = hp.getZ(i);
    if (y < 0) { const s = 1 + y * 0.5; x *= s; z *= s; }
    else { x *= 1.2; z *= 1.2; }
    if (x > 0) x *= 0.85;
    hp.setXYZ(i, x, y, z);
  }
  heartGeo.computeVertexNormals();
  const heart = new THREE.Mesh(heartGeo, anatomicalMaterial(0xc0392b));
  heart.position.set(0.02, 0.68, 0.15);
  heart.name = 'Heart';
  root.add(heart);

  // Aorta arch
  const aortaCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0.04, 0.95, 0.18), new THREE.Vector3(0.06, 1.4, 0.28),
    new THREE.Vector3(-0.38, 1.48, 0.18), new THREE.Vector3(-0.65, 0.85, 0.08)
  );
  const aorta = new THREE.Mesh(
    new THREE.TubeGeometry(aortaCurve, 52, 0.065, 16, false),
    anatomicalMaterial(0xc0392b)
  );
  aorta.name = 'Aorta';
  root.add(aorta);

  // Vena cava
  const vcCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-0.04, 0.95, 0.04), new THREE.Vector3(-0.08, 1.32, -0.04),
    new THREE.Vector3(0.38, 1.4, -0.04), new THREE.Vector3(0.6, 0.8, 0.0)
  );
  const vc = new THREE.Mesh(
    new THREE.TubeGeometry(vcCurve, 52, 0.065, 16, false),
    anatomicalMaterial(0x2471a3)
  );
  vc.name = 'VenaCava';
  root.add(vc);

  // Pulmonary arteries
  for (const zOff of [-0.06, 0.06]) {
    const paCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.08, 1.02, zOff), new THREE.Vector3(0.42, 1.22, zOff * 2.8),
      new THREE.Vector3(0.72, 1.1, zOff * 2.4), new THREE.Vector3(0.88, 0.78, zOff * 1.6)
    );
    const pa = new THREE.Mesh(
      new THREE.TubeGeometry(paCurve, 40, 0.045, 12, false),
      anatomicalMaterial(0x2980b9)
    );
    pa.name = 'PulmonaryArtery';
    root.add(pa);
  }

  return root;
}

function buildRespiratory() {
  const root = new THREE.Group();
  root.name = 'RespiratorySystem';

  // Nasal cavity
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.18, 18), anatomicalMaterial(0xe67e22));
  nose.position.set(0, 1.98, 0.14);
  nose.name = 'NasalCavity';
  root.add(nose);

  // Trachea
  const trachea = new THREE.Mesh(
    new THREE.CylinderGeometry(0.075, 0.085, 0.95, 28, 8, true),
    anatomicalMaterial(0x16a085)
  );
  trachea.position.set(0, 1.55, 0.1);
  trachea.name = 'Trachea';
  root.add(trachea);

  // Cartilage rings
  for (let r = 0; r < 7; r++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.016, 12, 28), anatomicalMaterial(0x1abc9c));
    ring.position.set(0, 1.15 + r * 0.135, 0.1);
    ring.rotation.x = Math.PI / 2;
    ring.name = 'TrachealRing';
    root.add(ring);
  }

  // Bronchi
  for (const sign of [1, -1]) {
    const bc = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 1.0, 0.1), new THREE.Vector3(sign * 0.05, 0.9, 0.05),
      new THREE.Vector3(sign * 0.38, 0.78, -0.06), new THREE.Vector3(sign * 0.58, 0.62, -0.08)
    );
    const bronchus = new THREE.Mesh(
      new THREE.TubeGeometry(bc, 40, 0.04, 12, false),
      anatomicalMaterial(0x1abc9c)
    );
    bronchus.name = 'Bronchus';
    root.add(bronchus);
  }

  // Lungs — conical with rib-contour
  function lungGeo(h) {
    const g = new THREE.ConeGeometry(0.44, h, 40);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      p.setX(i, p.getX(i) * 1.32);
      p.setZ(i, p.getZ(i) * 0.72);
    }
    g.computeVertexNormals();
    return g;
  }

  const leftLung = new THREE.Mesh(lungGeo(1.08), anatomicalMaterial(0x1abc9c));
  leftLung.position.set(0.44, 0.72, 0.04);
  leftLung.name = 'LeftLung';
  root.add(leftLung);

  const rightLung = new THREE.Mesh(lungGeo(1.12), anatomicalMaterial(0x16a085));
  rightLung.position.set(-0.44, 0.72, 0.04);
  rightLung.name = 'RightLung';
  root.add(rightLung);

  // Diaphragm
  const diaGeo = new THREE.SphereGeometry(0.68, 36, 18, 0, Math.PI * 2, 0, Math.PI / 3.2);
  const diaphragm = new THREE.Mesh(diaGeo, anatomicalMaterial(0x27ae60));
  diaphragm.position.set(0, 0.24, 0.08);
  diaphragm.scale.set(1.05, 0.22, 0.62);
  diaphragm.name = 'Diaphragm';
  root.add(diaphragm);

  return root;
}

function buildExcretory() {
  const root = new THREE.Group();
  root.name = 'ExcretorySystem';

  // Kidney bean shape helper
  function kidneyMesh(side) {
    const geo = new THREE.SphereGeometry(0.34, 44, 44);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      if (side === 'right') { if (x < 0) x *= 0.48; x *= 0.75; }
      else { if (x > 0) x *= 0.48; x *= 0.75; }
      p.setX(i, x * 0.88);
      p.setY(i, y * 1.42);
      p.setZ(i, z * 0.55);
    }
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, anatomicalMaterial(0x9b59b6));
  }

  const rKidney = kidneyMesh('right');
  rKidney.position.set(0.3, 0.32, -0.07);
  rKidney.name = 'RightKidney';
  root.add(rKidney);

  const lKidney = kidneyMesh('left');
  lKidney.position.set(-0.3, 0.32, -0.07);
  lKidney.name = 'LeftKidney';
  root.add(lKidney);

  // Adrenal glands
  for (const [x, y] of [[0.3, 0.58], [-0.3, 0.58]]) {
    const adrenal = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.16, 18), anatomicalMaterial(0xf39c12));
    adrenal.position.set(x, y, -0.07);
    adrenal.name = 'AdrenalGland';
    root.add(adrenal);
  }

  // Ureters
  for (const [x, side] of [[0.17, 'R'], [-0.17, 'L']]) {
    const uc = new THREE.CubicBezierCurve3(
      new THREE.Vector3(x, 0.1, -0.04), new THREE.Vector3(x, -0.12, 0.0),
      new THREE.Vector3(x * 0.55, -0.38, 0.0), new THREE.Vector3(0, -0.58, 0.07)
    );
    const ureter = new THREE.Mesh(
      new THREE.TubeGeometry(uc, 36, 0.032, 12, false),
      anatomicalMaterial(0x8e44ad)
    );
    ureter.name = `Ureter_${side}`;
    root.add(ureter);
  }

  // Bladder
  const bladder = new THREE.Mesh(new THREE.SphereGeometry(0.2, 36, 36), anatomicalMaterial(0x3498db));
  bladder.position.set(0, -0.65, 0.08);
  bladder.scale.set(0.92, 0.7, 0.62);
  bladder.name = 'Bladder';
  root.add(bladder);

  // Urethra
  const urethra = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.038, 0.22, 14), anatomicalMaterial(0x2980b9));
  urethra.position.set(0, -0.85, 0.08);
  urethra.name = 'Urethra';
  root.add(urethra);

  return root;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  5. NERVOUS SYSTEM — Brain, Spinal Cord, Peripheral Nerves
// ═══════════════════════════════════════════════════════════════════════════════
function buildNervous() {
  const root = new THREE.Group();
  root.name = 'NervousSystem';

  // ── Cerebrum (left + right hemispheres) with gyri/sulci wrinkles ──
  function cerebrumHemisphere(side) {
    const geo = new THREE.SphereGeometry(0.38, 48, 48);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      // Gyri/sulci cortical wrinkles via sinusoidal displacement
      const noise = Math.sin(x * 18) * Math.cos(z * 18) * Math.sin(y * 12) * 0.035;
      // Hemisphere asymmetry
      if (side === 'left' && x > 0) x *= 0.25;
      if (side === 'right' && x < 0) x *= 0.25;
      p.setX(i, x * 1.2 + noise);
      p.setY(i, y * 0.85 + noise * 0.5);
      p.setZ(i, z * 1.1 + noise * 0.6);
    }
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, anatomicalMaterial(0x9b59b6));
  }

  const leftHemi = cerebrumHemisphere('left');
  leftHemi.position.set(0.16, 2.62, 0.0);
  leftHemi.name = 'LeftCerebralHemisphere';
  root.add(leftHemi);

  const rightHemi = cerebrumHemisphere('right');
  rightHemi.position.set(-0.16, 2.62, 0.0);
  rightHemi.name = 'RightCerebralHemisphere';
  root.add(rightHemi);

  // Longitudinal fissure line
  const fissure = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.65, 0.55),
    anatomicalMaterial(0x7d3c98)
  );
  fissure.position.set(0, 2.62, 0.0);
  fissure.name = 'LongitudinalFissure';
  root.add(fissure);

  // ── Cerebellum ──
  const cerebellum = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 40, 40),
    anatomicalMaterial(0x8e44ad)
  );
  cerebellum.position.set(0, 2.15, -0.28);
  cerebellum.scale.set(1.35, 0.65, 0.65);
  // Add subtle folia wrinkles
  const cPos = cerebellum.geometry.attributes.position;
  for (let i = 0; i < cPos.count; i++) {
    const x = cPos.getX(i), z = cPos.getZ(i);
    cPos.setZ(i, z + Math.abs(Math.sin(x * 14) * 0.02));
  }
  cerebellum.geometry.computeVertexNormals();
  cerebellum.name = 'Cerebellum';
  root.add(cerebellum);

  // ── Brainstem (midbrain + pons + medulla) ──
  const brainstemCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 2.28, -0.12),
    new THREE.Vector3(0, 2.05, -0.18),
    new THREE.Vector3(0, 1.75, -0.22),
    new THREE.Vector3(0, 1.45, -0.2)
  );
  const brainstem = new THREE.Mesh(
    new THREE.TubeGeometry(brainstemCurve, 36, 0.085, 20, false),
    anatomicalMaterial(0x8e44ad)
  );
  brainstem.name = 'Brainstem';
  root.add(brainstem);

  // ── Spinal cord (descending through vertebral canal) ──
  const spinalCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 1.42, -0.2),
    new THREE.Vector3(0.02, 0.5, -0.18),
    new THREE.Vector3(-0.02, -0.4, -0.16),
    new THREE.Vector3(0, -1.2, -0.14)
  );
  const spinalCord = new THREE.Mesh(
    new THREE.TubeGeometry(spinalCurve, 64, 0.055, 16, false),
    anatomicalMaterial(0x9b59b6)
  );
  spinalCord.name = 'SpinalCord';
  root.add(spinalCord);

  // ── Vertebral column indicators (torus rings along spinal cord) ──
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const pt = spinalCurve.getPointAt(t);
    const vertebra = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.022, 10, 20),
      anatomicalMaterial(0xd5c4a1)
    );
    vertebra.position.copy(pt);
    vertebra.rotation.x = Math.PI / 2;
    vertebra.name = 'Vertebra';
    root.add(vertebra);
  }

  // ── Cranial nerves (12 pairs emerging from brainstem) ──
  const cranialNerveColors = [0x3498db, 0x2980b9, 0x1abc9c, 0x2ecc71,
    0xf39c12, 0xe74c3c, 0x9b59b6, 0x1abc9c, 0x3498db, 0xf39c12, 0x2980b9, 0x2ecc71];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const startY = 2.1 + Math.sin(i * 0.5) * 0.25;
    const startX = Math.cos(angle) * 0.12;
    const endX = Math.cos(angle) * 0.65;
    const endZ = Math.sin(angle) * 0.45;

    const nerveCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(startX, startY, -0.08),
      new THREE.Vector3(endX * 0.5, startY - 0.15, endZ * 0.3),
      new THREE.Vector3(endX * 0.75, startY - 0.3, endZ * 0.6),
      new THREE.Vector3(endX, startY - 0.45, endZ)
    );
    const nerve = new THREE.Mesh(
      new THREE.TubeGeometry(nerveCurve, 24, 0.018, 8, false),
      anatomicalMaterial(cranialNerveColors[i])
    );
    nerve.name = 'CranialNerve';
    root.add(nerve);
  }

  // ── Peripheral nerve network (brachial plexus + lumbosacral plexus) ──
  function nerveBranch(start, end, color) {
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2 + (Math.random() - 0.5) * 0.4,
      (start.y + end.y) / 2 + (Math.random() - 0.5) * 0.2,
      (start.z + end.z) / 2 + (Math.random() - 0.5) * 0.3
    );
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 16, 0.02, 8, false),
      anatomicalMaterial(color)
    );
    tube.name = 'PeripheralNerve';
    return tube;
  }

  const nerveColor = 0x3498db;
  // Brachial plexus (upper limbs) — left side
  const brachialPoints = [
    [0.4, 1.5, 0.0], [0.65, 1.25, 0.15], [0.8, 1.0, 0.25],
    [0.45, 0.7, 0.15], [0.35, 0.5, 0.1], [0.25, 0.3, 0.05],
  ];
  for (let i = 0; i < brachialPoints.length - 1; i++) {
    root.add(nerveBranch(
      new THREE.Vector3(...brachialPoints[i]),
      new THREE.Vector3(...brachialPoints[i + 1]),
      nerveColor
    ));
  }
  // Brachial plexus — right side (mirror)
  for (let i = 0; i < brachialPoints.length - 1; i++) {
    const [x, y, z] = brachialPoints[i];
    const [nx, ny, nz] = brachialPoints[i + 1];
    root.add(nerveBranch(
      new THREE.Vector3(-x, y, z),
      new THREE.Vector3(-nx, ny, nz),
      nerveColor
    ));
  }

  // Sciatic nerve — left leg
  const sciaticPointsL = [
    [0.12, -0.5, -0.1], [0.2, -0.8, -0.05], [0.25, -1.1, 0.0], [0.22, -1.4, 0.05],
  ];
  for (let i = 0; i < sciaticPointsL.length - 1; i++) {
    root.add(nerveBranch(
      new THREE.Vector3(...sciaticPointsL[i]),
      new THREE.Vector3(...sciaticPointsL[i + 1]),
      nerveColor
    ));
  }
  // Sciatic nerve — right leg
  for (let i = 0; i < sciaticPointsL.length - 1; i++) {
    const [x, y, z] = sciaticPointsL[i];
    const [nx, ny, nz] = sciaticPointsL[i + 1];
    root.add(nerveBranch(
      new THREE.Vector3(-x, y, z),
      new THREE.Vector3(-nx, ny, nz),
      nerveColor
    ));
  }

  return root;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════════════════════
console.log('Generating anatomical GLB models...\n');

const systems = [
  { fn: buildDigestive,    file: 'digestive.glb' },
  { fn: buildCirculatory,  file: 'circulatory.glb' },
  { fn: buildRespiratory,  file: 'respiratory.glb' },
  { fn: buildExcretory,    file: 'excretory.glb' },
  { fn: buildNervous,      file: 'nervous.glb' },
];

for (const sys of systems) {
  const scene = new THREE.Scene();
  scene.add(sys.fn());
  try {
    await exportGLB(scene, sys.file);
  } catch (e) {
    console.error(`Failed to export ${sys.file}:`, e);
    process.exit(1);
  }
}

console.log('\nAll done. GLB models in', OUT_DIR);
