// ================================================================
// PDF EXTRACTION & REVIEW MODAL (CORE/EXTENDED → Extended)
// ================================================================
let _pendingExtractedText = '';

async function extractTextFromPDF(base64Data) {
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(' ') + '\n';
    }
    return fullText;
}

async function extractSyllabusTopics() {
    const syllabusArea = document.getElementById('syllabus-structure');
    if (!syllabusArea) return;
    if (syllabusParser.isSyllabusLoaded()) {
        showModal('ℹ️ Syllabus Already Loaded', 'v51 uses the hardcoded Cambridge IGCSE Biology 0610 (2026-2028) database.');
        return;
    }
    syllabusArea.value = '📖 Loading Cambridge IGCSE Biology 0610 (2026-2028) hardcoded syllabus...';
    await new Promise(r => setTimeout(r, 150));
    loadHardcodedSyllabus();
    const s = syllabusParser.getSummary();
    const parseStatus = document.getElementById('syllabus-parse-status');
    if (parseStatus) parseStatus.textContent = `✅ ${s.totalCore} Core + ${s.totalSupplement} Supplement topics (hardcoded 2026-2028)`;
    setExtractionStatus('ready', 'SYLLABUS READY — Now upload Exam PDF');
    showModal('✅ Syllabus Ready (2026-2028)', `Cambridge IGCSE Biology 0610 (2026-2028) loaded from built-in database:\n🔵 ${s.totalCore} Core topics\n🟠 ${s.totalSupplement} Supplement topics`);
}

async function detectSubjectFromExam() {
    const status = document.getElementById('detection-status');
    if (!status) return;
    status.innerText = "⏳ Detecting...";
    status.classList.remove('hidden');
    try {
        const coverPrompt = `Look at the cover or header of this exam paper. Extract: (1) subject name e.g. Biology, Chemistry; (2) FULL paper code including year e.g. 0610/42/O/N/24. Reply ONLY in this exact format: SUBJECT|PAPERCODE`;
        const geminiCoverPayload = {
            contents: [{ parts: [
                { inlineData: { data: uploadedFiles.exam.data, mimeType: uploadedFiles.exam.mimeType } },
                { text: coverPrompt }
            ]}]
        };
        const data = await callGeminiAPI(geminiCoverPayload, 60000);
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        const [subjectName, paperCode] = reply.split('|').map(s => s.trim());
        const subjectInput = document.getElementById('subject');
        if (subjectInput && !subjectInput.value.trim() && subjectName && paperCode) {
            const detection = detectSubject(paperCode + ' ' + subjectName);
            const board = detection.detected ? detection.subject.board : 'Cambridge';
            const subjectProper = subjectName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            subjectInput.value = `${board} IGCSE ${subjectProper} ${paperCode}`;
            status.innerText = "✓ Auto-detected";
            const badge = document.getElementById('exam-board-badge');
            if (badge && detection.detected) {
                badge.textContent = `${detection.subject.board} ${detection.subject.name}`;
                badge.className = `${detection.subject.badgeClass} text-[10px] px-2 py-1 rounded-full`;
                badge.classList.remove('hidden');
            }
        } else if (subjectInput && !subjectInput.value.trim() && reply) {
            subjectInput.value = reply;
            status.innerText = "✓ Auto-detected";
        } else {
            status.innerText = "Enter manually";
        }
    } catch (e) {
        status.innerText = "Enter manually";
    }
}

// ========== renderConsole (CORE/EXTENDED → EXTENDED) ==========
function renderConsole(text) {
    const container = document.getElementById('question-console-rendered');
    if (!container) return;
    if (!text || !text.trim()) {
        container.innerHTML = '<span class="text-slate-400 text-xs italic">No questions extracted yet.</span>';
        return;
    }
    const lines = text.split('\n').filter(l => l.trim());
    container.innerHTML = lines.map(line => {
        let cleaned = line.replace(/\(no shared stem\)/gi, '').replace(/:\s*\(no shared stem\)/i, ':').trim();
        cleaned = cleaned.replace(/:\s*$/, '');
        cleaned = cleaned.replace(/\[CORE\/EXTENDED\]/gi, '[EXTENDED]');
        
        let html = cleaned
            .replace(/\[CORE\]/g, '<span class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-bold px-1.5 py-0.5 rounded text-[10px] mx-0.5">[CORE]</span>')
            .replace(/\[EXTENDED\]/g, '<span class="inline-block bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 font-bold px-1.5 py-0.5 rounded text-[10px] mx-0.5">[EXTENDED]</span>')
            .replace(/\[(\d+) marks?\]/gi, '<span class="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-1.5 py-0.5 rounded text-[10px] mx-0.5">[$1 marks]</span>')
            .replace(/\[(?:Topic )?([\d]+)\.([\d]+)[:\s–-]*([^\]]+)\]/g, (match, topicN, subN, subName) => {
                const topicNum = parseInt(topicN);
                const parentName = TOPIC_NAMES[topicNum] || `Topic ${topicNum}`;
                const subtopicId = `${topicN}.${subN}`;
                return `<span class="inline-flex items-center gap-0.5 mx-0.5">
                    <span class="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-bold px-1.5 py-0.5 rounded-l text-[10px]">📚 T${topicNum}: ${parentName}</span>
                    <span class="inline-block bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded-r text-[10px]">${subtopicId} ${subName.trim()}</span>
                </span>`;
            })
            .replace(/^(Q\d+(?:\([^)]+\))+):/, '<span class="font-bold text-slate-800 dark:text-slate-200">$1</span>:');
        return `<div class="py-1 border-b border-slate-200 dark:border-slate-700">${html}</div>`;
    }).join('');
}

// ========== AUTO EXTRACT – UPDATED PROMPT (blank lines → placeholders) ==========
async function autoExtract() {
    setExtractionStatus('extracting', 'EXTRACTING QUESTIONS...');
    isExtracting = true;
    if (!validateApiKey(getApiKey())) {
        isExtracting = false;
        setExtractionStatus('error', 'API KEY REQUIRED');
        checkInputs();
        return;
    }
    try {
        const subjectInput = document.getElementById('subject')?.value || '';
        const detectedSubjectKey = detectSubjectKey(subjectInput);
        currentSubject = getSubjectLabel(detectedSubjectKey);
        const subjectKeyEl = document.getElementById('subject-key-display');
        if (subjectKeyEl) subjectKeyEl.textContent = currentSubject;
        const biologyRef = getBiologyRef();
        const syllabusForPrompt = syllabusParser.getStructuredForPrompt();

        // ========== UPDATED EXTRACTION PROMPT (blank lines become placeholders) ==========
        const extractPrompt = `Read every page of this IGCSE exam paper carefully, including all diagrams, tables, and graphs.

CRITICAL RULE FOR SUB-QUESTIONS:
When a question has a stem (e.g. "The diagram shows a mitochondrion...") followed by sub-parts (a)(i), (a)(ii), (b) etc., you MUST copy the parent stem into EVERY sub-question line.
CORRECT:  Q1(a)(i): The diagram shows a mitochondrion. State its function. [1 mark] ...
WRONG:    Q1(a)(i): State its function. [1 mark] ...   ← MISSING the stem

HANDLE BLANK ANSWER LINES (rows of dots, dashes, underscores):
- Do NOT ignore them. Instead, convert them into fill‑in‑the‑blank placeholders.
- Replace any sequence of 3 or more dots (........), dashes (----), or underscores (____) that appears as an answer space with the standard placeholder: "......................" (15 dots).
- If the blank is inside a sentence (e.g., "Water moves by .............."), keep the original dots as they are – they are part of the question.
- If the blank is on a separate line by itself, attach it to the previous sentence with a space before the placeholder.
- For calculation questions that have blank answer lines, use "__________" or the same dot placeholder.
- The goal is to make the extracted question text look like a fill‑in‑the‑blank question, with placeholders where the student would write.

IGNORE COMPLETELY — do NOT include in any output:
- Margin text: "DO NOT WRITE IN THIS MARGIN", "DO NOT WRITE OUTSIDE THE BOX"
- "BLANK PAGE", "This page is intentionally left blank"
- Page numbers (e.g. "19", "20")
- Paper codes (e.g. "0610/41/M/J/25", "UCLES 2025")
- "==End of OCR for page N==" markers
- Any reading or transcription of diagram labels, axis values, table data, or figure content — these are not part of the question text

For EACH leaf sub-question (the deepest level that has marks assigned), write ONE line in this EXACT format:
Q[number]([part]): <complete question text> [X marks] [CORE or EXTENDED] [Topic N.N SubtopicName]

RULE: [X marks] is REQUIRED on every child sub-question line. Count marks from the paper. Never omit.

PARENT QUESTION LINE — REQUIRED BEFORE EACH GROUP OF SUB-QUESTIONS:
Output ONE bare parent line per main question number (Q1, Q2, Q3…) immediately before its sub-questions:
Q[number]: <full parent/stem text — the shared context or scenario for this question>
Example:  Q2: Chickens are birds that are bred by farmers. Table 2.1 shows characteristics of red junglefowl and farmed chickens.
If the main question has no shared stem (each sub-part is independent), still output: Q[number]:

SUB-QUESTION LINES — one line per sub-part, immediately after the parent line:
Q[number]([part]): <sub-question instruction only — do NOT repeat the parent stem here> [X marks] [CORE or EXTENDED] [Topic N.N SubtopicName]
Example:  Q2(a)(i): Calculate the percentage change in mean body mass. Give your answer to 3 s.f. [3 marks] [CORE] [Topic 18.3 Selection]

CRITICAL — question text rules by question type:
- MULTIPLE CHOICE: Write all options A, B, C, D with their full text. Example: Q3(a): Which feature is found in plant cells? A Cell wall B Mitochondria C Ribosome D Nucleus [1 mark] ...
- FILL IN THE BLANKS: Reproduce the sentence with .............. dots exactly where the blanks are (the original dots or the placeholder).
- COMPLETE THE TABLE: Describe the full table structure — all column headers, row labels, any given data already filled in, and mark empty cells as [blank].
- CALCULATIONS: Include all given numerical values with units and the exact instruction. Example: Q5(b): The cell is 0.05 mm long. Calculate the length in micrometres. Show your working. [2 marks] ...
- DIAGRAMS / GRAPHS: Describe every axis title, axis scale/range, all labelled features, and key data values in square brackets. Example: [Fig. 2 shows: x-axis = Time (minutes) 0–60; y-axis = Rate of photosynthesis (cm³/min) 0–5; data: rises from 0.5 at 0 min to 4.8 at 30 min then plateaus at 5.0]
- Do NOT include answer lines, blank answer boxes, or answer-space formatting (except the placeholder for blanks)
- Keep each question on ONE line

CLASSIFICATION — Core vs Extended (NO CORE/EXTENDED):
- Use [EXTENDED] when the entire question tests Extended/Supplement content only.
- Use [CORE] for all other questions.
- If a question would previously be marked CORE/EXTENDED, mark it as [EXTENDED].

Extended keywords → [EXTENDED]: water potential, plasmolysis, glucagon, fibrinogen, auxin, meiosis, mitosis, DNA base pairing, nephron, lymphocyte, phagocyte, eutrophication, codominance, test cross, FSH, LH, goblet cells, ciliated cells, cilia, mucus protect, pollen tube, oxygen debt, fermenter, restriction enzyme, vaccination mechanism, pyramid of energy comparison, percentage energy transfer, genetic variation, diabetes treatment (insulin injection/pump), antibiotic resistance mechanism, hydrophyte adaptation, xerophyte adaptation, monocotyledon features, dicotyledon features, cartilage function in breathing system, breathing rate control (CO2/brain), blood glucose regulation detail (mechanism of insulin/glucagon, named cells), transpiration factors, translocation, maltase and specific enzyme products (maltase→glucose, pepsin→amino acids), fermenter for industrial antibiotic/penicillin production (NOT yeast bread/biofuel which is Core), kingdoms of fungi/protoctista identification.

CRITICAL EXTENDED corrections (verified against Cambridge 0610 2026-2028 syllabus):
- Classifying plants into ferns / flowering plants / dicotyledons / monocotyledons → [EXTENDED] [Topic 1.3]  (Core only requires animal/vertebrate groups)
- Urea formation, deamination, amino acid breakdown → [EXTENDED] [Topic 13.1]
- Explaining WHY wilting occurs (turgor pressure, water potential) → [EXTENDED] [Topic 8.3]  (Stating that plants wilt = Core)
- Explaining effect of temperature/humidity/wind speed on transpiration rate → [EXTENDED] [Topic 8.3]  (Stating rate changes = Core; explaining mechanism = Extended)
- Identifying atrioventricular valves or semilunar valves → [EXTENDED] [Topic 9.2]  (General valve mention = Core)
- Explaining relative thickness of ventricle/atria walls → [EXTENDED] [Topic 9.2]
- Describing cardiac cycle / sequence of blood flow through heart chambers → [EXTENDED] [Topic 9.2]
- Explaining WHY heart rate changes with exercise (mechanism) → [EXTENDED] [Topic 9.2]  (Stating heart rate changes = Core)
- Explaining eutrophication process (mechanism) → [EXTENDED] [Topic 20.3]
- Selective breeding / artificial selection → [CORE] [Topic 18.3 Selection]  NOT Topic 21
- Exercise effect on heart rate (with fig showing data/graph) → [Topic 9.2] NOT [Topic 11.1]
- Septum separating oxygenated/deoxygenated blood = [CORE]; identifying atrioventricular valve = [EXTENDED] → mark as [EXTENDED] (was CORE/EXTENDED)
- Balanced CHEMICAL equation for photosynthesis (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂) → [EXTENDED]  (word equation = Core)

Core keywords → [CORE]: diffusion (basic), osmosis (basic), photosynthesis (word equation only), enzyme (basic role), food chain, carbon cycle, state/name/identify a fact, yeast in bread-making, yeast in biofuel/fermentation (basic use), basic blood glucose control (insulin lowers/glucagon raises), state what antibiotics kill (bacteria), name of genus/species in binomial system. NOTE: balanced CHEMICAL equation for respiration = [EXTENDED] (supplement only). Word equation for respiration = [CORE]. Balanced symbol equation = always [EXTENDED].

TOPIC TAGGING — [Topic N.N SubtopicName]:
Match the question to the MOST SPECIFIC subtopic from the Cambridge 0610 Biology syllabus below.
Use the exact subtopic number and name as listed. Do not guess or invent subtopic numbers.

Key subtopics for common topics:
- Energy in food chains / pyramids / % energy transfer / pyramid of energy → [Topic 19.2 Food chains and food webs]
- Food chains, webs, feeding relationships → [Topic 19.2 Food chains and food webs]
- Populations, communities, ecosystems → [Topic 19.4 Populations]
- Nutrient cycles (carbon, nitrogen) → [Topic 19.3 Nutrient cycles]
- Pollution, acid rain, eutrophication, greenhouse gases, sewage → [Topic 20.3 Pollution]
- Deforestation, habitat destruction, loss of biodiversity, forest cover, land clearance → [Topic 20.2 Habitat destruction]
- Describing/stating effects of deforestation (e.g. list effects) → [Topic 20.2 Habitat destruction] [CORE]
- EXPLAINING the mechanism of how deforestation causes global temperature rise (causal chain: fewer trees → less CO₂ absorbed → greenhouse effect → temperature rise) → [Topic 20.2 Habitat destruction] [EXTENDED]
- Food supply, food security, sustainable fishing → [Topic 20.1 Food supply]
- Deforestation and global warming / temperature increase → [Topic 20.2 Habitat destruction] NOT 20.3
- Cell structure → [Topic 2.1 Cell structure and organisation]
- Osmosis → [Topic 3.2 Osmosis]
- Diffusion → [Topic 3.1 Diffusion]
- Enzymes → [Topic 5.1 Enzymes]
- Photosynthesis → [Topic 6.1 Photosynthesis]
- Leaf structure, stomata, cuticle, mesophyll, naming tissues in leaf diagram → [Topic 6.2 Leaf structure]
- Functions of structural features of hydrophyte leaves (air spaces, stomata position, thin cuticle, floating leaves) → [Topic 18.2 Adaptive features] NOT 6.2
- Hydrophyte / xerophyte / mesophyte adaptations, plant adaptations to environment → [Topic 18.2 Adaptive features]
- Respiration (aerobic) → [Topic 12.2 Aerobic respiration]
- Respiration (anaerobic) → [Topic 12.3 Anaerobic respiration]
- Gas exchange (humans), alveoli, breathing muscles, cartilage in trachea/bronchi → [Topic 11.1 Gas exchange in humans]
- Breathing control / rate, CO2 detection by brain, increased breathing during exercise → [Topic 11.1 Gas exchange in humans] NOT 12.2
- Heart → [Topic 9.2 Heart]
- Blood vessels → [Topic 9.3 Blood vessels]
- Blood → [Topic 9.4 Blood]
- Transpiration → [Topic 8.3 Transpiration]
- Xylem and phloem → [Topic 8.1 Xylem and phloem]
- Excretion (kidneys) → [Topic 13.1 Excretion in humans]
- Hormones → [Topic 14.3 Hormones]
- Homeostasis, blood glucose, insulin, glucagon, diabetes treatment → [Topic 14.4 Homeostasis]
- Nervous system → [Topic 14.1 Coordination and response]
- Mitosis → [Topic 17.2 Mitosis]
- Meiosis → [Topic 17.3 Meiosis]
- Monohybrid inheritance / genetics → [Topic 17.4 Monohybrid inheritance]
- DNA, genes, chromosomes → [Topic 17.1 Chromosomes, genes and proteins]
- Variation → [Topic 18.1 Variation]
- Natural selection, evolution → [Topic 18.3 Selection]
- Characteristics of living organisms → [Topic 1.1 Characteristics of living organisms]
- Classification, binomial system, kingdoms → [Topic 1.2 Concept and uses of classification systems]
- Features of organisms, monocots, dicots, vertebrate groups → [Topic 1.3 Features of organisms]
- Sexual reproduction (plants) → [Topic 16.3 Sexual reproduction in plants]
- Sexual reproduction (humans) → [Topic 16.4 Sexual reproduction in humans]
- Diet / nutrition → [Topic 7.1 Diet]
- Digestive system, digestion, enzymes of digestion, villi, absorption → [Topic 7.2 Digestive system]
- Chemical digestion, maltase, amylase, protease, lipase, products of digestion → [Topic 7.3 Absorption]
- Drugs, antibiotics, antibiotic resistance, penicillin history → [Topic 15.1 Drugs]
- Biotechnology, genetic modification, fermenters, cloning, selective breeding → [Topic 21.1 Biotechnology and genetic modification]

EXAMPLES (using real Cambridge 0610 subtopic IDs):
Q1(a)(i): State where organisms in trophic level 1 get their energy from. [1 mark] [CORE] [Topic 19.1 Energy flow]
Q1(a)(ii): Calculate the percentage of energy transferred between trophic levels 2 and 3. [2 marks] [EXTENDED] [Topic 19.2 Food chains and food webs]
Q1(a)(iii): State two reasons why energy decreases between trophic levels. [2 marks] [CORE] [Topic 19.2 Food chains and food webs]
Q1(b)(i): Complete the sentence to describe the term population. [1 mark] [CORE] [Topic 19.4 Populations]
Q2(a): Describe the role of mitosis in growth. [3 marks] [EXTENDED] [Topic 17.2 Mitosis]
Q3(c)(i): A student placed a cell in a concentrated solution. Explain what happened using the term plasmolysis. [4 marks] [EXTENDED] [Topic 3.2 Osmosis]
Q4(a)(i): Name the enzyme that breaks down starch into maltose. [1 mark] [CORE] [Topic 5.1 Enzymes]
Q5(b): Name the two types of cells lining the airways and describe how they protect the body. [4 marks] [EXTENDED] [Topic 11.1 Gas exchange in humans]

CLASSIFICATION RULES:
- Classify based on the SPECIFIC CONCEPT tested, NOT the paper tier
- Extended papers regularly contain Core sub-questions — label [CORE] if the concept is in the Core column
- Default to [CORE] if genuinely uncertain
- IMPORTANT TIER RULES:
  * Yeast in bread-making or biofuel production → [CORE]
  * Fermenter for industrial penicillin/enzyme production → [EXTENDED]
  * Basic blood glucose control (insulin lowers, glucagon raises) → [CORE]
  * Detailed mechanism/treatment of diabetes, named islet cells → [EXTENDED]
  * Maltase digests maltose to glucose (specific enzyme product) → [EXTENDED]
  * State what antibiotics kill (bacteria) → [CORE]
  * Antibiotic resistance mechanism or how to reduce it → [EXTENDED]
  * Balanced SYMBOL/CHEMICAL equation for respiration → [EXTENDED] (word equation = Core)
  * Functions of leaf structural features in hydrophytes (air spaces, thin cuticle role) → [EXTENDED] mapped to 18.2
  * EXPLAINING how deforestation causes global temperature rise (mechanism) → [EXTENDED]
  * Describing/listing effects of deforestation → [CORE]

${detectedSubjectKey === "cambridge_biology_0610" || !detectedSubjectKey ? biologyRef : (getClassificationRef(detectedSubjectKey) || biologyRef)}Full syllabus reference:
${syllabusForPrompt.substring(0, 12000)}

Work through every page of the exam from first to last. Output EVERY parent question and EVERY sub-part.
List every question and every sub-part. Do not skip any. One line per leaf sub-question.`;

        const geminiPayload = {
            contents: [{ parts: [
                { inlineData: { data: uploadedFiles.exam.data, mimeType: uploadedFiles.exam.mimeType } },
                { text: extractPrompt }
            ]}],
            generationConfig: { temperature: 0.1 }
        };
        const data = await callGeminiAPI(geminiPayload, 90000);
        const _rawTxt = (data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.candidates?.[0]?.content?.parts?.map?.(p=>p.text||'').join('') || '').replace(/\[\s*[Ii]\s*[Mm]\s*[Aa]\s*[Gg]\s*[Ee]\s*\]/g, '').replace(/\[(Image|Diagram|Figure|Table)\d*\]/gi, '').replace(/\s{2,}/g, ' ').trim();
        if (!_rawTxt || !_rawTxt.trim()) throw new Error('Gemini returned no text. Please try again.');
        const extractedText = _rawTxt;
        const qt = document.getElementById('question-text');
        if (qt) qt.value = extractedText;
        renderConsole(extractedText);

        window.extractedClassifications = {};
        window.extractedTopics = {};
        const qLines = extractedText.split('\n');
        let coreCount = 0, extCount = 0;
        qLines.forEach(line => {
            if (/^Q\d+\([^)]+\)(?:\([^)]+\))*:.*?\[\d+\s*marks?\]/i.test(line)) {
                if (line.includes('[CORE]')) coreCount++;
                else if (line.includes('[EXTENDED]')) extCount++;
            }
            const m = line.match(/^Q([\d]+)\(([^)]+)\)(?:\(([^)]+)\))?(?:\(([^)]+)\))?\s*:.*?\[(CORE|EXTENDED)\]/);
            if (m) {
                let qid = m[1] + '(' + m[2] + ')';
                if (m[3]) qid += '(' + m[3] + ')';
                if (m[4]) qid += '(' + m[4] + ')';
                let finalType = (m[5] === 'CORE' ? 'Core' : 'Extended');
                window.extractedClassifications[qid] = finalType;
                const topicM = line.match(/\[(?:Topic )?([\d]+)\.([\d]+)[:\s–-]*([^\]]+)\]/);
                if (topicM) {
                    window.extractedTopics[qid] = {
                        subtopicId: topicM[1] + '.' + topicM[2],
                        topicNum: parseInt(topicM[1]),
                        subName: topicM[3].trim()
                    };
                }
            }
        });
        isExtracting = false;
        checkInputs();
        setExtractionStatus('complete', `✅ READY — ${coreCount} Core · ${extCount} Extended · topics tagged`);
        setTimeout(() => openReviewModal(extractedText), 200);
    } catch (e) {
        isExtracting = false;
        checkInputs();
        setExtractionStatus('error', 'EXTRACTION FAILED: ' + e.message);
        showModal('Extraction Failed', e.message);
    }
}

// ========== REVIEW MODAL (excludes parent lines) ==========
function openReviewModal(extractedText) {
    if (!extractedText || !extractedText.trim()) {
        extractedText = document.getElementById('question-text')?.value || '';
    }
    if (!extractedText || !extractedText.trim()) {
        alert('No extracted questions yet. Upload an exam PDF first.');
        return;
    }
    const rm = document.getElementById('review-modal');
    if (rm) rm.style.display = 'flex';
    try {
        _pendingExtractedText = extractedText;
        const lines = extractedText.split('\n').filter(l => l.trim());
        const tbody = document.getElementById('review-table-body');
        const subjectBadge = document.getElementById('review-subject-badge');
        if (subjectBadge) subjectBadge.textContent = currentSubject || 'Biology 0610';

        let coreN = 0, extN = 0;
        const rows = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const marksMatch = line.match(/\[(\d+)\s*marks?\]/i);
            if (!marksMatch) continue;
            
            let mFull = line.match(/^(Q[^:]+):\s*(.*?)\[(\d+)\s*marks?\]\s*\[(CORE|EXTENDED)\]\s*(?:\[Topic\s+([^\]]+)\])?/i);
            if (!mFull) {
                const mFlex = line.match(/^(Q[^:]+):\s*(.*?)\s*\[(CORE|EXTENDED)\]\s*(?:\[Topic\s+([^\]]+)\])?/i);
                if (mFlex) {
                    const mMarks = line.match(/\[(\d+)\s*marks?\]/i);
                    const foundMarks = mMarks ? mMarks[1] : '?';
                    mFull = [mFlex[0], mFlex[1], mFlex[2], foundMarks, mFlex[3], mFlex[4]];
                }
            }
            if (!mFull) continue;
            
            const [, qid, qtext, marks, rawType, topic] = mFull;
            let type = (rawType.toUpperCase() === 'CORE' ? 'Core' : 'Extended');
            if (topic) {
                const topicId = topic.trim().match(/^([\d]+\.[\d]+)/)?.[1];
                const syllEntry = topicId && IGCSE_BIOLOGY_SYLLABUS_2026[topicId];
                if (syllEntry) {
                    const hasCore = syllEntry.core && syllEntry.core.length > 0;
                    const hasSupp = syllEntry.supplement && syllEntry.supplement.length > 0;
                    if (!hasCore && hasSupp) type = 'Extended';
                    else if (hasCore && !hasSupp) type = 'Core';
                }
            }
            if (type === 'Core') coreN++;
            if (type === 'Extended') extN++;
            const preview = qtext.length > 80 ? qtext.substring(0,80) + '…' : qtext;
            const typeSel = `
                <option value="Core" ${type==='Core' ? 'selected' : ''}>🔵 Core</option>
                <option value="Extended" ${type==='Extended' ? 'selected' : ''}>🟠 Extended</option>
            `;
            const rowBg = type==='Core' ? '#eff6ff' : '#fff7ed';
            rows.push(`<tr style="background:${rowBg};border-bottom:1px solid #f1f5f9" data-review-row="${rows.length}">
                <td class="px-3 py-2 font-mono font-bold text-slate-700 dark:text-slate-300">${qid}</td>
                <td class="px-3 py-2 text-slate-600 dark:text-slate-400">${preview}</td>
                <td class="px-3 py-2 text-slate-500 dark:text-slate-400 text-[10px]">${topic||''}</td>
                <td class="px-3 py-2">
                    <select onchange="updateReviewType(${rows.length-1},this.value,this)" class="text-[10px] font-bold px-2 py-1 rounded border w-full" style="background:${type==='Core'?'#2563eb':'#ea580c'};color:white">
                        ${typeSel}
                    </select>
                </td>
                <td class="px-3 py-2 text-center text-slate-600 dark:text-slate-400 font-bold">${marks}</td>
              </tr>`);
        }
        if (tbody) tbody.innerHTML = rows.length ? rows.join('') : '<tr><td colspan="5" class="px-3 py-4 text-center">No leaf sub-questions found.ERC20</tr>';
        const cc = document.getElementById('review-core-count');
        const ec = document.getElementById('review-ext-count');
        if (cc) cc.textContent = coreN + ' Core';
        if (ec) ec.textContent = extN + ' Extended';
    } catch(e) {
        console.error(e);
        const tbody = document.getElementById('review-table-body');
        if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="px-3 py-4 text-red-500">Error: ${e.message}ERC20</td>`;
    }
}

function updateReviewType(rowIdx, newType, sel) {
    const row = document.querySelector(`tr[data-review-row="${rowIdx}"]`);
    if (row) row.style.background = newType==='Core'?'#eff6ff':'#fff7ed';
    if (sel) sel.style.background = newType==='Core'?'#2563eb':'#ea580c';
    const lines = _pendingExtractedText.split('\n');
    let count = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() && /^Q[^:]+:/i.test(lines[i]) && /\[\d+\s*marks?\]/i.test(lines[i])) count++;
        if (count === rowIdx) {
            const newTag = newType === 'Core' ? 'CORE' : 'EXTENDED';
            lines[i] = lines[i]
                .replace(/\[CORE\]/g, '[__NEWTYPE__]')
                .replace(/\[EXTENDED\]/g, '[__NEWTYPE__]')
                .replace('[__NEWTYPE__]', `[${newTag}]`);
            break;
        }
    }
    _pendingExtractedText = lines.join('\n');
    const allSels = document.querySelectorAll('#review-table-body select');
    let c2=0, e2=0;
    allSels.forEach(s => {
        if (s.value === 'Core') c2++;
        if (s.value === 'Extended') e2++;
    });
    const cc = document.getElementById('review-core-count');
    const ec = document.getElementById('review-ext-count');
    if (cc) cc.textContent = c2 + ' Core';
    if (ec) ec.textContent = e2 + ' Extended';
}

function closeReviewModal() {
    const rm = document.getElementById('review-modal');
    if (rm) rm.style.display = 'none';
    _pendingExtractedText = '';
}

function confirmReviewAndAnalyse() {
    window.extractedClassifications = {};
    window.extractedTopics = {};
    const qLines = _pendingExtractedText.split('\n');
    qLines.forEach(line => {
        if (!/\[\d+\s*marks?\]/i.test(line)) return;
        const m = line.match(/^Q([\d]+)\(([^)]+)\)(?:\(([^)]+)\))?(?:\(([^)]+)\))?\s*:.*?\[(CORE|EXTENDED)\]/);
        if (m) {
            let qid = m[1] + '(' + m[2] + ')';
            if (m[3]) qid += '(' + m[3] + ')';
            if (m[4]) qid += '(' + m[4] + ')';
            const rawType = m[5];
            let confirmedType = (rawType === 'CORE' ? 'Core' : 'Extended');
            const topicM2 = line.match(/\[Topic\s+([\d]+\.[\d]+)/i);
            if (topicM2 && IGCSE_BIOLOGY_SYLLABUS_2026) {
                const sE = IGCSE_BIOLOGY_SYLLABUS_2026[topicM2[1]];
                if (sE) {
                    const hasCore = sE.core && sE.core.length > 0;
                    const hasSupp = sE.supplement && sE.supplement.length > 0;
                    if (!hasCore && hasSupp) confirmedType = 'Extended';
                    else if (hasCore && !hasSupp) confirmedType = 'Core';
                }
            }
            window.extractedClassifications[qid] = confirmedType;
            const topicM3 = line.match(/\[(?:Topic )?([\d]+)\.([\d]+)[:\s\u2013-]*([^\]]+)\]/);
            if (topicM3) {
                window.extractedTopics[qid] = {
                    subtopicId: topicM3[1] + '.' + topicM3[2],
                    topicNum: parseInt(topicM3[1]),
                    subName: topicM3[3].trim()
                };
            }
        }
    });
    closeReviewModal();
    // Refresh console with final classifications
    renderConsole(_pendingExtractedText);
    const qt = document.getElementById('question-text');
    if (qt) qt.value = _pendingExtractedText;
    if (!uploadedFiles.ms) {
        showModal('Mark Scheme Required', 'Please upload the Mark Scheme PDF before confirming.');
        return;
    }
    analyzeDocuments();
}