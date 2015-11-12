'use strict'

angular.module('waxYeoAnguApp')
.controller('MainCtrl', function($scope, $meteor, UserService, ImageService) {
    $scope.pageClass= "main-page";
    // $scope.team = [
    //     {
    //         name: 'Damien',
    //         image: 'users/mini/damien.jpg',
    //         intro: 'Dev front-end',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Thomas',
    //         image: 'users/mini/thomas.png',
    //         intro: 'Dev back-end',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Jérémy',
    //         image: 'users/mini/jeremy.jpg',
    //         intro: 'Dev back-end',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Julien',
    //         image: 'users/mini/julienfr.jpg',
    //         intro: 'Dev front-end',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Julien',
    //         image: 'users/mini/julienlejeune.jpg',
    //         intro: 'xxx',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Ludovic',
    //         image: 'users/mini/ludo.jpg',
    //         intro: 'xxx',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Tristan',
    //         image: 'users/mini/Tristan.jpg',
    //         intro: 'xxx',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Christophe',
    //         image: 'users/mini/christophecr.jpg',
    //         intro: 'xxx',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Issa',
    //         image: 'users/mini/Issa.jpg',
    //         intro: 'xxx',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Damien',
    //         image: 'users/mini/damiendesvignes.jpg',
    //         intro: 'xxx',
    //         description: 'Blah blah'
    //     },
    //     {
    //         name: 'Guillaume',
    //         image: 'users/mini/guillaume.jpg',
    //         intro: 'xxx',
    //         description: 'Blah blah'
    //     }
    // ]

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
        content:'Une semaine. C\'est la durée du WAX. Vous aurez une semaine pour développer votre projet et créer les techno de demain.',
        name:'Règle 3',
        job: 'Durée du WAX'
    },{
        content:'Le vendredi du WAX, à 14h, on arrète tout pour présentation au CEO d\'Atixnet.',
        name:'Règle 4',
        job: 'Presentation'
    },{
        content:'Have FUN',
        name:'Règle 5',
        job: 'Amusez-vous'
    },{
        content:'Chaque équipe est composée : d\'un chef de projet, d\'un présentateur, de développeurs. Ils sont élus démocratiquement le lundi matin par l\'équipe.',
        name:'Règle 6',
        job: 'Equipe'
    }];


    $scope.avatar = function(avatarId){
        return ImageService.getAvatarUrl(avatarId, {width : 112, height : 112, crop:"fill"});
    }
    $scope.showClass = "inScope";
});
