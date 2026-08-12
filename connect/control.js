// --- ROBUST AUTO-HIDE (Works even if script loads early) ---
(function() {
    let hideTimer;

    function activateAutoHide() {
        const $player = $(".yt-mini-player");
        const $panel = $(".photo-bottom-panel");

        if ($player.length === 0 || $panel.length === 0) return;

        // 1. Controls dikhane ka function
        function showControls() {
            // Sirf Video mode me (Rectangular)
            if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
                $panel.css({ 'opacity': '1', 'visibility': 'visible', 'transition': 'opacity 0.3s' });
                clearTimeout(hideTimer);
                
                // 2 second ka timer
                hideTimer = setTimeout(function() {
                    hideControls();
                }, 2000);
            }
        }

        // 2. Controls hide karne ka function
        function hideControls() {
            if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
                $panel.css({ 'opacity': '0', 'visibility': 'hidden' });
            }
        }

        // Events: Touch ya Mouse move hone par show karein
        $player.off('mousemove touchstart').on('mousemove touchstart', function() {
            showControls();
        });

        // Mode switch hone par bhi check karein
        $("#mini-mode-toggle, #photo-mode-toggle").off('click').on('click', function() {
             setTimeout(function() {
                 if (isRoundMusicMode === false) {
                     showControls();
                 } else {
                     // Music mode me hamesha dikhayein
                     $panel.css({ 'opacity': '1', 'visibility': 'visible' });
                 }
             }, 300);
        });

        // Start timer automatically after page load
        showControls();
    }

    // MutationObserver: Jab player DOM me aayega, tabhi script chalegi
    const observer = new MutationObserver(function(mutations) {
        if ($(".yt-mini-player").length > 0) {
            activateAutoHide();
            observer.disconnect(); // Ek baar chal gaya to band karo
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
