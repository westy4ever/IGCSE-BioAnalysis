// ================================================================
// PART 3: SYLLABUS DATABASE & PARSER (hardcoded 2026-2028 Biology)
// ================================================================
const IGCSE_BIOLOGY_SYLLABUS_2026 = {
    "1.1": { name: "Characteristics of living organisms",
        core: [
            "movement - action by organism causing change of position or place",
            "respiration - chemical reactions in cells that break down nutrient molecules and release energy for metabolism",
            "sensitivity - ability to detect and respond to changes in internal or external environment",
            "growth - permanent increase in size and dry mass",
            "reproduction - processes that make more of the same kind of organism",
            "excretion - removal of waste products of metabolism and substances in excess of requirements",
            "nutrition - taking in of materials for energy, growth and development"
        ],
        supplement: [] },
    "1.2": { name: "Concept and uses of classification systems",
        core: [
            "Organisms can be classified into groups by the features they share",
            "Species - a group of organisms that can reproduce to produce fertile offspring",
            "Binomial system - an internationally agreed system in which the scientific name of an organism is made up of two parts showing the genus and species",
            "Construct and use dichotomous keys based on identifiable features"
        ],
        supplement: [
            "Classification systems aim to reflect evolutionary relationships",
            "Sequences of bases in DNA are used as a means of classification",
            "Organisms sharing a more recent ancestor (are more closely related) have base sequences in DNA that are more similar than those sharing only a distant ancestor"
        ] },
    "1.3": { name: "Features of organisms",
        core: [
            "Main features used to place animals and plants into appropriate kingdoms",
            "Vertebrate groups: mammals, birds, reptiles, amphibians, fish",
            "Arthropod groups: myriapods, insects, arachnids, crustaceans",
            "Classify organisms using these features"
        ],
        supplement: [
            "Five kingdoms: animal, plant, fungus, prokaryote, protoctist",
            "Plant kingdom groups: ferns and flowering plants (dicotyledons and monocotyledons)",
            "Classify organisms using features of five kingdoms and plant groups",
            "Features of viruses: protein coat and genetic material"
        ] },
    "2.1": { name: "Cell structure and organisation",
        core: [
            "State specialised cells and their functions: ciliated cells (mucus movement), root hair cells (absorption), palisade mesophyll cells (photosynthesis), neurones (electrical impulses), red blood cells (oxygen transport), sperm/egg cells (reproduction)",
            "Plant cell structures: cell wall, cell membrane, nucleus, cytoplasm, chloroplasts, ribosomes, mitochondria, vacuoles",
            "New cells produced by division of existing cells",
            "Organisation levels: cell → tissue → organ → organ system → organism"
        ],
        supplement: [] },
    "2.2": { name: "Size of specimens",
        core: [
            "Formula: magnification = image size ÷ actual size",
            "Calculate magnification and size of biological specimens using millimetres as units"
        ],
        supplement: [
            "Convert measurements between millimetres (mm) and micrometres (µm)"
        ] },
    "3.1": { name: "Diffusion",
        core: [
            "Diffusion - net movement of particles from a region of higher concentration to a region of lower concentration (down a concentration gradient), as a result of their random movement",
            "Energy for diffusion comes from the kinetic energy of random movement of molecules and ions",
            "Substances move into and out of cells by diffusion through the cell membrane",
            "Importance of diffusion of gases and solutes in living organisms",
            "Factors affecting diffusion: surface area, temperature, concentration gradient, distance"
        ],
        supplement: [] },
    "3.2": { name: "Osmosis",
        core: [
            "Role of water as a solvent in organisms: digestion, excretion, transport",
            "Water diffuses through partially permeable membranes by osmosis",
            "Water moves into and out of cells by osmosis through the cell membrane",
            "Investigate osmosis using materials such as dialysis tubing",
            "Investigate and describe effects on plant tissues of immersing in solutions of different concentrations",
            "Plants are supported by the pressure of water inside cells pressing outwards on the cell wall"
        ],
        supplement: [
            "Osmosis - net movement of water molecules from a region of higher water potential (dilute solution) to a region of lower water potential (concentrated solution), through a partially permeable membrane",
            "Effects on plant cells: turgid, turgor pressure, plasmolysis, flaccid",
            "Importance of water potential and osmosis in uptake and loss of water by organisms"
        ] },
    "3.3": { name: "Active transport",
        core: [
            "Active transport - movement of particles through a cell membrane from a region of lower concentration to a region of higher concentration (against a concentration gradient), using energy from respiration"
        ],
        supplement: [
            "Importance of active transport: movement of molecules or ions across membranes, including ion uptake by root hairs",
            "Protein carriers move molecules or ions across membrane during active transport"
        ] },
    "4.1": { name: "Biological molecules",
        core: [
            "List chemical elements in carbohydrates (C,H,O), fats (C,H,O) and proteins (C,H,O,N)",
            "State large molecules made from smaller: starch/glycogen/cellulose from glucose; proteins from amino acids; fats/oils from fatty acids and glycerol",
            "Iodine solution - starch (blue-black colour)",
            "Benedict's solution - reducing sugars (brick-red precipitate)",
            "Biuret test - proteins (violet/purple colour)",
            "Ethanol emulsion test - fats and oils (white emulsion)",
            "DCPIP test - vitamin C (decolourises)"
        ],
        supplement: [
            "DNA structure:",
            "Two strands coiled together to form a double helix",
            "Each strand contains chemicals called bases",
            "Bonds between pairs of bases hold strands together",
            "Base pairing: adenine (A) with thymine (T), cytosine (C) with guanine (G)"
        ] },
    "5.1": { name: "Enzymes",
        core: [
            "Catalyst - substance that increases the rate of a chemical reaction and is not changed by the reaction",
            "Enzymes - proteins that are involved in all metabolic reactions, functioning as biological catalysts",
            "Importance of enzymes for reaction rate necessary to sustain life",
            "Enzyme action: active site is complementary to its substrate; products formed",
            "Investigate effect of temperature and pH on enzyme activity; optimum temperature and denaturation"
        ],
        supplement: [
            "Enzyme action: active site, enzyme-substrate complex, substrate and product",
            "Specificity of enzymes: complementary shape and fit of active site with substrate",
            "Temperature effect: kinetic energy, shape and fit, frequency of effective collisions, denaturation",
            "pH effect: shape and fit and denaturation"
        ] },
    "6.1": { name: "Photosynthesis",
        core: [
            "Outline uses of carbohydrates: starch (energy store), cellulose (cell walls), glucose (respiration), sucrose (phloem transport), nectar (insect pollination)",
            "Word equation: carbon dioxide + water → glucose + oxygen, in the presence of light and chlorophyll",
            "Chlorophyll is a green pigment found in chloroplasts",
            "Chlorophyll transfers light energy into energy in chemicals for synthesis of carbohydrates",
            "Mineral ions: nitrate ions for making amino acids; magnesium ions for making chlorophyll",
            "Investigate need for chlorophyll, light and carbon dioxide using appropriate controls",
            "Investigate effects of light intensity, CO₂ concentration and temperature on photosynthesis rate",
            "Investigate effect of light and dark on gas exchange in aquatic plants using hydrogencarbonate indicator"
        ],
        supplement: [
            "Balanced chemical equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
            "Identify and explain limiting factors of photosynthesis in different environmental conditions"
        ] },
    "6.2": { name: "Leaf structure",
        core: [
            "Most leaves have large surface area and are thin - adaptations for photosynthesis",
            "Leaf structures in dicotyledonous plants: chloroplasts, cuticle, guard cells, stomata, upper/lower epidermis, palisade mesophyll, spongy mesophyll, air spaces, vascular bundles, xylem, phloem",
            "Explain how these structures adapt leaves for photosynthesis"
        ],
        supplement: [] },
    "7.1": { name: "Diet",
        core: [
            "State principal dietary sources and importance: carbohydrates (energy), fats/oils (energy storage, insulation), proteins (growth and repair), vitamins C and D (deficiency diseases), calcium (bones and teeth), iron (haemoglobin), fibre (digestion), water (solvent, transport, temperature control)",
            "Balanced diet - contains all nutrients in correct proportions",
            "Deficiency diseases: scurvy (lack of vitamin C), rickets (lack of vitamin D)"
        ],
        supplement: [] },
    "7.2": { name: "Digestive system",
        core: [
            "Identify main digestive system organs: alimentary canal (mouth, oesophagus, stomach, small intestine, large intestine) and associated organs (salivary glands, pancreas, liver, gall bladder)",
            "Describe functions: ingestion, digestion, absorption, assimilation and egestion",
            "Alimentary canal: mouth, oesophagus, stomach, small intestine (duodenum and ileum), large intestine (colon, rectum, anus)",
            "Associated organs: salivary glands, pancreas, liver, gall bladder",
            "Ingestion - taking substances into body",
            "Digestion - breakdown of food",
            "Absorption - movement of nutrients from intestines into blood",
            "Assimilation - uptake and use of nutrients by cells",
            "Egestion - removal of undigested food as faeces"
        ],
        supplement: [] },
    "7.3": { name: "Physical digestion",
        core: [
            "Physical digestion - breakdown of food into smaller pieces without chemical change to food molecules",
            "Increases surface area of food for enzyme action",
            "Types of human teeth: incisors, canines, premolars, molars",
            "Tooth structure: enamel, dentine, pulp, nerves, blood vessels, cement; teeth embedded in bone and gums",
            "Functions of tooth types in physical digestion",
            "Function of stomach in physical digestion (churning)"
        ],
        supplement: [
            "Role of bile in emulsifying fats and oils to increase surface area for chemical digestion"
        ] },
    "7.4": { name: "Chemical digestion",
        core: [
            "Chemical digestion - breakdown of large insoluble molecules into small soluble molecules that can be absorbed",
            "Enzymes and their actions:",
            "Amylase - breaks down starch → simple reducing sugars",
            "Proteases - break down protein → amino acids",
            "Lipase - breaks down fats and oils → fatty acids + glycerol",
            "Sites of secretion and action of these enzymes",
            "Hydrochloric acid in gastric juice: kills harmful microorganisms; provides acidic pH for enzyme activity"
        ],
        supplement: [
            "Starch digestion: amylase breaks down starch → maltose; maltase breaks down maltose → glucose on epithelium of small intestine",
            "Protein digestion: pepsin breaks down protein in acidic stomach; trypsin breaks down protein in alkaline small intestine",
            "Bile is an alkaline mixture that neutralises acidic mixture entering duodenum, providing suitable pH for enzyme action"
        ] },
    "7.5": { name: "Absorption",
        core: [
            "Small intestine is the region where nutrients are absorbed",
            "Most water absorbed from small intestine; some from colon"
        ],
        supplement: [
            "Significance of villi and microvilli in increasing internal surface area of small intestine",
            "Structure of a villus",
            "Roles of capillaries (absorb glucose and amino acids) and lacteals (absorb fatty acids and glycerol)"
        ] },
    "8.1": { name: "Xylem and phloem",
        core: [
            "Xylem functions: transport of water and mineral ions, and support",
            "Phloem functions: transport of sucrose and amino acids",
            "Position of xylem and phloem in sections of roots, stems and leaves of non-woody dicotyledonous plants"
        ],
        supplement: [
            "Xylem vessel structure related to function:",
            "Thick walls with lignin",
            "No cell contents",
            "Cells joined end to end with no cross walls forming continuous tube"
        ] },
    "8.2": { name: "Water uptake",
        core: [
            "Identify root hair cells and state their functions",
            "Large surface area of root hairs increases uptake of water and mineral ions",
            "Pathway of water: root hair cells → root cortex cells → xylem → mesophyll cells",
            "Investigate pathway of water using a suitable stain"
        ],
        supplement: [] },
    "8.3": { name: "Transpiration",
        core: [
            "Transpiration - loss of water vapour from leaves",
            "Water evaporates from surfaces of mesophyll cells into air spaces, then diffuses out through stomata as water vapour",
            "Investigate effects of temperature and wind speed on transpiration rate"
        ],
        supplement: [
            "Water vapour loss related to: large internal surface area of air spaces between mesophyll cells; size and number of stomata",
            "Mechanism of water movement: transpiration pull draws up column of water molecules held together by forces of attraction (cohesion)",
            "Effects of varying temperature, wind speed and humidity on transpiration rate",
            "Explain how and why wilting occurs"
        ] },
    "8.4": { name: "Translocation",
        core: [],
        supplement: [
            "Translocation - movement of sucrose and amino acids in phloem from sources to sinks",
            "Sources - parts of plants that release sucrose or amino acids (e.g., leaves)",
            "Sinks - parts of plants that use or store sucrose or amino acids (e.g., roots, fruits)",
            "Some parts may act as source and sink at different times (e.g., storage organs in spring vs summer)"
        ] },
    "9.1": { name: "Circulatory systems",
        core: [
            "Circulatory system: system of blood vessels with a pump and valves to ensure one-way flow of blood"
        ],
        supplement: [
            "Single circulation of a fish",
            "Double circulation of a mammal",
            "Advantages of double circulation"
        ] },
    "9.2": { name: "Heart",
        core: [
            "Heart structures: muscular wall, septum, left/right ventricles, left/right atria, one-way valves, coronary arteries",
            "Blood pumped away from heart in arteries; returns in veins",
            "Monitoring heart activity: ECG, pulse rate, listening to sounds of valves closing",
            "Investigate effect of physical activity on heart rate",
            "Coronary heart disease: blockage of coronary arteries; risk factors: diet, lack of exercise, stress, smoking, genetic predisposition, age, sex",
            "Roles of diet and exercise in reducing risk"
        ],
        supplement: [
            "Identify atrioventricular and semilunar valves",
            "Explain relative thickness of: muscle walls of left vs right ventricles; atria vs ventricles",
            "Importance of septum separating oxygenated and deoxygenated blood",
            "Describe functioning of heart: contraction of atria and ventricles, action of valves",
            "Explain effect of physical activity on heart rate"
        ] },
    "9.3": { name: "Blood vessels",
        core: [
            "Arteries, veins and capillaries: relative thickness of wall, diameter of lumen, presence of valves in veins",
            "Functions of capillaries",
            "Main blood vessels:",
            "To/from heart: vena cava, aorta, pulmonary artery, pulmonary vein",
            "To/from lungs: pulmonary artery, pulmonary vein",
            "To/from kidney: renal artery, renal vein"
        ],
        supplement: [
            "How structure of arteries and veins relates to blood pressure they transport",
            "How structure of capillaries relates to their functions",
            "Additional vessels: hepatic artery, hepatic veins, hepatic portal vein"
        ] },
    "9.4": { name: "Blood",
        core: [
            "Components of blood: red blood cells, white blood cells, platelets, plasma",
            "Identify red and white blood cells in photomicrographs and diagrams",
            "Red blood cells - transport oxygen, including role of haemoglobin",
            "White blood cells - phagocytosis and antibody production",
            "Platelets - clotting (details not required)",
            "Plasma - transports blood cells, ions, nutrients, urea, hormones, carbon dioxide",
            "Roles of blood clotting: preventing blood loss and entry of pathogens"
        ],
        supplement: [
            "Identify lymphocytes and phagocytes in photomicrographs and diagrams",
            "Lymphocytes - antibody production",
            "Phagocytes - engulfing pathogens by phagocytosis",
            "Clotting process: conversion of fibrinogen to fibrin to form a mesh"
        ] },
    "10.1": { name: "Diseases and immunity",
        core: [
            "Pathogen - disease-causing organism",
            "Transmissible disease - pathogen can be passed from one host to another",
            "Direct contact - including through blood and other body fluids",
            "Indirect - from contaminated surfaces, food, animals, air",
            "Body defences: skin, hairs in nose, mucus, stomach acid, white blood cells",
            "Controlling disease spread: clean water supply, hygienic food preparation, good personal hygiene, waste disposal, sewage treatment"
        ],
        supplement: [
            "Active immunity - defence against pathogen by antibody production in the body",
            "Each pathogen has its own antigens with specific shapes",
            "Antibodies are proteins that bind to antigens leading to direct destruction or marking for destruction by phagocytes",
            "Specific antibodies have complementary shapes which fit specific antigens",
            "Active immunity gained after infection or vaccination",
            "Vaccination process: weakened pathogens/antigens introduced → antigens stimulate immune response → lymphocytes produce antibodies → memory cells produced for long-term immunity",
            "Role of vaccination in controlling disease spread",
            "Passive immunity - short-term defence by antibodies acquired from another individual (across placenta, in breast milk)",
            "Importance of breast-feeding for passive immunity in infants",
            "Memory cells not produced in passive immunity",
            "Cholera: caused by bacterium transmitted in contaminated water; bacterium produces toxin causing secretion of chloride ions into small intestine → osmotic water movement into gut → diarrhoea, dehydration, ion loss"
        ] },
    "11.1": { name: "Gas exchange in humans",
        core: [
            "Features of gas exchange surfaces: large surface area, thin surface, good blood supply, good ventilation with air",
            "Breathing system: lungs, diaphragm, ribs, intercostal muscles, larynx, trachea, bronchi, bronchioles, alveoli and associated capillaries",
            "Investigate differences between inspired and expired air using limewater (test for CO₂)",
            "Differences in composition: oxygen, carbon dioxide, water vapour",
            "Investigate effects of physical activity on rate and depth of breathing"
        ],
        supplement: [
            "Identify internal and external intercostal muscles",
            "Function of cartilage in trachea",
            "Role of ribs, intercostal muscles and diaphragm in producing volume and pressure changes in thorax for ventilation",
            "Explain differences between inspired and expired air",
            "Link between physical activity and breathing: increased CO₂ in blood detected by brain → increased rate and depth of breathing",
            "Role of goblet cells, mucus and ciliated cells in protecting breathing system from pathogens and particles"
        ] },
    "12.1": { name: "Respiration",
        core: [
            "Uses of energy in living organisms: muscle contraction, protein synthesis, cell division, active transport, growth, nerve impulse passage, maintaining constant body temperature",
            "Investigate effect of temperature on respiration in yeast"
        ],
        supplement: [] },
    "12.2": { name: "Aerobic respiration",
        core: [
            "Word equation: glucose + oxygen → carbon dioxide + water"
        ],
        supplement: [
            "Balanced chemical equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O"
        ] },
    "12.3": { name: "Anaerobic respiration",
        core: [
            "Releases much less energy per glucose molecule than aerobic respiration",
            "Word equation (yeast): glucose → alcohol + carbon dioxide",
            "Word equation (muscles during vigorous exercise): glucose → lactic acid"
        ],
        supplement: [
            "Balanced equation (yeast): C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂",
            "Lactic acid builds up in muscles and blood during vigorous exercise causing an oxygen debt",
            "Removing oxygen debt after exercise:",
            "Continuation of fast heart rate to transport lactic acid from muscles to liver",
            "Continuation of deeper/faster breathing to supply oxygen for aerobic respiration of lactic acid"
        ] },
    "13.1": { name: "Excretion in humans",
        core: [
            "Carbon dioxide excreted through lungs",
            "Kidneys excrete urea, excess water and ions",
            "Identify kidneys, ureters, bladder and urethra"
        ],
        supplement: [
            "Kidney structure: cortex and medulla",
            "Nephron structure and function:",
            "Glomerulus - filters water, glucose, urea and ions from blood",
            "Nephron - reabsorbs all glucose, some ions, most water back into blood",
            "Urine formed contains urea, excess water, excess ions",
            "Role of liver in assimilation of amino acids (converting them to proteins)",
            "Urea formed in liver from excess amino acids",
            "Deamination - removal of nitrogen-containing part of amino acids to form urea",
            "Importance of excretion: toxicity of urea"
        ] },
    "14.1": { name: "Coordination and response",
        core: [
            "Electrical impulses travel along neurones",
            "Mammalian nervous system:",
            "Central nervous system (CNS) - brain and spinal cord",
            "Peripheral nervous system (PNS) - nerves outside brain and spinal cord",
            "Role of nervous system: coordination and regulation of body functions",
            "Identify sensory, relay and motor neurones",
            "Reflex arc: receptor → sensory neurone → relay neurone → motor neurone → effector",
            "Reflex action - automatic and rapid integrating and coordinating stimuli with responses of effectors (muscles and glands)",
            "Synapse - junction between two neurones"
        ],
        supplement: [
            "Synapse structure: vesicles containing neurotransmitter molecules, synaptic gap, receptor proteins",
            "Events at synapse:",
            "Impulse stimulates release of neurotransmitter from vesicles into synaptic gap",
            "Neurotransmitter molecules diffuse across gap",
            "Neurotransmitter binds with receptor proteins on next neurone",
            "Impulse stimulated in next neurone",
            "Synapses ensure impulses travel in one direction only"
        ] },
    "14.2": { name: "Sense organs",
        core: [
            "Sense organs - groups of receptor cells responding to specific stimuli: light, sound, touch, temperature, chemicals",
            "Eye structures: cornea, iris, pupil, lens, retina, optic nerve, blind spot",
            "Functions:",
            "Cornea - refracts light",
            "Iris - controls how much light enters pupil",
            "Lens - focuses light onto retina",
            "Retina - contains light receptors, some sensitive to different colours",
            "Optic nerve - carries impulses to brain",
            "Pupil reflex: changes in light intensity cause changes in pupil diameter"
        ],
        supplement: [
            "Pupil reflex mechanism: antagonistic action of circular (constrict) and radial (dilate) muscles in iris",
            "Accommodation for near and distant objects: contraction/relaxation of ciliary muscles, tension in suspensory ligaments, shape of lens, refraction of light",
            "Distribution of rods and cones in retina",
            "Rods - greater sensitivity for night vision",
            "Cones - three types absorbing different colours for colour vision",
            "Position and function of fovea"
        ] },
    "14.3": { name: "Hormones",
        core: [
            "Hormone - chemical substance produced by a gland, carried by blood, alters activity of specific target organs",
            "Endocrine glands and hormones:",
            "Adrenal glands - adrenaline",
            "Pancreas - insulin",
            "Testes - testosterone",
            "Ovaries - oestrogen",
            "Adrenaline effects in 'fight or flight': increased breathing rate, increased heart rate, increased pupil diameter",
            "Compare nervous vs hormonal control: speed of action, duration of effect"
        ],
        supplement: [
            "Glucagon secreted by pancreas",
            "Role of adrenaline in metabolic control: increasing blood glucose concentration, increasing heart rate"
        ] },
    "14.4": { name: "Homeostasis",
        core: [
            "Homeostasis - maintenance of a constant internal environment",
            "Insulin decreases blood glucose concentration"
        ],
        supplement: [
            "Homeostatic control by negative feedback with reference to a set point",
            "Control of blood glucose by liver and roles of insulin and glucagon",
            "Outline treatment of Type 1 diabetes",
            "Skin structures: hairs, hair erector muscles, sweat glands, receptors, sensory neurones, blood vessels, fatty tissue",
            "Maintenance of constant body temperature: insulation, sweating, shivering, role of brain",
            "Vasodilation and vasoconstriction of arterioles supplying skin surface capillaries"
        ] },
    "14.5": { name: "Tropic responses",
        core: [
            "Gravitropism - parts of plant grow towards or away from gravity",
            "Phototropism - parts of plant grow towards or away from light source",
            "Investigate gravitropism and phototropism in shoots and roots"
        ],
        supplement: [
            "Phototropism and gravitropism as examples of chemical control of plant growth",
            "Role of auxin in shoot growth:",
            "Auxin made in shoot tip",
            "Auxin diffuses through plant from shoot tip",
            "Auxin unequally distributed in response to light and gravity",
            "Auxin stimulates cell elongation"
        ] },
    "15.1": { name: "Drugs",
        core: [
            "Drug - any substance taken into body that modifies or affects chemical reactions in the body",
            "Antibiotics for treatment of bacterial infections",
            "Some bacteria are resistant to antibiotics, reducing effectiveness",
            "Antibiotics kill bacteria but do not affect viruses"
        ],
        supplement: [
            "Using antibiotics only when essential limits development of resistant bacteria such as MRSA"
        ] },
    "16.1": { name: "Asexual reproduction",
        core: [
            "Asexual reproduction - production of genetically identical offspring from one parent",
            "Identify examples in diagrams, images and information"
        ],
        supplement: [
            "Advantages and disadvantages of asexual reproduction:",
            "To a population in the wild",
            "To crop production"
        ] },
    "16.2": { name: "Sexual reproduction",
        core: [
            "Sexual reproduction - fusion of nuclei of two gametes to form zygote; offspring genetically different",
            "Fertilisation - fusion of nuclei of gametes"
        ],
        supplement: [
            "Nuclei of gametes are haploid; nucleus of zygote is diploid",
            "Advantages and disadvantages of sexual reproduction:",
            "To a population in the wild",
            "To crop production"
        ] },
    "16.3": { name: "Sexual reproduction in plants",
        core: [
            "Parts of insect-pollinated flower: sepals, petals, stamens, filaments, anthers, carpels, style, stigma, ovary, ovules",
            "Functions of these structures",
            "Identify and describe anthers and stigmas of wind-pollinated flowers",
            "Distinguish between pollen grains of insect-pollinated and wind-pollinated flowers",
            "Pollination - transfer of pollen grains from anther to stigma",
            "Fertilisation - pollen nucleus fuses with nucleus in ovule",
            "Structural adaptations of insect-pollinated and wind-pollinated flowers",
            "Germination conditions: water, oxygen, suitable temperature"
        ],
        supplement: [
            "Self-pollination - pollen transfer to stigma of same flower or different flower on same plant",
            "Cross-pollination - pollen transfer to stigma of flower on different plant of same species",
            "Effects on population: variation, capacity to respond to environmental changes, reliance on pollinators",
            "Growth of pollen tube and entry into ovule followed by fertilisation"
        ] },
    "16.4": { name: "Sexual reproduction in humans",
        core: [
            "Male reproductive system: testes, scrotum, sperm ducts, prostate gland, urethra, penis",
            "Female reproductive system: ovaries, oviducts, uterus, cervix, vagina",
            "Fertilisation - fusion of nuclei from sperm and egg cell",
            "Adaptive features of sperm: flagellum, mitochondria, enzymes in acrosome",
            "Adaptive features of egg cell: energy stores, jelly coat that changes at fertilisation",
            "Compare male and female gametes: size, structure, motility, numbers",
            "Zygote forms embryo (ball of cells) that implants into uterus lining",
            "Fetal development: umbilical cord, placenta, amniotic sac, amniotic fluid"
        ],
        supplement: [
            "Function of placenta and umbilical cord: exchange of dissolved nutrients, gases and excretory products between mother and fetus",
            "Some pathogens and toxins can pass across placenta and affect fetus"
        ] },
    "16.5": { name: "Sex hormones in humans",
        core: [
            "Roles of testosterone and oestrogen in development and regulation of secondary sexual characteristics during puberty",
            "Menstrual cycle: changes in ovaries and lining of uterus"
        ],
        supplement: [
            "Sites of production of oestrogen and progesterone in menstrual cycle and pregnancy",
            "Role of hormones in controlling menstrual cycle and pregnancy: FSH, LH, progesterone, oestrogen"
        ] },
    "16.6": { name: "Sexually transmitted infections",
        core: [
            "Sexually transmitted infection (STI) - infection transmitted through sexual contact",
            "Human immunodeficiency virus (HIV) - pathogen that causes an STI",
            "HIV infection may lead to AIDS",
            "Methods of transmission of HIV",
            "How spread of STIs is controlled"
        ],
        supplement: [] },
    "17.1": { name: "Chromosomes, genes and proteins",
        core: [
            "Chromosomes made of DNA containing genetic information as genes",
            "Gene - length of DNA that codes for a protein",
            "Allele - alternative form of a gene",
            "Sex inheritance in humans: X and Y chromosomes"
        ],
        supplement: [
            "Base sequence in gene determines sequence of amino acids used to make specific protein",
            "Different sequences of amino acids give different shapes to protein molecules",
            "DNA controls cell function by controlling production of proteins (enzymes, membrane carriers, neurotransmitter receptors)",
            "Protein synthesis:",
            "Gene coding for protein remains in nucleus",
            "mRNA is a copy of a gene, made in nucleus, moves to cytoplasm",
            "mRNA passes through ribosomes",
            "Ribosomes assemble amino acids into protein molecules",
            "Specific amino acid sequence determined by base sequence in mRNA",
            "Most body cells contain same genes, but many genes not expressed because cell only makes specific proteins it needs",
            "Haploid nucleus - single set of chromosomes",
            "Diploid nucleus - two sets of chromosomes",
            "Human diploid cell has 23 pairs of chromosomes"
        ] },
    "17.2": { name: "Mitosis",
        core: [],
        supplement: [
            "Mitosis - nuclear division giving rise to genetically identical cells",
            "Role of mitosis: growth, repair of damaged tissues, replacement of cells, asexual reproduction",
            "Exact replication of chromosomes occurs before mitosis",
            "During mitosis, copies of chromosomes separate, maintaining chromosome number in each daughter cell",
            "Stem cells - unspecialised cells that divide by mitosis to produce daughter cells that can become specialised for specific functions"
        ] },
    "17.3": { name: "Meiosis",
        core: [],
        supplement: [
            "Meiosis involved in production of gametes",
            "Meiosis as reduction division: chromosome number halved from diploid to haploid, resulting in genetically different cells"
        ] },
    "17.4": { name: "Monohybrid inheritance",
        core: [
            "Inheritance - transmission of genetic information from generation to generation",
            "Genotype - genetic make-up of organism in terms of alleles present",
            "Phenotype - observable features of organism",
            "Homozygous - having two identical alleles of a particular gene",
            "Two identical homozygous individuals breeding together will be pure-breeding",
            "Heterozygous - having two different alleles of a particular gene",
            "Heterozygous individual will not be pure-breeding",
            "Dominant allele - expressed if present in genotype",
            "Recessive allele - expressed only when no dominant allele present",
            "Interpret pedigree diagrams for inheritance of a given characteristic",
            "Use genetic diagrams to predict results of monohybrid crosses; calculate phenotypic ratios (1:1 and 3:1)",
            "Use Punnett squares for crosses resulting in multiple genotypes"
        ],
        supplement: [
            "Use test cross to identify unknown genotype",
            "Codominance - both alleles in heterozygous organisms contribute to phenotype",
            "ABO blood groups: phenotypes A, B, AB, O; alleles Iᴬ, Iᴮ, Iᴼ",
            "Sex-linked characteristic - gene located on sex chromosome; more common in one sex",
            "Red-green colour blindness as example of sex linkage",
            "Use genetic diagrams for crosses involving codominance or sex linkage; calculate phenotypic ratios"
        ] },
    "18.1": { name: "Variation",
        core: [
            "Variation - differences between individuals of same species",
            "Continuous variation: range of phenotypes between two extremes (e.g., body length, body mass)",
            "Discontinuous variation: limited phenotypes with no intermediates (e.g., ABO blood groups, seed shape in peas, seed colour in peas)",
            "Discontinuous variation usually caused by genes only; continuous variation by genes and environment",
            "Investigate examples of continuous and discontinuous variation",
            "Mutation - genetic change; how new alleles are formed",
            "Ionising radiation and some chemicals increase mutation rate"
        ],
        supplement: [
            "Gene mutation - random change in base sequence of DNA",
            "Sources of genetic variation in populations: mutation, meiosis, random mating, random fertilisation"
        ] },
    "18.2": { name: "Adaptive features",
        core: [
            "Adaptive feature - inherited feature that helps organism survive and reproduce in its environment",
            "Interpret images/information about a species to describe its adaptive features"
        ],
        supplement: [
            "Adaptive features of hydrophytes (aquatic plants) and xerophytes (dry environment plants) to their environments"
        ] },
    "18.3": { name: "Selection",
        core: [
            "Describe natural selection: genetic variation → many offspring → struggle for survival → better-adapted individuals reproduce more → pass on their alleles",
            "Describe selective breeding: humans select individuals with desirable features → cross → select offspring showing desirable features",
            "Outline how selective breeding is carried out over many generations to improve crop plants and domesticated animals"
        ],
        supplement: [
            "Adaptation - process resulting from natural selection by which populations become more suited to environment over many generations",
            "Development of antibiotic-resistant bacteria as example of natural selection",
            "Outline differences between natural and artificial selection"
        ] },
    "19.1": { name: "Energy flow",
        core: [
            "Sun is the principal source of energy input to biological systems",
            "Flow of energy: light energy from Sun → chemical energy in organisms → eventual transfer to environment"
        ],
        supplement: [] },
    "19.2": { name: "Food chains and food webs",
        core: [
            "Food chain - shows transfer of energy from one organism to next, beginning with a producer",
            "Construct and interpret simple food chains",
            "Food web - network of interconnected food chains and interpret food webs",
            "Producer - organism that makes its own organic nutrients via photosynthesis",
            "Consumer - organism that gets energy by feeding on other organisms; classified as primary, secondary, tertiary, quaternary",
            "Herbivore - eats plants; Carnivore - eats animals; Decomposer - gets energy from dead or waste organic material",
            "Use food chains/webs to describe human impact: overharvesting, introducing foreign species",
            "Draw, describe and interpret pyramids of numbers and biomass; discuss advantages of biomass pyramid over numbers pyramid",
            "Describe trophic level as position in food chain/web/pyramid; identify producers, primary/secondary/tertiary/quaternary consumers"
        ],
        supplement: [
            "Advantages of representing food chains using a pyramid of energy compared with a pyramid of biomass",
            "Calculate the percentage of energy transferred between trophic levels",
            "Why transfer of energy between trophic levels is often not efficient",
            "Why food chains usually have fewer than five trophic levels (energy loss)",
            "Why it's more energy efficient for humans to eat crop plants than livestock fed on crop plants"
        ] },
    "19.3": { name: "Nutrient cycles",
        core: [
            "Carbon cycle: photosynthesis, respiration, feeding, decomposition, formation of fossil fuels, combustion"
        ],
        supplement: [
            "Nitrogen cycle:",
            "Decomposition of plant/animal protein → ammonium ions",
            "Nitrification",
            "Nitrogen fixation by lightning and bacteria",
            "Absorption of nitrate ions by plants",
            "Production of amino acids and proteins",
            "Feeding and digestion of proteins",
            "Deamination",
            "Denitrification",
            "Roles of microorganisms: decomposition, nitrification, nitrogen fixation, denitrification"
        ] },
    "19.4": { name: "Populations",
        core: [
            "Population - group of organisms of one species, living in same area, at same time",
            "Community - all populations of different species in an ecosystem",
            "Ecosystem - community of organisms and their environment, interacting together",
            "Factors affecting population growth: food supply, competition, predation, disease",
            "Identify lag, exponential (log), stationary and death phases in sigmoid curve of population growth",
            "Interpret graphs and diagrams of population growth"
        ],
        supplement: [
            "Explain factors leading to each phase in sigmoid curve, including role of limiting factors"
        ] },
    "20.1": { name: "Food supply",
        core: [
            "Increasing food production:",
            "Agricultural machinery - use larger land areas, improve efficiency",
            "Chemical fertilisers - improve yields",
            "Insecticides - improve quality and yield",
            "Herbicides - reduce competition with weeds",
            "Selective breeding - improve production by crop plants and livestock",
            "Advantages and disadvantages of large-scale monocultures",
            "Advantages and disadvantages of intensive livestock production"
        ],
        supplement: [] },
    "20.2": { name: "Habitat destruction",
        core: [
            "Biodiversity - number of different species that live in an area",
            "Reasons for habitat destruction:",
            "Increased area for housing, crop production, livestock production",
            "Extraction of natural resources",
            "Freshwater and marine pollution",
            "Through altering food webs and food chains, humans negatively impact habitats",
            "Effects of deforestation: reducing biodiversity, extinction, loss of soil, flooding, increased CO₂ in atmosphere"
        ],
        supplement: [] },
    "20.3": { name: "Pollution",
        core: [
            "Effects of untreated sewage and excess fertiliser on aquatic ecosystems",
            "Effects of non-biodegradable plastics in aquatic and terrestrial ecosystems",
            "Sources and effects of air pollution by methane and carbon dioxide: enhanced greenhouse effect and climate change"
        ],
        supplement: [
            "Eutrophication process:",
            "Increased availability of nitrate and other ions",
            "Increased growth of producers",
            "Increased decomposition after death of producers",
            "Increased aerobic respiration by decomposers",
            "Reduction in dissolved oxygen",
            "Death of organisms requiring dissolved oxygen"
        ] },
    "20.4": { name: "Conservation",
        core: [
            "Sustainable resource - produced as rapidly as removed from environment so it does not run out",
            "Some resources can be conserved and managed sustainably: forests and fish stocks",
            "Why organisms become endangered or extinct: climate change, habitat destruction, hunting, overharvesting, pollution, introduced species",
            "Conservation of endangered species:",
            "Monitoring and protecting species and habitats",
            "Education",
            "Captive breeding programmes",
            "Seed banks"
        ],
        supplement: [
            "Forest conservation: education, protected areas, quotas, replanting",
            "Fish stock conservation: education, closed seasons, protected areas, controlled net types and mesh size, quotas, monitoring",
            "Reasons for conservation programmes:",
            "Maintaining or increasing biodiversity",
            "Reducing extinction",
            "Protecting vulnerable ecosystems",
            "Maintaining ecosystem functions: nutrient cycling, resource provision (food, drugs, fuel, genes)",
            "Use of artificial insemination (AI) and in vitro fertilisation (IVF) in captive breeding programmes",
            "Risks of population size decrease: reduced genetic variation"
        ] },
    "21.1": { name: "Biotechnology and genetic modification",
        core: [
            "Bacteria useful in biotechnology and genetic modification due to: rapid reproduction rate, ability to make complex molecules"
        ],
        supplement: [
            "Why bacteria are useful: few ethical concerns over manipulation and growth; presence of plasmids"
        ] },
    "21.2": { name: "Biotechnology",
        core: [
            "Role of anaerobic respiration in yeast during production of ethanol for biofuels",
            "Role of anaerobic respiration in yeast during bread-making",
            "Use of pectinase in fruit juice production",
            "Investigate use of biological washing powders containing enzymes"
        ],
        supplement: [
            "Use of lactase to produce lactose-free milk",
            "Fermenters for large-scale production: insulin, penicillin, mycoprotein",
            "Conditions controlled in fermenters: temperature, pH, oxygen, nutrient supply, waste products"
        ] },
    "21.3": { name: "Genetic modification",
        core: [
            "Genetic modification - changing genetic material of an organism by removing, changing or inserting individual genes",
            "Examples of genetic modification:",
            "Insertion of human genes into bacteria to produce human proteins",
            "Insertion of genes into crop plants for herbicide resistance",
            "Insertion of genes into crop plants for insect pest resistance",
            "Insertion of genes into crop plants to improve nutritional qualities"
        ],
        supplement: [
            "Process of genetic modification (using bacterial production of human protein):",
            "Isolation of human gene using restriction enzymes, forming sticky ends",
            "Cutting of bacterial plasmid DNA with same restriction enzymes, forming complementary sticky ends",
            "Insertion of human DNA into plasmid using DNA ligase to form recombinant plasmid",
            "Insertion of recombinant plasmids into bacteria",
            "Multiplication of bacteria containing recombinant plasmids",
            "Expression of human gene in bacteria to make human protein",
            "Discuss advantages and disadvantages of genetically modifying crops (soya, maize, rice)"
        ] }
};

// SyllabusParser class
class SyllabusParser {
    constructor() {
        this.coreTopics = new Set();
        this.supplementTopics = new Set();
        this.coreTopicStrings = [];
        this.supplementTopicStrings = [];
        this.coreCount = 0;
        this.supplementCount = 0;
        this.isLoaded = false;
        this.supplementOnlySubtopics = new Set();
    }

    normalizeText(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    _addToSection(content, section, subtopicId, subtopicName) {
        const norm = this.normalizeText(content);
        const entry = { text: content, subtopicId: subtopicId || '', subtopicName: subtopicName || '' };
        if (section === 'core') {
            this.coreTopics.add(norm);
            this.coreTopicStrings.push(entry);
            this.coreCount++;
        } else {
            this.supplementTopics.add(norm);
            this.supplementTopicStrings.push(entry);
            this.supplementCount++;
        }
    }

    classifyQuestion(questionText, questionTopic, subtopicId) {
        if (!this.isLoaded) {
            return { type: 'Core', reason: 'No syllabus loaded', confidence: 'low' };
        }
        if (subtopicId && this.supplementOnlySubtopics?.has(subtopicId)) {
            return { type: 'Extended', reason: `Subtopic ${subtopicId} has no Core points`, confidence: 'high' };
        }

        const haystack = this.normalizeText((questionText || '') + ' ' + (questionTopic || ''));
        let suppScore = 0, coreScore = 0;
        for (const topic of this.supplementTopicStrings) {
            const normTopic = this.normalizeText(topic.text || topic);
            if (normTopic.length > 6 && haystack.includes(normTopic)) suppScore += 3;
        }
        for (const topic of this.coreTopicStrings) {
            const normTopic = this.normalizeText(topic.text || topic);
            if (normTopic.length > 6 && haystack.includes(normTopic)) coreScore += 3;
        }

        const words = haystack.split(/\s+/).filter(w => w.length > 4);
        for (const word of words) {
            for (const topic of this.supplementTopicStrings) {
                if (this.normalizeText(topic.text || topic).includes(word)) suppScore += 1;
            }
            for (const topic of this.coreTopicStrings) {
                if (this.normalizeText(topic.text || topic).includes(word)) coreScore += 1;
            }
        }

        const total = suppScore + coreScore;
        if (total === 0) return { type: 'Core', reason: 'No syllabus match – defaulting to Core', confidence: 'low' };

        const suppRatio = suppScore / total;
        if (suppRatio > 0.6 && suppScore > 3) {
            return { type: 'Extended', reason: `Supplement score ${suppScore} vs Core score ${coreScore}`, confidence: suppScore > 8 ? 'high' : 'medium' };
        }
        return { type: 'Core', reason: `Core score ${coreScore} vs Supplement score ${suppScore}`, confidence: coreScore > 8 ? 'high' : (coreScore > 3 ? 'medium' : 'low') };
    }

    getSummary() {
        return {
            coreTopics: this.coreTopicStrings.slice(0, 30).map(t => t.text || t),
            supplementTopics: this.supplementTopicStrings.slice(0, 30).map(t => t.text || t),
            totalCore: this.coreCount,
            totalSupplement: this.supplementCount,
            isLoaded: this.isLoaded
        };
    }

    isSyllabusLoaded() { return this.isLoaded; }

    getStructuredForPrompt() {
        const syllabus = IGCSE_BIOLOGY_SYLLABUS_2026;
        let out = 'Cambridge IGCSE Biology 0610 (2026-2028) Syllabus\n';
        out += 'IMPORTANT: subtopics marked "SUPPLEMENT ONLY" have NO Core points — all questions on these are Extended.\n\n';
        Object.entries(syllabus).forEach(([id, sub]) => {
            const coreCount = sub.core.length;
            const suppCount = sub.supplement.length;
            const label = coreCount === 0 ? ' ⚠ SUPPLEMENT ONLY (NO Core points)' : suppCount === 0 ? ' (Core only)' : '';
            out += `=== ${id} ${sub.name}${label} ===\n`;
            if (coreCount > 0) {
                out += `CORE:\n`;
                sub.core.forEach((t, i) => { out += `  ${i+1}. ${t}\n`; });
            } else {
                out += `CORE: (none)\n`;
            }
            if (suppCount > 0) {
                out += `SUPPLEMENT/EXTENDED:\n`;
                sub.supplement.forEach((t, i) => { out += `  ${i+1}. ${t}\n`; });
            }
            out += '\n';
        });
        return out;
    }
}

const syllabusParser = new SyllabusParser();

function loadHardcodedSyllabus() {
    syllabusParser.coreTopics.clear();
    syllabusParser.supplementTopics.clear();
    syllabusParser.coreTopicStrings = [];
    syllabusParser.supplementTopicStrings = [];
    syllabusParser.coreCount = 0;
    syllabusParser.supplementCount = 0;
    syllabusParser.supplementOnlySubtopics.clear();

    Object.entries(IGCSE_BIOLOGY_SYLLABUS_2026).forEach(([id, sub]) => {
        if (sub.core.length === 0 && sub.supplement.length > 0) {
            syllabusParser.supplementOnlySubtopics.add(id);
        }
        sub.core.forEach(t => syllabusParser._addToSection(t, 'core', id, sub.name));
        sub.supplement.forEach(t => syllabusParser._addToSection(t, 'supplement', id, sub.name));
    });
    syllabusParser.isLoaded = true;

    console.log('[v51] Hardcoded syllabus loaded:', { core: syllabusParser.coreCount, supplement: syllabusParser.supplementCount });

    const parseBadge = document.getElementById('syllabus-parse-badge');
    if (parseBadge) {
        parseBadge.textContent = `📚 ${syllabusParser.coreCount}C / ${syllabusParser.supplementCount}S (2026-2028)`;
        parseBadge.className = 'bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full';
    }
    const syllabusArea = document.getElementById('syllabus-structure');
    if (syllabusArea) {
        syllabusArea.value = syllabusParser.getStructuredForPrompt();
        syllabusArea.classList.add('text-emerald-600');
    }
    const statusBanner = document.getElementById('syllabus-status');
    if (statusBanner) statusBanner.classList.add('hidden');

    const parseStatus = document.getElementById('syllabus-parse-status');
    if (parseStatus) parseStatus.textContent = `✅ ${syllabusParser.coreCount} Core + ${syllabusParser.supplementCount} Supplement topics (2026-2028)`;

    const summarySpan = document.getElementById('syllabus-load-summary');
    if (summarySpan) summarySpan.textContent = `${syllabusParser.coreCount} Core + ${syllabusParser.supplementCount} Supplement topics loaded.`;

    setExtractionStatus('ready', 'SYLLABUS READY — Upload Exam PDF to extract questions');
    checkInputs();
}