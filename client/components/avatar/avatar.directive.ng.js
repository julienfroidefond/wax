'use strict'

angular.module('waxYeoAnguApp')
.directive('avatar', function($meteor, $filter, $rootScope, ImageService) {
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
      if($scope.user){
        var avatarId = $scope.user.profile.avatar;
        $scope.avatar = ImageService.getAvatarUrl(avatarId, {width : $scope.width || 50, height : $scope.width || 50, crop:"fill"});
        $scope.email = $scope.user.emails[0].address;
        $scope.name = $scope.user.profile.firstName;
      }
      else{
        if($rootScope.currentUser && $rootScope.currentUser.profile){
          var avatarId = $rootScope.currentUser.profile.avatar;
          $scope.avatar = ImageService.getAvatarUrl(avatarId, {width : $scope.width || 50, height : $scope.width || 50, crop:"fill"});
          $scope.email = $rootScope.currentUser.emails[0].address;
          $scope.name = $rootScope.currentUser.profile.firstName;
        }
      }
    }
  };
});
