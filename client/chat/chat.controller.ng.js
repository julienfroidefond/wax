'use strict'

angular.module('waxYeoAnguApp')
.controller('ChatCtrl', function($scope, $meteor, $filter, $rootScope, ChatService) {
  $scope.viewName = 'Chat';

  $scope.pageClass= "chat-page";

  $scope.chats = $meteor.collection(function() {
    return Chats.find({}, {
      sort : {createdAt: -1}
    });
  }).subscribe('chats');

  $scope.chatters = $meteor.collection(function() {
    return Chatters.find({});
  }).subscribe('chatters');

  $scope.chatTime = function(time){
    return moment(time).fromNow();
  }
  $scope.send = function() {
    $scope.newChat.userId=$rootScope.currentUser._id;
    $scope.newChat.user=$rootScope.currentUser;
    $scope.chats.save($scope.newChat);
    $scope.newChat = undefined;
  };
  $scope.isOnline = function(user){
    var isOnline = ($filter('filter')($scope.chatters, {userId: user._id}).length > 0);
    return isOnline;
  }

  var chatter = {};
  chatter.userId=$rootScope.currentUser._id;
  if($filter('filter')($scope.chatters, {userId: $rootScope.currentUser._id}).length == 0)
  $scope.chatters.save(chatter);

  $scope.$on('$locationChangeStart', function( event ) {
    var chatters = $filter('filter')($scope.chatters, {userId: $rootScope.currentUser._id})
    for(var i in chatters){
      $scope.chatters.remove(chatters[i]._id);
      // console.log('remove : '+chatters[i].userId);
    }
    // $scope.chatters.remove(_id);
    //$scope.chatters.remove();
  });

});
