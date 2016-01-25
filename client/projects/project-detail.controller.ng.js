'use strict'

angular.module('waxYeoAnguApp')
.controller('ProjectDetailCtrl', function($scope, $stateParams, $meteor, $filter, $rootScope, $location, $sce, UserService, ImageService, ProjectService) {

  $scope.pageClass= "project-detail-page";
  $scope.project = $scope.$meteorObject(Projects, $stateParams.projectId);
  $scope.$meteorSubscribe('projects');

  $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

  $scope.likers=$scope.project.likers;

  $scope.save = function() {
    $scope.project.save().then(
      function(numberOfDocs) {
        console.log('save successful, docs affected ', numberOfDocs);
        $location.path('/projects');
      },
      function(error) {
        console.log('save error ', error);
      }
    )
  };

  $scope.reset = function() {
    $scope.project.reset();
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
      $scope.images.save($scope.myCroppedImage).then(function(result) {
        $scope.project.image = result[0]._id._id;
        $scope.imgSrc = undefined;
        $scope.myCroppedImage = '';
        $('#popup').modal('hide');
      });
    }

  };
  $scope.showPopup = function() {
    $('#popup').modal('show');
  };

  $scope.getMainImage = function() {
    return ImageService.getImageById($scope.project.image);
  };

  $scope.hasRights = function(){
    return $rootScope.currentUser && $scope.project.owner==$rootScope.currentUser._id
  }
  $scope.hasParticipeRights = function(){
    return $rootScope.currentUser && $rootScope.isInRole('coder', 'waxer');
  }
  $scope.join = function(){
    ProjectService.joinProject($rootScope.currentUser, $scope.project, function(){
      if($scope.project.participants == null) $scope.project.participants = [];
      $scope.project.participants.push({id: $rootScope.currentUser._id, avatar: $rootScope.currentUser.profile.avatar});

      $scope.project.save().then(
        function(numberOfDocs) {
          console.log('save successful, docs affected ', numberOfDocs);
        },
        function(error) {
          console.log('save error ', error);
        }
      )
    });

  }

  $scope.unjoin = function(){
    ProjectService.unjoinProject($rootScope.currentUser, $scope.project, function(){
      angular.forEach($scope.project.participants, function(participant, i) {
        if(participant && participant.id == $rootScope.currentUser._id)
        $scope.project.participants = $scope.project.participants.splice($scope.project.participants, i);
      });
      if($scope.project.participants.length == 0) $scope.project.participants = null;
      $scope.project.save().then(
        function(numberOfDocs) {
          console.log('save successful, docs affected ', numberOfDocs);
        },
        function(error) {
          console.log('save error ', error);
        }
      )
    });

  }

  $scope.isAParticipant = function(){
    return UserService.isParticipant($rootScope.currentUser, $scope.project.participants);
  }
  $scope.isAParticipantInAnotherProject = function(){
    return UserService.isAParticipantInAnotherProject($rootScope.currentUser, $scope.project)
  }

  $scope.getUser= function(idToFind){
    return UserService.getUser(idToFind);
  }
  $scope.getHtml = function(html) {
    return $sce.trustAsHtml(html);
  };
  $scope.projectCreatedDate = function(){
    return moment($scope.project.createdAt).fromNow();
  }

  ///Comments and chat
  var cProjectId = $stateParams.projectId;
  $scope.comments = $meteor.collection(function() {
    return Comments.find({project: cProjectId }, {
      sort : {createdAt: -1}
    });
  }).subscribe('comments');

  $scope.chatters = $scope.$meteorCollection(function() {
    return Chatters.find({});
  });

  $scope.$meteorSubscribe('chatters', {}).then(function(a) {

    var chatters = $filter('filter')($scope.chatters, {userId: $rootScope.currentUser._id})
    for(var i in chatters){
      $scope.chatters.remove(chatters[i]._id);
      // console.log('remove : '+chatters[i].userId);
    }

    var chatter = {};
    chatter.userId=$rootScope.currentUser._id;
    if($filter('filter')($scope.chatters, {userId: $rootScope.currentUser._id}).length == 0)
    $scope.chatters.save(chatter);
  });

  $scope.chatters = $meteor.collection(function() {
    return Chatters.find({});
  }).subscribe('chatters');

  $scope.chatTime = function(time){
    return moment(time).fromNow();
  }
  $scope.sendComment = function() {
    $scope.newChat.userId=$rootScope.currentUser._id;
    $scope.newChat.user=$rootScope.currentUser;
    $scope.newChat.project = $scope.project._id;
    $scope.comments.save($scope.newChat);
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
    $scope.comments.remove(chatId);
    $("#confirm-delete-comment").modal('hide');
  }
  $scope.hasCommentsRights = function(chat){
    return $rootScope.currentUser && chat.userId==$rootScope.currentUser._id;
  }


  $scope.$on('$locationChangeStart', function( event ) {
    var chatters = $filter('filter')($scope.chatters, {userId: $rootScope.currentUser._id})
    for(var i in chatters){
      $scope.chatters.remove(chatters[i]._id);
      // console.log('remove : '+chatters[i].userId);
    }
  });
});
