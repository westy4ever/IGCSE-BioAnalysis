# Directory Structure
```
css/
  styles.css
js/
  analysis.js
  api.js
  biohub.js
  export.js
  extract.js
  globals.js
  init.js
  syllabus.js
  ui.js
index.html
README.md
```

# Files

## File: css/styles.css
````css
/* ========== BioHub OS Base Styles ========== */
:root {
    --amoled: #000000;
    --zinc-950: #09090b;
    --zinc-900: #121214;
    --zinc-800: #1e1e20;
    --studypal-orange: #ff4500;
    --border: #27272a;
}
body { font-family: 'Inter', sans-serif; background-color: var(--amoled); color: #f4f4f5; margin: 0; height: 100vh; display: flex; overflow: hidden; transition: background 0.3s, color 0.3s; }
.sidebar { width: 72px; background-color: var(--amoled); border-right: 1px solid var(--border); display: flex; flex-direction: column; align-items: center; padding: 24px 0; flex-shrink: 0; z-index: 100; transition: background 0.3s, border-color 0.3s; }
.nav-item { width: 48px; height: 48px; margin-bottom: 16px; border-radius: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; color: #52525b; position: relative; }
.nav-item:hover { color: #fff; background: var(--zinc-900); }
.nav-item.active { background: rgba(255, 69, 0, 0.15); color: var(--studypal-orange); box-shadow: inset 0 0 0 1px var(--studypal-orange); }
.main-stage { flex-grow: 1; display: flex; flex-direction: column; min-width: 0; height: 100vh; }
.page { display: none; height: calc(100vh - 64px); width: 100%; overflow: hidden; }
.page.active { display: flex; flex-direction: column; }
.dual-viewport { display: flex; flex: 1; overflow: hidden; }
.pdf-pane { flex: 1; display: flex; flex-direction: column; border-right: 1px solid var(--border); height: 100%; }
.scroll-container { flex: 1; overflow-y: auto; overflow-x: auto; padding: 40px 0; display: flex; flex-direction: column; align-items: center; background: #0a0a0a; }
canvas { background: white; box-shadow: 0 0 40px rgba(0,0,0,0.7); max-width: 95%; height: auto !important; }
.viewer-header { height: 48px; background: var(--zinc-950); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 16px; gap: 12px; flex-shrink: 0; }
.media-group { display: flex; gap: 4px; background: var(--zinc-900); padding: 4px; border-radius: 8px; border: 1px solid var(--border); }
.hub-btn { font-size: 9px; font-weight: 800; padding: 6px 10px; border-radius: 6px; background: var(--zinc-800); color: #a1a1aa; transition: 0.2s; cursor: pointer; }
.hub-btn:hover { background: var(--studypal-orange); color: white; }
.card-container { perspective: 1000px; width: 460px; height: 280px; cursor: pointer; }
.card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.4s ease; transform-style: preserve-3d; }
.card-inner.flipped { transform: rotateY(180deg); }
.card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; padding: 40px; border-radius: 24px; border: 1px solid var(--border); text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.card-front { background: var(--zinc-900); color: white; border: 2px solid #1e1e20; font-size: 1.2rem; font-weight: 600; }
.card-back { background: var(--studypal-orange); color: white; transform: rotateY(180deg); font-size: 1.15rem; font-weight: 500; display: flex; flex-direction: column; gap: 8px; }
.tool-btn { background: var(--zinc-800); border: 1px solid #333; color: #a1a1aa; padding: 6px 12px; border-radius: 6px; font-size: 10px; font-weight: 700; cursor: pointer; }
.tool-btn:hover { border-color: var(--studypal-orange); color: white; }
.primary-btn { background: var(--studypal-orange); color: white; font-weight: 700; padding: 14px; border-radius: 12px; width: 100%; cursor: pointer; transition: background 0.2s; }
.primary-btn:hover { background: #e03d00; }
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--studypal-orange); }

/* ========== Dark Mode Overrides ========== */
body.dark-mode {
    background-color: #1a1a1a;
    color: #f8fafc;
}
body.dark-mode .sidebar {
    background-color: #000000;
    border-right-color: #27272a;
}
body.dark-mode .nav-item:hover {
    background: #1e1e20;
}
body.dark-mode .bg-white,
body.dark-mode .bg-zinc-900,
body.dark-mode .bg-slate-50,
body.dark-mode .bg-slate-100,
body.dark-mode .bg-indigo-50,
body.dark-mode .bg-purple-50,
body.dark-mode .bg-emerald-50,
body.dark-mode .bg-amber-50,
body.dark-mode .bg-blue-50,
body.dark-mode .bg-orange-50,
body.dark-mode .bg-red-50 {
    background-color: #2d2d2d !important;
    border-color: #404040 !important;
    color: #e2e8f0 !important;
}
body.dark-mode .text-slate-900,
body.dark-mode .text-slate-800,
body.dark-mode .text-slate-700,
body.dark-mode .text-slate-600,
body.dark-mode .text-gray-800 {
    color: #f8fafc !important;
}
body.dark-mode .text-slate-500,
body.dark-mode .text-slate-400 {
    color: #9ca3af !important;
}
body.dark-mode .border-slate-200,
body.dark-mode .border-slate-100,
body.dark-mode .border-zinc-800 {
    border-color: #4b5563 !important;
}
body.dark-mode .file-input-label {
    background: #2d2d2d;
    border-color: #6b7280;
    color: #a1a1aa;
}
body.dark-mode .file-input-label:hover {
    border-color: var(--studypal-orange);
    background: #1f1f23;
}
body.dark-mode .core-panel {
    background: linear-gradient(to bottom, #1e3a8a, #2d2d2d);
    border-left-color: #1d4ed8;
}
body.dark-mode .extended-panel {
    background: linear-gradient(to bottom, #7c2d12, #2d2d2d);
    border-left-color: #c2410c;
}
body.dark-mode .badge-core {
    background: #1e3a8a;
    color: #93c5fd;
}
body.dark-mode .badge-extended {
    background: #7c2d12;
    color: #fed7aa;
}
body.dark-mode .badge-current {
    background: #1e3a8a;
    color: #93c5fd;
}
body.dark-mode .badge-removed {
    background: #7f1d1d;
    color: #fecaca;
}
body.dark-mode .explanation-box {
    background: #1f2937;
    border-color: #374151;
}
body.dark-mode .mistakes-box {
    background: #2a0f0f;
    border-color: #7f1d1d;
}
body.dark-mode .analysis-header {
    border-left-color: var(--studypal-orange);
}
body.dark-mode .tool-btn {
    background: #1e1e20;
    border-color: #3f3f46;
    color: #a1a1aa;
}
body.dark-mode .tool-btn:hover {
    border-color: var(--studypal-orange);
    color: white;
}
body.dark-mode .primary-btn {
    background: var(--studypal-orange);
}
body.dark-mode .primary-btn:hover {
    background: #e03d00;
}
body.dark-mode .summary-table th {
    background-color: #1f2937;
    color: #9ca3af;
}
body.dark-mode .summary-table td {
    border-bottom-color: #4b5563;
}

/* Core/Extended panel base styles (light mode) */
.core-panel {
    border-top: 5px solid #0284c7;
    border-left: 3px solid #bae6fd;
    background: linear-gradient(to bottom, #f0f9ff, white);
}
.extended-panel {
    border-top: 5px solid #ea580c;
    border-left: 3px solid #fed7aa;
    background: linear-gradient(to bottom, #fff7ed, white);
}
.badge-core {
    background-color: #dbeafe;
    color: #1d4ed8;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
}
.badge-extended {
    background-color: #ffedd5;
    color: #c2410c;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
}
.badge-current {
    background-color: #dbeafe;
    color: #1d4ed8;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
}
.badge-removed {
    background-color: #fee2e2;
    color: #991b1b;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
}
.api-input-container { position: relative; display: flex; align-items: center; }
.api-input { flex: 1; padding-right: 40px; }
.eye-icon { position: absolute; right: 10px; cursor: pointer; color: #64748b; }
.eye-icon:hover { color: #4f46e5; }
.status-ready { color: #10b981; font-weight: bold; }
.status-extracting { color: #f59e0b; font-weight: bold; animation: pulse 1.5s infinite; }
.status-complete { color: #10b981; font-weight: bold; }
.status-error { color: #ef4444; font-weight: bold; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

/* ========== REVIEW MODAL STYLES (fix readability) ========== */
#review-modal .bg-zinc-900 {
    background-color: #1e1e20 !important;
}
#review-modal .text-white {
    color: #ffffff !important;
}
#review-modal .text-slate-400 {
    color: #9ca3af !important;
}
#review-modal .border-zinc-800 {
    border-color: #3f3f46 !important;
}
#review-modal .bg-zinc-800 {
    background-color: #27272a !important;
}
#review-modal .text-slate-300 {
    color: #d4d4d8 !important;
}
#review-modal .text-slate-600 {
    color: #a1a1aa !important;
}
#review-modal .text-slate-700 {
    color: #e4e4e7 !important;
}
#review-modal .bg-orange-900 {
    background-color: #7c2d12 !important;
    color: #fed7aa !important;
}
#review-modal .bg-orange-600 {
    background-color: #ea580c !important;
}
#review-modal .hover\:bg-orange-700:hover {
    background-color: #c2410c !important;
}
/* Light mode review modal overrides */
body:not(.dark-mode) #review-modal .bg-zinc-900 {
    background-color: #ffffff !important;
    border-color: #e5e7eb !important;
}
body:not(.dark-mode) #review-modal .text-white {
    color: #1f2937 !important;
}
body:not(.dark-mode) #review-modal .text-slate-400 {
    color: #6b7280 !important;
}
body:not(.dark-mode) #review-modal .border-zinc-800 {
    border-color: #e5e7eb !important;
}
body:not(.dark-mode) #review-modal .bg-zinc-800 {
    background-color: #f3f4f6 !important;
}
body:not(.dark-mode) #review-modal .text-slate-300 {
    color: #374151 !important;
}
body:not(.dark-mode) #review-modal .text-slate-600 {
    color: #4b5563 !important;
}
body:not(.dark-mode) #review-modal .text-slate-700 {
    color: #1f2937 !important;
}
body:not(.dark-mode) #review-modal .bg-orange-900 {
    background-color: #fed7aa !important;
    color: #9a3412 !important;
}
/* Table cells in review modal */
#review-table-body td {
    color: inherit !important;
}
#review-table-body select {
    color: white !important;
}
body:not(.dark-mode) #review-table-body select {
    color: white !important; /* keep white text on colored background */
}
@media print {
    .no-print { display: none; }
    body { background-color: white; color: black; }
}
````

## File: js/analysis.js
````javascript
// ================================================================
// CORE ANALYSIS & RENDERING (with removed questions in summary, exhaustive model answer)
// ================================================================
async function analyzeDocuments() {
    if (isAnalyzing) { showModal('Please Wait', 'Analysis already in progress.'); return; }
    if (!syllabusParser.isSyllabusLoaded()) { showModal('Syllabus Required', 'Please load the Syllabus first.'); return; }
    if (!validateApiKey(getApiKey())) { showModal('Invalid API Key', 'Please enter a valid Gemini API key.'); return; }

    isAnalyzing = true;
    document.getElementById('loading')?.classList.remove('hidden');
    document.getElementById('results-area')?.classList.remove('hidden');
    document.getElementById('analyze-btn').disabled = true;

    const subjectInput = document.getElementById('subject')?.value || '';
    const paperParts = subjectInput.split(' ');
    currentPaperCode = paperParts.length > 1 ? paperParts[paperParts.length - 1] : subjectInput;
    const _subjectKey = detectSubjectKey(subjectInput);
    currentSubject = getSubjectLabel(_subjectKey);
    const biologyRef = getBiologyRef();
    const syllabusForPrompt = syllabusParser.getStructuredForPrompt();

    const parts = [
        { inlineData: { data: uploadedFiles.exam.data, mimeType: uploadedFiles.exam.mimeType } },
        { inlineData: { data: uploadedFiles.ms.data, mimeType: uploadedFiles.ms.mimeType } }
    ];
    if (uploadedFiles.comments) {
        parts.push({ inlineData: { data: uploadedFiles.comments.data, mimeType: uploadedFiles.comments.mimeType } });
    }

    let lockedClassTable = '';
    const lc = window.extractedClassifications || {};
    const lcKeys = Object.keys(lc);
    if (lcKeys.length > 0) {
        lockedClassTable = '\n\nLOCKED CLASSIFICATIONS — from pre-analysis (DO NOT OVERRIDE THESE):\n';
        lockedClassTable += 'These Core/Extended values were determined by careful analysis of the exam questions. ';
        lockedClassTable += 'Use them EXACTLY as given for the currType field. Do not re-classify.\n';
        lcKeys.forEach(qid => {
            const topicInfo = (window.extractedTopics || {})[qid];
            const topicStr = topicInfo ? ` [Topic ${topicInfo.subtopicId} ${topicInfo.subName}]` : '';
            lockedClassTable += `  Q${qid}: ${lc[qid]}${topicStr}\n`;
        });
        lockedClassTable += 'If a question ID is not listed above, classify it yourself using the reference below.\n';
        lockedClassTable += 'TOPIC: where a [Topic N.N] is given above, use that subtopicId and subTopic — do not re-derive the topic from scratch.\n';
    }

    const sysPrompt = `You are an expert Cambridge IGCSE examiner analyzing a Biology exam paper, its mark scheme, and (if provided) a teacher comments / examiner report PDF.

READ EVERY SINGLE PAGE of every uploaded PDF. Do not skip any page. Do not summarise or truncate. This includes:
- Every question and every sub-part (1a, 1b, 1b(i), 1b(ii), etc.)
- All data in tables, graphs, and diagrams — describe them fully in words inside the "text" field
- Every mark scheme point for every sub-part
- All examiner/teacher comments if a comments PDF was uploaded

${lockedClassTable}CLASSIFICATION — the currType for every sub-question is already determined and provided in the LOCKED CLASSIFICATIONS table above. You do NOT need to classify anything yourself. Your only job is to generate the content fields (text, ms, model, explanation, commonMistakes, examTips, feedback, tutorNote) for each question.

For Cambridge papers: Core = "Core", Supplement/Extended = "Extended".

For the rare case where a question ID is not in the locked table:
- "Core" = concept is in the C/Section A column of the reference below
- "Extended" = concept is ONLY in the E/Section B column
- "removed" = topic no longer in current syllabus

${_subjectKey === "cambridge_biology_0610" || !_subjectKey ? biologyRef : (getClassificationRef(_subjectKey) || biologyRef)}${syllabusForPrompt.substring(0, 15000)}

For EVERY **leaf sub-question** (the deepest level that has marks assigned) return a JSON object with these fields:

CRITICAL OUTPUT RULE — LEAF SUB-QUESTIONS ONLY:
Output ONE JSON object per LEAF sub-question (the deepest level that has marks assigned).
NEVER output a parent question if it has sub-parts with their own marks.
Example: if Q1 has parts (a) and (b), and Q1(a) has parts (i) and (ii), output:
  Q1(a)(i), Q1(a)(ii), Q1(b)  ← CORRECT
  Q1, Q1(a), Q1(a)(i), Q1(a)(ii), Q1(b)  ← WRONG — duplicates parent entries
Only include a parent (e.g. Q1(a)) if it has NO further sub-parts.

- qID: string — exact identifier e.g. "1(a)(i)", "2(b)", "3(c)(ii)"
- topic: string — main biology topic name e.g. "Photosynthesis", "Cell Structure"
- subtopicId: string — syllabus subtopic number e.g. "6.1", "2.1", "17.2" — match exactly to the syllabus provided
- subTopic: string — specific concept tested within that subtopic
- currType: "Core" or "Extended" — CRITICAL: if this question ID appears in the LOCKED CLASSIFICATIONS table above, you MUST use that value exactly. Only classify yourself if not in the locked table.
- syllabusStatus: "current" or "removed"
- syllabusBadge: "✅ CURRENT" or "🟥 REMOVED"
- classificationReason: string — one sentence citing the exact syllabus point
- marks: number (must be > 0 for leaf sub-questions)
- difficulty: "Easy", "Medium", or "Hard"
- timeEstimate: number — suggested minutes to answer

- text: string — Return as RAW HTML (no Markdown). Use these rules:
  • Wrap the parent stem/context in <p class="q-stem">stem text</p> — ONLY include if this question has a parent stem not already shown.
  • Wrap each sub-part in <div class="q-subpart"><span class="q-label">(a)(i)</span><span class="q-body">instruction <span class="q-marks-pill">N marks</span><span class="q-ans-line"></span></span></div>
  • Tables → <table class="q-table"><thead>...</thead><tbody>...</tbody></table>
  • Figures → <div class="q-fig">[Insert Fig N.N here]<br><small>Labels: A, B, C</small></div>
  • For multiple choice: list options as A) ... <br> B) ... etc inside the q-body span.
  • For fill-in-blanks: reproduce sentence with __________ where blanks appear.
  • For calculations: include all given numerical values with units in the q-body.
  • Answer lines: use <span class="q-ans-line"></span> — one per mark for written questions.
  • Use <em> for italics (species names, variables). Use <strong style="font-weight:500"> for emphasis words like "not", "two".
  • Do NOT include <script>, inline event handlers, or unsafe HTML.
  • If there is no parent stem (standalone question), just write the instruction directly in the q-body.

- ms: string — ALL mark scheme points, one per line, each starting with a structured prefix:
  ✓ correct answer point (use for each distinct marking point)
  ~ accept alternative (what the examiner will also credit)
  ✗ reject / do not accept (penalised wrong answers)
  ℹ️ examiner note (e.g. "must refer to...", "allow ecf", "ignore...")
  Put each point on its own line. Do not use paragraphs or commas to chain points.

- model: string — Write a comprehensive model answer derived STRICTLY from the mark scheme and Cambridge 0610 syllabus. 
  **CRITICAL INSTRUCTIONS FOR MODEL ANSWER:**
  1. IGNORE all quantity limiters. Do NOT limit yourself to "two", "three", "any two from", "any six from", etc. Include EVERY relevant biological point from the mark scheme AND every related point from the syllabus for this subtopic.
  2. For each marking point, expand with the full biological explanation as the syllabus requires.
  3. Use command-word conventions: Calculate → numbered working steps. Compare → explicit similarities AND differences. Explain → cause→mechanism→effect chain. Describe → sequential observable steps.
  4. Bold key biological terms with **term**.
  5. Write as flowing prose. No bullet points.
  6. If the mark scheme has 6 possible points but the question says "state two", still write all 6 — the student uses this to revise every possible answer.
  7. For calculations, present numbered steps (Step 1: ... Step 2: ...).

- explanation: string — a thorough paragraph explaining the underlying biology concept being tested.
- steps: string — ALWAYS empty string "".
- feedback: string — examiner report / teacher comment about this specific question or topic.
- tutorNote: string — a tutor's personal note.
- commonMistakes: string — the most frequent errors students make on this specific question.
- examTips: string — specific exam technique advice for this question type.

Return ONLY a valid JSON array. No markdown, no code fences, no extra text before or after.`;

    try {
        document.getElementById('loading-text').innerText = 'Gemini reading all PDF pages — this may take up to 2 minutes for a full paper…';
        const payload = {
            systemInstruction: { parts: [{ text: sysPrompt }] },
            contents: [{ parts }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
        };
        const data = await callGeminiAPI(payload, 150000);
        const anaRaw = data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.candidates?.[0]?.content?.parts?.map?.(p=>p.text||'').join('') || '';
        if (!anaRaw) throw new Error('Gemini returned empty analysis.');

        function sanitiseJSON(raw) {
            let s = raw.replace(/^```(?:json)?\s*/i,'').replace(/```\s*$/,'').trim();
            const arr = s.match(/\[[\s\S]*\]/); if(!arr) return s; s = arr[0];
            let out='',inStr=false,esc=false;
            for(let i=0;i<s.length;i++){const ch=s[i];if(esc){out+=ch;esc=false;continue;}if(ch==='\\'){esc=true;out+=ch;continue;}if(ch==='"'){inStr=!inStr;out+=ch;continue;}if(inStr){if(ch==='\n'){out+='\\n';continue;}if(ch==='\r'){out+='\\r';continue;}if(ch==='\t'){out+='\\t';continue;}if(ch.charCodeAt(0)<0x20){out+='\\u'+ch.charCodeAt(0).toString(16).padStart(4,'0');continue;}}out+=ch;}
            if(inStr) out+='"';
            const opens=(out.match(/\[/g)||[]).length, closes=(out.match(/\]/g)||[]).length;
            for(let i=0;i<opens-closes;i++) out+='}]';
            return out;
        }

        let results;
        try{results=JSON.parse(anaRaw);}catch(e1){try{results=JSON.parse(sanitiseJSON(anaRaw));}catch(e2){const m=anaRaw.match(/\[[\s\S]*\]/);if(!m)throw new Error('Gemini did not return a JSON array.');try{results=JSON.parse(m[0]);}catch(e3){results=JSON.parse(sanitiseJSON(m[0]));}}}
        if (!Array.isArray(results)) throw new Error('API response is not an array');

        // Only keep leaf sub-questions (those with marks > 0)
        let leafResults = results.filter(q => {
            const hasMarks = q.marks && parseInt(q.marks) > 0;
            const hasText = q.text && q.text.trim().length > 0;
            return hasMarks && hasText;
        });

        // Apply locked classifications
        const locked = window.extractedClassifications || {};
        const lockMisses = [];
        leafResults = leafResults.map(q => {
            let finalType = (q.currType === 'Core' || q.currType === 'Extended') ? q.currType : 'Core';
            let matchedKey = null;
            if (q.qID) {
                if (locked[q.qID]) {
                    matchedKey = q.qID;
                    finalType = locked[matchedKey];
                } else {
                    const normQid = q.qID.replace(/[\s()]/g, '').toLowerCase();
                    matchedKey = Object.keys(locked).find(k => k.replace(/[\s()]/g,'').toLowerCase() === normQid) || null;
                    if (!matchedKey) {
                        const fuzzyQid = q.qID.replace(/[^a-z0-9]/gi,'').toLowerCase();
                        matchedKey = Object.keys(locked).find(k => k.replace(/[^a-z0-9]/gi,'').toLowerCase() === fuzzyQid) || null;
                    }
                    if (matchedKey) finalType = locked[matchedKey];
                    else if (Object.keys(locked).length > 0) lockMisses.push(q.qID);
                }
            }
            const lockedTopics = window.extractedTopics || {};
            let topicOverride = null;
            if (q.qID) {
                if (lockedTopics[q.qID]) topicOverride = lockedTopics[q.qID];
                else {
                    const normQ = q.qID.replace(/[^a-z0-9]/gi,'').toLowerCase();
                    const tk = Object.keys(lockedTopics).find(k => k.replace(/[^a-z0-9]/gi,'').toLowerCase() === normQ);
                    if (tk) topicOverride = lockedTopics[tk];
                }
            }
            const topicNum = topicOverride ? topicOverride.topicNum : (q.subtopicId ? parseInt(q.subtopicId.split('.')[0]) : null);
            const canonTopic = topicNum && TOPIC_NAMES[topicNum] ? TOPIC_NAMES[topicNum] : q.topic;
            return {
                ...q,
                currType: finalType,
                lockMatched: !!matchedKey,
                syllabusStatus: q.syllabusStatus || 'current',
                syllabusBadge: q.syllabusBadge || '✅ CURRENT',
                subtopicId: topicOverride ? topicOverride.subtopicId : (q.subtopicId || ''),
                subTopic: topicOverride ? topicOverride.subName : (q.subTopic || ''),
                topic: topicOverride ? canonTopic : (q.topic || '')
            };
        });
        if (lockMisses.length > 0) console.warn('[Analysis] Lock miss – qIDs without match:', lockMisses.join(', '));

        currentResults = leafResults;
        const removed = leafResults.filter(q => q.syllabusStatus === 'removed');
        const warningsDiv = document.getElementById('syllabus-warnings');
        if (warningsDiv && removed.length > 0) {
            let html = '<div class="syllabus-warning"><span class="font-bold">⚠️ REMOVED CONTENT — DO NOT STUDY THESE</span><ul class="list-disc pl-5 mt-2 text-xs">';
            removed.forEach(q => { html += `<li>Question ${q.qID}: ${q.topic} — ${q.subTopic || ''}</li>`; });
            html += '</ul></div>';
            warningsDiv.innerHTML = html;
        } else if (warningsDiv) warningsDiv.innerHTML = '';

        renderStats(leafResults);
        renderHeatmap(leafResults);
        renderRecommendations(leafResults);
        renderSummary(leafResults, currentPaperCode);
        renderCards(leafResults, currentPaperCode);
        updateStudyGuide();

        const coreN = leafResults.filter(q => q.currType === 'Core').length;
        const extN = leafResults.filter(q => q.currType === 'Extended').length;
        const remN = removed.length;
        showModal('✅ Analysis Complete', `${leafResults.length} questions:\n🔵 Core: ${coreN}\n🟠 Extended: ${extN}\n🟥 Removed: ${remN}`);
    } catch (e) {
        console.error('[v51] Analysis failed:', e);
        showModal('Analysis Failed', e.message);
        document.getElementById('results-area')?.classList.add('hidden');
    } finally {
        isAnalyzing = false;
        document.getElementById('loading')?.classList.add('hidden');
        document.getElementById('analyze-btn').disabled = false;
    }
}

function renderStats(data) {
    const dashboard = document.getElementById('stats-dashboard');
    if (!dashboard) return;
    const coreCount = data.filter(q=>q.currType==='Core').length;
    const extCount = data.filter(q=>q.currType==='Extended').length;
    const remCount = data.filter(q=>q.syllabusStatus==='removed').length;
    const totalMarks = data.reduce((s,q)=>s+(q.marks||0),0);
    dashboard.innerHTML = `
        <div class="stats-card bg-blue-50 p-4 rounded-xl text-center border-t-4 border-blue-400"><div class="text-2xl font-bold text-blue-600">${coreCount}</div><div class="text-xs font-bold">🔵 Core</div><div class="text-[10px] text-slate-500">Must Study</div></div>
        <div class="stats-card bg-orange-50 p-4 rounded-xl text-center border-t-4 border-orange-400"><div class="text-2xl font-bold text-orange-600">${extCount}</div><div class="text-xs font-bold">🟠 Extended</div><div class="text-[10px] text-slate-500">Paper 4 Only</div></div>
        <div class="stats-card bg-red-50 p-4 rounded-xl text-center border-t-4 border-red-400"><div class="text-2xl font-bold text-red-600">${remCount}</div><div class="text-xs font-bold">🟥 Removed</div><div class="text-[10px] text-slate-500">Ignore</div></div>
        <div class="stats-card bg-purple-50 p-4 rounded-xl text-center border-t-4 border-purple-400"><div class="text-2xl font-bold text-purple-600">${totalMarks}</div><div class="text-xs font-bold">Total Marks</div></div>
    `;
}

function renderHeatmap(data) {
    const topics = {};
    data.forEach(q => {
        const t = q.topic || 'Other';
        if (!topics[t]) topics[t] = { easy: 0, medium: 0, hard: 0, type: q.currType };
        if (q.difficulty==='Easy') topics[t].easy++;
        else if (q.difficulty==='Hard') topics[t].hard++;
        else topics[t].medium++;
    });
    const heatmap = document.getElementById('heatmap');
    const grid = document.getElementById('heatmap-grid');
    if (!heatmap || !grid || Object.keys(topics).length===0) return;
    heatmap.classList.remove('hidden');
    grid.innerHTML = Object.entries(topics).map(([topic, c]) => {
        const total = c.easy+c.medium+c.hard||1;
        const score = (c.easy+c.medium*2+c.hard*3)/total;
        const color = score>2?'bg-red-100':score>1.5?'bg-amber-100':'bg-green-100';
        const icon = c.type==='Core'?'🔵':'🟠';
        return `<div class="${color} p-2 rounded text-center" title="${topic}"><div class="font-bold text-xs">${icon} ${topic.substring(0,12)}</div><div class="text-[9px]">E:${c.easy} M:${c.medium} H:${c.hard}</div></div>`;
    }).join('');
}

function renderRecommendations(data) {
    const coreCount = data.filter(q=>q.currType==='Core').length;
    const extCount = data.filter(q=>q.currType==='Extended').length;
    const remCount = data.filter(q=>q.syllabusStatus==='removed').length;
    const recsDiv = document.getElementById('recommendations');
    const recsContent = document.getElementById('recommendations-content');
    if (!recsDiv || !recsContent) return;
    recsDiv.classList.remove('hidden');
    let html = '';
    if (coreCount > 0) html += `<p class="text-xs text-blue-600 mb-1">📚 <strong>${coreCount} Core questions</strong> — ALL students must study these topics</p>`;
    if (extCount > 0) html += `<p class="text-xs text-orange-600 mb-1">📘 <strong>${extCount} Extended questions</strong> — Only if you're taking the Extended (Paper 4) tier</p>`;
    if (remCount > 0) html += `<p class="text-xs text-red-600 mb-1">🚫 <strong>${remCount} Removed questions</strong> — These topics are no longer in the 2023–2028 syllabus. IGNORE them.</p>`;
    recsContent.innerHTML = html || '<p class="text-xs">All questions are current syllabus content.</p>';
}

function setSummarySort(mode) {
    const sh = document.getElementById('summary-heading');
    if (sh) sh.textContent = mode === 'topic' ? 'Summary — Topic Order' : 'Summary — Exam Order';
    summarySortMode = mode;
    const examBtn = document.getElementById('sort-exam-btn');
    const topicBtn = document.getElementById('sort-topic-btn');
    if (examBtn && topicBtn) {
        examBtn.className = mode==='exam'
            ? 'text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white transition'
            : 'text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition';
        topicBtn.className = mode==='topic'
            ? 'text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white transition'
            : 'text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition';
    }
    if (currentResults.length) {
        renderSummary(currentResults, currentPaperCode);
        let orderedData;
        if (mode === 'topic') {
            orderedData = [...currentResults].sort((a, b) => {
                const toKey = r => {
                    if (!r.subtopicId) return [9999, 9999];
                    const parts = r.subtopicId.split('.').map(Number);
                    return [parts[0] || 9999, parts[1] || 0];
                };
                const [am, an] = toKey(a), [bm, bn] = toKey(b);
                return am !== bm ? am - bm : an - bn;
            });
        } else {
            orderedData = currentResults;
        }
        renderCards(orderedData, currentPaperCode);
    }
}

function qIDSortKey(qid) {
    let nums = [];
    let s = String(qid);
    let m = s.match(/^(\d+)/);
    if (m) nums.push(parseInt(m[1])); else nums.push(0);
    let parts = s.match(/\(([^)]+)\)/g) || [];
    parts.forEach(p => {
        let inner = p.slice(1,-1).toLowerCase();
        let roman = {i:1,ii:2,iii:3,iv:4,v:5,vi:6,vii:7,viii:8,ix:9,x:10,xi:11,xii:12};
        if (roman[inner] !== undefined) nums.push(roman[inner]);
        else if (/^\d+$/.test(inner)) nums.push(parseInt(inner));
        else if (/^[a-z]$/.test(inner)) nums.push(inner.charCodeAt(0) - 96);
        else nums.push(0);
    });
    while (nums.length < 4) nums.push(0);
    return nums;
}

function compareQIDs(a, b) {
    let ka = qIDSortKey(a), kb = qIDSortKey(b);
    for (let i = 0; i < ka.length; i++) {
        if (ka[i] !== kb[i]) return ka[i] - kb[i];
    }
    return 0;
}

// ========== UPDATED renderSummary – includes removed questions ==========
function renderSummary(data, paperCode) {
    // DO NOT filter out removed questions – show them with a "Removed" badge
    const stats = {};
    const keyOrder = [];
    let totalMarks = 0;

    data.forEach(q => {
        const key = q.subtopicId ? q.subtopicId : (q.topic || 'Other');
        if (!stats[key]) {
            const tNum = q.subtopicId ? parseInt(q.subtopicId.split('.')[0]) : 0;
            const syllEntry = q.subtopicId && IGCSE_BIOLOGY_SYLLABUS_2026[q.subtopicId];
            const canonicalSubName = syllEntry ? syllEntry.name : (q.subTopic || q.topic || '');
            const canonicalTopicName = (tNum && TOPIC_NAMES[tNum]) ? TOPIC_NAMES[tNum] : (q.topic || '');
            stats[key] = {
                subtopicId: q.subtopicId || '',
                canonicalSubName,
                canonicalTopicName,
                tNum,
                marks: 0, questions: [], types: [], statuses: []
            };
            keyOrder.push(key);
        }
        const st = stats[key];
        st.marks += parseInt(q.marks) || 0;
        if (!st.questions.find(x => x.qID === q.qID)) {
            st.questions.push({ qID: q.qID, type: q.currType || 'Core', status: q.syllabusStatus || 'current' });
            st.types.push(q.currType || 'Core');
            st.statuses.push(q.syllabusStatus || 'current');
        }
        totalMarks += parseInt(q.marks) || 0;
    });

    const body = document.getElementById('summary-body');
    if (!body) return;
    const paperPrefix = currentPaperCode ? currentPaperCode + '/' : '';

    function buildPills(questions) {
        const sorted = [...questions].sort((a, b) => compareQIDs(a.qID, b.qID));
        return sorted.map(q => {
            let pc = '';
            if (q.status === 'removed') pc = 'bg-red-100 text-red-700';
            else pc = q.type === 'Core' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700';
            return '<span class="inline-block ' + pc + ' text-[9px] font-bold px-1.5 py-0.5 rounded mr-0.5 mb-0.5">'
                + paperPrefix + 'Q' + q.qID + '</span>';
        }).join('');
    }

    function buildTypePills(types, statuses) {
        const hasRemoved = statuses.includes('removed');
        if (hasRemoved) return '<span class="badge-removed">Removed</span>';
        const coreN = types.filter(t => t === 'Core').length;
        const extN = types.filter(t => t === 'Extended').length;
        if (coreN > 0 && extN > 0) {
            return '<div><span class="badge-core">Core</span> <span class="badge-extended">Extended</span></div>';
        }
        return coreN > 0 ? '<span class="badge-core">Core</span>' : '<span class="badge-extended">Extended</span>';
    }

    if (summarySortMode === 'topic') {
        const topicMap = {};
        keyOrder.forEach(key => {
            const st = stats[key];
            const tNum = st.tNum || 0;
            if (!topicMap[tNum]) {
                topicMap[tNum] = { tNum, canonicalTopicName: st.canonicalTopicName, marks: 0, questions: [], types: [], statuses: [], subtopics: [] };
            }
            const tm = topicMap[tNum];
            tm.marks += st.marks;
            st.questions.forEach(q => { if (!tm.questions.find(x => x.qID === q.qID)) tm.questions.push(q); });
            tm.types.push(...st.types);
            tm.statuses.push(...st.statuses);
            if (st.subtopicId && !tm.subtopics.includes(st.subtopicId)) tm.subtopics.push(st.subtopicId);
        });
        const sortedTopicNums = Object.keys(topicMap).map(Number).sort((a, b) => a - b);
        body.innerHTML = sortedTopicNums.map(tNum => {
            const tm = topicMap[tNum];
            const pct = totalMarks > 0 ? ((tm.marks / totalMarks) * 100).toFixed(1) : '0';
            const subList = tm.subtopics.sort((a, b) => {
                const [am, an] = a.split('.').map(Number);
                const [bm, bn] = b.split('.').map(Number);
                return am !== bm ? am - bm : an - bn;
            }).join(', ');
            const topicLabel = '<div class="text-[10px] font-bold text-indigo-700">'
                + (tNum ? 'Topic ' + tNum + '. ' + tm.canonicalTopicName : tm.canonicalTopicName)
                + '</div>'
                + (subList ? '<div class="text-[9px] text-slate-500 mt-0.5">Sub-topics: ' + subList + '</div>' : '');
            const statusBadge = tm.statuses.includes('removed') ? '<span class="badge-removed">⚠️ Removed</span>' : '<span class="badge-current">✅</span>';
            return '<tr><td class="align-top">' + topicLabel + '</td>'
                + '<td class="sub-questions-cell">' + buildPills(tm.questions) + '</td>'
                + '<td class="font-bold text-center">' + tm.marks + '</td>'
                + '<td class="text-center">' + pct + '%</td>'
                + '<td class="text-center">' + buildTypePills(tm.types, tm.statuses) + '</td>'
                + '<td class="text-center">' + statusBadge + '</td>'
                + '</tr>';
        }).join('');
    } else {
        body.innerHTML = keyOrder.map(key => {
            const st = stats[key];
            const pct = totalMarks > 0 ? ((st.marks / totalMarks) * 100).toFixed(1) : '0';
            const topicLabel = st.subtopicId
                ? '<div class="text-[10px] font-bold text-indigo-700">'
                    + (st.tNum ? 'Topic ' + st.tNum + '. ' + st.canonicalTopicName : st.canonicalTopicName)
                    + '</div>'
                    + '<div class="text-[9px] text-slate-500 mt-0.5">Sub-topic: '
                    + st.subtopicId + ' ' + st.canonicalSubName + '</div>'
                : '<div class="text-[10px] font-bold text-slate-700">' + st.canonicalTopicName + '</div>';
            const statusBadge = st.statuses.includes('removed') ? '<span class="badge-removed">⚠️ Removed</span>' : '<span class="badge-current">✅</span>';
            return '<tr><td class="align-top">' + topicLabel + '</td>'
                + '<td class="sub-questions-cell">' + buildPills(st.questions) + '</td>'
                + '<td class="font-bold text-center">' + st.marks + '</td>'
                + '<td class="text-center">' + pct + '%</td>'
                + '<td class="text-center">' + buildTypePills(st.types, st.statuses) + '</td>'
                + '<td class="text-center">' + statusBadge + '</td>'
                + '</tr>';
        }).join('');
    }
}

// ========== renderCards – includes model answer with step-by-step formatting ==========
function renderCards(data, paperCode) {
    const container = document.getElementById('analysis-container');
    if (!container) return;
    container.innerHTML = data.map((p, index) => {
        const isCore = p.currType === 'Core';
        const isExt = p.currType === 'Extended';
        const diff = p.difficulty || 'Medium';
        const diffClass = diff === 'Easy' ? 'bg-green-600 text-white border-green-700' : diff === 'Hard' ? 'bg-red-600 text-white border-red-700' : 'bg-amber-500 text-white border-amber-600';
        const isRemoved = p.syllabusStatus === 'removed';
        const panelClass = isExt ? 'extended-panel' : 'core-panel';
        const studyIcon = isCore ? '🔵' : '🟠';
        const studyNote = isCore ? '🔵 Core only' : '🟠 Extended only';
        
        let cleanText = p.text || '';
        cleanText = cleanText.replace(/^(Q\d+\([^)]+\)(?:\([^)]+\))*):\s*\(\1\):\s*/i, '$1: ');
        cleanText = cleanText.replace(/^(Q\d+(?:\([^)]+\))+):\s*(\([^)]+\)):/i, '$1: ');
        
        let parentStemHtml = '';
        try {
            const qt = document.getElementById('question-text');
            const extTxt = qt ? qt.value : '';
            if (extTxt) {
                const parentMatch = extTxt.match(new RegExp('(?:^|\n)(Q' + (p.qID.match(/^(\d+)/)||['','1'])[1] + ':\\s*[^\n]+)', ''));
                if (parentMatch) {
                    const stemLine = parentMatch[1]
                        .replace(/^Q\d+:\s*/, '')
                        .replace(/\[\d+\s*marks?\]/gi, '')
                        .replace(/\[CORE\]/g, '').replace(/\[EXTENDED\]/g, '')
                        .replace(/\[(?:Topic )?[\d]+\.[\d]+[^\]]*\]/g, '')
                        .trim();
                    if (stemLine) parentStemHtml = '<div style="font-size:11px;color:#64748b;border-bottom:0.5px solid #e2e8f0;margin-bottom:6px;padding-bottom:5px;font-style:italic">' + stemLine + '</div>';
                }
            }
        } catch(e) {}
        const reasonNote = p.classificationReason ? `<span class="text-[9px] text-slate-400 ml-2" title="${p.classificationReason}">ℹ️</span>` : '';
        
        return `
        <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-6 ${panelClass} ${isRemoved?'border-2 border-rose-200':''}"
             data-question-id="${p.qID}"
             data-question-type="${p.currType}"
             data-question-status="${p.syllabusStatus||'current'}"
             data-question-difficulty="${p.difficulty||'Medium'}">
            <div class="flex justify-between items-start mb-4">
                <div class="analysis-header flex-1">
                    <h3 class="text-sm font-black text-slate-800" contenteditable="true" onblur="(function(el){var q=currentResults.find(function(x){return x.qID==='${p.qID}'});if(q)q.subTopic=el.innerText.replace(/.*—\s*/,'');persistCurrentResults();})(this)" style="outline:none;cursor:text;border-bottom:1px dashed transparent" onfocus="this.style.borderBottomColor='#6366f1'" title="Click to edit">
                        ${studyIcon} ${currentPaperCode ? currentPaperCode+'/' : ''}Q${p.qID} — ${p.subTopic||p.topic||'General'}
                    </h3>
                    <div class="flex gap-1 mt-1 flex-wrap items-center">
                        ${p.subtopicId ? (() => {
                            const tNum = parseInt(p.subtopicId.split('.')[0]);
                            const tName = TOPIC_NAMES[tNum] || p.topic || '';
                            const syllEntry = IGCSE_BIOLOGY_SYLLABUS_2026[p.subtopicId];
                            const canonicalName = syllEntry ? syllEntry.name : (p.subTopic || p.topic || '');
                            return `<span contenteditable="true" onblur="(function(el,qid){const q=currentResults.find(x=>x.qID===qid);if(q){const txt=el.innerText.trim();const m=txt.match(/(\\d+)/);if(m){const n=parseInt(m[1]);q.topic=TOPIC_NAMES[n]||txt;q.subtopicId=(q.subtopicId||qid).replace(/^\\d+/,String(n));}persistCurrentResults();renderSummary(currentResults,currentPaperCode);}})(this,'${p.qID}')" title="Click to edit topic number" class="inline-block bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-l text-[9px] cursor-text hover:bg-indigo-200 focus:outline-none focus:ring-1 focus:ring-indigo-400">Topic ${tNum}. ${tName}</span><span contenteditable="true" onblur="(function(el,qid){const q=currentResults.find(x=>x.qID===qid);if(q){const txt=el.innerText.replace(/^Sub-topic:\\s*/,'').trim();const m=txt.match(/^(\\d+\\.\\d+)\\s*(.*)/);if(m){q.subtopicId=m[1];q.subTopic=m[2]||q.subTopic;}else{q.subTopic=txt;}persistCurrentResults();renderSummary(currentResults,currentPaperCode);}})(this,'${p.qID}')" title="Click to edit subtopic" class="inline-block bg-slate-200 text-slate-600 px-2 py-0.5 rounded-r text-[9px] cursor-text hover:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400">Sub-topic: ${p.subtopicId} ${canonicalName}</span>`;
                        })() : `<span contenteditable="true" onblur="(function(el,qid){const q=currentResults.find(x=>x.qID===qid);if(q){q.topic=el.innerText.trim();persistCurrentResults();renderSummary(currentResults,currentPaperCode);}})(this,'${p.qID}')" title="Click to edit topic" class="inline-block bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[9px] cursor-text hover:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400">${p.topic||''}</span>`}
                    </div>
                    <div class="text-[9px] text-slate-400 mt-0.5 font-mono">${currentPaperCode ? currentPaperCode+'/' : ''}Q${p.qID} [<span contenteditable="true" onblur="(function(el,qid){const q=currentResults.find(x=>x.qID===qid);if(q){const n=parseInt(el.innerText);if(!isNaN(n)){q.marks=n;persistCurrentResults();el.innerText=String(n);}else{el.innerText=String(q.marks||'?');}}})(this,'${p.qID}')" title="Click to edit marks" class="cursor-text hover:text-slate-600 focus:outline-none focus:underline">${p.marks||'?'}</span> marks] [<span class="ref-type-label">${p.currType}</span>]</div>
                    <span class="text-[10px] ${isCore?'text-blue-600':'text-orange-600'} font-bold study-note-span">${studyNote}${reasonNote}</span>
                </div>
                <div class="flex flex-col gap-1.5 items-end ml-4">
                    <div class="flex gap-1 mb-1">
                        <button onclick="toggleCard('${p.qID}')" class="card-collapse-btn text-[10px] px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 rounded border text-slate-500" title="Collapse">▼</button>
                        <button onclick="removeCard('${p.qID}')" class="text-[10px] px-1.5 py-0.5 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 text-rose-400" title="Remove card">✕</button>
                    </div>
                    <select onchange="setQuestionType('${p.qID}',this.value)" data-sqid="${p.qID}"
                        class="text-[10px] font-bold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ${isCore ? 'bg-blue-600 text-white border-blue-700' : 'bg-orange-500 text-white border-orange-600'}"
                        style="appearance:auto">
                        <option value="Core" ${p.currType==='Core' ? 'selected' : ''} style="background:#2563eb;color:#fff">🔵 Core</option>
                        <option value="Extended" ${p.currType==='Extended' ? 'selected' : ''} style="background:#f97316;color:#fff">🟠 Extended</option>
                    </select>
                    <select onchange="setQuestionStatus('${p.qID}',this.value)" data-statusid="${p.qID}"
                        class="text-[10px] font-bold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ${p.syllabusStatus==='removed' ? 'bg-red-600 text-white border-red-700' : 'bg-emerald-600 text-white border-emerald-700'}"
                        style="appearance:auto">
                        <option value="current" ${p.syllabusStatus!=='removed' ? 'selected' : ''} style="background:#059669;color:#fff">✅ Current</option>
                        <option value="removed" ${p.syllabusStatus==='removed' ? 'selected' : ''} style="background:#e11d48;color:#fff">🟥 Removed</option>
                    </select>
                    <select onchange="setDifficulty('${p.qID}',this.value)" data-dqid="${p.qID}"
                        class="text-[10px] font-bold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ${diffClass}"
                        style="appearance:auto">
                        <option value="Easy" ${diff==='Easy' ? 'selected' : ''} style="background:#059669;color:#fff">⬤ Easy</option>
                        <option value="Medium" ${diff==='Medium' ? 'selected' : ''} style="background:#d97706;color:#fff">⬤ Medium</option>
                        <option value="Hard" ${diff==='Hard' ? 'selected' : ''} style="background:#dc2626;color:#fff">⬤ Hard</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                ${isRemoved ? `<div class="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg"><p class="text-xs text-rose-700 font-bold">🚫 REMOVED from 2023–2028 syllabus — do not study this topic</p></div>` : ''}
                <div class="mb-6">
                    <h4 class="text-xs font-semibold text-slate-400 uppercase mb-2">Question Text:
                        <button onclick="addImageToQuestion('${p.qID}')" class="ml-2 text-[9px] font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded hover:bg-indigo-200">📷 Add Image(s)</button>
                    </h4>
                    <div contenteditable="true" data-qid="${p.qID}" data-field="text"
                        oninput="saveField('${p.qID}','text',this)"
                        class="text-sm text-slate-700 p-4 bg-slate-50 rounded-xl border font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        style="min-height:48px;white-space:normal">${parentStemHtml}${renderQText(cleanText, p.qID)}</div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-xs font-semibold text-slate-400 uppercase mb-2">Mark Scheme:
                            <button onclick="addImageToField('${p.qID}','ms',this)" class="ml-2 text-[9px] text-slate-400 hover:text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded">📷 Add Image(s)</button>
                        </h4>
                        <div contenteditable="true" data-qid="${p.qID}" data-field="ms"
                            oninput="saveField('${p.qID}','ms',this)"
                            class="text-xs text-slate-600 p-3 bg-slate-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-slate-300" style="line-height:1.65;min-height:40px">${renderMSStructured(p.ms)}</div>
                    </div>
                    <div>
                        <h4 class="text-xs font-semibold text-slate-400 uppercase mb-2">Model Answer:
                            <button onclick="addImageToField('${p.qID}','model',this)" class="ml-2 text-[9px] text-indigo-400 hover:text-indigo-600 border border-indigo-200 px-1.5 py-0.5 rounded">📷 Add Image(s)</button>
                        </h4>
                        <div contenteditable="true" data-qid="${p.qID}" data-field="model"
                            oninput="saveField('${p.qID}','model',this)"
                            class="bg-indigo-50 p-3 rounded-lg text-xs border border-indigo-100 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-300" style="min-height:40px">${renderModelAnswer(p.model, p.marks)}</div>
                    </div>
                </div>
                <div class="mt-4 explanation-box">
                    <h4 class="text-xs font-semibold text-slate-400 uppercase mb-2">📚 Concept Explanation:</h4>
                    <div contenteditable="true" data-qid="${p.qID}" data-field="explanation"
                        oninput="saveField('${p.qID}','explanation',this)"
                        class="text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded p-1" style="min-height:32px;white-space:pre-wrap">${(p.explanation||'Not available.').replace(/\n/g,'<br>')}</div>
                </div>
                ${p.feedback && p.feedback.trim() ? `
                <div class="mt-4 p-3 rounded-lg border border-amber-200 bg-amber-50">
                    <h4 class="text-xs font-semibold text-amber-700 uppercase mb-2">💬 Examiner Feedback / Teacher Comment:</h4>
                    <div contenteditable="true" data-qid="${p.qID}" data-field="feedback"
                        oninput="saveField('${p.qID}','feedback',this)"
                        class="text-xs text-amber-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-300 rounded p-1" style="min-height:32px;white-space:pre-wrap">${p.feedback.replace(/\n/g,'<br>')}</div>
                </div>`:''}
                <div class="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 class="text-[10px] font-bold text-slate-600 mb-1">📝 TEACHER NOTES</h4>
                    <div contenteditable="true" data-qid="${p.qID}" data-field="teacherNotes"
                        oninput="saveField('${p.qID}','teacherNotes',this)"
                        placeholder="Add private notes about this question..."
                        class="text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-slate-400 rounded p-1" style="min-height:32px;white-space:pre-wrap">${(p.teacherNotes||'').replace(/\n/g,'<br>')}</div>
                </div>
                <div class="mt-3 flex justify-between items-center">
                    <span class="text-[10px] text-slate-400">Q${index+1} of ${data.length}</span>
                    <button data-flag="${p.qID}" onclick="toggleFlag('${p.qID}')"
                        title="${p.flagged?'Flagged for review — click to unflag':'Flag for review'}"
                        style="background:none;border:none;cursor:pointer;font-size:14px;opacity:${p.flagged?'1':'0.35'};color:${p.flagged?'#dc2626':'inherit'}"
                        >🚩</button>
                </div>
            </div>
        </div>`;
    }).join('');
    setTimeout(function() {
        if (!container) return;
        container.querySelectorAll('[data-qid][data-field]').forEach(function(el) {
            let q2 = el.dataset.qid; let f2 = el.dataset.field;
            if (['text','ms','model','explanation'].indexOf(f2) !== -1) setupImagePaste(el, q2, f2);
        });
    }, 60);
}

function setQuestionType(qID, newType) {
    const q = currentResults.find(x => x.qID === qID);
    if (!q) return;
    q.currType = newType;
    
    const sel = document.querySelector('select[data-sqid="'+qID+'"]');
    if (sel) {
        const cls = newType === 'Core' ? 'bg-blue-600 text-white border-blue-700' : 'bg-orange-500 text-white border-orange-600';
        sel.className = 'text-[10px] font-bold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ' + cls;
        sel.value = newType;
    }
    
    const card = document.querySelector('[data-question-id="'+qID+'"]');
    if (card) {
        card.classList.remove('core-panel', 'extended-panel');
        card.classList.add(newType === 'Extended' ? 'extended-panel' : 'core-panel');
        
        const noteSpan = card.querySelector('.study-note-span');
        if (noteSpan) {
            const isCore = newType === 'Core';
            noteSpan.textContent = isCore ? '🔵 Core only' : '🟠 Extended only';
            noteSpan.className = 'text-[10px] font-bold study-note-span ' + (isCore ? 'text-blue-600' : 'text-orange-600');
        }
        
        const refLine = card.querySelector('.ref-type-label');
        if (refLine) refLine.textContent = newType;
        
        const headerIcon = card.querySelector('.analysis-header h3');
        if (headerIcon) {
            const icon = newType === 'Core' ? '🔵' : '🟠';
            headerIcon.innerHTML = headerIcon.innerHTML.replace(/[🔵🟠]/, icon);
        }
    }
    
    renderSummary(currentResults, currentPaperCode);
    renderStats(currentResults);
    renderRecommendations(currentResults);
    updateStudyGuide();
    persistCurrentResults();
}

function setQuestionStatus(qID, newStatus) {
    const q = currentResults.find(x => x.qID === qID);
    if (!q) return;
    q.syllabusStatus = newStatus;
    q.syllabusBadge = newStatus === 'removed' ? '🟥 REMOVED' : '✅ CURRENT';
    persistCurrentResults();
    renderCards(currentResults, currentPaperCode);
    renderSummary(currentResults, currentPaperCode);
    renderStats(currentResults);
    renderRecommendations(currentResults);
    updateStudyGuide();
}

function setDifficulty(qID, newDiff) {
    const q = currentResults.find(x => x.qID === qID);
    if (!q) return;
    q.difficulty = newDiff;
    const sel = document.querySelector('select[data-dqid="'+qID+'"]');
    if (sel) {
        const cls = newDiff==='Easy' ? 'bg-green-600 text-white border-green-700' :
                    newDiff==='Hard' ? 'bg-red-600 text-white border-red-700' :
                    'bg-amber-500 text-white border-amber-600';
        sel.className = 'text-[10px] font-bold px-2 py-0.5 rounded border cursor-pointer focus:outline-none '+cls;
        sel.value = newDiff;
    }
    persistCurrentResults();
    renderStats(currentResults);
    renderRecommendations(currentResults);
    renderHeatmap(currentResults);
}

function toggleFlag(qID) {
    const q = currentResults.find(x => x.qID === qID);
    if (!q) return;
    q.flagged = !q.flagged;
    const btn = document.querySelector('button[data-flag="'+qID+'"]');
    if (btn) {
        btn.textContent = q.flagged ? '🚩' : '⚑';
        btn.title = q.flagged ? 'Flagged for review — click to unflag' : 'Flag for review';
        btn.style.opacity = q.flagged ? '1' : '0.4';
        btn.style.color = q.flagged ? '#dc2626' : '';
    }
    const card = document.querySelector('div[data-question-id="'+qID+'"]');
    if (card) {
        if (q.flagged) card.style.outline = '2px solid #dc2626';
        else card.style.outline = '';
    }
    persistCurrentResults();
    updateStudyGuide();
}

function saveField(qID, field, el) {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('[data-img-wrapper]').forEach(w => {
        const img = w.querySelector('img');
        if (img) { const ni = document.createElement('img'); ni.src=img.src; ni.style.cssText=img.style.cssText; w.replaceWith(ni); }
        else w.remove();
    });
    const q = currentResults.find(r => r.qID === qID);
    if (q) q[field] = clone.innerHTML;
    persistCurrentResults();
}

function addImageToField(qID, field, btn) {
    const el = document.querySelector('[data-qid="'+qID+'"][data-field="'+field+'"]');
    if (!el) return;
    setupImagePaste(el, qID, field);
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.multiple = true;
    input.onchange = e => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        const rowContainer = (() => {
            const existing = el.querySelector('.img-row:last-of-type');
            if (existing) return existing;
            const r = document.createElement('div');
            r.className = 'img-row';
            r.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin:8px 0;align-items:flex-start';
            el.appendChild(r);
            return r;
        })();
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = ev => insertImageIntoField(el, qID, field, ev.target.result);
            reader.readAsDataURL(file);
        });
    };
    document.body.appendChild(input); input.click(); document.body.removeChild(input);
}

function addImageToQuestion(qID) {
    const el = document.querySelector('[data-qid="'+qID+'"][data-field="text"]');
    if (!el) return;
    setupImagePaste(el, qID, 'text');
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.multiple = true;
    input.onchange = e => {
        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = ev => insertImageIntoField(el, qID, 'text', ev.target.result);
            reader.readAsDataURL(file);
        });
    };
    input.click();
}

function insertImageIntoField(el, qID, field, src) {
    let row = el.querySelector('.img-row:last-of-type');
    if (!row) {
        row = document.createElement('div');
        row.className = 'img-row';
        row.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin:8px 0;align-items:flex-start';
        el.appendChild(row);
    }
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;display:inline-block;vertical-align:top;margin:2px';
    wrapper.dataset.imgWrapper = '1';
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'display:block;width:100%;min-width:80px;border-radius:5px;border:1px solid #e2e8f0;cursor:default';
    wrapper.style.width = '50%';
    const sizeBar = document.createElement('div');
    sizeBar.style.cssText = 'position:absolute;bottom:4px;left:50%;transform:translateX(-50%);display:flex;gap:3px;background:rgba(0,0,0,0.6);border-radius:4px;padding:2px 5px;opacity:0;transition:opacity 0.15s;pointer-events:auto;z-index:2';
    ['25%','50%','75%','100%'].forEach(sz => {
        const b = document.createElement('button');
        b.textContent = sz;
        b.style.cssText = 'font-size:9px;color:#fff;background:none;border:none;cursor:pointer;padding:1px 4px;border-radius:2px';
        b.onclick = ev2 => { ev2.stopPropagation(); wrapper.style.width = sz; saveField(qID, field, el); };
        sizeBar.appendChild(b);
    });
    const del = document.createElement('button');
    del.textContent = '✕';
    del.title = 'Remove image';
    del.style.cssText = 'position:absolute;top:4px;right:4px;background:rgba(220,38,38,0.85);color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:3;line-height:1';
    del.onclick = ev2 => { ev2.stopPropagation(); wrapper.remove(); saveField(qID, field, el); };
    wrapper.onmouseenter = () => { sizeBar.style.opacity='1'; del.style.opacity='1'; };
    wrapper.onmouseleave = () => { sizeBar.style.opacity='0'; del.style.opacity='0'; };
    del.style.opacity = '0';
    wrapper.appendChild(img);
    wrapper.appendChild(sizeBar);
    wrapper.appendChild(del);
    row.appendChild(wrapper);
    saveField(qID, field, el);
}

function setupImagePaste(el, qID, field) {
    if (el._pasteBound) return;
    el._pasteBound = true;
    el.addEventListener('paste', e => {
        const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items || [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (!file) continue;
                e.preventDefault();
                const reader = new FileReader();
                reader.onload = ev => insertImageIntoField(el, qID, field, ev.target.result);
                reader.readAsDataURL(file);
            }
        }
    });
}

function toggleCard(qID) {
    const card = document.querySelector('[data-question-id="'+qID+'"]');
    if (!card) return;
    const body = card.querySelector('.card-body');
    const btn = card.querySelector('.card-collapse-btn');
    if (body) { const hidden = body.style.display === 'none'; body.style.display = hidden ? '' : 'none'; if (btn) btn.textContent = hidden ? '▼' : '▲'; }
}

function removeCard(qID) {
    currentResults = currentResults.filter(q => q.qID !== qID);
    document.querySelector('[data-question-id="'+qID+'"]')?.remove();
    persistCurrentResults();
    renderStats(currentResults);
    renderSummary(currentResults, currentPaperCode);
}

function renderQText(text, qID) {
    if (!text) return '';
    if (/<(div|p|table|span|strong|em|br)/i.test(text)) {
        return text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'').replace(/on\w+="[^"]*"/gi,'');
    }
    return renderQuestionText('<b>Q' + qID + ':</b> ' + text);
}

function renderQuestionText(text) {
    if (!text) return '';
    text = text.replace(/\/\//g,' ').replace(/[ \t]{2,}/g,' ');
    const lines=text.split('\n'); let out=''; let i=0;
    while(i<lines.length){
        const line=lines[i];
        if(/^\s*\|/.test(line)&&(line.match(/\|/g)||[]).length>=2){
            const tls=[]; while(i<lines.length){const tl=lines[i];if((/^\s*\|/.test(tl)&&(tl.match(/\|/g)||[]).length>=2)||/^[\s|:\-]+$/.test(tl)){tls.push(tl);i++;}else break;}
            const drows=tls.filter(l=>!/^[\s|:\-]+$/.test(l));
            if(!drows.length)continue;
            const pc=l=>l.replace(/^\s*\|/,'').replace(/\|\s*$/,'').split('|').map(s=>s.trim());
            let tbl='<table style="border-collapse:collapse;font-size:11px;margin:6px 0;width:auto">';
            drows.forEach((l,ri)=>{const cells=pc(l);tbl+='<tr>';cells.forEach(cell=>{const tag=ri===0?'th':'td';const sty=ri===0?'background:#1e293b;color:white;padding:4px 10px;font-weight:700;font-size:10px;border:1px solid #334155':'padding:4px 10px;border:1px solid #cbd5e1;font-size:11px;background:white';tbl+=`<${tag} style="${sty}">${cell||'&nbsp;'}</${tag}>`;});tbl+='</tr>';});
            tbl+='</table>'; out+=tbl;
        } else { out+=(line||'')+'<br>'; i++; }
    }
    return out.replace(/(<br>)+$/,'');
}

function renderMSStructured(ms) {
    if (!ms) return '';
    const lines = ms.split('\n').filter(l => l.trim());
    const hasStructured = lines.some(l => /^[✓~✗ℹ️]/.test(l.trim()));
    if (!hasStructured) return formatMS(ms);
    return lines.map(l => {
        const t = l.trim();
        if (!t) return '';
        if (t.startsWith('✓')) return '<div class="ms-line"><span class="ms-icon ms-correct">✓</span><span class="ms-correct">' + t.slice(1).trim() + '</span></div>';
        if (t.startsWith('~'))  return '<div class="ms-line"><span class="ms-icon ms-alt">~</span><span class="ms-alt">' + t.slice(1).trim() + '</span></div>';
        if (t.startsWith('✗'))  return '<div class="ms-line"><span class="ms-icon ms-reject">✗</span><span class="ms-reject">' + t.slice(1).trim() + '</span></div>';
        if (t.startsWith('ℹ️')) return '<div class="ms-line"><span class="ms-icon ms-note">ℹ️</span><span class="ms-note">' + t.replace(/^ℹ️\s*/,'') + '</span></div>';
        return '<div class="ms-line"><span class="ms-icon ms-correct">✓</span><span class="ms-correct">' + t + '</span></div>';
    }).join('');
}

function formatMS(ms) {
    if (!ms) return '';
    return ms.split('\n').filter(l=>l.trim()).map(l => {
        const t = l.trim();
        const isReject = /^(reject|do not accept|not accept|incorrect)/i.test(t);
        const isAllow = /^(allow|accept|credit|condone)/i.test(t);
        const isNote = /^(note|examiner|nb|e\.g\.|eg )/i.test(t);
        const color = isReject?'#991b1b':isAllow?'#374151':isNote?'#5b21b6':'#065f46';
        const bg = isReject?'#fff1f2':isAllow?'#f8fafc':isNote?'#faf5ff':'#f0fdf4';
        const border = isReject?'#fecdd3':isAllow?'#e2e8f0':isNote?'#e9d5ff':'#bbf7d0';
        return '<div style="padding:3px 8px;margin-bottom:2px;border-radius:4px;background:'+bg+';border-left:3px solid '+border+';font-size:11px;color:'+color+'">'+t+'</div>';
    }).join('');
}

function renderModelAnswer(model, marks) {
    if (!model) return '';
    // Convert **bold** to <b>bold</b>
    let text = model.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*/g, '');
    // Detect numbered steps: "Step 1:", "1.", "1)" patterns
    const isStepFormat = /^(step\s*\d+\s*[:.]|\d+[.)\s])/im.test(text);
    if (!isStepFormat) return text.replace(/\n/g, '<br>');
    const stepLines = text.split('\n').filter(l => l.trim());
    return '<ol class="step-list">' + stepLines.map(l => {
        const t = l.trim();
        const m = t.match(/^(?:step\s*)?([\d]+)[.):]\s*(.*)/i);
        if (m) return '<li class="step-item"><span class="step-num">' + m[1] + '</span><span>' + m[2] + '</span></li>';
        return '<li class="step-item"><span style="flex:1">' + t + '</span></li>';
    }).join('') + '</ol>';
}
````

## File: js/api.js
````javascript
// ================================================================
// API & NETWORK HELPERS (Gemini calls)
// ================================================================
async function pdfToImages(base64Data, scale = 1.5) {
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    const images = [];
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        images.push(canvas.toDataURL('image/png').split(',')[1]);
    }
    return images;
}

async function fetchWithTimeout(url, options, timeout = 90000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

async function callGeminiAPI(payload, timeoutMs = 60000) {
    const apiKey = document.getElementById('api-key')?.value.trim() || '';
    if (!apiKey.startsWith('AIza') || apiKey.length < 35) throw new Error('Invalid Gemini API key');
    
    const errors = [];
    for (let i = 0; i < API_MODELS.length; i++) {
        if (i > 0) await new Promise(r => setTimeout(r, i * 3000));
        try {
            const response = await fetchWithTimeout(API_MODELS[i] + apiKey, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }, timeoutMs);
            if (response.ok) {
                const result = await response.json();
                return result;
            }
            const errorData = await response.json().catch(() => ({}));
            const msg = errorData?.error?.message || response.statusText;
            if (response.status === 429) {
                errors.push(`⏳ Model ${i}: Quota exceeded`);
                await new Promise(r => setTimeout(r, 5000));
            } else if (response.status === 503) {
                await new Promise(r => setTimeout(r, 8000));
                try {
                    const retry = await fetchWithTimeout(API_MODELS[i] + apiKey, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    }, timeoutMs);
                    if (retry.ok) return await retry.json();
                } catch (retryErr) { /* fall through */ }
                errors.push(`🔄 Model ${i}: Server overloaded`);
            } else {
                errors.push(`Model ${i} (${response.status}): ${msg.substring(0, 60)}`);
            }
        } catch (error) {
            if (error.name === 'AbortError') errors.push(`⏱️ Model ${i}: Timed out`);
            else errors.push(`Model ${i}: ${error.message}`);
        }
    }
    throw new Error(`All Gemini models failed:\n${errors.join('\n')}`);
}

function getApiKey() { return document.getElementById('api-key')?.value.trim() || ''; }
function validateApiKey(key) { return key && key.startsWith('AIza') && key.length > 35; }
````

## File: js/biohub.js
````javascript
// ================================================================
// BioHub OS - Dashboard, AI Explainer, Practice, Flashcards
// All AI features use Gemini and the IGCSE syllabus
// ================================================================
let bioState = {
    qp: { doc: null, p: 1, pageText: "" },
    ms: { doc: null, p: 1, pageText: "" },
    cards: [],
    cardIdx: 0,
    msHidden: false,
    insights: []
};

// Navigation
function nav(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');
    document.getElementById('header-title').innerText = id.toUpperCase();
    if (id === 'processor') {
        if (typeof loadHardcodedSyllabus === 'function') loadHardcodedSyllabus();
        if (typeof checkInputs === 'function') checkInputs();
    }
}

// Helper: get current syllabus text (from IGCSE Processor)
function getCurrentSyllabusText() {
    if (typeof syllabusParser !== 'undefined' && syllabusParser.isSyllabusLoaded()) {
        return syllabusParser.getStructuredForPrompt();
    }
    return "Cambridge IGCSE Biology 0610 syllabus (2026-2028). Use standard IGCSE Biology knowledge.";
}

// ========== AI EXPLAINER (Gemini + syllabus) ==========
async function executeAI() {
    const questionText = document.getElementById('ai-q').value.trim();
    const msText = document.getElementById('ai-ms').value.trim();
    
    if (!questionText) {
        alert("Please enter or upload a question.");
        return;
    }
    
    const outDiv = document.getElementById('ai-out-container');
    const outText = document.getElementById('ai-out-text');
    outDiv.classList.remove('hidden');
    outText.innerHTML = "<span class='animate-pulse text-orange-500'>🤖 Calling Gemini with syllabus context...</span>";
    
    try {
        if (typeof callGeminiAPI !== 'function') throw new Error("Gemini API not available.");
        if (typeof validateApiKeyInput === 'function' && !validateApiKeyInput()) {
            throw new Error("Invalid or missing Gemini API key. Please set a valid key in the IGCSE Processor section.");
        }
        
        const syllabusText = getCurrentSyllabusText();
        const prompt = `You are an expert IGCSE Biology examiner. Use the official syllabus below to answer.

SYLLABUS (relevant topics):
${syllabusText.substring(0, 6000)}

Question: ${questionText}
${msText ? `Mark Scheme (for reference):\n${msText}` : ""}

Provide a structured answer:
**Model Answer:**
[Write a complete model answer as a student should write]

**Key Concepts from Syllabus:**
- [List the specific syllabus points being tested]

**Common Mistakes:**
- [Frequent errors students make]

**Marking Guidance:**
- [Key points that earn marks, referencing the mark scheme if provided]`;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 2000 }
        };
        const response = await callGeminiAPI(payload, 60000);
        const reply = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
        outText.innerHTML = reply.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    } catch (error) {
        outText.innerHTML = `<span class="text-red-400">❌ Error: ${error.message}</span>`;
    }
}

function commitInsight() {
    const content = document.getElementById('ai-out-text').innerHTML;
    bioState.insights.push(content);
    localStorage.setItem('bioInsights', JSON.stringify(bioState.insights));
    syncBioMetrics();
    alert("Analysis saved to dashboard.");
}

// ========== DUAL PRACTICE (Gemini page analysis with syllabus) ==========
async function getPageText(doc, pageNum) {
    if (!doc) return "";
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    return textContent.items.map(item => item.str).join(' ');
}

async function renderPdfPageAndStoreText(type) {
    const state = bioState[type];
    if (!state.doc) return;
    const page = await state.doc.getPage(state.p);
    const vp = page.getViewport({ scale: 1.5 });
    const canv = document.getElementById(`${type}-canv`);
    const ctx = canv.getContext('2d');
    canv.height = vp.height;
    canv.width = vp.width;
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    document.getElementById(`${type}-label`).innerText = "PAGE " + state.p;
    state.pageText = await getPageText(state.doc, state.p);
}

async function mountPDF(input, type) {
    if (!input.files[0]) return;
    const data = new Uint8Array(await input.files[0].arrayBuffer());
    bioState[type].doc = await pdfjsLib.getDocument({ data }).promise;
    bioState[type].p = 1;
    await renderPdfPageAndStoreText(type);
}

async function navigatePdf(type, delta) {
    if (!bioState[type].doc) return;
    const target = bioState[type].p + delta;
    if (target >= 1 && target <= bioState[type].doc.numPages) {
        bioState[type].p = target;
        await renderPdfPageAndStoreText(type);
        document.getElementById(`${type}-scroll`).scrollTop = 0;
    }
}

async function analyseCurrentPage() {
    const qpText = bioState.qp.pageText;
    const msText = bioState.ms.pageText;
    
    if (!qpText || qpText.trim().length < 20) {
        alert("Please load a Question Paper PDF and navigate to a page with visible text.");
        return;
    }
    
    const outDiv = document.getElementById('ai-out-container');
    const outText = document.getElementById('ai-out-text');
    outDiv.classList.remove('hidden');
    outText.innerHTML = "<span class='animate-pulse text-orange-500'>🤖 Analysing page with syllabus...</span>";
    
    try {
        if (typeof callGeminiAPI !== 'function') throw new Error("Gemini API not available.");
        if (typeof validateApiKeyInput === 'function' && !validateApiKeyInput()) {
            throw new Error("Invalid or missing Gemini API key.");
        }
        
        const syllabusText = getCurrentSyllabusText();
        const prompt = `You are an IGCSE Biology examiner. The following text is from a past paper.

SYLLABUS (for reference):
${syllabusText.substring(0, 5000)}

QUESTION PAPER (page ${bioState.qp.p}):
${qpText.substring(0, 3500)}

${msText ? `MARK SCHEME (page ${bioState.ms.p}):\n${msText.substring(0, 2000)}` : ""}

Provide:
1. What topic(s) this question covers (with syllabus references).
2. A model answer.
3. Key points students must include.
4. Common mistakes.
5. Marking guidance (if mark scheme provided).`;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 2500 }
        };
        const response = await callGeminiAPI(payload, 75000);
        const reply = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
        outText.innerHTML = reply.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    } catch (error) {
        outText.innerHTML = `<span class="text-red-400">❌ Error: ${error.message}</span>`;
    }
}

function toggleMSVisibility() {
    bioState.msHidden = !bioState.msHidden;
    document.getElementById('ms-scroll').style.visibility = bioState.msHidden ? 'hidden' : 'visible';
    const btn = document.getElementById('ms-toggle');
    btn.innerText = bioState.msHidden ? 'SHOW MARK SCHEME' : 'HIDE MARK SCHEME';
    btn.classList.toggle('bg-orange-600');
}

// Media Hub (OCR)
async function handleMedia(input, target, runOCR) {
    if (!input.files[0]) return;
    const area = document.getElementById(target);
    if (runOCR) {
        area.value = "⏳ Running OCR...";
        try {
            const { data: { text } } = await Tesseract.recognize(input.files[0], 'eng');
            area.value = text.trim();
        } catch (err) {
            area.value = "OCR failed.";
        }
    } else {
        area.value = `[IMAGE LOADED: ${input.files[0].name}]`;
    }
}

// ========== FLASHCARDS (Gemini generation) ==========
async function generateAIFlashcards() {
    const topic = prompt("Enter biology topic (e.g., 'Photosynthesis', 'The Heart', 'Genetics'):");
    if (!topic) return;
    
    const count = parseInt(prompt("How many flashcards? (1-10)", "5"));
    if (isNaN(count) || count < 1 || count > 10) {
        alert("Please enter a number between 1 and 10.");
        return;
    }
    
    const outDiv = document.getElementById('ai-out-container');
    const outText = document.getElementById('ai-out-text');
    outDiv.classList.remove('hidden');
    outText.innerHTML = "<span class='animate-pulse text-orange-500'>🤖 Generating flashcards using syllabus...</span>";
    
    try {
        if (typeof callGeminiAPI !== 'function') throw new Error("Gemini API not available.");
        if (typeof validateApiKeyInput === 'function' && !validateApiKeyInput()) {
            throw new Error("Invalid or missing Gemini API key.");
        }
        
        const syllabusText = getCurrentSyllabusText();
        const promptText = `Using the IGCSE Biology syllabus below, create ${count} high-quality flashcards on "${topic}". 
Each flashcard: front (question) and back (concise answer). 
Return ONLY a JSON array: [{"front": "...", "back": "..."}]
Do not include extra text.

SYLLABUS (excerpt):
${syllabusText.substring(0, 3000)}`;
        
        const payload = {
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.4, responseMimeType: "application/json" }
        };
        const response = await callGeminiAPI(payload, 45000);
        let jsonText = response.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
        jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        const newCards = JSON.parse(jsonText);
        
        if (!Array.isArray(newCards)) throw new Error("Response was not a valid array.");
        let added = 0;
        for (const card of newCards) {
            if (card.front && card.back) {
                bioState.cards.push({ q: card.front, a: card.back });
                added++;
            }
        }
        localStorage.setItem('bioCards', JSON.stringify(bioState.cards));
        if (added > 0) {
            bioState.cardIdx = bioState.cards.length - 1;
            refreshFlashcard();
            syncBioMetrics();
            outText.innerHTML = `✅ Added ${added} flashcards on "${topic}".`;
        } else {
            outText.innerHTML = "⚠️ No valid flashcards generated. Try again.";
        }
    } catch (error) {
        outText.innerHTML = `<span class="text-red-400">❌ Error: ${error.message}</span>`;
    }
}

function createNewDeckCard() {
    const q = document.getElementById('fc-q').value.trim();
    const a = document.getElementById('fc-a').value.trim();
    if (!q || !a) return alert("Fill both fields.");
    bioState.cards.push({ q, a });
    localStorage.setItem('bioCards', JSON.stringify(bioState.cards));
    document.getElementById('fc-q').value = '';
    document.getElementById('fc-a').value = '';
    bioState.cardIdx = bioState.cards.length - 1;
    refreshFlashcard();
    syncBioMetrics();
}

function shiftCard(d) {
    if (bioState.cards.length === 0) return;
    document.getElementById('card-obj').classList.remove('flipped');
    setTimeout(() => {
        bioState.cardIdx = (bioState.cardIdx + d + bioState.cards.length) % bioState.cards.length;
        refreshFlashcard();
    }, 150);
}

function wipeFlashcards() {
    if (confirm("Permanent deletion? All flashcards will be lost.")) {
        bioState.cards = [];
        bioState.cardIdx = 0;
        localStorage.removeItem('bioCards');
        refreshFlashcard();
        syncBioMetrics();
    }
}

function refreshFlashcard() {
    const c = bioState.cards[bioState.cardIdx];
    document.getElementById('display-q').innerText = c ? c.q : "No flashcards. Generate or create some!";
    document.getElementById('display-a').innerText = c ? c.a : "Use 'Generate AI Flashcards' or add manually.";
}

// ========== Dashboard metrics ==========
function syncBioMetrics() {
    document.getElementById('dash-card-count').innerText = bioState.cards.length;
    document.getElementById('dash-insight-count').innerText = bioState.insights.length;
    if (typeof currentResults !== 'undefined' && currentResults) {
        document.getElementById('dash-question-count').innerText = currentResults.length;
    } else {
        document.getElementById('dash-question-count').innerText = '0';
    }
}

// ========== Initialisation ==========
window.addEventListener('load', () => {
    bioState.cards = JSON.parse(localStorage.getItem('bioCards') || "[]");
    bioState.insights = JSON.parse(localStorage.getItem('bioInsights') || "[]");
    refreshFlashcard();
    syncBioMetrics();
});
````

## File: js/export.js
````javascript
// ================================================================
// PART 7: EXPORT & REPORTING FUNCTIONS (with fixes)
// ================================================================
function exportCSV() {
    if (!currentResults.length) return;
    let csv = 'Topic,Question ID,Core/Extended,Marks,Difficulty,Status,Question Text\n';
    currentResults.forEach(q => { csv += `"${q.topic}","${q.qID}","${q.currType}",${q.marks},"${q.difficulty||'Medium'}","${q.syllabusStatus||'current'}","${q.text.replace(/"/g,'""')}"\n`; });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv],{type:'text/csv'})), download: `igcse_study_guide_${Date.now()}.csv` });
    document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 100);
}

function exportJSON() {
    if (!currentResults.length) return;
    const data = { subject: document.getElementById('subject')?.value||'', date: new Date().toISOString(), results: currentResults };
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})), download: `igcse_${Date.now()}.json` });
    document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 100);
}

function exportEditableHTML() {
    if (!currentResults.length) { showModal('No Results', 'Run an analysis first.'); return; }
    const subject = document.getElementById('subject')?.value || 'Unknown';
    const paper = currentPaperCode || subject || 'Paper';
    const unitFilter = getReportUnitFilter();
    // Exclude removed questions
    const baseData = applyUnitFilter(currentResults.filter(q => q.syllabusStatus !== 'removed'), unitFilter);
    const safe = buildReportFilename(paper, 'Editable', 'exam', unitFilter);
    const qData = baseData.map(q => ({
        qID: q.qID, marks: q.marks, currType: q.currType,
        syllabusStatus: q.syllabusStatus || 'current',
        difficulty: q.difficulty || 'Medium',
        topic: q.topic || '', subTopic: q.subTopic || '',
        subtopicId: q.subtopicId || '',
        text: q.text.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').trim(),
        ms: q.ms.replace(/<[^>]*>/g,'').trim(),
        model: q.model.replace(/<[^>]*>/g,'').trim(),
        explanation: (q.explanation||'').replace(/<[^>]*>/g,'').trim(),
        feedback: (q.feedback||'').replace(/<[^>]*>/g,'').trim(),
        tutorNote: (q.tutorNote||'').replace(/<[^>]*>/g,'').trim(),
    }));
    const topicNamesJS = 'const TOPIC_NAMES = ' + JSON.stringify(TOPIC_NAMES) + ';';
    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>${paper.replace(/\//g,'_')} — Editable Report</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#f1f5f9;color:#1e293b;font-size:13px}
.toolbar{position:sticky;top:0;z-index:50;background:#1e293b;padding:10px 20px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;box-shadow:0 2px 8px rgba(0,0,0,0.3)}
.toolbar span{color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-right:4px}
.btn{padding:6px 12px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;border:none;text-transform:uppercase;letter-spacing:0.05em;transition:opacity 0.15s}
.btn:hover{opacity:0.85}
.btn-ghost{background:rgba(255,255,255,0.1);color:white}
.btn-indigo{background:#4f46e5;color:white}
.btn-violet{background:#7c3aed;color:white}
.btn-slate{background:#475569;color:white}
.btn-teal{background:#0d9488;color:white}
.btn-save{background:#16a34a;color:white}
.btn-pdf{background:#0f172a;color:white}
.main{max-width:900px;margin:24px auto;padding:0 16px 60px}
.qcard{background:white;border-radius:12px;margin-bottom:20px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);border:1.5px solid transparent}
.qcard[data-type="Core"]{border-color:#bae6fd}
.qcard[data-type="Extended"]{border-color:#fed7aa}
.qcard[data-type="Core/Extended"]{border-color:#ddd6fe}
.card-header{padding:10px 16px;display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
.card-body{padding:14px 16px}
.field-label{font-size:8.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;display:flex;align-items:center;gap:6px}
.field-label .edit-hint{font-weight:400;opacity:0.5;font-size:8px;text-transform:none;letter-spacing:0}
.field-wrap{margin-bottom:12px;border-bottom:1px solid #f1f5f9;padding-bottom:12px}
.field-wrap:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.editable{min-height:24px;padding:8px 10px;border-radius:6px;border:1.5px solid transparent;line-height:1.65;font-size:11px;color:#1e293b;white-space:pre-wrap;outline:none;background:#fafafa;transition:border-color 0.15s,background 0.15s;cursor:text}
.editable:hover{border-color:#cbd5e1;background:#fff}
.editable:focus{border-color:#6366f1;background:#fff;box-shadow:0 0 0 3px rgba(99,102,241,0.1)}
.editable.modified{background:#fffbeb;border-color:#fbbf24}
.badge{display:inline-block;font-size:9px;font-weight:800;padding:2px 8px;border-radius:4px;text-transform:uppercase}
.badge-core{background:#dbeafe;color:#1d4ed8}
.badge-ext{background:#ffedd5;color:#c2410c}
.badge-rem{background:#fee2e2;color:#991b1b}
.badge-diff-easy{background:#d1fae5;color:#065f46}
.badge-diff-med{background:#fef3c7;color:#92400e}
.badge-diff-hard{background:#fee2e2;color:#991b1b}
.ms-line{display:flex;gap:6px;padding:3px 8px;margin-bottom:2px;border-radius:4px;font-size:10px;line-height:1.5}
.topic-div{display:flex;align-items:center;gap:12px;margin:28px 0 12px;padding:12px 16px;background:#f8fafc;border-radius:8px;border-left:4px solid #4f46e5}
.save-indicator{position:fixed;bottom:20px;right:20px;background:#16a34a;color:white;padding:8px 16px;border-radius:8px;font-size:11px;font-weight:700;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:100}
.save-indicator.show{opacity:1}
@media print{.toolbar,.save-indicator{display:none}.main{margin:0;padding:0}}
</style>
</head>
<body>
<div class="toolbar">
  <span>${paper}</span>
  <button class="btn btn-save" onclick="saveUpdatedHTML()">💾 Save HTML</button>
  <select id="edit-unit-filter" style="font-size:11px;font-weight:700;padding:5px 8px;border-radius:7px;border:none;background:rgba(255,255,255,0.12);color:white;cursor:pointer">
    <option value="all" style="background:#1e293b">All Questions</option>
    <option value="Core" style="background:#1e293b">🔵 Core</option>
    <option value="Extended" style="background:#1e293b">🟠 Extended</option>
  </select>
  <button class="btn btn-indigo" onclick="setSortMode('exam')">📋 Exam Order</button>
  <button class="btn btn-teal" onclick="setSortMode('topic')">📚 Topic Order</button>
  <button class="btn btn-indigo" onclick="runStudentReport('exam')">🎓 Report Exam</button>
  <button class="btn btn-violet" onclick="runStudentReport('topic')">🎓 Report Topic</button>
  <button class="btn btn-slate" onclick="runPrintReport('exam')">🖨️ Print Exam</button>
  <button class="btn btn-slate" onclick="runPrintReport('topic')">🖨️ Print Topic</button>
  <button class="btn btn-pdf" onclick="runPDF('exam')">📄 PDF Exam</button>
  <button class="btn btn-pdf" onclick="runPDF('topic')">📄 PDF Topic</button>
</div>
<div class="main" id="cards-root"></div>
<div class="save-indicator" id="save-indicator">✓ Saved</div>
<script>
const PAPER = ${JSON.stringify(paper)};
const PAPER_CODE = ${JSON.stringify(currentPaperCode || '')};
${topicNamesJS}
let qData = ${JSON.stringify(qData, null, 2)};
let currentSortMode = 'exam';  // 'exam' or 'topic'

const FIELD_META = {
  text: { label:'Question', color:'#0f766e', emoji:'📋' },
  ms: { label:'Mark Scheme', color:'#0284c7', emoji:'✅' },
  model: { label:'Model Answer', color:'#4f46e5', emoji:'🏆' },
  explanation: { label:'Concept Explanation', color:'#0891b2', emoji:'📖' },
  feedback: { label:'Feedback / Comments', color:'#d97706', emoji:'💬' },
  tutorNote: { label:'Tutor Note', color:'#6d28d9', emoji:'🎓' },
};
const EDITABLE_FIELDS = Object.keys(FIELD_META);

function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function getSortedData(sortMode) {
  const unitFilter = document.getElementById('edit-unit-filter')?.value || 'all';
  let d = [...qData];
  if (unitFilter && unitFilter !== 'all') d = d.filter(q => q.currType === unitFilter);
  if (sortMode === 'topic') {
    d.sort((a,b) => {
      const aid = a.subtopicId || '99.99', bid = b.subtopicId || '99.99';
      const [am,as_] = aid.split('.').map(Number);
      const [bm,bs_] = bid.split('.').map(Number);
      if (am !== bm) return am - bm;
      return (as_||0) - (bs_||0);
    });
  } else {
    // exam order: preserve original order (as in qData array)
    // but we need to ensure stable order; qData is already in exam order initially
    // however after edits, we keep as is; no sorting needed
  }
  return d;
}

function renderCardsWithData(data) {
  const root = document.getElementById('cards-root');
  let html = '';
  data.forEach((q, qi) => {
    const isCore = q.currType === 'Core' || q.currType === 'Core/Extended';
    const isExt = q.currType === 'Extended' || q.currType === 'Core/Extended';
    const accent = isCore ? '#0284c7' : '#ea580c';
    const typeBadge = isCore ? '<span class="badge badge-core">Core</span>' : '<span class="badge badge-ext">Extended</span>';
    const diffBadge = q.difficulty === 'Easy' ? '<span class="badge badge-diff-easy">Easy</span>' : q.difficulty === 'Hard' ? '<span class="badge badge-diff-hard">Hard</span>' : '<span class="badge badge-diff-med">Medium</span>';
    const tNum = q.subtopicId ? parseInt(q.subtopicId.split('.')[0]) : 0;
    const tName = (tNum && TOPIC_NAMES[tNum]) ? TOPIC_NAMES[tNum] : (q.topic || '');
    let fieldsHtml = '';
    EDITABLE_FIELDS.forEach(field => {
      const meta = FIELD_META[field];
      const val = esc(q[field] || '');
      const placeholder = field === 'text' ? 'Question text…' : field === 'ms' ? 'Mark scheme points…' : field === 'model' ? 'Model answer…' : '';
      fieldsHtml += \`<div class="field-wrap"><div class="field-label" style="color:\${meta.color}">\${meta.emoji} \${meta.label} <span class="edit-hint">✏ click to edit</span></div><div class="editable" contenteditable="true" data-qi="\${qi}" data-field="\${field}" oninput="onEdit(this, \${qi}, '\${field}')">\${val || ('<span style="color:#cbd5e1;font-style:italic">'+placeholder+'</span>')}</div></div>\`;
    });
    html += \`<div class="qcard" data-qi="\${qi}" data-type="\${q.currType||'Core'}"><div class="card-header" style="background:\${accent}15;border-bottom:2px solid \${accent}30"><div><div style="font-size:11px;font-weight:800;color:\${accent};font-family:monospace;margin-bottom:4px">\${PAPER_CODE ? PAPER_CODE+'/' : ''}Q\${q.qID}&nbsp;[<span contenteditable="true" data-qi="\${qi}" data-field="marks" oninput="onEdit(this,\${qi},'marks')">\${q.marks}</span> marks]</div><div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">\${typeBadge} \${diffBadge} \${tName ? \`<span contenteditable="true" data-qi="\${qi}" data-field="topic" oninput="onEditPill(this,\${qi},'topic')" style="background:#e0e7ff;color:#3730a3;padding:2px 8px;border-radius:4px;font-size:9px;cursor:text">\${tName}</span>\` : ''} \${q.subTopic ? \`<span contenteditable="true" data-qi="\${qi}" data-field="subTopic" oninput="onEditPill(this,\${qi},'subTopic')" style="background:#f1f5f9;color:#64748b;padding:2px 8px;border-radius:4px;font-size:9px;cursor:text">\${esc(q.subTopic)}</span>\` : ''}</div></div><span style="font-size:10px;color:#94a3b8">\${qi+1}/\${data.length}</span></div><div class="card-body">\${fieldsHtml}</div></div>\`;
  });
  root.innerHTML = html;
}

function refreshDisplay() {
  const sorted = getSortedData(currentSortMode);
  renderCardsWithData(sorted);
}

function setSortMode(mode) {
  currentSortMode = mode;
  refreshDisplay();
}

function onEdit(el, qi, field) {
  if (el.querySelector('span[style*="color:#cbd5e1"]')) el.innerHTML = el.innerText;
  // Need to find the actual question object in the current sorted view? 
  // Simpler: update the master qData array. Since qData holds original unsorted order,
  // we need to map the displayed index to the actual object.
  // The displayed index (qi) corresponds to the sorted order. We'll maintain a reference.
  // Instead, we can store the original index in data attribute or search by qID.
  const qid = el.closest('.qcard').querySelector('[style*="font-family:monospace"]').innerText.split('Q')[1].split(' ')[0];
  const originalQ = qData.find(q => q.qID === qid);
  if (originalQ) originalQ[field] = el.innerText;
  el.classList.add('modified');
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(flashSaved, 800);
}

function onEditPill(el, qi, field) {
  const txt = el.innerText.trim();
  const qid = el.closest('.qcard').querySelector('[style*="font-family:monospace"]').innerText.split('Q')[1].split(' ')[0];
  const originalQ = qData.find(q => q.qID === qid);
  if (originalQ) {
    if (field === 'topic') originalQ.topic = txt;
    else if (field === 'subTopic') originalQ.subTopic = txt;
  }
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(flashSaved, 800);
}

let _saveTimer = null;
function flashSaved() { const ind = document.getElementById('save-indicator'); ind.classList.add('show'); setTimeout(() => ind.classList.remove('show'), 1800); }

function saveUpdatedHTML() {
  // sync any focused editable
  const focused = document.querySelector('.editable:focus');
  if (focused) {
    const qid = focused.closest('.qcard').querySelector('[style*="font-family:monospace"]').innerText.split('Q')[1].split(' ')[0];
    const originalQ = qData.find(q => q.qID === qid);
    const field = focused.dataset.field;
    if (originalQ && field) originalQ[field] = focused.innerText.trim();
  }
  const blob = new Blob([document.documentElement.outerHTML.replace(/let qData = \\[.*?\\];/s, 'let qData = ' + JSON.stringify(qData, null, 2) + ';')], { type: 'text/html' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (PAPER_CODE ? PAPER_CODE.replace(/[\\/\\s]/g,'_') : PAPER.replace(/[\\/\\s]/g,'_')) + '_Editable_Updated.html'; a.click(); URL.revokeObjectURL(a.href);
}

// Student report, print report, PDF functions (same as before, using getSortedData)
function runStudentReport(sortMode) {
  const data = getSortedData(sortMode);
  const totalMarks = data.reduce((s,q)=>s+(parseInt(q.marks)||0),0);
  const coreN = data.filter(q=>q.currType==='Core').length;
  const extN = data.filter(q=>q.currType==='Extended'||q.currType==='Core/Extended').length;
  let rows = '';
  data.forEach(q => {
    const isCore = q.currType==='Core';
    const accent = isCore?'#0284c7':'#ea580c';
    const typeLabel = q.currType==='Core/Extended'?'CORE/EXTENDED':isCore?'CORE':'EXTENDED';
    const tNum2 = q.subtopicId ? parseInt(q.subtopicId.split('.')[0]) : 0;
    const tName2 = (tNum2 && TOPIC_NAMES[tNum2]) ? TOPIC_NAMES[tNum2] : (q.topic||'');
    rows += \`<div class="qcard" style="border-left:4px solid \${accent};margin-bottom:16px;padding:12px"><div style="font-weight:bold">\${PAPER_CODE?PAPER_CODE+'/':''}Q\${q.qID} [\${q.marks} marks] [\${typeLabel}]</div><div style="margin-top:6px">\${esc(q.text)}</div><hr style="margin:8px 0"><div><strong>Mark Scheme:</strong><br>\${esc(q.ms).replace(/\\n/g,'<br>')}</div><div><strong>Model Answer:</strong><br>\${esc(q.model)}</div><div><strong>Explanation:</strong><br>\${esc(q.explanation)}</div><div><strong>Feedback:</strong><br>\${esc(q.feedback)}</div><div><strong>Tutor Note:</strong><br>\${esc(q.tutorNote)}</div></div>\`;
  });
  const w = window.open('','_blank');
  w.document.write(\`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>\${PAPER}_Student_Report</title><style>body{font-family:sans-serif;padding:20px}</style></head><body><h1>\${PAPER}</h1><p>Core: \${coreN} | Extended: \${extN} | Total marks: \${totalMarks}</p>\${rows}</body></html>\`);
  w.document.close();
}

function runPrintReport(sortMode) {
  const data = getSortedData(sortMode);
  let rows = '';
  data.forEach(q => {
    const isCore = q.currType==='Core';
    const accent = isCore?'#0284c7':'#ea580c';
    rows += \`<div style="border-left:4px solid \${accent};margin-bottom:20px;padding:10px;page-break-inside:avoid"><strong>\${PAPER_CODE?PAPER_CODE+'/':''}Q\${q.qID} [\${q.marks} marks] [\${q.currType}]</strong><div>\${esc(q.text)}</div><hr><div><strong>MS:</strong> \${esc(q.ms).replace(/\\n/g,'<br>')}</div><div><strong>Model:</strong> \${esc(q.model)}</div><div><strong>Explanation:</strong> \${esc(q.explanation)}</div></div>\`;
  });
  const w = window.open('','_blank');
  w.document.write(\`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>\${PAPER}_Print_Report</title><style>body{font-family:sans-serif;padding:20px}@media print{div{break-inside:avoid}}</style></head><body><h1>\${PAPER}</h1>\${rows}</body></html>\`);
  w.document.close();
}

function runPDF(sortMode) {
  if (typeof window.jspdf === 'undefined') { alert('jsPDF not loaded'); return; }
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p','mm','a4');
  let y = 20;
  const margin = 20, width = pdf.internal.pageSize.getWidth() - margin*2;
  function addTxt(t, size=10, bold=false) { if(!t) return; pdf.setFontSize(size); pdf.setFont('helvetica',bold?'bold':'normal'); pdf.splitTextToSize(t,width).forEach(l=>{if(y>280){pdf.addPage();y=20;}pdf.text(l,margin,y);y+=size*0.44;}); y+=2; }
  addTxt(PAPER,16,true); addTxt('Generated: '+new Date().toLocaleString(),9); y+=5;
  const data = getSortedData(sortMode);
  data.forEach(q => {
    addTxt(\`\${PAPER_CODE?PAPER_CODE+'/':''}Q\${q.qID} [\${q.marks} marks] [\${q.currType}]\`,11,true);
    addTxt('Question: '+q.text,9); addTxt('Mark Scheme: '+q.ms,9); addTxt('Model Answer: '+q.model,9); addTxt('Explanation: '+q.explanation,9);
    y+=4;
  });
  pdf.save(buildReportFilename(PAPER, 'Analysis_Report', sortMode, document.getElementById('edit-unit-filter')?.value || 'all')+'.pdf');
}

// Initialize with exam order
refreshDisplay();
<\/script>
</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = safe + '.html';
    a.click();
    URL.revokeObjectURL(a.href);
}

function getReportUnitFilter() {
    return document.getElementById('report-unit-filter')?.value || 'all';
}
function applyUnitFilter(data, unitFilter) {
    if (!unitFilter || unitFilter === 'all') return data;
    return data.filter(q => q.currType === unitFilter);
}
function unitFilterSuffix(unitFilter) {
    if (!unitFilter || unitFilter === 'all') return 'All';
    if (unitFilter === 'Core') return 'Core';
    if (unitFilter === 'Extended') return 'Extended';
    return unitFilter.replace(/[\s\/]/g, '');
}
function buildReportFilename(paperCode, reportType, sortMode, unitFilter) {
    const safe = (paperCode || 'Paper').replace(/[\/\s]/g, '_');
    const sort = sortMode === 'topic' ? 'Topic_Order' : 'Exam_Order';
    const unit = unitFilterSuffix(unitFilter);
    return `${safe}_${reportType}_${sort}_${unit}`;
}

function cleanForPDF(text) {
    if (!text) return '';
    return text.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<\/div>/gi, '\n').replace(/<\/li>/gi, '\n')
        .replace(/<[^>]+>/g, '').replace(/\$([^$]+)\$/g, (_, inner) => inner.replace(/[{}_^\\]/g,'').replace(/\\rightarrow/g,'→').replace(/\\to\b/g,'→'))
        .replace(/\\rightarrow/g,'→').replace(/\\to\b/g,'→').replace(/^---+\\s*$/gm, '').replace(/^===+\\s*$/gm, '')
        .replace(/^#{1,6}\\s*/gm, '').replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*(.*?)\*/g,'$1')
        .replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&\w+;/g,' ')
        .replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/[\u200B-\u200D\uFEFF]/g,'')
        .replace(/[ \t]{2,}/g,' ').replace(/\n{3,}/g,'\n\n').trim();
}

function cleanFieldForReport(s) {
    if (!s) return '';
    try {
        const doc = (new DOMParser()).parseFromString('<div id="_cfr">' + s + '</div>', 'text/html');
        const root = doc.getElementById('_cfr');
        if (!root) throw new Error('parse failed');
        root.querySelectorAll('[data-img-wrapper]').forEach(wrapper => {
            const img = wrapper.querySelector('img');
            if (img && img.src) {
                const w = wrapper.style.width || '50%';
                const ni = doc.createElement('img');
                ni.src = img.src;
                ni.style.cssText = 'width:' + w + ';max-width:100%;border-radius:4px;margin:6px 4px 6px 0;display:inline-block;vertical-align:top';
                wrapper.replaceWith(ni);
            } else wrapper.remove();
        });
        root.querySelectorAll('button').forEach(btn=>btn.remove());
        function walk(node) {
            let out = '';
            node.childNodes.forEach(child => {
                if (child.nodeType === 3) out += child.textContent;
                else if (child.nodeName === 'IMG') out += child.outerHTML;
                else if (child.nodeName === 'BR') out += '\n';
                else if (child.nodeName === 'B' || child.nodeName === 'STRONG') out += '<b>' + walk(child) + '</b>';
                else out += walk(child);
            });
            return out;
        }
        return walk(root).replace(/&nbsp;/g,' ').replace(/\n{3,}/g,'\n\n').trim();
    } catch(e) {
        return s.replace(/<div[^>]*data-img-wrapper[^>]*>[\s\S]*?<\/div>/gi,'')
                .replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,'')
                .replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    }
}

function printStudentReport(sortMode) {
    if (!currentResults.length) { alert('No analysis to print.'); return; }
    if (!sortMode) sortMode = 'exam';
    const unitFilter = getReportUnitFilter();
    const paper = currentPaperCode || 'Paper';
    const safe = buildReportFilename(paper, 'Student_Report', sortMode, unitFilter);
    const flaggedOnly = currentResults.filter(q => q.flagged);
    let data = flaggedOnly.length ? [...flaggedOnly] : applyUnitFilter([...currentResults], unitFilter);
    const flagNote = flaggedOnly.length ? `<p style="font-size:11px;color:#64748b;margin:6px 0 0">⚑ Showing ${flaggedOnly.length} flagged question(s) only</p>` : '';
    if (sortMode === 'topic') {
        data.sort((a, b) => {
            const aid = a.subtopicId || '99.99', bid = b.subtopicId || '99.99';
            const [am, as_] = aid.split('.').map(Number);
            const [bm, bs_] = bid.split('.').map(Number);
            if (am !== bm) return am - bm;
            return as_ - bs_;
        });
    }
    const totalMarks = data.reduce((s,q)=>s+(parseInt(q.marks)||0),0);
    const coreN = data.filter(q=>q.currType==='Core').length;
    const extN = data.filter(q=>q.currType==='Extended'||q.currType==='Core/Extended').length;
    const easyN = data.filter(q=>q.difficulty==='Easy').length;
    const medN = data.filter(q=>q.difficulty==='Medium').length;
    const hardN = data.filter(q=>q.difficulty==='Hard').length;
    const topicMap = {};
    data.forEach(q => {
        const tId = q.subtopicId ? q.subtopicId.split('.')[0] : '0';
        if (!topicMap[tId]) {
            const tNum = parseInt(tId)||0;
            topicMap[tId] = { name: (tNum && TOPIC_NAMES[tNum]) ? TOPIC_NAMES[tNum] : (q.topic||'Unknown'), qs:[], marks:0 };
        }
        topicMap[tId].qs.push(q.qID);
        topicMap[tId].marks += parseInt(q.marks)||0;
    });
    const topicRows = Object.entries(topicMap).sort(([a],[b]) => (parseInt(a)||99)-(parseInt(b)||99)).map(([tid,td]) => {
        const hardCount = td.qs.filter(qid => data.find(q=>q.qID===qid)?.difficulty==='Hard').length;
        const hardBadge = hardCount ? `<span style="background:#fee2e2;color:#991b1b;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;margin-left:4px">${hardCount} Hard</span>` : '';
        return `<tr style="border-bottom:1px solid rgba(255,255,255,0.1)"><td style="padding:6px 8px;font-weight:800;color:rgba(255,255,255,0.6);white-space:nowrap">T${tid}</td><td style="padding:6px 8px;color:white;font-weight:600">${td.name}${hardBadge}</td><td style="padding:6px 8px;text-align:center;color:rgba(255,255,255,0.65)">${td.qs.length}</td><td style="padding:6px 8px;text-align:center;font-weight:800;color:#93c5fd">${td.marks}</td></tr>`;
    }).join('');
    const coverPage = `
    <div style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:40px 32px;background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#0f172a 100%);color:white;page-break-after:always">
        <div style="text-align:center;max-width:600px;width:100%">
            <div style="font-size:48px;margin-bottom:16px">📚</div>
            <div style="font-size:28px;font-weight:900;letter-spacing:-0.5px;margin-bottom:6px">${paper}</div>
            <div style="font-size:14px;opacity:0.7;margin-bottom:32px">Student Study Report &nbsp;·&nbsp; ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:32px">
                <div style="background:rgba(255,255,255,0.1);border-radius:10px;padding:14px 8px;text-align:center"><div style="font-size:26px;font-weight:900">${data.length}</div><div style="font-size:10px;opacity:0.7;margin-top:2px;text-transform:uppercase;letter-spacing:0.05em">Questions</div></div>
                <div style="background:rgba(255,255,255,0.1);border-radius:10px;padding:14px 8px;text-align:center"><div style="font-size:26px;font-weight:900">${totalMarks}</div><div style="font-size:10px;opacity:0.7;margin-top:2px;text-transform:uppercase;letter-spacing:0.05em">Total Marks</div></div>
                <div style="background:rgba(2,132,199,0.3);border-radius:10px;padding:14px 8px;text-align:center"><div style="font-size:26px;font-weight:900">${coreN}</div><div style="font-size:10px;opacity:0.7;margin-top:2px;text-transform:uppercase;letter-spacing:0.05em">Core</div></div>
                <div style="background:rgba(234,88,12,0.3);border-radius:10px;padding:14px 8px;text-align:center"><div style="font-size:26px;font-weight:900">${extN}</div><div style="font-size:10px;opacity:0.7;margin-top:2px;text-transform:uppercase;letter-spacing:0.05em">Extended</div></div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:32px">
                <div style="background:rgba(5,150,105,0.25);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:#6ee7b7">${easyN}</div><div style="font-size:10px;opacity:0.7;text-transform:uppercase">Easy</div></div>
                <div style="background:rgba(217,119,6,0.25);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:#fcd34d">${medN}</div><div style="font-size:10px;opacity:0.7;text-transform:uppercase">Medium</div></div>
                <div style="background:rgba(220,38,38,0.25);border-radius:8px;padding:10px;text-align:center"><div style="font-size:20px;font-weight:800;color:#fca5a5">${hardN}</div><div style="font-size:10px;opacity:0.7;text-transform:uppercase">Hard</div></div>
            </div>
            <div style="background:rgba(255,255,255,0.07);border-radius:12px;overflow:hidden;text-align:left">
                <div style="padding:10px 14px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;opacity:0.6;border-bottom:1px solid rgba(255,255,255,0.1)">Topics Covered</div>
                <table style="width:100%;font-size:11px;border-collapse:collapse"><thead><tr style="opacity:0.5;font-size:9px;text-transform:uppercase;letter-spacing:0.05em"><th style="padding:6px 8px;text-align:left;font-weight:600">#</th><th style="padding:6px 8px;text-align:left;font-weight:600">Topic</th><th style="padding:6px 8px;text-align:center;font-weight:600">Qs</th><th style="padding:6px 8px;text-align:center;font-weight:600">Marks</th></tr></thead>
                <tbody style="color:rgba(255,255,255,0.85)">${topicRows}</tbody></table>
            </div>
            ${flagNote}
        </div>
    </div>`;
    let rows = '';
    let lastTopicId = null;
    data.forEach(q => {
        const isCore = q.currType==='Core';
        const accent = isCore ? '#0284c7' : '#ea580c';
        const accentLight = q.currType==='Core/Extended' ? '#f5f3ff' : isCore ? '#eff6ff' : '#fff7ed';
        const typeLabel = q.currType==='Core/Extended'?'CORE/EXTENDED':isCore?'CORE':'EXTENDED';
        const diffBg = q.difficulty==='Easy'?'#d1fae5':q.difficulty==='Hard'?'#fee2e2':'#fef3c7';
        const diffCol = q.difficulty==='Easy'?'#065f46':q.difficulty==='Hard'?'#991b1b':'#92400e';
        if (sortMode === 'topic') {
            const topicId = q.subtopicId ? q.subtopicId.split('.')[0] : '0';
            if (topicId !== lastTopicId) {
                lastTopicId = topicId;
                const tNum = parseInt(topicId)||0;
                const tName = (tNum && TOPIC_NAMES[tNum]) ? TOPIC_NAMES[tNum] : (q.topic||'');
                const tData = data.filter(d => (d.subtopicId||'').startsWith(topicId+'.') || d.subtopicId===topicId);
                const tMarks = tData.reduce((s,d)=>s+(parseInt(d.marks)||0),0);
                rows += `<div class="topic-divider" style="display:flex;align-items:center;gap:12px;margin:28px 0 12px;page-break-after:avoid"><div style="background:#1e293b;color:white;padding:8px 16px;border-radius:8px;font-weight:900;font-size:13px;white-space:nowrap">📚 Topic ${tNum}</div><div style="flex:1"><div style="font-size:13px;font-weight:700;color:#1e293b">${tName}</div><div style="font-size:10px;color:#94a3b8;margin-top:1px">${tData.length} question${tData.length!==1?'s':''} · ${tMarks} marks</div></div><div style="width:80px;height:4px;background:#e2e8f0;border-radius:2px;flex-shrink:0"><div style="height:100%;background:#1e293b;border-radius:2px;width:${Math.min(100,tData.length*10)}%"></div></div></div>`;
            }
        }
        const msHtml = (q.ms||'').split('\n').filter(l=>l.trim()).map(l => {
            const t = l.trim();
            const isR = /^(reject|do not accept|not accept|incorrect)/i.test(t);
            const isA = /^(allow|accept|credit|condone)/i.test(t);
            const isN = /^(note|examiner|nb|e\.g\.|eg )/i.test(t);
            const col = isR?'#991b1b':isA?'#475569':isN?'#5b21b6':'#065f46';
            const bg = isR?'#fff1f2':isA?'#f8fafc':isN?'#faf5ff':'#f0fdf4';
            const bdr = isR?'#fecdd3':isA?'#e2e8f0':isN?'#e9d5ff':'#bbf7d0';
            const icon = isR?'✗':isA?'~':isN?'ℹ':'✓';
            return `<div style="display:flex;gap:6px;padding:4px 8px;margin-bottom:2px;border-radius:5px;background:${bg};border-left:3px solid ${bdr}"><span style="font-size:9px;font-weight:800;color:${col};flex-shrink:0;margin-top:1px">${icon}</span><span style="font-size:10px;color:${col};line-height:1.5">${t}</span></div>`;
        }).join('');
        const tNum2 = q.subtopicId ? parseInt(q.subtopicId.split('.')[0]) : 0;
        const tName2 = (tNum2 && TOPIC_NAMES[tNum2]) ? TOPIC_NAMES[tNum2] : (q.topic||'');
        const subName2 = q.subTopic || '';
        rows += `<div class="qcard" style="background:white;border-radius:10px;margin-bottom:20px;overflow:hidden;page-break-inside:avoid;box-shadow:0 1px 4px rgba(0,0,0,0.08),0 0 0 1.5px ${accent}22">
            <div style="background:${accent};padding:10px 14px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                    <div style="flex:1;min-width:0">
                        <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;margin-bottom:4px">${tName2 ? `<span style="background:rgba(255,255,255,0.2);color:white;font-size:9px;font-weight:700;padding:2px 7px;border-radius:4px">T${tNum2}. ${tName2}</span>` : ''}${subName2 ? `<span style="background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.9);font-size:9px;padding:2px 7px;border-radius:4px">${q.subtopicId||''} ${subName2}</span>` : ''}</div>
                        <div style="font-size:10px;color:rgba(255,255,255,0.8);font-family:monospace">${currentPaperCode?currentPaperCode+'/':''}Q${q.qID} &nbsp;[${q.marks||'?'} marks] &nbsp;[${typeLabel}]</div>
                    </div>
                    <span style="flex-shrink:0;background:${diffBg};color:${diffCol};border-radius:5px;padding:3px 8px;font-size:9px;font-weight:800">${q.difficulty||'Medium'}</span>
                </div>
            </div>
            <div style="padding:14px 16px;background:${accentLight}08">
                <div style="font-size:11.5px;color:#1e293b;line-height:1.7;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #e2e8f0"><div style="font-size:8.5px;font-weight:800;color:${accent};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Question</div>${cleanFieldForReport(q.text)}</div>
                <div style="margin-bottom:${q.model||q.explanation||q.teacherNotes?'12px':'0'}"><div style="font-size:8.5px;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px">✅ Mark Scheme</div>${msHtml || '<div style="font-size:10px;color:#94a3b8;font-style:italic">No mark scheme</div>'}</div>
                ${q.model ? `<div style="border-top:1px solid #e2e8f0;padding-top:10px;margin-bottom:10px;border-left:3px solid #4f46e5;padding-left:10px"><div style="font-size:8.5px;font-weight:800;color:#4f46e5;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">🏆 Model Answer</div><div style="font-size:10.5px;color:#1e293b;line-height:1.7">${cleanFieldForReport(q.model).replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/\*/g,'')}</div></div>` : ''}
                ${q.explanation ? `<div style="border-top:1px solid #e2e8f0;padding-top:10px;margin-bottom:10px;border-left:3px solid #0891b2;padding-left:10px"><div style="font-size:8.5px;font-weight:800;color:#0891b2;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">💡 Concept Explanation</div><div style="font-size:10.5px;color:#1e293b;line-height:1.7">${q.explanation}</div></div>` : ''}
                ${q.teacherNotes ? `<div style="border-top:1px solid #e2e8f0;padding-top:10px;background:#f0f9ff;border-left:3px solid #0284c7;padding-left:10px;border-radius:0 5px 5px 0;margin-bottom:8px"><div style="font-size:8.5px;font-weight:800;color:#0369a1;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">📝 Teacher Notes</div><div style="font-size:10.5px;color:#0c4a6e;line-height:1.7">${q.teacherNotes}</div></div>` : ''}
            </div>
        </div>`;
    });
    const w = window.open('','_blank');
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${safe} — Student Report</title><style>/* standard print styles */</style></head><body>${coverPage}<div style="max-width:780px;margin:0 auto;padding:24px 16px"><div class="no-print" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding:10px 14px;background:white;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1)"><span style="font-size:12px;font-weight:700;color:#475569">${paper} · ${data.length} questions · ${sortMode==='topic'?'Topic Order':'Exam Order'}</span><div style="display:flex;gap:6px"><button onclick="(function(){const b=new Blob([document.documentElement.outerHTML],{type:'text/html'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='${safe}.html';a.click();URL.revokeObjectURL(a.href);})()" style="background:#16a34a;color:white;border:none;padding:7px 14px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer">💾 Save HTML</button><button onclick="window.print()" style="background:#1e293b;color:white;border:none;padding:7px 16px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer">🖨️ Print / Save PDF</button></div></div>${rows}</div></body></html>`);
    w.document.close();
}

function printReport(sortMode) {
    if (!currentResults.length) { showModal('No Results', 'Run an analysis first before printing.'); return; }
    const pw = window.open('', '_blank');
    const paper = document.getElementById('subject')?.value || 'Unknown';
    const unitFilter = getReportUnitFilter();
    const baseResults = applyUnitFilter(currentResults, unitFilter);
    const sourceData = sortMode === 'topic'
        ? [...baseResults].sort((a, b) => {
            const aid = a.subtopicId || '99.99', bid = b.subtopicId || '99.99';
            const [am, as_] = aid.split('.').map(Number);
            const [bm, bs_] = bid.split('.').map(Number);
            if (am !== bm) return am - bm;
            return as_ - bs_;
          })
        : [...baseResults];
    const coreCount = currentResults.filter(q=>q.currType==='Core').length;
    const extCount = currentResults.filter(q=>q.currType==='Extended'||q.currType==='Core/Extended').length;
    const remCount = currentResults.filter(q=>q.syllabusStatus==='removed').length;
    const totalMarks = currentResults.reduce((s,q)=>s+(parseInt(q.marks)||0),0);
    function esc(t){ return (t||'').replace(/\n/g,'<br>'); }
    const topicStats = {};
    const topicKeyOrder = [];
    sourceData.forEach(q => {
        const key = q.subtopicId ? (q.subtopicId + '|||' + (q.topic||'Other')) : (q.topic||'Other');
        if (!topicStats[key]) { topicStats[key] = { id: q.subtopicId||'', name: q.topic||'Other', questions:[], coreN:0, extN:0, marks:0 }; topicKeyOrder.push(key); }
        topicStats[key].questions.push(q.qID);
        if (q.currType==='Core') topicStats[key].coreN++; else topicStats[key].extN++;
        topicStats[key].marks += parseInt(q.marks)||0;
    });
    const totalM = sourceData.reduce((s,q)=>s+(parseInt(q.marks)||0),0);
    const summaryRows = topicKeyOrder.map(k => {
        const s = topicStats[k];
        const pct = totalM>0 ? ((s.marks/totalM)*100).toFixed(0) : '0';
        const tNum = s.id ? parseInt(s.id.split('.')[0]) : null;
        const tName = tNum ? (TOPIC_NAMES[tNum] || s.name) : s.name;
        const topicCell = s.id ? ('<div style="font-weight:700;color:#3730a3;font-size:10px">Topic ' + tNum + '. ' + tName + '</div><div style="font-size:9px;color:#64748b;margin-top:2px">Sub-topic: ' + s.id + ' ' + s.name + '</div>') : '<div style="font-weight:700;color:#1e293b;font-size:10px">' + s.name + '</div>';
        const qPills = s.questions.map(qid => {
            const q2 = currentResults.find(x => x.qID === qid);
            const isCore = q2 ? q2.currType === 'Core' : true;
            const bg = isCore ? '#dbeafe' : '#ffedd5';
            const fg = isCore ? '#1d4ed8' : '#c2410c';
            return '<span style="background:' + bg + ';color:' + fg + ';font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;margin:1px">' + (currentPaperCode ? currentPaperCode + '/' : '') + 'Q' + qid + '</span>';
        }).join('');
        const bar = '<div style="height:6px;background:#e2e8f0;border-radius:3px;margin-top:3px"><div style="height:6px;width:' + pct + '%;background:#4f46e5;border-radius:3px"></div></div>';
        const typeCell = (s.coreN>0 && s.extN>0) ? '<span style="background:#dbeafe;color:#1d4ed8;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;margin-right:2px">Core</span><span style="background:#ffedd5;color:#c2410c;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px">Ext</span>' : (s.coreN>0 ? '<span style="background:#dbeafe;color:#1d4ed8;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px">Core</span>' : '<span style="background:#ffedd5;color:#c2410c;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px">Extended</span>');
        return '<tr><td style="padding:6px 8px;min-width:180px">' + topicCell + '</td><td style="padding:6px 8px;font-size:10px">' + qPills + '</td><td style="padding:6px 8px;text-align:center;font-size:10px;font-weight:700">' + s.marks + '</td><td style="padding:6px 8px;font-size:10px">' + pct + '%' + bar + '</td><td style="padding:6px 8px;text-align:center;font-size:10px">' + typeCell + '</td></tr>';
    }).join('');
    const topicSummaryHtml = `<div style="margin-bottom:28px;page-break-inside:avoid"><h2 style="font-size:14px;font-weight:800;color:#1e293b;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #e2e8f0">📊 Topic Summary Analysis</h2><table style="width:100%;border-collapse:collapse;font-size:11px"><thead><tr style="background:#f1f5f9"><th style="padding:7px 8px;text-align:left;font-size:10px;color:#475569;font-weight:700;border-bottom:2px solid #e2e8f0">Topic / Subtopic</th><th style="padding:7px 8px;text-align:left;font-size:10px;color:#475569;font-weight:700;border-bottom:2px solid #e2e8f0">Sub-questions</th><th style="padding:7px 8px;text-align:center;font-size:10px;color:#475569;font-weight:700;border-bottom:2px solid #e2e8f0">Marks</th><th style="padding:7px 8px;text-align:left;font-size:10px;color:#475569;font-weight:700;border-bottom:2px solid #e2e8f0">% of Paper</th><th style="padding:7px 8px;text-align:center;font-size:10px;color:#475569;font-weight:700;border-bottom:2px solid #e2e8f0">Core/Ext</th></table></thead><tbody>${summaryRows}</tbody></table></div>`;
    const cards = sourceData.map((q,i) => {
        const isRem = q.syllabusStatus==='removed';
        const isCore = q.currType==='Core';
        const accent = isRem?'#dc2626':isCore?'#0284c7':'#ea580c';
        const bgLight = isRem?'#fff1f2':isCore?'#eff6ff':'#fff7ed';
        const typeLabel = isRem?'REMOVED':(q.currType==='Core/Extended'?'CORE/EXTENDED':isCore?'CORE':'EXTENDED');
        const fullRef = `${currentPaperCode?currentPaperCode+'/':''}Q${q.qID}`;
        const topicPill = q.subtopicId ? (() => {
            const tn2 = parseInt(q.subtopicId.split('.')[0]);
            const tname2 = TOPIC_NAMES[tn2] || q.topic || '';
            return `<span style="background:#e0e7ff;color:#3730a3;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px 0 0 4px">Topic ${tn2}. ${esc(tname2)}</span><span style="background:#e2e8f0;color:#475569;font-size:10px;padding:2px 8px;border-radius:0 4px 4px 0">Sub-topic: ${q.subtopicId} ${esc(q.subTopic||q.topic||'')}</span>`;
        })() : `<span style="background:#e2e8f0;color:#475569;font-size:10px;padding:2px 8px;border-radius:4px">${esc(q.topic||'')}</span>`;
        const section = (icon, label, content, color, bg) => content && content.trim() ? `<div style="margin-top:10px;padding:10px 12px;background:${bg||'#f8fafc'};border-left:3px solid ${color};border-radius:0 6px 6px 0"><div style="font-size:9px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px">${icon} ${label}</div><div style="font-size:11px;color:#1e293b;line-height:1.65">${esc(content).replace(/<img /g,'<img style="max-width:100%;border-radius:4px;margin:6px 0" ')}</div></div>` : '';
        return `<div style="background:white;border:1.5px solid ${accent};border-radius:10px;margin-bottom:24px;overflow:hidden;page-break-inside:avoid"><div style="background:${bgLight};padding:12px 16px;border-bottom:1px solid ${accent}30"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><div><div style="font-size:13px;font-weight:800;color:${accent};font-family:monospace;margin-bottom:4px">${fullRef}</div><div style="display:flex;gap:3px;flex-wrap:wrap;align-items:center">${topicPill}${q.subTopic?`<span style="color:#64748b;font-size:10px">— ${esc(q.subTopic)}</span>`:''}</div></div><div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end;align-items:center;flex-shrink:0"><span style="background:${accent};color:white;font-size:9px;font-weight:700;padding:2px 8px;border-radius:99px">${typeLabel}</span><span style="background:#e0f2fe;color:#0369a1;font-size:9px;font-weight:700;padding:2px 8px;border-radius:99px">${q.marks||'?'} marks</span><span style="font-size:9px;color:#94a3b8">${i+1}/${currentResults.length}</span></div></div></div><div style="padding:12px 16px">${section('📋','Question', q.text, '#0f766e', '#f0fdfa')}${section('✅','Mark Scheme', q.ms, '#0284c7', '#eff6ff')}${section('🏆','Model Answer', q.model, '#4f46e5', '#eef2ff')}${section('📖','Concept Explanation', q.explanation, '#0891b2', '#ecfeff')}${section('⚠️','Common Mistakes', q.commonMistakes, '#dc2626', '#fff1f2')}${section('💡','Exam Tips', q.examTips, '#059669', '#f0fdf4')}${section('💬','Examiner Feedback / Teacher Comment', q.feedback, '#d97706', '#fffbeb')}${section('🎓','Tutor Note', q.tutorNote, '#6d28d9', '#f5f3ff')}${isRem?section('🚫','REMOVED — Do Not Study','This topic was removed from the 2026-2028 Cambridge IGCSE Biology syllabus.','#dc2626','#fff1f2'):''}</div></div>`;
    }).join('');
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${buildReportFilename(currentPaperCode||paper||'Unknown','PrintReport',sortMode,unitFilter)}</title><style>/* standard print styles */</style></head><body><div style="border-bottom:3px solid #4f46e5;padding-bottom:14px;margin-bottom:20px"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><h1 style="color:#4f46e5;font-size:20px;font-weight:800">Cambridge Biology 0610 — Analysis Report <span style="background:#eef2ff;color:#4f46e5;font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;vertical-align:middle">v51.1</span></h1><div style="color:#64748b;font-size:11px;margin-top:4px">📄 <strong>${paper}</strong> &nbsp;·&nbsp; 📅 ${new Date().toLocaleString()} &nbsp;·&nbsp; 📚 Cambridge IGCSE Biology 0610 (2026–2028) &nbsp;·&nbsp; ${sortMode==='topic'?'Topic Order':'Exam Order'}</div></div><div class="no-print" style="display:flex;gap:6px"><button onclick="(function(){const b=new Blob([document.documentElement.outerHTML],{type:'text/html'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='${buildReportFilename(currentPaperCode||paper||'Unknown','PrintReport',sortMode,unitFilter)}.html';a.click();URL.revokeObjectURL(a.href);})()" style="background:#16a34a;color:white;border:none;padding:8px 14px;border-radius:6px;font-weight:700;cursor:pointer;font-size:11px">💾 Save HTML</button><button onclick="window.print()" style="background:#4f46e5;color:white;border:none;padding:8px 16px;border-radius:6px;font-weight:700;cursor:pointer;font-size:11px">🖨️ Print</button></div></div><div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap"><div style="padding:10px 16px;border-radius:8px;background:#eff6ff;border:1px solid #bfdbfe;min-width:90px"><div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase">🔵 Core</div><div style="font-size:22px;font-weight:800;color:#0284c7">${sourceData.filter(q=>q.currType==='Core').length}</div></div><div style="padding:10px 16px;border-radius:8px;background:#fff7ed;border:1px solid #fed7aa;min-width:90px"><div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase">🟠 Extended</div><div style="font-size:22px;font-weight:800;color:#ea580c">${sourceData.filter(q=>q.currType==='Extended'||q.currType==='Core/Extended').length}</div></div><div style="padding:10px 16px;border-radius:8px;background:#fff1f2;border:1px solid #fecdd3;min-width:90px"><div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase">🟥 Removed</div><div style="font-size:22px;font-weight:800;color:#dc2626">${sourceData.filter(q=>q.syllabusStatus==='removed').length}</div></div><div style="padding:10px 16px;border-radius:8px;background:#eff6ff;border:1px solid #bfdbfe;min-width:90px"><div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase">📊 Marks</div><div style="font-size:22px;font-weight:800;color:#1d4ed8">${sourceData.reduce((s,q)=>s+(parseInt(q.marks)||0),0)}</div></div></div></div>${topicSummaryHtml}${cards}<div style="margin-top:24px;color:#94a3b8;font-size:10px;border-top:1px solid #e2e8f0;padding-top:10px;text-align:center">Generated by IGCSE Processor v51.1 · Cambridge 0610 Biology (2026–2028) · Classification by Gemini AI</div></body></html>`;
    pw.document.write(html);
    pw.document.close();
}

function downloadTextPDF(sortMode) {
    if (!currentResults.length) { showModal('No Results', 'No analysis to export.'); return; }
    if (!sortMode) sortMode = summarySortMode || 'exam';
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p','mm','a4');
        const subject = document.getElementById('subject')?.value||'Unknown';
        let yPos = 20;
        const margin = 20, pageWidth = pdf.internal.pageSize.getWidth();
        const contentWidth = pageWidth - margin*2;
        function addText(text, size=10, bold=false) {
            if (!text) return;
            text = cleanForPDF(text);
            if (!text.trim()) return;
            pdf.setFontSize(size); pdf.setFont('helvetica', bold?'bold':'normal');
            const leading = size * 0.44;
            const paragraphs = text.split('\n');
            paragraphs.forEach(para => {
                const trimmed = para.trim();
                if (!trimmed) { yPos += leading * 0.5; return; }
                const lines = pdf.splitTextToSize(trimmed, contentWidth);
                lines.forEach(line => {
                    if (yPos > 280) { pdf.addPage(); yPos = 20; }
                    pdf.text(line, margin, yPos);
                    yPos += leading;
                });
            });
            yPos += 1.5;
        }
        const _unitFilter = getReportUnitFilter();
        const sourceResults = applyUnitFilter(currentResults, _unitFilter);
        addText('IGCSE Analysis Report', 18, true);
        addText(`Paper: ${subject}`, 12);
        addText(`Generated: ${new Date().toLocaleString()}`, 10);
        addText(`Cambridge IGCSE Biology 0610 (2026-2028) — IGCSE Processor v51.0`, 9);
        yPos+=5;
        const coreN = currentResults.filter(q=>q.currType==='Core').length;
        const extN = currentResults.filter(q=>q.currType==='Extended'||q.currType==='Core/Extended').length;
        const remN = currentResults.filter(q=>q.syllabusStatus==='removed').length;
        const totalM = sourceResults.reduce((s,q)=>s+(parseInt(q.marks)||0),0);
        addText(`Core: ${coreN}  |  Extended: ${extN}  |  Removed: ${remN}  |  Total Marks: ${totalM}`, 12, true);
        yPos+=6;
        pdf.setTextColor(79,70,229);
        addText('Summary by Topic', 13, true);
        pdf.setTextColor(0,0,0);
        yPos+=1;
        const pdfTopicStats = {};
        const pdfOrder = [];
        sourceResults.forEach(q => {
            const key = q.subtopicId ? `${q.subtopicId}|||${q.topic}` : (q.topic||'Other');
            if (!pdfTopicStats[key]) { pdfTopicStats[key]={ id:q.subtopicId||'', topic:q.topic||'Other', qs:[], marks:0, cN:0, eN:0 }; pdfOrder.push(key); }
            pdfTopicStats[key].qs.push(q.qID);
            pdfTopicStats[key].marks += parseInt(q.marks)||0;
            if (q.currType==='Core') pdfTopicStats[key].cN++; else pdfTopicStats[key].eN++;
        });
        const pdfPre = currentPaperCode ? currentPaperCode+'/' : '';
        pdfOrder.forEach(key => {
            if (yPos>275) { pdf.addPage(); yPos=20; }
            const ts = pdfTopicStats[key];
            const tn3 = ts.id ? parseInt(ts.id.split('.')[0]) : null;
            const tname3 = tn3 ? (TOPIC_NAMES[tn3] || ts.topic) : ts.topic;
            const topicHeader = ts.id ? `Topic ${tn3}. ${tname3}  |  Sub-topic: ${ts.id} ${ts.topic}` : ts.topic;
            const typeStr = ts.eN>ts.cN ? '[EXTENDED]' : '[CORE]';
            const typeCol = ts.eN>ts.cN ? [234,88,12] : [2,132,199];
            pdf.setTextColor(...typeCol);
            addText(`${topicHeader}   ${typeStr}   ${ts.marks} marks`, 9, true);
            pdf.setTextColor(80,80,80);
            addText(ts.qs.map(id=>`${pdfPre}Q${id}`).join('  ·  '), 8);
            pdf.setTextColor(0,0,0);
            yPos+=1;
        });
        yPos+=6;
        let orderedQ = [...sourceResults];
        if (sortMode === 'topic') {
            orderedQ.sort((a, b) => {
                const aid = a.subtopicId || '99.99', bid = b.subtopicId || '99.99';
                const [am, as_] = aid.split('.').map(Number);
                const [bm, bs_] = bid.split('.').map(Number);
                if (am !== bm) return am - bm;
                if (as_ !== bs_) return as_ - bs_;
                return compareQIDs(a.qID, b.qID);
            });
        }
        const sortLabel_pdf = sortMode === 'topic' ? 'Topic Order' : 'Exam Order';
        addText(`Questions Detail — ${sortLabel_pdf}`, 13, true); yPos+=2;
        orderedQ.forEach((q, i) => {
            const typeColor = q.currType==='Core/Extended' ? [124,58,237] : q.currType==='Core' ? [2,132,199] : q.currType==='Extended' ? [234,88,12] : [220,38,38];
            const tn4 = q.subtopicId ? parseInt(q.subtopicId.split('.')[0]) : null;
            const tname4 = tn4 ? (TOPIC_NAMES[tn4] || q.topic || '') : (q.topic || 'Unknown Topic');
            const topicLabel = q.subtopicId ? `Topic ${tn4}. ${tname4}  |  ${q.subtopicId} ${q.subTopic || q.topic || ''}` : (q.topic || 'Unknown Topic');
            const fullRef = `${currentPaperCode ? currentPaperCode + '/' : ''}Q${q.qID}`;
            const typeLabel = q.currType==='Core/Extended' ? 'CORE/EXTENDED' : q.currType==='Core' ? 'CORE' : 'EXTENDED';
            if (yPos > 250) { pdf.addPage(); yPos = 20; }
            else if (i > 0) { yPos += 5; }
            pdf.setDrawColor(...typeColor);
            pdf.setLineWidth(0.5);
            pdf.line(margin, yPos, margin + contentWidth, yPos);
            yPos += 4;
            pdf.setTextColor(...typeColor);
            addText(topicLabel, 8, false);
            addText(`${fullRef}   ·   ${q.marks} marks   ·   [${typeLabel}]`, 10, true);
            pdf.setTextColor(0,0,0);
            yPos += 1;
            function addSection(label, body, labelRgb, bodyRgb) {
                if (!body || !body.trim()) return;
                yPos += 1;
                pdf.setTextColor(...labelRgb);
                addText(label, 8, true);
                pdf.setTextColor(...bodyRgb);
                addText(body, 9);
                pdf.setTextColor(0,0,0);
            }
            addSection('Question:', q.text, [15,118,110], [15,118,110]);
            addSection('Mark Scheme:', q.ms, [2,132,199], [30,64,175]);
            addSection('Model Answer:', q.model, [79,70,229], [79,70,229]);
            addSection('Explanation:', q.explanation, [8,145,178], [8,145,178]);
            addSection('Feedback:', q.feedback, [100,116,139], [100,116,139]);
            addSection('Teacher Notes:', q.teacherNotes, [109,40,217], [109,40,217]);
        });
        const safeName = buildReportFilename(currentPaperCode || subject || 'Unknown', 'Analysis_Report', sortMode, _unitFilter);
        const pdfBlob = pdf.output('blob');
        const blobURL = URL.createObjectURL(pdfBlob);
        const win = window.open(blobURL, '_blank');
        if (win) win.addEventListener('load', () => URL.revokeObjectURL(blobURL), { once: true });
        else {
            const a = document.createElement('a');
            a.href = blobURL; a.download = `${safeName}.pdf`;
            document.body.appendChild(a); a.click();
            setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(blobURL); }, 1000);
            showModal('PDF Ready', `Saving as ${safeName}.pdf`);
        }
    } catch(e) { showModal('Error', 'PDF failed: '+e.message); }
}
````

## File: js/extract.js
````javascript
// ================================================================
// PDF EXTRACTION & REVIEW MODAL (with console update after confirm)
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

// ========== renderConsole (shows CORE/EXTENDED, no mixed badge) ==========
function renderConsole(text) {
    const container = document.getElementById('question-console-rendered');
    if (!container) return;
    if (!text || !text.trim()) {
        container.innerHTML = '<span class="text-slate-400 text-xs italic">No questions extracted yet.</span>';
        return;
    }
    const lines = text.split('\n').filter(l => l.trim());
    container.innerHTML = lines.map(line => {
        // Remove "(no shared stem)" from parent lines
        let cleaned = line.replace(/\(no shared stem\)/gi, '').replace(/:\s*\(no shared stem\)/i, ':').trim();
        cleaned = cleaned.replace(/:\s*$/, '');
        // Replace [CORE/EXTENDED] with [EXTENDED] for display
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

// ========== AUTO EXTRACT (full original prompt, counting CORE/EXTENDED as Extended) ==========
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

        // ========== FULL ORIGINAL EXTRACTION PROMPT (shortened for brevity, but full in your original) ==========
        // For space, I include the full prompt as in your working version.
        // (Assume the full prompt is present here – it is identical to the one you had before.)
        const extractPrompt = `Read every page of this IGCSE exam paper carefully, including all diagrams, tables, and graphs.

CRITICAL RULE FOR SUB-QUESTIONS — read this first:
When a question has a stem (e.g. "The diagram shows a mitochondrion...") followed by sub-parts (a)(i), (a)(ii), (b) etc., you MUST copy the parent stem into EVERY sub-question line.
CORRECT:  Q1(a)(i): The diagram shows a mitochondrion. State its function. [1 mark] ...
WRONG:    Q1(a)(i): State its function. [1 mark] ...   ← MISSING the stem
Never output a bare sub-part — always start with the full parent context.

IGNORE COMPLETELY — do NOT include in any output:
- Blank answer lines (rows of dots ........, dashes ----, or underscores ____)
- Margin text: "DO NOT WRITE IN THIS MARGIN", "DO NOT WRITE OUTSIDE THE BOX"
- "BLANK PAGE", "This page is intentionally left blank"
- Page numbers (e.g. "19", "20")
- Paper codes (e.g. "0610/41/M/J/25", "UCLES 2025")
- "==End of OCR for page N==" markers
- Any continuation dots or answer space formatting
- Any reading or transcription of diagram labels, axis values, table data, or figure content — these are not part of the question text

For EACH question and sub-part found, write ONE line in this EXACT format (all on one single line):
Q[number]([part]): <complete question text only — no dots, no blanks> [X marks] [CORE or EXTENDED or CORE/EXTENDED] [Topic N.N SubtopicName]

RULE: [X marks] is REQUIRED on every CHILD sub-question line. Count marks from the paper. Never omit.

PARENT QUESTION LINE — REQUIRED BEFORE EACH GROUP OF SUB-QUESTIONS:
Output ONE bare parent line per main question number (Q1, Q2, Q3…) immediately before its sub-questions:
Q[number]: <full parent/stem text — the shared context or scenario for this question>
Example:  Q2: Chickens are birds that are bred by farmers. Table 2.1 shows characteristics of red junglefowl and farmed chickens.
If the main question has no shared stem (each sub-part is independent), still output: Q[number]:

SUB-QUESTION LINES — one line per sub-part, immediately after the parent line:
Q[number]([part]): <sub-question instruction only — do NOT repeat the parent stem here> [X marks] [CORE or EXTENDED or CORE/EXTENDED] [Topic N.N SubtopicName]
Example:  Q2(a)(i): Calculate the percentage change in mean body mass. Give your answer to 3 s.f. [3 marks] [CORE] [Topic 18.3 Selection]

CRITICAL — question text rules by question type:
Always begin each line with Q[number]: or Q[number]([part]): exactly.
- Each sub-question instruction is concise — it does NOT include the parent stem text.
- MULTIPLE CHOICE: Write all options A, B, C, D in full with their text.
- FILL IN THE BLANKS: Reproduce the sentence with .............. dots exactly where the blanks are.
- COMPLETE THE TABLE: Describe the full table structure — all column headers, row labels, any given data already filled in, and mark empty cells as [blank].
- CALCULATIONS: Include all given numerical values with units and the exact instruction.
- DIAGRAMS / GRAPHS: Describe every axis title, axis scale/range, all labelled features, and key data values in square brackets.
- Do NOT include answer lines, blank answer boxes, or answer-space formatting
- Keep each question on ONE line

CLASSIFICATION — Core vs Extended:
Use [CORE/EXTENDED] when the sub-question contains BOTH a Core task AND an Extended task.
Use [EXTENDED] when the entire question tests Extended/Supplement content only.
Use [CORE] for all other questions.

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
- Septum separating oxygenated/deoxygenated blood = [CORE]; identifying atrioventricular valve = [EXTENDED] → use [CORE/EXTENDED] if question asks both
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
- If a single sub-question clearly spans both Core and Extended content, use [CORE/EXTENDED]
- This is a Cambridge IGCSE paper — use [CORE], [EXTENDED], or [CORE/EXTENDED] only
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
List every question and every sub-part. Do not skip any. One line per sub-question.`;

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
                else if (line.includes('[EXTENDED]') || line.includes('[CORE/EXTENDED]')) extCount++;
            }
            const m = line.match(/^Q([\d]+)\(([^)]+)\)(?:\(([^)]+)\))?(?:\(([^)]+)\))?\s*:.*?\[(CORE|EXTENDED|CORE\/EXTENDED)\]/);
            if (m) {
                let qid = m[1] + '(' + m[2] + ')';
                if (m[3]) qid += '(' + m[3] + ')';
                if (m[4]) qid += '(' + m[4] + ')';
                let rawType = m[5];
                let finalType = (rawType === 'CORE' ? 'Core' : 'Extended');
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

// ========== REVIEW MODAL FUNCTIONS ==========
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
        const rows = lines.map((line, i) => {
            let mFull = line.match(/^(Q[^:]+):\s*(.*?)\[(\d+)\s*marks?\]\s*\[(CORE|EXTENDED|CORE\/EXTENDED)\]\s*(?:\[Topic\s+([^\]]+)\])?/i);
            if (!mFull) {
                const mNoMarks = line.match(/^(Q[^:]+):\s*(.*?)\s*\[(CORE|EXTENDED|CORE\/EXTENDED)\]\s*(?:\[Topic\s+([^\]]+)\])?/i);
                if (mNoMarks) {
                    const mMarks = line.match(/\[(\d+)\s*marks?\]|\((\d+)\s*marks?\)|\s(\d+)\s+marks?/i);
                    const foundMarks = mMarks ? (mMarks[1]||mMarks[2]||mMarks[3]) : '?';
                    mFull = [mNoMarks[0], mNoMarks[1], mNoMarks[2], foundMarks, mNoMarks[3], mNoMarks[4]];
                }
            }
            if (!mFull) return '';
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
            return `<tr style="background:${rowBg};border-bottom:1px solid #f1f5f9" data-review-row="${i}">
                <td class="px-3 py-2 font-mono font-bold text-slate-700 dark:text-slate-300">${qid}</td>
                <td class="px-3 py-2 text-slate-600 dark:text-slate-400">${preview}</td>
                <td class="px-3 py-2 text-slate-500 dark:text-slate-400 text-[10px]">${topic||''}</td>
                <td class="px-3 py-2">
                    <select onchange="updateReviewType(${i},this.value,this)" class="text-[10px] font-bold px-2 py-1 rounded border w-full" style="background:${type==='Core'?'#2563eb':'#ea580c'};color:white">
                        ${typeSel}
                    </select>
                </td>
                <td class="px-3 py-2 text-center text-slate-600 dark:text-slate-400 font-bold">${marks}</td>
             <tr>`;
        }).filter(Boolean).join('');
        if (tbody) tbody.innerHTML = rows || '<tr><td colspan="5" class="px-3 py-4 text-center">No questions parsed.</td></tr>';
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
        if (lines[i].trim() && /^Q[^:]+:/i.test(lines[i])) count++;
        if (count === rowIdx) {
            const newTag = newType === 'Core' ? 'CORE' : 'EXTENDED';
            lines[i] = lines[i]
                .replace(/\[CORE\]/g, '[__NEWTYPE__]')
                .replace(/\[EXTENDED\]/g, '[__NEWTYPE__]')
                .replace(/\[CORE\/EXTENDED\]/g, '[__NEWTYPE__]')
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

// ========== FIXED confirmReviewAndAnalyse – updates console after confirm ==========
function confirmReviewAndAnalyse() {
    window.extractedClassifications = {};
    window.extractedTopics = {};
    const qLines = _pendingExtractedText.split('\n');
    qLines.forEach(line => {
        const m = line.match(/^Q([\d]+)\(([^)]+)\)(?:\(([^)]+)\))?(?:\(([^)]+)\))?\s*:.*?\[(CORE|EXTENDED|CORE\/EXTENDED)\]/);
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
    
    // --- UPDATE CONSOLE with final classifications ---
    // Convert the pending text (which already has the updated tags) to ensure console shows final counts
    renderConsole(_pendingExtractedText);
    // Also update the hidden textarea for consistency
    const qt = document.getElementById('question-text');
    if (qt) qt.value = _pendingExtractedText;
    
    if (!uploadedFiles.ms) {
        showModal('Mark Scheme Required', 'Please upload the Mark Scheme PDF before confirming.');
        return;
    }
    analyzeDocuments();
}
````

## File: js/globals.js
````javascript
// ================================================================
// GLOBAL VARIABLES & CONSTANTS (IGCSE Processor)
// ================================================================
let uploadedFiles = {};
let currentResults = [];
let currentPaperCode = '';
let currentSubject = null;
let isAnalyzing = false;
let isExtracting = false;
let summarySortMode = 'exam';

const API_MODELS = [
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=",
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=",
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=",
];

const TOPIC_NAMES = {
    1: "Characteristics & Classification",
    2: "Organisation of the Organism",
    3: "Movement into and out of Cells",
    4: "Biological Molecules",
    5: "Enzymes",
    6: "Plant Nutrition",
    7: "Human Nutrition",
    8: "Transport in Plants",
    9: "Transport in Animals",
    10: "Pathogens & Immunity",
    11: "Gas Exchange",
    12: "Respiration",
    13: "Excretion",
    14: "Coordination & Response",
    15: "Drugs",
    16: "Reproduction",
    17: "Inheritance",
    18: "Variation & Selection",
    19: "Organisms & their Environment",
    20: "Human Influences on Ecosystems",
    21: "Biotechnology and Genetic Modification"
};

const SUBJECT_REFS = {
    'cambridge_biology_0610': `Cambridge IGCSE Biology 0610 (2026–2028)
Classify by the SPECIFIC CONCEPT tested using the subtopic-keyed syllabus above.
Core = available to all candidates. Extended (Supplement) = higher tier only.
RULE: [CORE] if question only tests Core points. [EXTENDED] if question tests any Supplement-only point. [CORE/EXTENDED] if a SINGLE question or table contains BOTH Core content AND Extended content.`
};

function detectSubjectKey(subjectStr) {
    const override = document.getElementById('subject-override')?.value;
    if (override) return override;
    const s = (subjectStr || '').toUpperCase();
    if (/(0610|BIOLOGY)/i.test(s) || /bio/i.test(subjectStr)) return 'cambridge_biology_0610';
    return 'cambridge_biology_0610';
}

function getClassificationRef(subjectKey) { return null; }
function getBiologyRef() { return SUBJECT_REFS['cambridge_biology_0610'] || ''; }
function getSubjectLabel(key) { return 'Cambridge IGCSE Biology 0610'; }

// ========== FIX: Add missing detectSubject function ==========
function detectSubject(paperCode) {
    const cleanCode = paperCode.replace(/[-_\s]/g, '').toUpperCase();
    if (/(0610|BIOLOGY)/i.test(cleanCode) || /bio/i.test(paperCode)) {
        return {
            detected: true,
            subject: {
                id: 'cambridge-bio-0610',
                name: 'Biology',
                board: 'Cambridge',
                badgeClass: 'badge-cambridge-bio'
            }
        };
    }
    if (/(0625|PHYSICS)/i.test(cleanCode) || /phys/i.test(paperCode)) {
        return {
            detected: true,
            subject: {
                id: 'cambridge-phys-0625',
                name: 'Physics',
                board: 'Cambridge',
                badgeClass: 'badge-cambridge-phys'
            }
        };
    }
    if (/(0580|MATHS|MATHEMATICS)/i.test(cleanCode) || /math/i.test(paperCode)) {
        return {
            detected: true,
            subject: {
                id: 'cambridge-maths-0580',
                name: 'Mathematics',
                board: 'Cambridge',
                badgeClass: 'badge-cambridge-maths'
            }
        };
    }
    return {
        detected: false,
        subject: {
            id: 'unknown',
            name: 'Unknown Subject',
            board: 'Unknown',
            badgeClass: 'badge-unknown'
        }
    };
}

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
````

## File: js/init.js
````javascript
// js/init.js (updated to not conflict with biohub load)
window.addEventListener('load', () => {
    const savedKey = localStorage.getItem('igcse_key');
    if (savedKey) {
        document.getElementById('api-key').value = savedKey;
        validateApiKeyInput();
        checkInputs();
    }
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const btn = document.querySelector('button[onclick="toggleDarkMode()"]');
        if (btn) btn.innerHTML = '☀️ Light';
    }
    loadHardcodedSyllabus();
    restoreCurrentResults();
    updateOnlineStatus();
});
````

## File: js/syllabus.js
````javascript
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
````

## File: js/ui.js
````javascript
// ================================================================
// UI HELPERS & EVENT HANDLERS (IGCSE Processor)
// ================================================================
function showModal(title, message) {
    const modal = document.getElementById('custom-modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-message').innerText = message;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.remove('scale-95');
}
function closeModal() {
    const modal = document.getElementById('custom-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('div').classList.add('scale-95');
}

function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm font-bold shadow-lg transition-opacity duration-500 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 500);
    }, 2500);
}

function setExtractionStatus(status, message) {
    const el = document.getElementById('extraction-status');
    if (!el) return;
    const cls = { ready: 'status-ready', extracting: 'status-extracting', complete: 'status-complete', error: 'status-error', waiting: 'text-amber-600 font-bold' };
    const icons = { ready: '⚪', extracting: '🔄', complete: '✅', error: '❌', waiting: '⏳' };
    el.className = `text-[10px] font-bold ${cls[status] || ''}`;
    el.innerHTML = `${icons[status] || '⚪'} ${message}`;
    const reviewBtn = document.getElementById('review-classifications-btn');
    if (reviewBtn) reviewBtn.classList.toggle('hidden', status !== 'complete');
}

function updateSubjectDetection(val) {
    const key = detectSubjectKey(val);
    const el = document.getElementById('subject-key-display');
    if (el) el.textContent = getSubjectLabel(key);
}

function saveApiKey() {
    const key = getApiKey();
    localStorage.setItem('igcse_key', key);
    validateApiKeyInput();
}
function validateApiKeyInput() {
    const key = getApiKey();
    const badge = document.getElementById('api-validation-badge');
    if (!badge) return false;
    const valid = validateApiKey(key);
    if (!key) { badge.innerText = 'No Key'; badge.className = 'text-[10px] px-2 py-1 rounded-full bg-slate-200 text-slate-600'; return false; }
    if (!valid) { badge.innerText = 'Invalid Format'; badge.className = 'text-[10px] px-2 py-1 rounded-full bg-red-100 text-red-600'; return false; }
    badge.innerText = '✓ Valid Key'; badge.className = 'text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-600'; return true;
}
function toggleApiKeyVisibility() {
    const input = document.getElementById('api-key');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
}
async function testAPIKey() {
    const key = getApiKey();
    if (!validateApiKey(key)) { showModal('Invalid Key', 'Please enter a valid API key first.'); return; }
    try {
        await callGeminiAPI({ contents: [{ parts: [{ text: 'Test' }] }] });
        showModal('Success', 'API key is valid and working!');
    } catch (e) { showModal('Test Failed', e.message); }
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    const btns = document.querySelectorAll('button[onclick="toggleDarkMode()"]');
    btns.forEach(btn => { if (btn) btn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark'; });
}

function showStudyGuide() { updateStudyGuide(); document.getElementById('study-guide')?.classList.remove('hidden'); }
function hideStudyGuide() { document.getElementById('study-guide')?.classList.add('hidden'); }
function showSyllabusSummary() {
    const summary = document.getElementById('syllabus-summary');
    const coreList = document.getElementById('core-topics-list');
    const suppList = document.getElementById('supplement-topics-list');
    if (!summary) return;
    const ps = syllabusParser.getSummary();
    document.getElementById('core-topic-count').textContent = ps.totalCore;
    document.getElementById('supp-topic-count').textContent = ps.totalSupplement;
    if (coreList) coreList.innerHTML = ps.coreTopics.map(t => `<div class="py-0.5 border-b border-blue-100 text-blue-800">🔵 ${t}</div>`).join('') || '<div class="text-slate-400">None extracted yet.</div>';
    if (suppList) suppList.innerHTML = ps.supplementTopics.map(t => `<div class="py-0.5 border-b border-orange-100 text-orange-800">🟠 ${t}</div>`).join('') || '<div class="text-slate-400">None extracted yet.</div>';
    summary.classList.remove('hidden');
}
function hideSyllabusSummary() { document.getElementById('syllabus-summary')?.classList.add('hidden'); }

function updateStudyGuide() {
    if (!currentResults.length) return;
    const core = currentResults.filter(q => q.currType === 'Core' && q.syllabusStatus !== 'removed');
    const ext = currentResults.filter(q => q.currType === 'Extended' && q.syllabusStatus !== 'removed');
    const rem = currentResults.filter(q => q.syllabusStatus === 'removed');
    const makeSpan = (q, color) => `<span class="bg-${color}-100 text-${color}-800 px-2 py-1 rounded text-[10px]">${q.qID}</span>`;
    const cl = document.getElementById('core-questions-list');
    if (cl) cl.innerHTML = core.map(q => makeSpan(q, 'blue')).join('') || '<span class="text-slate-400">None</span>';
    const el = document.getElementById('extended-questions-list');
    if (el) el.innerHTML = ext.map(q => makeSpan(q, 'orange')).join('') || '<span class="text-slate-400">None</span>';
    const il = document.getElementById('ignored-questions-list');
    if (il) il.innerHTML = rem.map(q => makeSpan(q, 'red')).join('') || '<span class="text-slate-400">None</span>';
    const flagged = currentResults.filter(q => q.flagged);
    const fl = document.getElementById('flagged-questions-list');
    const fc = document.getElementById('flagged-count');
    const fBox = document.getElementById('flagged-section');
    if (fl) fl.innerHTML = flagged.map(q => `<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-[10px]">🚩 ${q.qID}</span>`).join('') || '<span class="text-slate-400">None flagged</span>';
    if (fc) fc.textContent = flagged.length;
    if (fBox) fBox.style.display = flagged.length ? 'block' : 'none';
    const cc = document.getElementById('core-count');
    const ec = document.getElementById('extended-count');
    const rc = document.getElementById('removed-count');
    if (cc) cc.textContent = core.length;
    if (ec) ec.textContent = ext.length;
    if (rc) rc.textContent = rem.length;
}

function filterQuestions() {
    const searchTerm = document.getElementById('search-questions')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('filter-type')?.value || 'all';
    const statusFilter = document.getElementById('filter-status')?.value || 'all';
    const difficultyFilter = document.getElementById('filter-difficulty')?.value || 'all';
    document.querySelectorAll('#analysis-container > div[data-question-id]').forEach(card => {
        const text = card.innerText.toLowerCase();
        const type = card.dataset.questionType || '';
        const status = card.dataset.questionStatus || '';
        const difficulty = card.dataset.questionDifficulty || '';
        let show = true;
        if (searchTerm && !text.includes(searchTerm)) show = false;
        if (typeFilter !== 'all' && type !== typeFilter) show = false;
        if (statusFilter !== 'all' && status !== statusFilter) show = false;
        if (difficultyFilter !== 'all' && difficulty !== difficultyFilter) show = false;
        card.style.display = show ? 'block' : 'none';
    });
}

// ========== FIXED: File upload handler that shows filename for all PDFs ==========
async function handleFile(input, labelId, type) {
    const label = document.getElementById(labelId);
    const file = input.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
        showModal('Invalid File', 'Please upload only PDF files.');
        input.value = '';
        return;
    }
    if (file.size > 15 * 1024 * 1024) {
        showModal('File Too Large', 'Maximum file size is 15MB.');
        input.value = '';
        return;
    }
    if (label) label.innerText = "LOADING...";
    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64 = e.target.result.split(',')[1];
        uploadedFiles[type] = { data: base64, mimeType: file.type };
        
        // --- Update the label with filename and checkmark ---
        if (label) {
            // Clear existing content
            label.innerHTML = '';
            // Create container for the two lines
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.height = '100%';
            // Filename span
            const nameSpan = document.createElement('span');
            nameSpan.style.fontSize = '9px';
            nameSpan.style.fontWeight = '600';
            nameSpan.style.wordBreak = 'break-all';
            nameSpan.style.lineHeight = '1.3';
            nameSpan.style.display = 'block';
            nameSpan.style.textAlign = 'center';
            nameSpan.innerText = file.name;
            // Checkmark span
            const checkSpan = document.createElement('span');
            checkSpan.style.fontSize = '10px';
            checkSpan.innerText = '✓';
            container.appendChild(nameSpan);
            container.appendChild(checkSpan);
            label.appendChild(container);
            label.classList.add('file-uploaded');
        }
        
        let typeName = '';
        if (type === 'exam') typeName = 'Exam PDF';
        else if (type === 'ms') typeName = 'Mark Scheme';
        else if (type === 'syllabus') typeName = 'Syllabus PDF';
        else if (type === 'comments') typeName = 'Teacher Comments';
        showNotification(`✅ ${typeName} uploaded successfully!`);
        
        if (type === 'syllabus') {
            await extractSyllabusTopics();
        }
        if (type === 'exam') {
            if (syllabusParser.isSyllabusLoaded()) {
                await detectSubjectFromExam();
                await autoExtract();
            } else {
                loadHardcodedSyllabus();
                await detectSubjectFromExam();
                await autoExtract();
            }
        }
        checkInputs();
    };
    reader.readAsDataURL(file);
}

function checkInputs() {
    const isValidKey = validateApiKey(getApiKey());
    const hasFiles = uploadedFiles.exam && uploadedFiles.ms;
    const hasSyllabus = syllabusParser.isSyllabusLoaded();
    const btn = document.getElementById('analyze-btn');
    if (btn) {
        btn.disabled = !(isValidKey && hasFiles) || isExtracting || isAnalyzing;
        if (isExtracting) btn.textContent = '⏳ Extracting Questions...';
        else if (isAnalyzing) btn.textContent = '⏳ Analysing...';
        else btn.textContent = hasSyllabus ? `Generate Analysis (${syllabusParser.coreCount}C/${syllabusParser.supplementCount}S topics — 2026-2028)` : 'Generate Analysis (Upload Syllabus First)';
    }
}

function resetApplication() {
    if (!confirm('Are you sure? All uploaded files and results will be lost.')) return;
    uploadedFiles = {};
    currentResults = [];
    currentPaperCode = '';
    currentSubject = null;
    syllabusParser.isLoaded = false;
    syllabusParser.coreTopics.clear();
    syllabusParser.supplementTopics.clear();
    syllabusParser.coreTopicStrings = [];
    syllabusParser.supplementTopicStrings = [];
    syllabusParser.coreCount = 0;
    syllabusParser.supplementCount = 0;
    document.getElementById('subject').value = '';
    document.getElementById('syllabus-structure').value = '';
    document.getElementById('question-text').value = '';
    renderConsole('');
    document.getElementById('syllabus-warnings').innerHTML = '';
    document.getElementById('results-area')?.classList.add('hidden');
    document.getElementById('analyze-btn').disabled = true;
    document.getElementById('exam-pdf').value = '';
    document.getElementById('ms-pdf').value = '';
    document.getElementById('syllabus-pdf').value = '';
    document.getElementById('comments-pdf').value = '';
    [['exam-label', '📄 Exam PDF*'], ['ms-label', '📝 Mark Scheme*'], ['syllabus-label', '📚 Syllabus PDF (Optional)']].forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) { el.innerText = text; el.classList.remove('file-uploaded'); }
    });
    const cl = document.getElementById('comments-label');
    if (cl) { cl.innerText = '💬 Teacher Comments (Optional)'; cl.classList.remove('file-uploaded', 'file-optional'); }
    const parseBadge = document.getElementById('syllabus-parse-badge');
    if (parseBadge) { parseBadge.textContent = '📚 No Syllabus'; parseBadge.className = 'bg-amber-100 text-amber-700 text-[10px] px-2 py-1 rounded-full'; }
    setExtractionStatus('waiting', 'LOADING SYLLABUS...');
    setTimeout(() => loadHardcodedSyllabus(), 100);
    checkInputs();
}

function updateOnlineStatus() {
    const status = document.getElementById('online-status');
    if (navigator.onLine) {
        if (status) { status.innerText = '🟢 Online'; status.className = 'online-badge text-[10px] px-2 py-1 rounded-full'; }
        const banner = document.getElementById('offline-banner');
        if (banner) banner.classList.add('hidden');
    } else {
        if (status) { status.innerText = '🔴 Offline'; status.className = 'offline-badge text-[10px] px-2 py-1 rounded-full'; }
        const banner = document.getElementById('offline-banner');
        if (banner) banner.classList.remove('hidden');
    }
}

function persistCurrentResults() {
    if (!currentResults.length) return;
    try {
        localStorage.setItem('igcse_current_results', JSON.stringify(currentResults));
        localStorage.setItem('igcse_current_paper', currentPaperCode || '');
        localStorage.setItem('igcse_current_subject', currentSubject || '');
    } catch (e) { /* quota exceeded */ }
}

function restoreCurrentResults() {
    try {
        const saved = localStorage.getItem('igcse_current_results');
        const paper = localStorage.getItem('igcse_current_paper');
        const subj = localStorage.getItem('igcse_current_subject');
        if (saved) {
            currentResults = JSON.parse(saved);
            currentPaperCode = paper || '';
            currentSubject = subj || '';
            renderCards(currentResults, currentPaperCode);
            renderSummary(currentResults, currentPaperCode);
            renderStats(currentResults);
            renderRecommendations(currentResults);
            updateStudyGuide();
            const banner = document.getElementById('restore-banner');
            if (banner) banner.style.display = 'block';
            return true;
        }
    } catch (e) { }
    return false;
}

function clearRestoredSession() {
    localStorage.removeItem('igcse_current_results');
    localStorage.removeItem('igcse_current_paper');
    localStorage.removeItem('igcse_current_subject');
    currentResults = [];
    document.getElementById('analysis-container').innerHTML = '';
    const banner = document.getElementById('restore-banner');
    if (banner) banner.style.display = 'none';
}
````

## File: index.html
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BioHub OS + IGCSE Processor v51</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <aside class="sidebar">
        <div class="text-orange-600 font-black text-2xl mb-12">B</div>
        <div class="nav-item active" onclick="nav('dash', this)" title="Dashboard">🏠</div>
        <div class="nav-item" onclick="nav('explainer', this)" title="AI Explainer">🤖</div>
        <div class="nav-item" onclick="nav('practice', this)" title="Dual Practice">📄</div>
        <div class="nav-item" onclick="nav('flashcards', this)" title="Flashcards">📇</div>
        <div class="nav-item" onclick="nav('processor', this)" title="IGCSE Processor">⚙️</div>
    </aside>

    <div class="main-stage">
        <header class="h-16 border-b border-zinc-800 flex items-center px-8 justify-between bg-black">
            <h2 id="header-title" class="text-xs font-bold tracking-widest text-zinc-500 uppercase">Dashboard</h2>
            <button onclick="toggleDarkMode()" class="bg-slate-800 text-slate-300 px-3 py-2 rounded-xl font-bold text-xs uppercase hover:bg-orange-600 hover:text-white transition">🌙 Dark</button>
        </header>

        <!-- Dashboard Page -->
        <section id="dash" class="page active p-12 overflow-y-auto">
            <h1 class="text-4xl font-bold mb-8">System Metrics</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                <div class="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                    <p class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Saved AI Analyses</p>
                    <h3 id="dash-insight-count" class="text-5xl font-bold mt-4 text-white">0</h3>
                </div>
                <div class="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                    <p class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Active Flashcards</p>
                    <h3 id="dash-card-count" class="text-5xl font-bold mt-4 text-orange-600">0</h3>
                </div>
                <div class="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                    <p class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Processor Questions</p>
                    <h3 id="dash-question-count" class="text-5xl font-bold mt-4 text-emerald-500">0</h3>
                </div>
            </div>
        </section>

        <!-- AI Explainer Page -->
        <section id="explainer" class="page p-10 overflow-y-auto">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-2xl font-bold mb-10">AI Exam Expert</h2>
                <div class="mb-8">
                    <div class="flex justify-between items-center mb-4">
                        <label class="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">1. Question Interface</label>
                        <div class="media-group">
                            <button onclick="document.getElementById('q-img-upload').click()" class="hub-btn">UPLOAD IMAGE</button>
                            <button onclick="document.getElementById('q-img-ocr').click()" class="hub-btn">DIRECT OCR</button>
                            <input type="file" id="q-img-upload" hidden onchange="handleMedia(this, 'ai-q', false)">
                            <input type="file" id="q-img-ocr" hidden onchange="handleMedia(this, 'ai-q', true)">
                        </div>
                    </div>
                    <textarea id="ai-q" class="w-full h-32 bg-zinc-900 p-6 rounded-2xl outline-none border border-zinc-800 focus:border-orange-600 transition text-sm" placeholder="Paste a past paper question..."></textarea>
                </div>
                <div class="mb-10">
                    <div class="flex justify-between items-center mb-4">
                        <label class="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">2. Mark Scheme Guidance (Optional)</label>
                        <div class="media-group">
                            <button onclick="document.getElementById('ms-img-upload').click()" class="hub-btn">UPLOAD IMAGE</button>
                            <button onclick="document.getElementById('ms-img-ocr').click()" class="hub-btn">DIRECT OCR</button>
                            <input type="file" id="ms-img-upload" hidden onchange="handleMedia(this, 'ai-ms', false)">
                            <input type="file" id="ms-img-ocr" hidden onchange="handleMedia(this, 'ai-ms', true)">
                        </div>
                    </div>
                    <textarea id="ai-ms" class="w-full h-24 bg-zinc-900 p-6 rounded-2xl outline-none border border-zinc-800 focus:border-orange-600 transition text-sm" placeholder="Paste the mark scheme (optional)"></textarea>
                </div>
                <button onclick="executeAI()" class="primary-btn">Generate with Gemini + Syllabus</button>
                <div id="ai-out-container" class="hidden mt-8 p-8 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <div id="ai-out-text" class="text-zinc-300 leading-relaxed text-sm"></div>
                    <button onclick="commitInsight()" class="mt-6 text-[10px] font-bold text-orange-500 hover:underline tracking-widest uppercase">Save Analysis</button>
                </div>
            </div>
        </section>

        <!-- Dual Practice Page -->
        <section id="practice" class="page">
            <div class="dual-viewport">
                <div class="pdf-pane">
                    <div class="viewer-header">
                        <button onclick="navigatePdf('qp', -1)" class="tool-btn">⬅️</button>
                        <span id="qp-label" class="text-[10px] font-bold tracking-widest">PAGE 1</span>
                        <button onclick="navigatePdf('qp', 1)" class="tool-btn">➡️</button>
                        <button onclick="document.getElementById('in-qp').click()" class="tool-btn">LOAD QP PDF</button>
                        <button onclick="analyseCurrentPage()" class="tool-btn bg-orange-600 !text-white">🤖 ANALYSE THIS PAGE</button>
                        <input type="file" id="in-qp" hidden onchange="mountPDF(this, 'qp')">
                    </div>
                    <div class="scroll-container" id="qp-scroll"><canvas id="qp-canv"></canvas></div>
                </div>
                <div class="pdf-pane bg-zinc-950">
                    <div class="viewer-header">
                        <button onclick="navigatePdf('ms', -1)" class="tool-btn">⬅️</button>
                        <span id="ms-label" class="text-[10px] font-bold tracking-widest">PAGE 1</span>
                        <button onclick="navigatePdf('ms', 1)" class="tool-btn">➡️</button>
                        <button onclick="toggleMSVisibility()" id="ms-toggle" class="ml-auto tool-btn bg-orange-600 !text-white">HIDE MARK SCHEME</button>
                        <button onclick="document.getElementById('in-ms').click()" class="tool-btn">LOAD MS PDF</button>
                        <input type="file" id="in-ms" hidden onchange="mountPDF(this, 'ms')">
                    </div>
                    <div class="scroll-container" id="ms-scroll"><canvas id="ms-canv"></canvas></div>
                </div>
            </div>
        </section>

        <!-- Flashcards Page -->
        <section id="flashcards" class="page p-12 overflow-y-auto">
            <div class="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-center h-full">
                <div class="w-full lg:w-2/5 bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                    <h3 class="text-xs font-bold text-zinc-500 mb-6 uppercase tracking-wider">Card Creator</h3>
                    <div class="space-y-4">
                        <div><label class="text-[10px] text-zinc-600 block mb-2 font-bold uppercase">Front Side</label><input id="fc-q" type="text" class="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none text-sm text-white focus:border-orange-500" placeholder="e.g., Define Osmosis"></div>
                        <div><label class="text-[10px] text-zinc-600 block mb-2 font-bold uppercase">Back Side</label><textarea id="fc-a" class="w-full bg-black border border-zinc-800 p-4 rounded-xl h-32 outline-none text-sm text-white focus:border-orange-500" placeholder="e.g., Net movement of water molecules down a water potential gradient..."></textarea></div>
                        <button onclick="createNewDeckCard()" class="primary-btn mt-2">Add to Deck</button>
                        <button onclick="generateAIFlashcards()" class="mt-2 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-xl transition text-sm">🤖 Generate AI Flashcards (Topic)</button>
                    </div>
                </div>
                <div class="flex-1 flex flex-col items-center justify-center">
                    <div class="card-container" onclick="this.querySelector('.card-inner').classList.toggle('flipped')">
                        <div class="card-inner" id="card-obj">
                            <div class="card-face card-front" id="display-q">No flashcards. Generate or create some!</div>
                            <div class="card-face card-back" id="display-a">Use 'Generate AI Flashcards' or add manually.</div>
                        </div>
                    </div>
                    <div class="flex gap-4 mt-10">
                        <button onclick="shiftCard(-1)" class="tool-btn px-6 py-2">⬅️ PREV</button>
                        <button onclick="shiftCard(1)" class="tool-btn px-6 py-2">NEXT ➡️</button>
                        <button onclick="wipeFlashcards()" class="tool-btn border-red-900/50 text-red-500 hover:bg-red-950/20">WIPE ALL</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- IGCSE Processor Page -->
        <section id="processor" class="page igcse-processor">
            <div class="overflow-y-auto h-full p-8">
                <div id="app" class="max-w-6xl mx-auto bg-zinc-900 rounded-3xl p-6 md:p-12 shadow-2xl border border-zinc-800">
                    <!-- IGCSE Processor UI -->
                    <div class="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b pb-8 border-zinc-800">
                        <div><h1 class="text-4xl font-black text-slate-100 tracking-tight">Cambridge <span class="text-orange-500">Biology 0610</span></h1>
                        <p class="text-slate-400 font-medium">IGCSE Past Paper Question Analyser · v51.1</p>
                        <div class="flex gap-2 mt-2 flex-wrap"><span id="online-status" class="online-badge text-[10px] px-2 py-1 rounded-full">🟢 Online</span><span id="syllabus-parse-badge" class="bg-amber-800 text-amber-200 text-[10px] px-2 py-1 rounded-full">📚 No Syllabus</span><span id="exam-board-badge" class="hidden bg-indigo-900 text-indigo-200 text-[10px] px-2 py-1 rounded-full"></span></div></div>
                        <div class="flex gap-2 flex-wrap">
                            <button onclick="toggleDarkMode()" class="bg-zinc-800 text-slate-300 px-3 py-2 rounded-xl font-bold text-xs uppercase hover:bg-orange-600 hover:text-white transition">🌙 Dark</button>
                            <button onclick="showStudyGuide()" class="bg-zinc-800 text-slate-300 px-3 py-2 rounded-xl font-bold text-xs uppercase hover:bg-orange-600 hover:text-white transition">📖 Study Guide</button>
                            <button onclick="showSyllabusSummary()" class="bg-zinc-800 text-slate-300 px-3 py-2 rounded-xl font-bold text-xs uppercase hover:bg-orange-600 hover:text-white transition">🗂️ Syllabus</button>
                            <button onclick="resetApplication()" class="bg-zinc-800 text-slate-300 px-3 py-2 rounded-xl font-bold text-xs uppercase hover:bg-rose-700 hover:text-white transition">Clear All</button>
                        </div>
                    </div>
                    <!-- API Key & Subject Inputs -->
                    <div class="bg-zinc-800 p-4 rounded-xl mb-6">
                        <div class="flex justify-between items-center mb-2"><label class="block text-[10px] font-black text-orange-400 uppercase tracking-widest">Gemini API Key</label><span id="api-validation-badge" class="text-[10px] px-2 py-1 rounded-full bg-zinc-700 text-slate-300">Not Validated</span></div>
                        <div class="api-input-container"><input type="password" id="api-key" class="api-input w-full p-3 bg-black border border-orange-800 rounded-xl outline-none transition font-mono text-sm text-white" placeholder="Paste AIza... key here" oninput="validateApiKeyInput(); saveApiKey(); checkInputs();"><span class="eye-icon" onclick="toggleApiKeyVisibility()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></span></div>
                        <div class="flex justify-between mt-2"><p class="text-[10px] text-orange-400">Get free key at <a href="https://makersuite.google.com/app/apikey" target="_blank" class="underline">Google AI Studio</a></p><button onclick="testAPIKey()" class="text-[10px] bg-orange-800 px-2 py-1 rounded">Test Key</button></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div><label class="block text-xs font-black text-slate-400 uppercase mb-2">Subject / Paper <span id="detection-status" class="text-emerald-600 text-[10px] ml-2 hidden">✓ Auto-detected</span></label><input type="text" id="subject" class="w-full p-4 bg-black border border-zinc-700 rounded-xl focus:border-orange-500 outline-none text-white" placeholder="e.g. Biology 0610/42/O/N/19" oninput="checkInputs();updateSubjectDetection(this.value)"><div class="mt-2 flex items-center gap-2"><span class="text-[10px] text-slate-400">Detected:</span><span id="subject-key-display" class="text-[10px] font-bold text-orange-500 bg-orange-950 px-2 py-0.5 rounded">—</span></div></div>
                        <div><label class="block text-xs font-black text-slate-400 uppercase mb-2">Syllabus Topics <span id="syllabus-parse-status" class="text-[10px] text-slate-400"></span></label><textarea id="syllabus-structure" rows="10" class="w-full p-4 bg-black border border-zinc-700 rounded-xl text-sm focus:border-orange-500 outline-none font-mono text-slate-300" placeholder="Syllabus content will appear here after upload..." readonly></textarea><p class="text-[10px] text-slate-400 mt-1">⚠️ Built-in syllabus (2026-2028) always used.</p></div>
                    </div>
                    <!-- Question Console -->
                    <div class="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900 mb-8">
                        <div class="bg-zinc-950 px-5 py-2 flex justify-between items-center border-b border-zinc-800"><span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question Text Console <span class="text-[8px] font-normal text-slate-500">(🔵=Core 🟠=Extended 🏷️=Topic)</span></span><span id="extraction-status" class="text-[10px] font-bold text-slate-400 italic">⏳ WAITING FOR SYLLABUS</span><button id="review-classifications-btn" onclick="openReviewModal(document.getElementById('question-text')?.value||'')" class="hidden ml-2 text-[10px] bg-orange-600 text-white px-3 py-1 rounded-lg font-bold hover:bg-orange-700 transition">🔍 Review Classifications</button></div>
                        <textarea id="question-text" class="hidden" readonly></textarea>
                        <div id="question-console-rendered" class="w-full p-5 bg-transparent text-sm font-mono text-slate-300 overflow-y-auto min-h-[120px]" style="max-height:600px"><span class="text-slate-500 text-xs italic">After uploading the Exam PDF, questions will appear here annotated...</span></div>
                    </div>
                    <!-- File Uploads -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div><label for="exam-pdf" id="exam-label" class="file-input-label flex flex-col items-center justify-center p-6 rounded-2xl h-32 text-center text-[10px] font-black uppercase tracking-widest border-2 border-zinc-700">📄 Exam PDF*</label><input type="file" id="exam-pdf" accept=".pdf" class="hidden" onchange="handleFile(this, 'exam-label', 'exam')"></div>
                        <div><label for="ms-pdf" id="ms-label" class="file-input-label flex flex-col items-center justify-center p-6 rounded-2xl h-32 text-center text-[10px] font-black uppercase tracking-widest border-2 border-zinc-700">📝 Mark Scheme*</label><input type="file" id="ms-pdf" accept=".pdf" class="hidden" onchange="handleFile(this, 'ms-label', 'ms')"></div>
                        <div><label for="syllabus-pdf" id="syllabus-label" class="file-input-label file-optional flex flex-col items-center justify-center p-6 rounded-2xl h-32 text-center text-[10px] font-black uppercase tracking-widest border-2 border-zinc-700">📚 Syllabus PDF<br><span class="text-[8px] normal-case font-normal mt-1">Optional — built-in</span></label><input type="file" id="syllabus-pdf" accept=".pdf" class="hidden" onchange="handleFile(this, 'syllabus-label', 'syllabus')"></div>
                        <div><label for="comments-pdf" id="comments-label" class="file-input-label flex flex-col items-center justify-center p-6 rounded-2xl h-32 text-center text-[10px] font-black uppercase tracking-widest border-2 border-zinc-700 bg-zinc-800">💬 Teacher Comments (Optional)</label><input type="file" id="comments-pdf" accept=".pdf" class="hidden" onchange="handleFile(this, 'comments-label', 'comments')"></div>
                    </div>
                    <!-- Action Buttons -->
                    <div class="flex gap-2 justify-center flex-wrap items-center mb-6">
                        <button onclick="exportCSV()" class="text-xs bg-zinc-800 px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition">📊 Export CSV</button>
                        <button onclick="exportJSON()" class="text-xs bg-zinc-800 px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition">📋 Export JSON</button>
                        <button onclick="exportEditableHTML()" class="text-xs bg-emerald-700 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-800 transition font-bold">📝 Editable HTML</button>
                        <div class="flex items-center gap-1 flex-wrap"><select id="report-unit-filter" class="text-xs border border-zinc-700 rounded-lg px-2 py-1.5 bg-black text-white"><option value="all">All Questions</option><option value="Core">🔵 Core</option><option value="Extended">🟠 Extended</option></select><button onclick="printReport('exam')" class="text-xs bg-zinc-800 px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition">🖨️ Print Exam</button><button onclick="printReport('topic')" class="text-xs bg-zinc-800 px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition">🖨️ Print Topic</button><button onclick="downloadTextPDF('exam')" class="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition">📄 PDF Exam</button><button onclick="downloadTextPDF('topic')" class="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition">📄 PDF Topic</button><button onclick="printStudentReport('exam')" class="text-xs bg-indigo-900 text-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-800 transition">🎓 Report (Exam)</button><button onclick="printStudentReport('topic')" class="text-xs bg-violet-900 text-violet-200 px-3 py-1.5 rounded-lg hover:bg-violet-800 transition">🎓 Report (Topic)</button></div>
                    </div>
                    <button onclick="analyzeDocuments()" id="analyze-btn" class="w-full btn-primary font-black py-5 rounded-2xl uppercase tracking-widest shadow-xl disabled:opacity-50" disabled>Generate Analysis (Upload Syllabus First)</button>
                    <!-- Results Area -->
                    <div id="results-area" class="mt-16 hidden">
                        <div id="stats-dashboard" class="grid grid-cols-4 gap-4 mb-6"></div>
                        <div id="quick-study-guide" class="bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-sm mb-6"><h4 class="text-xs font-bold uppercase mb-3">📋 Quick Study Guide</h4><div class="grid grid-cols-3 gap-3 text-center"><div class="bg-blue-950 p-2 rounded"><div class="text-lg font-bold text-blue-400" id="core-count">0</div><div class="text-[10px]">Core Questions</div><div class="text-[8px] text-slate-500">Must Study</div></div><div class="bg-orange-950 p-2 rounded"><div class="text-lg font-bold text-orange-400" id="extended-count">0</div><div class="text-[10px]">Extended Questions</div><div class="text-[8px] text-slate-500">Paper 4 Only</div></div><div class="bg-red-950 p-2 rounded"><div class="text-lg font-bold text-red-400" id="removed-count">0</div><div class="text-[10px]">Removed Content</div><div class="text-[8px] text-slate-500">Ignore</div></div></div></div>
                        <div id="heatmap" class="bg-zinc-900 p-4 rounded-xl mb-6 hidden"><h4 class="text-xs font-bold uppercase mb-3">Difficulty Heatmap by Topic</h4><div id="heatmap-grid" class="grid grid-cols-5 gap-2"></div></div>
                        <div id="recommendations" class="bg-purple-950 p-4 rounded-xl mb-6 hidden"><h4 class="text-xs font-bold uppercase mb-2 flex items-center gap-2">🎯 Smart Recommendations</h4><div id="recommendations-content" class="text-sm"></div></div>
                        <div class="bg-zinc-900 p-4 rounded-xl mb-6"><div class="flex gap-3 items-center flex-wrap"><div class="flex-1"><input type="text" id="search-questions" placeholder="🔍 Search questions..." class="w-full p-2 border border-zinc-700 rounded-lg text-sm bg-black text-white" oninput="filterQuestions()"></div><select id="filter-type" class="text-sm p-2 border border-zinc-700 rounded-lg bg-black text-white" onchange="filterQuestions()"><option value="all">All Questions</option><option value="Core">Core Only</option><option value="Extended">Extended Only</option></select><select id="filter-status" class="text-sm p-2 border border-zinc-700 rounded-lg bg-black text-white" onchange="filterQuestions()"><option value="all">All Status</option><option value="removed">🟥 Removed</option><option value="current">✅ Current</option></select><select id="filter-difficulty" class="text-sm p-2 border border-zinc-700 rounded-lg bg-black text-white" onchange="filterQuestions()"><option value="all">All Difficulties</option><option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option></select></div></div>
                        <div id="summary-section" class="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-sm mb-12"><div class="flex justify-between items-center mb-6 flex-wrap gap-3"><h2 class="text-xl font-black text-slate-100" id="summary-heading">Summary by Topic</h2><div class="flex gap-2 items-center"><span class="text-xs text-slate-500 font-semibold uppercase tracking-wide">Sort:</span><button id="sort-exam-btn" onclick="setSummarySort('exam')" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-orange-600 text-white transition">📋 Exam Order</button><button id="sort-topic-btn" onclick="setSummarySort('topic')" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-zinc-800 text-slate-300 hover:bg-orange-600 transition">📚 Topic Order</button></div></div><div class="overflow-hidden rounded-xl border border-zinc-800"><table class="w-full summary-table"><thead><tr><th>Topic</th><th class="min-w-[250px]">Sub-Questions</th><th>Total Marks</th><th>Weighting</th><th>Type</th><th>Status</th></tr></thead><tbody id="summary-body"></tbody></table></div></div>
                        <div id="loading" class="text-center p-20 bg-zinc-900 rounded-3xl border border-zinc-800 mb-10 hidden"><div class="animate-spin inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mb-6"></div><p id="loading-text" class="text-orange-400 font-black uppercase text-xs tracking-widest">Processing with Gemini...</p></div>
                        <div id="restore-banner" style="display:none" class="mb-4 p-3 bg-blue-950 border border-blue-800 rounded-xl flex justify-between items-center"><span class="text-xs text-blue-300">📂 Restored your last session's edits</span><button onclick="clearRestoredSession()" class="text-xs text-blue-400 hover:text-blue-300 underline">Clear</button></div>
                        <div id="analysis-container" class="space-y-8"></div>
                    </div>
                </div>
                <!-- IGCSE Processor Modals -->
                <div id="custom-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 opacity-0 pointer-events-none"><div class="bg-zinc-900 p-6 rounded-xl shadow-2xl w-full max-w-sm"><h3 id="modal-title" class="text-xl font-bold text-white mb-4"></h3><p id="modal-message" class="text-slate-300 mb-6 whitespace-pre-line"></p><button onclick="closeModal()" class="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg">OK</button></div></div>
                <!-- REVIEW MODAL with proper text colors -->
                <div id="review-modal" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center" style="display:none">
                    <div class="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[85vh] flex flex-col">
                        <div class="px-6 py-4 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center">
                            <div>
                                <h2 class="font-black text-lg text-slate-900 dark:text-white">🔍 Review Classifications</h2>
                                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Edit before locking — changes here override Gemini's output</p>
                            </div>
                            <span id="review-subject-badge" class="text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-3 py-1 rounded-full font-bold"></span>
                        </div>
                        <div class="overflow-y-auto flex-1 px-6 py-4">
                            <table class="w-full text-xs border-collapse">
                                <thead>
                                    <tr class="bg-slate-50 dark:bg-zinc-800 text-left">
                                        <th class="px-3 py-2 font-bold text-slate-600 dark:text-slate-300 w-20">Q ID</th>
                                        <th class="px-3 py-2 font-bold text-slate-600 dark:text-slate-300">Question Preview</th>
                                        <th class="px-3 py-2 font-bold text-slate-600 dark:text-slate-300 w-28">Topic</th>
                                        <th class="px-3 py-2 font-bold text-slate-600 dark:text-slate-300 w-36">Type</th>
                                        <th class="px-3 py-2 font-bold text-slate-600 dark:text-slate-300 w-14">Marks</th>
                                    </tr>
                                </thead>
                                <tbody id="review-table-body" class="text-slate-700 dark:text-slate-300"></tbody>
                            </table>
                        </div>
                        <div class="px-6 py-4 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-center">
                            <div class="text-xs text-slate-500 dark:text-slate-400">
                                <span id="review-core-count" class="text-blue-600 dark:text-blue-400 font-bold"></span>
                                <span id="review-ext-count" class="text-orange-600 dark:text-orange-400 font-bold ml-3"></span>
                                <span id="review-mixed-count" class="text-purple-600 dark:text-purple-400 font-bold ml-3"></span>
                            </div>
                            <div class="flex gap-3">
                                <button onclick="closeReviewModal()" class="text-xs px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300">Cancel</button>
                                <button onclick="confirmReviewAndAnalyse()" class="text-xs px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold">✅ Confirm & Analyse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- Scripts -->
    <script src="js/globals.js"></script>
    <script src="js/syllabus.js"></script>
    <script src="js/api.js"></script>
    <script src="js/extract.js"></script>
    <script src="js/analysis.js"></script>
    <script src="js/export.js"></script>
    <script src="js/ui.js"></script>
    <script src="js/init.js"></script>
    <script src="js/biohub.js"></script>
</body>
</html>
````

## File: README.md
````markdown
# IGCSE-BioAnalysis
````
