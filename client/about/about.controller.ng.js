'use strict';

angular.module('waxYeoAnguApp')
.controller('AboutCtrl', function($scope, $meteor, $filter) {
  $scope.viewName = 'About';
  $scope.pageClass= "about-page";

  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  $scope.getImageUrl = function(idToFind) {
      if(!idToFind) return "avatar.jpg";
        if($filter('filter')($scope.images, {_id: idToFind}).length>0){
          var url = $filter('filter')($scope.images, {_id: idToFind})[0].url();
          return url;
      }
  };
});
