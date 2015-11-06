'use strict'

var services = angular.module('waxServices', []);

services.factory('UserService', function($filter, $meteor) {
    var userService = {};

    var users = $meteor.collection(Meteor.users, false).subscribe('users');

    userService.getUser = function(idToFind) {
        if(!idToFind) return null;
        if($filter('filter')(users, {_id: idToFind}).length>0){
            return $filter('filter')(users, {_id: idToFind});
        }
    };
    userService.getProjectParticipeTo = function(user){
        if(!user || !user.profile) return null;
        var project = $meteor.collection(function(){
            return Projects.find({_id: user.profile.participeTo});
        },false).subscribe('projects');
        return project;
    }

    userService.isAParticipantInAnotherProject= function(user, project){
        if(user.profile == null) return false;
        return (user.profile.participeTo != null && user.profile.participeTo != '' && user.profile.participeTo != project._id);
    }
    userService.isParticipant = function(user, participants){
        var isPart = false;
        angular.forEach(participants, function(participant) {
            if(participant && participant.id == user._id)
            isPart = true;
        });
        return isPart;
    }
    userService.userIsWaxer = function(user, callback){
         $meteor.call('userIsWaxer', user).then(
            function(data){
                callback(data);
            },
            function(err){
                console.log('failed', err);
            }
        );
    }

    return userService;
});

services.factory('ImageService', function($filter, $meteor) {
    var ImageService = {};

    var images = $meteor.collectionFS(Images, false, Images).subscribe('images');

    ImageService.getImageUrl = function(images, idToFind) {
        if (images && images.length) {
            var url = $filter('filter')(images, {_id: idToFind})[0].url();
            return url;
        }
    };
    ImageService.getImageById = function(idToFind) {
        if(!idToFind) return "atixnet.png";
        var url = $filter('filter')(images, {_id: idToFind})[0].url();
        return url;
    };

    return ImageService;
});

services.factory('ProjectService', function($filter, $meteor) {
    var ProjectService = {};

    ProjectService.joinProject = function(user, project, callback) {

        $meteor.call('setParticipeTo', user._id, project._id).then(
            function(data){
                callback(data);
            },
            function(err){
                console.log('failed', err);
            }
        );
    };
    ProjectService.unjoinProject = function(user, project, callback){
        $meteor.call('setParticipeTo', user._id, null).then(
            function(data){
                callback(data);
            },
            function(err){
                console.log('failed', err);
            }
        );
    }

    return ProjectService;
});
