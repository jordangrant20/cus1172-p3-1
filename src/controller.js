// Controller - handles user clicks and actions
function BurgerController(model, view) {
    this.model = model;
    this.view = view;
    this.setupEventListeners();
}

// Set up all the event handlers
BurgerController.prototype.setupEventListeners = function() {
    var self = this;

    // Handle clicking buttons
    document.addEventListener('click', function(event) {
        var target = event.target;
        
        // Name form submit
        if (target.id === 'name-form-submit' || (target.type === 'submit' && target.closest('#name-form'))) {
            event.preventDefault();
            self.handleNameSubmit();
        }

        // Pick burger button
        if (target.classList.contains('pick-burger-btn')) {
            event.preventDefault();
            var burgerId = target.getAttribute('data-burger-id');
            var burgerName = target.getAttribute('data-burger-name');
            self.handleBurgerChoice(burgerId, burgerName);
        }

        // Multiple choice buttons
        if (target.classList.contains('choice-btn')) {
            event.preventDefault();
            var choice = target.getAttribute('data-choice');
            self.handleStepChoice(choice);
        }

        // Number submit button
        if (target.id === 'submit-number') {
            event.preventDefault();
            self.handleNumberInput();
        }

        // Image selection
        if (target.classList.contains('image-choice') || target.closest('.image-choice')) {
            event.preventDefault();
            var imageDiv = target.classList.contains('image-choice') ? target : target.closest('.image-choice');
            var imageIndex = imageDiv.getAttribute('data-image-index');
            self.handleImageChoice(imageIndex);
        }

        // Final page buttons
        if (target.id === 'new-order-btn') {
            event.preventDefault();
            self.startNewOrder();
        }

        if (target.id === 'go-home-btn') {
            event.preventDefault();
            self.goHome();
        }
    });

    // Handle form submits
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'name-form') {
            event.preventDefault();
            self.handleNameSubmit();
        }
    });

    // Handle Enter key on number input
    document.addEventListener('keypress', function(event) {
        if (event.target.id === 'number-input' && event.key === 'Enter') {
            event.preventDefault();
            self.handleNumberInput();
        }
    });
};

// User enters their name
BurgerController.prototype.handleNameSubmit = function() {
    var nameInput = document.getElementById('user-name');
    var name = nameInput.value.trim();

    if (name === '') {
        this.view.showHelp('Please enter your name to continue!');
        return;
    }

    this.model.setName(name);
    this.showBurgerMenu();
};

// User picks a burger type
BurgerController.prototype.handleBurgerChoice = function(burgerId, burgerName) {
    this.model.setBurger(burgerId, burgerName);
    this.view.showGoodChoice('Great choice! Let\'s customize it.');
    
    var self = this;
    setTimeout(function() {
        self.startSteps();
    }, 1000);
};

// User makes a choice in a step
BurgerController.prototype.handleStepChoice = function(choice) {
    this.model.addChoice(choice);
    this.nextStep();
};

// User enters a number
BurgerController.prototype.handleNumberInput = function() {
    var input = document.getElementById('number-input');
    var value = input.value;

    if (!value || value < 1 || value > 10) {
        this.view.showHelp('Please enter a number between 1 and 10!');
        return;
    }

    this.model.addChoice(value);
    this.nextStep();
};

// User picks an image
BurgerController.prototype.handleImageChoice = function(imageIndex) {
    var currentStep = this.model.getCurrentStep();
    var choice = currentStep.imageOptions[imageIndex].label;
    
    this.model.addChoice(choice);
    this.nextStep();
};

// Move to next step or finish
BurgerController.prototype.nextStep = function() {
    var self = this;
    
    // Show confirmation message
    this.view.showGoodChoice('Nice pick!');
    
    setTimeout(function() {
        if (self.model.hasMoreSteps()) {
            self.model.goToNextStep();
            self.showCurrentStep();
        } else {
            self.finishOrder();
        }
        self.updateOrderDisplay();
    }, 800);
};

// Show the burger menu
BurgerController.prototype.showBurgerMenu = function() {
    var self = this;
    
    this.model.getBurgers().then(function(burgers) {
        var content = self.view.makeBurgerMenu(self.model.getName(), burgers);
        self.view.changeContent(content);
        self.updateOrderDisplay();
    }).catch(function(error) {
        console.error('Error loading burgers:', error);
        self.view.showHelp('Sorry, there was an error loading the burger menu. Please try again.');
    });
};

// Start the customization steps
BurgerController.prototype.startSteps = function() {
    var self = this;
    
    this.model.getBurgerSteps(this.model.getBurgerId()).then(function(steps) {
        if (steps && steps.length > 0) {
            self.model.setSteps(steps);
            self.showCurrentStep();
        } else {
            self.finishOrder();
        }
    }).catch(function(error) {
        console.error('Error loading burger steps:', error);
        self.view.showHelp('Sorry, there was an error loading the customization steps. Please try again.');
    });
};

// Show current step
BurgerController.prototype.showCurrentStep = function() {
    var step = this.model.getCurrentStep();
    var stepNum = this.model.getCurrentStepNumber();
    var totalSteps = this.model.getTotalSteps();

    var content = this.view.makeStep(step, stepNum, totalSteps);
    this.view.changeContent(content);

    // Maybe show help message
    this.maybeShowHelpMessage();
};

// Show help message sometimes
BurgerController.prototype.maybeShowHelpMessage = function() {
    var stepNum = this.model.getCurrentStepNumber();
    
    // Show help on certain steps
    if (stepNum === 1) {
        this.view.showHelp('Choose what sounds best to you!');
    } else if (stepNum === 3) {
        this.view.showHelp('Pick your favorite option from the choices below.');
    }
};

// Finish the order
BurgerController.prototype.finishOrder = function() {
    var order = this.model.getOrder();
    var allStepsCompleted = this.model.isOrderComplete();
    
    var content = this.view.makeFinal(order.name, allStepsCompleted);
    this.view.changeContent(content);
};

// Update the order display
BurgerController.prototype.updateOrderDisplay = function() {
    var order = this.model.getOrder();
    this.view.updateOrderBox(order);
};

// Start a new order
BurgerController.prototype.startNewOrder = function() {
    this.model.reset();
    this.showWelcome();
};

// Go back to welcome page
BurgerController.prototype.goHome = function() {
    this.model.reset();
    this.showWelcome();
};

// Show welcome page
BurgerController.prototype.showWelcome = function() {
    var content = this.view.makeWelcome();
    this.view.changeContent(content);
    this.updateOrderDisplay();
};

// Start the whole app
BurgerController.prototype.start = function() {
    this.view.startApp();
};
