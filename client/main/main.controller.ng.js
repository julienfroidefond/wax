'use strict'

angular.module('waxYeoAnguApp')
.controller('MainCtrl', function($scope, $meteor, UserService, ImageService) {
  $scope.pageClass= "main-page";

  $scope.team = [];

  $meteor.autorun($scope, function() {
    $scope.team = UserService.getWaxers();
  })
  $scope.testimonials = [{
    content:'Chacun est libre de proposer n\'importe quelle idée autour de la technologie.',
    name:'Règle 1',
    job: 'Liberté'
  },{
    content:'Deux projets s\'affrontent au final pour le WAX. Que le meilleur gagne',
    name:'Règle 2',
    job: 'Deux projets'
  },{
    content:'Une semaine. C\'est la durée du WAX. Vous aurez une semaine pour développer votre projet et créer le produit de demain.',
    name:'Règle 3',
    job: 'Durée du WAX'
  },{
    content:'Chaque équipe est composée : d\'un chef de projet, d\'un présentateur, de développeurs. Ils sont élus démocratiquement le lundi matin par l\'équipe.',
    name:'Règle 4',
    job: 'Equipe'
  },{
    content:'Le vendredi du WAX, à 14h, on arrète tout pour présentation au jury',
    name:'Règle 5',
    job: 'Presentation'
  },{
    content:'Have FUN',
    name:'Règle 6',
    job: 'Amusez-vous'
  }];


  $scope.avatar = function(avatarId){
    return ImageService.getAvatarUrl(avatarId, {width : 112, height : 112, crop:"fill"});
  }
  $scope.showClass = "inScope";
});
