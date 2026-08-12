// === PERFECT AUTO-HIDE FIX FOR VIDEO MODE ===
(function() {
    // 1. Pure controls overlay ke liye custom CSS inject karein
    $("<style>")
        .text(`
            /* Smooth fade animation for bottom controls panel */
            .photo-bottom-panel {
                transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out !important;
            }
            /* Hidden State Class */
            .vfy-controls-hidden {
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
        `)
        .appendTo("head");

    let videoTimer = null;

    function resetVideoTimer() {
        const $panel = $(".photo-bottom-panel");
        
        // Controls ko wapas dikhao
        $panel.removeClass("vfy-controls-hidden");
        
        clearTimeout(videoTimer);

        // Sirf Rectangle Video Mode me hi hide timer chalega
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
            videoTimer = setTimeout(function() {
                // Check karo ki video chal raha hai ya nahi
                if (typeof ytPlayer !== 'undefined' && ytPlayer && ytPlayer.getPlayerState) {
                    if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                        $panel.addClass("vfy-controls-hidden");
                    }
                } else {
                    $panel.addClass("vfy-controls-hidden");
                }
            }, 2500); // 2.5 seconds timeout
        }
    }

    // 2. Continuous Event Listeners (Touch, Mouse Move, Click Sab Par Kam Karega)
    $(document).on("mousemove touchstart touchmove click", ".yt-mini-player", function(e) {
        resetVideoTimer();
    });

    // 3. Pause hone par controls hamesha dikhne chahiye
    setInterval(function() {
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
            if (typeof ytPlayer !== 'undefined' && ytPlayer && ytPlayer.getPlayerState) {
                if (ytPlayer.getPlayerState() === YT.PlayerState.PAUSED) {
                    $(".photo-bottom-panel").removeClass("vfy-controls-hidden");
                    clearTimeout(videoTimer);
                }
            }
        }
    }, 500);

})();
