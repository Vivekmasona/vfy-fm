// --- AUTO HIDE VIDEO CONTROLS (2-SECOND TIMER) ---
(function() {
    let videoHideTimeout;
    
    // Function to hide controls
    function hideVideoControls() {
        // Sirf tab hide karo agar Video Mode (Rectangular) hai
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
            $('.photo-bottom-panel').css({
                'opacity': '0',
                'transition': 'opacity 0.5s ease',
                'pointer-events': 'none'
            });
        }
    }

    // Function to show controls
    function showVideoControls() {
        // Sirf tab show karo agar Video Mode hai
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
            $('.photo-bottom-panel').css({
                'opacity': '1',
                'pointer-events': 'auto'
            });
            
            // Timer reset karo (2 seconds)
            clearTimeout(videoHideTimeout);
            videoHideTimeout = setTimeout(hideVideoControls, 2000);
        }
    }

    // Event Listeners: Touch aur Click dono par kaam karega
    $(document).on('touchstart mousemove', '.yt-mini-player', function(e) {
        showVideoControls();
    });

    // Initial load ke 2 second baad hide kar do agar video mode hai
    $(document).ready(function() {
        setTimeout(hideVideoControls, 2000);
    });
})();
