const audio = document.getElementById('SAudio');
const overlay = document.getElementById('loadingOverlay');
const secondsDisplay = document.getElementById('seconds');
let seconds = 0;
let interval;

function playAudio() {
    overlay.classList.add('active'); // Show overlay
    seconds = 0;
    secondsDisplay.textContent = seconds;

    interval = setInterval(() => {
        seconds++;
        secondsDisplay.textContent = seconds;
    }, 1000);

    audio.load();
    audio.play().then(() => {
        overlay.classList.remove('active'); // Hide overlay
        clearInterval(interval); // Stop counting seconds
    }).catch((error) => {
        console.error('Audio play error:', error);
    });
}

audio.addEventListener('canplaythrough', () => {
    overlay.classList.remove('active'); // Hide when fully loaded
    clearInterval(interval);
});
