function showDetail() {
    const currentDate = new Date().toLocaleDateString();

    // IDs se values fetch karo
    const audio = document.getElementById("Sudio");
    const img = document.getElementById("Fimg");
    const title = document.getElementById("vfytitle");

    // Audio URL se YouTube video ID extract karo
    let videoId = "";
    const audioUrl = audio?.currentSrc || audio?.src || "";
    if(audioUrl.includes("youtube") || audioUrl.includes("youtu.be")) {
        if(audioUrl.includes("youtu.be")) {
            videoId = audioUrl.split("/").pop().split("?")[0];
        } else if(audioUrl.includes("v=")) {
            const params = new URLSearchParams(audioUrl.split("?")[1]);
            videoId = params.get("v") || "";
        }
    }

    const fullYoutubeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : audioUrl;

    const lines = [
        `<div style="display:flex; align-items:center; gap:10px;">
            <img src="${img?.src || ''}" alt="Thumbnail" style="width:60px; height:60px; border-radius:8px; object-fit:cover;">
            <div>
                <b>${title?.innerText || 'Vivekfy Har Dil Ki Dhadkan'}</b><br>
                <small>${fullYoutubeUrl}</small>
            </div>
        </div>`,
        `<span class="dot">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
        </span>
        <span class="highlight">Vivek masona</span>`,
        `App-Version: <b>2.0</b>`,
        `Server: <b>VIVEKFY</b>`,
        `Search-API: <b>3 Apis</b>`,
        `Audio-API:<b>6 Apis</b>`,
        `Date: <b>${currentDate}</b>`
    ];

    const alertBox = document.getElementById('customAlert');
    alertBox.innerHTML = '';

    // JS me hi CSS
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.background = '#111';
    alertBox.style.color = '#fff';
    alertBox.style.padding = '20px';
    alertBox.style.borderRadius = '12px';
    alertBox.style.boxShadow = '0 0 15px rgba(0,0,0,0.6)';
    alertBox.style.zIndex = '9999';
    alertBox.style.minWidth = '250px';
    alertBox.style.display = 'block';

    lines.forEach((line, index) => {
        const div = document.createElement('div');
        div.className = 'line';
        div.innerHTML = line;
        div.style.animationDelay = `${index * 0.4}s`;
        div.style.animationName = 'zoomIn';
        div.style.animationDuration = '0.5s';
        div.style.marginBottom = '8px';
        alertBox.appendChild(div);
    });

    // JS me animation CSS
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes zoomIn {
        0% { transform: scale(0); opacity:0; }
        100% { transform: scale(1); opacity:1; }
    }
    .line { font-family:Arial,sans-serif; font-size:14px; display:flex; align-items:center; gap:5px; }
    .dot { display:inline-flex; align-items:center; justify-content:center; }
    .highlight { color:#ff0; font-weight:bold; }
    svg { display:inline-block; vertical-align:middle; }
    `;
    document.head.appendChild(style);

    // Auto-hide after 4 seconds
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 4000);
}

