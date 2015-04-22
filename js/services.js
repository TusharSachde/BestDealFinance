var adminurl = "http://demo.bestdealfinance.com/mobileverify/";

var myservices = angular.module('myservices', [])

.factory('MyServices', function($http, $location) {


    var planfor = [{
        text: "Home",
        select: "selected",
        class: "home"
    }, {
        text: "Home Improvement",
        select: "",
        class: "improvement"
    }, {
        text: "Automobiles",
        select: "",
        class: "automobile"
    }, {
        text: "Travel",
        select: "",
        class: "travel"
    }, ];

    return {
        userregister: function(signup) {
            return $http({
                url: adminurl + "signup",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "signup": {
                            "enq_name": signup.enq_name,
                            "enq_mobile": signup.enq_mobile,
                            "enq_email": signup.enq_email,
                            "enq_password1": signup.enq_password1,
                            "password_again": signup.password_again
                        }
                    }
                }
            });
        },
        userlogin: function(login) {
            return $http({
                url: adminurl + "mobilelogin",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "login": {
                            "enq_username": login.enq_username,
                            "enq_password": login.enq_password
                        }
                    }
                }
            })
        },
        getcategories: function() {
            return $http({
                url: adminurl + "getbusinesscategories",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },
        getdropdowncity: function() {
            return $http({
                url: adminurl + "getcity",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },
        getdropdownstate: function() {
            return $http({
                url: adminurl + "getstate",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },
        getdropdownmanufacturer: function() {
            return $http({
                url: adminurl + "getmanufacturer",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },
        getmodel: function() {
            return $http({
                url: adminurl + "getmodel",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },
        getocupation: function() {
            return $http({
                url: adminurl + "getocupation",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },
        getcompany: function() {
            return $http({
                url: adminurl + "getcompany",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        },
        getcategoriesuser: function(userid) {
            return $http({
                url: adminurl + "getbusinesscategories",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "busscat": {
                            "userid": userid
                        }

                    }
                }
            })
        },
        forgotpassword: function(email) {
            return $http({
                url: adminurl + "forgotpassword",
                method: "POST",
                data: {
                    "Token": "1234",
                    "Data": {
                        "email": email.email
                    }
                }
            })
        },
        validateotp: function(otp) {
            console.log("in service otp");
            console.log(otp);
            return $http({
                url: adminurl + "mobilevalidateOTP",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "otpdata": {
                            "OTPno": otp.userotp,
                            "U_mobile": otp.mobile,
                            "U_SessionForOTPvalidate": otp.regsID,
                            "U_password": otp.password
                        }
                    }

                }
            })
        },
        listallmyplans: function(otp) {
            return $http({
                url: adminurl + "listallmyplans",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "sessionid": $.jStorage.get("user").customersessionid
                    }

                }
            })
        },
        stepawaypl: function() {
            var personal = $.jStorage.get("stepaway");
            var pldata = {
                "enq_loanType": "Personal",
                "enq_loanTypePreFix": "25",
                "enq_have_loan": "No",
                "enq_dob": personal.enq_dob,
                "enq_city": personal.enq_city,
                "enq_is_salaried_ddl": personal.enq_is_salaried_ddl,
                "enq_occupation": personal.enq_occupation,
                "enq_company_id": personal.enq_company_id,
                "enq_have_loan_ddl": "No",
                "enq_loanAmtTo": personal.enq_loanAmtTo,
                "enq_tenureTo": personal.enq_tenureTo,
                "enq_currIncomeTo": personal.enq_currIncomeTo
            };
            return $http({
                url: adminurl + "stepawaypl",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": pldata
                }
            })
        },
        refinestepawaypl: function(refine) {
            return $http({
                url: adminurl + "refinestepawaypl",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "enq_gender": refine.enq_gender,
                        "enq_maritial_status": refine.enq_maritial_status,
                        "enq_nationality": refine.enq_nationality,
                        "enq_present_use_property": refine.enq_present_use_property,
                        "enq_staying_since": refine.enq_staying_since,
                        "enq_company_consitution": refine.enq_company_consitution,
                        "salary_credited_since": refine.salary_credited_since,
                        "pl_total_exp_job_years": refine.pl_total_exp_job_years,
                        "enq_emi_existing_loan": refine.enq_emi_existing_loan,
                        "enq_have_loan_ddl": refine.enq_have_loan_ddl,
                        "enq_loanAmtTo": $.jStorage.get("stepaway").enq_loanAmtTo,
                        "enq_tenureTo": $.jStorage.get("stepaway").enq_tenureTo,
                        "enq_currIncomeTo": $.jStorage.get("stepaway").enq_currIncomeTo,
                        "appid": refine.appid
                    }

                }
            })
        },
        Insertmyplans: function(plan) {
            return $http({
                url: adminurl + "Insertmyplans",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "userid": $.jStorage.get("user").customerid,
                        "sessionid": $.jStorage.get("user").customersessionid,
                        "planame": plan.planame,
                        "planamount": plan.planamount,
                        "plandate": plan.plandate,
                        "planingfor": plan.planingfor
                    }

                }
            })
        },
        updatetmyplans: function(plan) {
            return $http({
                url: adminurl + "updatetmyplans",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "planid": plan.planid,
                        "userid": $.jStorage.get("user").customerid,
                        "sessionid": $.jStorage.get("user").customersessionid,
                        "planame": plan.planame,
                        "planamount": plan.planamount,
                        "plandate": plan.plandate,
                        "planingfor": plan.planingfor
                    }

                }
            })
        },
        daletetmyplans: function(planid) {
            return $http({
                url: adminurl + "daletetmyplans",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "planid": planid,
                        "sessionid": $.jStorage.get("user").customersessionid
                    }
                }
            })
        },
        mysingleplan: function(planid) {
            return $http({
                url: adminurl + "mysingleplan",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "planid": planid
                    }
                }
            })
        },
        getplaningfor: function() {
            return planfor;
        },
        getpldata: function() {
            $.jStorage.get("pldata");
        },
        stepawayset: function(stepaway) {
            $.jStorage.set("stepaway", stepaway);
        },
        stepswayget: function() {
            $.jStorage.get("stepaway");
        },
        setcheck: function(check) {
            $.jStorage.set("check", check);
        },
        getcheck: function() {
            $.jStorage.get("check");
        },
        setuser: function(userdata) {
            $.jStorage.set("user", userdata);
        },
        getuser: function() {
            return $.jStorage.get("user");
        },
        flushuser: function() {
            return $.jStorage.flush();
        }

    };

});