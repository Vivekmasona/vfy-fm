<script>
  // Page load hote hi sid check karo
  window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get("sid");

    if (sid) {
      // LocalStorage me save karo
      localStorage.setItem("sessionId", sid);
      console.log("Session ID saved:", sid);

      // Agar chaho to user ko notify kar do
      alert("Session joined successfully! Session ID saved: " + sid);

      // Clean URL (sid remove karke)
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  });
</script>
