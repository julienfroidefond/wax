'use strict';

angular.module('waxYeoAnguApp')
.controller('AboutCtrl', function($scope, $filter, $rootScope) {
  $scope.viewName = 'About';
  $scope.pageClass= "about-page";

  $scope.helpers({
    users: () => {
      return Meteor.users.find({});
    }
  });
  $scope.subscribe('users');
  
  $scope.isWaxer = function(user){
    return $rootScope.userIsInRole(user, 'coder', 'waxer');
  }
});
