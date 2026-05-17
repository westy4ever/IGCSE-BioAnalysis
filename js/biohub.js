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