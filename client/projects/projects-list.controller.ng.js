'use strict'

angular.module('waxYeoAnguApp')
.controller('ProjectsListCtrl', function($scope, $meteor, $filter, $rootScope, $sce) {
    $scope.page = 1
    $scope.perPage = 8
    $scope.sort = {name_sort : 1};
    $scope.orderProperty = '1'

    $scope.pageClass= "project-list-page";

    $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

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

    $scope.newProject={};
    $scope.save = function() {
        if($scope.form.$valid) {
            $scope.newProject.ownerAvatar=$rootScope.currentUser.profile.avatar;
            $scope.newProject.owner=$rootScope.currentUser._id;
            $scope.projects.save($scope.newProject).then( function() {

                // todos were successfully saved
                console.log('The todo was saved');

            }, function(err) {

                // an error occurred while saving the todos: maybe you're not authorized
                console.error( 'An error occurred. The error message is: ' + err.message);

            });
            $scope.newProject = {};
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

    $scope.getAvatarUrl = function(idToFind){
        if(!idToFind) return "avatar.jpg";
        if($filter('filter')($scope.images, {_id: idToFind}).length>0){
            var url = $filter('filter')($scope.images, {_id: idToFind})[0].url();
            return url;
        }
    }

    $scope.getUser= function(idToFind){
        if(!idToFind) return null;
        if($filter('filter')($scope.users, {_id: idToFind}).length>0){
            return $filter('filter')($scope.users, {_id: idToFind});
        }
    }

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
});
