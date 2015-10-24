'use strict'

angular.module('waxYeoAnguApp')
.controller('LoginCtrl', function($scope, $meteor, $state) {

    var vm = $scope;

    vm.credentials = {
        email: '',
        password: ''
    };

    vm.error = '';

    vm.login = function () {
        $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
            function () {
                $state.go('projects-list');
            },
            function (err) {
                vm.error = 'Login error - ' + err;
            }
        );
    };

    vm.register = function () {
        $meteor.createUser(vm.credentials).then(
            function () {
                $state.go('projects-list');
            },
            function (err) {
                vm.error = 'Registration error - ' + err;
            }
        );
    };

    vm.reset = function () {
        $meteor.forgotPassword({email:vm.credentials.email}).then(
            function () {
                $state.go('projects-list');
            },
            function (err) {
                vm.error = 'Error sending forgot password email - ' + err;
            }
        );
    };
});
