
const names = ["Arijit Singh Songs","Jubin nariyal songs","Jass Manak songs","Nehal kakkar songs","Sonu nigam songs","Kailash khair songs"," B praak songs","Kumar sanu songs","Alka Yagnik songs","Lata Mangeshkar songs","Yo Yo honey Singh songs","Aatif Aslam Songs","Neelkamal singh songs", "Ranjeet Singh songs", "Pawan singh songs","Ankush Raja songs","khesari lal songs","Ritesh Pandey songs", "Rakesh Mishra songs","Arvind akela Kallu songs"]; // Add your list of names here
let currentIndex = 0;
function changePlaceholder() {
    const searchBox = document.getElementById("search-basic");
    searchBox.placeholder = "Search for " + names[currentIndex];
    currentIndex = (currentIndex + 1) % names.length;
}

setInterval(changePlaceholder, 1000); // Change placeholder every 1 second
