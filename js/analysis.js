// ================================================================
// CORE ANALYSIS & RENDERING (with full model answer and mark scheme)
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

- model: string — Write a comprehensive model answer derived STRICTLY from the mark scheme and Cambridge 0610 syllabus. Include EVERY relevant biological point from the mark scheme AND every related point from the syllabus for this subtopic. Use **bold** for key biological terms. If the question involves calculation, write numbered steps (e.g., "Step 1: ... Step 2: ...") using the format **Step 1:**, etc.

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

        // ========== Only keep leaf sub-questions (those with marks > 0) ==========
        let leafResults = results.filter(q => {
            const hasMarks = q.marks && parseInt(q.marks) > 0;
            const hasText = q.text && q.text.trim().length > 0;
            return hasMarks && hasText;
        });

        // Apply locked classifications from review modal
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

function renderSummary(data, paperCode) {
    const activeData = data.filter(q => q.syllabusStatus !== 'removed');
    const stats = {};
    const keyOrder = [];
    let totalMarks = 0;

    activeData.forEach(q => {
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
            const pc = q.type === 'Core' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700';
            return '<span class="inline-block ' + pc + ' text-[9px] font-bold px-1.5 py-0.5 rounded mr-0.5 mb-0.5">'
                + paperPrefix + 'Q' + q.qID + '</span>';
        }).join('');
    }

    function buildTypePills(types) {
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
            const hasRemoved = tm.statuses.includes('removed');
            const statusBadge = hasRemoved ? '<span class="badge-removed">⚠️ Removed</span>' : '<span class="badge-current">✅</span>';
            return '<tr><td class="align-top">' + topicLabel + '</td>'
                + '<td class="sub-questions-cell">' + buildPills(tm.questions) + '</td>'
                + '<td class="font-bold text-center">' + tm.marks + '</td>'
                + '<td class="text-center">' + pct + '%</td>'
                + '<td class="text-center">' + buildTypePills(tm.types) + '</td>'
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
            const hasRemoved = st.statuses.includes('removed');
            const statusBadge = hasRemoved ? '<span class="badge-removed">⚠️ Removed</span>' : '<span class="badge-current">✅</span>';
            return '<tr><td class="align-top">' + topicLabel + '</td>'
                + '<td class="sub-questions-cell">' + buildPills(st.questions) + '</td>'
                + '<td class="font-bold text-center">' + st.marks + '</td>'
                + '<td class="text-center">' + pct + '%</td>'
                + '<td class="text-center">' + buildTypePills(st.types) + '</td>'
                + '<td class="text-center">' + statusBadge + '</td>'
                + '</tr>';
        }).join('');
    }
}

// ========== CARD RENDERING WITH FULL MODEL ANSWER (step‑by‑step, bold, numbered steps) ==========
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
        
        // Fix duplicate sub-question label
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
            drows.forEach((l,ri)=>{const cells=pc(l);tbl+='<tr>';cells.forEach(cell=>{const tag=ri===0?'th':'td';const sty=ri===0?'background:#1e293b;color:white;padding:4px 10px;font-weight:700;font-size:10px;border:1px solid #334155':'padding:4px 10px;border:1px solid #cbd5e1;font-size:11px;background:white';tbl+=`<${tag} style="${sty}">${cell||'&nbsp;'}</${tag}>`;});tbl+='<tr>';});
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