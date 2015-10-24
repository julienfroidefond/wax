'use strict'

angular.module('waxYeoAnguApp')
.controller('ProjectDetailCtrl', function($scope, $stateParams, $meteor, $filter, $rootScope, $location) {

    $scope.project = $scope.$meteorObject(Projects, $stateParams.projectId);
    $scope.$meteorSubscribe('projects');

    $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

    $scope.newImages = [];

    $scope.save = function() {

        //if($scope.form.$valid) {
            if ($scope.newImages && $scope.newImages.length > 0) {
                $scope.project.images = [];
                angular.forEach($scope.newImages, function(image) {
                    $scope.project.images.push({id: image._id});
                });
            }
            $scope.project.save().then(
                function(numberOfDocs) {
                    console.log('save successful, docs affected ', numberOfDocs);
                    $location.path('/projects');
                },
                function(error) {
                    console.log('save error ', error);
                }
            )
        // }
    };

    $scope.reset = function() {
        $scope.project.reset();
    };

    $scope.addImages = function (files) {
        if (files.length > 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function() {
                    $scope.imgSrc = e.target.result;
                    $scope.myCroppedImage = '';
                });
            };
            reader.readAsDataURL(files[0]);
        }
        else {
            $scope.imgSrc = undefined;
        }

    };
    $scope.saveCroppedImage = function() {
      if ($scope.myCroppedImage !== '') {
        $scope.images.save($scope.myCroppedImage).then(function(result) {
          $scope.newImages.push(result[0]._id);
          $scope.imgSrc = undefined;
          $scope.myCroppedImage = '';
          $('#popup').modal('hide');
        });
      }

    };
    $scope.showPopup = function() {
      $('#popup').modal('show');
    };

    $scope.getMainImage = function(images) {
      if (images && images.length && images[0]) {
          if($filter('filter')($scope.images, {_id: images[0].id}).length>0){
        var url = $filter('filter')($scope.images, {_id: images[0].id})[0].url();
        return url;
    }
      }
    };
    $scope.getImageUrl = function(images, idToFind) {
      if (images && images.length && $scope.images && $scope.images.length) {
          if($filter('filter')($scope.images, {_id: idToFind}).length>0){
            var url = $filter('filter')($scope.images, {_id: idToFind})[0].url();
            return url;
        }
      }
    };

    $scope.hasRights = function(){
        return $rootScope.currentUser && $scope.project.owner==$rootScope.currentUser._id
    }
});
