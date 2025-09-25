const sideMenu = document.getElementById('sideMenu');
let inactivityTimer;

function hideMenu() {
    sideMenu.classList.add('hidden');
}

function showMenu() {
    sideMenu.classList.remove('hidden');
}

function resetTimer() {
    showMenu();
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(hideMenu, 4000); // hide after 4 seconds
}

// Track user activity
['mousemove', 'touchstart', 'keydown', 'scroll'].forEach(evt => {
    document.addEventListener(evt, resetTimer, {passive: true});
});

// Start initial timer
inactivityTimer = setTimeout(hideMenu, 4000);

// Example placeholder functions
function openPopup() { alert('Settings clicked'); }
function startDictation() { alert('Microphone clicked'); }
function showDetail() { alert('Heart clicked'); }
