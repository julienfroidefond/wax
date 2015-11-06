'use strict';

angular.module('waxYeoAnguApp')
.controller('AboutCtrl', function($scope, $meteor, $filter) {
  $scope.viewName = 'About';
  $scope.pageClass= "about-page";

  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  $scope.isWaxer = function(user){
    //   UserService.userIsWaxer(user, function(data){
    //       return data;
    //   });
  }
});
