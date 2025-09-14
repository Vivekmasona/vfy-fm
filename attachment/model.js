
    // Function to open the modal
    function openModal() {
        document.getElementById("modal").style.display = "block";
        // Add event listener to close modal on escape key press
        document.addEventListener("keydown", closeModalOnEscape);
        // Slide down animation
        $("#modal").slideDown();
    }

    // Function to close the modal
    function closeModal() {
        // Remove event listener for escape key press
        document.removeEventListener("keydown", closeModalOnEscape);
        // Slide up animation
        $("#modal").slideUp();
        setTimeout(function() {
            document.getElementById("modal").style.display = "none";
        }, 500); // Adjust delay to match animation duration
    }

    // Function to close the modal on escape key press
    function closeModalOnEscape(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    }

    // Trigger openModal when the page loads (you can adjust this based on your requirements)
    window.onload = openModal;
