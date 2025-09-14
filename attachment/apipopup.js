
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

