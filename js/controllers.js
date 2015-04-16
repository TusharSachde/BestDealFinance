angular.module('starter.controllers', ['myservices'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $location) {

    //  DECLARATION

    //  ON LOGOUT FUNCTION
    $scope.logoutuser = function() {
        MyServices.flushuser();
        $location.url("/login");
    }

})

.controller('LoginCtrl', function($scope, $stateParams, MyServices, $location) {

    //  DECLARATION
    $scope.login = [];
    $scope.allvalidation = [];

    //  TESTING
    var catsuccess = function(data, status) {
        console.log(data);
    }
    MyServices.getcategories().success(catsuccess);

    //  USER LOGIN
    var loginsuccess = function(data, status) {
        console.log(data);
        if (data.msg == "fail") {
            var myPopup = $ionicPopup.show({
                title: data.msgText,
                scope: $scope,
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        } else {
            MyServices.setuser(data.Data);
            $location.url("/app/home");
        }
    }
    $scope.userlogin = function(login) {

        $scope.allvalidation = [{
            field: $scope.login.enq_username,
            validation: ""
        }, {
            field: $scope.login.enq_password,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            MyServices.userlogin(login).success(loginsuccess);
        };
    }

})

.controller('RegisterCtrl', function($scope, $stateParams, MyServices, $ionicPopup, $location, $timeout, $ionicModal, $interval) {

    //  DECARATION
    $scope.register = [];
    $scope.allvalidation = [];
    $scope.minutes = 5;
    $scope.seconds = 0;
    $scope.otpdata = [];

    //  USER REGISTRATION
    var registersuccess = function(data, status) {
        console.log(data);
        if (data.msg == "Dup") {
            var myPopup = $ionicPopup.show({
                title: "Already registered with this details",
                scope: $scope,
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        } else if (data.msg == "Success") {
            $location.url("/login");
        } else {
            $scope.otpdata = data;
            $scope.modal.show();
            $interval(callAtTimeout, 1000);
        }

        //  TIMER FUNCTION
        function callAtTimeout() {
            if ($scope.seconds == 0 && $scope.minutes == 0) {
                $scope.modal.hide();
            } else {
                if ($scope.seconds == 0) {
                    $scope.minutes = $scope.minutes - 1;
                    $scope.seconds = 60;
                    $scope.seconds = $scope.seconds - 1;
                } else {
                    $scope.seconds = $scope.seconds - 1;
                }
            }
        }
    }
    $scope.userregister = function(register) {

        $scope.modal.show();
        $scope.register.pushwooshid = "123456789596666";
        $scope.allvalidation = [{
            field: $scope.register.enq_name,
            validation: ""
        }, {
            field: $scope.register.enq_mobile,
            validation: ""
        }, {
            field: $scope.register.enq_email,
            validation: ""
        }, {
            field: $scope.register.enq_password1,
            validation: ""
        }, {
            field: $scope.register.password_again,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            MyServices.userregister(register).success(registersuccess);
        };
    }

    //  OTP MODAL
    $ionicModal.fromTemplateUrl('templates/confirmotp.html', {
        scope: $scope,
        animation: 'pop-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    //  SUBMIT OTP
    $scope.otpsubmit = function(otpdata) {
        console.log("otp otp");
        $scope.allvalidation = [{
            field: $scope.otpdata.userotp,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            $scope.userotp = otpdata.userotp;
            $scope.otpdata.mobile = $scope.register.enq_mobile;
            console.log($scope.otpdata);
            //        MyServices.validateotp()
        };

    }
})

.controller('ForgotCtrl', function($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {

    //  DECLARATION
    $scope.allvalidation = [];
    $scope.forgot = [];

    //  ON FORGOT PASSWORD
    var forgotsuccess = function(data, status) {
        console.log(data);
        if (data.msg == "success") {
            var myPopup = $ionicPopup.show({
                title: "Your new password has been sent on your registered email id",
                scope: $scope,
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
                $location.url("/login");
            }, 1500);
        } else {
            var myPopup1 = $ionicPopup.show({
                title: data.msg,
                scope: $scope,
            });
            $timeout(function() {
                myPopup1.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }

    }
    $scope.userforgotpassword = function(forgot) {
        $scope.allvalidation = [{
            field: $scope.forgot.email,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            MyServices.forgotpassword(forgot).success(forgotsuccess);
        };

    }

})

.controller('HomeCtrl', function($scope, $stateParams) {})

.controller('MyplanCtrl', function($scope, $stateParams) {})

.controller('FinanceCtrl', function($scope, $stateParams) {})

.controller('GenieCtrl', function($scope, $stateParams) {})

.controller('LoanCtrl', function($scope, $stateParams) {})
    .controller('CheckCtrl', function($scope, $stateParams) {})
    .controller('TwowheelerListCtrl', function($scope, $stateParams) {})
    .controller('TwowheelerchkCtrl', function($scope, $stateParams) {})
    .controller('TwowheelerapplyCtrl', function($scope, $stateParams) {})
    .controller('SecuritychkCtrl', function($scope, $stateParams) {})
    .controller('SecuritychkformCtrl', function($scope, $stateParams) {})
    .controller('SecurityapplyCtrl', function($scope, $stateParams) {})
    .controller('PropertychkCtrl', function($scope, $stateParams) {})
    .controller('PropertychkformCtrl', function($scope, $stateParams) {})
    .controller('PropertyapplyCtrl', function($scope, $stateParams) {})
    .controller('CarApplyCtrl', function($scope, $stateParams) {})
    .controller('CarChkListCtrl', function($scope, $stateParams) {})
    .controller('HomeChkListCtrl', function($scope, $stateParams) {})
    .controller('HomeApplyCtrl', function($scope, $stateParams) {})
    .controller('HomeChkCtrl', function($scope, $stateParams) {})
    .controller('CreditCtrl', function($scope, $stateParams, $ionicModal) {
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };
    })
    .controller('MyAccountCtrl', function($scope, $stateParams, MyServices, $ionicPopup, $location) {

        //  DECLARATION
        $scope.returnsactive = "active";
        $scope.profile = "bold";
        $scope.user = [];

        //  DESIGN CODE
        $scope.changemyapp = function() {
            $scope.myapp = "bold";
            $scope.profile = "";
        }

        $scope.chnageprofile = function() {
            $scope.myapp = "";
            $scope.profile = "bold";
        }

        //  GET USER DETAILS
        $scope.user = MyServices.getuser();

    })
    .controller('ConstructFormCtrl', function($scope, $stateParams, $ionicModal) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };
    })
    .controller('CommericialCtrl', function($scope, $stateParams) {})
    .controller('HealthCtrl', function($scope, $stateParams) {})
    .controller('SmeBussniessCtrl', function($scope, $stateParams) {})
    .controller('SmeProjectCtrl', function($scope, $stateParams) {})
    .controller('SmeFilesCtrl', function($scope, $stateParams) {})
    .controller('ReferPropertyCtrl', function($scope, $stateParams) {})
    .controller('ReferEarnCtrl', function($scope, $stateParams) {})
    .controller('ReferalDetailsCtrl', function($scope, $stateParams) {})
    .controller('CreditApplyCtrl', function($scope, $stateParams) {})
    .controller('ReferCtrl', function($scope, $stateParams) {})
    .controller('GenieDealCtrl', function($scope, $stateParams) {})
    .controller('ContactusCtrl', function($scope, $stateParams) {})
    .controller('PersonalLoanCtrl', function($scope, $stateParams, $ionicModal) {
        $scope.personal = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };
    })
    .controller('CarLoanCtrl', function($scope, $stateParams, $ionicModal) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

    })
    .controller('TwowheelerLoanCtrl', function($scope, $stateParams, $ionicModal) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };
    })
    .controller('SecurityLoanCtrl', function($scope, $stateParams, $ionicModal) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };
        //        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
        //            scope: $scope,
        //            animation: 'slide-in-up'
        //        }).then(function (modal) {
        //            $scope.modal = modal;
        //        });
        //
        //        $scope.openedit = function () {
        //            $scope.modal.show();
        //        }
        //
        //        $scope.closeModal = function () {
        //            $scope.modal.hide();
        //        };

    })
    .controller('PropertyLoanCtrl', function($scope, $stateParams) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };

    })
    .controller('CheckCarLoanCtrl', function($scope, $stateParams) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };

    })
    .controller('HomeLoansCtrl', function($scope, $stateParams, $ionicModal) {

        //        $scope.carloan = {
        //            'loan': 20000,
        //            'tenure': 6,
        //            'income': 15000
        //
        //        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

    })

.controller('PersonalChkCtrl', function($scope, $stateParams) {})

.controller('SMECtrl', function($scope, $stateParams) {});