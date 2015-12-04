'use strict'

angular.module('waxYeoAnguApp')
.controller('ProjectsListCtrl', function($scope, $meteor, $filter, $rootScope, $sce, UserService, ImageService, $location) {
  $scope.page = 1
  $scope.perPage = 8
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'

  $scope.pageClass= "project-list-page";

  $scope.projects = $scope.$meteorCollection(function() {

    var limitP = parseInt($scope.getReactively('perPage'));
    var skipP = parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage'));
    var sortP = $scope.getReactively('sort');
    return Projects.find({}, {
      limit: limitP,
      skip: skipP,
      sort: sortP
    });
  });

  $meteor.autorun($scope, function() {

    var limitP = parseInt($scope.getReactively('perPage'));
    var skipP = parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage'));
    var sortP = $scope.getReactively('sort');
    $scope.$meteorSubscribe('projects', {
      limit: limitP,
      skip: skipP,
      sort: sortP
    }, $scope.getReactively('search')).then(function(a) {
      $scope.projectsCount = $scope.$meteorObject(Counts, 'numberOfProjects', false);
    });
  });


  $scope.newProject={};
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.newProject.ownerAvatar=$rootScope.currentUser.profile.avatar;
      $scope.newProject.owner=$rootScope.currentUser._id;
      $scope.projects.save($scope.newProject).then( function(e) {
        $location.path('/projects/'+e[0]._id);
      }, function(err) {
        console.error( 'An error occurred. The error message is: ' + err.message);
      });
      $scope.newProject = {};
    }
  };
  $scope.nbLikes = function(project){
    if(!project.likers) return 0;
    return project.likers.length;
  }

  $scope.hasRights = function(project) {
    return $rootScope.currentUser && project.owner==$rootScope.currentUser._id
  };

  $scope.remove = function(project) {
    $scope.projects.remove(project);
  };

  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  $scope.getMainImage = function(image) {
    return ImageService.getImageById(image);
  };

  $scope.getImageUrl = function(images, idToFind) {
    return ImageService.getImageUrl(images, idToFind);
  };

  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
    }
  });

  $scope.getUser= function(idToFind){
    return UserService.getUser(idToFind);
  }

  $scope.getHtml = function(html) {
    return $sce.trustAsHtml(html);
  };

  if($rootScope.currentUser)
  $scope.projectParticipe = UserService.getProjectParticipeTo($rootScope.currentUser)

  $scope.projectCreatedDate = function(time){
    return moment(time).fromNow();
  }
  // if($rootScope.currentUser){
  //   $scope.myProject = $scope.$meteorCollection(function() {
  //     return Projects.find({_id : $rootScope.currentUser.profile.participeTo}, {});
  //   }).subscribe('projects');
  // }
});
