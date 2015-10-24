'use strict'

angular.module('waxYeoAnguApp')
.controller('ChatCtrl', function($scope, $meteor, $filter, $rootScope) {
    $scope.viewName = 'Chat';


    $scope.chats = $meteor.collection(function() {
        return Chats.find({}, {
              sort : {createdAt: -1}
          });
    }).subscribe('chats');


    $scope.send = function() {
        console.log($rootScope.currentUser)
        $scope.newChat.userId=$rootScope.currentUser._id;
        $scope.newChat.user=$rootScope.currentUser;
        $scope.chats.save($scope.newChat);
        $scope.newChat = undefined;
    };

});
