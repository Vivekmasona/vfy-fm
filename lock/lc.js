/* ---------------- OPTIMIZED TIMER & TOGGLE LOGIC ---------------- */

function resetOverlayTimer(e) {
    if (e && e.type === "scroll") return;
    if (overlayTimer) clearTimeout(overlayTimer);
    
    // CORRECTION: Agar modeToggleBtn CHECKED hai (Yani Feature ON hai), tabhi 12s baad lockscreen dikhao
    if (audioPlayer && !audioPlayer.paused && modeToggleBtn && modeToggleBtn.checked) {
        overlayTimer = setTimeout(showOverlay, 12000); 
    }
}

/* -------- MODE TOGGLE HANDLER -------- */
function toggleFooterVisibility(hide) {
    const action = hide ? 'add' : 'remove';
    if(footer) footer.classList[action]("hide");
    if(progressBar) progressBar.classList[action]("hide");
    if(audioPlayerContainer) audioPlayerContainer.classList[action]("hide");
}

if(modeToggleBtn) {
    modeToggleBtn.addEventListener("change", () => {
        if (!modeToggleBtn.checked) {
            // Agar user ne setting OFF kar di, to chalta hua overlay turant chhupao aur timer clear karo
            hideOverlay();
            if (overlayTimer) clearTimeout(overlayTimer);
            toggleFooterVisibility(false); // Footer visible rakho hamesha
        } else {
            // Agar user ne setting ON ki, to fresh timer chalu karo
            resetOverlayTimer();
        }
    });
}
