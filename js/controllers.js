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
    //        console.log($scope.companies);
    //    }
    //    MyServices.getcompany().success(companysuccess);

    var companysuccess = function (data, status) {
        $scope.companies = data.Data;
    }
    $scope.doSearchCompany = function (datasearch) {
        if (datasearch.length >= 3) {
            MyServices.getcompany(datasearch).success(companysuccess);
        }
    }

    var citysuccess = function (data, status) {
        $scope.citie = data.Data;
    }
    $scope.doSearchCity = function (datasearch) {
            if (datasearch.length >= 3) {
                MyServices.getdropdowncity(datasearch).success(citysuccess);
            }
        }
        //  GET BANKS
    var banksuccess = function (data, status) {
        $scope.banks = data.Data;
        console.log(data);
    }
    MyServices.getbanks().success(banksuccess);

})

.controller('LoginCtrl', function ($scope, $stateParams, MyServices, $location, $ionicPopup, $timeout, $ionicLoading) {
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
        $ionicLoading.hide();
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
    $scope.login.enq_username = '';
    $scope.$watch('login.enq_username', function () {
        $scope.login.enq_username = $scope.login.enq_username.replace(/\s+/g, '');
    });
    $scope.clickcont = function () {
        $location.url("/contactus");
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
        //        if (navigator.network.connection.type == Connection.none) {
        //            var myPopup = $ionicPopup.show({
        //                title: 'No Internet Connection',
        //                scope: $scope,
        //            });
        //            $timeout(function () {
        //                myPopup.close(); //close the popup after 3 seconds for some reason
        //            }, 1500);
        //        } else {
        if (check) {
            $ionicLoading.show();
            MyServices.userlogin(login).success(loginsuccess);

        } else {
            var myPopup = $ionicPopup.show({
                title: 'Please Enter Username and Password!!',
                scope: $scope,
            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);

            //            }
        }
    }
})

.controller('RegisterCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $location, $timeout, $ionicModal, $interval, $ionicLoading, $filter) {

    //  DECARATION
    $scope.register = {'enq_dob': new Date()};
    $scope.allvalidation = [];
    $scope.minutes = 5;
    $scope.seconds = 0;
    $scope.otpdata = [];
    $scope.valid_date = false;
    //  USER REGISTRATION
    var age2 = function (birthdate) {


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
    $scope.datechange = function () {
        if (parseInt(age2($scope.register.enq_dob)) < 18) {
            console.log("chintoo");
            var myPopup1 = $ionicPopup.show({
                title: "Age should be Greater than 18",
                scope: $scope,
            });
            $timeout(function () {
                myPopup1.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        } else {
            $scope.valid_date = true;
        }
    }
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
    $scope.keypress = function ($event) {
        if ($event.keyCode >= 48 && $event.keyCode <= 57) {

        } else {
            $scope.register.enq_mobile = '';
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
        },{
            field: $scope.register.enq_dob,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if ($scope.valid_date == false) {
            var myPopup1 = $ionicPopup.show({
                title: "Age should be Greater than 18",
                scope: $scope,
            });
            $timeout(function () {
                myPopup1.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }
        if (check && $scope.valid_date == true) {
            registeruser = register;
            console.log(registeruser);
            console.log(register);
            MyServices.userregister(register).success(registersuccess);
        } else {
            var myPopup = $ionicPopup.show({
                title: "Please Enter Mandatory Fields!!"
            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }
    }

    //  OTP MODAL
    $ionicModal.fromTemplateUrl('templates/confirmotp.html', {
        scope: $scope,
        animation: 'pop-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.closeModalOTP = function () {
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
    $scope.resendclick = function () {
        console.log(registeruser);
        MyServices.userregister(registeruser).success(registersuccess);
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

.controller('HomeCtrl', function ($scope, $stateParams, $location) {
    $scope.clickcont = function () {
        $location.url("/contactus");
    }
})

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

.controller('GenieCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {

    var geniesuccess = function (data, status) {
        console.log(data);
        if (data.Message != "Fail message.") {
            $location.url("/app/listgenie");
            $scope.genielist = data;
        }
    }
    $scope.getgeniecat = function () {
        console.log("genie clicked");
        MyServices.getgeniecategory().success(geniesuccess);
    }
})

.controller('LoanCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {
        //    jagruti

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
        MyServices.refinestepawaypl().success(plsuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function (check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/thankyou");
        }



    })
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
    .controller('TwowheelerListCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {


        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var plsuccess = function (data, status) {
            console.log(data);
            $ionicLoading.hide();
            if (data.Response != "Success") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
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
        $scope.checkeligibility = function (data) {
            console.log(data);
            //MyServices.setcheck(check);
            $location.url("/app/twowheeler-chk/" + $scope.appid);
        }


    })


.controller('TwowheelerchkCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicModal, $filter) {

    $scope.refine = {};
    $scope.refine.appid = $stateParams.appid;
    console.log($scope.refine.appid);
    $scope.refine.enq_staying_since = new Date;
    $scope.refine.salary_credited_since = new Date;
    $scope.refine.enq_bank_ac_tw_since = new Date;
    $scope.allvalidation = [];

    //  MODAL FOR BANK RELATIONSHIP
    $ionicModal.fromTemplateUrl('templates/bank.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal3 = modal;
    });
    //        $scope.showbank = function () {
    //            $scope.oModal3.show();
    //        };

    //  REFINE PERSONAL 
    $scope.show_hide = function () {
        if ($scope.refine.enq_have_loan_ddl == "Yes")
            $scope.show = 1;
        else
            $scope.show = 0;
    }
    $scope.bs_show = function () {
        if ($scope.refine.enq_bank_ac_tw == "Yes")
            $scope.showbs = 1;
        else
            $scope.showbs = 0;
    }

    var refinesuccess = function (data, status) {
        console.log(data);
    }
    $scope.refinetw = function () {
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
            field: $scope.refine.salary_credited_since,
            validation: ""
                        }, {
            field: $scope.refine.enq_staying_since,
            validation: ""
                        }, {
            field: $scope.refine.enq_bank_ac_tw,
            validation: ""
                        }, {
            field: $scope.refine.enq_bank_ac_tw_since,
            validation: ""
                        }, {
            field: $scope.refine.enq_have_loan_ddl,
            validation: ""
                        }, {
            field: $scope.refine.enq_emi_existing_loan,
            validation: ""
                        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            $scope.refine.enq_staying_since = $filter('date')($scope.refine.enq_staying_since, "yyyy-MM-dd");
            $scope.refine.salary_credited_since = $filter('date')($scope.refine.salary_credited_since, "yyyy-MM-dd");
            $scope.refine.enq_bank_ac_tw_since = $filter('date')($scope.refine.enq_bank_ac_tw_since, "yyyy-MM-dd");

            console.log($scope.refine);
            MyServices.refinestepawayset($scope.refine);
            $location.url("/app/twowheelerapply");

        };
    }

})


.controller('TwowheelerapplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {

        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var twsuccess = function (data, status) {
            //console.log(data.Data.num);
            $ionicLoading.hide();
            if (data.Response != "Success") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    //$location.url("/app/personal");
                }, 1500);
            } else {
                //                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log($scope.checklist);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.refinestepawaytw().success(twsuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function (check) {
            console.log(check);
            //MyServices.setcheck(check);
            $location.url("/app/thankyou");
        }
    })
    //SAPANA START security check
    .controller('SecuritychkCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {

        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var securitysuccess = function (data, status) {
            console.log(data);
            $ionicLoading.hide();
            if (data.Message != "Success Message") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Message,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/securityloan");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.stepawaysecurity().success(securitysuccess);

        //  CHECK checkeligibility
        $scope.checkeligibilitysecurity = function (check) {
            console.log(check);
            //            MyServices.setcheck(check);
            $location.url("/app/securitychkform/" + $scope.appid);
        }



    })
    //SAPANA ENDS
    //DHAVAL START
    .controller('SecuritychkformCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {
        //  DECLARATION
        $scope.refine = {};
        $scope.refine.appid = $stateParams.appid;
        $scope.allvalidation = [];


        //  REFINE LAS 
        var refinesuccess = function (data, status) {
            console.log(data);
        }
        $scope.refinelas = function (refine) {
            console.log($scope.refine);
            $scope.allvalidation = [{
                field: $scope.refine.enq_gender,
                validation: ""
                    }, {
                field: $scope.refine.enq_maritial_status,
                validation: ""
                    }, {
                field: $scope.refine.enq_status,
                validation: ""
                    }, {
                field: $scope.refine.enq_pincode,
                validation: ""
                    }, {
                field: $scope.refine.enq_type_of_securities,
                validation: ""
                    }];
            var check = formvalidation($scope.allvalidation);

            if (check) {
                MyServices.refinestepawayset($scope.refine);
                $location.url("/app/securityformapply");

            };

        }

    })
    //DHAVAL END
    .controller('SecurityapplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });
        var lassuccess = function (data, status) {
            console.log(data.Data);
            $ionicLoading.hide();
            if (data.Response != "Success") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    //$location.url("/app/personal");
                }, 1500);
            } else {
                //                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log($scope.checklist);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.refinestepawaylas().success(lassuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function (check) {
            console.log(check);
            //MyServices.setcheck(check);
            $location.url("/app/thankyou");
        }
    })
    //propertychk starts
    .controller('PropertychkCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {
        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var propertysuccess = function (data, status) {
            console.log(data);
            $ionicLoading.hide();
            if (data.Message != "Success Message") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/propertyloan");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.stepawayproperty().success(propertysuccess);

        //  CHECK checkeligibility
        $scope.checkeligibilityproperty = function (check) {
            console.log(check);
            //            MyServices.setcheck(check);
            $location.url("/app/propertychk-form/" + $scope.appid);
        }



    })
    //propertychk ends
    //propertychk-form starts
    .controller('PropertychkformCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicModal, $filter) {

        //  DECLARATION
        $scope.refine = {};
        $scope.refine.appid = $stateParams.appid;
        $scope.refine.owner_expiry_date = new Date;
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
        $scope.refineproperty = function (refine) {
            console.log($scope.refine);
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
                field: $scope.refine.property_classification,
                validation: ""
                    }, {
                field: $scope.refine.property_area,
                validation: ""
                    }, {
                field: $scope.refine.enq_have_loan_ddl,
                validation: ""
                    }, {
                field: $scope.refine.owner_expiry_date,
                validation: ""
                    }, {
                field: $scope.refine.enq_property_situated,
                validation: ""
                    }];
            var check = formvalidation($scope.allvalidation);

            if (check) {
                $scope.refine.owner_expiry_date = $filter('date')($scope.refine.owner_expiry_date, "yyyy-MM-dd");
                MyServices.refinestepawayset($scope.refine);
                $location.url("/app/propertyformapply");
            };

        }


    })
    //propertychk-form ends
    .controller('PropertyapplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {


        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });

        $ionicLoading.hide();


        var propertysuccess = function (data, status) {
            console.log(data);
            $ionicLoading.hide();
            if (data.Response != "Success") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/propertychk-form");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log($scope.checklist);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.refinestepawayproperty().success(propertysuccess);


        //        //  CHECK checkeligibility
        $scope.checkrefineproperty = function (check) {
            console.log(check);
            //            MyServices.setcheck(check);
            $location.url("/app/thankyou");
        }

    })
    .controller('CarApplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {

        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });

        $ionicLoading.hide();


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
                    $location.url("/app/checkcarloan");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.refinestepawaycar().success(carsuccess);


        //        //  CHECK checkeligibility
        $scope.checkrefinecar = function (check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/thankyou");
        }

    })

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
        $scope.checkeligibilitycar = function (check) {
            console.log(check);
            //            MyServices.setcheck(check);
            $location.url("/app/checkcarloan/" + $scope.appid);
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

        // testing


        $scope.testing = {
            "Message": "Success Message",
            "Response": "Success",
            "Applicationid": "HO015121",
            "Data": {
                "0": {
                    "0": {
                        "roi": "9.85",
                        "ltv": "80",
                        "is_processing_fees_fixed": false,
                        "processing": "0.80",
                        "eligible_loan_amount": 2833755,
                        "disposable_income": "60000",
                        "emi": 10586
                    },
                    "loan_amount": 500000,
                    "roi": "9.85",
                    "ltv": "80",
                    "is_processing_fees_fixed": false,
                    "processing": "0.80",
                    "eligible_loan_amount": 2833755,
                    "disposable_income": "60000",
                    "emi": 10586,
                    "roiplusprocessing": 9,
                    "status": true,
                    "product_id": "1323",
                    "bank_id": "46",
                    "tenure": "60",
                    "requested_loan_amount": 500000,
                    "income_type": "Yes",
                    "bank_credit": "N\/A",
                    "bank_name": "Bajaj Finserve",
                    "logo_image": "bajaj.jpg",
                    "exclusive": false,
                    "display": true,
                    "best_deal": true
                },
                "1": {
                    "0": {
                        "roi": "9.80",
                        "ltv": "75",
                        "is_processing_fees_fixed": true,
                        "processing": "8876.00",
                        "eligible_loan_amount": 2837044,
                        "disposable_income": "60000",
                        "emi": 10574
                    },
                    "loan_amount": 500000,
                    "roi": "9.80",
                    "ltv": "75",
                    "is_processing_fees_fixed": true,
                    "processing": "8876.00",
                    "eligible_loan_amount": 2837044,
                    "disposable_income": "60000",
                    "emi": 10574,
                    "roiplusprocessing": 10,
                    "status": true,
                    "product_id": "1334",
                    "bank_id": "51",
                    "tenure": "60",
                    "requested_loan_amount": 500000,
                    "income_type": "Yes",
                    "bank_credit": "N\/A",
                    "bank_name": "HFFC",
                    "logo_image": "hffc.jpg",
                    "exclusive": false,
                    "display": true
                },
                "2": {
                    "0": {
                        "roi": "10.10",
                        "ltv": "85.00",
                        "is_processing_fees_fixed": true,
                        "processing": "5000.00",
                        "eligible_loan_amount": 2817393,
                        "disposable_income": "60000",
                        "emi": 10648
                    },
                    "loan_amount": 500000,
                    "1": {
                        "roi": "10.10",
                        "ltv": "85.00",
                        "is_processing_fees_fixed": true,
                        "processing": "7500.00",
                        "eligible_loan_amount": 2817393,
                        "disposable_income": "60000",
                        "emi": 10648
                    },
                    "2": {
                        "roi": "10.10",
                        "ltv": "85.00",
                        "is_processing_fees_fixed": false,
                        "processing": "0.50",
                        "eligible_loan_amount": 2817393,
                        "disposable_income": "60000",
                        "emi": 10648
                    },
                    "3": {
                        "roi": "11.00",
                        "ltv": "85.00",
                        "is_processing_fees_fixed": false,
                        "processing": "0.50",
                        "eligible_loan_amount": 2759582,
                        "disposable_income": "60000",
                        "emi": 10871
                    },
                    "4": {
                        "roi": "11.00",
                        "ltv": "85.00",
                        "is_processing_fees_fixed": false,
                        "processing": "0.50",
                        "eligible_loan_amount": 2759582,
                        "disposable_income": "60000",
                        "emi": 10871
                    },
                    "roi": "10.10",
                    "ltv": "85.00",
                    "is_processing_fees_fixed": true,
                    "processing": "5000.00",
                    "eligible_loan_amount": 500000,
                    "disposable_income": "60000",
                    "emi": 10648,
                    "roiplusprocessing": 11,
                    "status": true,
                    "product_id": "1291",
                    "bank_id": "13",
                    "tenure": "60",
                    "requested_loan_amount": 500000,
                    "income_type": "Yes",
                    "bank_credit": "N\/A",
                    "bank_name": "Indiabulls",
                    "logo_image": "indiabulls.jpg",
                    "exclusive": false,
                    "display": true
                },
                "3": {
                    "0": {
                        "roi": "10.10",
                        "ltv": "80",
                        "is_processing_fees_fixed": true,
                        "processing": "10000.00",
                        "eligible_loan_amount": 2817393,
                        "disposable_income": "60000",
                        "emi": 10648
                    },
                    "loan_amount": 500000,
                    "1": {
                        "roi": "10.10",
                        "ltv": "75",
                        "is_processing_fees_fixed": true,
                        "processing": "10000.00",
                        "eligible_loan_amount": 2817393,
                        "disposable_income": "60000",
                        "emi": 10648
                    },
                    "roi": "10.10",
                    "ltv": "80",
                    "is_processing_fees_fixed": true,
                    "processing": "10000.00",
                    "eligible_loan_amount": 500000,
                    "disposable_income": "60000",
                    "emi": 10648,
                    "roiplusprocessing": 12,
                    "status": true,
                    "product_id": "1329",
                    "bank_id": "49",
                    "tenure": "60",
                    "requested_loan_amount": 500000,
                    "income_type": "Yes",
                    "bank_credit": "10.20 %",
                    "bank_name": "citibank",
                    "logo_image": "citibank.jpg",
                    "exclusive": false,
                    "display": true
                },
                "4": {
                    "0": {
                        "roi": "11.00",
                        "ltv": "75",
                        "is_processing_fees_fixed": false,
                        "processing": "2.00",
                        "eligible_loan_amount": 2759582,
                        "disposable_income": "60000",
                        "emi": 10871
                    },
                    "loan_amount": 500000,
                    "roi": "11.00",
                    "ltv": "75",
                    "is_processing_fees_fixed": false,
                    "processing": "2.00",
                    "eligible_loan_amount": 2759582,
                    "disposable_income": "60000",
                    "emi": 10871,
                    "roiplusprocessing": 13,
                    "status": true,
                    "product_id": "1297",
                    "bank_id": "5",
                    "tenure": "60",
                    "requested_loan_amount": 500000,
                    "income_type": "Yes",
                    "bank_credit": "N\/A",
                    "bank_name": "AU",
                    "logo_image": "AU.png",
                    "exclusive": false,
                    "display": true
                }
            }
        };

        $scope.testing2 = {
            "Message": "Success Message",
            "Response": "Success",
            "Applicationid": "HO015139",
            "Data": [{
                "0": {
                    "roi": "11.00",
                    "ltv": "75",
                    "is_processing_fees_fixed": false,
                    "processing": "2.00",
                    "eligible_loan_amount": 1131456,
                    "disposable_income": "100000",
                    "emi": 44190
                },
                "loan_amount": 0,
                "roi": null,
                "ltv": null,
                "is_processing_fees_fixed": null,
                "processing": null,
                "eligible_loan_amount": 0,
                "disposable_income": null,
                "emi": 0,
                "roiplusprocessing": 0,
                "status": true,
                "product_id": "1297",
                "bank_id": "5",
                "tenure": "12",
                "requested_loan_amount": 500000,
                "income_type": "Yes",
                "bank_credit": "N/A",
                "bank_name": "AU",
                "logo_image": "AU.png",
                "exclusive": false,
                "display": false
        }, {
                "0": {
                    "roi": "9.85",
                    "ltv": "80",
                    "is_processing_fees_fixed": false,
                    "processing": "0.80",
                    "eligible_loan_amount": 1138353,
                    "disposable_income": "100000",
                    "emi": 43923
                },
                "loan_amount": 500000,
                "roi": "9.85",
                "ltv": "80",
                "is_processing_fees_fixed": false,
                "processing": "0.80",
                "eligible_loan_amount": 1138353,
                "disposable_income": "100000",
                "emi": 43923,
                "roiplusprocessing": 9,
                "status": true,
                "product_id": "1323",
                "bank_id": "46",
                "tenure": "12",
                "requested_loan_amount": 500000,
                "income_type": "Yes",
                "bank_credit": "N/A",
                "bank_name": "Bajaj Finserve",
                "logo_image": "bajaj.jpg",
                "exclusive": false,
                "display": true,
                "best_deal": true
        }, {
                "0": {
                    "roi": "9.80",
                    "ltv": "75",
                    "is_processing_fees_fixed": true,
                    "processing": "8876.00",
                    "eligible_loan_amount": 1138655,
                    "disposable_income": "100000",
                    "emi": 43911
                },
                "loan_amount": 500000,
                "roi": "9.80",
                "ltv": "75",
                "is_processing_fees_fixed": true,
                "processing": "8876.00",
                "eligible_loan_amount": 1138655,
                "disposable_income": "100000",
                "emi": 43911,
                "roiplusprocessing": 10,
                "status": true,
                "product_id": "1334",
                "bank_id": "51",
                "tenure": "12",
                "requested_loan_amount": 500000,
                "income_type": "Yes",
                "bank_credit": "N/A",
                "bank_name": "HFFC",
                "logo_image": "hffc.jpg",
                "exclusive": false,
                "display": true
        }, {
                "0": {
                    "roi": "10.10",
                    "ltv": "85.00",
                    "is_processing_fees_fixed": true,
                    "processing": "5000.00",
                    "eligible_loan_amount": 1136849,
                    "disposable_income": "100000",
                    "emi": 43981
                },
                "1": {
                    "roi": "10.10",
                    "ltv": "85.00",
                    "is_processing_fees_fixed": true,
                    "processing": "7500.00",
                    "eligible_loan_amount": 1136849,
                    "disposable_income": "100000",
                    "emi": 43981
                },
                "2": {
                    "roi": "10.10",
                    "ltv": "85.00",
                    "is_processing_fees_fixed": false,
                    "processing": "0.50",
                    "eligible_loan_amount": 1136849,
                    "disposable_income": "100000",
                    "emi": 43981
                },
                "3": {
                    "roi": "11.00",
                    "ltv": "85.00",
                    "is_processing_fees_fixed": false,
                    "processing": "0.50",
                    "eligible_loan_amount": 1131456,
                    "disposable_income": "100000",
                    "emi": 44190
                },
                "4": {
                    "roi": "11.00",
                    "ltv": "85.00",
                    "is_processing_fees_fixed": false,
                    "processing": "0.50",
                    "eligible_loan_amount": 1131456,
                    "disposable_income": "100000",
                    "emi": 44190
                },
                "loan_amount": 500000,
                "roi": "10.10",
                "ltv": "85.00",
                "is_processing_fees_fixed": true,
                "processing": "5000.00",
                "eligible_loan_amount": 500000,
                "disposable_income": "100000",
                "emi": 43981,
                "roiplusprocessing": 11,
                "status": true,
                "product_id": "1291",
                "bank_id": "13",
                "tenure": "12",
                "requested_loan_amount": 500000,
                "income_type": "Yes",
                "bank_credit": "N/A",
                "bank_name": "Indiabulls",
                "logo_image": "indiabulls.jpg",
                "exclusive": false,
                "display": true
        }, {
                "0": {
                    "roi": "10.10",
                    "ltv": "80",
                    "is_processing_fees_fixed": true,
                    "processing": "10000.00",
                    "eligible_loan_amount": 1136849,
                    "disposable_income": "100000",
                    "emi": 43981
                },
                "1": {
                    "roi": "10.10",
                    "ltv": "75",
                    "is_processing_fees_fixed": true,
                    "processing": "10000.00",
                    "eligible_loan_amount": 1136849,
                    "disposable_income": "100000",
                    "emi": 43981
                },
                "loan_amount": 500000,
                "roi": "10.10",
                "ltv": "80",
                "is_processing_fees_fixed": true,
                "processing": "10000.00",
                "eligible_loan_amount": 500000,
                "disposable_income": "100000",
                "emi": 43981,
                "roiplusprocessing": 12,
                "status": true,
                "product_id": "1329",
                "bank_id": "49",
                "tenure": "12",
                "requested_loan_amount": 500000,
                "income_type": "Yes",
                "bank_credit": "10.20 %",
                "bank_name": "citibank",
                "logo_image": "citibank.jpg",
                "exclusive": false,
                "display": true
        }]
        };
        console.log($scope.testing2.Data);
        // testing







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
        $scope.checkeligibilityhome = function (check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/homechk/" + $scope.appid);
        }

    })
    //SAPANA ENDS
    //SAPANA START
    .controller('HomeApplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {

        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });

        $ionicLoading.hide();


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
                    $location.url("/app/checkcarloan");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.refinestepawayhome().success(homesuccess);


        //        //  CHECK checkeligibility
        $scope.checkrefinehome = function (check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/thankyou");
        }
    })
    //SAPANA ENDS
    //SAPANA START
    .controller('HomeChkCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicModal, $filter) {

        //  DECLARATION
        $scope.refine = {};
        $scope.refine.appid = $stateParams.appid;
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
        $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalcity = modal;
        });
        $scope.selectcity = function () {
            $scope.modalcity.show();
        }
        $scope.closeModalCity = function () {
            $scope.modalcity.hide();
        };

        //  REFINE PERSONAL 
        var refinesuccess = function (data, status) {
            console.log(data);
        }
        $scope.applyhome = function (refine) {
                console.log($scope.refine);
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
                    field: $scope.refine.property_classifications,
                    validation: ""
                    }, {
                    field: $scope.refine.salary_credited_since,
                    validation: ""
                    }, {
                    field: $scope.refine.enq_exclusive_rate_property,
                    validation: ""
                    }, {
                    field: $scope.refine.enq_Purpose,
                    validation: ""
                    }, {
                    field: $scope.refine.enq_have_loan_ddl,
                    validation: ""
                    }, {
                    field: $scope.refine.enq_present_use_property,
                    validation: ""
                    },{
                    field: $scope.refine.enq_present_use_property,
                    validation: ""
                    }];
                var check = formvalidation($scope.allvalidation);

//                if (check) {
                    $scope.refine.salary_credited_since = $filter('date')($scope.refine.salary_credited_since, "yyyy-MM-dd");;
                    MyServices.refinestepawayset($scope.refine);
                    $location.url("/app/homeapply");
//                };
            }
            //  SELECT CITY
        $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.refine.enq_city = cityname;
            $scope.cityName = cityname;
            MyServices.getbuilderdropdown(cityname).success(buildersuccess)
        }
        var buildersuccess=function(data,status){
            console.log("Builders");
            console.log(data.Data);
            $scope.builders=data.Data;
        }
        $scope.getprojects=function(buildername){
            console.log(buildername);
            MyServices.getprojectsdropdown(buildername).success(projectsuccess)
        }
        var projectsuccess=function(data,status){
            console.log("projects");
            console.log(data.Data);
            $scope.projects=data.Data;
        }

    })
    //SAPANA ENDS
    .controller('CreditCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {
        $ionicLoading.show();
        $scope.creditloan = {
            //            'enq_loanAmtTo': 20000,
            //            'enq_tenureTo': 6,
            'enq_currIncomeTo': 15000,
            //            'enq_is_salaried_ddl': 'No',
            'enq_dob': new Date()
        };
        $scope.valid_date = false;
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModalComp = function () {
            $scope.modal.hide();
        };
        $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalcity = modal;
        });

        $scope.selectcity = function () {
            $scope.modalcity.show();
        }

        $scope.closeModalCity = function () {
            $scope.modalcity.hide();
        };
        //know more
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
        };

        //  DECLARATION
        $scope.allvalidation = [];

        //  SELECT CITY
        $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.creditloan.enq_city = cityname;
            $scope.cityName = cityname;
        }


        $scope.datechange = function () {
            if (parseInt(age($scope.creditloan.enq_dob)) < 18) {
                //                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            } else {
                $scope.valid_date = true;
            }

        }

        //SELECT COMPANY
        $scope.selectcomp = function (comp) {
            console.log(comp);
            $scope.modal.hide();
            $scope.creditloan.enq_company_id = comp;
        }

        //  PERSONAL FIRST LOAN FORN SUBMIT
        var stepawayplsuccess = function (data, status) {
            console.log(data);
        }
        $scope.getmedeals = function (creditloan) {
            console.log(creditloan);
            if (creditloan.enq_is_salaried_ddl != "no") {
                creditloan.enq_occupation = "Salaried";
            }
            $scope.allvalidation = [{
                field: $scope.creditloan.enq_currIncomeTo,
                validation: ""
        }, {
                field: $scope.creditloan.enq_dob,
                validation: ""
        }, {
                field: $scope.creditloan.enq_city,
                validation: ""
        }, {
                field: $scope.creditloan.enq_is_salaried_ddl,
                validation: ""
        }, {
                field: $scope.creditloan.salary_credited_since,
                validation: ""
        }, {
                field: $scope.creditloan.enq_staying_since,
                validation: ""
        }, {
                field: $scope.creditloan.fd_maturity_type,
                validation: ""
        }, {
                field: $scope.creditloan.enq_existing_card_holder,
                validation: ""
        }];
            var check = formvalidation($scope.allvalidation);
            if ($scope.valid_date == false) {
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
            if (check && $scope.valid_date == true) {
                creditloan.enq_dob = $filter('date')(creditloan.enq_dob, "dd-MM-yyyy");
                console.log(creditloan.enq_dob);
                creditloan.salary_credited_since = $filter('date')(creditloan.salary_credited_since, "dd-MM-yyyy");
                console.log(creditloan.salary_credited_since);
                creditloan.enq_staying_since = $filter('date')(creditloan.enq_staying_since, "dd-MM-yyyy");
                console.log(creditloan.enq_staying_since);

                MyServices.stepawayset(creditloan);
                $location.url("/app/creditapply");

            };
        }

        $ionicLoading.hide();
    })

/////code end ///////
.controller('MyAccountCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $location, $timeout) {

        //  DECLARATION
        $scope.returnsactive = "active";
        $scope.profile = "bold";
        $scope.updateuser = [];
        $scope.allvalidation = [];
        $scope.valid_date = false;
        //  DESIGN CODE
        $scope.changemyapp = function () {
                $scope.myapp = "bold";
                $scope.profile = "";
            }
            //
        $scope.chnageprofile = function () {
            $scope.myapp = "";
            $scope.profile = "bold";
        }
        $scope.keypress = function ($event) {
                if ($event.keyCode >= 48 && $event.keyCode <= 57) {

                } else {
                    $scope.updateuser.customermobile = '';
                }
            }
            //  GET USER DETAILS
        $scope.updateuser = MyServices.getuser();
        $scope.datechange = function () {
            if (parseInt(age($scope.updateuser.enq_dob)) < 18) {
                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                })
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            } else {
                $scope.valid_date = true;
            }
        }
        var myaccountsuccess = function (data, status) {
            $scope.myapply = data.Data;
            $scope.myapplyimages = data.Images;
            console.log($scope.myapply);
        };
        //        MyServices.getmyaccount().success(myaccountsuccess)

        var updateusersuccess = function (data, status) {
            //$scope.updateuser = data.Data;
            console.log(data);
            if (data.msg == "Sucess") {
                var myPopup1 = $ionicPopup.show({
                    title: "Your Profile Was Updated Successfully",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
        }
        $scope.save = function (updateuser) {
            console.log(updateuser);
            $scope.allvalidation = [{
                field: $scope.updateuser.customername,
                validation: ""
        }, {
                field: $scope.updateuser.enq_dob,
                validation: ""
        }, {
                field: $scope.updateuser.enq_gender,
                validation: ""
        }, {
                field: $scope.updateuser.enq_maritial_status,
                validation: ""
        }, {
                field: $scope.updateuser.customermobile,
                validation: ""
        }, {
                field: $scope.updateuser.customeremail,
                validation: ""
        }, {
                field: $scope.updateuser.oldpassword,
                validation: ""
        }, {
                field: $scope.updateuser.newpassword,
                validation: ""
        }, {
                field: $scope.updateuser.rnpassword,
                validation: ""
        }];
            var check = formvalidation($scope.allvalidation);
            if ($scope.valid_date == false) {
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
            if (check && $scope.valid_date == true) {
                MyServices.updateuserprofile(updateuser).success(updateusersuccess);
            };
        }

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

        $scope.closeModalComp = function () {
            $scope.modal.hide();
        };
    })
    //DHAVAL START  
    .controller('CommericialCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading, $ionicModal) {
        $ionicLoading.show();
        $scope.sme = {
            enq_loanType: "29",
            customersessionid: $.jStorage.get("user").customersessionid
        }

        //know more
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
        };
        $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalcity = modal;
        });

        $scope.selectcity = function () {
            $scope.modalcity.show();
        }

        $scope.closeModalCity = function () {
            $scope.modalcity.hide();
        };

        //  SELECT CITY
        $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.sme.enq_city = cityname;
            $scope.cityName = cityname;
        }


        var dropsuccess1 = function (data, status) {
            $scope.states = data.Data;
            console.log("States")
            console.log($scope.states);
            $ionicLoading.hide();
        }
        MyServices.getdropdownstate().success(dropsuccess1);


        var smecommercial = function (data, status) {
            console.log(data);
            if (data.Response != "Success") {
                $location.url("/app/commericial");
            } else {
                $scope.appid = data.Applicationid;
                $location.url("/app/thankyou");
            }
        }
        $scope.smesubmit = function (sme) {
            console.log(sme);
            $scope.allvalidation = [{
                field: $scope.sme.enq_name,
                validation: ""
        }, {
                field: $scope.sme.enq_email,
                validation: ""
        }, {
                field: $scope.sme.enq_dob,
                validation: ""
        }, {
                field: $scope.sme.enq_company_name,
                validation: ""
        }, {
                field: $scope.sme.enq_designation,
                validation: ""
        }, {
                field: $scope.sme.enq_address,
                validation: ""
        }, {
                field: $scope.sme.enq_state,
                validation: ""
        }, {
                field: $scope.sme.enq_city,
                validation: ""
        }, {
                field: $scope.sme.enq_loanType_string,
                validation: ""
        }, {
                field: $scope.sme.enq_loanAmtTo,
                validation: ""
        }, {
                field: $scope.sme.enq_countryCode,
                validation: ""
        }, {
                field: $scope.sme.enq_mobile,
                validation: ""
        }];
            var check = formvalidation($scope.allvalidation);

            if (check) {
                MyServices.smecommercialvehicle(sme).success(smecommercial);
            };
        }
    })
    //DHAVAL END

.controller('HealthCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    //DHAVAL START
    .controller('SmeBussniessCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading, $ionicModal) {
        $ionicLoading.show();
        $scope.sme = {
            enq_loanType: "33",
            customersessionid: $.jStorage.get("user").customersessionid
        }

        //know more
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
        };
        $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalcity = modal;
        });

        $scope.selectcity = function () {
            $scope.modalcity.show();
        }

        $scope.closeModalCity = function () {
            $scope.modalcity.hide();
        };


        //  SELECT CITY
        $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.sme.enq_city = cityname;
            $scope.cityName = cityname;
        }

        var dropsuccess1 = function (data, status) {
            $scope.states = data.Data;
            console.log("States")
            console.log($scope.states);
            $ionicLoading.hide();
        }
        MyServices.getdropdownstate().success(dropsuccess1);


        var smebusiness = function (data, status) {
            console.log(data);
            if (data.Response != "Success") {
                $location.url("/app/smebussniess");
            } else {
                $scope.appid = data.Applicationid;
                $location.url("/app/thankyou");
            }
        }
        $scope.smesubmit = function (sme) {
            console.log(sme);
            $scope.allvalidation = [{
                field: $scope.sme.enq_name,
                validation: ""
        }, {
                field: $scope.sme.enq_email,
                validation: ""
        }, {
                field: $scope.sme.enq_dob,
                validation: ""
        }, {
                field: $scope.sme.enq_company_name,
                validation: ""
        }, {
                field: $scope.sme.enq_designation,
                validation: ""
        }, {
                field: $scope.sme.enq_address,
                validation: ""
        }, {
                field: $scope.sme.enq_state,
                validation: ""
        }, {
                field: $scope.sme.enq_city,
                validation: ""
        }, {
                field: $scope.sme.enq_loanType_string,
                validation: ""
        }, {
                field: $scope.sme.enq_loanAmtTo,
                validation: ""
        }, {
                field: $scope.sme.enq_countryCode,
                validation: ""
        }, {
                field: $scope.sme.enq_mobile,
                validation: ""
        }];
            var check = formvalidation($scope.allvalidation);

            if (check) {
                MyServices.smebusinesssolution(sme).success(smebusiness);;
            };

        }
    })
    //DHAVAL END

//DHAVAL START
.controller('SmeProjectCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading, $ionicModal) {
        $ionicLoading.show();
        $scope.sme = {
            enq_loanType: "32",
            customersessionid: $.jStorage.get("user").customersessionid
        }

        //know more
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
        };
        $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalcity = modal;
        });

        $scope.selectcity = function () {
            $scope.modalcity.show();
        }

        $scope.closeModalCity = function () {
            $scope.modalcity.hide();
        };

        //  SELECT CITY
        $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.sme.enq_city = cityname;
            $scope.cityName = cityname;
        }

        var dropsuccess1 = function (data, status) {
            $scope.states = data.Data;
            console.log("States")
            console.log($scope.states);
            $ionicLoading.hide();
        }
        MyServices.getdropdownstate().success(dropsuccess1);


        var smefinance = function (data, status) {
            console.log(data);
            if (data.Response != "Success") {
                $location.url("/app/smeproject");
            } else {
                $scope.appid = data.Applicationid;
                $location.url("/app/thankyou");
            }
        }
        $scope.smesubmit = function (sme) {
            console.log(sme);
            $scope.allvalidation = [{
                field: $scope.sme.enq_name,
                validation: ""
        }, {
                field: $scope.sme.enq_email,
                validation: ""
        }, {
                field: $scope.sme.enq_dob,
                validation: ""
        }, {
                field: $scope.sme.enq_company_name,
                validation: ""
        }, {
                field: $scope.sme.enq_designation,
                validation: ""
        }, {
                field: $scope.sme.enq_address,
                validation: ""
        }, {
                field: $scope.sme.enq_state,
                validation: ""
        }, {
                field: $scope.sme.enq_city,
                validation: ""
        }, {
                field: $scope.sme.enq_loanType_string,
                validation: ""
        }, {
                field: $scope.sme.enq_loanAmtTo,
                validation: ""
        }, {
                field: $scope.sme.enq_countryCode,
                validation: ""
        }, {
                field: $scope.sme.enq_mobile,
                validation: ""
        }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                console.log(sme);
                MyServices.smeprojectfinance(sme).success(smefinance);;
            };
        }
    })
    //DHAVAL END

.controller('SmeFilesCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicModal) {
        //know more
        $scope.lap = {};
        $scope.allvalidation = [];
        $scope.lappro = function (lap) {
            $scope.allvalidation = [{
                field: $scope.lap.loanfor,
                validation: ""
                }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                $location.url("/app/propertyloan");
            }
        }
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
        };
    })
    .controller('ReferPropertyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('ReferEarnCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('ReferalDetailsCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('CreditApplyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicLoading) {

        //  DEPLARATION
        $scope.checklist = {};
        $ionicLoading.show({
            template: 'Please wait...'
        });


        var ccsuccess = function (data, status) {
            console.log("string strin");
            console.log(data);
            //console.log(JSON.parse(data.Data));
            $ionicLoading.hide();
            if (data.Message != "Success Message") {
                var myPopup1 = $ionicPopup.show({
                    title: data.Response,
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/creditapply");
                }, 1500);
            } else {
                $scope.appid = data.Applicationid;
                //                $scope.checklist = JSON.parse(data.Data);
                $scope.checklist = data.Data;
                console.log(data);
                //                console.log(getjsononly($scope.checklist));
            }
        }
        MyServices.stepawaycc().success(ccsuccess);

        //  CHECK checkeligibility
        $scope.checkeligibility = function (check) {
            console.log(check);
            MyServices.setcheck(check);
            $location.url("/app/personal-chk/" + $scope.appid);
        }

    })

//  MAHESH END
.controller('ReferCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location) {})
    .controller('GenieDealCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicSlideBoxDelegate) {
        $scope.deals = [];
        console.log("DealId=" + $stateParams.dealid);
        var geniedealsuccess = function (data, status) {
            $scope.deals = data;
            console.log($scope.deals);
        };
        MyServices.getgeniedeal($stateParams.dealid).success(geniedealsuccess);

        $scope.changeslide = function (num) {
            //            console.log(num);
            if (num == 1) {
                $ionicSlideBoxDelegate.previous();
            } else {
                $ionicSlideBoxDelegate.next();
            }

        };

        $scope.redirectToLoan = function () {
            if ($stateParams.dealid == 1) {
                $location.url("/app/carloan");
            } else if ($stateParams.dealid == 2 || $stateParams.dealid == 3) {
                $location.url("/app/homeloan");
            } else if ($stateParams.dealid == 4) {
                $location.url("/app/twowheelerloan");
            } else if ($stateParams.dealid == 5) {
                $location.url("/app/personal");
            }
        };

    })

.controller('ContactusCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $timeout, $location, $ionicHistory) {
        $scope.backcont = function () {
            $ionicHistory.goBack();
        }
    })
    .controller('PersonalLoanCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {

        //        console.log(age());

        //  DESIGN CODE

        $scope.personal = {
            'enq_loanAmtTo': '50000',
            'enq_tenureTo': '12',
            'enq_currIncomeTo': '12000',
            'enq_is_salaried_ddl': '',
            'enq_dob': new Date()
        };
        $scope.valid_date = false;

        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModalComp = function () {
            $scope.modal.hide();
        };
        $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalcity = modal;
        });

        $scope.selectcity = function () {
            $scope.modalcity.show();
        }

        $scope.closeModalCity = function () {
            $scope.modalcity.hide();
        };
        //know more
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
        };

        //  DECLARATION

        $scope.allvalidation = [];

        //  SELECT CITY
        $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.personal.enq_city = cityname;
            $scope.cityName = cityname;
        }


        //  SELECT COMPANY
        $scope.selectcomp = function (comp) {
            console.log(comp);
            $scope.modal.hide();
            $scope.personal.enq_company_id = comp;
        }

        $scope.datechange = function () {
            if (parseInt(age($scope.personal.enq_dob)) < 18) {

                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            } else {
                $scope.valid_date = true;
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

            if ($scope.valid_date == false) {
                console.log("Yo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }

            if (check && $scope.valid_date == true) {

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
    .controller('CarLoanCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {
        $ionicLoading.show();
        $scope.carloan = {
            'enq_loanAmtTo': 20000,
            'enq_tenureTo': 6,
            'enq_currIncomeTo': 15000,
            'enq_is_salaried_ddl': 'No',
            'enq_dob': new Date()

        };
        $scope.valid_date = false;
        //  GET MANUFACTURER
        var manufacturersuccess = function (data, status) {
            $scope.manufacturers = data.Data;
        }
        MyServices.getdropdownmanufacturer(22).success(manufacturersuccess);

        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModalComp = function () {
            $scope.modal.hide();
        };

        //know more
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
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
            if (parseInt(age($scope.carloan.enq_dob)) < 18) {
                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            } else {
                $scope.valid_date = true;
            }
        }
        var manufsuccess = function (data, status) {
            $scope.models = data.Data;
            console.log($scope.models);
            $ionicLoading.hide();
        }
        $scope.getmodel = function (manuf) {
            console.log(manuf);
            $ionicLoading.show();
            MyServices.getmanumodel(manuf).success(manufsuccess);
        }
        $scope.getmedeals = function (carloan) {
                console.log(carloan);
                if (carloan.enq_is_salaried_ddl != "no") {
                    carloan.enq_occupation = "Salaried";
                }
                $scope.allvalidation = [{
                    field: $scope.carloan.enq_loanAmtTo,
                    validation: ""
        }, {
                    field: $scope.carloan.enq_tenureTo,
                    validation: ""
        }, {
                    field: $scope.carloan.enq_currIncomeTo,
                    validation: ""
        }, {
                    field: $scope.carloan.enq_dob,
                    validation: ""
        }, {
                    field: $scope.carloan.enq_state,
                    validation: ""
        }, {
                    field: $scope.carloan.enq_is_salaried_ddl,
                    validation: ""
        }, {
                    field: $scope.carloan.enq_manufacturer,
                    validation: ""
        }, {
                    field: $scope.carloan.enq_model,
                    validation: ""
        }, {
                    field: $scope.carloan.ex_showroom_cost,
                    validation: ""
        }];
                var check = formvalidation($scope.allvalidation);
                if ($scope.valid_date == false) {
                    var myPopup1 = $ionicPopup.show({
                        title: "Age should be Greater than 18",
                        scope: $scope,
                    });
                    $timeout(function () {
                        myPopup1.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
                if (check && $scope.valid_date == true) {
                    //                $scope.today = new Date();
                    carloan.enq_dob = $filter('date')(carloan.enq_dob, "dd-MM-yyyy");
                    console.log(carloan.enq_dob);

                    MyServices.stepawayset(carloan);
                    $location.url("/app/carchklist");
                    //      MyServices.stepawaypl(personal).success(stepawayplsuccess);
                };
            }
            //sapana end
        $ionicLoading.hide();
    })

.controller('TwowheelerLoanCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {
    $ionicLoading.show();
    $scope.twloan = {
        //            'loan': 20000,
        //            'tenure': 6,
        //            'income': 15000
        'enq_loanAmtTo': 5000,
        'enq_tenureTo': 15,
        'enq_currIncomeTo': 9874,
        'enq_dob': new Date(),

    };
    $scope.valid_date = false;
    //  GET MANUFACTURER
    var manufacturersuccess = function (data, status) {
        $scope.manufacturers = data.Data;
    }
    MyServices.getdropdownmanufacturer(23).success(manufacturersuccess);

    $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function () {
        $scope.modal.show();
    }

    $scope.closeModalComp = function () {
        $scope.modal.hide();
    };
    $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalcity = modal;
    });

    $scope.selectcity = function () {
        $scope.modalcity.show();
    }

    $scope.closeModalCity = function () {
        $scope.modalcity.hide();
    };
    //know more
    $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalterms = modal;
    });

    $scope.openTerms = function () {
        $scope.modalterms.show();
    };

    $scope.closeModal = function () {
        $scope.modalterms.hide();
    };


    //  DECLARATION
    $scope.allvalidation = [];


    //  SELECT CITY
    $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.twloan.enq_city = cityname;
            $scope.cityName = cityname;
        }
        //  SELECT COMPANY
    $scope.selectcomp = function (comp) {
        console.log(comp);
        $scope.closeModalComp();
        $scope.twloan.enq_company_id = comp;
    }

    $scope.datechange = function () {
        if (parseInt(age($scope.twloan.enq_dob)) < 18) {
            console.log("chintoo");
            var myPopup1 = $ionicPopup.show({
                title: "Age should be Greater than 18",
                scope: $scope,
            });
            $timeout(function () {
                myPopup1.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        } else {
            $scope.valid_date = true;
        }


    }

    var manufsuccess = function (data, status) {
        $scope.models = data.Data;
        console.log($scope.models);
        $ionicLoading.hide();
    }
    $scope.getmodel = function (manuf) {
        console.log(manuf);
        $ionicLoading.show();
        MyServices.getmanumodel(manuf).success(manufsuccess);
    }

    //        $scope.twloanshow=function(){
    //             $scope.twloan.enq_dob = $filter('date')($scope.twloan.enq_dob, "dd-MM-yyyy");
    //        console.log($scope.twloan.enq_dob);
    //        
    //            console.log($scope.twloan);
    //        };

    $scope.twloanclick = function (twloan) {
        console.log(twloan);
        if (twloan.enq_is_salaried_ddl != "no") {
            twloan.enq_occupation = "Salaried";
        }
        $scope.allvalidation = [{
            field: $scope.twloan.enq_loanAmtTo,
            validation: ""
        }, {
            field: $scope.twloan.enq_tenureTo,
            validation: ""
        }, {
            field: $scope.twloan.enq_currIncomeTo,
            validation: ""
        }, {
            field: $scope.twloan.enq_dob,
            validation: ""
        }, {
            field: $scope.twloan.enq_is_salaried_ddl,
            validation: ""
        }, {
            field: $scope.twloan.enq_city,
            validation: ""
        }, {
            field: $scope.twloan.enq_manufacturer,
            validation: ""
        }, {
            field: $scope.twloan.enq_model,
            validation: ""
        }, {
            field: $scope.twloan.ex_showroom_cost,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if ($scope.valid_date == false) {
            var myPopup1 = $ionicPopup.show({
                title: "Age should be Greater than 18",
                scope: $scope,
            });
            $timeout(function () {
                myPopup1.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }
        if (check && $scope.valid_date == true) {
            //                $scope.today = new Date();
            twloan.enq_dob = $filter('date')(twloan.enq_dob, "dd-MM-yyyy");
            console.log(twloan.enq_dob);

            MyServices.stepawayset(twloan);
            $location.url("/app/twowheelerlistchk");
            //                MyServices.stepawaypl(personal).success(stepawayplsuccess);
        };
    }
    $ionicLoading.hide();

})


//SAPANA START loan security page
.controller('SecurityLoanCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {

    //  DESIGN CODE
    $ionicLoading.show();
    $scope.security = {
        'enq_loanAmtTo': 20000,
        'enq_tenureTo': 6,
        'enq_currIncomeTo': 15000,
        'enq_is_salaried_ddl': 'No',
        'enq_dob': new Date()
    };
    $scope.valid_date = false;
    $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function () {
        $scope.modal.show();
    }

    $scope.closeModalComp = function () {
        $scope.modal.hide();
    };
    $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalcity = modal;
    });

    $scope.selectcity = function () {
        $scope.modalcity.show();
    }

    $scope.closeModalCity = function () {
        $scope.modalcity.hide();
    };
    //know more
    $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalterms = modal;
    });

    $scope.openTerms = function () {
        $scope.modalterms.show();
    };

    $scope.closeModal = function () {
        $scope.modalterms.hide();
    };

    //  DECLARATION
    $scope.allvalidation = [];

    //  SELECT CITY
    $scope.selectcityid = function (cityid, cityname) {
        console.log("City Id=" + cityid);
        $scope.modalcity.hide();
        $scope.security.enq_city = cityname;
        $scope.cityName = cityname;
    }

    //  SELECT COMPANY
    $scope.selectcomp = function (comp) {
        console.log(comp);
        $scope.modal.hide();
        $scope.security.enq_company_id = comp;
    }

    $scope.datechange = function () {
        if (parseInt(age($scope.security.enq_dob)) < 18) {
            console.log("chintoo");
            var myPopup1 = $ionicPopup.show({
                title: "Age should be Greater than 18",
                scope: $scope,
            });
            $timeout(function () {
                myPopup1.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        } else {
            $scope.valid_date = true;
        }

    }


    //  PERSONAL FIRST LOAN FORN SUBMIT
    var stepawayscsuccess = function (data, status) {
        console.log(data);
    }
    $scope.getmedeals = function (security) {
        console.log(security);
        if (security.enq_is_salaried_ddl != "no") {
            security.enq_occupation = "Salaried";
        }
        $scope.allvalidation = [{
            field: $scope.security.enq_loanAmtTo,
            validation: ""
        }, {
            field: $scope.security.enq_tenureTo,
            validation: ""
        }, {
            field: $scope.security.enq_currIncomeTo,
            validation: ""
        }, {
            field: $scope.security.enq_dob,
            validation: ""
        }, {
            field: $scope.security.enq_city,
            validation: ""
        }, {
            field: $scope.security.enq_is_salaried_ddl,
            validation: ""
        }, {
            field: $scope.security.property_current_market_value,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if ($scope.valid_date == false) {
            var myPopup1 = $ionicPopup.show({
                title: "Age should be Greater than 18",
                scope: $scope,
            });
            $timeout(function () {
                myPopup1.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }
        if (check && $scope.valid_date == true) {
            //                $scope.today = new Date();
            security.enq_dob = $filter('date')(security.enq_dob, "dd-MM-yyyy");
            console.log(security.enq_dob);

            MyServices.stepawayset(security);
            $location.url("/app/securitychk");
            //                MyServices.stepawaypl(personal).success(stepawayplsuccess);
        };
    }
    $ionicLoading.hide();
})

//SAPANA ENDS
// propertyloan
.controller('PropertyLoanCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {
        $ionicLoading.show();
        $scope.propertyloan = {
            'enq_loanAmtTo': 20000,
            'enq_tenureTo': 6,
            'enq_currIncomeTo': 15000,
            'enq_is_salaried_ddl': 'No',
            'enq_dob': new Date()

        };
        $scope.valid_date = false;
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModalComp = function () {
            $scope.modal.hide();
        };
        $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalcity = modal;
        });

        $scope.selectcity = function () {
            $scope.modalcity.show();
        }

        $scope.closeModalCity = function () {
            $scope.modalcity.hide();
        };
        //know more
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $ionicLoading.hide();
        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
        };

        //  SELECT CITY
        $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.propertyloan.enq_city = cityname;
            $scope.cityName = cityname;
        }

        //  SELECT COMPANY
        $scope.selectcomp = function (comp) {
                console.log(comp);
                $scope.modal.hide();
                $scope.propertyloan.enq_company_id = comp;
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
            if (parseInt(age($scope.propertyloan.enq_dob)) < 18) {
                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            } else {
                $scope.valid_date = true;
            }

        }
        $scope.getmedeals = function (propertyloan) {
            console.log(propertyloan);
            if (propertyloan.enq_is_salaried_ddl != "no") {
                propertyloan.enq_occupation = "Salaried";
            }
            $scope.allvalidation = [{
                field: $scope.propertyloan.enq_loanAmtTo,
                validation: ""
        }, {
                field: $scope.propertyloan.enq_tenureTo,
                validation: ""
        }, {
                field: $scope.propertyloan.enq_currIncomeTo,
                validation: ""
        }, {
                field: $scope.propertyloan.enq_dob,
                validation: ""
        }, {
                field: $scope.propertyloan.enq_is_salaried_ddl,
                validation: ""
        }, {
                field: $scope.propertyloan.property_current_market_value,
                validation: ""
        }, {
                field: $scope.propertyloan.property_type,
                validation: ""
        }, {
                field: $scope.propertyloan.enq_present_use_property,
                validation: ""
        }, {
                field: $scope.propertyloan.enq_city,
                validation: ""
        }];
            var check = formvalidation($scope.allvalidation);
            if ($scope.valid_date == false) {
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
            if (check && $scope.valid_date == true) {
                //                $scope.today = new Date();
                propertyloan.enq_dob = $filter('date')(propertyloan.enq_dob, "dd-MM-yyyy");
                console.log(propertyloan.enq_dob);

                MyServices.stepawayset(propertyloan);
                $location.url("/app/propertychk");
                //                MyServices.stepawaypl(personal).success(stepawayplsuccess);
            };
        }
        $ionicLoading.hide();
    })
    //property loan ends
    //vignesh STARTS
    .controller('CheckCarLoanCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter) {
        //
        //        $scope.carloan = {
        //            'loan': 20000,
        //            'tenure': 6,
        //            'income': 15000
        //
        //        };
        //  DECLARATION
        $scope.refine = {
            "enq_nationality": "Indian"
        };
        $scope.refine.appid = $stateParams.appid;
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
        $scope.refinecar = function (refine) {
            console.log($scope.refine);
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
                field: $scope.refine.enq_usage,
                validation: ""
                    }, {
                field: $scope.refine.selectAllexisting_bank_relationship,
                validation: ""
                    }, {
                field: $scope.refine.enq_have_loan_ddl,
                validation: ""
                    }, {
                field: $scope.refine.salary_credited_since,
                validation: ""
                    }, {
                field: $scope.refine.owner_expiry_date,
                validation: ""
                    }];
            var check = formvalidation($scope.allvalidation);

            if (check) {
                $scope.refine.salary_credited_since = $filter('date')($scope.refine.salary_credited_since, "yyyy-MM-dd");
                MyServices.refinestepawayset($scope.refine);
                $location.url("/app/carapply");

            };
        }
    })
    //SAPANA ENDS
    //sapana starts
    .controller('HomeLoansCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter, $ionicLoading) {
        $ionicLoading.show();
        $scope.homeloan = {
            'enq_loanAmtTo': 20000,
            'enq_tenureTo': 6,
            'enq_currIncomeTo': 15000,
            'enq_is_salaried_ddl': "No"

        };
        $scope.valid_date = false;
        $ionicModal.fromTemplateUrl('templates/popupsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModalComp = function () {
            $scope.modal.hide();
        };

        //know more
        $ionicModal.fromTemplateUrl('templates/termsandcondition.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalterms = modal;
        });

        $scope.openTerms = function () {
            $scope.modalterms.show();
        };

        $scope.closeModal = function () {
            $scope.modalterms.hide();
        };
        $ionicModal.fromTemplateUrl('templates/popupsearchcity.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalcity = modal;
        });

        $scope.selectcity = function () {
            $scope.modalcity.show();
        }

        $scope.closeModalCity = function () {
            $scope.modalcity.hide();
        };
        //  SELECT COMPANY
        $scope.selectcomp = function (comp) {
            console.log(comp);
            $scope.modal.hide();
            $scope.homeloan.enq_company_id = comp;
        }

        $scope.datechange = function () {
            if (parseInt(age($scope.homeloan.enq_dob)) < 18) {
                console.log("chintoo");
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            } else {
                $scope.valid_date = true;
            }


        }
        $scope.getmedeals = function (homeloan) {
            console.log(homeloan);
            if (homeloan.enq_is_salaried_ddl != "no") {
                homeloan.enq_occupation = "Salaried";
            }
            $scope.allvalidation = [{
                field: $scope.homeloan.enq_loanAmtTo,
                validation: ""
        }, {
                field: $scope.homeloan.enq_tenureTo,
                validation: ""
        }, {
                field: $scope.homeloan.enq_currIncomeTo,
                validation: ""
        }, {
                field: $scope.homeloan.enq_dob,
                validation: ""
        }, {
                field: $scope.homeloan.enq_city,
                validation: ""
        }, {
                field: $scope.homeloan.enq_is_salaried_ddl,
                validation: ""
        }, {
                field: $scope.homeloan.property_type,
                validation: ""
        }, {
                field: $scope.homeloan.enq_current_value_property,
                validation: ""
        }];
            var check = formvalidation($scope.allvalidation);

            if ($scope.valid_date == false) {
                var myPopup1 = $ionicPopup.show({
                    title: "Age should be Greater than 18",
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup1.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
            if (check && $scope.valid_date == true) {
                //                $scope.today = new Date();
                homeloan.enq_dob = $filter('date')(homeloan.enq_dob, "dd-MM-yyyy");
                console.log(homeloan.enq_dob);

                MyServices.stepawayset(homeloan);
                $location.url("/app/homechklist");
                //                MyServices.stepawaypl(personal).success(stepawayplsuccess);
            };

        }

        $scope.allvalidation = [];
        //  SELECT CITY
        $scope.selectcityid = function (cityid, cityname) {
            console.log("City Id=" + cityid);
            $scope.modalcity.hide();
            $scope.homeloan.enq_city = cityname;
            $scope.cityName = cityname;
        }
        $ionicLoading.hide();
    })
    //sapana ends

.controller('PersonalChkCtrl', function ($scope, $stateParams, $ionicModal, MyServices, $ionicPopup, $timeout, $location, $filter) {

    //  DECLARATION
    $scope.refine = {};
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
        }];
        var check = formvalidation($scope.allvalidation);

        if (check) {
            $scope.refine.enq_staying_since = $filter('date')($scope.refine.enq_staying_since, "yyyy-MM-dd");;
            $scope.refine.salary_credited_since = $filter('date')($scope.refine.salary_credited_since, "yyyy-MM-dd");;
            //            MyServices.refinestepawaypl($scope.refine).success(refinesuccess);
            MyServices.refinestepawayset($scope.refine);
            $location.url("/app/listloan");
            //            sapana akshay
        };

    }


})

.controller('SMECtrl', function ($scope, $stateParams) {});