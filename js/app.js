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
        .state('app.myaccount', {
            url: "/myaccount",
            views: {
                'menuContent': {
                    templateUrl: "templates/myaccount.html",
                    controller: 'MyAccountCtrl'
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
        .state('app.creditapply', {
            url: "/creditapply",
            views: {
                'menuContent': {
                    templateUrl: "templates/creditapply.html",
                    controller: 'CreditApplyCtrl'
                }
            }
        })

    .state('app.credit', {
        url: "/credit",
        views: {
            'menuContent': {
                templateUrl: "templates/formcredit.html",
                controller: 'CreditCtrl'
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

    .state('app.checkcarloan', {
            url: "/checkcarloan",
            views: {
                'menuContent': {
                    templateUrl: "templates/checkcarloan.html",
                    controller: 'CheckCarLoanCtrl'
                }
            }
        })
        .state('app.carapply', {
            url: "/carapply",
            views: {
                'menuContent': {
                    templateUrl: "templates/carapply.html",
                    controller: 'CarApplyCtrl'
                }
            }
        })
        .state('app.carchklist', {
            url: "/carchklist",
            views: {
                'menuContent': {
                    templateUrl: "templates/carchklist.html",
                    controller: 'CarChkListCtrl'
                }
            }
        })
        .state('app.homeloan', {
            url: "/homeloan",
            views: {
                'menuContent': {
                    templateUrl: "templates/formhomeloans.html",
                    controller: 'HomeLoansCtrl'
                }
            }
        })
        .state('app.homechk', {
            url: "/homechk",
            views: {
                'menuContent': {
                    templateUrl: "templates/homechk.html",
                    controller: 'HomeChkCtrl'
                }
            }
        })
        .state('app.homeapply', {
            url: "/homeapply",
            views: {
                'menuContent': {
                    templateUrl: "templates/homeapply.html",
                    controller: 'HomeApplyCtrl'
                }
            }
        })
        .state('app.homechklist', {
            url: "/homechklist",
            views: {
                'menuContent': {
                    templateUrl: "templates/homechklist.html",
                    controller: 'HomeChkListCtrl'
                }
            }
        })


    .state('app.twowheelerloan', {
        url: "/twowheelerloan",
        views: {
            'menuContent': {
                templateUrl: "templates/form-twowheeler.html",
                controller: 'TwowheelerLoanCtrl'
            }
        }
    })

    .state('app.propertyloan', {
        url: "/propertyloan",
        views: {
            'menuContent': {
                templateUrl: "templates/form-properties.html",
                controller: 'PropertyLoanCtrl'
            }
        }
    })

    .state('app.propertychk', {
        url: "/propertychk",
        views: {
            'menuContent': {
                templateUrl: "templates/property-chk.html",
                controller: 'PropertychkCtrl'
            }
        }
    })

    .state('app.propertychk-form', {
            url: "/propertychk-form",
            views: {
                'menuContent': {
                    templateUrl: "templates/propertychk-form.html",
                    controller: 'PropertychkformCtrl'
                }
            }
        })
        .state('app.propertyformapply', {
            url: "/propertyformapply",
            views: {
                'menuContent': {
                    templateUrl: "templates/propertyformapply.html",
                    controller: 'PropertyapplyCtrl'
                }
            }
        })

    .state('app.securityloan', {
        url: "/securityloan",
        views: {
            'menuContent': {
                templateUrl: "templates/form-security.html",
                controller: 'SecurityLoanCtrl'
            }
        }
    })

    .state('app.securitychk', {
        url: "/securitychk",
        views: {
            'menuContent': {
                templateUrl: "templates/security-chk.html",
                controller: 'SecuritychkCtrl'
            }
        }
    })

    .state('app.securitychk-form', {
        url: "/securitychkform",
        views: {
            'menuContent': {
                templateUrl: "templates/securitychk-form.html",
                controller: 'SecuritychkformCtrl'
            }
        }
    })

    .state('app.securityformapply', {
        url: "/securityformapply",
        views: {
            'menuContent': {
                templateUrl: "templates/securityformapply.html",
                controller: 'SecurityapplyCtrl'
            }
        }
    })

    .state('app.twowheelerlistchk', {
        url: "/twowheelerlistchk",
        views: {
            'menuContent': {
                templateUrl: "templates/twowheelerchklist.html",
                controller: 'TwowheelerListCtrl'
            }
        }
    })

    .state('app.twowheeler-chk', {
        url: "/twowheeler-chk",
        views: {
            'menuContent': {
                templateUrl: "templates/twowheeler-chk.html",
                controller: 'TwowheelerchkCtrl'
            }
        }
    })

    .state('app.twowheeler-apply', {
        url: "/twowheelerapply",
        views: {
            'menuContent': {
                templateUrl: "templates/twowheeler-apply.html",
                controller: 'TwowheelerapplyCtrl'
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