// --- AUTO HIDE VIDEO CONTROLS ONLY (Updated Logic) ---
(function() {
    // 1. CSS inject karo taaki sirf Video Mode ke controls fade hon
    // Music mode ke controls ko hum touch nahi karenge.
    $("<style>")
        .text(`
            .photo-bottom-panel { transition: opacity 0.5s ease-in-out !important; }
        `)
        .appendTo("head");

    let videoHideTimer = null;

    // 2. Global Event Listener: Har baar mouse/touch chalne par trigger hoga
    $(document).on("mousemove touchstart", ".yt-mini-player", function(e) {
        
        // Agar Music Mode (Round) hai, to kuch mat karo (sab visible rahega)
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === true) {
            $(".mini-control-bar").css("opacity", "1");
            return; 
        }

        // Agar Video Mode (Rectangular) hai, tabhi logic chalega
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
            
            // Controls dikhao
            $(".photo-bottom-panel").css("opacity", "1");
            
            // Purana timer saaf karo
            clearTimeout(videoHideTimer);
            
            // 2.5 seconds baad hide karo
            videoHideTimer = setTimeout(function() {
                // Sirf video wale controls ko fade karo
                $(".photo-bottom-panel").css("opacity", "0");
            }, 2500);
        }
    });

    // 3. Player se cursor bahar jane par turant hide karo
    $(document).on("mouseleave", ".yt-mini-player", function() {
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
            clearTimeout(videoHideTimer);
            $(".photo-bottom-panel").css("opacity", "0");
        }
    });
})();
