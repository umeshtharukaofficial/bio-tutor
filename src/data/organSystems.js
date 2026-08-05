// Organ Systems Data — shared for React components
// Sri Lanka A/L Biology — Unit 5 (Animal Form & Function)
// All 5 major systems with bilingual EN/SI labels

export const ORGAN_SYSTEMS_DATA = [
  {
    id: 'digestive',
    icon: 'fa-utensils',
    color: 'orange',
    name: { en: 'Digestive System', si: 'ජීරණ පද්ධතිය' },
    resourceRef: 'Unit 5 - Section 5.1: Nutrition & Human Digestive System',
    modelPath: '/models/digestive.glb',
    description: {
      en: 'Breaks down food mechanically and chemically into absorbable nutrients, absorbing water and eliminating indigestible wastes.',
      si: 'ආහාර යාන්ත්‍රිකව හා රසායනිකව ජීර්ණය කර පෝෂක අවශෝෂණය කිරීම, ජලය අවශෝෂණය සහ නොදිරවූ ද්‍රව්‍ය මල ලෙස පිටකිරීම සිදුකරයි.'
    },
    organs: [
      { id: 'mouth_pharynx', name: { en: 'Mouth & Pharynx', si: 'මුඛය සහ ග්‍රසනිකාව' }, pos: [0, 2.05, 0.05],
        info: { en: 'Mechanical digestion by teeth; chemical digestion of starch by salivary amylase (ptyalin).', si: 'දත් මගින් යාන්ත්‍රික ජීර්ණය; කෙළ ඇමයිලේස් (ප්ටයලින්) මගින් පිෂ්ඨයේ රසායනික ජීර්ණය ඇරඹේ.' } },
      { id: 'esophagus', name: { en: 'Esophagus', si: 'අන්නස්‍රෝතය' }, pos: [0, 1.1, -0.02],
        info: { en: 'Muscular tube transporting food bolus to stomach via peristalsis.', si: 'ක්‍රමාකුංචන චලන (Peristalsis) මගින් ආහාර ගිලුණු පිණ්ඩය ආමාශය වෙත ගෙන යන පේෂිමය නාලය.' } },
      { id: 'stomach', name: { en: 'Stomach', si: 'ආමාශය' }, pos: [0.25, 0.2, 0.1],
        info: { en: 'Stores food; secretes gastric juice (HCl & Pepsin) for protein digestion; forms chyme.', si: 'ආහාර තැන්පත් කිරීම; ප්‍රෝටීන ජීර්ණය සඳහා ආමාශයික යුෂ (HCl සහ පෙප්සින්) ශ්‍රාවය; කයිම් සෑදීම.' } },
      { id: 'liver', name: { en: 'Liver & Gallbladder', si: 'අක්මාව සහ පිතාශය' }, pos: [-0.35, 0.55, 0.1],
        info: { en: 'Produces bile for fat emulsification; stores glycogen; detoxifies harmful metabolic waste.', si: 'ස්නේහ පායසීකරණයට පිත නිපදවීම; ග්ලයිකොජන් තැන්පත් කිරීම; විෂහරණය සිදුකිරීම.' } },
      { id: 'small_intestine', name: { en: 'Small Intestine', si: 'කුඩා අන්ත්‍රය' }, pos: [0, -0.1, 0.15],
        info: { en: 'Primary site of digestion and nutrient absorption via microvilli brush border.', si: 'ආහාර ජීර්ණය සම්පූර්ණ වීම සහ ක්ෂුද්‍ර අංකුර (Microvilli) හරහා පෝෂක අවශෝෂණය වන ප්‍රධාන ස්ථානය.' } },
      { id: 'large_intestine', name: { en: 'Large Intestine & Rectum', si: 'මහා අන්ත්‍රය සහ ගුද මාර්ගය' }, pos: [0, -0.48, 0.08],
        info: { en: 'Absorbs water and mineral salts; forms feces for egestion.', si: 'ජලය සහ ඛනිජ ලවණ අවශෝෂණය; මල ද්‍රව්‍ය සාදා ගුදය හරහා පිටකිරීම (බහිෂ්කරණය).' } },
    ]
  },
  {
    id: 'circulatory',
    icon: 'fa-heart-pulse',
    color: 'green',
    name: { en: 'Circulatory System', si: 'පරිසංසරණ පද්ධතිය' },
    resourceRef: 'Unit 5 - Section 5.2: Blood Circulation & Heart Structure',
    modelPath: '/models/circulatory.glb',
    description: {
      en: 'Transports oxygen, nutrients, hormones, and metabolic wastes throughout the body via blood and the heart pump.',
      si: 'හෘදය සහ රුධිර නාල මගින් ඔක්සිජන්, පෝෂක, හෝමෝන සහ පරිවෘත්තීය අපද්‍රව්‍ය ශරීරය පුරා පරිවහනය කරයි.'
    },
    organs: [
      { id: 'heart', name: { en: 'Heart (4 Chambers)', si: 'හෘදය (කුටීර 4)' }, pos: [0.02, 0.68, 0.15],
        info: { en: '4-chambered muscular pump (2 atria, 2 ventricles). Drives systemic and pulmonary circulation.', si: 'කුටීර 4 කින් යුත් පේෂිමය පම්පය (කර්ණිකා 2, කෝෂිකා 2). මහා පරිසංසරණය සහ පෙනහළු පරිසංසරණය මෙහෙයවයි.' } },
      { id: 'aorta', name: { en: 'Aorta & Arteries', si: 'මහා ධමනිය සහ ධමනි' }, pos: [-0.35, 1.2, 0.12],
        info: { en: 'Carry oxygenated blood away from the heart under high pressure.', si: 'ඔක්සිජනීකෘත රුධිරය අධික පීඩනයක් යටතේ හෘදයේ සිට දේහ පටක වෙත ගෙන යයි.' } },
      { id: 'vena_cava', name: { en: 'Vena Cava & Veins', si: 'මහා ශිරා සහ ශිරා' }, pos: [0.2, 1.15, -0.02],
        info: { en: 'Return deoxygenated blood to the right atrium of the heart.', si: 'විඔක්සිජනීකෘත රුධිරය නැවත හෘදයේ දකුණු කර්ණිකාව වෙත ගෙන එයි.' } },
    ]
  },
  {
    id: 'respiratory',
    icon: 'fa-lungs',
    color: 'teal',
    name: { en: 'Respiratory System', si: 'ශ්වසන පද්ධතිය' },
    resourceRef: 'Unit 5 - Section 5.3: Gas Exchange & Human Lungs',
    modelPath: '/models/respiratory.glb',
    description: {
      en: 'Facilitates oxygen absorption into blood and carbon dioxide release via alveoli in the lungs.',
      si: 'පෙනහැලිවල ඇල්වීයෝල (Alveoli) හරහා ඔක්සිජන් රුධිරයට ලබා ගැනීම සහ කාබන්ඩයොක්සයිඩ් පිටකිරීම සිදුකරයි.'
    },
    organs: [
      { id: 'nasal_trachea', name: { en: 'Nasal Cavity & Trachea', si: 'නාසා කුහරය සහ ශ්වාසනාලය' }, pos: [0, 1.6, 0.12],
        info: { en: 'Cartilage-ring reinforced tube lined with ciliated epithelium to filter and warm incoming air.', si: 'කාටිලේජ වලලු සහිත, පක්ෂ්මධර අපිච්ඡදයෙන් ලයිනිං වූ වාතය පෙරා උණුසුම් කරන නාලය.' } },
      { id: 'left_lung', name: { en: 'Left Lung (2 Lobes)', si: 'වම් පෙනහැල්ල (ඛණ්ඩිකා 2)' }, pos: [0.44, 0.72, 0.04],
        info: { en: 'Contains bronchioles and millions of alveoli for gas exchange.', si: 'වායු හුවමාරුව සඳහා ශ්වාසනිකා සහ ඇල්වීයෝල මිලියන ගණනක් අඩංගු වේ.' } },
      { id: 'right_lung', name: { en: 'Right Lung (3 Lobes)', si: 'දකුණු පෙනහැල්ල (ඛණ්ඩිකා 3)' }, pos: [-0.44, 0.72, 0.04],
        info: { en: 'Slightly larger than left lung; primary site of O₂ and CO₂ diffusion.', si: 'වම් පෙනහැල්ලට වඩා තරමක් විශාලය; O₂ සහ CO₂ විසරණයේ ප්‍රධාන ස්ථානයයි.' } },
      { id: 'diaphragm', name: { en: 'Diaphragm Muscle', si: 'මහා ප්‍රාචීරය' }, pos: [0, 0.24, 0.08],
        info: { en: 'Dome-shaped muscle below thoracic cavity. Contracts (flattens) during inhalation.', si: 'උරස් කුහරයට පහලින් පිහිටි ගොඩනැගිලි හැඩති පේෂිය. ආශ්වාසයේදී සංකෝචනය වී තැලි වේ.' } },
    ]
  },
  {
    id: 'excretory',
    icon: 'fa-droplet',
    color: 'purple',
    name: { en: 'Excretory System', si: 'බහිස්ස්‍රාවී පද්ධතිය' },
    resourceRef: 'Unit 5 - Section 5.4: Osmoregulation & Urinary System',
    modelPath: '/models/excretory.glb',
    description: {
      en: 'Filters metabolic nitrogenous waste (urea) from blood and maintains body water/salt balance.',
      si: 'රුධිරයෙන් නයිට්‍රජනීය පරිවෘත්තීය අපද්‍රව්‍ය (යූරියා) පෙරා ඉවත් කර ශරීර ජල හා ලවණ සමතුලිතතාව පවත්වා ගනී.'
    },
    organs: [
      { id: 'kidneys', name: { en: 'Kidneys (Renal System)', si: 'වකුගඩු (වෘක්ක)' }, pos: [0, 0.32, -0.07],
        info: { en: 'Contains ~1 million nephrons per kidney. Ultrafiltration, selective reabsorption, and secretion.', si: 'වකුගඩුවක නෙෆ්රෝන (Nephrons) මිලියනයක් පමණ ඇත. අතිපෙරණය, වරණීය නැවත අවශෝෂණය සහ ශ්‍රාවය සිදුකරයි.' } },
      { id: 'ureters', name: { en: 'Ureters', si: 'මූත්‍ර නාල' }, pos: [0, -0.25, 0.0],
        info: { en: 'Ducts transporting urine from renal pelvis to urinary bladder.', si: 'වෘක්ක ශ්‍රෝණියේ සිට මූත්‍රාශය වෙත මූත්‍ර ගෙන යන නාල 2.' } },
      { id: 'bladder', name: { en: 'Urinary Bladder & Urethra', si: 'මූත්‍රාශය සහ මූත්‍ර මාර්ගය' }, pos: [0, -0.65, 0.08],
        info: { en: 'Muscular sac temporarily storing urine before excretion through urethra.', si: 'මූත්‍ර මාර්ගය හරහා පිටකිරීමට පෙර මූත්‍ර තාවකාලිකව ගබඩා කරන පේෂිමය ආශය.' } },
    ]
  },
  {
    id: 'nervous',
    icon: 'fa-brain',
    color: 'purple',
    name: { en: 'Nervous System', si: 'ස්නායු පද්ධතිය' },
    resourceRef: 'Unit 5 - Section 5.5: Neural Control & Reflexes',
    modelPath: '/models/nervous.glb',
    description: {
      en: 'Coordinates fast electrical signaling throughout the body via CNS (Brain & Spinal Cord) and PNS.',
      si: 'මධ්‍යම (මොළය හා සුෂුම්නාව) සහ පරිධීය ස්නායු පද්ධති මගින් වේගවත් විද්‍යුත් සංඥා මගින් දේහ ක්‍රියාකාරකම් සම්බන්ධීකරණය කරයි.'
    },
    organs: [
      { id: 'brain', name: { en: 'Brain (Cerebrum, Cerebellum, Brainstem)', si: 'මොළය (මස්තිෂ්කය, අනුමස්තිෂ්කය, සුෂුම්නා ශීර්ෂකය)' }, pos: [0, 2.5, 0],
        info: { en: 'Control center for perception, memory, involuntary vital functions, and voluntary movements.', si: 'සංවේදන, මතකය, අනෛච්ඡික වැදගත් ක්‍රියා සහ ඓච්ඡික චලන පාලනය කරන ප්‍රධාන මධ්‍යස්ථානය.' } },
      { id: 'spinal_cord', name: { en: 'Spinal Cord', si: 'සුෂුම්නාව' }, pos: [0, 0.5, -0.18],
        info: { en: 'Nerve trunk running through vertebral column; mediates spinal reflex arcs.', si: 'කශේරුකාව තුළින් යන ස්නායු කඳ; සුෂුම්නා ප්‍රතිචාර (Reflex arcs) පාලනය කරයි.' } },
      { id: 'peripheral_nerves', name: { en: 'Peripheral Nerves (Cranial & Spinal)', si: 'පරිධීය ස්නායු (කපාල සහ සුෂුම්නා)' }, pos: [0, 1.0, 0],
        info: { en: 'Network connecting CNS to sensory receptors, skeletal muscles, and visceral organs.', si: 'මධ්‍යම ස්නායු පද්ධතිය සංවේදක, පේෂි සහ අභ්‍යන්තර අංග සමග සම්බන්ධ කරන ස්නායු ජාලය.' } },
    ]
  },
];
