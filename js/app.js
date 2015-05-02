// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
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

    .state('app.editmyplan', {
        url: "/editmyplan/:id",
        views: {
            'menuContent': {
                templateUrl: "templates/editmyplan.html",
                controller: 'EditMyplanCtrl'
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
        .state('app.frmproperty', {
            url: "/frmproperty",
            views: {
                'menuContent': {
                    templateUrl: "templates/frmproperty.html",
                    controller: 'FrmPropertyCtrl'
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
        url: "/checkcarloan/:appid",
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
            url: "/homechk/:appid",
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
        .state('app.contactus', {
            url: "/contactus",
            views: {
                'menuContent': {
                    templateUrl: "templates/contactus.html",
                    controller: 'ContactusCtrl'
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
        url: "/propertychk-form/:appid",
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

    .state('app.constructform', {
        url: "/constructform",
        views: {
            'menuContent': {
                templateUrl: "templates/formconstrctsme.html",
                controller: 'ConstructFormCtrl'
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
        .state('app.smeproject', {
            url: "/smeproject",
            views: {
                'menuContent': {
                    templateUrl: "templates/smeproject.html",
                    controller: 'SmeProjectCtrl'
                }
            }
        })
        .state('app.smebussniess', {
            url: "/smebussniess",
            views: {
                'menuContent': {
                    templateUrl: "templates/smebussniess.html",
                    controller: 'SmeBussniessCtrl'
                }
            }
        })
        .state('app.health', {
            url: "/health",
            views: {
                'menuContent': {
                    templateUrl: "templates/health.html",
                    controller: 'HealthCtrl'
                }
            }
        })
        .state('app.commericial', {
            url: "/commericial",
            views: {
                'menuContent': {
                    templateUrl: "templates/commericial.html",
                    controller: 'CommericialCtrl'
                }
            }
        })
        .state('app.smefiles', {
            url: "/smefiles",
            views: {
                'menuContent': {
                    templateUrl: "templates/smefiles.html",
                    controller: 'SmeFilesCtrl'
                }
            }
        })
        .state('app.geniedeal', {
            url: "/geniedeal",
            views: {
                'menuContent': {
                    templateUrl: "templates/geinedeal.html",
                    controller: 'GenieDealCtrl'
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
        url: "/securitychkform/:appid",
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
        url: "/twowheeler-chk/:appid",
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
        url: "/personal-chk/:appid",
        views: {
            'menuContent': {
                templateUrl: "templates/form-check-personal.html",
                controller: 'PersonalChkCtrl'
            }
        }
    })

    .state('app.refer-property', {
        url: "/refer-property",
        views: {
            'menuContent': {
                templateUrl: "templates/refer-property.html",
                controller: 'ReferPropertyCtrl'
            }
        }
    })
        .state('app.refer-earn', {
            url: "/refer-earn",
            views: {
                'menuContent': {
                    templateUrl: "templates/refer-earn.html",
                    controller: 'ReferEarnCtrl'
                }
            }
        })
        .state('app.referaldetails', {
            url: "/referaldetails",
            views: {
                'menuContent': {
                    templateUrl: "templates/referaldetails.html",
                    controller: 'ReferalDetailsCtrl'
                }
            }
        })
        .state('app.refer', {
            url: "/refer",
            views: {
                'menuContent': {
                    templateUrl: "templates/refer.html",
                    controller: 'ReferCtrl'
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
})

.filter('bankimagepath', function() {
    return function(input) {
        return "http://demo.bestdealfinance.com/images/" + input;
    };
});
var formvalidation = function(allvalidation) {
    var isvalid2 = true;
    for (var i = 0; i < allvalidation.length; i++) {
        console.log("checking");
        console.log(allvalidation[i].field);
        if (allvalidation[i].field == "" || !allvalidation[i].field || allvalidation[i].field == "Please select") {
            allvalidation[i].validation = "ng-dirty";
            isvalid2 = false;
        }
    }
    return isvalid2;
};

var getjsononly = function(myjson) {
    var msjon = [];
    console.log(angular.fromJson(myjson));
    
    return msjon;
};

var age = function(birthdate) {


    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function monthDiff(d1, d2) {
        if (d1 < d2) {
            var months = d2.getMonth() - d1.getMonth();
            return months <= 0 ? 0 : months;
        }
        return 0;
    }
    var age = calculateAge(birthdate);
    if (age == 0)
        return monthDiff(birthdate, new Date()) + ' months';
    return age;
};