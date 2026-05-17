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