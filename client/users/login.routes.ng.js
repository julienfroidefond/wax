'use strict'

angular.module('waxYeoAnguApp')
.config(function($stateProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'client/users/login.view.html',
        controller: 'LoginCtrl'
    }).state('logout', {
        url: '/logout',
        resolve:{
            "logout":function($meteor, $state){
                return $meteor.logout().then(function(){
                    $state.go('login');
                })
            }
        }
    })
});
