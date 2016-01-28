'use strict'

angular.module('waxYeoAnguApp')
.controller('ProjectsListCtrl', function($scope, $filter, $sce, $location, ProjectService) {
  // console.log('init');
  var currentUser = Meteor.user();

  $scope.page = 1
  $scope.perPage = 9
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'

  $scope.pageClass= "project-list-page";

  $scope.helpers({
    projects: () => {
      return Projects.find({}, {
        sort : $scope.getReactively('sort'),
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
          return item;
        }
     });
    },
    projectsCount: () => {
      return Counts.get('numberOfProjects');
    },
    projectParticipeTo: () => {
      return Projects.findOne(currentUser.profile.participeTo);
    }
  });
  $scope.subscribe('projects', () => {
    return [
      {
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      },
      $scope.getReactively('searchText')
    ]
  }, function(e){
    // console.log($scope.getReactively('perPage'))
    // console.log($scope.getReactively('page'))
  });

  $scope.newProject={};
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.newProject.ownerAvatar=currentUser.profile.avatar;
      $scope.newProject.owner=currentUser._id;
      Projects.insert($scope.newProject, function(err, id) {
        // console.log(err);
        ProjectService.sendNewProjectMail(id, function(){});
        $location.path('/projects/'+id);
      });
      $scope.newProject = {};
    }
  };
  $scope.nbLikes = function(project){
    if(!project.likers) return 0;
    return project.likers.length;
  }

  $scope.remove = function(project) {
    Projects.remove(project._id);
  };

  $scope.pageChanged = function(newPage) {
    // console.log(newPage);
    $scope.page = newPage;
  };

  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
    }
  });

  $scope.getHtml = function(html) {
    return $sce.trustAsHtml(html);
  };

  $scope.projectCreatedDate = function(time){
    return moment(time).fromNow();
  }

});
