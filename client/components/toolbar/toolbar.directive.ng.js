'use strict'

angular.module('waxYeoAnguApp')
.directive('toolbar', function($meteor, $filter, $rootScope, $auth) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.html',
    replace: true,
    link: function($scope){

      var user = $auth.getUserInfo().currentUser;
      if(user && user.profile){
        var avatarId = user.profile.avatar;
        $scope.subscribe('images');
        $scope.helpers({
          avatar() {
            return Images.find({_id : avatarId});
          }
        });

      }
    }
  };
});
