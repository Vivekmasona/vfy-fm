const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const SIZE_LIMIT = 200 * 1024; // 200KB
let countdownInterval = null; // prevent multiple intervals

// ---- Storage Clear Function (Preserve sessionId) ----
function clearLocalStorage(purpose="") {
    const sessionId = localStorage.getItem("sessionId");
    localStorage.clear();
    if (sessionId) localStorage.setItem("sessionId", sessionId);
    localStorage.setItem("lastClearTime", Date.now());
    console.log("localStorage cleared ("+purpose+"), sessionId preserved.");
}

// ---- Size Calculator ----
function getLocalStorageSize() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        total += key.length + value.length;
    }
    return total;
}

// ---- Daily & Size-based Clear ----
function checkAndClearLocalStorage() {
    const lastClear = parseInt(localStorage.getItem("lastClearTime")) || 0;
    const now = Date.now();

    if (now - lastClear > TWENTY_FOUR_HOURS) {
        clearLocalStorage("24h auto");
    }

    const size = getLocalStorageSize();
    if (size > SIZE_LIMIT) {
        clearLocalStorage("200KB limit");
    }
}

// ---- Show full localStorage JSON in div ----
function updateLocalStorageDiv() {
    const div = document.getElementById("localStorageJSONDiv");
    if (div) {
        const storageObj = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            try {
                storageObj[key] = JSON.parse(localStorage.getItem(key));
            } catch(e) {
                storageObj[key] = localStorage.getItem(key);
            }
        }
        div.textContent = JSON.stringify(storageObj, null, 2);
    }
}

// ---- Countdown Timer ----
function startCountdown() {
    const countdownDiv = document.getElementById("jsonPopupCountdown");
    const sizeDiv = document.getElementById("jsonPopupSize");

    function updateCountdown() {
        const lastClear = parseInt(localStorage.getItem("lastClearTime")) || 0;
        const now = Date.now();
        const remaining = TWENTY_FOUR_HOURS - (now - lastClear);

        if(remaining <= 0){
            countdownDiv.textContent = "Clearing localStorage soon...";
        } else {
            const hrs = Math.floor(remaining / (1000*60*60));
            const mins = Math.floor((remaining % (1000*60*60)) / (1000*60));
            const secs = Math.floor((remaining % (1000*60)) / 1000);
            countdownDiv.textContent = `Next Clear In: ${hrs}h ${mins}m ${secs}s`;
        }

        const sizeKB = (getLocalStorageSize() / 1024).toFixed(2);
        sizeDiv.textContent = `Current Storage Size: ${sizeKB} KB`;
    }

    updateCountdown();
    if (countdownInterval) clearInterval(countdownInterval); // stop old interval
    countdownInterval = setInterval(updateCountdown, 1000);
}

// ---- Popup Open/Close Logic ----
const popup = document.getElementById("jsonPopup");
document.getElementById("openJsonPopup").addEventListener("click", () => {
    popup.style.display = "flex";
    updateLocalStorageDiv();
    startCountdown();
});
document.getElementById("closeJsonPopup").addEventListener("click", () => {
    popup.style.display = "none";
    if (countdownInterval) clearInterval(countdownInterval); // stop timer when closed
});

// ---- Manual Clear Button ----
document.getElementById("manualClearBtn").addEventListener("click", () => {
    clearLocalStorage("manual button");
    updateLocalStorageDiv();
});
