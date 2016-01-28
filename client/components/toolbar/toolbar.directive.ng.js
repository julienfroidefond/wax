'use strict'

angular.module('waxYeoAnguApp')
.directive('toolbar', function($filter, $rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.html',
    replace: true,
    link: function($scope){

      var currentUser = Meteor.user();
      if(currentUser && currentUser.profile){
        var avatarId = currentUser.profile.avatar;
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
