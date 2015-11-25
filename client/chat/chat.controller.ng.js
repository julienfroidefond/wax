'use strict'

angular.module('waxYeoAnguApp')
.controller('ChatCtrl', function($scope, $meteor, $filter, $rootScope) {
  $scope.viewName = 'Chat';

  $scope.pageClass= "chat-page";

  $scope.chats = $meteor.collection(function() {
    return Chats.find({}, {
      sort : {createdAt: -1}
    });
  }).subscribe('chats');

  $scope.chatTime = function(time){
    return moment(time).fromNow();
  }
  $scope.send = function() {
    $scope.newChat.userId=$rootScope.currentUser._id;
    $scope.newChat.user=$rootScope.currentUser;
    $scope.chats.save($scope.newChat);
    $scope.newChat = undefined;
  };

});
