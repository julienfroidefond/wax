'use strict'

var services = angular.module('waxServices', []);

services.factory('UserService', function($filter, $meteor, $rootScope) {
  var userService = {};

  // var users = $meteor.collection(Meteor.users, false).subscribe('users');

  // userService.getUser = function(idToFind) {
  //   if(!idToFind) return null;
  //   if($filter('filter')(users, {_id: idToFind}).length>0){
  //     return $filter('filter')(users, {_id: idToFind});
  //   }
  // };
  // userService.getProjectParticipeTo = function(user){
  //   if(!user || !user.profile) return null;
  //   var project = $meteor.collection(function(){
  //     return Projects.find({_id: user.profile.participeTo});
  //   },false).subscribe('projects');
  //   return project;
  // }

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

  userService.getWaxers = function() {
    var waxers = Roles.getUsersInRole('coder','waxer').fetch();
    return shuffle(waxers);
  };


  return userService;
});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


services.factory('ImageService', function($filter, $meteor, $rootScope) {
  var ImageService = {};

  // $rootScope.helpers({
  //   images() {
  //     return Images.find({});
  //   }
  // });
  // $rootScope.subscribe('images');
  //
  // var images =$rootScope.images;
  // ImageService.getImageUrl = function(images, idToFind) {
  //   if(!idToFind) return "atixnet-large.png";
  //   if($filter('filter')(images, {_id: idToFind}).length == 0) return "atixnet-large.png";
  //   if (images && images.length) {
  //     var url = $filter('filter')(images, {_id: idToFind})[0].url();
  //     return url;
  //   }
  // };
  //
  // ImageService.getImageById = function(idToFind) {
  //   if(!idToFind) return "atixnet-large.png";
  //   if($filter('filter')(images, {_id: idToFind}).length == 0) return "atixnet-large.png";
  //   var url = $filter('filter')(images, {_id: idToFind})[0].url();
  //   return url;
  // };

  ImageService.getAvatarUrl = function(idToFind, options) {
    if(!idToFind) return "atixnet.png";
    return Cloudinary._helpers.url(idToFind, {'hash': options})+'?v=2.0';
  };

  // $meteor.collectionFS(Images, false, Images).subscribe('images');



  return ImageService;
});

services.factory('ProjectService', function($filter, $meteor) {
  var ProjectService = {};

  ProjectService.joinProject = function(user, project, callback) {

    $meteor.call('setParticipeTo', user._id, project._id).then(
      function(data){
        ProjectService.sendNewParticipationMail(project._id, user._id, function(){});
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
  ProjectService.sendNewCommentEmail = function(projectId, userCommentId, callback){
    $meteor.call('sendNewCommentMail', projectId, userCommentId, null).then(
      function(data){
        callback(data);
      },
      function(err){
        console.log('failed', err);
      }
    );
  }
  ProjectService.sendNewParticipationMail = function(projectId, userParticipeId, callback){
    $meteor.call('sendNewParticipationMail', projectId, userParticipeId, null).then(
      function(data){
        callback(data);
      },
      function(err){
        console.log('failed', err);
      }
    );
  }
  ProjectService.sendNewLikeMail = function(projectId, likerId, callback){
    $meteor.call('sendNewLikeMail', projectId, likerId, null).then(
      function(data){
        callback(data);
      },
      function(err){
        console.log('failed', err);
      }
    );
  }
  ProjectService.sendNewProjectMail = function(projectId, callback){
    $meteor.call('sendNewProjectMail', projectId, null).then(
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

services.factory('ChatService', function($filter, $meteor) {
  var ChatService = {};

  ChatService.chatters = [];

  ChatService.addChatter = function(userId) {
    this.chatters.push(userId);
  };
  ChatService.deleteChatter = function(userId) {
    var index = _.indexOf(ChatService.chatters, userId);
    if(index != -1)
    ChatService.chatters.splice(index, 1);

  };

  return ChatService;
});
