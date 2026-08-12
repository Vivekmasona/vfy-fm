// --- AUTO HIDE CONTROLS (INJECTED SEPARATE BLOCK) ---
(function initAutoHide() {
    // Wait for the player to initialize in DOM
    const $player = $(".yt-mini-player");
    if ($player.length === 0) {
        setTimeout(initAutoHide, 1000);
        return;
    }

    // 1. CSS Injection (Controls me smooth transition add karne ke liye)
    $("head").append(`
        <style>
            .mini-control-bar, .photo-bottom-panel { 
                transition: opacity 0.5s ease-in-out !important; 
            }
        </style>
    `);

    let hideTimer = null;

    const fadeOutControls = () => {
        // Sirf wahi panel hide hoga jo currently visible hai
        $(".mini-control-bar, .photo-bottom-panel").css("opacity", "0");
    };

    const fadeInControls = () => {
        // Controls dikhao
        $(".mini-control-bar, .photo-bottom-panel").css("opacity", "1");
        
        // Timer restart karo
        clearTimeout(hideTimer);
        hideTimer = setTimeout(fadeOutControls, 2500); // 2.5 seconds baad hide
    };

    // 2. Events: Mouse move ya Touch hone par controls dikhayein
    $player.on("mousemove touchstart click", function(e) {
        // Agar click button pe hai to bubbling rokein
        if($(e.target).is("button, input, i")) return;
        
        fadeInControls();
    });

    // Initial trigger
    fadeInControls();
    
    console.log("Auto-Hide Feature Active");
})();
