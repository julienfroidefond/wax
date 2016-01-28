'use strict'

angular.module('waxYeoAnguApp')
.config(function($stateProvider) {
  $stateProvider
  .state('chat', {
    url: '/chat',
    templateUrl: 'client/chat/chat.view.html',
    controller: 'ChatCtrl',
    resolve: {
      currentUser: ($q) => {
        if (Meteor.userId() == null) {
          return $q.reject();
        }
        else {
          return $q.resolve();
        }
      }
    }
  });
});
