'use strict'

angular.module('waxYeoAnguApp')
.controller('ProjectsListCtrl', function($scope, $meteor, $filter, $rootScope) {
  $scope.page = 1
  $scope.perPage = 8
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'


  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

  $scope.projects = $scope.$meteorCollection(function() {
    return Projects.find({}, {sort:$scope.getReactively('sort')});
  });

  $meteor.autorun($scope, function() {
    $scope.$meteorSubscribe('projects', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function() {
      $scope.projectsCount = $scope.$meteorObject(Counts, 'numberOfProjects', false);
    });
  });

  $meteor.session('projectsCounter').bind($scope, 'page');

  $scope.save = function() {
    if($scope.form.$valid) {
        $scope.newProject.owner=$rootScope.currentUser._id;
        $scope.projects.save($scope.newProject);
        $scope.newProject = undefined;
    }
  };

  $scope.hasRights = function(project) {
      return $rootScope.currentUser && project.owner==$rootScope.currentUser._id
  };

  $scope.remove = function(project) {
    $scope.projects.remove(project);
  };

  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  $scope.getMainImage = function(images) {
    if (images && images.length && images[0] && images[0].id) {
      var url = $filter('filter')($scope.images, {_id: images[0].id})[0].url();
      return url;
    }
  };

  $scope.getImageUrl = function(images, idToFind) {
    if (images && images.length) {
      var url = $filter('filter')($scope.images, {_id: idToFind})[0].url();
      return url;
    }
  };

  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
    }
  });
});
