'use strict'

angular.module('waxYeoAnguApp')
.directive('avatar', function($filter, ImageService) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/avatar/avatar.view.html',
    replace: true,
    scope: {
      user: "=",
      width: "@",
      imageonly: "@",
      showname: "@"
    },
    link: function($scope, element, attrs){

      var currentUser = Meteor.user();

      if($scope.user){
        var avatarId = $scope.user.profile.avatar;
        $scope.avatar = ImageService.getAvatarUrl(avatarId, {width : $scope.width || 50, height : $scope.width || 50, crop:"fill"});
        $scope.email = $scope.user.emails[0].address;
        $scope.name = $scope.user.profile.firstName;
      }
      else{
        if(currentUser && currentUser.profile){
          var avatarId = currentUser.profile.avatar;
          $scope.avatar = ImageService.getAvatarUrl(avatarId, {width : $scope.width || 50, height : $scope.width || 50, crop:"fill"});
          $scope.email = currentUser.emails[0].address;
          $scope.name = currentUser.profile.firstName;
        }
      }
    }
  };
});
