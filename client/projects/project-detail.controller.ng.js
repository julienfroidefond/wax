'use strict'

angular.module('waxYeoAnguApp')
.controller('ProjectDetailCtrl', function($scope, $stateParams, $filter, $rootScope, $location, $sce, UserService, ProjectService) {

  $scope.pageClass= "project-detail-page";

  var currentUser = Meteor.user();

  $scope.helpers({
    project() {
      return Projects.findOne($stateParams.projectId, {
        transform : function(item){
          var mainImage = Images.findOne(item.image);
          if(mainImage && mainImage.url()){
            item.mainImageUrl =  Images.findOne(item.image).url();
          }else{
            item.mainImageUrl =  "atixnet-large.png";
          }
          item.hasRights = currentUser && item.owner==currentUser._id;
          item.ownerObject =  Meteor.users.findOne(item.owner);
          item.participantsObject = [];
          for(var i in item.participants){
            var participant = item.participants[i];
            item.participantsObject.push(Meteor.users.findOne(participant))
          }
          item.likersObject = [];
          for(var i in item.likers){
            var liker = item.likers[i];
            item.likersObject.push(Meteor.users.findOne(liker))
          }
          item.projectCreatedDate = moment(item.createdAt).fromNow();
          item.isAParticipant = UserService.isParticipant(currentUser, item.participants);
          item.isAParticipantInAnotherProject = UserService.isAParticipantInAnotherProject(currentUser, item);
          return item;
        }
      });
    },
    images() {
      return Images.find({});
    }
  });
  $scope.subscribe('projects');
  $scope.subscribe('images');

  $scope.save = function() {
    Projects.update($scope.project._id, {
      $set: {
        name: $scope.project.name,
        description: $scope.project.description
      }
    });

  };


  $scope.addImages = function (files) {
    if (files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function() {
          $scope.imgSrc = e.target.result;
          $scope.myCroppedImage = '';
        });
      };
      reader.readAsDataURL(files[0]);
    }
    else {
      $scope.imgSrc = undefined;
    }
  };

  $scope.saveCroppedImage = function() {
    if ($scope.myCroppedImage !== '') {
      Images.insert($scope.myCroppedImage, function(err, fileObj) {
        Projects.update($scope.project._id, {
          $set: {image: fileObj._id}
        });
        $scope.imgSrc = undefined;
        $scope.myCroppedImage = '';
        $('#popup').modal('hide');
      });
    }

  };
  $scope.showPopup = function() {
    $('#popup').modal('show');
  };

  $scope.hasParticipeRights = function(){
    return currentUser && $rootScope.isInRole('coder', 'waxer');
  }
  $scope.join = function(){
    ProjectService.joinProject(currentUser, $scope.project, function(){
      var participants = [];
      participants = $scope.project.participants;
      if(!participants ) participants=[];

      participants.push({id: currentUser._id, avatar: currentUser.profile.avatar});

      Projects.update($scope.project._id, {
        $set: {participants: participants}
      });

    });

  }

  $scope.unjoin = function(){
    ProjectService.unjoinProject(currentUser, $scope.project, function(){
      var participants = [];
      participants = $scope.project.participants;
      if(!participants ) participants=[];

      angular.forEach($scope.project.participants, function(participant, i) {
        if(participant && participant.id == currentUser._id)
        participants = participants.splice(participants, i);
      });

      Projects.update($scope.project._id, {
        $set: {participants: participants}
      });
    });

  }


  $scope.getHtml = function(html) {
    return $sce.trustAsHtml(html);
  };



  ///Comments and chat
  var cProjectId = $stateParams.projectId;

  $scope.helpers({
    comments() {
      return Comments.find({project: cProjectId }, {
        sort : {createdAt: -1}
      });
    },
    chatters() {
      return Chatters.find({});
    }
  });
  $scope.subscribe('comments');
  $scope.subscribe('chatters',function(){},function(){
    var chatters = $filter('filter')($scope.chatters, {userId: currentUser._id})
    for(var i in chatters){
      Chatters.remove(chatters[i]._id);
      // console.log('remove : '+chatters[i].userId);
    }

    var chatter = {};
    chatter.userId=currentUser._id;
    if($filter('filter')($scope.chatters, {userId: currentUser._id}).length == 0)
    Chatters.insert(chatter);
  });

  $scope.chatTime = function(time){
    return moment(time).fromNow();
  }
  $scope.sendComment = function() {
    $scope.newChat.userId=currentUser._id;
    $scope.newChat.user=currentUser;
    $scope.newChat.project = $scope.project._id;
    Comments.insert($scope.newChat);
    ProjectService.sendNewCommentEmail($scope.project._id, $scope.newChat.userId, function(){});
    $scope.newChat = undefined;
  };
  $scope.isOnline = function(user){
    var isOnline = ($filter('filter')($scope.chatters, {userId: user._id}).length > 0);
    return isOnline;
  }

  $scope.confirmDeleteComment = function(chatId){
    $("#confirm-delete-comment").modal('show');
    $("#confirm-delete-comment").attr('data-chatId', chatId);

  }
  $scope.removeComment = function() {
    var chatId = $("#confirm-delete-comment").attr('data-chatId');
    Comments.remove(chatId);
    $("#confirm-delete-comment").modal('hide');
  }
  $scope.hasCommentsRights = function(chat){
    return currentUser && chat.userId==currentUser._id;
  }




  $scope.$on('$locationChangeStart', function( event ) {
    var chatters = $filter('filter')($scope.chatters, {userId: currentUser._id})
    for(var i in chatters){
      Chatters.remove(chatters[i]._id);
      // console.log('remove : '+chatters[i].userId);
    }
  });
});
