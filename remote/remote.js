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
      if (backdrop) document.body.removeChild(backdrop);
      document.body.removeChild(modal);
    }
  }, 400);
}

function createmodal(id) {
  const modal = document.createElement("div");
  modal.className = "modal hidden";
  document.body.append(modal);
  document.body.style.overflow = "hidden";

  const modalInner = document.createElement("div");
  modalInner.className = "modal-inner";

  // 🛑 Ye magic hai: Jab button dabega aur modal create hoga, tabhi template/iframe render hoga!
  const template = document.querySelector(`[data-modal-id="${id}"]`);
  if (template) {
    modalInner.innerHTML = template.innerHTML;
    
    // Agar template ke andar iframe hai aur usko lazy load karna hai, 
    // toh aap iframe ka src 'data-src' mein rakh sakte hain aur yaha set kar sakte hain:
    const iframe = modalInner.querySelector("iframe");
    if (iframe && iframe.hasAttribute("data-src")) {
      iframe.src = iframe.getAttribute("data-src");
    }
  }

  modal.append(modalInner);

  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal-backdrop";
  document.body.append(modalBackdrop);

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
  }, 10);

  const modalHandle = document.createElement("span");
  modalHandle.classList.add("modal-handle");
  modal.prepend(modalHandle);

  let isDragging = false;

  modalHandle.addEventListener("mousedown", (event) => {
    event.preventDefault();
    modal.style.transition = "";
    isDragging = true;
  });

  modalHandle.addEventListener("touchstart", (event) => {
    event.preventDefault();
    modal.style.transition = "";
    isDragging = true;
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
