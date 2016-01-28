'use strict'

angular.module('waxYeoAnguApp')
.controller('ChatCtrl', function($scope, $meteor, $filter, $rootScope, $auth, ChatService, UserService) {

  var currentUser = Meteor.user();

  $scope.viewName = 'Chat';

  $scope.pageClass= "chat-page";

  $scope.helpers({
    chats() {
      return Chats.find({}, {
        sort : {createdAt: -1}
      });
    }
  });
  $scope.subscribe('chats');


  $scope.helpers({
    chatters() {
      return Chatters.find({});
    }
  });
  $scope.subscribe('chatters', function(){}, function(a) {

    var chatters = $filter('filter')($scope.chatters, {userId: currentUser._id})
    for(var i in chatters){
      Chatters.remove(chatters[i]._id);
    }

    var chatter = {};
    chatter.userId=currentUser._id;
    if($filter('filter')($scope.chatters, {userId: currentUser._id}).length == 0)
    Chatters.insert(chatter);
  });


  $scope.chatTime = function(time){
    return moment(time).fromNow();
  }
  $scope.send = function() {
    $scope.newChat.userId=currentUser._id;
    $scope.newChat.user=currentUser;
    Chats.insert($scope.newChat);
    $scope.newChat = undefined;
  };
  $scope.isOnline = function(user){
    var isOnline = ($filter('filter')($scope.chatters, {userId: user._id}).length > 0);
    return isOnline;
  }


  $scope.$on('$locationChangeStart', function( event ) {
    var chatters = $filter('filter')($scope.chatters, {userId: currentUser._id})
    for(var i in chatters){
      Chatters.remove(chatters[i]._id);
      // console.log('remove : '+chatters[i].userId);
    }
  });
  $scope.getUser= function(idToFind){
    return UserService.getUser(idToFind);
  }

});
