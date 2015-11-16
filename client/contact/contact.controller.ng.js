'use strict';

angular.module('waxYeoAnguApp')
.controller('ContactCtrl', function($scope, $meteor, $filter, $rootScope) {
    $scope.viewName = 'Contact';
    $scope.pageClass= "contact-page";

    $scope.meteorContactMessages = $scope.$meteorCollection(function(){
        return ContactMessages.find({}, {sort:{createdAt : -1}});
    }, false).subscribe('contactMessages');

    $scope.newMessage = {};
    
    $scope.hasSentMessage = false;

    $scope.save = function(){
        $scope.meteorContactMessages.save($scope.newMessage).then( function() {
            console.log('The message was saved');
            $scope.hasSentMessage = true;
        }, function(err) {
            console.error( 'An error occurred. The error message is: ' + err.message);
        });

    }

    $scope.getContactMessage = function(){
        var contactMessages=[];
        angular.forEach($scope.meteorContactMessages, function(contactMessage) {
            contactMessages.push(contactMessage);
        });
        return contactMessages;
    }

});
