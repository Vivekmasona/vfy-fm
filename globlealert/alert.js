 // Default alert() ko override karenge
        window.alert = function(message) {
            document.body.setAttribute('data-alert', message);
            document.body.classList.add('show-alert');
            
            // Alert ko 3 seconds baad automatically hide karne ke liye
            setTimeout(() => {
                document.body.classList.remove('show-alert');
            }, 3000);
        }
    

