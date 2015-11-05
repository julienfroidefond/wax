'use strict'

angular.module('waxYeoAnguApp')
.directive('avatar', function($meteor, $filter, $rootScope) {
    return {
        restrict: 'AE',
        templateUrl: 'client/components/avatar/avatar.view.html',
        replace: true,
        scope: {
            user: "=",
            width: "=",
            imageonly: "="
        },
        link: function($scope){
            if($scope.user){
                var avatarId = $scope.user.profile.avatar;
                $scope.avatar = $meteor.collectionFS(function(){
                    return Images.find({_id : avatarId});
                }, false).subscribe('images');
                $scope.email = $scope.user.emails[0].address;
            }
            else{
                if($rootScope.currentUser && $rootScope.currentUser.profile){
                    var avatarId = $rootScope.currentUser.profile.avatar;
                    $scope.avatar = $meteor.collectionFS(function(){
                        return Images.find({_id : avatarId});
                    }, false).subscribe('images');
                    $scope.email = $rootScope.currentUser.emails[0].address;
                }
            }
        }
    };
});
