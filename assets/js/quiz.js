// ===================================================
// BIO TUTOR — BUILT-IN MCQ QUESTION BANK
// ===================================================

const QUESTION_BANK = [

  // ─── UNIT 1: CELL BIOLOGY ───
  {
    id: 'q001', topic: 'g12-u1', difficulty: 'easy',
    question: 'Which organelle is responsible for producing energy (ATP) through cellular respiration?',
    options: { A: 'Ribosome', B: 'Mitochondria', C: 'Golgi apparatus', D: 'Vacuole' },
    answer: 'B',
    explanation: 'The **mitochondria** is the site of aerobic respiration. It produces ATP via the Krebs cycle and oxidative phosphorylation. It is often called the "powerhouse of the cell".',
  },
  {
    id: 'q002', topic: 'g12-u1', difficulty: 'medium',
    question: 'Which process moves substances from a region of LOW concentration to HIGH concentration?',
    options: { A: 'Diffusion', B: 'Osmosis', C: 'Active transport', D: 'Facilitated diffusion' },
    answer: 'C',
    explanation: '**Active transport** moves substances against the concentration gradient (low → high). It requires energy (ATP) and specific carrier proteins, unlike passive processes.',
  },
  {
    id: 'q003', topic: 'g12-u1', difficulty: 'easy',
    question: 'What is the main difference between prokaryotic and eukaryotic cells?',
    options: {
      A: 'Prokaryotes have a cell wall; eukaryotes do not',
      B: 'Eukaryotes have a membrane-bound nucleus; prokaryotes do not',
      C: 'Prokaryotes have mitochondria; eukaryotes do not',
      D: 'Eukaryotes are always unicellular; prokaryotes are multicellular',
    },
    answer: 'B',
    explanation: 'The key distinction is the **membrane-bound nucleus**. Eukaryotes have DNA enclosed in a nuclear envelope, while prokaryotes have a nucleoid region with no membrane surrounding the DNA.',
  },
  {
    id: 'q004', topic: 'g12-u1', difficulty: 'medium',
    question: 'According to the fluid mosaic model, which component gives the cell membrane its selective permeability?',
    options: { A: 'Cholesterol', B: 'Glycolipids', C: 'Phospholipid bilayer', D: 'Glycoproteins' },
    answer: 'C',
    explanation: 'The **phospholipid bilayer** forms the basic structure of the membrane. Hydrophilic heads face outward while hydrophobic tails form an internal barrier, making the membrane selectively permeable to lipid-soluble substances.',
  },
  {
    id: 'q005', topic: 'g12-u1', difficulty: 'hard',
    question: 'A plant cell is placed in a hypertonic solution. What term describes the state of the cell after water loss causes the membrane to pull away from the cell wall?',
    options: { A: 'Turgid', B: 'Lysed', C: 'Plasmolysed', D: 'Crenated' },
    answer: 'C',
    explanation: '**Plasmolysis** occurs when a plant cell loses water by osmosis in a hypertonic solution. The protoplast (cell contents) shrinks and the cell membrane pulls away from the cell wall. (Crenation refers to animal cells.)',
  },

  // ─── UNIT 2: BIOCHEMISTRY ───
  {
    id: 'q006', topic: 'g12-u2', difficulty: 'easy',
    question: 'Which type of bond joins amino acids together to form a polypeptide chain?',
    options: { A: 'Hydrogen bond', B: 'Ionic bond', C: 'Peptide bond', D: 'Disulfide bond' },
    answer: 'C',
    explanation: '**Peptide bonds** are covalent bonds formed between the amino group (-NH₂) of one amino acid and the carboxyl group (-COOH) of another during condensation reactions.',
  },
  {
    id: 'q007', topic: 'g12-u2', difficulty: 'medium',
    question: 'An enzyme-catalysed reaction has its rate halved when a competitive inhibitor is added. What can restore the original rate?',
    options: {
      A: 'Increasing temperature to 50°C',
      B: 'Increasing substrate concentration',
      C: 'Decreasing pH',
      D: 'Adding a non-competitive inhibitor',
    },
    answer: 'B',
    explanation: 'A **competitive inhibitor** competes with the substrate for the active site. Increasing substrate concentration outcompetes the inhibitor for binding, restoring enzyme activity. This is the key feature of competitive inhibition.',
  },
  {
    id: 'q008', topic: 'g12-u2', difficulty: 'easy',
    question: 'Starch, glycogen, and cellulose are all polymers of which monomer?',
    options: { A: 'Fructose', B: 'Glucose', C: 'Galactose', D: 'Ribose' },
    answer: 'B',
    explanation: '**Glucose** is the monomer of starch (plant storage), glycogen (animal storage), and cellulose (plant cell wall). The difference lies in how glucose units are linked (α or β glycosidic bonds).',
  },
  {
    id: 'q009', topic: 'g12-u2', difficulty: 'medium',
    question: 'Which statement correctly describes the difference between DNA and RNA?',
    options: {
      A: 'DNA contains uracil; RNA contains thymine',
      B: 'RNA is double-stranded; DNA is single-stranded',
      C: 'DNA contains deoxyribose; RNA contains ribose sugar',
      D: 'RNA contains adenine; DNA does not',
    },
    answer: 'C',
    explanation: '**DNA** uses deoxyribose sugar and contains thymine. **RNA** uses ribose sugar and contains uracil instead of thymine. Both contain adenine, guanine, and cytosine.',
  },

  // ─── UNIT 3: CELL DIVISION ───
  {
    id: 'q010', topic: 'g12-u3', difficulty: 'easy',
    question: 'What is the correct order of phases in mitosis?',
    options: {
      A: 'Metaphase → Prophase → Anaphase → Telophase',
      B: 'Prophase → Metaphase → Anaphase → Telophase',
      C: 'Anaphase → Metaphase → Prophase → Telophase',
      D: 'Telophase → Prophase → Metaphase → Anaphase',
    },
    answer: 'B',
    explanation: 'The correct sequence is **PMAT**: Prophase (chromatin condenses), Metaphase (chromosomes align), Anaphase (chromatids separate), Telophase (nuclear envelopes reform). Memory tip: "People Meet And Talk".',
  },
  {
    id: 'q011', topic: 'g12-u3', difficulty: 'medium',
    question: 'Crossing over during meiosis results in:',
    options: {
      A: 'Identical daughter cells',
      B: 'Increased genetic variation through recombination',
      C: 'Reduction of chromosome number to haploid',
      D: 'Duplication of chromosomes',
    },
    answer: 'B',
    explanation: '**Crossing over** (recombination) occurs during Prophase I of meiosis when homologous chromosomes exchange segments. This creates new allele combinations, increasing genetic variation — essential for evolution.',
  },

  // ─── UNIT 6: GENETICS ───
  {
    id: 'q012', topic: 'g13-u6', difficulty: 'easy',
    question: 'In a monohybrid cross between two heterozygous parents (Tt × Tt), what is the expected phenotypic ratio?',
    options: { A: '1:2:1', B: '3:1', C: '1:1', D: '9:3:3:1' },
    answer: 'B',
    explanation: 'A **Tt × Tt** cross produces TT : Tt : tt in a **1:2:1 genotypic ratio**. Since T is dominant, TT and Tt show the dominant phenotype, giving a **3:1 phenotypic ratio** (3 dominant : 1 recessive).',
  },
  {
    id: 'q013', topic: 'g13-u6', difficulty: 'medium',
    question: 'A woman is a carrier for colour blindness (X-linked recessive). Her husband has normal vision. What percentage of their sons will be colour-blind?',
    options: { A: '0%', B: '25%', C: '50%', D: '100%' },
    answer: 'C',
    explanation: 'Mother: X^N X^n (carrier). Father: X^N Y. Sons receive the Y from father and either X^N or X^n from mother. **50% of sons** will receive X^n and be colour-blind (X^n Y). Daughters cannot be colour-blind here.',
  },
  {
    id: 'q014', topic: 'g13-u6', difficulty: 'hard',
    question: 'During transcription, which enzyme catalyses the synthesis of mRNA from the DNA template?',
    options: { A: 'DNA polymerase', B: 'Helicase', C: 'RNA polymerase', D: 'Ligase' },
    answer: 'C',
    explanation: '**RNA polymerase** binds to the promoter region of DNA, unwinds the double helix, and synthesises mRNA in the 5\'→3\' direction using the template strand. DNA polymerase is used in replication, not transcription.',
  },

  // ─── UNIT 7: EVOLUTION ───
  {
    id: 'q015', topic: 'g13-u7', difficulty: 'medium',
    question: 'According to the Hardy-Weinberg principle, allele frequencies in a population remain constant if:',
    options: {
      A: 'Natural selection is occurring',
      B: 'The population is large with random mating and no selection/mutation/migration',
      C: 'Genetic drift is present',
      D: 'The population is small and isolated',
    },
    answer: 'B',
    explanation: 'The **Hardy-Weinberg equilibrium** requires: large population, random mating, no natural selection, no mutation, and no gene flow (migration). Real populations rarely meet all conditions — evolution is the norm!',
  },

  // ─── UNIT 8: ECOLOGY ───
  {
    id: 'q016', topic: 'g13-u8', difficulty: 'easy',
    question: 'Which trophic level contains the highest amount of energy in a food chain?',
    options: { A: 'Tertiary consumers', B: 'Secondary consumers', C: 'Primary consumers', D: 'Producers' },
    answer: 'D',
    explanation: '**Producers (plants)** receive energy directly from the sun. Only about 10% of energy is transferred between trophic levels, so producers contain the most energy. The pyramid of energy widens at the base.',
  },
  {
    id: 'q017', topic: 'g13-u8', difficulty: 'medium',
    question: 'In the nitrogen cycle, which type of bacteria convert nitrates back into nitrogen gas (N₂)?',
    options: { A: 'Nitrifying bacteria', B: 'Nitrogen-fixing bacteria', C: 'Denitrifying bacteria', D: 'Decomposers' },
    answer: 'C',
    explanation: '**Denitrifying bacteria** (e.g., Pseudomonas) convert nitrates (NO₃⁻) → nitrites → nitrogen gas (N₂) through anaerobic respiration. This returns N₂ to the atmosphere. Nitrifying bacteria do the reverse.',
  },

  // ─── UNIT 9: MICROBIOLOGY ───
  {
    id: 'q018', topic: 'g13-u9', difficulty: 'easy',
    question: 'What is the main difference between antibiotics and antivirals?',
    options: {
      A: 'Antibiotics kill viruses; antivirals kill bacteria',
      B: 'Antibiotics target bacterial structures; antivirals target viral replication processes',
      C: 'Antibiotics boost immunity; antivirals directly kill pathogens',
      D: 'There is no significant difference',
    },
    answer: 'B',
    explanation: '**Antibiotics** target structures unique to bacteria (cell wall, ribosomes, DNA gyrase). They are ineffective against viruses since viruses lack these structures. **Antivirals** inhibit viral replication mechanisms like reverse transcriptase.',
  },
  {
    id: 'q019', topic: 'g13-u9', difficulty: 'medium',
    question: 'During the adaptive immune response, which cells produce antibodies?',
    options: { A: 'Cytotoxic T cells', B: 'Natural killer cells', C: 'Plasma cells (effector B cells)', D: 'Macrophages' },
    answer: 'C',
    explanation: '**Plasma cells** are differentiated B lymphocytes that produce large amounts of specific antibodies. When a B cell encounters its matching antigen, it is activated and differentiates into plasma cells (antibody-secreting) and memory B cells.',
  },

  // ─── UNIT 10: BIOTECHNOLOGY ───
  {
    id: 'q020', topic: 'g13-u10', difficulty: 'easy',
    question: 'What is the purpose of PCR (Polymerase Chain Reaction)?',
    options: {
      A: 'To separate DNA fragments by size',
      B: 'To amplify (make many copies of) a specific DNA sequence',
      C: 'To insert genes into a host organism',
      D: 'To sequence the entire human genome',
    },
    answer: 'B',
    explanation: '**PCR** amplifies specific DNA sequences exponentially. Starting from a small sample, billions of copies are made through repeated cycles of denaturation (94°C), annealing (~55°C), and extension (72°C) using Taq polymerase.',
  },
  {
    id: 'q021', topic: 'g13-u10', difficulty: 'medium',
    question: 'Which enzymes are used to cut DNA at specific recognition sequences in recombinant DNA technology?',
    options: { A: 'DNA ligase', B: 'Restriction endonucleases', C: 'DNA polymerase', D: 'RNA polymerase' },
    answer: 'B',
    explanation: '**Restriction endonucleases** (restriction enzymes) cut DNA at specific palindromic sequences, creating "sticky ends" or blunt ends. DNA ligase is then used to join pieces. Together they allow insertion of foreign genes into vectors.',
  },
  {
    id: 'q022', topic: 'g13-u10', difficulty: 'hard',
    question: 'In CRISPR-Cas9 gene editing, what role does the guide RNA (gRNA) play?',
    options: {
      A: 'It synthesises new DNA strands',
      B: 'It digests the target DNA',
      C: 'It directs the Cas9 enzyme to the specific target DNA sequence',
      D: 'It translates the edited gene into protein',
    },
    answer: 'C',
    explanation: 'The **guide RNA (gRNA)** is complementary to the target DNA sequence. It acts as a GPS, directing the Cas9 endonuclease to the precise location in the genome. Cas9 then cuts both strands of the DNA at that site.',
  },

  // ─── UNIT 5: ANIMAL FORM ───
  {
    id: 'q023', topic: 'g12-u5', difficulty: 'easy',
    question: 'What structure increases the surface area of the small intestine for maximum absorption?',
    options: { A: 'Lacteals', B: 'Villi and microvilli', C: 'Peristaltic muscles', D: 'Goblet cells' },
    answer: 'B',
    explanation: '**Villi** are finger-like projections, and **microvilli** (brush border) on villi cells create a greatly increased surface area for nutrient absorption. A single human small intestine can have a surface area of ~200 m².',
  },
  {
    id: 'q024', topic: 'g12-u5', difficulty: 'medium',
    question: 'During which phase of the cardiac cycle does the ventricles contract and pump blood out?',
    options: { A: 'Atrial systole', B: 'Diastole', C: 'Ventricular systole', D: 'Atrial diastole' },
    answer: 'C',
    explanation: '**Ventricular systole** is when the ventricles contract (squeeze), increasing pressure and pumping blood into the aorta and pulmonary artery. The AV valves close (causing the "lub" sound) and the semilunar valves open.',
  },
  {
    id: 'q025', topic: 'g12-u4', difficulty: 'medium',
    question: 'In the light-dependent reactions of photosynthesis, which molecule donates electrons to replace those lost by chlorophyll?',
    options: { A: 'NADPH', B: 'ATP', C: 'Water (H₂O)', D: 'Carbon dioxide (CO₂)' },
    answer: 'C',
    explanation: '**Water (H₂O)** is split by photolysis in Photosystem II, releasing O₂ (as a byproduct), H⁺ ions, and electrons that replace those lost from excited chlorophyll. The O₂ we breathe comes directly from this water-splitting.',
  },
];

// Helper: Get questions by topic
function getQuestionsByTopic(topicId) {
  return QUESTION_BANK.filter(q => q.topic === topicId);
}

// Helper: Shuffle array
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper: Get random questions
function getRandomQuestions(count = 10, topicId = null) {
  let pool = topicId ? getQuestionsByTopic(topicId) : [...QUESTION_BANK];
  pool = shuffleArray(pool);
  return pool.slice(0, Math.min(count, pool.length));
}
