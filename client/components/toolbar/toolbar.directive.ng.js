'use strict'

angular.module('waxYeoAnguApp')
.directive('toolbar', function($meteor, $filter, $rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.html',
    replace: true,
    link: function($scope){
      if($rootScope.currentUser && $rootScope.currentUser.profile){
        var avatarId = $rootScope.currentUser.profile.avatar;
        $scope.avatar = $meteor.collectionFS(function(){
          return Images.find({_id : avatarId});
        }, false).subscribe('images');
      }
    }
  };
});
