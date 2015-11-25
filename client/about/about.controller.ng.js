'use strict';

angular.module('waxYeoAnguApp')
.controller('AboutCtrl', function($scope, $meteor, $filter, $rootScope) {
  $scope.viewName = 'About';
  $scope.pageClass= "about-page";

  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  $scope.isWaxer = function(user){
    return $rootScope.userIsInRole(user, 'coder', 'waxer');
  }
});
