
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
  
