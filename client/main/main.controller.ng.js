'use strict'

angular.module('waxYeoAnguApp')
.controller('MainCtrl', function($scope, $meteor) {
    $scope.pageClass= "main-page";
    $scope.team = [
        {
            name: 'Damien',
            image: 'users/mini/damien.jpg',
            intro: 'Dev front-end',
            description: 'Blah blah'
        },
        {
            name: 'Thomas',
            image: 'users/mini/thomas.png',
            intro: 'Dev back-end',
            description: 'Blah blah'
        },
        {
            name: 'Jérémy',
            image: 'users/mini/jeremy.jpg',
            intro: 'Dev back-end',
            description: 'Blah blah'
        },
        {
            name: 'Julien',
            image: 'users/mini/julienfr.jpg',
            intro: 'Dev front-end',
            description: 'Blah blah'
        },
        {
            name: 'Julien',
            image: 'users/mini/julienlejeune.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Ludovic',
            image: 'users/mini/ludo.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Tristan',
            image: 'users/mini/Tristan.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Christophe',
            image: 'users/mini/christophecr.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Issa',
            image: 'users/mini/Issa.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Damien',
            image: 'users/mini/damiendesvignes.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        },
        {
            name: 'Guillaume',
            image: 'users/mini/guillaume.jpg',
            intro: 'xxx',
            description: 'Blah blah'
        }
    ]

    $scope.showClass = "inScope";
});
