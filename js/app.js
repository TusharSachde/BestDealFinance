// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Dont hide accesories
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
        }
        app.initialize();
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    .state('register', {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: 'RegisterCtrl'
    })

    .state('forgot', {
        url: "/forgot",
        templateUrl: "templates/forgot.html",
        controller: 'ForgotCtrl'
    })

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    })

    .state('app.myplan', {
        url: "/myplan",
        views: {
            'menuContent': {
                templateUrl: "templates/myplan.html",
                controller: 'MyplanCtrl'
            }
        }
    })

    .state('app.listplan', {
        url: "/listplan",
        views: {
            'menuContent': {
                templateUrl: "templates/listplan.html",
                controller: 'MyplanCtrl'
            }
        }
    })

    .state('app.finance', {
        url: "/finance",
        views: {
            'menuContent': {
                templateUrl: "templates/finance.html",
                controller: 'FinanceCtrl'
            }
        }
    })

    .state('app.sme', {
        url: "/sme",
        views: {
            'menuContent': {
                templateUrl: "templates/sme.html",
                controller: 'SMECtrl'
            }
        }
    })

    .state('app.genie', {
        url: "/genie",
        views: {
            'menuContent': {
                templateUrl: "templates/genie.html",
                controller: 'GenieCtrl'
            }
        }
    })

    .state('app.listgenie', {
        url: "/listgenie",
        views: {
            'menuContent': {
                templateUrl: "templates/listgenie.html",
                controller: 'GenieCtrl'
            }
        }
    })

    .state('app.listloan', {
        url: "/listloan",
        views: {
            'menuContent': {
                templateUrl: "templates/listloan.html",
                controller: 'LoanCtrl'
            }
        }
    })

    .state('app.listcheckloan', {
        url: "/listcheckloan",
        views: {
            'menuContent': {
                templateUrl: "templates/listcheckloan.html",
                controller: 'CheckCtrl'
            }
        }
    })

    //Loan FORMS
    .state('app.personal', {
        url: "/personal",
        views: {
            'menuContent': {
                templateUrl: "templates/form-personal.html",
                controller: 'PersonalLoanCtrl'
            }
        }
    })

    .state('app.carloan', {
        url: "/carloan",
        views: {
            'menuContent': {
                templateUrl: "templates/formcarloan.html",
                controller: 'CarLoanCtrl'
            }
        }
    })

    .state('app.personals', {
        url: "/personal-chk",
        views: {
            'menuContent': {
                templateUrl: "templates/form-check-personal.html",
                controller: 'PersonalChkCtrl'
            }
        }
    })

    .state('app.thankyou', {
        url: "/thankyou",
        views: {
            'menuContent': {
                templateUrl: "templates/thankyou.html",
                controller: 'AppCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});