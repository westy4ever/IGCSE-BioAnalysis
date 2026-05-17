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