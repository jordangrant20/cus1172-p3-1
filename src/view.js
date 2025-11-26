// View - makes HTML for the app
function BurgerView() {
    this.templates = {};
    this.setupTemplates();
}

// Set up all the HTML templates
BurgerView.prototype.setupTemplates = function() {
    var self = this;
    
    // Main page layout
    this.templates.mainPage = Handlebars.compile(
        '<div class="app-header">' +
            '<div class="container-fluid">' +
                '<div class="d-flex justify-content-between align-items-center py-3">' +
                    '<h1 class="app-logo mb-0">🍔 Burger Kiosk</h1>' +
                    '<div class="app-subtitle">Build Your Perfect Burger</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="container-fluid h-100">' +
            '<div class="row h-100">' +
                '<div class="col-md-8">' +
                    '<div id="main-area" class="h-100 d-flex flex-column justify-content-center">' +
                        '{{{content}}}' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-4 bg-light">' +
                    '<div id="order-box" class="p-4 sticky-top">' +
                        '{{{orderInfo}}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    );

    // Welcome page
    this.templates.welcomePage = Handlebars.compile(
        '<div class="welcome-screen">' +
            '<div class="welcome-content">' +
                '<div class="welcome-hero mb-5">' +
                    '<div class="welcome-icon">🍔</div>' +
                    '<h1 class="welcome-title">Welcome to Burger Kiosk</h1>' +
                    '<p class="welcome-subtitle">Craft your perfect burger experience</p>' +
                '</div>' +
                '<div class="welcome-card mx-auto">' +
                    '<div class="card-body">' +
                        '<h3 class="card-title">Ready to start your order?</h3>' +
                        '<p class="card-description">Tell us your name to begin your personalized burger journey</p>' +
                        '<form id="name-form">' +
                            '<div class="form-group mb-4">' +
                                '<label for="user-name" class="form-label">Your Name</label>' +
                                '<input type="text" class="form-control" id="user-name" placeholder="Enter your name" required>' +
                            '</div>' +
                            '<button type="submit" class="btn btn-primary">' +
                                '<span class="btn-text">Start Building My Burger</span>' +
                                '<span class="btn-icon">→</span>' +
                            '</button>' +
                        '</form>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    );

    // Burger menu page
    this.templates.burgerMenu = Handlebars.compile(
        '<div class="burger-selection text-center">' +
            '<h2 class="mb-4">Hi {{name}}! Pick your burger:</h2>' +
            '<div class="row justify-content-center">' +
                '{{#each burgers}}' +
                '<div class="col-md-5 mb-4">' +
                    '<div class="card h-100 burger-card">' +
                        '<div class="burger-image-container">' +
                            '<img src="{{image}}" class="card-img-top burger-image" alt="{{title}}">' +
                        '</div>' +
                        '<div class="card-body d-flex flex-column">' +
                            '<h4 class="card-title">{{title}}</h4>' +
                            '<p class="card-text flex-grow-1">{{description}}</p>' +
                            '<button class="btn btn-outline-primary btn-lg pick-burger-btn" data-burger-id="{{id}}" data-burger-name="{{title}}">' +
                                'Choose This One' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '{{/each}}' +
            '</div>' +
        '</div>'
    );

    // Step page for customization
    this.templates.stepPage = Handlebars.compile(
        '<div class="step-container text-center">' +
            '<div class="step-header mb-4">' +
                '<h3>{{instruction}}</h3>' +
                '<div class="progress mb-3">' +
                    '<div class="progress-bar" role="progressbar" style="width: {{percent}}%">' +
                        'Step {{stepNum}} of {{totalSteps}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="step-content">' +
                '{{#if (eq type "multiple-choice")}}' +
                    '<div class="row justify-content-center">' +
                        '{{#each options}}' +
                        '<div class="col-md-6 col-lg-4 mb-3">' +
                            '<button class="btn btn-outline-secondary btn-lg btn-block choice-btn h-100" data-choice="{{this}}">' +
                                '{{this}}' +
                            '</button>' +
                        '</div>' +
                        '{{/each}}' +
                    '</div>' +
                '{{/if}}' +
                '{{#if (eq type "text")}}' +
                    '<div class="row justify-content-center">' +
                        '<div class="col-md-6">' +
                            '<div class="form-group">' +
                                '<input type="number" class="form-control form-control-lg text-center" id="number-input" placeholder="{{placeholder}}" min="1" max="10">' +
                                '<button class="btn btn-primary btn-lg mt-3" id="submit-number">' +
                                    'Next' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '{{/if}}' +
                '{{#if (eq type "image-selection")}}' +
                    '<div class="row justify-content-center">' +
                        '{{#each imageOptions}}' +
                        '<div class="col-md-4 mb-3">' +
                            '<div class="image-choice" data-image-index="{{@index}}">' +
                                '<img src="{{url}}" class="img-fluid rounded" alt="{{label}}">' +
                                '<p class="mt-2">{{label}}</p>' +
                            '</div>' +
                        '</div>' +
                        '{{/each}}' +
                    '</div>' +
                '{{/if}}' +
            '</div>' +
        '</div>'
    );

    // Good choice message
    this.templates.goodChoice = Handlebars.compile(
        '<div class="confirmation-overlay">' +
            '<div class="confirmation-message text-center">' +
                '<div class="confirmation-icon mb-3">✅</div>' +
                '<h3>{{message}}</h3>' +
            '</div>' +
        '</div>'
    );

    // Help message popup
    this.templates.helpMessage = Handlebars.compile(
        '<div class="feedback-overlay">' +
            '<div class="feedback-modal text-center">' +
                '<div class="feedback-icon mb-3">💡</div>' +
                '<h4 class="mb-3">Tip!</h4>' +
                '<p class="mb-4">{{message}}</p>' +
                '<button class="btn btn-primary btn-lg" id="got-it-btn">' +
                    'Got it!' +
                '</button>' +
            '</div>' +
        '</div>'
    );

    // Order info box
    this.templates.orderInfo = Handlebars.compile(
        '<div class="order-summary">' +
            '<h4 class="mb-3">📋 Your Orders {{#if orderCount}}({{orderCount}}){{/if}}</h4>' +
            '{{#if name}}' +
            '<div class="mb-3">' +
                '<strong>Customer:</strong> {{name}}' +
            '</div>' +
            '{{/if}}' +
            
            '{{#if completedOrders}}' +
            '<div class="completed-orders mb-3">' +
                '<h6 class="text-success">✅ Completed Orders:</h6>' +
                '{{#each completedOrders}}' +
                '<div class="order-item mb-2 p-2 bg-light rounded">' +
                    '<small class="text-muted">Order #{{id}} - {{completedAt}}</small>' +
                    '<div><strong>{{burgerName}}</strong></div>' +
                    '<small class="text-muted">{{choices.step1}}, {{choices.step4}}</small>' +
                '</div>' +
                '{{/each}}' +
            '</div>' +
            '{{/if}}' +
            
            '{{#if burgerName}}' +
            '<div class="current-order mb-3">' +
                '<h6 class="text-primary">🔄 Current Order:</h6>' +
                '<div class="mb-2">' +
                    '<strong>{{burgerName}}</strong>' +
                '</div>' +
                '{{#if choices}}' +
                '<div class="selections">' +
                    '<small class="text-muted">Progress:</small>' +
                    '<ul class="list-unstyled mt-1">' +
                        '{{#each choices}}' +
                        '<li class="mb-1">' +
                            '<small class="text-muted">{{@key}}:</small> {{this}}' +
                        '</li>' +
                        '{{/each}}' +
                    '</ul>' +
                '</div>' +
                '{{/if}}' +
            '</div>' +
            '{{/if}}' +
            
            '{{#unless name}}' +
            '<p class="text-muted">Enter your name to start...</p>' +
            '{{/unless}}' +
        '</div>'
    );

    // Final page
    this.templates.finalPage = Handlebars.compile(
        '<div class="final-message text-center">' +
            '<div class="final-icon mb-4">' +
                '{{#if done}}' +
                    '🎉' +
                '{{else}}' +
                    '😅' +
                '{{/if}}' +
            '</div>' +
            '<h2 class="mb-4">{{message}}</h2>' +
            '{{#unless done}}' +
                '<div class="mb-4">' +
                    '<p class="text-white-50">Don\'t worry! You can still place your order with the choices you\'ve made.</p>' +
                '</div>' +
            '{{/unless}}' +
            '<div class="final-actions">' +
                '{{#unless done}}' +
                    '<button class="btn btn-warning btn-lg me-3" id="order-anyway-btn">' +
                        '🍔 Order Anyway' +
                    '</button>' +
                '{{/unless}}' +
                '<button class="btn btn-success btn-lg me-3" id="new-order-btn">' +
                    'Order Again' +
                '</button>' +
                '<button class="btn btn-secondary btn-lg" id="go-home-btn">' +
                    'Go Home' +
                '</button>' +
            '</div>' +
        '</div>'
    );

    // Set up helpers
    this.setupHelpers();
};

// Helper functions for templates
BurgerView.prototype.setupHelpers = function() {
    Handlebars.registerHelper('eq', function(a, b) {
        return a === b;
    });

    Handlebars.registerHelper('add', function(a, b) {
        return a + b;
    });
};

// Make the main page
BurgerView.prototype.makeApp = function(content, orderInfo) {
    return this.templates.mainPage({
        content: content,
        orderInfo: orderInfo
    });
};

// Make welcome page
BurgerView.prototype.makeWelcome = function() {
    return this.templates.welcomePage();
};

// Make burger menu
BurgerView.prototype.makeBurgerMenu = function(name, burgers) {
    return this.templates.burgerMenu({
        name: name,
        burgers: burgers
    });
};

// Make step page
BurgerView.prototype.makeStep = function(step, stepNum, totalSteps) {
    return this.templates.stepPage({
        id: step.id,
        type: step.type,
        instruction: step.instruction,
        options: step.options,
        placeholder: step.placeholder,
        imageOptions: step.imageOptions,
        stepNum: stepNum + 1,
        totalSteps: totalSteps,
        percent: ((stepNum + 1) / totalSteps) * 100
    });
};

// Make confirmation message
BurgerView.prototype.makeConfirmation = function(message) {
    return this.templates.goodChoice({ message: message });
};

// Make feedback popup
BurgerView.prototype.makeFeedback = function(message) {
    return this.templates.helpMessage({ message: message });
};

// Make order info box
BurgerView.prototype.makeOrderInfo = function(order, completedOrders, orderCount) {
    // Make choices look nicer
    var niceChoices = {};
    if (order.choices) {
        for (var key in order.choices) {
            var niceName = key.replace('step', 'Step ');
            niceChoices[niceName] = order.choices[key];
        }
    }

    return this.templates.orderInfo({
        name: order.name,
        burgerName: order.burgerName,
        choices: niceChoices,
        completedOrders: completedOrders,
        orderCount: orderCount
    });
};

// Make final page
BurgerView.prototype.makeFinal = function(name, done) {
    var message = '';
    if (done) {
        message = 'Thank you, ' + name + '! Your burger is on the grill!';
    } else {
        message = 'Oops, ' + name + '! You skipped some steps. Want to try again?';
    }

    return this.templates.finalPage({
        message: message,
        done: done
    });
};

// Show good choice message
BurgerView.prototype.showGoodChoice = function(message) {
    var popup = document.createElement('div');
    popup.className = 'confirmation-overlay-container';
    popup.innerHTML = this.makeConfirmation(message);
    document.body.appendChild(popup);

    setTimeout(function() {
        popup.remove();
    }, 1000);
};

// Show help message
BurgerView.prototype.showHelp = function(message, callback) {
    var popup = document.createElement('div');
    popup.className = 'feedback-overlay-container';
    popup.innerHTML = this.makeFeedback(message);
    document.body.appendChild(popup);

    // When user clicks "Got it"
    var gotItBtn = popup.querySelector('#got-it-btn');
    gotItBtn.addEventListener('click', function() {
        popup.remove();
        if (callback) {
            callback();
        }
    });
};

// Change main content
BurgerView.prototype.changeContent = function(html) {
    var mainArea = document.getElementById('main-area');
    if (mainArea) {
        mainArea.innerHTML = html;
    }
};

// Update order box
BurgerView.prototype.updateOrderBox = function(order, completedOrders, orderCount) {
    var orderBox = document.getElementById('order-box');
    if (orderBox) {
        orderBox.innerHTML = this.makeOrderInfo(order, completedOrders, orderCount);
    }
};

// Start the app
BurgerView.prototype.startApp = function() {
    var appDiv = document.getElementById('app');
    var orderInfo = this.makeOrderInfo({}, [], 0);
    var content = this.makeWelcome();
    
    appDiv.innerHTML = this.makeApp(content, orderInfo);
};
