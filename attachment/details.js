
  function showDetail() {
    const currentDate = new Date().toLocaleDateString();
    const lines = [
      `<span class="dot"></span><span class="highlight"> VIVEK</span>`,
      `App-Version: <b>2.0</b>`,
      `Server: <b>vivekfy</b>`,
      `API: <b>2</b> (vfy, 1 YouTube)`,
      `Backend API: <b>6 APIs</b> for songs`,
      `Date: <b>${currentDate}</b>`
    ];

    const alertBox = document.getElementById('customAlert');
    alertBox.innerHTML = '';

    lines.forEach((line, index) => {
      const div = document.createElement('div');
      div.className = 'line';
      div.innerHTML = line;
      div.style.animationDelay = `${index * 0.4}s`;
      div.style.animationName = 'zoomIn';
      alertBox.appendChild(div);
    });

    alertBox.style.display = 'block';

    // Auto-hide after 4 seconds
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 4000);
  }
