// Main app file - starts everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after a short delay
    setTimeout(function() {
        var loadingScreen = document.getElementById('loading');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Create the parts of our app
        var model = new BurgerModel();
        var view = new BurgerView();
        var controller = new BurgerController(model, view);
        
        // Start the app
        controller.start();
    }, 1000);
});
