
<link rel="manifest" href="./manifest.webmanifest">
<link href='/img/nf.png' rel='apple-touch-icon' sizes='180x180'/>
<link href='/img/nf.png' rel='icon' sizes='32x32' type='image/png'/>
<link href='/img/nf.png' rel='icon' sizes='16x16' type='image/png'/>
<link href='https://cdn.jsdelivr.net/gh/Vivekmasona/manifest/Manifest.json' rel='manifest'/>
<meta content='#E74C3C' name='theme-color'/>
<meta content='#E74C3C' name='msapplication-navbutto-color'/>
<meta content='yes' name='apple-mobile-web-app-capable'/>
<meta content='#E74C3C' name='apple-mobile-web-app-status-bar-style'/>
<meta content='width=device-width, user-scalable=no' name='viewport'>
</meta>
<meta http-equiv="X-Frame-Options" content="DENY">
<meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
<title>music-AI</title>


<link rel="stylesheet" href="connect/url/url.css" />
  <script src="connect/url/url.js" defer></script>

<script src="trending/td.js" defer></script>
<link rel="stylesheet" href="massage/ms.css" />
  <script src="massage/ms.js" defer></script>
<link rel="stylesheet" href="connect/player.css" />
  <script src="connect/player.js" defer></script>


    
    <script>
// App ke load hone ke baad ek state push karte hain
window.addEventListener('load', () => {
  history.pushState(null, null, window.location.href);
});

// Popstate event ko handle karte hain
window.addEventListener('popstate', (event) => {
  // App ko minimize karne ka trick (Chrome/Android par kaam karta hai)
  history.pushState(null, null, window.location.href);
  window.history.go(1); // Yahi line minimize effect deti hai
});

	    
    </script>

<audio id="myAudio" src="/sound/fw.mp3"></audio>

<script>
  // Audio element ko select karein
  var audio = document.getElementById("myAudio");

  // Sound ko autoplay karein jab webpage load hoti hai
  audio.autoplay = true;

  // Sound play hone par event listener lagayein
  audio.addEventListener('ended', function() {
    // Sound ko stop karein
    audio.pause();
  });
</script>
<script>
if (window !== window.top) {
    document.documentElement.innerHTML = '';
}

	
</script>


<style>
        /* Global CSS jo har alert ko stylish banayega */
        body::after {
            content: attr(data-alert);
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #333;
            color: #fff;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            font-family: Arial, sans-serif;
            z-index: 9999;
            width: 300px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s;
        }

        body.show-alert::after {
            display: block;
            opacity: 1;
        }
    </style>

    
    <b onclick="alert('This is a stylish alert!')"></b>

    <script>
        // Default alert() ko override karenge
        window.alert = function(message) {
            document.body.setAttribute('data-alert', message);
            document.body.classList.add('show-alert');
            
            // Alert ko 3 seconds baad automatically hide karne ke liye
            setTimeout(() => {
                document.body.classList.remove('show-alert');
            }, 3000);
        }
    </script>



<style>

#thumbnailContainer {
   position: relative;
}

#playButtonOverlay {
   position: absolute;
   z-index: -1;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 465px;
   height: 465px;
   background: url('/img/mwave.gif') no-repeat;
   background-size: cover;
   cursor: pointer;
}

@-webkit-keyframes hue {
   100% { -webkit-filter: hue-rotate(360deg); }
}

#playButtonOverlay:hover {
   -webkit-animation: hue 1s linear infinite;
}


	
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Khula:wght@400;600;700&family=Public+Sans:wght@100;300;400;600&display=swap');

body {
  background-color: transparent;
font-family: "Public Sans", sans-serif;
  color: #E74C3C;
}

a {
  color: #7a92fe;
}

a:hover {
  color: #fff;
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#phone {
  background-color: transparent;
 width: 110%;
  height: 100%;
  border-radius: 2px;
  box-shadow: rgba(104, 139, 255, 0.1) 0px 48px 100px 0px, rgba(17, 12, 46, 0.15) 0px 30px 100px 0px;
}

#top-menu {
z-index:99999;	
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5%;
  text-transform: uppercase;
  font-size: .7rem;
  letter-spacing: .1rem;
  color: #E74C3C;
}

#top-menu i {
z-index:99999;	
  font-size:  1rem;
}



.thumbnail-border {
  height: 200px;
  width: 200px;
  margin: 20% auto 0 auto;
  border-radius: 50%;
  padding: .4rem;
}
.button {
z-index:99999;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15%;
  box-shadow:  inset 3px 2px 5px 0 rgba(255,255,255, .5), rgba(104, 139, 255, 0.1) 7px 3px 10px, rgba(0,0,0, 0.1) 7px 5px 10px
}

.button:hover {
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: #E74C3C;
  color: #fff;
}

#song-details {
z-index:99999;	
  margin-top: -12%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.song-title {
	z-index:99999;
  font-size: 1.4rem;
	width: 100%;
}

.artist {
	z-index:99999;
  font-size: .8rem;
  color:  #abb3c7;
}

#time-slider {
  margin: 24% 5%;
}

.slider-times {
  font-size: .6rem;
  display: flex;
  justify-content: space-between;
  color: #E74C3C;
}

input[type="range"]::-moz-range-progress {
  background-color: #E74C3C; 
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;  
  background: #E74C3C;
  outline: none;
  box-shadow: inset 2px 2px 2px 0 rgba(104, 139, 255, 0.2), inset 3px 3px 2px 0 rgba(50, 50, 50, 0.1), inset -45px -45px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 1px 0 rgba(0, 0, 0, 0.1);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  outline: none;
  border-radius: 50%;
  border: none;
  background: radial-gradient(circle at center, #E74C3C 0, #E74C3C 20%, #d2e1f8 30%, #d2e1f8 70%, #E74C3C 100%);
box-shadow: inset 2px 2px 2px 0 rgba(104, 139, 255, 0.1), rgba(0, 0, 0, 0.1) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 12px 20px;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  outline: none;
  border: none;
  background: radial-gradient(circle at center, #E74C3C 0, #E74C3C 20%, #d2e1f8 30%, #d2e1f8 50%, #E74C3C 100%);
  box-shadow: inset 2px 2px 2px 0 rgba(104, 139, 255, 0.1), rgba(0, 0, 0, 0.1) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 12px 20px;
}

#song-controls {
  width: 96%;
  margin: 0% 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #E74C3C;
}

#song-controls .button {
  height: 65px;
  width: 65px;
}

#volumeSliderContainer {

    margin-top: 10px; /* Set space above the slider */
    margin-bottom: 10px; /* Set space below the slider */
}

#volumeSlider {

    width: 100%;
    height: 10px;
    -webkit-appearance: none;
    background:#E74C3C; /* Set slider color */
    outline: none;
    border: 5px solid red; /* Set border size and color for the slider */
    border-radius: 5px; /* Optional: Set border radius for rounded corners */
}

#volumeSlider::-webkit-slider-thumb {
	
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    background: radial-gradient(circle at center, #E74C3C 0, #E74C3C 20%, #d2e1f8 30%, #d2e1f8 70%, #E74C3C 100%);
box-shadow: inset 2px 2px 2px 0 rgba(104, 139, 255, 0.1), rgba(0, 0, 0, 0.1) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 12px 20px;

 cursor: pointer;
    border-radius: 50%; /* Optional: Set border radius for rounded thumb */
}

#volumeSlider::-moz-range-thumb {
	
    width: 15px;
    height: 15px;
 cursor: pointer;
border-radius: 50%; /* Optional: Set border radius for rounded thumb */

background: radial-gradient(circle at center, #E74C3C 0, #E74C3C 20%, #d2e1f8 30%, #d2e1f8 50%, #E74C3C 100%);
  box-shadow: inset 2px 2px 2px 0 rgba(104, 139, 255, 0.1), rgba(0, 0, 0, 0.1) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.1) 0px 12px 20px;
}


}

				       


</style>
 




<div id="audioPlayerContainer">
    <svg id="playPauseButton" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24">
        <path id="playIcon" d="M8 5v14l11-7z"></path>
    </svg>
    
 <div id="sessionInfoContainer">
       <b id="callUser" disabled>
    <i class="fas fa-phone-alt" style="color: green;"></i>
</b>     
	<b id="endCall" style="display: none;">
  <i class="fas fa-phone-slash" style="color: red;"></i></b>   
<span id="sessionId"></span>
        <button id="copySessionIdButton"><i class="fas fa-copy"></i></button>
        <button id="editSessionIdButton"><i class="fas fa-edit"></i></button>
	
        <button id="shareSessionIdButton"><i class="fas fa-share-alt"></i></button>
    </div>
</div>

<audio id="audioPlayer"></audio>
<div id="controls">
    <button id="callUser" disabled></button>
    </div>








    <b id="hide"></b>

    <script>
       document.getElementById("hide").addEventListener("click", function() {
            //alert("Button clicked!");
       });

        // Handle phone back button press
        window.addEventListener("popstate", function(event) {
            document.getElementById("hide").click();
            // Push state back to maintain the same state
            history.pushState({}, "");
        });

        // Push state to history initially
        history.pushState({}, "");
    </script>

  
 
<!-- Popup notification -->
    <div id="popupms" class="popupms">
        <img src="https://i.ibb.co/5sS1PTk/Cropped-Image.png" alt="Image" />
        <span id="popupMessage"></span>
    </div>

    <!-- Audio element for notification sound -->
    <audio id="notificationSound" src="sound/ms.mp3" preload="auto"></audio>

   





<style>
  #vfytitle {
    font-size: 20px; /* Font size ko 25 pixels par set kiya gaya hai */
    font-family: 'bongee', sans-serif; /* Apne pasandeeda font ka naam yahan set karein */
    color: #ffffff; /* Font color ko white (#ffffff) par set kiya gaya hai */
    text-shadow: 2px 2px 6px #000000; /* Text shadow ko 2px horizontal, 2px vertical, 4px blur, aur black color (#000000) par set kiya gaya hai */
  }
</style>



<script>
document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // Prevent the default context menu
});
</script>
<link rel="manifest" href="./manifest.webmanifest">

<script>
var op = new Audio();
op.src = '/effect/Click.mp3';
</script>


<script>
    // Check if the webpage has been refreshed before
if (!sessionStorage.getItem("refreshed")) {
  // Set the "refreshed" flag in session storage
  sessionStorage.setItem("refreshed", "true");
  // Refresh the page after 2 seconds
  setTimeout(function() {
    location.reload();
  
} else {
  // If it's a revisit, refresh the page immediately
  location.reload();
}

  </script>






<!DOCTYPE html>
<html>
<head>
  
<style>

@-webkit-keyframes hue {
100% { -webkit-filter:hue-rotate(360deg); }
}
img:hover {
-webkit-animation:hue 10s linear infinite;
}
	
</style>




	<style>

#SThumb {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: relative;
box-shadow: 0 0 20px #000; /* Add dark black shadow */
}
#Fimg {
  width: 80;
  height: 60px;
  border-radius: 10%;
  position: relative;
box-shadow: 0 0 20px #000; /* Add dark black shadow */
}		

.layer {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 20px # /* Add your logic for random color here */;
}

.layer:nth-child(1) {
  top: 5px;
  left: 5px;
}

.layer:nth-child(2) {
  bottom: 5px;
  right: 5px;
}

.layer:nth-child(3) {
  top: 5px;
  right: 5px;
}

.layer:nth-child(4) {
  bottom: 5px;
  left: 5px;
}

.rotate {
  animation: spin 5s linear infinite, hueBlink 2s infinite; /* Adjust durations as needed */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes hueBlink {
  0% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(180deg); /* Adjust the degree for half of the color spectrum */
  }
  100% {
    filter: hue-rotate(0deg);
  }
}

.spin-stop {
  animation: none;
}





</style>	









	










<script src='demo-to-prevent-copy-paste-on-blogger_files/googleapis.js'></script><script type='text/javascript'> if(typeof document.onselectstart!="undefined" ) {document.onselectstart=new Function ("return false" ); } else{document.onmousedown=new Function ("return false" );document.onmouseup=new Function ("return false"); } </script>

<vivek href="#" onmousedown="op.play()">









<html xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>

<script src="https://cdn.jsdelivr.net/gh/Vivekmasona/musicjs/jquery-1.11.3.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Vivekmasona/musicjs/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Vivekmasona/musicjs/jquery-mobile.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Vivekmasona/musicjs/bootstrap.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Vivekmasona/musicjs/jquery.mobile-1.4.5.min.css" />
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    
	<style>


		
#current-time {
         color: #abb3c7;
	      
	 
  font-size:20px;
       text-align: left; 
right: 0;
	      
      
      }
         
 #total-time {
            color: #abb3c7;
	      
	 
  font-size:20px;
       text-align: left; 
right: 0;
	      
      
      }
         


	

#upper{
  position:fixed;
  width : 100%;
 background: linear-gradient(0deg, rgba(42,42,42,1) 28%, rgba(0,232,255,1) 53%, rgba(42,42,42,1) 70%);
  box-shadow: 0 0 15px #000;	
	
 z-index : 99;
}
#spacer{
background: linear-gradient(0deg, rgba(42,42,42,1) 18%, rgba(0,232,255,1) 53%, rgba(42,42,42,1) 80%);
  height : 110px;
}
#brandName{
  color: #000;
  background: #E74C3C;
  padding:0px 4px;
  border-radius: 6px;
}

/*		
#search-btn{
background-colour:#E74C3C;
box-shadow: 0 0 10px #000;
  display : block;
  width : 31%;
border: 2px solid #E74C3C !important;
  margin : auto;
  border-radius : 20px;
  margin-top : 20px;
}

*/
#search-btn{
background-colour:#E74C3C;
box-shadow: 0 0 50px #E74C3C;


  display : block;
  width : 26%;
  height: 32px;
border: 1px solid #fff;
border-width: 0px 0px 1px 1px;
  margin : 0%;
  margin-top : -42.4px;
  left:65%;
  border-radius : 20px 0px 20px 0px;
}
	  
.ui-navbar li .ui-btn .ui-btn-inner, .ui-navbar li .ui-btn {
    border: 0 solid #E74C3C !important;
}
Color:#E74C3C;
.search-header{
  float : right;
}

#home-content{

  margin-top: 20px;
}






#progressBarContainer {
  position: fixed;
  overflow: hidden;
  z-index: 99999;
  border-radius: 0px 10px 10px 0px;
  bottom: 0;
  width: 82%; /* Set the width to 80% */
  height: 59.5px;
  background-color: rgba(41, 128, 185, 0.9);
  left: 18%; /* Leave 20% on the left side */
  z-index: 2;
}

#progress {
overflow: hidden;	
  border-radius: 0px 4px 4px 0px;
  height: 100%;
  background: linear-gradient(90deg, rgba(43, 42, 42, 1) 0%, rgba(102, 83, 77, 1) 56%, rgba(237, 97, 53, 1) 100%);
}







		
#search-basic{
	
border-radius: 50px;
}
	
	
.content{

  height : 190px;
  background: radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(21,224,244,1) 6%, rgba(42,42,42,1) 46%);
  margin-top : 10px;
  text-align : center;
  border-radius : 8px;
  
}



	#SAudio {

    display:flex;
    justify-content: center;
    width:110%;
   height:20px;
background-color: transparent;
		
	}

#SAudio {
  display: yes;
	}


#vfytitle {
color: #fff;
width: 50%;	

}

 
/* List Container with Gradient Background */
.list {
  position: relative;
  display: block;
  background: rgb(51,170,171);
background: linear-gradient(0deg, rgba(51,170,171,1) 0%, rgba(75,80,80,1) 60%, rgba(56,54,52,1) 100%);
border-radius: 15px;
  box-shadow: 0 4px 8px rgba(f, f, f, f.2);
  overflow: hidden;
  transition: transform 2s;
  cursor: pointer;
  width: 100%;
  margin: 20px auto;
}

.list:hover {
  transform: scale(1.2);
}

/* Video Thumbnail with Overlay Effect */
.video-thumbnail {
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  transition: opacity 1s;
  display: block;
  position: relative;
  z-index: 1;
}

.video-thumbnail:hover {
  opacity: 1.8;
}

/* Gradient Overlay on Thumbnail */
.list::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(to bottom, rgba(255, 126, 95, 0.8), rgba(254, 180, 123, 0));
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  z-index: 2;
  pointer-events: none;
}


	/* Gradient Overlay on Bottom of Thumbnail */
/*.list::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(to top, rgba(56, 54, 52, 0.4), rgba(56, 54, 52, 0));
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  z-index: 2;
  pointer-events: none;
}
*/
		
/* Video Section Styling */
.video section {
  display: flex;
  align-items: center;
  padding: 10px;
}

.video section img {
  border-radius: 50%;
  margin-right: 10px;
}

.video section div {
  text-align: left;
}

.video-info {
  color: #00ffff;
  font-size: 12px;
  opacity: 0.9;
}

/* Title Styling */
.video p {
  font-weight: bold;
  color: #fff;
  margin: 5px 0;
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 600px) {
  .list {
    width: 99%;
  }
} 
  
.save-icon {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 28px;
    color: #E74C3C;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10%;
    padding: 5px;
    cursor: pointer;
    z-index: 10;
    transition: color 0.3s;
}

.save-icon:hover {
    color: #ffff00;
}

.video-thumbnail {
    width: 100%;
    height: auto;
    display: block;
    position: relative;
}

.delete-btn {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index:9;
    background: rgba(0, 0, 0, 0.5);
    color: #E74C3C;
    border: none;
    border-radius: 10%;
    padding: 5px;
    cursor: pointer;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.delete-btn:hover {
    background-color:#ffff00;
}

		
</style>
	

    <style>
        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }

        .dynamic-box {
            position: fixed;
            top: 200px;
            right: -1;
            background-color: #000;
            color: white;
            padding: 2px 2px;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            white-space: nowrap;
            z-index: 9999;
            visibility: hidden; /* Pehle se invisible */
            opacity: 0;         /* Transparent rahega */
            transition: opacity 0.3s ease;
        }

        /* Jab box mein content hoga tab dikhai dega */
        .dynamic-box:not(:empty) {
            visibility: visible;
            opacity: 1;
        }
    </style>
</head>
<body>

    <div class="dynamic-box">
        <!-- Yaha pe content daalne par box dikhai dene lagega -->
    
    <div id="incomingCall" style="display: none;">
    <!-- Accept Call Button (Green Phone Icon) -->
    <b id="acceptCall" style="background: none; border: none; cursor: pointer;">
        <svg id="acceptIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
            <circle cx="12" cy="12" r="10" fill="green"/>
            <path d="M15.5 14.5c-1.2-.4-2.3-1.1-3.3-2.1s-1.7-2.1-2.1-3.3c-.1-.4 0-.8.3-1.1L11 6c.2-.2.2-.6 0-.9L9 4c-.2-.2-.6-.2-.9 0L6.6 5.6C6.2 6 6 6.6 6 7.2c0 2.2 1.1 4.6 3.1 6.6s4.4 3.1 6.6 3.1c.6 0 1.2-.2 1.6-.6l1.6-1.6c.2-.2.2-.6 0-.9l-1.2-1.2c-.3-.3-.7-.4-1.1-.3z" fill="white"/>
        </svg>
    </b>
    
    <!-- Reject Call Button (Red Phone Icon) -->
    <b id="rejectCall" style="background: none; border: none; cursor: pointer;">
        <svg id="rejectIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
            <circle cx="12" cy="12" r="10" fill="red"/>
            <path d="M15.5 14.5c-1.2-.4-2.3-1.1-3.3-2.1s-1.7-2.1-2.1-3.3c-.1-.4 0-.8.3-1.1L11 6c.2-.2.2-.6 0-.9L9 4c-.2-.2-.6-.2-.9 0L6.6 5.6C6.2 6 6 6.6 6 7.2c0 2.2 1.1 4.6 3.1 6.6s4.4 3.1 6.6 3.1c.6 0 1.2-.2 1.6-.6l1.6-1.6c.2-.2.2-.6 0-.9l-1.2-1.2c-.3-.3-.7-.4-1.1-.3z" fill="white"/>
            <line x1="8" y1="8" x2="16" y2="16" stroke="white" stroke-width="2"/>
            <line x1="16" y1="8" x2="8" y2="16" stroke="white" stroke-width="2"/>
        </svg>
    </b>
</div>     
    
    </div>

    



    


	
<div data-role="page" id="home" data-theme="b">
  
	
	
	<div id="upper">


	  
    <div data-role="header">



	    
        <a href="#" class="modal-btn" data-modal-btn-id="1"><i class='fas fa-wifi' onclick="clickButton()" style='font-size:18px;color:#E74C3C'></i></i></a>
	  
	    
	   

	    
	<button id="toggleButton">
	<i class="fa fa-compress" id="exitFullscreenIcon" style="display: none;font-size:18px;color:red"></i>	
    <i class="fa fa-expand" id="fullscreenIcon" style="font-size:18px;color:red"></i>	
    
    
  </button>    
	    
	    
	    
	    
	    <div class="vivek" id="example"></div>



<!-- Display the current video ID and time -->





	    
<h1>VFY
<span id="brandName"></span></h1>


	





	
    
    </div>

<div id="progressBarContainer">
    <div id="progress"></div>
  </div>
		
    <div data-role="main" class="ui-content">
     <input type="search"  name="search" onclick="startDictation()"  id="search-basic" class="search-bar"placeholder="VIVEKFY: Type songs name artists...."/>
 <button onclick="search(),speakSearchText()" data-role="button" data-icon="search" data-mini="true" data-inline="true" data-theme="b" id="search-btn">search</button></sr>
	    
	
	    
   <div id="autocomplete-results"></div>



 
    

	    

    
    </div> 
	 
   </div>





	
    <div id="spacer"></div>


	
    

<div id="manualContent">
<span id="heading1"></span>
<div id="slider">  
<div class="slides">  
  <img src="https://i.ytimg.com/vi/V4mX8X8TZYs/maxresdefault.jpg" width="100%"onclick="searchAidcSongs()" />
 </div>
  
  <div class="slides">  
  <img src="https://i.ytimg.com/vi/qDSA1_tzjXY/maxresdefault.jpg" width="100%"onclick="searchsrlofiSongs()" />
 </div>
  
  <div class="slides">  
  <img src="https://i.ytimg.com/vi/I07dwC9CG5I/maxresdefault.jpg" width="100%"onclick="searchnonstopSongs()" />
 </div>
  
  <div class="slides">  
  <img src="https://i.ytimg.com/vi/9Tfbp9g8uHc/maxresdefault.jpg" width="100%"onclick="searchsadSongs()" />
 </div>
  
<div class="slides">  
  <img src="https://i.ytimg.com/vi/Pf8iI6Eh4wg/maxresdefault.jpg" width="100%"onclick="searchloveSongs()" />
 </div>
  
  <div id="dot"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
 </div>

	    
<div class="link-bar">
    <div class="grid-container">
      <div class="grid">
	  <div class="tab" onclick="searchshilpiSongs()">
          <img  src="/profile/shilpi.jpg" alt="Profile 1" class="profile-image" />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>
	   <div class="tab" onclick="searchshivaniSongs()">
          <img  src="/profile/shivani.jpg" alt="Profile 1" class="profile-image" />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div> 
	  <div class="tab" onclick="searchkalluSongs()">
          <img  src="/profile/kallu.jpg" alt="Profile 1" class="profile-image" />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>    
        <div class="tab" onclick="searchneelkamalsinghSongs()">
          <img  src="/profile/neelkamal.jpg" alt="Profile 1" class="profile-image" />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>
  <div class="tab"onclick="searchpawansinghSongs()">
          <img src="/profile/pawan.jpg" alt="Profile 1" class="profile-image" />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>
  <div class="tab"onclick="searchnehaSongs()">
          <img src="/profile/neha.jpg" alt="Profile 1" class="profile-image" />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>

  <div class="tab"onclick="searchdarshanSongs()">
          <img src="/profile/darsan.jpg" alt="Profile 1" class="profile-image"  />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>

  <div class="tab"onclick="searchkhesariSongs()">
          <img src="/profile/khesari.jpg" alt="Profile 1" class="profile-image"  />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>
	    <div class="tab"onclick="searchbadshahSongs()">
          <img src="/profile/badshah.jpg" alt="Profile 1" class="profile-image"  />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>  
<div class="tab"onclick="searchsachetSongs()" >
          <img src="/profile/sachet.jpg" alt="Profile 1" class="profile-image" />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>
<div class="tab"onclick="searcharjitsinghSongs()">
          <img src="/profile/arjit.jpg" alt="Profile 1" class="profile-image"  />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>
	  <div class="tab"onclick="searchankushrajaSongs()">
          <img src="/profile/ankush.jpg" alt="Profile 1" class="profile-image"  />
          <div class="overlay"></div>
          <div class="watermark"></div>
        </div>    

        <!-- Repeat the above tab structure for each tab -->

      </div>
    </div>
  </div>



	    
    <div class="container-fluid" id="home-content">

	<div id="homepage-content"></div>    
      <div class="row">
<div id="videos">



<div id="songs"></div>	

<div id="song-container"></div>

<!-- Favorite List ke liye Alag Div -->
<div id="favorite-list">
     <ul id="fav-songs"></ul>   

</div>

	

</div>	
</div>
<div class="row">
              </div>
      


        



    </div>
    </div>
  <div data-role="footer" data-position="fixed" data-id="main-footer" id="foot">
<center>


	
<b hidden='' id='vivek_maurya'><img src="/img/installimg.jpg" alt="vivekfy application" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999; background-color:#333; overflow: hidden; scrolling: no; position: fixed;"> 
 
</b>
	

<center><div id="custom-time-container">
	

	
	


<vfy id="showAutoClose">  

<a href="#" id="pahilagana" class="float1"></a>
<a href="#" id="vivekmasona" class="float1"></a>
</vfy>


	  
<style>
        body {
            margin: 0;
            padding: 0;
        }

        .fixed-footer {

	
    border-radius: 10px, 10px, 10px, 10px; /* Adjust the pixel value as needed */
    	
    position: fixed;
box-shadow: 0 0 15px #000;	
    bottom: 0;
    width: 100%;
    
    height: 59.5px;
    background: rgb(231,76,60);
background-color: transparent;
display: flex;	
    justify-content: space-between;
    align-items: center; /* Center vertically */
    padding: 10px;
}

.song-title {
    width: 80%;
    text-align: center;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.play-button {
color:#FF5733;
font-size: 40px;
    width: 15%;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.play-button i {
color:#FF5733;
    font-size: 40px;
    padding: 15px;
    position: relative;
    z-index: 2;
}






    </style>
    
<script>



// Function to Save Song in Local Storage
function saveFavorite(index, title, thumbUrl, id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const song = { index, title, thumbUrl, id };

    // Check if song with this video ID is already saved
    if (!favorites.some(fav => fav.id === id)) {
        favorites.push(song);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Song saved to favorites!');
        displayFavorites(); // Update favorite list display
    } else {
        alert('Song already in favorites!');
    }
}

// Function to Display Favorite Songs as Clickable List
function displayFavorites() {
    const favContainer = document.getElementById('fav-songs');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favContainer.innerHTML = '';
    favorites.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
            <b onclick="loadFavoriteSong('${song.id}')" class="list" vid="${song.id}" style="position: relative;">
                <div class="video">
                    <img src="${song.thumbUrl}" alt="${song.title}" class="video-thumbnail">
                    <section>
                        <div>
                            <p>${song.title}</p>
                            <small class="video-info">Video ID: ${song.id}</small>
                        </div>
                    </section>
                    <b class="delete-btn" onclick="event.stopPropagation(); removeFavorite('${song.id}')">
                        <i class="fas fa-trash"></i>
                    </b>
                </div>
            </b>
        `;
        favContainer.appendChild(li);
    });
}

// Function to Load Song by Video ID
function loadFavoriteSong(id) {
    // Find the song element using the video ID
    const songElement = document.querySelector(`[vid="${id}"]`);
    if (songElement) {
        loadSong(songElement); // Call the existing loadSong with the full element
    } else {
        alert('Song not found!');
    }
}

// Function to Load Song (Update this if needed)
function loadSong(element) {
    const id = element.getAttribute('vid');
    console.log('Playing song with Video ID:', id);
    // Your existing logic to play the song goes here
}

// Function to Remove Favorite Song by Video ID
function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(song => song.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // Update favorite list display
}

// Page Load hone par Favorite List ko Display karo
displayFavorites();



</script>


<!-- Your webpage content goes here -->

<footer class="fixed-footer" >
 <div class="play-button">
 <b  id="play"> <i class="fa fa-play" aria-hidden="true"></i></b>
</i></div>
<div class="song-title">

<span id="callStatus"></span>
 <span id="callTimer"></span>


	
<span onclick="openModal()" id="vfytitle" style="width: auto; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></span>
</div> 
<div id="mybutton">
<b class="feedback"><img id="Fimg" src="/img/play.jpg" alt="Thumbnail" onclick="clickButton()">
</b>
</div>	
</div>
</footer>
</!doctype>	
       
 
<script>

$(document).ready(function() {
  // Get the search query from the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const query = urlParams.get('play');

  if (query) {
    // If a query is present in the URL, set it in the search bar
    $(".search-bar").val(query);
    // Trigger the search function with the query
    search(query); // Pass the query to the search function
  }
});
$(document).ready(function() {
  // Get the hash from the URL (after #)
  const hash = window.location.hash.substring(1); 

  if (hash) {
    // If a song name is present in the hash, set it in the search bar
    $(".search-bar").val(decodeURIComponent(hash));
    // Trigger the search function with the song name
    search(decodeURIComponent(hash)); // Pass the song name to the search function
  }
});

$(document).on('swipeleft', '.ui-page', function(event) {
    // Check if the event has already been handled to prevent multiple triggers
    if (event.handled !== true) {
        // Find the next page using the jQuery Mobile structure
        var nextpage = $.mobile.activePage.next('[data-role="page"]');

        // If there is a next page, navigate to it
        if (nextpage.length > 0) {
            $.mobile.changePage(nextpage, { 
                transition: "slide",  // Use a sliding transition
                reverse: false        // Navigate forward (not backward)
            }, true, true);
        }
        
        // Mark the event as handled to prevent further triggers
        event.handled = true;
    }
    
    return false;  // Prevent default action and stop event propagation
});

// Optional: You may also want to handle swipe right for navigation back
$(document).on('swiperight', '.ui-page', function(event) {
    if (event.handled !== true) {
        var prevpage = $.mobile.activePage.prev('[data-role="page"]');
        if (prevpage.length > 0) {
            $.mobile.changePage(prevpage, { 
                transition: "slide",  
                reverse: true // Navigate backward
            }, true, true);
        }
        event.handled = true;
    }
    
    return false; 
});


$(document).ready(function(){
    // Initially disable toggle button
    $("#hide").prop("disabled", true);

    // Toggle button click event
    $("#hide").click(function(){
        $("#homepage-content").empty(); // Clear the response content
        $("#manualContent").show(); // Show the manual content
        $("#hide").prop("disabled", true); // Disable toggle button again
    });

    // Function to handle response
    function handleResponse() {
        $("#hide").prop("disabled", false); // Enable toggle button
    }

    // Example function to simulate receiving response
    function receiveResponse() {
        // Simulate receiving response after some delay (for demonstration)
        setTimeout(function(){
            handleResponse(); // Call handleResponse function
        }, 10); // Change delay as needed
    }

    // Call receiveResponse function to simulate receiving response
    receiveResponse();
});




	
$(document).on('swiperight', '.ui-page', function(event){     
    if(event.handled !== true) // This will prevent event triggering more then once
    {      
        var prevpage = $(this).prev('[data-role="page"]');
        if (prevpage.length > 0) {
            $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
        }
        event.handled = true;
    }
    return false;            
});
var firstSearch = true; // Flag to track if it's the first search

function search(){
  //Get Form input
  $("#homepage-content").html("");
  
  //var ytapi = "AIzaSyAs_tSQYJXX9axDYXkYGe9RZmt1p-XRFWo";
 //var ytapi = "AIzaSyCbn2fAWsEvw6TyD4PsfNchyK35rN69jH0";
 //var ytapi = "AIzaSyAuncZ6zOgCiTErzcEc3cHGuhybV1UIJvA";
 //var ytapi = "AIzaSyBemcQ7KH8CvxN0kKjGK-nhfuBzzTy4KEk";
 //var ytapi = "AIzaSyBh6s9emY3VYSbsHudlhxProRt8mtFyt2s";
 //var ytapi = "AIzaSyBfsNcJJHd-O0ftUzH2KqIRc_KhXgPXne0";
  
  var q = $(".search-bar").val();
  if(q === null || q === undefined || q=== ""){
    return;
  }else{
      
$.get(
      "https://www.googleapis.com/youtube/v3/search",{
          part : 'snippet , id',
          q : q,
          type : 'video',
	 videoSyndicated: 'true',
	videoCategoryId: '10',
       //videoDuration: 'long', // This filters for videos under 4 minutes
        eventType: 'none', // Exclude live videos
        //videoDuration: 'medium', // 'medium' ya 'long' as per your preference
        //eventType: 'none' // 'none'
	//videoEmbeddable: 'true', // Exclude live videos
        //videoType: 'video',
        //order: 'date', // Sort by date (newest first)
        //videoLicense: 'creativeCommon',
          //key : "AIzaSyAs_tSQYJXX9axDYXkYGe9RZmt1p-XRFWo",
	 // key : "AIzaSyAuncZ6zOgCiTErzcEc3cHGuhybV1UIJvA",
	  key : "AIzaSyCbn2fAWsEvw6TyD4PsfNchyK35rN69jH0",
	  //key : "AIzaSyBemcQ7KH8CvxN0kKjGK-nhfuBzzTy4KEk", 
	  //key : "AIzaSyBh6s9emY3VYSbsHudlhxProRt8mtFyt2s",
	  //key : "AIzaSyBfsNcJJHd-O0ftUzH2KqIRc_KhXgPXne0",
          maxResults : "40"
        },
          function (data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                // Load all songs in the search list
                $.each(data.items, function (i, item) {
                    var output = getOutput(item, i);
                    $(output).appendTo("#homepage-content").listview();
                });

                if (firstSearch && data.items.length > 0) {
                    // Automatically play the first song only on the first search
                    loadSong($(".list")[0], 0);
                    firstSearch = false; // Set the flag to false for subsequent searches
                }

                if (prevPageToken) {
                    $("#prev-btn").show();
                    $("#prev-btn").attr("prev", prevPageToken);
                    $("#prev-btn").attr("q", q);
                }
                if (nextPageToken) {
                    $("#next-btn").show();
                    $("#next-btn").attr("next", nextPageToken);
                    $("#next-btn").attr("q", q);
                }
            }
        );
    }
}


function getOutput(item, i) {
  var id = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumbUrl = 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg' || 'https://example.com/default-thumbnail.jpg';
  var channelTitle = item.snippet.channelTitle;
  var videoDate = new Date(item.snippet.publishedAt);

  // Check if the video is live and exclude it
 if (item.snippet.liveBroadcastContent === "live") {
    return ''; // Empty string means skipping this item
  }


	
  var output =
    '<b onclick="loadSong(this)" index="' + i + '" class="list" vid="' + id + '" style="position:relative;">' +
    '<div class="video">' +
    '<i class="fas fa-bookmark save-icon" onclick="event.stopPropagation(); saveFavorite(' + i + ', \'' + title + '\', \'' + thumbUrl + '\', \'' + id + '\')"></i>' + // Added video ID as a parameter
    '<img src="' + thumbUrl + '" alt="' + title + '" class="video-thumbnail" onclick="loadSong(this)" index="' + i + '" vid="' + id + '">' +
    '<section>' +
    '<img src="img/logo.png" alt="Vivekfy" width="10%" padding="20">' +
    '<div>' +
    '<p>V F Y ' + title + '</p>' +
    '<small class="video-info">' + channelTitle + '</small>' +
    '<small class="video-info"> VFY </small>' +
    '<small class="video-info"> Ai </small>' +
    '<small class="video-info">Release Date: ' + videoDate.toDateString() + '</small>' +
    '</div>' +
    '</section>' +
    '</div>' +
    '</b>';

return output;
	}




// Show the popup when a butto is clicked
$("#showPopupbutto").click(function() {
    $("#popupContainer").show();
});

// Close the popup when the close butto is clicked
$("#closePopup").click(function() {
    $("#popupContainer").hide();
});
	
	
function loadSong(song, ind) {
    var id = $(song).attr("vid");
    var indId = parseInt($(song).attr("index"));
    var thumbnail = 'https://img.youtube.com/vi/' + id + '/sddefault.jpg';
    var title = $(song).text();

    localStorage.setItem("playPresent", id);
    localStorage.setItem("thumbnail", thumbnail);
    $("#thumbnail").attr("src", thumbnail);

    // Set the profile ID
    localStorage.setItem("profileID", id);
    $("#profileID").text("Profile ID: " + id);

    // Set the profile thumbnail and video ID
    $("#profileThumbnail").html('<img src="' + thumbnail + '" alt="Profile Thumbnail">');
    $("#profileThumbnail").data("videoId", id);

    // Set the title text to the marquee div with ID "vfytitle"
    $("#vfytitle").html('<marquee behavior="alternate" scrollamount="4" onmousedown="this.stop();" onmouseup="this.start();">' + title + '</marquee>');

    // Set the current time title to the div with ID "currentTimeTitle"
    $("#currentTimeTitle").text("Current Time: " + new Date().toLocaleTimeString());

    // Set the current song title with marquee effect to the div with ID "currentSongTitle"
    $("#currentSongTitle").html('<marquee behavior="alternate" scrollamount="1" onmousedown="this.stop();" onmouseup="this.start();">' + title + '</marquee>');
    
    // Create a div with ID "currentSongOutput" to display video ID and max resolution thumbnail
    $("#currentSongOutput").html('Video ID: ' + id + '<br>' +
                                 'Max Resolution Thumbnail: <img src="' + thumbnail + '" alt="Current Song Thumbnail" style="max-width:100%; max-height:100%;">');

    // Create a div with ID "channelNameDiv" to display the channel ID
    $("#channelNameDiv").text("Channel ID: " + id);

    // Add the download button dynamically to the "downloadButtonDiv" within an iframe without border
    var downloadButton = $('<iframe id="downloadIframe" src="save?url=' + id + '" width="80%" height="50px" frameborder="0" border-radius="50px 10px 50px 10px"></iframe>');
    $("#downloadButtonDiv").html(downloadButton);

    // Add a click event listener to the iframe button
    downloadButton.on('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the link
        // Add any additional actions or code you want to execute when the button is clicked
        // For example, you might want to trigger a download or perform some other action
    });

    // Display the current playing song ID
    var currentPlayingSongId = localStorage.getItem("playPresent");
    $("#currentPlayingSongId").text("Current Playing Song ID: " + currentPlayingSongId);

    play(id, indId);
}

    





function play(id,Sid){
   // data = "https://long-libbie-vivekfy-29e7408f.koyeb.app/play?url=https://youtu.be/"+id;
    //data = "https://vivekfy.vercel.app/hack?url=https://vkrdownloader.xyz/download.php?vkr=https://youtu.be/"+id+"&redirect=1";
      //data = "https://vivekfy.vercel.app/audio?itag=249&url=https://youtu.be/"+id;
      //data = "https://vivekfy.vercel.app/api-play?url=https://youtu.be/"+id;
    data = "https://vivekfy.vercel.app/vfy?id="+id;
      //data = "https://vivekfy.vercel.app/mp3?url=https://vkrdownloader.xyz/download.php?vkr=https://youtu.be/"+id;
     //data = "https://inv-ca1-c.nadeko.net/latest_version?id="+id+"&itag=250&local=true";
     //data = "https://myserver-dev-atmq.2.ie-1.fl0.io/audio?url=https://youtu.be/"+id;
     //data = "https://audioserver-dev-cgen.2.sg-1.fl0.io/"+id;
    document.getElementById("SThumb").src = "https://i.ytimg.com/vi/"+id+"/mqdefault.jpg";
    document.getElementById("Fimg").src = "https://i.ytimg.com/vi/"+id+"/mqdefault.jpg";
     document.getElementById("pahilagana").onclick = ()=>{
       location.href= "https://vivekfy.vercel.app/dl?url=https://youtu.be/"+id;
        //location.href= "https://vivekfy.vercel.app/download/audio?url=https://youtu.be/"+id;
        //location.href= "https://vivekfy-server.000webhostapp.com/audio/download?url=https://youtu.be/"+id;
    };
	document.getElementById("VFYmp3").onclick = ()=>{
        //location.href= "https://vivekfy-server.000webhostapp.com/audio/download?url=https://youtu.be/"+id;
        location.href= "https://vivekfy.vercel.app/audio-dl?url=https://youtu.be/"+id;
        //location.href= "https://vivekdl.000webhostapp.com/audio/download?url=https://youtu.be/"+id;
    };

	document.getElementById("VFYmp3v2").onclick = ()=>{
        location.href= "https://vivekfy.vercel.app/audio-dl?url=https://youtu.be/"+id;
        //location.href= "https://vivekfy.fanclub.rocks/audio?url=https://youtu.be/"+id;
        //location.href= "https://vivekdl.000webhostapp.com/audio/download?url=https://youtu.be/"+id;
    };
document.getElementById("vivekmasona").onclick = ()=>{
        location.href= "https://vivekfy.vercel.app/api?url=https://youtu.be/"+id;
        //location.href= "https://myserver-dev-akkd.2.sg-1.fl0.io/mp4?url=https://youtu.be/"+id;
        //location.href= "https://vivekfy-api-v2.onrender.com/video?url=https://youtu.be/"+id;
     //location.href= "https://vivekfy-obg6.onrender.com/download/video?url=https://youtu.be/"+id;
        };

    
var audio = document.getElementById("SAudio");

// Function to play the next song
function playNextSong() {
    var nextSongIndex = Sid + 1; // Calculate the index of the next song
    var playlistItems = document.getElementsByClassName("list");

    
	

    if (nextSongIndex < playlistItems.length) {
        playlistItems[nextSongIndex].click(); // Play the next song
        audio.play(); // Play the audio

        // Update the profile thumbnail and video ID for the next song
        var nextSong = playlistItems[nextSongIndex];
        var nextThumbnail = $(nextSong).children('img').attr("src");
        var nextVideoId = $(nextSong).attr("vid");
        $("#profileThumbnail").html('<img src="' + nextThumbnail + '" alt="Profile Thumbnail">');
        $("#profileThumbnail").data("videoId", nextVideoId);

        console.log('Automatically went to the next song and started playing.');
    } else {
        console.log('End of playlist');
        // You may want to handle what happens when it's the end of the playlist.
    }
}

function playPause() {
   var audio = document.getElementById("SAudio");

   if (audio.paused) {
      audio.play();
   } else {
      audio.pause();
   }
}

	

// Listen for the 'ended' event
audio.addEventListener("ended", function() {
    playNextSong();
});

// Listen for the 'error' event
var alternativeAudioSources = [
"https://vivekfy.vercel.app/vfy?id=" + id,
"https://vivekfy.vercel.app/vfy?id=" + id,
"https://vivekfy.vercel.app/vfy?id=" + id,
"https://vivekfy.vercel.app/vfy?id=" + id,
"https://vivekfy.vercel.app/api-play?url=https://youtu.be/" + id,
"https://vivekfy.vercel.app/mp3?url=https://vkrdownloader.xyz/download.php?vkr=https://youtu.be/" + id,   
"https://vivekfy.vercel.app/mp3?url=https://vkrdownloader.xyz/download.php?vkr=https://youtu.be/" + id,
"https://vivekfy.vercel.app/mp3?url=https://vkrdownloader.xyz/download.php?vkr=https://youtu.be/" + id,
"https://long-libbie-vivekfy-29e7408f.koyeb.app/play?url=https://youtu.be/" + id,	
"https://long-libbie-vivekfy-29e7408f.koyeb.app/play?url=https://youtu.be/" + id,
"https://vivekfy.vercel.app/audio?itag=249&url=https://youtu.be/" + id,
"https://vivekfy.vercel.app/audio?itag=251&url=https://youtu.be/" + id,
    
];

var currentAlternativeIndex = 0;

audio.addEventListener("error", function () {
    setTimeout(function () {
        audio.src = alternativeAudioSources[currentAlternativeIndex];
        audio.load();
        audio.play();
        currentAlternativeIndex = (currentAlternativeIndex + 1) % alternativeAudioSources.length;
    }, 1000);
});


// butto click event
var nextbutto = document.getElementById("nextbutto");
nextbutto.addEventListener("click", function () {
    playNextSong();
});








	
var audio = document.getElementById('SAudio');
var fastForwardbutto = document.getElementById('fastForwardbutto');

fastForwardbutto.addEventListener('click', function () {
    audio.currentTime += 10;
});
var audio = document.getElementById('SAudio');
var rewindbutto = document.getElementById('rewindbutto');

rewindbutto.addEventListener('click', function () {
    if (audio.currentTime >= 5) {
        audio.currentTime -= 5;
    } else {
        audio.currentTime = 0;
    }
});

var audio = document.getElementById("SAudio");
  var seekbar = document.getElementById("seekbar");

  audio.addEventListener("timeupdate", function() {
    var value = (audio.currentTime / audio.duration) * 100;
    seekbar.value = value;
  });

  seekbar.addEventListener("input", function() {
    var seekto = audio.duration * (seekbar.value / 100);
    audio.currentTime = seekto;
  });	

var audio = document.getElementById('SAudio');
var volume10butto = document.getElementById('volume10');
var volume50butto = document.getElementById('volume50');
var volume100butto = document.getElementById('volume100');

volume10butto.addEventListener('click', function () {
    audio.volume = 0; // Set volume to 10%
});

volume50butto.addEventListener('click', function () {
    audio.volume = 0.5; // Set volume to 50%
});

volume100butto.addEventListener('click', function () {
    audio.volume = 1.0; // Set volume to 100%
});

var audio = document.getElementById('SAudio');
var volumeSlider = document.getElementById('volumeSlider');

volumeSlider.addEventListener('input', function () {
    audio.volume = volumeSlider.value / 100;
});


   const titleaudio = document.getElementById('SAudio');
const songTitleElement = document.getElementById('vfytitle');
const thumbnailElement = document.getElementById('SThumb');
const nextButtonElement = document.getElementById('nextbutto');
const heartButtonElement = document.getElementById('VFYmp3v2');
const downloadButtonElement = document.getElementById('VFYmp3');

// Variable to keep track of the current notification
let currentNotification = null;

// Function to update Media Session metadata
function updateMediaSessionMetadata() {
    const songTitle = songTitleElement.textContent;
    const thumbnailUrl = thumbnailElement.src;

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: songTitle,
            artist: 'status vivekfy.ai',
            album: 'VivekFy',
            artwork: [
                { src: thumbnailUrl, sizes: '96x96', type: 'image/jpg' },
                { src: thumbnailUrl, sizes: '128x128', type: 'image/jpg' },
                { src: thumbnailUrl, sizes: '192x192', type: 'image/jpg' },
                { src: thumbnailUrl, sizes: '256x256', type: 'image/jpg' },
                { src: thumbnailUrl, sizes: '384x384', type: 'image/jpg' },
                { src: thumbnailUrl, sizes: '512x512', type: 'image/jpg' },
            ]
        });

        // Set action handlers
        navigator.mediaSession.setActionHandler('play', () => {
            titleaudio.play();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            titleaudio.pause();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            nextButtonElement.click();
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            heartButtonElement.click();
        });
        navigator.mediaSession.setActionHandler('seekbackward', () => {
            titleaudio.currentTime = Math.max(titleaudio.currentTime - 10, 0);
        });
        navigator.mediaSession.setActionHandler('seekforward', () => {
            titleaudio.currentTime = Math.min(titleaudio.currentTime + 10, titleaudio.duration);
        });
    } else {
        console.log('The Media Session API is not supported in this browser.');
    }
}

// Function to show notification with updated thumbnail
function showNotification() {
    const songTitle = songTitleElement.textContent;
    const thumbnailUrl = thumbnailElement.src;

    const options = {
        body: 'Audio is playing',
        icon: thumbnailUrl,
        actions: [
            {
                action: 'seekbackward',
                title: 'Rewind',
                icon: 'path/to/seek-back-icon.png'
            },
            {
                action: 'seekforward',
                title: 'Fast Forward',
                icon: 'path/to/seek-forward-icon.png'
            },
            {
                action: 'heart',
                title: 'Favorite',
                icon: 'path/to/heart-icon.png'
            },
            {
                action: 'next',
                title: 'Next Song',
                icon: 'path/to/next-icon.png'
            },
            {
                action: 'download',
                title: 'Download',
                icon: 'path/to/download-icon.png'
            }
        ]
    };

    // Close the previous notification if it exists
    if (currentNotification) {
        currentNotification.close();
    }

    if (Notification.permission === 'granted') {
        currentNotification = new Notification(songTitle, options);
        currentNotification.addEventListener('click', (event) => {
            if (event.action === 'next') {
                nextButtonElement.click();
            } else if (event.action === 'heart') {
                heartButtonElement.click();
            } else if (event.action === 'download') {
                downloadButtonElement.click();
            } else if (event.action === 'seekbackward') {
                titleaudio.currentTime = Math.max(titleaudio.currentTime - 10, 0);
            } else if (event.action === 'seekforward') {
                titleaudio.currentTime = Math.min(titleaudio.currentTime + 10, titleaudio.duration);
            }
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                currentNotification = new Notification(songTitle, options);
                currentNotification.addEventListener('click', (event) => {
                    if (event.action === 'next') {
                        nextButtonElement.click();
                    } else if (event.action === 'heart') {
                        heartButtonElement.click();
                    } else if (event.action === 'download') {
                        downloadButtonElement.click();
                    } else if (event.action === 'seekbackward') {
                        titleaudio.currentTime = Math.max(titleaudio.currentTime - 10, 0);
                    } else if (event.action === 'seekforward') {
                        titleaudio.currentTime = Math.min(titleaudio.currentTime + 10, titleaudio.duration);
                    }
                });
            }
        });
    }
}

// Update the Media Session metadata initially
updateMediaSessionMetadata();

titleaudio.addEventListener('play', () => {
    document.title = songTitleElement.textContent + ' - ' + titleaudio.currentTime + ' seconds';
    showNotification();
});

titleaudio.addEventListener('pause', () => {
    document.title = 'VIVEKFY-AI';
});

// Add event listener for the next button
nextButtonElement.addEventListener('click', () => {
    console.log('Next song button clicked');
});

// Add event listener for the heart button
heartButtonElement.addEventListener('click', () => {
    console.log('Heart button clicked');
});

// Add event listener for the download button
downloadButtonElement.addEventListener('click', () => {
    console.log('Download button clicked');
});                      



	

const audioPlayer = document.getElementById("SAudio");
const customTimeContainer = document.getElementById("custom-time-container");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");

audioPlayer.addEventListener("loadedmetadata", () => {
  const totalDuration = audioPlayer.duration;
  totalTimeDisplay.textContent = formatTime(totalDuration);
});

audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = audioPlayer.currentTime;
  currentTimeDisplay.textContent = formatTime(currentTime);
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to convert time in format '0:00' to seconds
function convertTimeToSeconds(time) {
  var parts = time.split(":");
  var minutes = parseInt(parts[0]);
  var seconds = parseInt(parts[1]);
  return (minutes * 60) + seconds;
}


var playVideoButton = document.getElementById("playVideobutto");
var overlayBox = null; // Initialize overlayBox to null

playVideoButton.addEventListener("click", function() {
    // Pause audio elements with the ID "SAudio"
    var audioElements = document.querySelectorAll("#SAudio");
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
    }

    var currentPlayingSongId = localStorage.getItem("playPresent");

    // Close the existing overlay box if it exists
    var existingOverlayBox = document.getElementById("overlayBox");
    if (existingOverlayBox) {
        document.body.removeChild(existingOverlayBox);
    }

    // Create and display the video in a new overlay box with controls
    overlayBox = document.createElement("div");
    overlayBox.id = "overlayBox";
    overlayBox.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    overlayBox.style.position = "fixed";
    overlayBox.style.top = "50%";
    overlayBox.style.left = "50%";
    overlayBox.style.transform = "translate(-50%, -50%)";
    overlayBox.style.width = "300px"; // Set the width of the overlay box
    overlayBox.style.height = "200px"; // Set the height of the overlay box

    var video = document.createElement("video");
    video.style.width = "100%";
    video.style.height = "100%";
    video.controls = true; // Show video controls
    video.autoplay = true; // Autoplay video

    var source = document.createElement("source");
    source.src = "https://vivekfy.vercel.app/audio?itag=18&url=https://youtu.be/" + currentPlayingSongId;
    source.type = "video/mp4"; // Change the type if needed

    video.appendChild(source);

    var closeButton = document.createElement("button");
    closeButton.innerHTML = "Exit";
    closeButton.className = "close-button";
    closeButton.style.color = "#E74C3C";
    closeButton.style.backgroundColor = "#333";
    closeButton.style.border = "0";
    closeButton.addEventListener("click", function() {
        document.body.removeChild(overlayBox);
        overlayBox = null; // Reset overlayBox to null when closing the overlay
    });

    overlayBox.appendChild(video);
    overlayBox.appendChild(closeButton);
    document.body.appendChild(overlayBox);

    // Add PiP button to the video
    if (video.requestPictureInPicture) {
        var pipButton = document.createElement("button");
        pipButton.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>'; // Font Awesome icon for PiP
        pipButton.className = "pip-button";
        pipButton.style.color = "#E74C3C";
        pipButton.style.backgroundColor = "#333";
        pipButton.style.border = "0";
        pipButton.style.position = "absolute";
        pipButton.style.top = "5%";
        pipButton.style.left = "5%";
        pipButton.style.transform = "translate(-5%, -5%)";
        pipButton.addEventListener("click", function() {
            video.requestPictureInPicture()
                .then(() => {
                    // Hide the overlay box when entering PiP mode
                    overlayBox.style.display = "none";
                })
                .catch(error => {
                    console.error('Failed to enter PiP mode:', error);
                });
        });

        overlayBox.appendChild(pipButton);
    }

    // Automatically trigger PiP when video starts playing
    video.addEventListener('loadedmetadata', function() {
        if (video.requestPictureInPicture) {
            video.requestPictureInPicture()
                .then(() => {
                    // Hide the overlay box when entering PiP mode automatically
                    overlayBox.style.display = "none";
                })
                .catch(error => {
                    console.error('Failed to enter PiP mode:', error);
                });
        }
    });

    // Event listener for exiting PiP mode
    video.addEventListener('leavepictureinpicture', function() {
        // Show the overlay box when exiting PiP mode
        overlayBox.style.display = "block";
    });

    // Event listener for the back button
    window.addEventListener('popstate', function(event) {
        if (overlayBox) {
            document.body.removeChild(overlayBox);
            overlayBox = null;
        }
    });

    // Add a new entry to the browser's history when the overlay is opened
    history.pushState({ overlay: true }, "");
});

    

	
    
const mainAudio = document.getElementById('SAudio');
const watermarkAudio1 = document.getElementById('watermarkAudio1');
const watermarkAudio2 = document.getElementById('watermarkAudio2');
const coverImage = document.getElementById('SThumb');
const playButtonOverlay = document.getElementById('playButtonOverlay');

// When the main audio is loaded, start playing the first watermark audio, rotate the image, and set volume.
mainAudio.addEventListener('loadedmetadata', () => {
    watermarkAudio1.play();
    rotateCoverImage(true); // Rotate the cover image
    setVolumeForWatermarkAudios(0.2); // Adjust the volume as needed (0.2 means 20% of the main audio volume).
});

// Listen for the 'ended' event on the main audio to start playing the second watermark audio, stop rotating the image, and set volume.
mainAudio.addEventListener('ended', () => {
    watermarkAudio2.play();
    rotateCoverImage(false); // Stop rotating the cover image
    setVolumeForWatermarkAudios(0.2); // Adjust the volume as needed (0.2 means 20% of the main audio volume).
});

// When the main audio plays, rotate the image.
mainAudio.addEventListener('play', () => {
    rotateCoverImage(true); // Rotate the cover image
    showPlayButton();
});

// When the main audio pauses or is manually paused, stop rotating the image.
mainAudio.addEventListener('pause', () => {
    rotateCoverImage(false); // Stop rotating the cover image
    hidePlayButton();
});

// When the main audio ends, hide the play button overlay
mainAudio.addEventListener('ended', () => {
    hidePlayButton();
});

// Function to show the play button overlay
function showPlayButton() {
    playButtonOverlay.style.display = 'block';
}

// Function to hide the play button overlay
function hidePlayButton() {
    playButtonOverlay.style.display = 'none';
}

// Function to rotate the cover image
function rotateCoverImage(rotate) {
    if (rotate) {
        coverImage.classList.add('rotate');
    } else {
        coverImage.classList.remove('rotate');
    }
}

// Function to set volume for watermark audios
function setVolumeForWatermarkAudios(volume) {
    watermarkAudio1.volume = volume;
    watermarkAudio2.volume = volume;
}

// To hide the watermark audio player controls, you can style it or set 'controls' attribute to false for both watermark audio elements.
watermarkAudio1.controls = false;
watermarkAudio2.controls = false;

	



	

	audio.addEventListener("timeupdate", function() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  document.getElementById("progress").style.width = progress + "%";
});


  document.getElementById("play").onclick = function () {
  if (audio.paused) {
    document.querySelector("#play i").className = "fa fa-pause";
    audio.play();
    document.getElementById("SThumb").classList.add("rotate"); // Add the "rotate" class
  } else {
    audio.pause();
    document.querySelector("#play i").className = "fa fa-play";
    document.getElementById("SThumb").classList.remove("rotate"); // Remove the "rotate" class
  }
};

// Add the following code for the "Stop" butto
document.getElementById("stop").onclick = function() {
    audio.pause();
    audio.currentTime = 0; // Rewind the audio to the beginning
    document.querySelector("#play i").className = "fa fa-play";
};

    audio.src=data;
     audio.pause();
   var ids = localStorage.getItem("playPresent");
   if(audio){
     audio.pause();
     audio.play();
      document.querySelector("#play i").className = "fa fa-pause";
   }
}
</script></div>


<butto id="pahilagana"></butto>
    <butto id="vivekmasona"></butto>
<div id="togglebutto"></div>
   
    
<script>
    let isVoiceRecognitionOn = false;
let recognitionTimeout;

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

const togglebutto = document.getElementById('togglebutto');
const searchBox = document.getElementById('search-basic');
const searchButton = document.getElementById('search-btn');

// Add random sound file paths
const randomSounds = [
  "/sound/aass.mp3",
  "/sound/help5.mp3",
  "/sound/help.mp3",
  "/sound/help1.mp3"
];

togglebutto.addEventListener('click', function () {
    playRandomSound();

    setTimeout(function () {
        startVoiceRecognition();
    }, 2700);
});

function playRandomSound() {
    const randomIndex = Math.floor(Math.random() * randomSounds.length);
    playAudio(randomSounds[randomIndex]);
}

function startVoiceRecognition() {
    recognition.start();
    recognitionTimeout = setTimeout(function () {
        recognition.stop();
        //playAudio("/sound/always.mp3");
    }, 150000);
}

recognition.onresult = function(event) {
    const lastResult = event.results[event.results.length - 1][0].transcript;

    let commandMatched = false;
    

    // Check if the voice command matches any predefined commands
        if (lastResult.toLowerCase() === 'mp3' ||
            lastResult.toLowerCase() === 'download mp3' ||
	    lastResult.toLowerCase() === 'download song' ||
            lastResult.toLowerCase() === 'save MP3' ||
            lastResult.toLowerCase() === 'mp3 download' ||
            lastResult.toLowerCase() === 'download this song' ||
            lastResult.toLowerCase() === 'audio' ||
            lastResult.toLowerCase() === 'audio download' ||
            lastResult.toLowerCase() === 'save audio') {
            // Handle audio-related commands
            const butto1 = document.getElementById('pahilagana');
            butto1.click();
            playAudio('/sound/saveaudio.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
        if (lastResult.toLowerCase() === 'video download' ||
            lastResult.toLowerCase() === 'download video' ||
            lastResult.toLowerCase() === 'mp4' ||
            lastResult.toLowerCase() === 'mp4 download' ||
            lastResult.toLowerCase() === 'download mp4') {
            // Handle video-related commands
            const butto1 = document.getElementById('vivekmasona');
            butto1.click();
            playAudio('/sound/savevideo.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
        if (lastResult.toLowerCase() === 'play video' ||
            lastResult.toLowerCase() === 'video play' ||
            lastResult.toLowerCase() === 'video') {
            // Handle video playback commands
            const butto1 = document.getElementById('playVideobutto');
            butto1.click();
            playAudio('/sound/video.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
	if (lastResult.toLowerCase() === 'uploader' ||
            lastResult.toLowerCase() === 'open upload' ||
            lastResult.toLowerCase() === 'audio upload') {
            // Handle video playback commands
            const butto1 = document.getElementById('openPopupBtn');
            butto1.click();
            playAudio('/sound/video.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
	}
        if (lastResult.toLowerCase() === 'song' ||
            lastResult.toLowerCase() === 'play song' ||
            lastResult.toLowerCase() === 'song play' ||
            lastResult.toLowerCase() === 'audio start' ||
            lastResult.toLowerCase() === 'start audio' ||
            lastResult.toLowerCase() === 'Gana' ||
            lastResult.toLowerCase() === 'audio play') {
            // Handle playing songs or audio
            const butto1 = document.getElementById('togglebutto');
            butto1.click();
            playAudio('/sound/song.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
	if (lastResult.toLowerCase() === 'download' ||
            lastResult.toLowerCase() === 'download my link' ||
	    lastResult.toLowerCase() === 'copy url download' ||
	    lastResult.toLowerCase() === 'save my link' ||
	    lastResult.toLowerCase() === 'copy download' ||
	    lastResult.toLowerCase() === 'copy link save' ||
	    lastResult.toLowerCase() === 'url save' ||
	    lastResult.toLowerCase() === 'download url' ||
	    lastResult.toLowerCase() === 'link download' ||
            lastResult.toLowerCase() === 'copy link download') {
            // Handle volume down commands
            const butto1 = document.getElementById('openButton');
            butto1.click();
            playAudio('/sound/curldl.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }  
        if (lastResult.toLowerCase() === 'vivek masona' ||
            lastResult.toLowerCase() === 'developer vivek' ||
            lastResult.toLowerCase() === 'who is vivek' ||
            lastResult.toLowerCase() === 'vivek maurya' ||
            lastResult.toLowerCase() === 'vivek') {
            // Handle news-related or download commands
            const butto1 = document.getElementById('AdVideo');
            butto1.click();
            playAudio('/sound/vivekmasona.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
        if (lastResult.toLowerCase() === 'jaan kis do' ||
            lastResult.toLowerCase() === 'chumma do' ||
	    lastResult.toLowerCase() === 'kis do' ||
	    lastResult.toLowerCase() === 'kis do na' ||
	    lastResult.toLowerCase() === 'land logi' ||
	    lastResult.toLowerCase() === 'munh Mein logi' ||
	    lastResult.toLowerCase() === 'land legi' ||
	    lastResult.toLowerCase() === 'munh Mein legi' ||
            lastResult.toLowerCase() === 'jaan chumma do' ||
            lastResult.toLowerCase() === 'kareza chumma do na' ||
            lastResult.toLowerCase() === 'jaan chumma do na') {
            // Handle news-related or download commands
            const butto1 = document.getElementById('AdAudio');
            butto1.click();
            playAudio('/sound/Nobabu.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
	
	if (lastResult.toLowerCase() === 'volume down' ||
	    lastResult.toLowerCase() === 'silent' ||
	    lastResult.toLowerCase() === 'mute' ||
            lastResult.toLowerCase() === 'volume decrease' ||
            lastResult.toLowerCase() === 'decrease sound') {
            // Handle volume down commands
            const butto1 = document.getElementById('volume10');
            butto1.click();
            playAudio('/sound/downvolume.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        } 
	if (lastResult.toLowerCase() === 'i have a question' ||
	    lastResult.toLowerCase() === 'i have a questions' ||
	    lastResult.toLowerCase() === 'i have questions' ||
            lastResult.toLowerCase() === 'i need help' ||
            lastResult.toLowerCase() === 'kuchh puchhna tha tumse') {
            // Handle help commands
            const butto1 = document.getElementById('micBtn');
            butto1.click();
            playAudio('/sound/ask.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        } 
	if (lastResult.toLowerCase() === 'hello' ||
	    lastResult.toLowerCase() === 'hey' ||
            lastResult.toLowerCase() === 'suno' ||
	    lastResult.toLowerCase() === 'hello babu' ||
	    lastResult.toLowerCase() === 'babu' ||
            lastResult.toLowerCase() === 'hey you') {
            // Handle volume down commands
            const butto1 = document.getElementById('hello');
            butto1.click();
            playAudio('/sound/yes.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        } 
        if (lastResult.toLowerCase() === 'volume increase' ||
            lastResult.toLowerCase() === 'volume full' ||
	    lastResult.toLowerCase() === 'volume up' ||
            lastResult.toLowerCase() === 'sound full' ||
            lastResult.toLowerCase() === 'full sound') {
            // Handle volume increase commands
            const butto1 = document.getElementById('volume100');
            butto1.click();
            playAudio('/sound/fullvolume.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
        if (lastResult.toLowerCase() === 'next' ||
            lastResult.toLowerCase() === 'song change' ||
	    lastResult.toLowerCase() === 'next song' ||
	    lastResult.toLowerCase() === 'song next' ||
            lastResult.toLowerCase() === 'change song') {
            // Handle commands for changing to the next song
            const butto1 = document.getElementById('nextbutto');
            butto1.click();
            playAudio('/sound/nextsong.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
        if (lastResult.toLowerCase() === 'forward' ||
            lastResult.toLowerCase() === 'song forward' ||
            lastResult.toLowerCase() === 'forward song') {
            // Handle commands for forwarding the song
            const butto1 = document.getElementById('fastForwardbutto');
            butto1.click();
            playAudio('/sound/forward1.mp3');            
            commandMatched = true;
        }
        if (lastResult.toLowerCase() === 'backward' ||
            lastResult.toLowerCase() === 'rewind' ||
            lastResult.toLowerCase() === 'song rewind' ||
            lastResult.toLowerCase() === 'rewind song' ||
            lastResult.toLowerCase() === 'backward song') {
            // Handle commands for rewinding the song
            const butto1 = document.getElementById('rewindbutto');
            butto1.click();
            playAudio('/sound/rewind1.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
	if (lastResult.toLowerCase() === 'developer name' ||
            lastResult.toLowerCase() === 'your developer' ||
            lastResult.toLowerCase() === 'developer' ||
            lastResult.toLowerCase() === 'your developer name' ||
            lastResult.toLowerCase() === 'vfy developer') {
            // Handle commands for rewinding the song
            const butto1 = document.getElementById('developer');
            butto1.click();
            playAudio('/sound/vivekbabu1.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        } 
	  if (lastResult.toLowerCase() === 'i love you' ||
            lastResult.toLowerCase() === 'you are my love' ||
            lastResult.toLowerCase() === 'pagal') {
            // Handle volume down commands
            const butto1 = document.getElementById('iloveyou');
            butto1.click();
            playAudio('/sound/love.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }  
        if (lastResult.toLowerCase() === 'stop' ||
            lastResult.toLowerCase() === 'song stop' ||
            lastResult.toLowerCase() === 'stop song' ||
            lastResult.toLowerCase() === 'music stop' ||
            lastResult.toLowerCase() === 'stop music' ||
            lastResult.toLowerCase() === 'audio stop' ||
            lastResult.toLowerCase() === 'stop audio' ||
	    lastResult.toLowerCase() === 'band' ||
	    lastResult.toLowerCase() === 'gana band karo' ||
	    lastResult.toLowerCase() === 'band karo' ||
            lastResult.toLowerCase() === 'stop mp3' ||
            lastResult.toLowerCase() === 'mp3 stop') {
            // Handle commands for stopping audio
            const butto1 = document.getElementById('play');
            butto1.click();
            playAudio('/sound/songstop.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
        if (lastResult.toLowerCase() === 'play' || 
	lastResult.toLowerCase() === 'chalu' ||
	lastResult.toLowerCase() === 'start' ||	
	lastResult.toLowerCase() === 'suru karo' ||
	lastResult.toLowerCase() === 'start karo' ||
	lastResult.toLowerCase() === 'chalu karo' ||
	 lastResult.toLowerCase() === 'gana chalu karo' ||  
	  lastResult.toLowerCase() === 'gana start karo' ||
	    lastResult.toLowerCase() === 'gana bajao' ||
	    lastResult.toLowerCase() === 'song chalao' ||
	lastResult.toLowerCase() === 'song start' ||
	lastResult.toLowerCase() === 'bajao') {
            // Handle the 'play' command
            const butto1 = document.getElementById('play');
            butto1.click();
            playAudio('/sound/songplay.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        }
	  if (lastResult.toLowerCase() === 'bhenchod' ||
            lastResult.toLowerCase() === 'madarchod' ||
	      lastResult.toLowerCase() === 'bhosdi' ||
	      lastResult.toLowerCase() === 'madrachod' ||
	    lastResult.toLowerCase() === 'madharchod' ||
            lastResult.toLowerCase() === 'chutiya' ||
            lastResult.toLowerCase() === 'bhosdi ke' ||
	      lastResult.toLowerCase() === 'bhosdike' ||
            lastResult.toLowerCase() === 'bhosdi wala' ||
	    lastResult.toLowerCase() === 'bahan chod' ||
            lastResult.toLowerCase() === 'madharchod' ||
            lastResult.toLowerCase() === 'bhosdiwala' ||
            lastResult.toLowerCase() === 'gandu' ||
	      lastResult.toLowerCase() === 'bahanchod' ||
	      lastResult.toLowerCase() === 'nikal madarchod' ||
	      lastResult.toLowerCase() === 'salagandu' ||
	      lastResult.toLowerCase() === 'hrami' ||
	      lastResult.toLowerCase() === 'harami' ||
	      lastResult.toLowerCase() === 'bhosdi wali' ||
	      lastResult.toLowerCase() === 'bhosdiwali' ||
	      lastResult.toLowerCase() === 'sali harami' ||
	      lastResult.toLowerCase() === 'sali hrami' ||
	      lastResult.toLowerCase() === 'sali kutti' ||
	      lastResult.toLowerCase() === 'kutti sali' ||
	      lastResult.toLowerCase() === 'kutti' ||
	       lastResult.toLowerCase() === 'madhar chod' ||
            lastResult.toLowerCase() === 'randi' ||
            lastResult.toLowerCase() === 'haraami' ||
            lastResult.toLowerCase() === 'sala chutiya') {
            // Handle commands for stopping audio
            const butto1 = document.getElementById('hate');
            butto1.click();
            playAudio('/sound/ihate.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        } 
	   if (lastResult.toLowerCase() === 'chup' ||
            lastResult.toLowerCase() === 'bilkul chup' ||
	      lastResult.toLowerCase() === 'munh band kar' ||
	      lastResult.toLowerCase() === 'muh band kar' ||
	      lastResult.toLowerCase() === 'chup ho ja bhosdi ke' ||
	      lastResult.toLowerCase() === 'chup ho ja bhosdike' ||
	      lastResult.toLowerCase() === 'chup hoja bhosdi ke' ||
	       lastResult.toLowerCase() === 'chup gandu' ||
	       lastResult.toLowerCase() === 'randi sali munh band kar' ||
	       lastResult.toLowerCase() === 'sali munh band kar' ||
	       lastResult.toLowerCase() === 'ek dam chup' ||
            lastResult.toLowerCase() === 'chup bilkul chup') {
            // Handle volume down commands
            const butto1 = document.getElementById('chup');
            butto1.click();
            playAudio('/sound/sorrybabu.mp3'); // Replace with the appropriate audio URL
            commandMatched = true;
        } 

        // If no command matched, type the spoken word in the search box and trigger search button click
        if (!commandMatched) {
            const searchBox = document.getElementById('search-basic');
            searchBox.value = lastResult;

            const searchButton = document.getElementById('search-btn');
            searchButton.click(); // Trigger search button click
        }
    };

    // Function to play audio from a given URL
    function playAudio(audioURL) {
        const audio = new Audio(audioURL);
        audio.play();
    }
</script>

<b id="VFYmp3v2"></b>            
<div id="AdVideo"></div>            
<div id="AdAudio"></div>
   <div id="hello"></div>     
 <div id="chup"></div>	
<div id="hate"></div>	
<div id="iloveyou"></div>
<div id="developer"></div>
<div id="fastForwardbutto"></div>
<div id="rewindbutto"></div>
<butto id="volume50"></butto>









<script>
function simulateTyping(element, text, index = 0) {
    if (index < text.length) {
        element.value += text.charAt(index);
        index++;
        setTimeout(function() {
            simulateTyping(element, text, index);
        }, 100); // Adjust the timeout for the typing speed
    } else {
        // Trigger the search after typing is complete
        document.getElementById('search-btn').click();
    }
}

function startDictation() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = function(e) {
            var spokenText = e.results[0][0].transcript;
            startSearchWithTyping(spokenText);
        };

        recognition.onerror = function(e) {
            recognition.stop();
        }

        recognition.start();
    }
}

// Function to initiate search with typing effect
function startSearchWithTyping(query) {
    var searchInput = document.getElementById('search-basic');
    searchInput.value = ''; // Clear existing text
    simulateTyping(searchInput, query);
}
// Function to initiate search with typing effect
function startSearchWithTyping(query) {
    var searchInput = document.getElementById('search-basic');
    searchInput.value = ''; // Clear existing text
    simulateTyping(searchInput, query);
}
function searchVibesSongs() {
    var query = "sachet prampra new hindi songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchBhojpuriSongs() {
    var query = "new bhojpuri songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchshivaniSongs() {
    var query = "shivani singh new bhojpuri songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}		
function searchBhaktiSongs() {
    var query = "hindi bhakti songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}	
function searchAidcSongs() {
    var query = "AIDC"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}	
function searchsrlofiSongs() {
    var query = "SR lofi 2.0"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}	
function searchsadSongs() {
    var query = "sad hindi song"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}	
function searchloveSongs() {
    var query = "love hindi music"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchPuraneSongs() {
    var query = "original hinid sad song"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}		
function searchHindiSongs() {
    var query = "Tips official"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchnonstopSongs() {
    var query = "its non-stop"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
	
function searchpawansinghSongs() {
    var query = "pawan singh new song"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchankushrajaSongs() {
    var query = "ankush raja new song"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}	

function searchnehaSongs() {
    var query = "neha Kakkar songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}	

function searcharjitsinghSongs() {
    var query = "arjit singh hits songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchshilpiSongs() {
    var query = "shilpi raj new songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
	}
function searchkalluSongs() {
    var query = "kallu arvind akela new songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}	
function searchbadshahSongs() {
    var query = "badshah new songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}	
function searchkhesariSongs() {
    var query = "khesarilal new songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchneelkamalsinghSongs() {
    var query = "neelkamal singh new songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchbpraakSongs() {
    var query = "b praak new song"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchdarshanSongs() {
    var query = "darshan rawal new songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchsachetSongs() {
    var query = "sachet prampara hits songs"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}
function searchbreakupSongs() {
    var query = "sad hindi breakup song"; // Hindi songs ke liye query
    $(".search-bar").val(query); // Query input field mein set karen
    search(); // Search function ko call karen
}		
	
</script>






<style>html {
	background-color:#000;
}
audio, myAudio {
	background-color:red;
       border-radius : 0px; 
	height: 0px;
Width:0%;
	outline: 2;

	filter: invert(1);
	opacity: 0;
}</style>
<style >
Footer{
   color:#04B2A7;
}</style>

    


<b href="#" onmousedown="op.play()">
<style>#offline-message { display: none; }

[offline="true"] #offline-message {
	display: block;
}














// styles


main {
	
}



#offline-message {
 z-index:999999;
	color: #fff;
	
	box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
	background: #0075ff;
}</style>


<script>
var offlineMsg = document.getElementById("offline-message");

		function _showOfflineMessage(){
			document.getElementsByTagName("html")[0].setAttribute("offline",true);
			offlineMsg.setAttribute("aria-hidden","false");
			setTimeout(function(){
				offlineMsg.focus();
			},400);
		}

		function _hideOfflineMessage(){
			document.getElementsByTagName("html")[0].setAttribute("offline",false);
			offlineMsg.setAttribute("aria-hidden","true");
		}

		window.addEventListener("offline", _showOfflineMessage, false);

		window.addEventListener("online", _hideOfflineMessage, false);</script></b>


<b href="#" onmousedown="op.play()">
<div aria-hidden="true" tabindex="-1" id="offline-message">
    <iframe src="/offline" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999; "></iframe>  
 
</div></b>








</div>






<div class="main-container">
  <div class="main-header">
   </div> <div id="api1" class="modal-design">
    <div>
   
<style>
#share_titlevkm1m,#share_textvkm1m,#outputvkm1m{
    text-align:center;
    font-size:20px;
}
 .iframevkm1mr{
        outline:0;
        border:0;
        width:100%;
        height:86%;
        overflow:hidden;
    }
.iframevkar{
        outline:0;
        border:0;
        width:100%;
        height:15%;
        overflow:hidden;
    }
 
</style>



<script>
    window.addEventListener('load', function() {
        setTimeout(chhupa, 2000);
        var url = new URL(window.location.toString());

        let songList = [];

        // Load saved songs from local storage
        loadSavedSongs();

        // Agar shared link mein 'preventSearch' attribute nahi hai
        if (!url.searchParams.has('preventSearch')) {
            if (isYouTubeLink(url.searchParams.get('text'))) {
                if (isPlaylistLink(url.searchParams.get('text'))) {
                    // YouTube playlist URL hai, sabhi songs ko alag alag div mein dikhao
                    let playlistId = extractPlaylistId(url.searchParams.get('text'));
                    fetchPlaylist(playlistId);
                } else {
                    // Single YouTube video URL hai, video container mein dikhao
                    let vUrl = document.querySelector('#share_textvkm1m');
                    vUrl.innerText = 'URL - ' + url.searchParams.get('text');

                    let vTitle = document.querySelector('#share_titlevkm1m');
                    vTitle.innerText = 'Title - ' + url.searchParams.get('title');

                    let songContainer = document.querySelector('#song-container');
                    let videoId = extractYouTubeVideoId(url.searchParams.get('text'));
                    let title = url.searchParams.get('title');
                    songList.push({ videoId, title });

                    let songElement = createSongElement(videoId, title, 0);
                    songContainer.appendChild(songElement);

                    // Save song to local storage
                    saveSongToLocal(videoId, title);
                }
            } else if (isUrlLink(url.searchParams.get('text'))) {
                // Other URL hai, download button overlay create karo
                openDownloadPopup(url.searchParams.get('text'));
            } else {
                // Koi text hai, search box mein set karo
                let searchText = extractTextInDoubleQuotes(url.searchParams.get('text')) || url.searchParams.get('text');
                let searchBox = document.querySelector('#search-basic');
                searchBox.value = searchText;
                document.getElementById('search-btn').click();
            }
        }

        // Function to fetch YouTube playlist using API
        function fetchPlaylist(playlistId) {
            fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=AIzaSyBemcQ7KH8CvxN0kKjGK-nhfuBzzTy4KEk`)
            .then(response => response.json())
            .then(data => {
                let songsContainer = document.querySelector('#song-container');
                data.items.forEach((item, index) => {
                    let videoId = item.snippet.resourceId.videoId;
                    let title = item.snippet.title;
                    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
                    let channelTitle = item.snippet.channelTitle;
                    let videoDate = new Date(item.snippet.publishedAt);
                    songList.push({ videoId, title });

                    let songElement = createPlaylistSongElement(videoId, title, thumbnailUrl, channelTitle, videoDate, index);
                    songsContainer.appendChild(songElement);

                    // Save song to local storage
                    saveSongToLocal(videoId, title);
                });

                // Automatic click on the first song
                let firstSongElement = songsContainer.querySelector('.list');
                if (firstSongElement) {
                    firstSongElement.click();
                }
            })
            .catch(error => console.error('Error fetching playlist:', error));
        }

        // Function to handle URL download popup
        function openDownloadPopup(downloadUrl) {
            // Create a popup button at a specific location
            let downloadButton = document.createElement('button');
            downloadButton.className = 'download-popup-button shake';
            downloadButton.innerHTML = `
                <a href="https://vivekfy.vercel.app/api?url=${encodeURIComponent(downloadUrl)}" download><i class="fas fa-download"></i></a>
            `;
            downloadButton.addEventListener('click', function() {
                // Change icon to "done" when clicked
                let icon = downloadButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-download');
                    icon.classList.add('fa-check-circle');
                }
            });
            document.body.appendChild(downloadButton);
        }

        // Check kare ki diya gaya link YouTube link hai ya nahi
        function isYouTubeLink(link) {
            return link.includes('youtube.com') || link.includes('youtu.be');
        }

        // Double quotes ke bheetar text nikalne ka function
        function extractTextInDoubleQuotes(link) {
            let match = link.match(/"([^"]+)"/);
            return match ? match[1].trim() : '';
        }

        // URL link se title ya ID nikalne ka function
        function extractTitleFromUrl(link) {
            // Link se title ya ID nikalne ke liye apni logic add kare
            // Yahan, yeh bas link ko return kar raha hai
            return link;
        }

        // YouTube link se video ID nikalne ka function
        function extractYouTubeVideoId(youtubeUrl) {
            let videoIdMatch = youtubeUrl.match(/[?&]v=([^&]+)/);
            return videoIdMatch ? videoIdMatch[1] : null;
        }

        // URL link ka check
        function isUrlLink(link) {
            // Link ko URL link hone ka check karne ke liye apni logic add kare
            // Yahan, yeh bas 'http' ya 'www' se shuru hota hai, yeh check kar raha hai
            return link.startsWith('http') || link.includes('www');
        }

        // YouTube playlist link ka check
        function isPlaylistLink(link) {
            return link.includes('list='); // Checking if link contains 'list=' which indicates it's a playlist
        }

        // Playlist ID nikalne ka function
        function extractPlaylistId(playlistUrl) {
            let playlistIdMatch = playlistUrl.match(/[?&]list=([^&]+)/);
            return playlistIdMatch ? playlistIdMatch[1] : null;
        }

        // Function to save song details to local storage
        function saveSongToLocal(videoId, title) {
            let songDetails = { videoId: videoId, title: title };
            let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
            savedSongs.push(songDetails);
            localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
        }

        // Function to load saved songs from local storage
        function loadSavedSongs() {
            let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
            let songContainer = document.querySelector('#song-container');
            savedSongs.forEach((song, index) => {
                let songElement = createSongElement(song.videoId, song.title, index);
                songContainer.appendChild(songElement);
                songList.push(song);
            });
        }

        // Function to create playlist song element
        function createPlaylistSongElement(videoId, title, thumbnailUrl, channelTitle, videoDate, index) {
            let output =
                '<b onclick="loadSong(this)" index="' + index + '" class="list" vid="' + videoId + '">' +
                '<div class="video">' +
                '<img src="' + thumbnailUrl + '" alt="' + title + '" class="video-thumbnail" onclick="loadSong(this)" index="' + index + '" vid="' + videoId + '">' +
                '<section>' +
                '<img src="/img/newdp.png" alt="Vivekfy" width="10%" padding="20">' +
                '<div>' +
                '<p>V F Y ' + title + '</p>' +
                '<small class="video-info">' + channelTitle + '</small>' +
                '<small class="video-info"> VFY </small>' +
                '<small class="video-info"> Ai </small>' +
                '<small class="video-info">Release Date: ' + videoDate.toDateString() + '</small>' +
                '</div>' +
                '</section>' +
                '</div>' +
                '</b>';
            let songElement = document.createElement('div');
            songElement.innerHTML = output;

            // Add long press to delete functionality
            songElement.querySelector('.video-thumbnail').addEventListener('contextmenu', function(event) {
                event.preventDefault();
                deleteSong(videoId, index);
            });

            // Add long press event listener for touch devices
            let longPressTimer;
            songElement.addEventListener('touchstart', function(event) {
                longPressTimer = setTimeout(function() {
                    deleteSong(videoId, index);
                }, 60000); // 1 second long press
            });

            songElement.addEventListener('touchend', function(event) {
                clearTimeout(longPressTimer);
            });

            return songElement;
        }

        // Function to create single song element
        function createSongElement(videoId, title, index) {
            let songElement = document.createElement('div');
            songElement.innerHTML = `
                <b onclick="loadSong(this)" class="list" vid="${videoId}" index="${index}" id="song-element-${index}">
                    <div class="video">
                        <img src="https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg" alt="${title}" class="video-thumbnail" vid="${videoId}">
                        <section>
                            <section>
                                <div>
                                    <p>${title}</p>
                                </div>
                            </section>
                        </section>
                    </div>
                </b>`;
            
            // Add long press to delete functionality
            songElement.querySelector('.video-thumbnail').addEventListener('contextmenu', function(event) {
                event.preventDefault();
                deleteSong(videoId, index);
            });

            // Add long press event listener for touch devices
            let longPressTimer;
            songElement.addEventListener('touchstart', function(event) {
                longPressTimer = setTimeout(function() {
                    deleteSong(videoId, index);
                }, 60000); // 1 second long press
            });

            songElement.addEventListener('touchend', function(event) {
                clearTimeout(longPressTimer);
            });

            return songElement;
        }

        // Function to delete song from local storage and DOM
        function deleteSong(videoId, index) {
            let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
            savedSongs = savedSongs.filter(song => song.videoId !== videoId);
            localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
            document.querySelector(`#song-element-${index}`).remove();
        }

        // Function to load song
        function loadSong(element) {
            let videoId = element.getAttribute('vid');
            // Add your logic here to load and play the song using the videoId
            // Example: load the song in an iframe or video player
            document.querySelector('#video-player').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

            // Update the currently playing song in local storage
            localStorage.setItem('currentSong', JSON.stringify({ videoId, index: element.getAttribute('index') }));
        }

        // Function to play the next song in the list
        function playNextSong() {
            let currentSong = JSON.parse(localStorage.getItem('currentSong'));
            if (currentSong) {
                let nextIndex = parseInt(currentSong.index) + 1;
                if (nextIndex < songList.length) {
                    let nextSongElement = document.querySelector(`#song-element-${nextIndex}`);
                    if (nextSongElement) {
                        nextSongElement.click();
                    }
                }
            }
        }

        // Automatically play the next song when the current one ends
        document.querySelector('#video-player').addEventListener('ended', playNextSong);

        function chhupa() {
            document.querySelector('#loadingvkm1m').style.display = "none";
        }
    });
</script>
                 







	    
	    






	    



<style>
    @keyframes shake {
        0% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
        100% { transform: translateX(0); }
    }

    .download-popup-button {
        position: fixed;
        bottom: 15%;
        right: 6%;
        background: #E74C3C; /* Change download button background color */
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
        border-radius: 50%; /* Make button round */
        z-index: 9999;
    }

    .download-popup-button a {
        text-decoration: none;
        color: white;
        font-size: 30px; /* Adjust font size of the download icon */
    }

    .shake {
        animation: shake 0.5s;
    }
</style>

            


  </div></div></div>

<div id="share_titlevkm1m"></div>
<div id="share_textvkm1m"></div>
<div id="outputvkm1m"></div>    



	
</script>
<script>/*<![CDATA[*/ 
  const installbutto = document.getElementById("vivek_maurya");window.addEventListener("beforeinstallprompt", e => {e.preventDefault();deferredPrompt = e;installbutto.hidden = false;installbutto.addEventListener("click", installApp);});function installApp() {deferredPrompt.prompt();installbutto.disabled = true;deferredPrompt.userChoice.then(choiceResult => {if (choiceResult.outcome === "accepted") {installbutto.hidden = true;} else {}installbutto.disabled = false;deferredPrompt = null;});}window.addEventListener("appinstalled", evt => {console.log("appinstalled fired", evt);});
  /*]]>*/</script>
<script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js');
    } else {
      alert('ServiceWorker unavailable');
    }
  </script>


	
	
	<script>



$('#showAutoClose').click( function (){
  showToast(
    { 
      eleWrapper: '#example',
      msg: 'VFY:-Your Download Is In Process.',
      theme: 'success',
      closebutto: false,
      autoClose: true
    } 
  );
});

function showToast(option){
  var wrapper = $(option.eleWrapper);
  var toast = createToast(option);
  toast = $(toast).hide().fadeIn(750);
  if(option.autoClose){
    var outTime  = option.autoCloseTime || 3500;
    if(outTime < 1000){
      outTime =  1000;
    }
    var watch = setTimeout(function(){
      toast.animate({ 'margin-top' : '-50px' , 'opacity': '0'},500, function(){
        this.remove();
        if(option.afterClose){
          option.afterClose();
        }
      })
    }, outTime);
  }

  $(wrapper).on('click', '.hs-close', function(){
    $(this).closest('.hs-toast').remove();
    //clearTimeout(watch);
    if(option.afterClose){
      option.afterClose();
    }  
  });

  $(wrapper).append(toast);
  if(option.afterShow){
    option.afterShow();
  }
}

function createToast(option){
  var final = toastCaseValidation(option);
  var html = `
               <div class="hs-toast hs-theme-`+(option.theme).toLowerCase()+`">
                <div class="hs-toast-inner">                
                  <div class="hs-toast-icons">
                    `+final.icon+`
                  </div>
                  <div class="hs-toast-msg">
                    `+final.msg+`
                  </div>
                  <div class="hs-toast-action">
                    `+final.close+`
                  </div>
                </div>
               </div>`;
  return html;
}

function toastCaseValidation(option){
  var finalOption={};
  var toastmsg;
  var themeIco;
  var closeBtn =  '<butto type="butto" class="hs-close">&#10006;</butto>';
  switch(option.theme) {
    case 'error':
      themeIco = '<svg aria-hidden="true" focusable="false"  xmlns="http://www.w3.org/2000/svg" width="1.875em" height="1.875em" viewBox="0 0 30 30"> <circle fill="none" stroke="#fff" stroke-width="2"  cx="50%" cy="50%" r="13" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.9s" /> </circle> <line fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"  x1="10.5" y1="10.5" x2="19.5" y2="19.5" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset"  from="100" to="0" dur="4s" /> </line> <line fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"  x1="19.5" y1="10.5" x2="10.5" y2="19.5" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset"  from="100" to="0" dur="4s" /> </line> </svg>';
      break;
    case 'success':
      themeIco = '<svg aria-hidden="true" focusable="false"  xmlns="http://www.w3.org/2000/svg" width="1.875em" height="1.875em" viewBox="0 0 30 30"> <circle fill="none" stroke="#fff" stroke-width="2" cx="50%" cy="50%" r="13" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.9s" /> </circle> <polyline fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" points="8,17 13,21 22,10" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset"  from="100" to="0" dur="4s" /> </polyline> </svg>';
      break;
    case 'warning':
      themeIco = '<svg aria-hidden="true" focusable="false"  xmlns="http://www.w3.org/2000/svg" width="1.875em" height="1.875em" viewBox="0 0 30 30" > <path  d="M 13 2 Q 15,0 17,2 L 26,23 Q 26,26 23,26 L 6,26 Q 2,26 3,22 L 13,2" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset"  from="100" to="0" dur="0.9s" /> </path> <line  fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" x1="15" y1="9" x2="15" y2="17" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset"  from="100" to="0" dur="5s" /> </line> <line  fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" x1="15" y1="21" x2="15" y2="22" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset"  from="100" to="0" dur="5s" /> </line> </svg>';
      break;
    default:
      themeIco = '<svg aria-hidden="true" focusable="false"  xmlns="http://www.w3.org/2000/svg" width="1.875em" height="1.875em" viewBox="0 0 30 30"> <circle fill="none" stroke="#fff" stroke-width="2" cx="50%" cy="50%" r="13" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.9s" /> </circle> <line fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" x1="15" y1="9" x2="15" y2="9" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset"  from="100" to="0" dur="6s" /> </line> <line fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" x1="15" y1="15" x2="15" y2="22" stroke-dasharray="100"> <animate attributeName="stroke-dashoffset"  from="100" to="0" dur="6s" /> </line> </svg>';
  }
  if(option.closebutto == false){
    closeBtn = '';
  }
  
  if(option.msg == undefined ){ 
    toastmsg = 'No Message';
  }
  else{
    if(option.msg.length != 1  && typeof option.msg === "object" ){ 
      toastmsg = '<ul>';            
        option.msg.forEach(function(val,index){                     
          toastmsg = toastmsg + '<li>'+val+'</li>';
        });                
      toastmsg = toastmsg +'</ul>';     
    }
    else{                                
      toastmsg =option.msg;             
    }
	}
  finalOption.icon = themeIco;
  finalOption.close = closeBtn;
  finalOption.msg = toastmsg;
  return finalOption;
}
</script>

<style>
 .hs-toast-fixed-top{
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .hs-toast-absolute-top{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  
  .hs-toast-wrapper{
    margin: 0 auto;
    max-width: 44rem;
    padding-left: .75rem;
    padding-right: .75rem;
  }
  .hs-toast{
    margin: 0 auto;
    border-radius: .25rem;
    box-shadow: 0 .2rem .5rem rgba(0,0,0,.2);
    background: #5b7e96;
    padding: .5rem .75rem;
    max-width: 40rem;
    position: relative;
  }

  .hs-toast-inner{
    display: flex;
  }
  .hs-toast-msg{
    color: white;
    line-height: 1.5rem;
    flex: 1 1 0%;
    min-width: 0;
    padding-top: .2rem;
    padding-left: .5rem;
    padding-right: .75rem;
        overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }
  .hs-toast-msg ul{
    margin: 0;
    padding-left: .75rem;
  }
  .hs-toast-icons, .hs-toast-action{
    flex: none;
    color: white;
  }
  .hs-toast-action{
    cursor: pointer;
  }
  
  .hs-close{
    border: none;
    background: none;
    color:white;
    outline:none;
    padding: 0;
    font-family: 'Arial', Segoe UI Symbol;
  }
  .hs-toast + .hs-toast{
    margin-top: .5rem;
  }
  .hs-theme-error{
    background: #fe4a5d;
  }
  .hs-theme-success{
    background: rgb(255,94,0);
background: linear-gradient(90deg, rgba(255,94,0,1) 0%, rgba(0,212,255,1) 49%, rgba(225,41,17,1) 100%);
  }
  .hs-theme-warning{
    background: #000;
  }


</style>







	
<audio id="watermarkAudio2" controls>
            <source src="/sound/next.mp3" type="audio/mpeg">
        </audio>
<audio id="watermarkAudio1" preload="auto">
    <source src="/sound/start.mp3" type="audio/mpeg">
</source></audio>


<!doctype html>


    


    

    


</!doctype>


<script>
const names = ["Arijit Singh Songs","Jubin nariyal songs","Jass Manak songs","Nehal kakkar songs","Sonu nigam songs","Kailash khair songs"," B praak songs","Kumar sanu songs","Alka Yagnik songs","Lata Mangeshkar songs","Yo Yo honey Singh songs","Aatif Aslam Songs","Neelkamal singh songs", "Ranjeet Singh songs", "Pawan singh songs","Ankush Raja songs","khesari lal songs","Ritesh Pandey songs", "Rakesh Mishra songs","Arvind akela Kallu songs"]; // Add your list of names here
let currentIndex = 0;
function changePlaceholder() {
    const searchBox = document.getElementById("search-basic");
    searchBox.placeholder = "Search for " + names[currentIndex];
    currentIndex = (currentIndex + 1) % names.length;
}

setInterval(changePlaceholder, 1000); // Change placeholder every 1 second
</script>

<!doctype html>


  


  <audio id="disconnectAudio">
    <source src="/sound/vnd.mp3" type="audio/mpeg">
  </source></audio>

  <audio id="connectAudio">
    <source src="/sound/vnc.mp3" type="audio/mpeg">
  </source></audio>

  <script>
    const disconnectAudio = document.getElementById("disconnectAudio");
    const connectAudio = document.getElementById("connectAudio");
    const internetCheckInterval = 100; // Check every 5 seconds (adjust as needed)
    let wasOnline = true;

    function checkInternetConnection() {
      const online = window.navigator.onLine;

      if (!online && wasOnline) {
        disconnectAudio.play();
        wasOnline = false;
      } else if (online && !wasOnline) {
        connectAudio.play();
        wasOnline = true;
      }
    }

    setInterval(checkInternetConnection, internetCheckInterval);
  </script>





<script>
  function speakSearchText() {
    const searchInput = document.getElementById('search-basic');
    let searchText = searchInput.value.toLowerCase();

    // List of words to remove from the input
    const wordsToRemove = ['start', 'start karo', 'play karo', 'bajao', 'play', 'chalu karo', 'sunao', 'chalao', 'lagao'];

    // Remove specified words from the input
    wordsToRemove.forEach(word => {
      searchText = searchText.replace(word, '').trim();
    });

    // Proceed with speech synthesis for the remaining text
    speakWithAudio(searchText);
  }

  function speakWithAudio(textToSpeak) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Set language to Hindi
      utterance.lang = 'hi-IN';

      // Select a male voice, if available
      const voices = window.speechSynthesis.getVoices();
      let maleVoice = voices.find(voice => voice.name === 'vivek');
      if (maleVoice) {
        utterance.voice = maleVoice;
      } else {
        console.log('Male voice not found; using the default voice.');
      }

      utterance.volume = 1; // Set volume to 100%

      utterance.onend = function () {
        // Once the text is spoken, initiate the audio link for "Search results from bhi faai music"
        const audio = new Audio('/sound/result.mp3');
        audio.play();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported in this browser');
    }
  }
</script>





        


	
	
 <butto id="developer"></butto>

<butto id="playVideobutto"></butto>


<style>
  /* Styling for the modal container */
  .modal-container1 {
    display: none;
    position: fixed;
    top: 0;
    left: -20px;
    width: 110%;
    height: 100%;
    background: rgb(59,175,194);
background: radial-gradient(circle, rgba(59,175,194,0.9557312232860621) 0%, rgba(133,137,139,0.9702766750169837) 0%, rgba(52,50,48,0.9981027630792147) 60%, rgba(0,0,0,1) 84%);	
	
	z-index: 999999;
  }

  /* Styling for the modal content */
  .modal-content1 {
    background-color: transparent;
    width: 100%;
    top: 0%;
    padding: 20px;
    text-align: center;
  }
</style>






<!-- The modal container -->
<div id="modal" class="modal-container1">
  <div class="modal-content1">
    <span onclick="closeModal()" style="float: right;"></span>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<div class="container"> 
  
  <div id="phone">
  
    <div id="top-menu">
      <div class="button">
        <i class="fas fa-volume-mute" id="volume10"></i>
      </div>
      <div class="small-text">
      <div id="button">
      <div id="volumeSliderContainer">
    <input type="range" id="volumeSlider" min="0" max="100" step="1" value="100"/>
</div>
</div>	      
      
      
      </div>
      <div class="button">
        <i id="volume100" class="fa fa-volume-up"></i>
      </div>
    </div>  <!-- /top-menu -->
    
    <div class="thumbnail-border">
      
<div class="audio-player">

	
<div id="thumbnailContainer">
   <img id="SThumb" src="" alt="/img/newdp.png" onclick="clickButton()">
   <div id="playButtonOverlay" onclick="playPause()"></div>
</div>


</div>  
    <!-- Your poster image goes here -->
  

	    
    </div> <!--/thumbnail-border -->
    
    <div id="song-details">
      <h1 class="song-title"id="vfytitle">

<!-- Add this div to your HTML -->



	      
      </h1>
      <span class="artist"></span>
<div id="downloadButtonDiv"></div>

	    
    </div> <!-- /song-details -->

    <div id="time-slider">
      <div class="slider-times">
        <span id="current-time"></span> 
        <span id="total-time"></span> 
      </div>


	    
      <input type="range" min="1" max="100" value="0" class="slider" id="seekbar" />

<br>
<div id="currentSongTitle"></div>

	    
    </div> <!-- /time-slider -->
    
   <b id="stop"></b>
	
<div id="song-controls">
     
      <div class="button">

<b id="play" onclick="clickButton()">	<i id="playvfy" class="fas fa-pause" onclick="togglePause()"></i></b>
   

      
      </div>
	
      <div class="button">
          <i id="VFYmp3" class="fas fa-download"></i>
      </div>

<div class="button">
        <i onclick="closeModal()" class="fa fa-list"></i>
      </div> 
	
<div class="button">
          <i id="nextbutto" class="fas fa-step-forward"></i>
      </div>
	    
    </div><!-- /song-controls -->
    
  </div> <!-- /phone -->
  
  

</div> <!-- /container -->


  	<div id="audio-player">
  <audio id="SAudio" controls style="display: none;">
    <source src="your-audio-file.mp3" type="audio/mp3">
    Your browser does not support the audio element.
  </audio>

</div>
  
	  
	  



<!-- Popup container -->	   
  </div>
</div>

<script>
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
</script>



  
    

<script>const videoList = document.getElementById("videos");
const li = document.getElementsByTagName("li");
const videos = videoList.childNodes;

for (let i = 0; i < 5; i++) {
  videos.forEach((item) => {
    let cln = item.cloneNode(true);
    videoList.appendChild(cln);
  });
}


}</script>




 
	
	<script>


$(document).ready(function () {
  var searchField = $("input.search-bar");
  var autocompleteResults = $("#autocomplete-results");
  var typingTimer;

  searchField.autocomplete({
    source: function (request, response) {
      var term = request.term;
      var s = {
        client: "youtube",
        ds: "yt"
      };

      $.ajax({
        url: "//clients1.google.com/complete/search",
        dataType: "jsonp",
        data: {
          q: term,
          nolabels: "t",
          client: s.client,
          ds: s.ds
        },
        success: function (r) {
          var data = r[1].map(function (item) {
            return item[0];
          });

          autocompleteResults.empty();
          $.each(data, function (index, value) {
            autocompleteResults.append("<p class='autocomplete-suggestion'>" + value + "</p>");
          });
        }
      });
    }
  });

  autocompleteResults.on("click", ".autocomplete-suggestion", function () {
    var suggestion = $(this).text();
    searchField.val(suggestion);
    hideAutocompleteResults();
    $("#search-btn").click();
  });

  searchField.keypress(function (event) {
    if (event.which === 8) {
      searchField.autocomplete("disable");
    }
  });

  searchField.on("input", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function () {
      hideAutocompleteResults();
    }, 5000);
  });

  function hideAutocompleteResults() {
    autocompleteResults.empty();
  }
});



		
      </script>
	


	


<script>
    // Button element
    const button = document.getElementById('togglebutto');
    let isClicked = false;
    
    // Function to handle the device motion event (shaking)
    function handleDeviceMotion(event) {
      if (isClicked) {
        return; // If a click has already occurred, exit the function
      }

      const acceleration = event.accelerationIncludingGravity;
      const threshold = 30; // Increased threshold for stronger shaking

      if (Math.abs(acceleration.x) > threshold || Math.abs(acceleration.y) > threshold || Math.abs(acceleration.z) > threshold) {
        // Logic to run when the device is shaken
        button.click(); // Trigger the button click
        isClicked = true; // Set the flag to prevent further clicks within this shake event
       // alert('Button clicked by shaking!'); // Show an alert message

        // Reset the flag after 2 seconds (2000 milliseconds)
        setTimeout(function() {
          isClicked = false;
        }, 2000);
      }
    }

    // Add an event listener for device motion
    window.addEventListener('devicemotion', handleDeviceMotion);
  </script>

  




  

  
  
    <style>
    

    #toggleButton {
      color: #E74C3C; /* Set button text color */
    }

    .icon {
      color: #E74C3C; /* Set icon color */
      font-size: 19px; /* Set icon size */
      margin-right: 2px; /* Optional: Add margin to separate icon from text */
    }
  </style>


  

  <script>
    var fullscreen = false;

    // Trigger fullscreen on page load
    window.onload = function() {
      enterFullScreen();
      fullscreen = true;
    };

    // Toggle button click event
    document.getElementById('toggleButton').addEventListener('click', function() {
      if (fullscreen) {
        exitFullScreen();
      } else {
        enterFullScreen();
      }
      fullscreen = !fullscreen; // Toggle fullscreen variable
    });

    // Full screen mode activate karne ke liye
    function enterFullScreen() {
      var element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }

      // Toggle icons
      document.getElementById('fullscreenIcon').style.display = 'none';
      document.getElementById('exitFullscreenIcon').style.display = 'inline';
    }

    // Full screen mode se bahar nikalne ke liye
    function exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      // Toggle icons
      document.getElementById('fullscreenIcon').style.display = 'inline';
      document.getElementById('exitFullscreenIcon').style.display = 'none';
    }
</script>



    <script>
        function clickButton() {
            // Get the reference to the button by its ID
            var button1 = document.getElementById("play");

            // Simulate a click on the button
            button1.click();
        }
    </script>



  <style>
    #playvfy {
      transition: transform 0.3s ease-in-out;
    }
  </style>

  <script>
    let isPaused = false;
    
    function togglePause() {
      const pauseIcon = document.getElementById('playvfy');
      isPaused = !isPaused;

      if (isPaused) {
        pauseIcon.classList.remove('fa-pause');
        pauseIcon.classList.add('fa-play');
      } else {
        pauseIcon.classList.remove('fa-play');
        pauseIcon.classList.add('fa-pause');
      }
    }
  </script>


<div class="modal-content" data-modal-id="1">

	
    <iframe src="/connect/v2/Cpanel.html" style="position:fixed; top:20; left:0; bottom:0; right:0; width:100%; height:96%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999; "></iframe>  
 
</div>

<script>const modalContents = Array.from(
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
      document.body.removeChild(
        document.getElementsByClassName("modal-backdrop")[0]
      );
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
  modalInner.innerHTML = document.querySelector(
    `[data-modal-id="${id}"]`
  ).innerHTML;
  modalInner.className = "modal-inner";
  modal.append(modalInner);

  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "modal-backdrop";
  modalBackdrop.innerHTML = "";
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
  });

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
    isDragging = false;
    handlemodalPosition();
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
    handlemodalPosition();
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
}</script>


<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 1rem;
  font-family: sans-serif, system-ui;
}

.modal-content {
  display: none;
}

.modal {
  z-index: 999999;
  background-color: #BABED9;
  border-radius: 1rem 1rem 0 0;
  height: calc(100svh - 2rem);
  overflow: hidden;
  top: 2.8rem;
  position: fixed;
  width: min(100%, 700px);
  display: grid;
  grid-template-rows: 2rem 1fr;
  bottom: 0;
  left: 50%;
  translate: -50% 0;
  transition: transform 0.4s ease;
}

.modal-inner {
  padding: 1rem;
  overflow: scroll;
}

.modal.hidden {
  transform: translatey(100%);
}

.modal-handle {
  display: block;
  padding: 0.2rem 1rem;
  display: grid;
  place-items: center;
  cursor: ns-resize;
}

.modal-handle::after {
  content: "";
  height: 0.50rem;
  width: 4rem;
  border-radius: 1rem;
  background-color: #E74C3C;
}

.modal-backdrop {
  z-index: 4;
  position: fixed;
  background-color: black;
  inset: 0;
}</style>

	


  
  
 
  <style>
    

    .link-bar {
      width: 100%;
      overflow: hidden;
    }

    .grid-container {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 0 10px; /* Add padding to the grid container */
      max-width: 100%; /* Make sure it doesn't exceed the screen width */
    }

    .grid {
      display: flex;
      gap: 10px;
    }

    .tab {
      flex: 1 0 calc(33.333% - 10px); /* 33.333% for 3 tabs, subtracting 10px for gap */
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }

    .profile-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 20px;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(63,94,251);
background: radial-gradient(circle, rgba(63,94,251,0) 0%, rgba(8,7,6,0.8879578300144362) 100%);
    }

    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 18px;
      font-weight: bold;
      opacity: 0.8;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    }
  </style>




<!doctype html>


    
    
   
    <p id="status">Requesting clipboard access...</p>

    <script>
        (async function requestClipboardPermission() {
            try {
                const permission = await navigator.permissions.query({ name: 'clipboard-read' });
                if (permission.state === 'granted') {
                    document.getElementById('status').textContent = 'Clipboard access is granted.';
                } else if (permission.state === 'prompt') {
                    await navigator.clipboard.readText();  // Triggers prompt
                    document.getElementById('status').textContent = 'Clipboard permission requested.';
                } else {
                    document.getElementById('status').textContent = 'Clipboard access denied.';
                }
            } catch (error) {
                document.getElementById('status').textContent = `Error: ${error.message}`;
            }
        })();
    </script>

 
        
          
 

 <!DOCTYPE html>
<html>
<head>
    <title>Live URL Detection with Download Popup</title>
    <style>
        /* Hidden download button initially */
        #downloadButton {
            display: none;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h2>Live URL Detection & Download</h2>
    <p>Copy any Instagram, Facebook, or YouTube link and see the magic!</p>

    <!-- Invisible audio element for sound playback -->
    <audio id="soundPlayer" style="display:none;"></audio>

    <!-- Download Button -->
    <button id="downloadButton" onclick="startDownload()">Download Now</button>

    <script>
        let lastClipboardText = "";
        let detectedURL = "";

        window.onload = function () {
            checkClipboard();
            // Continuously check the clipboard every second
            setInterval(checkClipboard, 1000);
        };

        function checkClipboard() {
            navigator.clipboard.readText()
                .then(function (clipboardText) {
                    // If clipboard content is different from the last checked value
                    if (clipboardText && clipboardText !== lastClipboardText) {
                        lastClipboardText = clipboardText;
                        var linkType = identifyLinkType(clipboardText);
                        if (linkType !== 'unknown') {
                            playSound(linkType);
                            showPopup(clipboardText);
                        }
                    }
                })
                .catch(function (err) {
                    console.error('Failed to read clipboard content: ', err);
                });
        }

        function identifyLinkType(link) {
            if (link.toLowerCase().includes('instagram')) {
                return 'instagram';
            } else if (link.toLowerCase().includes('facebook') || link.toLowerCase().includes('fb')) {
                return 'facebook';
            } else if (link.toLowerCase().includes('youtube.com') || link.toLowerCase().includes('youtu.be')) {
                return 'youtube';
            } else {
                return 'unknown';
            }
        }

        function playSound(linkType) {
            var audio = document.getElementById('soundPlayer');
            switch (linkType) {
                case 'instagram':
                    audio.src = '/sound/copyinstagram.mp3';
                    break;
                case 'facebook':
                    audio.src = '/sound/copyfacebook.mp3';
                    break;
                case 'youtube':
                    audio.src = '/sound/copyyoutube.mp3';
                    break;
                default:
                    audio.src = '/sound/default_sound.mp3';
            }

            // Load and play the audio
            audio.load();
            audio.play();
        }

        function showPopup(url) {
            detectedURL = url; // Store the detected URL
            let confirmDownload = confirm("Link detected: " + url + "\nDo you want to download?");
            if (confirmDownload) {
                // Show the download button
                document.getElementById('downloadButton').style.display = 'inline-block';
            }
        }

        function startDownload() {
            if (detectedURL) {
                // Single API call for all links
                let apiUrl = 'https://vivekfy.vercel.app/api?url=' + encodeURIComponent(detectedURL);

                // Redirect to the download link
                window.location.href = apiUrl;
            }
        }
    </script>
</body>
</html>       

    
                         
    


<script>var index = 0;
var slides = document.querySelectorAll(".slides");
var dot = document.querySelectorAll(".dot");

function changeSlide(){

  if(index<0){
    index = slides.length-1;
  }
  
  if(index>slides.length-1){
    index = 0;
  }
  
  for(let i=0;i<slides.length;i++){
    slides[i].style.display = "none";
    dot[i].classList.remove("active");
  }
  
  slides[index].style.display= "block";
  dot[index].classList.add("active");
  
  index++;
  
  setTimeout(changeSlide,5000);
  
}

changeSlide();</script>



<style>*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
@keyframes fade{
  from{
    opacity:0.1;
  }
  to{
    opacity:1;
  }
}

body{
  background:#fff;
}

#slider{
  margin:0 auto;
  width:80%;
  overflow:hidden;
}

.slides{
  overflow:hidden;
  animation-name:fade;
  animation-duration:1s;
  display:none;
}



#dot{
  margin:0 auto;
  text-align:center;
}
.dot{
  display:inline-block;
  border-radius:20%;
  background:#E74C3C;
  padding:8px;
  margin:10px 5px;
}

.active{
  background:black;
}

@media (max-width:567px){
  #slider{
    width:100%;

  }
}

#heading1{
  display:block;
  text-align:center;
  font-size:2em;
  margin:10px 0px;

}</style>







    <h4 id="brandName" style="cursor: pointer; text-decoration: underline;"></h4>

<!-- Add your scripts here -->
<script src="https://wurfl.io/wurfl.js"></script>

<script>
    // Wait for the document to be ready
    $(document).ready(function () {
        // Get the user's complete device name from WURFL library
        var completeDeviceName = WURFL.complete_device_name;

        // Extract brand name
        var brandName = completeDeviceName.split(" ")[0];

        // Display the brand name
        var brandNameElement = document.getElementById('brandName');
        brandNameElement.innerText = brandName;

        // Add click event listener to the brand name
        brandNameElement.addEventListener('click', function () {
            // Use your custom TTS API to speak the complete device name
            var ttsUrl = 'https://vivekfy.vercel.app/tts?text=' + encodeURIComponent(completeDeviceName);
            var audio = new Audio(ttsUrl);
            audio.play();
        });
    });
</script>



</!doctype>



<style>
.feedback {
  z-imdex:999999;
  background-color : transparent;
  color: transparent;
  
  
  border-color: #46b8da;
}

#mybutton {
z-imdex:999999;	
  position: fixed;
  bottom: 0%;
  left: 0px;
}
</style>

<script>
        const API_KEY = 'AIzaSyBh6s9emY3VYSbsHudlhxProRt8mtFyt2s';
        const STORAGE_KEY = 'hits_songs';
        const EXPIRATION_TIME = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

        async function fetchHitsSongs() {
            const query = 'latest release bhojpuri song';
            
            const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=IN&type=video&q=${query}&maxResults=20&videoSyndicated=true&videoCategoryId=10&key=${API_KEY}`);
            
            if (!searchResponse.ok) {
                throw new Error('Network response was not ok');
            }
            
            const searchData = await searchResponse.json();
            
            const videoIds = searchData.items
                .filter(item => item.snippet.liveBroadcastContent === 'none')
                .map(item => item.id.videoId)
                .join(',');

            const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`);
            
            if (!videoResponse.ok) {
                throw new Error('Failed to fetch video details');
            }

            const videoData = await videoResponse.json();

            const filteredVideos = searchData.items.filter((item, index) => {
                const duration = videoData.items[index].contentDetails.duration;
                const durationInSeconds = parseISO8601Duration(duration);
                return durationInSeconds >= 60 && durationInSeconds <= 480;
            });

            return filteredVideos;
        }

        function parseISO8601Duration(duration) {
            const match = duration.match(/PT(\d+M)?(\d+S)?/);
            const minutes = parseInt(match[1]) || 0;
            const seconds = parseInt(match[2]) || 0;
            return minutes * 60 + seconds;
        }

        function createPlaylistSongElement(videoId, title, channelTitle, videoDate, index) {
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

            // Using the same structure as provided in the second template
            var output =  
                '<b onclick="loadSong(this)" index="' + index + '" class="list" vid="' + videoId + '">' +  
                '<div class="video">' +  
                '<img src="' + thumbUrl + '" alt="' + title + '" class="video-thumbnail" onclick="loadSong(this)" index="' + index + '" vid="' + videoId + '">' +  
                '<section>' +  
                '<img src="img/logo.png" alt="Vivekfy" width="10%" padding="20">' +  
                '<div>' +  
                '<p>V F Y ' + title + '</p>' +  
                '<small class="video-info">' + channelTitle + '</small>' +  
                '<small class="video-info"> VFY </small>' +  
                '<small class="video-info"> Ai </small>' +  
                '<small class="video-info">Release Date: ' + new Date(videoDate).toDateString() + '</small>' +  
                '</div>' +  
                '</section>' +  
                '</div>' +  
                '</b>';  

            return output;
        }

        function displaySongs(songs) {
            const songsContainer = document.getElementById('songs');
            songsContainer.innerHTML = '';

            songs.forEach((song, index) => {
                const videoId = song.id.videoId;
                const title = song.snippet.title;
                const channelTitle = song.snippet.channelTitle;
                const videoDate = song.snippet.publishedAt;

                const songElement = createPlaylistSongElement(videoId, title, channelTitle, videoDate, index);
                songsContainer.innerHTML += songElement;
            });
        }

        function saveToLocalStorage(data) {
            const now = new Date().getTime();
            const item = {
                value: data,
                timestamp: now,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
        }

        function isLocalDataValid(item) {
            const now = new Date().getTime();
            return now - item.timestamp < EXPIRATION_TIME;
        }

        async function loadSongs() {
            const localData = localStorage.getItem(STORAGE_KEY);
            
            if (localData) {
                const item = JSON.parse(localData);
                if (isLocalDataValid(item)) {
                    displaySongs(item.value);
                    return;
                }
            }

            try {
                const hitsSongs = await fetchHitsSongs();
                saveToLocalStorage(hitsSongs);
                displaySongs(hitsSongs);
            } catch (error) {
                console.error('Error fetching songs:', error);
                document.getElementById('songs').innerHTML = 'Saved songs';
            }
        }

        window.onload = loadSongs;
   


  



</script>


<script>
document.getElementById('search-btn').addEventListener('click', function() {
  // Puri page height ka 20% calculate karna
  const scrollAmount = window.innerHeight * 0.5;
  
  // Page ko 20% scroll karna
  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth'
  });
});
  
</script>




<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<script src="https://cdn.socket.io/4.7.1/socket.io.min.js"></script>
   
<script>const socket = io("https://gold-foregoing-change.glitch.me/");

let localStream;
let peerConnection;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
let roomID;
let callTimer;
let callStartTime;

// Ringtone for Incoming Call
const ringtone = new Audio("https://github.com/Vivekmasona/vfy-fm/raw/refs/heads/main/sound/ringtone.mp3");
ringtone.loop = true;

// Get Popup Elements
const incomingCallPopup = document.getElementById('incomingCall');
const callTimerElement = document.getElementById('callTimer');
const acceptCallButton = document.getElementById('acceptCall');
const rejectCallButton = document.getElementById('rejectCall');
const endCallButton = document.getElementById('endCall');

// Automatically join room if sessionId is found in localStorage
window.addEventListener('load', () => {
    roomID = localStorage.getItem('sessionId');
    if (roomID) {
        socket.emit('join-room', roomID);
        document.getElementById('callUser').disabled = false;
        alert(`Automatically Joined Room: ${roomID}`);
    } else {
        alert('Session ID not found. Please check if it is saved correctly.');
    }
});

// Call User
document.getElementById('callUser').addEventListener('click', async () => {
    socket.emit('call-request', { roomID });
    document.getElementById('callStatus').innerText = 'Calling...';
});

// Incoming Call Popup
socket.on('incoming-call', ({ from }) => {
    incomingCallPopup.style.display = 'block';
    callTimerElement.style.display = 'none';
    acceptCallButton.style.display = 'inline';
    rejectCallButton.style.display = 'inline';
    endCallButton.style.display = 'none';
    ringtone.play();
    document.getElementById('callStatus').innerText = 'Incoming Call...';

    // Accept Call
    acceptCallButton.onclick = async () => {
        ringtone.pause();
        ringtone.currentTime = 0;
        socket.emit('call-accepted', { to: from });
        incomingCallPopup.style.display = 'none';
        document.getElementById('callStatus').innerText = 'Connecting...';

        // Initialize Media
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        peerConnection = new RTCPeerConnection(config);
        peerConnection.addTrack(localStream.getTracks()[0], localStream);

        peerConnection.ontrack = (event) => {
            const remoteAudio = new Audio();
            remoteAudio.srcObject = event.streams[0];
            remoteAudio.play();
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', { candidate: event.candidate, roomID });
            }
        };

        document.getElementById('callStatus').innerText = 'Connected';
        endCallButton.style.display = 'inline';
        callTimerElement.style.display = 'inline';
        startCallTimer();
    };

    // Reject Call
    rejectCallButton.onclick = () => {
        ringtone.pause();
        ringtone.currentTime = 0;
        socket.emit('call-rejected', { to: from });
        incomingCallPopup.style.display = 'none';
        document.getElementById('callStatus').innerText = 'Call Rejected';
    };
});

// Call Accepted
socket.on('call-accepted', async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    peerConnection = new RTCPeerConnection(config);
    peerConnection.addTrack(localStream.getTracks()[0], localStream);

    peerConnection.ontrack = (event) => {
        const remoteAudio = new Audio();
        remoteAudio.srcObject = event.streams[0];
        remoteAudio.play();
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('candidate', { candidate: event.candidate, roomID });
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', { offer, roomID });

    document.getElementById('callStatus').innerText = 'Connected';
    endCallButton.style.display = 'inline';
    callTimerElement.style.display = 'inline';
    startCallTimer();
});

// Handle Offer
socket.on('offer', async ({ offer }) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', { answer, roomID });
});

// Handle Answer
socket.on('answer', async ({ answer }) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

// Handle ICE Candidate
socket.on('candidate', ({ candidate }) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

// End Call
endCallButton.addEventListener('click', () => {
    socket.emit('end-call', roomID);
    endCall();
});

socket.on('call-ended', () => {
    endCall();
});

function endCall() {
    if (peerConnection) peerConnection.close();
    peerConnection = null;
    document.getElementById('callStatus').innerText = 'Call Ended';
    endCallButton.style.display = 'none';
    incomingCallPopup.style.display = 'none';
    stopCallTimer();
}

// Call Timer Functions
function startCallTimer() {
    callStartTime = new Date();
    callTimer = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - callStartTime) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const seconds = String(elapsed % 60).padStart(2, '0');
        callTimerElement.innerText = `${minutes}:${seconds}`;
    }, 1000);
}

function stopCallTimer() {
    clearInterval(callTimer);
    callTimerElement.innerText = '00:00';
}</script>


    

