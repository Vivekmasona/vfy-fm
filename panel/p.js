const openPopupBtn = document.getElementById('openPopupBtn');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const submitPasswordBtn = document.getElementById('submitPasswordBtn');
    const passwordInput = document.getElementById('passwordInput');
    const popupContent = document.getElementById('popupContent');
    const popupHeader = document.getElementById('popupHeader');
    const popupBody = document.getElementById('popupBody');

    const correctPassword = 'vivekmasona'; // Set the desired password

    openPopupBtn.addEventListener('click', () => {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
        popupContent.style.display = 'none';
    });

    submitPasswordBtn.addEventListener('click', () => {
        if (passwordInput.value === correctPassword) {
            popupContent.style.display = 'block';
            popupHeader.style.display = 'none';
            popupBody.style.display = 'none';
            popupContent.style.height = '100%'; // Ensure the iframe takes full height
        } else {
            alert('Incorrect password!');
        }
    });
