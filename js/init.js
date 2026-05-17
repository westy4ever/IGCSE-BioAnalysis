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