const modalContents = Array.from(
  document.getElementsByClassName("modal-content")
);

const modalBtns = Array.from(document.getElementsByClassName("modal-btn"));

modalBtns.forEach((modalBtn) => {
  const buttonId = modalBtn.getAttribute("data-modal-btn-id");

  modalBtn.addEventListener("click", () => {
    removeAllmodals();
    createmodal(buttonId);
  });
});

function removeAllmodals() {
  let modals = Array.from(document.getElementsByClassName("modal"));

  modals.forEach((modal) => {
    removemodal(modal);
  });
}

function removemodal(modal) {
  document.body.style.overflow = "";
  modal.classList.add("hidden");

  setTimeout(() => {
    if (modal.parentNode) {
      const backdrop = document.getElementsByClassName("modal-backdrop")[0];
      if (backdrop) backdrop.remove();
      document.body.removeChild(modal);
    }
  }, 400);
}

function createmodal(id) {
  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal-backdrop";
  document.body.append(modalBackdrop);

  const modal = document.createElement("div");
  modal.className = "modal hidden";
  document.body.append(modal);
  document.body.style.overflow = "hidden";

  const modalHandle = document.createElement("span");
  modalHandle.classList.add("modal-handle");
  modal.append(modalHandle);

  const modalInner = document.createElement("div");
  const sourceContent = document.querySelector(`[data-modal-id="${id}"]`);
  modalInner.innerHTML = sourceContent ? sourceContent.innerHTML : "";
  modalInner.className = "modal-inner";
  modal.append(modalInner);

  // --- IFRAME DATA-SRC FIX ---
  const iframe = modalInner.querySelector("iframe");
  if (iframe) {
    const dataSrc = iframe.getAttribute("data-src");
    if (dataSrc) {
      iframe.setAttribute("src", dataSrc);
    }
  }

  let lastTop = null;

  function checkmodalTop() {
    const modalTop = modal.getBoundingClientRect().top;

    if (modalTop !== lastTop) {
      modalBackdrop.style.opacity =
        0.7 - modal.getBoundingClientRect().top / window.innerHeight + 0.1;

      lastTop = modalTop;
    }

    requestAnimationFrame(checkmodalTop);
  }

  checkmodalTop();

  setTimeout(() => {
    modal.classList.remove("hidden");
  });

  let isDragging = false;
  let startY = 0;

  // --- YAHAN CHANGE KIYA GAYA HAI: PURE MODAL PAR DRAG ENABLE KAR DIYA ---
  modal.addEventListener("mousedown", (event) => {
    // Agar user iframe ya kisi clickable button par click kare toh drag shuru na ho, 
    // taaki iframe ke andar scroll/click me dikkat na aaye
    if (event.target.tagName === "IFRAME" || event.target.tagName === "BUTTON" || event.target.tagName === "A") {
      return;
    }
    modal.style.transition = "";
    isDragging = true;
    startY = event.clientY;
  });

  modal.addEventListener("touchstart", (event) => {
    if (event.target.tagName === "IFRAME" || event.target.tagName === "BUTTON" || event.target.tagName === "A") {
      return;
    }
    modal.style.transition = "";
    isDragging = true;
    startY = event.touches[0].clientY;
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const pos = event.clientY - 20;
      if (pos >= 32) {
        modal.style.top = pos + "px";
      }
    }
  });

  document.addEventListener("touchmove", (event) => {
    if (isDragging) {
      const pos = event.touches[0].clientY - 20;
      if (pos >= 32) {
        modal.style.top = pos + "px";
      }
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      handlemodalPosition();
    }
  });

  document.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      handlemodalPosition();
    }
  });

  function handlemodalPosition() {
    if (modal.getBoundingClientRect().top <= window.innerHeight / 2) {
      modal.style.transition = "transform 0.4s ease, top 0.4s ease";
      modal.style.top = "2.8rem";
    } else {
      modal.style.transition = "transform 0.4s ease, top 0.4s ease";
      modal.style.top = "100%";
      removemodal(modal);
    }
  }
}
