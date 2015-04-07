angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('RegisterCtrl', function ($scope, $stateParams) {})

.controller('ForgotCtrl', function ($scope, $stateParams) {})

.controller('HomeCtrl', function ($scope, $stateParams) {})

.controller('MyplanCtrl', function ($scope, $stateParams) {})

.controller('FinanceCtrl', function ($scope, $stateParams) {})

.controller('GenieCtrl', function ($scope, $stateParams) {})

.controller('LoanCtrl', function ($scope, $stateParams) {})
    .controller('CheckCtrl', function ($scope, $stateParams) {})
    .controller('TwowheelerListCtrl', function ($scope, $stateParams) {})
    .controller('TwowheelerchkCtrl', function ($scope, $stateParams) {})
    .controller('TwowheelerapplyCtrl', function ($scope, $stateParams) {})
    .controller('SecuritychkCtrl', function ($scope, $stateParams) {})
    .controller('SecuritychkformCtrl', function ($scope, $stateParams) {})
    .controller('SecurityapplyCtrl', function ($scope, $stateParams) {})
    .controller('PropertychkCtrl', function ($scope, $stateParams) {})
    .controller('PropertychkformCtrl', function ($scope, $stateParams) {})
    .controller('PropertyapplyCtrl', function ($scope, $stateParams) {})

    .controller('CarApplyCtrl', function ($scope, $stateParams) {})
    .controller('CarChkListCtrl', function ($scope, $stateParams) {})
    .controller('HomeChkListCtrl', function ($scope, $stateParams) {})
    .controller('HomeApplyCtrl', function ($scope, $stateParams) {})
    .controller('HomeChkCtrl', function ($scope, $stateParams) {})
    .controller('PersonalLoanCtrl', function ($scope, $stateParams) {
        $scope.personal = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };
    })

.controller('CarLoanCtrl', function ($scope, $stateParams) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };

    })
    .controller('TwowheelerLoanCtrl', function ($scope, $stateParams) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };

    })

.controller('SecurityLoanCtrl', function ($scope, $stateParams) {

        $scope.carloan = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };

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
    .controller('HomeLoansCtrl', function ($scope, $stateParams) {

        //        $scope.carloan = {
        //            'loan': 20000,
        //            'tenure': 6,
        //            'income': 15000
        //
        //        };

    })

.controller('PersonalChkCtrl', function ($scope, $stateParams) {})

.controller('SMECtrl', function ($scope, $stateParams) {});