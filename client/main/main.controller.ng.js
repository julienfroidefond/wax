'use strict'

angular.module('waxYeoAnguApp')
.controller('MainCtrl', function($scope, $meteor) {
    $scope.pageClass= "main-page";
    $scope.team = [
        {
            name: 'Damien',
            image: 'users/damien.gif',
            intro: 'Dev front-end',
            description: 'Blah blah'
        },
        {
            name: 'Thomas',
            image: 'users/thomas.png',
            intro: 'Dev back-end',
            description: 'Blah blah'
        },
        {
            name: 'Jérémy',
            image: 'users/jeremy.jpg',
            intro: 'Dev back-end',
            description: 'Blah blah'
        },
        {
            name: 'Julien',
            image: 'users/julienfr.jpeg',
            intro: 'Dev front-end',
            description: 'Blah blah'
        },
        {
            name: 'Julien',
            image: 'users/julienlejeune.jpeg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Ludovic',
            image: 'users/ludo.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Tristan',
            image: 'users/Tristan.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Christophe',
            image: 'users/christophecr.jpeg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Issa',
            image: 'users/Issa.jpeg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Damien',
            image: 'users/damiendesvignes.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Guillaume',
            image: 'users/guillaume.png',
            intro: 'xxx',
            description: 'Blah blah'
        }
    ]

    $scope.showClass = "inScope";
});
