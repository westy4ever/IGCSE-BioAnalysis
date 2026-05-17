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