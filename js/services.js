var adminurl = "http://localhost/bdf-epura/mobileverify/";

var myservices = angular.module('myservices', [])

.factory('MyServices', function($http, $location) {
    return {
        getcurrency: function(signup) {
            return $http({
                url: adminurl + "signup",
                method: "POST",
                data: {
                    "signup": {
                        "enq_name": "toddwewfewfedwm",
                        "enq_mobile": "98926655855",
                        "enq_email": "tohtrtrheeewfefweweeedetrhif@yahoo.com",
                        "pushwooshid": "123456789596666",
                        "enq_password1": "aderededmin#123",
                        "password_again": "aderededmin#123"
                    }

                }
            })
        }

    };

});