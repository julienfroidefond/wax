'use strict'

angular.module('waxYeoAnguApp')
.config(function($stateProvider) {
  $stateProvider
  .state('about', {
    url: '/about',
    templateUrl: 'client/about/about.view.html',
    controller: 'AboutCtrl'
  });
});
