'use strict';

angular.module('waxYeoAnguApp')
.controller('ContactCtrl', function($scope, $filter, $rootScope) {

  $scope.helpers({
    meteorContactMessages: () => {
      return ContactMessages.find({}, {sort: {createdAt: -1}});
    }
  });
  $scope.subscribe('contactMessages');

  $scope.viewName = 'Contact';
  $scope.pageClass= "contact-page";

  $scope.newMessage = {};

  $scope.hasSentMessage = false;

  $scope.save = function(){
    ContactMessages.insert($scope.newMessage, function(err, id) {
      if(!err){
        console.log('The message was saved');
      }else{
        console.log('There was an error');
        console.log(err);
      }
    });
    $scope.hasSentMessage = true;

  }

  $scope.getContactMessage = function(){
    var contactMessages=[];
    angular.forEach($scope.meteorContactMessages, function(contactMessage) {
      contactMessages.push(contactMessage);
    });
    return contactMessages;
  }

});
