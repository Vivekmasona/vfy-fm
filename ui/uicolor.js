
function getAverageColor(imgEl) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = imgEl.naturalWidth;
  canvas.height = imgEl.naturalHeight;
  ctx.drawImage(imgEl, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    r += imageData.data[i];
    g += imageData.data[i + 1];
    b += imageData.data[i + 2];
    count++;
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  return `rgb(${r}, ${g}, ${b})`;
}

const Fimg = document.getElementById("Fimg");
if (Fimg) {
  Fimg.addEventListener("load", () => {
    const avgColor = getAverageColor(Fimg);
    document.documentElement.style.setProperty("--ui-color", avgColor);
  });
}
