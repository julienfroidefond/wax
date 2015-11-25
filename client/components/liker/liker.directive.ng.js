'use strict'

angular.module('waxYeoAnguApp')
.directive('liker', function($meteor, $filter, $rootScope) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/liker/liker.view.html',
    replace: true,
    scope: {
      project: "=",
      cssClasses: "@"
    },
    link: function($scope, element, attrs){

      $scope.alreadyLiked = function(){
        var alreadyLiked = false;
        if($scope.project && $scope.project.likers){
          $scope.project.likers = _.without($scope.project.likers, null);
          var index = _.indexOf($scope.project.likers, $rootScope.currentUser._id);
          alreadyLiked = (index != -1);
        }
        return alreadyLiked;
      }
      $scope.like = function(){
        if(!$scope.project.likers) $scope.project.likers=[];

        if(!$scope.alreadyLiked()){
          $scope.project.likers.push($rootScope.currentUser._id);
        }else{
          var index = _.indexOf($scope.project.likers, $rootScope.currentUser._id);
          if(index != -1)
          $scope.project.likers.splice(index, 1);
        }

        //TODO Save project ?

        // projects.save(project).then( function() {
        //     console.log('The project was saved');
        // }, function(err) {
        //     console.error( 'An error occurred. The error message is: ' + err.message);
        // });
      }
      $scope.nbLikes = function(){
        if(!$scope.project.likers) return 0;
        return $scope.project.likers.length;
      }
    }
  };
});
