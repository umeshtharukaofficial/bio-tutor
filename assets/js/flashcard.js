// ===================================================
// BIO TUTOR — FLASHCARD DATA
// ===================================================

const FLASHCARD_DECKS = [
  {
    id: 'cell-organelles',
    title: 'Cell Organelles',
    topic: 'g12-u1',
    color: 'green',
    description: 'Functions of key organelles',
    cards: [
      {
        id: 'fc001',
        term: 'Mitochondria',
        definition: 'The site of aerobic cellular respiration. Produces ATP via the Krebs cycle and oxidative phosphorylation. Has a double membrane with folded inner membrane called cristae.',
        example: 'Muscle cells during exercise have many mitochondria to meet high energy demands.',
      },
      {
        id: 'fc002',
        term: 'Ribosomes',
        definition: 'Site of protein synthesis. Made of rRNA and proteins. Found free in cytoplasm or attached to rough endoplasmic reticulum. Prokaryotes have smaller 70S ribosomes; eukaryotes have 80S.',
        example: 'Insulin (a protein hormone) is synthesised on ribosomes of pancreatic β cells.',
      },
      {
        id: 'fc003',
        term: 'Golgi Apparatus',
        definition: 'Processes, modifies, and packages proteins from the ER for secretion or internal use. Adds carbohydrate groups to form glycoproteins. Produces lysosomes.',
        example: 'Digestive enzymes like amylase are processed by the Golgi before secretion.',
      },
      {
        id: 'fc004',
        term: 'Chloroplast',
        definition: 'Site of photosynthesis. Contains thylakoid membranes (with chlorophyll) for light reactions and stroma for the Calvin cycle (dark reactions). Has double outer membrane.',
        example: 'Found in green plant cells like palisade mesophyll cells in leaves.',
      },
      {
        id: 'fc005',
        term: 'Lysosome',
        definition: 'Membrane-bound vesicle containing hydrolytic (digestive) enzymes. Breaks down old organelles (autophagy), pathogens, and cellular debris. Maintains acidic pH (~5).',
        example: 'White blood cells use lysosomes to destroy engulfed bacteria.',
      },
      {
        id: 'fc006',
        term: 'Endoplasmic Reticulum (ER)',
        definition: 'Network of membranes in the cytoplasm. Rough ER (with ribosomes) produces proteins for secretion. Smooth ER synthesises lipids and detoxifies substances.',
        example: 'Liver cells have abundant smooth ER for lipid synthesis and drug detoxification.',
      },
      {
        id: 'fc007',
        term: 'Nucleus',
        definition: 'Contains the cell\'s genetic material (DNA) enclosed in a double nuclear envelope with nuclear pores. The nucleolus inside produces ribosomal RNA (rRNA).',
        example: 'The nucleus is absent in mature red blood cells, which cannot synthesise proteins.',
      },
    ],
  },
  {
    id: 'genetics-terms',
    title: 'Genetics Terminology',
    topic: 'g13-u6',
    color: 'purple',
    description: 'Essential genetics vocabulary',
    cards: [
      {
        id: 'fc010',
        term: 'Allele',
        definition: 'Alternative forms of a gene that occur at the same locus on homologous chromosomes. May be dominant or recessive. An individual can have at most two alleles for a given gene (diploid).',
        example: 'The gene for flower colour in peas has two alleles: purple (P) and white (p).',
      },
      {
        id: 'fc011',
        term: 'Genotype',
        definition: 'The genetic makeup of an organism — the specific alleles present. Expressed using symbols (e.g., TT, Tt, tt). The genotype determines the phenotype (expressed traits).',
        example: 'Tt is the genotype of a heterozygous tall pea plant.',
      },
      {
        id: 'fc012',
        term: 'Phenotype',
        definition: 'The observable characteristics of an organism resulting from its genotype and environment. Two organisms can have different genotypes but the same phenotype.',
        example: 'Both TT and Tt pea plants have the same "tall" phenotype despite different genotypes.',
      },
      {
        id: 'fc013',
        term: 'Codominance',
        definition: 'Both alleles in a heterozygote are fully expressed, and neither is dominant over the other. Both traits appear simultaneously in the phenotype.',
        example: 'ABO blood group: In blood type AB, both I^A and I^B alleles are expressed.',
      },
      {
        id: 'fc014',
        term: 'Mutation',
        definition: 'A permanent change in the DNA sequence. Can be a point mutation (single base change), frameshift (insertion/deletion), or chromosomal mutation. May be spontaneous or induced by mutagens.',
        example: 'Sickle cell anaemia is caused by a point mutation: glutamate → valine in haemoglobin.',
      },
      {
        id: 'fc015',
        term: 'Crossing Over',
        definition: 'Exchange of DNA segments between non-sister chromatids of homologous chromosomes during Prophase I of meiosis. Creates new allele combinations, increasing genetic variation.',
        example: 'If genes A and B are on the same chromosome, crossing over can separate them onto different chromosomes.',
      },
    ],
  },
  {
    id: 'enzyme-terminology',
    title: 'Enzyme Terminology',
    topic: 'g12-u2',
    color: 'teal',
    description: 'Enzyme structure, function, and inhibition',
    cards: [
      {
        id: 'fc020',
        term: 'Active Site',
        definition: 'The specific region on an enzyme where the substrate binds. Has a complementary shape to the substrate (induced fit model). Made of specific amino acids that form temporary bonds with the substrate.',
        example: 'The active site of amylase is specifically shaped to bind starch (substrate).',
      },
      {
        id: 'fc021',
        term: 'Denaturation',
        definition: 'Permanent change in enzyme shape (tertiary/quaternary structure) due to extreme pH or high temperature. Breaks hydrogen bonds and disrupts the active site, so substrate can no longer bind.',
        example: 'Boiling an egg denatures egg white proteins — this change is irreversible.',
      },
      {
        id: 'fc022',
        term: 'Competitive Inhibition',
        definition: 'A molecule similar in shape to the substrate binds to the active site, blocking substrate access. Effect is reversible and overcome by increasing substrate concentration.',
        example: 'Malonate competes with succinate for the active site of succinate dehydrogenase.',
      },
      {
        id: 'fc023',
        term: 'Non-Competitive Inhibition',
        definition: 'An inhibitor binds to an allosteric site (not the active site), changing the enzyme\'s shape and reducing its activity. Cannot be overcome by increasing substrate concentration.',
        example: 'Heavy metal ions (Pb²⁺, Hg²⁺) can act as non-competitive inhibitors.',
      },
      {
        id: 'fc024',
        term: 'Induced Fit Model',
        definition: 'The active site changes shape slightly to accommodate the substrate — the enzyme flexes around the substrate. Replaced the earlier "lock and key" model for better accuracy.',
        example: 'Hexokinase changes conformation when glucose binds, excluding water from the reaction.',
      },
    ],
  },
  {
    id: 'ecology-terms',
    title: 'Ecology Essentials',
    topic: 'g13-u8',
    color: 'green',
    description: 'Ecosystem and environmental biology terms',
    cards: [
      {
        id: 'fc030',
        term: 'Trophic Level',
        definition: 'The position an organism occupies in a food chain. Producers are at level 1, primary consumers at level 2, etc. Energy is lost (~90%) between each level through heat and respiration.',
        example: 'Grass (level 1) → Rabbit (level 2) → Fox (level 3) → Eagle (level 4).',
      },
      {
        id: 'fc031',
        term: 'Ecological Succession',
        definition: 'The gradual change in species composition of a community over time. Primary succession starts on bare rock (e.g., after volcanic eruption); secondary succession follows after disturbance (e.g., forest fire).',
        example: 'Lichens grow on bare rock → mosses → ferns → shrubs → forest (primary succession).',
      },
      {
        id: 'fc032',
        term: 'Carrying Capacity (K)',
        definition: 'The maximum population size that an environment can sustainably support given available resources (food, water, space). Population growth slows as it approaches K (logistic growth).',
        example: 'A pond can support only a limited number of fish — the carrying capacity of that pond.',
      },
      {
        id: 'fc033',
        term: 'Nitrification',
        definition: 'Stage of the nitrogen cycle where ammonia (NH₃) is oxidised to nitrites (NO₂⁻) then nitrates (NO₃⁻) by nitrifying bacteria (Nitrosomonas and Nitrobacter). Makes nitrogen available for plants.',
        example: 'NH₄⁺ → Nitrosomonas → NO₂⁻ → Nitrobacter → NO₃⁻ (absorbed by plant roots).',
      },
    ],
  },
  {
    id: 'biotechnology-terms',
    title: 'Biotechnology Key Terms',
    topic: 'g13-u10',
    color: 'teal',
    description: 'Genetic engineering and molecular techniques',
    cards: [
      {
        id: 'fc040',
        term: 'Restriction Endonuclease',
        definition: 'Bacterial enzymes that cut DNA at specific palindromic recognition sequences (4-8 base pairs). Cut creates "sticky ends" (overhang) or blunt ends. Used to cut genes and vectors in cloning.',
        example: 'EcoRI recognises GAATTC and cuts between G and A on each strand.',
      },
      {
        id: 'fc041',
        term: 'Plasmid',
        definition: 'Small, circular, self-replicating DNA molecule found in bacteria. Used as vectors in genetic engineering to carry foreign genes into host cells. Contains origin of replication and usually antibiotic-resistance genes.',
        example: 'The pUC19 plasmid is commonly used as a cloning vector in E. coli.',
      },
      {
        id: 'fc042',
        term: 'PCR (Polymerase Chain Reaction)',
        definition: 'Technique to amplify a specific DNA sequence exponentially in vitro. Requires: template DNA, primers, Taq polymerase, free nucleotides, and thermocycler. Produces millions of copies from a tiny sample.',
        example: 'PCR is used in forensic DNA fingerprinting from tiny crime scene samples.',
      },
      {
        id: 'fc043',
        term: 'Gel Electrophoresis',
        definition: 'Technique to separate DNA (or protein) fragments by size using an electric field through agarose gel. Smaller fragments move further. Used to analyse PCR products and DNA fingerprints.',
        example: 'DNA fragments of different sizes appear as separate bands at different positions on gel.',
      },
    ],
  },
];

// Helper: Get deck by id
function getDeckById(id) {
  return FLASHCARD_DECKS.find(d => d.id === id);
}

// Helper: Get all cards across all decks
function getAllFlashcards() {
  return FLASHCARD_DECKS.flatMap(deck => deck.cards.map(c => ({ ...c, deckId: deck.id, deckTitle: deck.title })));
}
