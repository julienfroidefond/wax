'use strict'

angular.module('waxYeoAnguApp')
.directive('toolbar', function($meteor, $filter) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.html',
    replace: true,
    link: function($scope){

        $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

        $scope.getAvatarUrl = function(idToFind){
            if(!idToFind) return "avatar.jpg";
              if($filter('filter')($scope.images, {_id: idToFind}).length>0){
                var url = $filter('filter')($scope.images, {_id: idToFind})[0].url();
                return url;
            }
        }
    }
  };
});
