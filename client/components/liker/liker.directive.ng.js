'use strict'

angular.module('waxYeoAnguApp')
.directive('liker', function($meteor, $filter, $rootScope, ProjectService, $auth) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/liker/liker.view.html',
    replace: true,
    scope: {
      project: "=",
      cssClasses: "@"
    },
    link: function($scope, element, attrs){

      var user = $auth.getUserInfo().currentUser;

      $scope.alreadyLiked = function(){
        var alreadyLiked = false;
        if($scope.project && $scope.project.likers){
          var likers = $scope.project.likers;
          likers = _.without(likers, null);
          var index = _.indexOf(likers, user._id);
          alreadyLiked = (index != -1);
        }
        return alreadyLiked;
      }
      $scope.like = function(){
        var likers = $scope.project.likers;
        if(!likers) likers=[];

        if(!$scope.alreadyLiked()){
          likers.push(user._id);
          ProjectService.sendNewLikeMail($scope.project._id, user._id, function(){})
        }else{
          var index = _.indexOf(likers, user._id);
          if(index != -1)
          likers.splice(index, 1);

        }
        Projects.update($scope.project._id, {
          $set: {likers: likers}
        });
      }
      $scope.nbLikes = function(){
        if(!$scope.project.likers) return 0;
        return $scope.project.likers.length;
      }
    }
  };
});
