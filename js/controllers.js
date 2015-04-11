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
    .controller('CreditCtrl', function ($scope, $stateParams, $ionicModal) {

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
    .controller('MyAccountCtrl', function ($scope, $stateParams) {

        $scope.profile = "bold";

        $scope.changemyapp = function () {
            $scope.myapp = "bold";
            $scope.profile = "";
        }

        $scope.chnageprofile = function () {
            $scope.myapp = "";
            $scope.profile = "bold";


        }
    })
    .controller('ConstructFormCtrl', function ($scope, $stateParams, $ionicModal) {

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
    .controller('CommericialCtrl', function ($scope, $stateParams) {})
    .controller('HealthCtrl', function ($scope, $stateParams) {})
    .controller('SmeBussniessCtrl', function ($scope, $stateParams) {})
    .controller('SmeProjectCtrl', function ($scope, $stateParams) {})
    .controller('SmeFilesCtrl', function ($scope, $stateParams) {})
    .controller('ReferPropertyCtrl', function ($scope, $stateParams) {})
    .controller('ReferEarnCtrl', function ($scope, $stateParams) {})
    .controller('ReferalDetailsCtrl', function ($scope, $stateParams) {})
    .controller('CreditApplyCtrl', function ($scope, $stateParams) {})
    .controller('ReferCtrl', function ($scope, $stateParams) {})
    .controller('GenieDealCtrl', function ($scope, $stateParams) {})
    .controller('ContactusCtrl', function ($scope, $stateParams) {})
    .controller('PersonalLoanCtrl', function ($scope, $stateParams) {
        $scope.personal = {
            'loan': 20000,
            'tenure': 6,
            'income': 15000

        };
    })
    .controller('CarLoanCtrl', function ($scope, $stateParams, $ionicModal) {

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
    .controller('TwowheelerLoanCtrl', function ($scope, $stateParams, $ionicModal) {

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
    .controller('SecurityLoanCtrl', function ($scope, $stateParams, $ionicModal) {

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
    .controller('HomeLoansCtrl', function ($scope, $stateParams, $ionicModal) {

        //        $scope.carloan = {
        //            'loan': 20000,
        //            'tenure': 6,
        //            'income': 15000
        //
        //        };
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

.controller('PersonalChkCtrl', function ($scope, $stateParams) {})

.controller('SMECtrl', function ($scope, $stateParams) {});