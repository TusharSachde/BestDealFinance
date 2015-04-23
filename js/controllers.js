angular.module('starter.controllers', ['myservices'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $location) {

    //  DECLARATION

    //  ON LOGOUT FUNCTION
    $scope.logoutuser = function () {
        MyServices.flushuser();
        $location.url("/login");
    }

    if (!MyServices.getuser()) {
        $location.url("/login");
    }

    //  GET STATE
    var statesuccess = function (data, status) {
        $scope.states = data.Data;
    }
    MyServices.getdropdownstate().success(statesuccess);

    //  GET MANUFACTURER
    var manufacturersuccess = function (data, status) {
        $scope.manufacturers = data.Data;
    }
    MyServices.getdropdownmanufacturer().success(manufacturersuccess);

    //  GET MODEL
    var modelsuccess = function (data, status) {
        console.log(data);
        $scope.models = data.Data;
    }
    MyServices.getmodel().success(modelsuccess);

    //  GET OCCUPATION
    var ocupationsuccess = function (data, status) {
        $scope.occupations = data.Data;
    }
    MyServices.getocupation().success(ocupationsuccess);

    //  GET COMPANY
    //    var companysuccess = function (data, status) {
    //        $scope.companies = data.Data;
    //    }
    //    MyServices.getcompany().success(companysuccess);

})

.controller('LoginCtrl', function ($scope, $stateParams, MyServices, $location, $ionicPopup, $timeout) {
    //  DECLARATION
    $scope.login = [];
    $scope.allvalidation = [];

    //  AUTHENTICATE JSTORAGE
    MyServices.flushuser();
    if (MyServices.getuser()) {
        $location.url("/app/home");
    }


    //  TESTING
    var catsuccess = function (data, status) {
        console.log(data);
    }
    MyServices.getcategories().success(catsuccess);

    //  USER LOGIN
    var loginsuccess = function (data, status) {
        console.log(data);
        if (data.msg == "fail") {
            var myPopup = $ionicPopup.show({
                title: data.msgText,
                scope: $scope,
            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        } else {
            MyServices.setuser(data.Data);
            $location.url("/app/home");
        }
    }
    $scope.userlogin = function (login) {

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

.controller('RegisterCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $location, $timeout, $ionicModal, $interval, $ionicLoading) {

    //  DECARATION
    $scope.register = [];
    $scope.allvalidation = [];
    $scope.minutes = 5;
    $scope.seconds = 0;
    $scope.otpdata = [];

    //  USER REGISTRATION
    var registersuccess = function (data, status) {
        console.log(data);
        if (data.msg == "Dup") {
            var myPopup = $ionicPopup.show({
                title: "Already registered with this details",
                scope: $scope,
            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        } else if (data.msg == "success") {
            $scope.modal.hide
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
    $scope.userregister = function (register) {

        //        $scope.register.pushwooshid = "123456789596666";
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
    }).then(function (modal) {
        $scope.modal = modal;
    });


    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    //  SUBMIT OTP
    var validateotpsuccess = function (data, status) {
        console.log(data);
        $ionicLoading.hide();
        if (data.msg == "success") {
            $scope.modal.hide();
            $location.url("/login");
        } else {
            var myPopup = $ionicPopup.show({
                title: data.msg,
                scope: $scope,
            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }
    }
    $scope.otpsubmit = function (otpdata) {
        console.log("otp otp");
        console.log($scope.register.enq_password1);
        $scope.allvalidation = [{
            field: $scope.otpdata.userotp,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            $scope.userotp = otpdata.userotp;
            $scope.otpdata.mobile = $scope.register.enq_mobile;
            $scope.otpdata.password = $scope.register.enq_password1;
            console.log("otp data");
            console.log($scope.otpdata);
            $ionicLoading.show({
                template: 'Please wait...'
            });
            MyServices.validateotp($scope.otpdata).success(validateotpsuccess);
        };

    }
})

.controller('ForgotCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {

    //  DECLARATION
    $scope.allvalidation = [];
    $scope.forgot = [];

    //  ON FORGOT PASSWORD
    var forgotsuccess = function (data, status) {
        console.log(data);
        if (data.msg == "success") {
            var myPopup = $ionicPopup.show({
                title: "Your new password has been sent on your registered email id",
                scope: $scope,
            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
                $location.url("/login");
            }, 1500);
        } else {
            var myPopup1 = $ionicPopup.show({
                title: data.msg,
                scope: $scope,
            });
            $timeout(function () {
                myPopup1.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }

    }
    $scope.userforgotpassword = function (forgot) {
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

.controller('HomeCtrl', function ($scope, $stateParams) {})

.controller('MyplanCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {

    //  DECLARATION
    $scope.plan = [];
    $scope.planlist = [];
    $scope.plan.plandate = new Date();
    $scope.plan.plandate = $filter('date')($scope.plan.plandate, "dd-MM-yyyy");;
    $scope.planingfor = MyServices.getplaningfor();
    $scope.plan.planingfor = $scope.planingfor[0].text;
    $ionicLoading.show({
        template: 'Please wait...'
    });

    //  CHANGE TAB
    $scope.changetab = function (planfor) {
        for (var i = 0; i < $scope.planingfor.length; i++) {
            $scope.planingfor[i].select = "";
        }

        planfor.select = "selected";
        $scope.plan.planingfor = planfor.text;
    }

    //  GET ALL USER PLANS
    var listplansuccess = function (data, status) {
        console.log(data);
        $scope.planlist = data.Data;
        $ionicLoading.hide();
    }
    MyServices.listallmyplans().success(listplansuccess);

    //  INSERT USER PLAN
    var plansuccess = function (data, status) {
        console.log(data);
        var myPopup1 = $ionicPopup.show({
            title: data.msg,
            scope: $scope,
        });
        $timeout(function () {
            myPopup1.close(); //close the popup after 3 seconds for some reason
            $location.url("/app/listplan");
        }, 1500);
    }
    $scope.inserplan = function (plan) {
        $scope.allvalidation = [{
            field: $scope.plan.planame,
            validation: ""
        }, {
            field: $scope.plan.planamount,
            validation: ""
        }, {
            field: $scope.plan.plandate,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            $scope.plan.plandate = $filter('date')($scope.plan.plandate, "yyyy-MM-dd");
            MyServices.Insertmyplans($scope.plan).success(plansuccess);
        };

    }

    //  DELETE PLAN
    var deleteplansuccess = function (data, status) {
        console.log(data);
        MyServices.listallmyplans().success(listplansuccess);
        var myPopup1 = $ionicPopup.show({
            title: data.msg,
            scope: $scope,
        });
        $timeout(function () {
            myPopup1.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    }
    $scope.deleteplan = function (planid) {
        console.log(planid);
        MyServices.daletetmyplans(planid).success(deleteplansuccess);
    }
})

.controller('EditMyplanCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {

    //  DECLARATION
    $scope.plan = [];
    $scope.planlist = [];
    $scope.plan.plandate = new Date();
    $scope.plan.plandate = $filter('date')($scope.plan.plandate, "dd-MM-yyyy");
    $scope.planingfor = MyServices.getplaningfor();
    $scope.plan.planingfor = $scope.planingfor[0].text;
    //    $ionicLoading.show({
    //        template: 'Please wait...'
    //    });

    //  CHANGE TAB
    $scope.changetab = function (planfor) {
        for (var i = 0; i < $scope.planingfor.length; i++) {
            $scope.planingfor[i].select = "";
        }

        planfor.select = "selected";
        $scope.plan.planingfor = planfor.text;
    }

    //  GET SINGLE PLAN
    var singleplansuccess = function (data, status) {
        console.log(data);
        $scope.plan = data.Data[0];
        $scope.plan.planame = data.Data[0].planname;
        for (var i = 0; i < $scope.planingfor.length; i++) {
            if ($scope.planingfor[i].text == data.Data[0].planingfor) {
                $scope.planingfor[i].select = "selected";
            } else {
                $scope.planingfor[i].select = "";
            }
        }
    }
    MyServices.mysingleplan($stateParams.id).success(singleplansuccess);

    //  UPDATE PLAN
    var updatesuccess = function (data, status) {
        console.log(data);
        var myPopup1 = $ionicPopup.show({
            title: data.msg,
            scope: $scope,
        });
        $timeout(function () {
            myPopup1.close(); //close the popup after 3 seconds for some reason
            $location.url("/app/listplan");
        }, 1500);
    }
    $scope.updateplan = function () {
        $scope.allvalidation = [{
            field: $scope.plan.planame,
            validation: ""
        }, {
            field: $scope.plan.planamount,
            validation: ""
        }, {
            field: $scope.plan.plandate,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            $scope.plan.plandate = $filter('date')($scope.plan.plandate, "yyyy-MM-dd");
            MyServices.updatetmyplans($scope.plan).success(updatesuccess);
        };

    }

})

.controller('FinanceCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {

    //  DECLARATION
    $scope.categories = [];


    //  GET CATEGORIES
    var categorysuccess = function (data, status) {
        console.log(data);
        $scope.categories = data.Data;
    }
    MyServices.getcategories().success(categorysuccess);


})

.controller('GenieCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})

.controller('LoanCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('CheckCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {

        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var plsuccess = function (data, status) {
            console.log(data.Data.num);
            $ionicLoading.hide();
            if (data.Response != "Success") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/personal");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.stepawaypl().success(plsuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function (check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/personal-chk/" + $scope.appid);
        }


    })
    //DHAVAL START
    .controller('TwowheelerListCtrl', function($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {
    
        
        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var plsuccess = function(data, status) {
            console.log(data);
            $ionicLoading.hide();
            if (data.Response != "Success") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function() {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/twowheelerloan");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.stepawaytw().success(plsuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function(check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/personal-chk/" + $scope.appid);
        }


})
    //DHAVAL END
    .controller('TwowheelerchkCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('TwowheelerapplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('SecuritychkCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('SecuritychkformCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('SecurityapplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('PropertychkCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('PropertychkformCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('PropertyapplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('CarApplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})

//  SAPANA STARTS
.controller('CarChkListCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {

        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var carsuccess = function (data, status) {
            console.log(data);
            $ionicLoading.hide();
            if (data.Response != "Success") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/carloan");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.stepawaycar().success(carsuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function (check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/personal-chk/" + $scope.appid);
        }


    })
    //  SAPANA ENDS
//SAPANA STARTS
    .controller('HomeChkListCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {
     //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var homesuccess = function (data, status) {
            console.log(data);
            $ionicLoading.hide();
            if (data.Response != "Success") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/homeloan");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.stepawayhome().success(homesuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function (check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/personal-chk/" + $scope.appid);
        }

})
//SAPANA ENDS
    .controller('HomeApplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('HomeChkCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
   .controller('CreditCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location,$filter) {
    
     $scope.creditloan = {
//            'enq_loanAmtTo': 20000,
//            'enq_tenureTo': 6,
            'enq_currIncomeTo': 15000,
//            'enq_is_salaried_ddl': 'No',
            'enq_dob': new Date()
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
    
        //  DECLARATION
        $scope.cities = [];
        $scope.allvalidation = [];
        $


        // GET ALL DROPDOWN
        var dropsuccess = function(data, status) {
            $scope.cities = data.Data;
        }
        MyServices.getdropdowncity().success(dropsuccess);

        
       $scope.datechange = function() {
            if (parseInt(age($scope.creditloan.enq_dob)) < 21) {
//                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 21",
                    scope: $scope,
                });
                $timeout(function() {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }


        }
       
               //  SELECT COMPANY
        $scope.selectcomp = function(comp) {
            console.log(comp);
            $scope.modal.hide();
            $scope.creditloan.enq_company_id = comp;
        }
       
         //  PERSONAL FIRST LOAN FORN SUBMIT
        var stepawayplsuccess = function(data, status) {
            console.log(data);
        }
        $scope.getmedeals = function(creditloan) {
            console.log(creditloan);
//            if (creditloan.enq_is_salaried_ddl != "no") {
//                creditloan.enq_occupation = "Salaried";
//            }
//            if ($scope.creditloan.salaried == "1") {
//                $scope.allvalidation = [ {
//                    field: $scope.creditloan.enq_currIncomeTo,
//                    validation: ""
//                }, {
//                    field: $scope.creditloan.enq_dob,
//                    validation: ""
//                }, {
//                    field: $scope.creditloan.enq_city,
//                    validation: ""
//                }, {
//                    field: $scope.creditloan.enq_is_salaried_ddl,
//                    validation: ""
//                },  {
//                    field: $scope.creditloan.enq_occupation,
//                    validation: ""
//                }
//                  ,                      {
//                    field: $scope.creditloan.enq_company_id,
//                    validation: ""
//                }];
//                var check = formvalidation($scope.allvalidation);
//            } else {
//                $scope.allvalidation = [ {
//                    field: $scope.creditloan.enq_currIncomeTo,
//                    validation: ""
//                }, {
//                    field: $scope.creditloan.enq_dob,
//                    validation: ""
//                }, {
//                    field: $scope.creditloan.enq_city,
//                    validation: ""
//                }, {
//                    field: $scope.creditloan.enq_is_salaried_ddl,
//                    validation: ""
//                }, {
//                    field: $scope.creditloan.enq_occupation,
//                    validation: ""
//                }];
//                var check = formvalidation($scope.allvalidation);
//            }
//
//            if (check) {
              
                creditloan.enq_dob = $filter('date')(creditloan.enq_dob, "dd-MM-yyyy");
                console.log(creditloan.enq_dob);
             creditloan.salary_credited_since = $filter('date')(creditloan.salary_credited_since, "dd-MM-yyyy");
                console.log(creditloan.salary_credited_since);
             creditloan.enq_staying_since = $filter('date')(creditloan.enq_staying_since, "dd-MM-yyyy");
                console.log(creditloan.enq_staying_since);

                MyServices.stepawayset(creditloan);
                $location.url("/app/creditapply");
               
//            };
        }

    
    })

/////code end ///////
    .controller('MyAccountCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $location) {

        //  DECLARATION
        $scope.returnsactive = "active";
        $scope.profile = "bold";
        $scope.user = [];

        //  DESIGN CODE
        $scope.changemyapp = function () {
            $scope.myapp = "bold";
            $scope.profile = "";
        }

        $scope.chnageprofile = function () {
            $scope.myapp = "";
            $scope.profile = "bold";
        }

        //  GET USER DETAILS
        $scope.user = MyServices.getuser();

    })
    .controller('ConstructFormCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModal = function () {
            $scope.modal.hide();
        };
    })
    .controller('CommericialCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('HealthCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('SmeBussniessCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('SmeProjectCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('SmeFilesCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('ReferPropertyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('ReferEarnCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('ReferalDetailsCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('CreditApplyCtrl', function($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {
    
    //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var ccsuccess = function(data, status) {
            console.log("string strin");
            console.log(data);
            console.log(JSON.parse(data.Data));
            $ionicLoading.hide();
            if (data.Message != "Success Message") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function() {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/creditapply");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = JSON.parse(data.Data);
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.stepawaycc().success(ccsuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function(check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/personal-chk/" + $scope.appid);
        }
    
})

    //  MAHESH END
    .controller('ReferCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('GenieDealCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('ContactusCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('PersonalLoanCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter) {

        //        console.log(age());

        //  DESIGN CODE
        $scope.personal = {
            'enq_loanAmtTo': 20000,
            'enq_tenureTo': 6,
            'enq_currIncomeTo': 15000,
            'enq_is_salaried_ddl': 'No',
            'enq_dob': new Date()
        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        //  DECLARATION
        $scope.cities = [];
        $scope.allvalidation = [];
        $


        // GET ALL DROPDOWN
        var dropsuccess = function (data, status) {
            $scope.cities = data.Data;
        }
        MyServices.getdropdowncity().success(dropsuccess);

        //  SELECT COMPANY
        $scope.selectcomp = function (comp) {
            console.log(comp);
            $scope.modal.hide();
            $scope.personal.enq_company_id = comp;
        }

        $scope.datechange = function () {
            if (parseInt(age($scope.personal.enq_dob)) < 21) {
                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 21",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }


        }


        //  PERSONAL FIRST LOAN FORN SUBMIT
        var stepawayplsuccess = function (data, status) {
            console.log(data);
        }
        $scope.getmedeals = function (personal) {
            console.log(personal);
            if (personal.enq_is_salaried_ddl != "no") {
                personal.enq_occupation = "Salaried";
            }
            if ($scope.personal.salaried == "1") {
                $scope.allvalidation = [{
                    field: $scope.personal.enq_loanAmtTo,
                    validation: ""
                }, {
                    field: $scope.personal.enq_tenureTo,
                    validation: ""
                }, {
                    field: $scope.personal.enq_currIncomeTo,
                    validation: ""
                }, {
                    field: $scope.personal.enq_dob,
                    validation: ""
                }, {
                    field: $scope.personal.enq_city,
                    validation: ""
                }, {
                    field: $scope.personal.enq_is_salaried_ddl,
                    validation: ""
                }, {
                    field: $scope.personal.enq_company_id,
                    validation: ""
                }];
                var check = formvalidation($scope.allvalidation);
            } else {
                $scope.allvalidation = [{
                    field: $scope.personal.enq_loanAmtTo,
                    validation: ""
                }, {
                    field: $scope.personal.enq_tenureTo,
                    validation: ""
                }, {
                    field: $scope.personal.enq_currIncomeTo,
                    validation: ""
                }, {
                    field: $scope.personal.enq_dob,
                    validation: ""
                }, {
                    field: $scope.personal.enq_city,
                    validation: ""
                }, {
                    field: $scope.personal.enq_is_salaried_ddl,
                    validation: ""
                }, {
                    field: $scope.personal.enq_occupation,
                    validation: ""
                }];
                var check = formvalidation($scope.allvalidation);
            }

            if (check) {
                //                $scope.today = new Date();
                personal.enq_dob = $filter('date')(personal.enq_dob, "dd-MM-yyyy");
                console.log(personal.enq_dob);

                MyServices.stepawayset(personal);
                $location.url("/app/listcheckloan");
                //                MyServices.stepawaypl(personal).success(stepawayplsuccess);
            };
        }

    })
    //Sapana starts
    .controller('CarLoanCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter) {

        $scope.carloan = {
            'enq_loanAmtTo': 20000,
            'enq_tenureTo': 6,
            'enq_currIncomeTo': 15000,
            'enq_is_salaried_ddl': 'No',
            'enq_dob': new Date()

        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        //  SELECT COMPANY
        $scope.selectcomp = function (comp) {
                console.log(comp);
                $scope.modal.hide();
                $scope.carloan.enq_company_id = comp;
            }
            //Get model by manufacturer id
        var manufacuturesuccess = function (data, status) {
            $scope.models = data;
            console.log($scope.models);
        }
        $scope.manufacture_model = function (manuf_model) {
            console.log(manuf_model);
            MyServices.manufature_models(manuf_model).success(manufacuturesuccess);
        }
        $scope.datechange = function () {
            if (parseInt(age($scope.carloan.enq_dob)) < 21) {
                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 21",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
        }
        $scope.getmedeals = function (carloan) {
            console.log(carloan);
            //            if (carloan.enq_is_salaried_ddl != "no") {
            //                carloan.enq_occupation = "Salaried";
            //            }
            //            if ($scope.carloan.salaried == "1") {
            //                $scope.allvalidation = [{
            //                    field: $scope.carloan.enq_loanAmtTo,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_tenureTo,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_currIncomeTo,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_dob,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_city,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_is_salaried_ddl,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_company_id,
            //                    validation: ""
            //                }];
            //                var check = formvalidation($scope.allvalidation);
            //            } else {
            //                $scope.allvalidation = [{
            //                    field: $scope.carloan.enq_loanAmtTo,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_tenureTo,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_currIncomeTo,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_dob,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_city,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_is_salaried_ddl,
            //                    validation: ""
            //                }, {
            //                    field: $scope.carloan.enq_occupation,
            //                    validation: ""
            //                }];
            //                var check = formvalidation($scope.allvalidation);
            //            }

            //            if (check) {
            //                $scope.today = new Date();
            carloan.enq_dob = $filter('date')(carloan.enq_dob, "dd-MM-yyyy");
            console.log(carloan.enq_dob);

            MyServices.stepawayset(carloan);
            $location.url("/app/carchklist");
            //                MyServices.stepawaypl(personal).success(stepawayplsuccess);
            //            };
        }






   
    //sapana end

    })
//dhaval start
   .controller('TwowheelerLoanCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter) {

        $scope.twloan = {
//            'loan': 20000,
//            'tenure': 6,
//            'income': 15000
            'enq_loanAmtTo':5000,
            'enq_tenureTo':15,
            'enq_currIncomeTo':9874,
            'enq_dob': new Date(),
            
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
    
        
        //  DECLARATION
        $scope.cities = [];
        $scope.allvalidation = [];
        


        // GET ALL DROPDOWN
        var dropsuccess = function(data, status) {
            $scope.cities = data.Data;
        }
        MyServices.getdropdowncity().success(dropsuccess);
        //  SELECT COMPANY
        $scope.selectcomp = function(comp) {
            console.log(comp);
            $scope.modal.hide();
            $scope.twloan.enq_company_id = comp;
        }

        $scope.datechange = function() {
            if (parseInt(age($scope.twloan.enq_dob)) < 21) {
                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 21",
                    scope: $scope,
                });
                $timeout(function() {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }


        }
        
        var manufsuccess = function (data, status) {
            $scope.models = data;
            console.log($scope.models);
        }
        $scope.getmodel=function(manuf){
            console.log(manuf);
            MyServices.getmanumodel(manuf).success(manufsuccess);
        }
       
//        $scope.twloanshow=function(){
//             $scope.twloan.enq_dob = $filter('date')($scope.twloan.enq_dob, "dd-MM-yyyy");
//        console.log($scope.twloan.enq_dob);
//        
//            console.log($scope.twloan);
//        };
    
    $scope.twloanclick = function(twloan) {
            console.log(twloan);
//            if (twloan.enq_is_salaried_ddl != "no") {
//                twloan.enq_occupation = "Salaried";
//            }
//            if ($scope.twloan.salaried == "1") {
//                $scope.allvalidation = [{
//                    field: $scope.twloan.enq_loanAmtTo,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_tenureTo,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_currIncomeTo,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_dob,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_city,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_is_salaried_ddl,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_company_id,
//                    validation: ""
//                }];
//                var check = formvalidation($scope.allvalidation);
//            } else {
//                $scope.allvalidation = [{
//                    field: $scope.twloan.enq_loanAmtTo,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_tenureTo,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_currIncomeTo,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_dob,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_city,
//                    validation: ""
//                }, {
//                    field: $scope.twloan.enq_is_salaried_ddl,
//                    validation: ""
//                },,{
//                    field: $scope.twloan.enq_occupation,
//                    validation: ""
//                }];
//                var check = formvalidation($scope.allvalidation);
//            }
//
//            if (check) {
//                //                $scope.today = new Date();
                twloan.enq_dob = $filter('date')(twloan.enq_dob, "dd-MM-yyyy");
                console.log(twloan.enq_dob);

                MyServices.stepawayset(twloan);
                $location.url("/app/twowheelerlistchk");
                //                MyServices.stepawaypl(personal).success(stepawayplsuccess);
//            };
        }
    
    })

//  DHAVAL END
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
    .controller('PropertyLoanCtrl', function ($scope, $stateParams) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };

    })
    .controller('CheckCarLoanCtrl', function ($scope, $stateParams) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };

    })
    //sapana starts
    .controller('HomeLoansCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter) {

        $scope.homeloan = {
            'enq_loanAmtTo': 20000,
            'enq_tenureTo': 6,
            'enq_currIncomeTo': 15000,
            'enq_is_salaried_ddl': "No"

        };
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModal = function () {
            $scope.modal.hide();
        };
     //  SELECT COMPANY
        $scope.selectcomp = function (comp) {
            console.log(comp);
            $scope.modal.hide();
            $scope.homeloan.enq_company_id = comp;
        }

        $scope.datechange = function () {
            if (parseInt(age($scope.homeloan.enq_dob)) < 21) {
                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 21",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }


        }





        $scope.getmedeals = function (homeloan) {
            console.log(homeloan);
            
            
            homeloan.enq_dob = $filter('date')(homeloan.enq_dob, "dd-MM-yyyy");
            console.log(homeloan.enq_dob);
            
            MyServices.stepawayset(homeloan);
            $location.url("/app/homechklist");
        }
        
        $scope.cities = [];
        $scope.allvalidation = [];

        // GET ALL DROPDOWN
        var dropsuccess = function (data, status) {
            $scope.cities = data.Data;
        }
        MyServices.getdropdowncity().success(dropsuccess);


    })
    //sapana ends

.controller('PersonalChkCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter) {

    //  DECLARATION
    $scope.refine = [];
    $scope.refine.appid = $stateParams.appid;
    $scope.refine.enq_staying_since = new Date;
    $scope.refine.salary_credited_since = new Date;
    $scope.allvalidation = [];

    //  MODAL FOR BANK RELATIONSHIP
    $ionicModal.fromTemplateUrl('templates/bank.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal3 = modal;
    });
    $scope.showbank = function () {
        $scope.oModal3.show();
    };

    //  REFINE PERSONAL 
    var refinesuccess = function (data, status) {
        console.log(data);
    }
    $scope.refinepl = function () {
        $scope.allvalidation = [{
            field: $scope.refine.enq_gender,
            validation: ""
        }, {
            field: $scope.refine.enq_maritial_status,
            validation: ""
        }, {
            field: $scope.refine.enq_nationality,
            validation: ""
        }, {
            field: $scope.refine.enq_present_use_property,
            validation: ""
        }, {
            field: $scope.refine.enq_staying_since,
            validation: ""
        }, {
            field: $scope.refine.salary_credited_since,
            validation: ""
        }, {
            field: $scope.refine.pl_total_exp_job_years,
            validation: ""
        }, {
            field: $scope.refine.enq_have_loan_ddl,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            $scope.refine.enq_staying_since = $filter('date')($scope.refine.enq_staying_since, "yyyy-MM-dd");;
            $scope.refine.salary_credited_since = $filter('date')($scope.refine.salary_credited_since, "yyyy-MM-dd");;
            MyServices.refinestepawaypl($scope.refine).success(refinesuccess);
        };

    }


})

.controller('SMECtrl', function ($scope, $stateParams) {});
