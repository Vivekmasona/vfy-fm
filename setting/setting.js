
    function openPopup() {
        document.getElementById("popup").classList.add("active");
    }

    function closePopup() {
        document.getElementById("popup").classList.remove("active");
    }

    function saveSelection(value) {
        localStorage.setItem("apiSelection", value);
    }

    function loadSelection() {
        let savedValue = localStorage.getItem("apiSelection");
        if (savedValue) {
            let radio = document.querySelector(`input[value="${savedValue}"]`);
            if (radio) {
                radio.checked = true;
            }
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadSelection();
        document.querySelectorAll('input[name="apiSelection"]').forEach((radio) => {
            radio.addEventListener("change", (event) => {
                saveSelection(event.target.value);
            });
        });
    });


/* ⚙️ Toggle Popup */
document.getElementById("settingsBtn").addEventListener("click", () => {
  const box = document.getElementById("settingsBox");
  box.style.display = box.style.display === "flex" ? "none" : "flex";

  // input pre-fill with saved query
  const saved = localStorage.getItem("songQuery");
  if (saved) document.getElementById("songQuery").value = saved;
});

/* 💾 Save Preference */
function savePreference() {
  const input = document.getElementById("songQuery").value.trim();
  if (input) {
    localStorage.setItem("songQuery", input);
    loadTrendingSongs(); // reload trending with new query
    document.getElementById("settingsBox").style.display = "none";
  }
}


