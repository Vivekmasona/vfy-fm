$(document).ready(function() {
    // 1. CSS ko force inject karo, ye inline styles ko override kar dega
    $("<style>").text(`
        .vfy-controls-hide { opacity: 0 !important; visibility: hidden !important; transition: opacity 0.5s ease !important; }
        .vfy-controls-show { opacity: 1 !important; visibility: visible !important; transition: opacity 0.3s ease !important; }
    `).appendTo("head");

    let inactivityTimer;

    // 2. Event Delegation (Ye har baar kaam karega, player dynamic ho tab bhi)
    $(document).on("mousemove touchstart", ".yt-mini-player", function(e) {
        
        // Agar Music Mode (Round) hai, to kuch mat karo
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === true) {
            $('.photo-bottom-panel').removeClass('vfy-controls-hide').addClass('vfy-show-ui');
            return;
        }

        // Agar Video Mode hai:
        const $panel = $('.photo-bottom-panel');
        
        // Controls dikhao
        $panel.removeClass('vfy-controls-hide').addClass('vfy-controls-show');
        
        // Timer restart karo
        clearTimeout(inactivityTimer);
        
        inactivityTimer = setTimeout(function() {
            $panel.addClass('vfy-controls-hide').removeClass('vfy-controls-show');
        }, 2000); // 2 seconds delay
    });

    // 3. Player se mouse bahar jane par turant hide
    $(document).on("mouseleave", ".yt-mini-player", function() {
        if (typeof isRoundMusicMode !== 'undefined' && isRoundMusicMode === false) {
            $('.photo-bottom-panel').addClass('vfy-controls-hide').removeClass('vfy-controls-show');
        }
    });
});
