// ===================================================
// BIO TUTOR — 3D ORGAN SYSTEMS DATA & THREE.JS LOGIC
// Sri Lanka A/L Biology - Unit 5 (Animal Form & Function)
// Bilingual: English + Sinhala (සම්මත ජීව විද්‍යා පාරිභාෂික)
// ===================================================

const ORGAN_SYSTEMS_DATA = [
  {
    id: 'digestive',
    icon: 'fa-utensils',
    color: 'orange',
    name: { en: 'Digestive System', si: 'ජීරණ පද්ධතිය (Digestive System)' },
    resourceRef: 'Unit 5 - Section 5.1: Nutrition & Human Digestive System',
    modelPath: '/models/digestive.glb',
    cdnModelPath: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BrainStem/glTF-Binary/BrainStem.glb',
    description: {
      en: 'Breaks down food mechanically and chemically into absorbable nutrients, absorbing water and eliminating indigestible wastes.',
      si: 'ආහාර යාන්ත්‍රිකව හා රසායනිකව ජීර්ණය කර පෝෂක අවශෝෂණය කිරීම, ජලය අවශෝෂණය සහ නොදිරවූ ද්‍රව්‍ය මල ලෙස පිටකිරීම සිදුකරයි.'
    },
    organs: [
      {
        id: 'mouth_pharynx',
        name: { en: 'Mouth & Pharynx', si: 'මුඛය සහ ග්‍රසනිකාව' },
        pos: [0, 2.2, 0],
        meshType: 'sphere', scale: [0.3, 0.25, 0.3], color: 0xe67e22,
        info: {
          en: 'Mechanical digestion by teeth; chemical digestion of starch by salivary amylase (ptyalin).',
          si: 'දත් මගින් යාන්ත්‍රික ජීර්ණය; කෙළ ඇමයිලේස් (ප්ටයලින්) මගින් පිෂ්ඨයේ රසායනික ජීර්ණය ඇරඹේ.'
        }
      },
      {
        id: 'esophagus',
        name: { en: 'Esophagus', si: 'අන්නස්‍රෝතය' },
        pos: [0, 1.4, -0.05],
        meshType: 'cylinder', scale: [0.08, 1.2, 0.08], color: 0xd35400,
        info: {
          en: 'Muscular tube transporting food bolus to stomach via peristalsis.',
          si: 'ක්‍රමාකුංචන චලන (Peristalsis) මගින් ආහාර ගිලුණු පිණ්ඩය ආමාශය වෙත ගෙන යන පේෂිමය නාලය.'
        }
      },
      {
        id: 'stomach',
        name: { en: 'Stomach', si: 'ආමාශය' },
        pos: [0.25, 0.5, 0.1],
        meshType: 'stomachShape', scale: [0.4, 0.35, 0.3], color: 0xe74c3c,
        info: {
          en: 'Stores food; secretes gastric juice (HCl & Pepsin) for protein digestion; forms chyme.',
          si: 'ආහාර තැන්පත් කිරීම; ප්‍රෝටීන ජීර්ණය සඳහා ආමාශයික යුෂ (HCl සහ පෙප්සින්) ශ්‍රාවය; කයිම් සෑදීම.'
        }
      },
      {
        id: 'liver',
        name: { en: 'Liver & Gallbladder', si: 'අක්මාව සහ පිතාශය' },
        pos: [-0.35, 0.65, 0.15],
        meshType: 'cone', scale: [0.45, 0.4, 0.35], color: 0x8e44ad,
        info: {
          en: 'Produces bile for fat emulsification; stores glycogen; detoxifies harmful metabolic waste.',
          si: 'ස්නේහ පායසීකරණයට පිත නිපදවීම; ග්ලයිකොජන් තැන්පත් කිරීම; විෂහරණය සිදුකිරීම.'
        }
      },
      {
        id: 'small_intestine',
        name: { en: 'Small Intestine (Duodenum, Jejunum, Ileum)', si: 'කුඩා අන්ත්‍රය (ග්‍රහණිය, ශූන්‍යාන්ත්‍රය, ශේෂාන්ත්‍රය)' },
        pos: [0, -0.2, 0.2],
        meshType: 'torus', scale: [0.4, 0.25, 0.25], color: 0xf1c40f,
        info: {
          en: 'Primary site of digestion and nutrient absorption via microvilli brush border.',
          si: 'ආහාර ජීර්ණය සම්පූර්ණ වීම සහ ක්ෂුද්‍ර අංකුර (Microvilli) හරහා පෝෂක අවශෝෂණය වන ප්‍රධාන ස්ථානය.'
        }
      },
      {
        id: 'large_intestine',
        name: { en: 'Large Intestine & Rectum', si: 'මහා අන්ත්‍රය සහ ගුද මාර්ගය' },
        pos: [0, -0.4, 0.1],
        meshType: 'boxRing', scale: [0.7, 0.7, 0.2], color: 0x27ae60,
        info: {
          en: 'Absorbs water and mineral salts; forms feces for egestion.',
          si: 'ජලය සහ ඛනිජ ලවණ අවශෝෂණය; මල ද්‍රව්‍ය සාදා ගුදය හරහා පිටකිරීම (බහිෂ්කරණය).'
        }
      }
    ]
  },
  {
    id: 'circulatory',
    icon: 'fa-heart-pulse',
    color: 'green',
    name: { en: 'Circulatory System', si: 'පරිසංසරණ පද්ධතිය (Circulatory System)' },
    resourceRef: 'Unit 5 - Section 5.2: Blood Circulation & Heart Structure',
    modelPath: '/models/circulatory.glb',
    cdnModelPath: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BrainStem/glTF-Binary/BrainStem.glb',
    description: {
      en: 'Transports oxygen, nutrients, hormones, and metabolic wastes throughout the body using blood and the heart pump.',
      si: 'හෘදය සහ රුධිර නාල මගින් ඔක්සිජන්, පෝෂක, හෝමෝන සහ පරිවෘත්තීය අපද්‍රව්‍ය ශරීරය පුරා පරිවහනය කරයි.'
    },
    organs: [
      {
        id: 'heart',
        name: { en: 'Heart (4 Chambers)', si: 'හෘදය (කුටීර 4)' },
        pos: [0.05, 0.8, 0.2],
        meshType: 'heartMesh', scale: [0.35, 0.35, 0.35], color: 0xe74c3c,
        info: {
          en: '4-chambered muscular pump (2 atria, 2 ventricles). Drives systemic and pulmonary circulation.',
          si: 'කුටීර 4 කින් යුත් පේෂිමය පම්පය (කර්ණිකා 2, කෝෂිකා 2). මහා පරිසංසරණය සහ පෙනහළු පරිසංසරණය මෙහෙයවයි.'
        }
      },
      {
        id: 'aorta_arteries',
        name: { en: 'Aorta & Main Arteries', si: 'මහා ධමනිය සහ ප්‍රධාන ධමනි' },
        pos: [0, 1.2, 0.1],
        meshType: 'cylinderTree', scale: [0.06, 1.5, 0.06], color: 0xc0392b,
        info: {
          en: 'Carry oxygenated blood away from the heart under high pressure.',
          si: 'ඔක්සිජනීකෘත රුධිරය අධික පීඩනයක් යටතේ හෘදයේ සිට දේහ පටක වෙත ගෙන යයි.'
        }
      },
      {
        id: 'vena_cava_veins',
        name: { en: 'Vena Cava & Main Veins', si: 'මහා ශිරා සහ ප්‍රධාන ශිරා' },
        pos: [-0.1, 1.1, 0.05],
        meshType: 'cylinderTree', scale: [0.06, 1.5, 0.06], color: 0x2980b9,
        info: {
          en: 'Return deoxygenated blood back to the right atrium of the heart.',
          si: 'විඔක්සිජනීකෘත රුධිරය නැවත හෘදයේ දකුණු කර්ණිකාව වෙත ගෙන එයි.'
        }
      },
      {
        id: 'capillaries',
        name: { en: 'Capillary Beds', si: 'කේශනාලිකා ජාල' },
        pos: [0, 0, 0],
        meshType: 'particles', scale: [1, 2, 0.5], color: 0x8e44ad,
        info: {
          en: 'Microscopic 1-cell thick vessels where gas, nutrient, and waste exchange occurs with tissue fluid.',
          si: 'පටක ද්‍රවය සමග වායු, පෝෂක සහ අපද්‍රව්‍ය හුවමාරුව සිදුවන ඒක-සෛලික ඝනකමින් යුත් කේශනාලිකා.'
        }
      }
    ]
  },
  {
    id: 'respiratory',
    icon: 'fa-lungs',
    color: 'teal',
    name: { en: 'Respiratory System', si: 'ශ්වසන පද්ධතිය (Respiratory System)' },
    resourceRef: 'Unit 5 - Section 5.3: Gas Exchange & Human Lungs',
    modelPath: '/models/respiratory.glb',
    cdnModelPath: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BrainStem/glTF-Binary/BrainStem.glb',
    description: {
      en: 'Facilitates oxygen absorption into blood and carbon dioxide release via alveoli in the lungs.',
      si: 'පෙනහැලිවල ඇල්වීයෝල (Alveoli) හරහා ඔක්සිජන් රුධිරයට ලබා ගැනීම සහ කාබන්ඩයොක්සයිඩ් පිටකිරීම සිදුකරයි.'
    },
    organs: [
      {
        id: 'nasal_trachea',
        name: { en: 'Nasal Cavity & Trachea (Windpipe)', si: 'නාසා කුහරය සහ ශ්වාසනාලය' },
        pos: [0, 1.8, 0.15],
        meshType: 'ringsCylinder', scale: [0.1, 0.8, 0.1], color: 0x16a085,
        info: {
          en: 'Cartilage-ring reinforced tube lined with ciliated epithelium to filter and warm incoming air.',
          si: 'කාටිලේජ වලලු සහිත, පක්ෂ්මධර අපිච්ඡදයෙන් ලයිනිං වූ වාතය පෙරා උණුසුම් කරන නාලය.'
        }
      },
      {
        id: 'left_lung',
        name: { en: 'Left Lung (2 Lobes)', si: 'වම් පෙනහැල්ල (ඛණ්ඩිකා 2)' },
        pos: [0.3, 1.0, 0.1],
        meshType: 'lungShape', scale: [0.35, 0.6, 0.3], color: 0x1abc9c,
        info: {
          en: 'Contains bronchioles and millions of alveoli for gas exchange.',
          si: 'වායු හුවමාරුව සඳහා ශ්වාසනිකා සහ ඇල්වීයෝල මිලියන ගණනක් අඩංගු වේ.'
        }
      },
      {
        id: 'right_lung',
        name: { en: 'Right Lung (3 Lobes)', si: 'දකුණු පෙනහැල්ල (ඛණ්ඩිකා 3)' },
        pos: [-0.3, 1.0, 0.1],
        meshType: 'lungShape', scale: [0.38, 0.6, 0.3], color: 0x1abc9c,
        info: {
          en: 'Slightly larger than left lung; primary site of diffusion of O₂ and CO₂.',
          si: 'වම් පෙනහැල්ලට වඩා තරමක් විශාලය; O₂ සහ CO₂ විසරණයේ ප්‍රධාන ස්ථානයයි.'
        }
      },
      {
        id: 'diaphragm',
        name: { en: 'Diaphragm Muscle', si: 'මහා ප්‍රාචීරය' },
        pos: [0, 0.6, 0.1],
        meshType: 'dome', scale: [0.7, 0.15, 0.4], color: 0x27ae60,
        info: {
          en: 'Dome-shaped muscle below thoracic cavity. Contracts (flattens) during inhalation.',
          si: 'උරස් කුහරයට පහලින් පිහිටි ගොඩනැගිලි හැඩති පේෂිය. ආශ්වාසයේදී සංකෝචනය වී තැලි වේ.'
        }
      }
    ]
  },
  {
    id: 'excretory',
    icon: 'fa-droplet',
    color: 'purple',
    name: { en: 'Excretory System', si: 'බහිස්ස්‍රාවී පද්ධතිය (Excretory System)' },
    resourceRef: 'Unit 5 - Section 5.4: Osmoregulation & Urinary System',
    modelPath: '/models/excretory.glb',
    cdnModelPath: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BrainStem/glTF-Binary/BrainStem.glb',
    description: {
      en: 'Filters metabolic nitrogenous waste (urea) from blood and maintains body water/salt balance.',
      si: 'රුධිරයෙන් නයිට්‍රජනීය පරිවෘත්තීය අපද්‍රව්‍ය (යූරියා) පෙරා ඉවත් කර ශරීර ජල හා ලවණ සමතුලිතතාව පවත්වා ගනී.'
    },
    organs: [
      {
        id: 'kidneys',
        name: { en: 'Kidneys (Renal System)', si: 'වකුගඩු (වෘක්ක)' },
        pos: [0.3, 0.3, -0.1],
        meshType: 'beanPair', scale: [0.25, 0.35, 0.2], color: 0x9b59b6,
        info: {
          en: 'Contains ~1 million nephrons per kidney. Performs ultrafiltration, selective reabsorption, and secretion.',
          si: 'වකුගඩුවක නෙෆ්රෝන (Nephrons) මිලියනයක් පමණ ඇත. අතිපෙරණය, වරණීය නැවත අවශෝෂණය සහ ශ්‍රාවය සිදුකරයි.'
        }
      },
      {
        id: 'ureters',
        name: { en: 'Ureters', si: 'ගුදමාර්ග / මූත්‍ර නාල' },
        pos: [0.15, -0.1, -0.05],
        meshType: 'tubes', scale: [0.04, 0.6, 0.04], color: 0x8e44ad,
        info: {
          en: 'Ducts transporting urine from renal pelvis to urinary bladder.',
          si: 'වෘක්ක ශ්‍රෝණියේ සිට මූත්‍රාශය වෙත මූත්‍ර ගෙන යන නාල 2.'
        }
      },
      {
        id: 'bladder',
        name: { en: 'Urinary Bladder & Urethra', si: 'මූත්‍රාශය සහ මූත්‍ර මාර්ගය' },
        pos: [0, -0.5, 0.1],
        meshType: 'sphere', scale: [0.3, 0.3, 0.3], color: 0x3498db,
        info: {
          en: 'Muscular sac that temporarily stores urine before excretion through urethra.',
          si: 'මූත්‍ර මාර්ගය හරහා පිටකිරීමට පෙර මූත්‍ර තාවකාලිකව ගබඩා කරන පේෂිමය ආශය.'
        }
      }
    ]
  },
  {
    id: 'nervous',
    icon: 'fa-brain',
    color: 'purple',
    name: { en: 'Nervous System', si: 'ස්නායු පද්ධතිය (Nervous System)' },
    resourceRef: 'Unit 5 - Section 5.5: Neural Control & Reflexes',
    modelPath: '/models/nervous.glb',
    cdnModelPath: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BrainStem/glTF-Binary/BrainStem.glb',
    description: {
      en: 'Coordinates fast electrical signaling throughout the body via CNS (Brain & Spinal Cord) and PNS.',
      si: 'මධ්‍යම (මොළය හා සුෂුම්නාව) සහ පරිධීය ස්නායු පද්ධති මගින් වේගවත් විද්‍යුත් සංඥා මගින් දේහ ක්‍රියාකාරකම් සම්බන්ධීකරණය කරයි.'
    },
    organs: [
      {
        id: 'brain',
        name: { en: 'Brain (Cerebrum, Cerebellum, Brainstem)', si: 'මොළය (මස්තිෂ්කය, අනුමස්තිෂ්කය, සුෂුම්නා ශීර්ෂකය)' },
        pos: [0, 2.5, 0],
        meshType: 'brainShape', scale: [0.45, 0.4, 0.45], color: 0x9b59b6,
        info: {
          en: 'Control center for perception, memory, involuntary vital functions, and voluntary movements.',
          si: 'සංවේදන, මතකය, අනෛච්ඡික වැදගත් ක්‍රියා සහ ඓච්ඡික චලන පාලනය කරන ප්‍රධාන මධ්‍යස්ථානය.'
        }
      },
      {
        id: 'spinal_cord',
        name: { en: 'Spinal Cord', si: 'සුෂුම්නාව' },
        pos: [0, 1.2, -0.15],
        meshType: 'cylinder', scale: [0.07, 2.2, 0.07], color: 0x8e44ad,
        info: {
          en: 'Nerve trunk running through vertebral column; mediates spinal reflex arcs.',
          si: 'කශේරුකාව තුළින් යන ස්නායු කඳ; සුෂුම්නා ප්‍රතිචාර (Reflex arcs) පාලනය කරයි.'
        }
      },
      {
        id: 'peripheral_nerves',
        name: { en: 'Peripheral Nerves (Cranial & Spinal)', si: 'පරිධීය ස්නායු (කපාල සහ සුෂුම්නා)' },
        pos: [0, 0.5, 0],
        meshType: 'wireframeNetwork', scale: [1, 2.5, 0.6], color: 0x3498db,
        info: {
          en: 'Network connecting CNS to sensory receptors, skeletal muscles, and visceral organs.',
          si: 'මධ්‍යම ස්නායු පද්ධතිය සංවේදක, පේෂි සහ අභ්‍යන්තර අංග සමග සම්බන්ධ කරන ස්නායු ජාලය.'
        }
      }
    ]
  }
];

// Three.js Engine State
let scene, camera, renderer, controls, currentGroup, activeSystem, activeLang = 'en', activeOrgan = null;
let isAutoRotating = false;
let isWireframe = false;
let targetCameraPos = new THREE.Vector3(0, 1.2, 5.5);
let targetControlsTarget = new THREE.Vector3(0, 0.8, 0);

// Helper: Custom Anatomical Procedural Geometry Generators using Bezier Curves & Shaders
function createAnatomicalMesh(meshType, color) {
  let geo;
  
  switch (meshType) {
    case 'stomachShape': {
      // Realistic J-shaped stomach using 3D Cubic Bezier Curve Extrusion
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0.6, 0),
        new THREE.Vector3(0.5, 0.4, 0.1),
        new THREE.Vector3(0.4, -0.3, 0.1),
        new THREE.Vector3(-0.1, -0.5, 0)
      );
      geo = new THREE.TubeGeometry(curve, 32, 0.28, 16, false);
      break;
    }
    case 'heartMesh': {
      // 4-Chamber Anatomical Heart
      geo = new THREE.SphereGeometry(0.55, 32, 32);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);
        if (y < 0) {
          x *= (1 + y * 0.4);
          z *= (1 + y * 0.4);
        } else {
          x *= 1.15;
          y *= 1.05;
        }
        pos.setXYZ(i, x, y, z);
      }
      geo.computeVertexNormals();
      break;
    }
    case 'lungShape': {
      // Anatomical Conical Lung Lobe with Rib Cavity Contour
      geo = new THREE.ConeGeometry(0.52, 1.25, 32);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let z = pos.getZ(i);
        pos.setX(i, x * 1.35);
        pos.setZ(i, z * 0.85);
      }
      geo.computeVertexNormals();
      break;
    }
    case 'beanPair': {
      // Renal Kidney Bean Shape with Hilum Indentation
      geo = new THREE.SphereGeometry(0.48, 32, 32);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);
        if (x < 0) x *= 0.6;
        pos.setX(i, x * 0.85);
        pos.setY(i, y * 1.35);
        pos.setZ(i, z * 0.65);
      }
      geo.computeVertexNormals();
      break;
    }
    case 'brainShape': {
      // Cerebrum & Cerebellum Lobes with Cortical Gyri/Sulci Wrinkles
      geo = new THREE.SphereGeometry(0.65, 36, 36);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);
        const gyri = Math.sin(x * 14) * Math.cos(z * 14) * 0.045;
        pos.setXYZ(i, x * 1.25 + gyri, y * 0.95 + gyri, z * 1.1 + gyri);
      }
      geo.computeVertexNormals();
      break;
    }
    case 'cylinderTree': {
      // Vascular Arterial/Venous Bezier Branch
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, -0.8, 0),
        new THREE.Vector3(0.1, 0, 0),
        new THREE.Vector3(-0.1, 0.4, 0),
        new THREE.Vector3(0, 0.9, 0)
      );
      geo = new THREE.TubeGeometry(curve, 24, 0.08, 12, false);
      break;
    }
    case 'torus': {
      // Coiled Intestines Bezier Helix
      const points = [];
      for (let t = 0; t < Math.PI * 4; t += 0.2) {
        points.push(new THREE.Vector3(Math.cos(t) * 0.35, (t - Math.PI * 2) * 0.08, Math.sin(t) * 0.35));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      geo = new THREE.TubeGeometry(curve, 48, 0.1, 12, false);
      break;
    }
    case 'boxRing': {
      // Large Intestine Colon Quad Loop
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-0.5, -0.5, 0),
        new THREE.Vector3(-0.5, 0.5, 0),
        new THREE.Vector3(0.5, 0.5, 0),
        new THREE.Vector3(0.5, -0.5, 0)
      );
      geo = new THREE.TubeGeometry(curve, 32, 0.16, 14, false);
      break;
    }
    case 'wireframeNetwork': {
      // Neural Peripheral Spikes with Dendrites
      geo = new THREE.IcosahedronGeometry(0.7, 2);
      break;
    }
    case 'sphere':
    default: {
      geo = new THREE.SphereGeometry(0.45, 24, 24);
      break;
    }
  }

  // Realistic Organic Anatomical Material (MeshPhysicalMaterial with Subsurface Scattering effect)
  const mat = new THREE.MeshPhysicalMaterial({
    color: color,
    roughness: 0.28,
    metalness: 0.1,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
    transmission: 0.1, // Subsurface light transmission mimic
    thickness: 0.8,
    wireframe: isWireframe,
    emissive: color,
    emissiveIntensity: 0.12
  });

  return new THREE.Mesh(geo, mat);
}

function init3DViewer() {
  const container = document.getElementById('threeCanvasContainer');
  const canvas = document.getElementById('threeCanvas');
  if (!container || !canvas) return;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.2, 5.5);

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Initialize OrbitControls
  if (window.THREE && THREE.OrbitControls) {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.minDistance = 1.8;
    controls.maxDistance = 9.0;
    controls.target.set(0, 0, 0);
  }

  // Realistic Anatomical Studio Multi-Lighting
  const ambientLight = new THREE.AmbientLight(0xfff5f0, 0.9);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x22c55e, 1.4);
  keyLight.position.set(5, 12, 7);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x06b6d4, 0.8);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xa855f7, 0.6);
  rimLight.position.set(0, -10, -5);
  scene.add(rimLight);

  // Raycaster for interactive 3D click on organs
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    if (currentGroup) {
      const intersects = raycaster.intersectObjects(currentGroup.children, true);
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        if (clickedMesh.userData && clickedMesh.userData.organId) {
          selectOrgan(clickedMesh.userData.organId);
        }
      }
    }
  });

  // Window Resize
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Smooth Camera Target Lerp Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth camera transition when organ selected
    camera.position.lerp(targetCameraPos, 0.06);
    if (controls) {
      controls.target.lerp(targetControlsTarget, 0.06);
      controls.update();
    }

    if (currentGroup && isAutoRotating) {
      currentGroup.rotation.y += 0.004;
    }

    // Interactive 3D Heartbeat Contraction (72 BPM rhythm: contraction & relaxation pulse)
    if (currentGroup && isHeartbeating) {
      heartbeatTimer += 0.08;
      const pulse = 1 + Math.sin(heartbeatTimer * 4) * 0.08 + (Math.sin(heartbeatTimer * 8) > 0.5 ? 0.04 : 0);
      currentGroup.children.forEach(child => {
        if (child.userData && (child.userData.organId === 'heart' || child.userData.organId === 'arteries')) {
          child.scale.set(pulse, pulse, pulse);
        }
      });
    }

    renderer.render(scene, camera);
  }
  animate();

  // Load initial system
  loadSystem('digestive');
}

function loadSystem(systemId) {
  activeSystem = ORGAN_SYSTEMS_DATA.find(s => s.id === systemId);
  if (!activeSystem) return;

  if (currentGroup) scene.remove(currentGroup);
  currentGroup = new THREE.Group();

  const loaderOverlay = document.getElementById('modelLoaderOverlay');
  const loaderStatus = document.getElementById('loaderStatusText');

  // Candidate paths for GLB assets (supports root, dist, and relative pages)
  const pathCandidates = [
    `../models/${systemId}.glb`,
    `/models/${systemId}.glb`,
    `models/${systemId}.glb`,
    `../dist/models/${systemId}.glb`,
    `/dist/models/${systemId}.glb`,
    `dist/models/${systemId}.glb`,
    activeSystem.cdnModelPath
  ].filter(Boolean);

  if (window.THREE && THREE.GLTFLoader) {
    if (loaderOverlay) {
      loaderOverlay.style.display = 'flex';
      if (loaderStatus) loaderStatus.textContent = `Loading ${activeSystem.name[activeLang]} model...`;
    }

    const loader = new THREE.GLTFLoader();

    function tryLoadNextCandidate(index) {
      if (index >= pathCandidates.length) {
        if (loaderOverlay) loaderOverlay.style.display = 'none';
        buildProceduralSystem();
        return;
      }

      const url = pathCandidates[index];
      loader.load(
        url,
        (gltf) => {
          if (loaderOverlay) loaderOverlay.style.display = 'none';
          const model = gltf.scene;

          // Compute Bounding Box to center model dynamically on origin (0,0,0)
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          // Re-center model pivot
          model.position.x = -center.x;
          model.position.y = -center.y;
          model.position.z = -center.z;

          const wrapper = new THREE.Group();
          wrapper.add(model);
          wrapper.scale.set(0.85, 0.85, 0.85);
          wrapper.position.set(0, 0.5, 0); // Raised Y position up into upper center viewport

          wrapper.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (!child.userData.organId && activeSystem.organs.length > 0) {
                child.userData = { organId: activeSystem.organs[0].id, baseColor: 0x22c55e };
              }
            }
          });

          currentGroup.add(wrapper);
          scene.add(currentGroup);
          renderSystemsList();
          selectOrgan(activeSystem.organs[0].id);
        },
        (xhr) => {
          if (xhr.lengthComputable && loaderStatus) {
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            loaderStatus.textContent = `Loading 3D Model (${percent}%)...`;
          }
        },
        (err) => {
          // Try next candidate path
          tryLoadNextCandidate(index + 1);
        }
      );
    }

    tryLoadNextCandidate(0);
  } else {
    buildProceduralSystem();
  }
}

function buildProceduralSystem() {
  // Human Torso Frame Context
  const bodyGeo = new THREE.CylinderGeometry(0.58, 0.38, 3.4, 20);
  const bodyMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true, transparent: true, opacity: 0.1 });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.position.y = 0.8;
  currentGroup.add(bodyMesh);

  // Anatomical Organs Generator
  activeSystem.organs.forEach(organ => {
    const mesh = createAnatomicalMesh(organ.meshType, organ.color);
    mesh.position.set(...organ.pos);
    mesh.scale.set(...organ.scale);
    mesh.userData = { organId: organ.id, baseColor: organ.color };

    currentGroup.add(mesh);
  });

  scene.add(currentGroup);
  renderSystemsList();
  selectOrgan(activeSystem.organs[0].id);
}

function selectOrgan(organId) {
  const organ = activeSystem.organs.find(o => o.id === organId);
  if (!organ) return;

  activeOrgan = organ;

  // 1. Emissive Highlight on Selected Mesh
  if (currentGroup) {
    currentGroup.children.forEach(child => {
      if (child.userData && child.userData.organId) {
        if (child.userData.organId === organId) {
          child.material.emissive.setHex(0x22c55e); // Glowing green accent highlight
          child.material.emissiveIntensity = 0.6;
        } else {
          child.material.emissive.setHex(child.userData.baseColor);
          child.material.emissiveIntensity = 0.12;
        }
      }
    });
  }

  // 2. Smooth Camera Zoom & Target Focus
  const organPos = new THREE.Vector3(organ.pos[0] * 0.5, organ.pos[1] * 0.5 + 0.4, organ.pos[2]);
  targetControlsTarget.copy(organPos);
  targetCameraPos.set(organ.pos[0] * 0.3, organ.pos[1] * 0.5 + 0.6, organ.pos[2] + 4.5);

  // 3. Sync UI Panels (Bilingual)
  renderInfoPanel(organ);
}

function toggleAutoRotate() {
  isAutoRotating = !isAutoRotating;
  const btn = document.getElementById('autoRotateBtn');
  if (btn) btn.classList.toggle('active', isAutoRotating);
}

function toggleWireframe() {
  isWireframe = !isWireframe;
  if (currentGroup) {
    currentGroup.children.forEach(child => {
      if (child.material && child.userData && child.userData.organId) {
        child.material.wireframe = isWireframe;
      }
    });
  }
}

let isHeartbeating = false;
let heartbeatTimer = 0;

function toggleHeartbeat() {
  isHeartbeating = !isHeartbeating;
  const btn = document.getElementById('heartbeatBtn');
  if (btn) {
    btn.classList.toggle('active', isHeartbeating);
    btn.style.background = isHeartbeating ? 'rgba(236,72,153,0.25)' : 'var(--bg-glass)';
  }
  Toast.show(isHeartbeating ? '🫀 Heartbeat Simulation: Contraction Active (72 BPM)' : 'Heartbeat Simulation Paused', 'info', 2000);
}

function reset3DView() {
  if (currentGroup) currentGroup.rotation.set(0, 0, 0);
  targetCameraPos.set(0, 0.6, 4.8);
  targetControlsTarget.set(0, 0.5, 0);
}

function setLanguage(lang) {
  activeLang = lang;
  document.getElementById('langEn')?.classList.toggle('active', lang === 'en');
  document.getElementById('langSi')?.classList.toggle('active', lang === 'si');
  
  // Re-render sidebars and info panel with updated bilingual text
  renderSystemsList();
  renderHeaderAndNav();
  if (activeOrgan) renderInfoPanel(activeOrgan);
}

function renderHeaderAndNav() {
  const headerSub = document.getElementById('anatomyHeaderSub');
  if (headerSub) {
    headerSub.textContent = activeLang === 'si'
      ? 'අන්තර්ක්‍රියාකාරී 3D දේහ පද්ධති - ශ්‍රී ලංකා උසස් පෙළ ජීව විද්‍යාව (5 වන ඒකකය)'
      : 'Interactive 3D Anatomy Visualizer — Sri Lanka A/L Biology (Unit 5 Resource Book)';
  }
}

function renderSystemsList() {
  const container = document.getElementById('systemsList');
  if (!container) return;

  container.innerHTML = ORGAN_SYSTEMS_DATA.map(sys => {
    const isActive = activeSystem?.id === sys.id;
    return `
      <div class="system-card ${isActive ? 'active' : ''}" onclick="loadSystem('${sys.id}')">
        <div class="system-icon icon-box-${sys.color}">
          <i class="fa-solid ${sys.icon}"></i>
        </div>
        <div class="system-info">
          <div class="system-title-en">${sys.name[activeLang]}</div>
          <div class="system-title-si">${sys.name[activeLang === 'en' ? 'si' : 'en']}</div>
        </div>
      </div>`;
  }).join('');
}

function renderInfoPanel(organ) {
  activeOrgan = organ;
  const titleEl = document.getElementById('infoTitle');
  const refEl = document.getElementById('resourceRef');
  const chipContainer = document.getElementById('organChips');
  const descEl = document.getElementById('infoDesc');

  if (titleEl) {
    titleEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <div>
          <div class="info-title-en">${activeSystem.name[activeLang]}</div>
          <div class="info-title-si"><i class="fa-solid fa-location-crosshairs" style="color:var(--accent-green);margin-right:6px;"></i>${organ.name[activeLang]}</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="BioAudio.speak('${organ.name[activeLang].replace(/'/g, "\\'")}', '${activeLang}')" title="Listen Pronunciation">
          <i class="fa-solid fa-volume-high" style="color:var(--accent-teal);"></i> 🔊
        </button>
      </div>`;
  }

  if (refEl) refEl.textContent = activeSystem.resourceRef;

  if (chipContainer) {
    chipContainer.innerHTML = activeSystem.organs.map(o => `
      <div class="organ-chip ${o.id === organ.id ? 'active' : ''}" onclick="selectOrgan('${o.id}')">
        ${o.name[activeLang]}
      </div>`).join('');
  }

  if (descEl) {
    descEl.innerHTML = `
      <div style="margin-bottom:14px;color:var(--text-secondary);">${activeSystem.description[activeLang]}</div>
      <div class="detail-box">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <h4 style="margin:0;">🔬 ${organ.name[activeLang]} - ${activeLang === 'si' ? 'ප්‍රධාන කෘත්‍යයන්' : 'Key Functions'}</h4>
          <button class="btn btn-secondary btn-sm" style="padding:2px 8px;font-size:0.75rem;" onclick="BioAudio.speak('${organ.name[activeLang].replace(/'/g, "\\'")} - ${organ.info[activeLang].replace(/'/g, "\\'")}', '${activeLang}')">
            <i class="fa-solid fa-volume-high"></i> Read Text
          </button>
        </div>
        <p>${organ.info[activeLang]}</p>
      </div>`;
  }
}
