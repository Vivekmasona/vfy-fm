// 🎨 Inject CSS (loading dots) via JS
(function() {
  const style = document.createElement("style");
  style.textContent = `
    .loading-dots { display: inline-block; font-size: 24px; }
    .loading-dots span {
      animation: blink 1.4s infinite both;
      margin: 0 3px;
      color: #555;
    }
    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes blink {
      0%, 80%, 100% { opacity: 0; }
      40% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
})();

// Error sound
function playErrorSound() {
  try {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.play();
  } catch (err) {
    console.warn("Cannot play sound:", err);
  }
}

// Block pattern (tun, tuntun, tutun etc, Hindi + English)
const blockedPattern = /(tuntun|tutun|tun|टुन|टुनटुन)/i;

async function fetchResultsWithFallback(q) {
  // First API
  const url1 = `https://vivekmasona-denocall-61.deno.dev/search?q=${encodeURIComponent(q)}`;
  try {
    const resp1 = await fetch(url1);
    if (resp1.ok) {
      const data1 = await resp1.json();
      if (data1.items && data1.items.length > 0) {
        return data1.items;
      }
      // If items empty, fallback
    } else {
      throw new Error("API1 not ok");
    }
  } catch (err1) {
    console.warn("API1 failed:", err1);
  }

  // Fallback API2
  const url2 = `https://self-lac.vercel.app/v3-api1?q=${encodeURIComponent(q)}`;
  try {
    const resp2 = await fetch(url2);
    if (resp2.ok) {
      const data2 = await resp2.json();
      if (data2.items && data2.items.length > 0) {
        return data2.items;
      }
    } else {
      throw new Error("API2 not ok");
    }
  } catch (err2) {
    console.error("API2 failed:", err2);
  }

  // Both failed or no results
  return [];
}

// **यहाँ main search function (तुम्हारी structure जैसा)**
async function search() {
  $("#homepage-content").html("");

  var q = $(".search-bar").val();
  if (!q) {
    console.warn("Search query is empty!");
    return;
  }

  // Block check before making API calls
  const low = q.toLowerCase().trim();
  if (blockedPattern.test(low)) {
    console.warn("Blocked query detected:", q);
    $(".search-bar").val("");
    playErrorSound();
    alert("❌ This search query is not allowed!");
    return;
  }

  // loading effect
  $("#homepage-content").html(`
    <div class="loading-dots"><span>.</span><span>.</span><span>.</span></div>
  `);

  // fetch via fallback function
  const items = await fetchResultsWithFallback(q);

  if (!items || items.length === 0) {
    $("#homepage-content").html("<p>No results found.</p>");
    return;
  }

  // Now same as your fetchResults logic to render items
  nextPageToken = items.nextPageToken || "";
  prevPageToken = items.prevPageToken || "";

  $("#homepage-content").html(""); 
  $.each(items, function (i, item) {
    var output = getOutput(item, i);
    if (output) {
      $("#homepage-content").append(output);
    }
  });

  if (firstSearch && items.length > 0) {
    loadSong($(".list")[0], 0);
    firstSearch = false;
  }

  $("#prev-btn").toggle(!!prevPageToken);
  $("#next-btn").toggle(!!nextPageToken);
}

// pagination function remains same (no change)
function paginate(direction) {
  let selectedAPI = $("input[name='apiSelection']:checked").val();
  let pageToken = direction === "next" ? nextPageToken : prevPageToken;
  if (!pageToken) return;

  let apiUrl;
  if (selectedAPI === "self") {
    apiUrl = `https://self-lac.vercel.app/v3-api?q=${encodeURIComponent(currentQuery)}&pageToken=${pageToken}`;
  } else if (selectedAPI === "self1") {
    apiUrl = `https://self-lac.vercel.app/v3-api1?q=${encodeURIComponent(currentQuery)}&pageToken=${pageToken}`;
  } else if (selectedAPI === "deno") {
    apiUrl = `https://vivekmasona-denocall-61.deno.dev/search?q=${encodeURIComponent(currentQuery)}&pageToken=${pageToken}`;
  } else {
    apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(currentQuery)}&type=video&maxResults=40&pageToken=${pageToken}&key=${youtubeApiKey}`;
  }

  fetchResults(apiUrl);
}
