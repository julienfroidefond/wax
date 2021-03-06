'use strict'

angular.module('waxYeoAnguApp')
.config(function($stateProvider) {
  $stateProvider
  .state('projects-list', {
    url: '/projects',
    templateUrl: 'client/projects/projects-list.view.html',
    controller: 'ProjectsListCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  })
  .state('project-detail', {
    url: '/projects/:projectId',
    templateUrl: 'client/projects/project-detail.view.html',
    controller: 'ProjectDetailCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  });
});
