
  function speakSearchText() {
    const searchInput = document.getElementById('search-basic');
    let searchText = searchInput.value.toLowerCase();

    // List of words to remove from the input
    const wordsToRemove = ['start', 'start karo', 'play karo', 'bajao', 'play', 'chalu karo', 'sunao', 'chalao', 'lagao'];

    // Remove specified words from the input
    wordsToRemove.forEach(word => {
      searchText = searchText.replace(word, '').trim();
    });

    // Proceed with custom TTS
    speakWithAudio(searchText);
  }

  function speakWithAudio(textToSpeak) {
    if (!textToSpeak) return;

    const ttsUrl = `https://apple-puddle-cattle.glitch.me/tts?text=${encodeURIComponent(textToSpeak)}`;
    const audio = new Audio(ttsUrl);

    audio.volume = 1;

    audio.onended = function () {
      // After TTS finishes, play result audio
      const resultAudio = new Audio('/sound/result.mp3');
      resultAudio.play();
    };

    audio.onerror = function () {
      console.log('Failed to load TTS audio.');
    };

    audio.play();
  }
