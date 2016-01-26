'use strict'

angular.module('waxYeoAnguApp')
.directive('avatar', function($meteor, $filter, $rootScope, ImageService, $auth) {
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

      var user = $auth.getUserInfo().currentUser;

      if($scope.user){
        var avatarId = $scope.user.profile.avatar;
        $scope.avatar = ImageService.getAvatarUrl(avatarId, {width : $scope.width || 50, height : $scope.width || 50, crop:"fill"});
        $scope.email = $scope.user.emails[0].address;
        $scope.name = $scope.user.profile.firstName;
      }
      else{
        if(user && user.profile){
          var avatarId = user.profile.avatar;
          $scope.avatar = ImageService.getAvatarUrl(avatarId, {width : $scope.width || 50, height : $scope.width || 50, crop:"fill"});
          $scope.email = user.emails[0].address;
          $scope.name = user.profile.firstName;
        }
      }
    }
  };
});
