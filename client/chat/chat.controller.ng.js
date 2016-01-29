'use strict'

angular.module('waxYeoAnguApp')
.controller('ChatCtrl', function($scope, $filter) {

  var currentUser = Meteor.user();
console.log(currentUser)
  $scope.viewName = 'Chat';

  $scope.pageClass= "chat-page";

  $scope.helpers({
    chatters() {
        return Chatters.find({});
    },
    chats() {
      return Chats.find({}, {
        sort : {createdAt: -1},
        transform : function(item){
            item.user = Meteor.users.findOne(item.userId);
            return item;
        }
      });
    }
  });
  $scope.subscribe('chats');
  $scope.subscribe('chatters', function(){}, function(a) {

    var chatters = $filter('filter')($scope.chatters, {userId: currentUser._id})
    for(var i in chatters){
      Chatters.remove(chatters[i]._id);
    }

    var chatter = {};
    chatter.userId=currentUser._id;
    if($filter('filter')($scope.chatters, {userId: currentUser._id}).length == 0)
    Chatters.insert(chatter);

    $scope.isOnline = function(user){
      var isOnline = ($filter('filter')($scope.chatters, {userId: currentUser._id}).length > 0);
      return isOnline;
    }
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



  $scope.$on('$locationChangeStart', function( event ) {
    var chatters = $filter('filter')($scope.chatters, {userId: currentUser._id})
    for(var i in chatters){
      Chatters.remove(chatters[i]._id);
      // console.log('remove : '+chatters[i].userId);
    }
  });

});
