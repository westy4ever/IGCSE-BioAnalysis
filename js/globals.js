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