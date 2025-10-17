// Inject CSS for loading effect
(function() {
  const style = document.createElement("style");
  style.textContent = `
    .loading-dots {
      display: inline-block;
      font-size: 24px;
    }
    .loading-dots span {
      animation: blink 1.4s infinite both;
      margin: 0 3px;
      color: #555;
    }
    .loading-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    .loading-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    @keyframes blink {
      0%, 80%, 100% { opacity: 0; }
      40% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
})();

// Error sound play
function playErrorSound() {
  try {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.play();
  } catch (e) {
    console.warn("Cannot play sound:", e);
  }
}

// Block pattern
const blockedPattern = /(tuntun|tutun|tun|टुन|टुनटुन)/i;

// Fallback fetch logic
async function fetchResultsWithFallback(q) {
  // First API
  const url1 = `https://vivekmasona-denocall-61.deno.dev/search?q=${encodeURIComponent(q)}`;
  try {
    const resp1 = await fetch(url1);
    if (resp1.ok) {
      const d1 = await resp1.json();
      if (d1.items && d1.items.length > 0) return d1.items;
    }
  } catch (_) {
    // ignore
  }
  // Fallback
  const url2 = `https://self-lac.vercel.app/v3-api1?q=${encodeURIComponent(q)}`;
  try {
    const resp2 = await fetch(url2);
    if (resp2.ok) {
      const d2 = await resp2.json();
      if (d2.items && d2.items.length > 0) return d2.items;
    }
  } catch (_) {
    // ignore
  }
  return [];
}

// Automatic search as user types
let typingTimer = null;
const TYPING_DELAY = 500; // half second delay after typing stops

function handleAutoSearch() {
  const input = document.getElementById("search-basic");
  if (!input) return;
  const q = input.value;
  if (!q) {
    // maybe clear songs
    const hc = document.getElementById("homepage-content");
    if (hc) hc.innerHTML = "";
    return;
  }

  // Block check
  if (blockedPattern.test(q.toLowerCase())) {
    playErrorSound();
    input.value = "";
    const hc = document.getElementById("homepage-content");
    if (hc) hc.innerHTML = "<p style='color:red;'>⚠️ This query is blocked.</p>";
    return;
  }

  // Show loading
  const hc = document.getElementById("homepage-content");
  if (hc) {
    hc.innerHTML = `<div class="loading-dots"><span>.</span><span>.</span><span>.</span></div>`;
  }

  fetchResultsWithFallback(q).then(items => {
    if (!items || items.length === 0) {
      if (hc) hc.innerHTML = "<p>No results found.</p>";
      return;
    }
    // Use your existing rendering logic
    // assuming you have fetchResults-style code or getOutput(), etc.
    if (hc) hc.innerHTML = "";
    items.forEach((item, i) => {
      const out = getOutput(item, i);
      if (out) hc.innerHTML += out;
    });
  });
}

// Listen to input events
const searchInput = document.getElementById("search-basic");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(handleAutoSearch, TYPING_DELAY);
  });
  // Optional: immediate on Enter too
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      clearTimeout(typingTimer);
      handleAutoSearch();
    }
  });
                             }
