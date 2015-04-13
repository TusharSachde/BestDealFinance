var adminurl = "http://demo.bestdealfinance.com/mobileverify/";

var myservices = angular.module('myservices', [])

.factory('MyServices', function($http, $location) {
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
                            "pushwooshid": "123456789596666",
                            "enq_password1": signup.enq_password1,
                            "password_again": signup.password_again

                        }
                    }
                }
            })
        },
        userlogin: function(login) {
            return $http({
                url: adminurl + "login",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {
                        "login": login
                    }
                }
            })
        },
        getcategories: function() {
            return $http({
                url: adminurl + "getcategories",
                method: "POST",
                data: {
                    "AppId": "46b4e721-18bd-4fd6-8209-a805aea2da5b",
                    "Token": "1234",
                    "Data": {}
                }
            })
        }

    };

});