'use strict'

angular.module('waxYeoAnguApp')
.config(function($stateProvider) {
  $stateProvider
  .state('chat', {
    url: '/chat',
    templateUrl: 'client/chat/chat.view.html',
    controller: 'ChatCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  });
});
