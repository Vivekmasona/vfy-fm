/**
 * AMOLED Lockscreen Controller Widget Extensions
 * (Plugs into existing visualizer engine without modifying old source code)
 */
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("modeToggleBtn");
    
    if (!toggleBtn) return;

    // 1. Initial State Sync: Pehle se check karein ki user kya chahta hai
    // Purane code ke toggle logic ko instantly invert karne ke liye switch state check:
    function enforceUserPreference() {
        if (!toggleBtn.checked) {
            // Agar toggle unchecked (OFF) hai, to purani script ko overlay dikhane se rokein
            if (typeof hideOverlay === "function") {
                hideOverlay();
            }
            if (typeof overlayTimer !== "undefined") {
                clearTimeout(overlayTimer);
            }
        }
    }

    // 2. Intercept Event Listeners: Jab user switch badle
    toggleBtn.addEventListener("change", () => {
        enforceUserPreference();
        
        // Agar user ne ON kiya hai, to purane timer ko manual call dekar reactive kar dein
        if (toggleBtn.checked && typeof resetOverlayTimer === "function") {
            resetOverlayTimer();
        }
    });

    // 3. Automation Shield: Purane dynamic events ko overwrite kiye bina hijack karna
    // Purana script har user action par resetOverlayTimer chalta hai, use hum monitor karenge
    const originalResetTimer = window.resetOverlayTimer;
    if (typeof originalResetTimer === 'function') {
        window.resetOverlayTimer = function(e) {
            // Agar toggle button unchecked (OFF) hai, to purane timer ko aage badhne hi mat do
            if (toggleBtn && !toggleBtn.checked) {
                if (typeof overlayTimer !== "undefined") clearTimeout(overlayTimer);
                return; 
            }
            // Agar toggle ON hai, to normal chalne do
            return originalResetTimer.apply(this, arguments);
        };
    }
    
    // Run once on load
    setTimeout(enforceUserPreference, 100);
});

