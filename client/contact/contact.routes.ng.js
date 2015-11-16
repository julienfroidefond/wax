'use strict'

angular.module('waxYeoAnguApp')
.config(function($stateProvider) {
  $stateProvider
  .state('contact', {
    url: '/contact',
    templateUrl: 'client/contact/contact.view.html',
    controller: 'ContactCtrl'
  });
});
