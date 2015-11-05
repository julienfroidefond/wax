'use strict'

angular.module('waxYeoAnguApp')
.controller('ProjectDetailCtrl', function($scope, $stateParams, $meteor, $filter, $rootScope, $location, $sce, UserService) {

    $scope.pageClass= "project-detail-page";
    $scope.project = $scope.$meteorObject(Projects, $stateParams.projectId);
    $scope.$meteorSubscribe('projects');

    $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

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
        // }
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
        if($filter('filter')($scope.images, {_id: $scope.project.image}).length>0){
            var url = $filter('filter')($scope.images, {_id: $scope.project.image})[0].url();
            return url;
        }
    };

    $scope.hasRights = function(){
        return $rootScope.currentUser && $scope.project.owner==$rootScope.currentUser._id
    }
    $scope.join = function(){

        $meteor.call('setParticipeTo', $rootScope.currentUser._id, $scope.project._id).then(
            function(data){

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
            },
            function(err){
                console.log('failed', err);
            }
        );


    }

    $scope.isAParticipant = function(){
        var isPart = false;
        angular.forEach($scope.project.participants, function(participant) {
            if(participant && participant.id == $rootScope.currentUser._id)
            isPart = true;
        });
        return isPart;

    }
    $scope.isAParticipantInAnotherProject = function(){
        if($rootScope.currentUser.profile == null) return false;
        return ($rootScope.currentUser.profile.participeTo != null && $rootScope.currentUser.profile.participeTo != '' && $rootScope.currentUser.profile.participeTo != $scope.project._id);
    }
    $scope.unjoin = function(){

        $meteor.call('setParticipeTo', $rootScope.currentUser._id, null).then(
            function(data){

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
            },
            function(err){
                console.log('failed', err);
            }
        );
    }
    $scope.getUser= function(idToFind){
        return UserService.getUser(idToFind);
    }
    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
});
