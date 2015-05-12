var adminurl = "http://demo.bestdealfinance.com/mobileverify/";
var abcdf = "";
var myservices = angular.module('myservices', [])

.factory('MyServices', function ($http, $location) {


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








    // testing


    var testing = {
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

    //    console.log(JSON.parse(testing));









    return {
        userregister: function (signup) {
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
        userlogin: function (login) {
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
        getcategories: function () {
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
        getdropdowncity: function () {
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
        getdropdownstate: function () {
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
        getdropdownmanufacturer: function () {
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
        getmodel: function () {
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
        manufature_models: function (model) {
            return $http({
                url: adminurl + "getmanumodel",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "manuid": model
                    }
                }
            })
        },
        getocupation: function () {
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
        getcompany: function () {
            return $http({
                url: adminurl + "getcompany",
                method: "POST",
                data: {
//                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
//                    "Token": "1234",
//                    "Data": {}
                }
            })
        },
        getcategoriesuser: function (userid) {
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
        forgotpassword: function (email) {
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
        validateotp: function (otp) {
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
        listallmyplans: function (otp) {
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
        stepawaypl: function () {
            var personal = $.jStorage.get("stepaway");
            var session = $.jStorage.get("user");
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
                "enq_currIncomeTo": personal.enq_currIncomeTo,
                "customersessionid": session.customersessionid
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
        refinestepawaypl: function () {
            var refine = $.jStorage.get("refine");
            var stepaway = $.jStorage.get("stepaway");
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
                        "enq_loanAmtTo": stepaway.enq_loanAmtTo,
                        "enq_tenureTo": stepaway.enq_tenureTo,
                        "enq_currIncomeTo": stepaway.enq_currIncomeTo,
                        "appid": refine.appid
                    }

                }
            })
        },
        //SAPANA START
        refinestepawaycar: function () {
            var refine = $.jStorage.get("refine");
            var stepaway = $.jStorage.get("stepaway");
            return $http({
                url: adminurl + "refinestepawaycar",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "enq_loanType": "Car",
                        "enq_gender": refine.enq_gender,
                        "enq_maritial_status": refine.enq_maritial_status,
                        "enq_nationality": refine.enq_nationality,
                        "enq_status": refine.enq_status,
                        "enq_manufacturer": "Rented",
                        "enq_usage": refine.enq_usage,
                        "enq_pincode": refine.enq_pincode,
                        "selectAllexisting_bank_relationship": refine.selectAllexisting_bank_relationship,
                        "salary_credited_since": refine.salary_credited_since,
                        "owner_expiry_date": refine.owner_expiry_date,
                        "enq_emi_existing_loan": "0",
                        "enq_have_loan_ddl": refine.enq_have_loan_ddl,
                        "enq_loanAmtTo": stepaway.enq_loanAmtTo,
                        "enq_tenureTo": stepaway.enq_tenureTo,
                        "enq_currIncomeTo": stepaway.enq_currIncomeTo,
                        "appid": refine.appid
                    }

                }
            })
        },
        //SAPANA END
        //SAPANA START
        refinestepawayhome: function () {
            var refine = $.jStorage.get("refine");
            var stepaway = $.jStorage.get("stepaway");
            return $http({
                url: adminurl + "refinestepawayhome",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "enq_loanType": "Home",
                        "enq_gender": refine.enq_gender,
                        "enq_maritial_status": refine.enq_maritial_status,
                        "enq_nationality": refine.enq_nationality,
                        "enq_status": refine.enq_status,
                        "enq_pincode": refine.enq_pincode,
                        "property_classification": refine.property_classification,
                        "enq_exclusive_rate_property": "",
                        "salary_credited_since": refine.salary_credited_since,
                        "enq_present_use_property": refine.enq_present_use_property,
                        "enq_Purpose": refine.enq_Purpose,
                        //                        "enq_emi_existing_loan": "0",
                        "enq_have_loan_ddl": refine.enq_have_loan_ddl,
                        "step_enq_loanAmtTo": stepaway.enq_loanAmtTo,
                        "step_enq_tenureTo": stepaway.enq_tenureTo,
                        "step_enq_currIncomeTo": stepaway.enq_currIncomeTo,
                        "appid": refine.appid
                    }

                }
            })
        },
        //SAPANA END
        ////mahesh //////
        stepawaycc: function () {
            var creditloan = $.jStorage.get("stepaway");
            var session = $.jStorage.get("user");
            var ccdata = {
                "enq_loanType": "Credit Card",
                "enq_loanTypePreFix": "11",
                //                "enq_have_loan": "No",
                "enq_dob": creditloan.enq_dob,
                "enq_city": creditloan.enq_city,
                "enq_is_salaried_ddl": creditloan.enq_is_salaried_ddl,
                "enq_occupation": creditloan.enq_occupation,
                "enq_company_id": creditloan.enq_company_id,
                "salary_credited_since": creditloan.salary_credited_since,
                "enq_staying_since": creditloan.enq_staying_since,
                "fd_maturity_type": creditloan.fd_maturity_type,
                "enq_existing_card_holder": creditloan.enq_existing_card_holder,
                "cc_card_limit": creditloan.cc_card_limit,
                //                "enq_have_loan_ddl": "No",
                "enq_currIncomeTo": creditloan.enq_currIncomeTo,
                "customersessionid": session.customersessionid
            };
            return $http({
                url: adminurl + "stepawaycc",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": ccdata
                }
            })
        },
        ///end/////
        //carloan sapana start
        stepawaycar: function () {
            var carloan = $.jStorage.get("stepaway");
            var session = $.jStorage.get("user");
            var cardata = {
                "enq_loanType": "Car",
                "enq_loanTypePreFix": "22",
                "enq_loanType_SubType": "5",
                "enq_have_loan": "No",
                "enq_dob": carloan.enq_dob,
                "enq_state": carloan.enq_state,
                "enq_is_salaried_ddl": carloan.enq_is_salaried_ddl,
                "enq_occupation": carloan.enq_occupation,
                "enq_company_id": carloan.enq_company_id,
                "enq_manufacturer": carloan.enq_manufacturer,
                "enq_model": carloan.enq_model,
                "ex_showroom_cost": carloan.ex_showroom_cost,
                "enq_loanAmtTo": carloan.enq_loanAmtTo,
                "enq_tenureTo": carloan.enq_tenureTo,
                "enq_currIncomeTo": carloan.enq_currIncomeTo,
                "customersessionid": session.customersessionid
            };
            return $http({
                url: adminurl + "stepawaycar",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": cardata
                }
            })
        },
        //sapana ends
        //DHAVAL START
        refinestepawaytw: function () {
            var refine = $.jStorage.get("refine");
            var stepaway = $.jStorage.get("stepaway");
            return $http({
                url: adminurl + "refinestepawaytw",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "enq_loanType": "Two Wheeler",
                        "enq_gender": refine.enq_gender,
                        "enq_maritial_status": refine.enq_maritial_status,
                        "enq_status": refine.enq_status,
                        "enq_nationality": refine.enq_nationality,
                        "enq_pincode": refine.enq_pincode,
                        "salary_credited_since": refine.salary_credited_since,
                        "enq_residence_tw": refine.enq_residence_tw,
                        "enq_staying_since": refine.enq_staying_since,
                        "enq_have_loan_ddl": refine.enq_have_loan_ddl,
                        "enq_bank_ac_tw": refine.enq_bank_ac_tw,
                        "enq_bank_ac_tw_since": refine.enq_bank_ac_tw_since,
                        "enq_emi_existing_loan": refine.enq_emi_existing_loan,
                        "enq_loanAmtTo": stepaway.enq_loanAmtTo,
                        "enq_tenureTo": stepaway.enq_tenureTo,
                        "enq_currIncomeTo": stepaway.enq_currIncomeTo,
                        "appid": refine.appid
                    }
                }

            })
        },
        //DHAVAL END
        //Security loan start
        stepawaysecurity: function () {
            var security = $.jStorage.get("stepaway");
            var session = $.jStorage.get("user");
            var securitydata = {
                "enq_loanType": "Loan Against Shares",
                "enq_loanTypePreFix": "27",
                //                "enq_have_loan": "No",
                "enq_loanType_SubType": "11",
                //                "enq_loan_for": "Self",
                "enq_dob": security.enq_dob,

                "enq_city": security.enq_city,
                "enq_is_salaried_ddl": security.enq_is_salaried_ddl,
                //                "enq_occupation": security.enq_occupation,
                "enq_company_id": security.enq_company_id,
                "enq_securities_market_value": security.property_current_market_value,
                //                "enq_have_loan_ddl": "No",
                //                "property_type": security.property_type,
                "step_enq_loanAmtTo": security.enq_loanAmtTo,
                "step_enq_tenureTo": security.enq_tenureTo,
                "step_enq_currIncomeTo": security.enq_currIncomeTo,
                "customersessionid": session.customersessionid
            };
            return $http({
                url: adminurl + "stepawaylas",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": securitydata
                }
            })
        },
        //end 
        //Property loan start
        stepawayproperty: function () {
            var property = $.jStorage.get("stepaway");
            var session = $.jStorage.get("user");
            var propertyloan = {
                "enq_loanType": "Loan Against Property",
                "enq_loanTypePreFix": "27",
                //                "enq_have_loan": "No",
                "enq_loanType_SubType": "Loan Against Property (Commercial / Residential)",
                "enq_loan_for": "Self",
                "enq_dob": property.enq_dob,

                "enq_city": property.enq_city,
                "enq_is_salaried_ddl": property.enq_is_salaried_ddl,
                "enq_occupation": property.enq_occupation,
                "enq_company_name": property.enq_company_id,
                "property_current_market_value": "2500000",
                //                "enq_have_loan_ddl": "No",
                "property_type": property.property_type,
                "enq_present_use_property": "Self occupied",
                "step_enq_loanAmtTo": property.enq_loanAmtTo,
                "step_enq_tenureTo": property.enq_tenureTo,
                "step_enq_currIncomeTo": property.enq_currIncomeTo,
                "customersessionid": session.customersessionid
            };
            return $http({
                url: adminurl + "stepawaylap",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": propertyloan
                }
            })
        },
        //end 
        //SAPANA START
        refinestepawayproperty: function () {
            var refine = $.jStorage.get("refine");
            var stepaway = $.jStorage.get("stepaway");
            return $http({
                url: adminurl + "refinestepawaylap",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "enq_gender": refine.enq_gender,
                        "enq_maritial_status": refine.enq_maritial_status,
                        "enq_status": refine.enq_status,
                        "enq_nationality": refine.enq_nationality,
                        "property_classification": refine.property_classification,
                        "enq_pincode": refine.enq_pincode,
                        "property_area": refine.property_area,
                        "enq_have_loan_ddl": refine.enq_have_loan_ddl,
                        "owner_expiry_date": refine.owner_expiry_date,
                        "enq_property_situated": refine.enq_property_situated,
                        "step_enq_loanAmtTo": stepaway.enq_loanAmtTo,
                        "step_enq_tenureTo": stepaway.enq_tenureTo,
                        "step_enq_currIncomeTo": stepaway.enq_currIncomeTo,
                        "appid": refine.appid
                    }

                }
            })
        },
        //SAPANA END
        // homeloan sapana start
        stepawayhome: function () {
            var homeloan = $.jStorage.get("stepaway");
            var session = $.jStorage.get("user");
            var homedata = {
                "enq_loanType": "Home",
                "enq_loanTypePreFix": "26",
                "enq_dob": homeloan.enq_dob,
                "enq_city": homeloan.enq_city,
                "enq_is_salaried_ddl": homeloan.enq_is_salaried_ddl,
                "enq_occupation": "Salaried",
                //                "enq_occupation": homeloan.enq_occupation,
                "enq_company_id": homeloan.enq_company_id,
                "property_type": homeloan.property_type,
                "enq_current_value_property": homeloan.enq_current_value_property,
                "step_enq_loanAmtTo": homeloan.enq_loanAmtTo,
                "step_enq_tenureTo": homeloan.enq_tenureTo,
                "step_enq_currIncomeTo": homeloan.enq_currIncomeTo,
                "customersessionid": session.customersessionid
            };
            return $http({
                url: adminurl + "stepawayhome",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": homedata
                }
            })
        },
        //sapana end
        //dhaval start
        stepawaytw: function () {
            var tw = $.jStorage.get("stepaway");
            var session = $.jStorage.get("user");
            var twdata = {
                "enq_loanType": "Two Wheeler",
                "enq_loanTypePreFix": "23",
                "enq_dob": tw.enq_dob,
                "enq_is_salaried_ddl": tw.enq_is_salaried_ddl,
                "enq_occupation": tw.enq_occupation,
                "enq_company_id": tw.enq_company_id,
                "enq_city": tw.enq_city,
                "enq_manufacturer": "344",
                "enq_model": "2643",
                "ex_showroom_cost": tw.ex_showroom_cost,
                "enq_loanAmtTo": tw.enq_loanAmtTo,
                "enq_tenureTo": tw.enq_tenureTo,
                "enq_currIncomeTo": tw.enq_currIncomeTo,
                "customersessionid": session.customersessionid
            };
            return $http({
                url: adminurl + "stepawaytw",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": twdata
                }
            })
        },
        //DHAVAL START
        smebusinesssolution: function (smebs) {
            return $http({
                url: adminurl + "SME",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": smebs
                }
            })
        },
        smecommercialvehicle: function (smecv) {
            return $http({
                url: adminurl + "SME",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": smecv
                }
            })
        },
        smeprojectfinance: function (smepf) {
            return $http({
                url: adminurl + "SME",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": smepf
                }
            })
        },
        //DHAVAL END        
        //dhaval end
        Insertmyplans: function (plan) {
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
        updatetmyplans: function (plan) {
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
        daletetmyplans: function (planid) {
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
        mysingleplan: function (planid) {
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
        //DHAVAL START
        getmanumodel: function (manuf) {
            return $http({
                url: adminurl + "getmanumodel",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "manuid": manuf
                    }
                }
            })
        },
        //DHAVAL END
        getplaningfor: function () {
            return planfor;
        },
        getpldata: function () {
            $.jStorage.get("pldata");
        },
        stepawayset: function (stepaway) {
            $.jStorage.deleteKey("stepaway");
            $.jStorage.set("stepaway", stepaway);
        },
        stepswayget: function () {
            $.jStorage.get("stepaway");
        },
        refinestepawayset: function (refine) {
            $.jStorage.deleteKey("refine");
            $.jStorage.set("refine", refine);
        },
        refinestepswayget: function () {
            $.jStorage.get("refinestepaway");
        },

        setcheck: function (check) {
            $.jStorage.set("check", check);
        },
        getcheck: function () {
            $.jStorage.get("check");
        },
        setuser: function (userdata) {
            $.jStorage.set("user", userdata);
        },
        getuser: function () {
            return $.jStorage.get("user");
        },
        flushuser: function () {
            return $.jStorage.flush();
        }

    };

});