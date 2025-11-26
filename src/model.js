// Model - handles burger data and order info
function BurgerModel() {
    // API URL for getting burger data
    this.apiUrl = 'https://my-json-server.typicode.com/RKIAcademy/project-3-spa-application-jordangrant20';
    
    // Store current order info
    this.order = {
        name: '',
        burger: '',
        burgerName: '',
        step: 0,
        choices: {},
        done: false
    };
}

// Get burger list from server
BurgerModel.prototype.getBurgers = function() {
    var self = this;
    return fetch(this.apiUrl + '/burgers')
        .then(function(response) {
            return response.json();
        })
        .catch(function(error) {
            console.log('Could not get burgers from server:', error);
            // Use backup data if server doesn't work
            return [
                {
                    id: "classic-beef",
                    title: "Classic Beef Burger", 
                    description: "A timeless favorite with juicy beef patty"
                },
                {
                    id: "grilled-chicken",
                    title: "Grilled Chicken Burger",
                    description: "Tender grilled chicken with fresh ingredients"
                }
            ];
        });
};

// Get steps for a specific burger
BurgerModel.prototype.getBurgerSteps = function(burgerId) {
    var self = this;
    return fetch(this.apiUrl + '/steps?burgerId=' + burgerId)
        .then(function(response) {
            return response.json();
        })
        .catch(function(error) {
            console.log('Could not get steps from server:', error);
            // Use backup steps if server fails
            return self.getBackupSteps(burgerId);
        });
};

// Backup steps when server is down
BurgerModel.prototype.getBackupSteps = function(burgerId) {
    var steps = {
        "classic-beef": [
            {
                id: "step1",
                type: "multiple-choice",
                instruction: "Choose your bun",
                options: ["Sesame Seed", "Brioche", "Lettuce Wrap", "Whole Wheat"],
                feedback: null
            },
            {
                id: "step2", 
                type: "multiple-choice",
                instruction: "Select your protein",
                options: ["Single Patty", "Double Patty", "Triple Patty"],
                feedback: {
                    condition: "Triple Patty",
                    message: "Whoa! That's a lot of meat! Are you sure you can handle all that protein?"
                }
            },
            {
                id: "step3",
                type: "multiple-choice",
                instruction: "Add your toppings",
                options: ["Lettuce", "Tomato", "Pickles", "Onions", "All of them"],
                feedback: null
            },
            {
                id: "step4",
                type: "text",
                instruction: "How many sauce packets? (1-5)",
                placeholder: "Enter number of sauce packets",
                feedback: {
                    condition: "amount > 3",
                    message: "Too much sauce might overpower the beef flavor! Maybe try fewer packets?"
                }
            },
            {
                id: "step5",
                type: "image-selection",
                instruction: "Choose your burger presentation style",
                imageOptions: [
                    { 
                        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", 
                        label: "Classic Stack",
                        isCorrect: true 
                    },
                    { 
                        url: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=300&h=200&fit=crop", 
                        label: "Messy Style",
                        isCorrect: false 
                    },
                    { 
                        url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=200&fit=crop", 
                        label: "Deconstructed",
                        isCorrect: false 
                    }
                ],
                feedback: {
                    condition: "wrong_choice",
                    message: "That presentation might make your burger messy to eat! The classic stack is usually the best choice."
                }
            }
        ],
        "grilled-chicken": [
            {
                id: "step1",
                type: "multiple-choice",
                instruction: "Choose your bun",
                options: ["Brioche", "Whole Wheat", "Lettuce Wrap", "Ciabatta"],
                feedback: null
            },
            {
                id: "step2",
                type: "multiple-choice",
                instruction: "Select your chicken style",
                options: ["Grilled", "Crispy", "Spicy Grilled"],
                feedback: null
            },
            {
                id: "step3",
                type: "multiple-choice",
                instruction: "Add your fresh toppings",
                options: ["Avocado", "Bacon", "Swiss Cheese", "All of them"],
                feedback: null
            },
            {
                id: "step4",
                type: "text", 
                instruction: "How spicy? (1-10 heat level)",
                placeholder: "Enter heat level (1-10)",
                feedback: {
                    condition: "amount > 7",
                    message: "That's pretty spicy! The chicken's flavor might get overwhelmed. Consider a milder heat level."
                }
            },
            {
                id: "step5",
                type: "image-selection",
                instruction: "Choose your plating style",
                imageOptions: [
                    { 
                        url: "https://images.unsplash.com/photo-1606755962773-d324e9a13086?w=300&h=200&fit=crop", 
                        label: "Gourmet Plate",
                        isCorrect: true 
                    },
                    { 
                        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop", 
                        label: "Basket Style",
                        isCorrect: false 
                    },
                    { 
                        url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop", 
                        label: "Wrap Style",
                        isCorrect: false 
                    }
                ],
                feedback: {
                    condition: "wrong_choice",
                    message: "That style might not showcase your chicken burger properly! Try the gourmet presentation."
                }
            }
        ]
    };
    
    if (steps[burgerId]) {
        return steps[burgerId];
    } else {
        return [];
    }
};

// Save user name
BurgerModel.prototype.setName = function(name) {
    this.order.name = name;
};

// Get user name
BurgerModel.prototype.getName = function() {
    return this.order.name;
};

// Save selected burger
BurgerModel.prototype.setBurger = function(burgerId, burgerName) {
    this.order.burger = burgerId;
    this.order.burgerName = burgerName;
    this.order.step = 0;
    this.order.choices = {};
    this.steps = [];
};

// Get selected burger ID
BurgerModel.prototype.getBurgerId = function() {
    return this.order.burger;
};

// Set the steps for the selected burger
BurgerModel.prototype.setSteps = function(steps) {
    this.steps = steps;
    this.order.step = 0;
};

// Get current step
BurgerModel.prototype.getCurrentStep = function() {
    if (this.steps && this.steps[this.order.step]) {
        return this.steps[this.order.step];
    }
    return null;
};

// Get current step number
BurgerModel.prototype.getCurrentStepNumber = function() {
    return this.order.step;
};

// Get total number of steps
BurgerModel.prototype.getTotalSteps = function() {
    return this.steps ? this.steps.length : 0;
};

// Check if there are more steps
BurgerModel.prototype.hasMoreSteps = function() {
    return this.order.step < this.getTotalSteps() - 1;
};

// Go to next step
BurgerModel.prototype.goToNextStep = function() {
    if (this.hasMoreSteps()) {
        this.order.step++;
    }
};

// Add a choice to the current step
BurgerModel.prototype.addChoice = function(choice) {
    var currentStep = this.getCurrentStep();
    if (currentStep) {
        this.order.choices[currentStep.id] = choice;
    }
};

// Check if order is complete
BurgerModel.prototype.isOrderComplete = function() {
    return this.steps && this.order.step >= this.steps.length;
};

// Get the current order data
BurgerModel.prototype.getOrder = function() {
    return this.order;
};

// Start over
BurgerModel.prototype.reset = function() {
    this.order = {
        name: '',
        burger: '',
        burgerName: '',
        step: 0,
        choices: {},
        done: false
    };
};

// Check if text input is okay
BurgerModel.prototype.checkTextInput = function(step, value) {
    if (!step.feedback) {
        return { ok: true };
    }

    var number = parseInt(value);
    
    if (step.feedback.condition === "amount > 3" && number > 3) {
        return { 
            ok: false, 
            message: step.feedback.message 
        };
    }
    
    if (step.feedback.condition === "amount > 7" && number > 7) {
        return { 
            ok: false, 
            message: step.feedback.message 
        };
    }

    return { ok: true };
};

// Check if image choice is good
BurgerModel.prototype.checkImageChoice = function(step, option) {
    if (!step.feedback) {
        return { ok: true };
    }
    
    if (!option.isCorrect) {
        return {
            ok: false,
            message: step.feedback.message
        };
    }

    return { ok: true };
};

// Check if choice needs feedback
BurgerModel.prototype.checkChoice = function(step, choice) {
    if (!step.feedback) {
        return { ok: true };
    }
    
    if (step.feedback.condition && step.feedback.condition === choice) {
        return {
            ok: false,
            message: step.feedback.message
        };
    }

    return { ok: true };
};
