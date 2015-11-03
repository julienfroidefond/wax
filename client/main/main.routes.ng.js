'use strict'

angular.module('waxYeoAnguApp')
.config(function($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'client/main/main.view.html',
    controller: 'MainCtrl'
  });
});
