document.addEventListener('DOMContentLoaded', function () {
            const popup = document.getElementById('popupms');
            const popupMessage = document.getElementById('popupMessage');
            const notificationSound = document.getElementById('notificationSound');

            // Function to show a popup notification
            function showPopup(message) {
                popupMessage.textContent = message;
                popup.style.display = 'block';
                setTimeout(() => {
                    popupms.style.display = 'none';
                }, 2000); // Hide after 2 seconds
            }

            // Function to fetch messages from the server and display them
            async function fetchAndDisplayMessages() {
                try {
                    const response = await fetch('https://e88acd8b-7a0f-42e0-b933-504ff9636c62-00-2331m38h2jm4.picard.replit.dev:3000/messages');
                    const data = await response.json();
                    console.log(data); // Log the response from the server

                    // Check if there are new messages and if the latest message is different from the one stored in local storage
                    const latestMessage = data.messages[data.messages.length - 1];
                    const storedMessage = localStorage.getItem('lastMessage');
                    if (latestMessage && latestMessage !== storedMessage) {
                        showPopup(latestMessage); // Show the latest message in the popup
                        notificationSound.play(); // Play the notification sound
                        localStorage.setItem('lastMessage', latestMessage); // Store the latest message in local storage
                    }
                } catch (error) {
                    console.error('Error fetching messages from server:', error);
                }
            }

            // Call the function to fetch and display messages initially
            fetchAndDisplayMessages();

            // Set interval to continuously fetch and display messages
            setInterval(fetchAndDisplayMessages, 1000); // Fetch every second (adjust as needed)
        });
