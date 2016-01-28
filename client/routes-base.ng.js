'use strict';

angular.module('waxYeoAnguApp')

.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}).run(['$rootScope', '$state', function($rootScope, $state) {

  $.cloudinary.config().cloud_name = "dpcocrdyl";
  
  $rootScope.isInRole = function(role, group) {
    return Roles._uiHelpers.isInRole(role, group);
  }
  $rootScope.userIsInRole = function(user, role, group) {
    return Roles.userIsInRole(user, role, group);
  }
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    switch(error) {
      case 'AUTH_REQUIRED':
      case 'FORBIDDEN':
      case 'UNAUTHORIZED':
      $state.go('main');
      break;
    }
  });
}]);
