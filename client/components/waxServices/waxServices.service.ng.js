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
      var project = $meteor.object(Projects, {_id : user.profile.participeTo});
      return project;
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

  ProjectService.getImageUrl = function(images, idToFind) {
      if (images && images.length) {
          var url = $filter('filter')(images, {_id: idToFind})[0].url();
          return url;
      }
  };
  return ProjectService;
});
