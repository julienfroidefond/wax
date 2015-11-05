'use strict'

angular.module('waxYeoAnguApp')
.controller('LoginCtrl', function($scope, $meteor, $state, $rootScope, ImageService) {

    var vm = $scope;

    vm.pageClass= "login-page";

    vm.credentials = {
        email: '',
        password: '',
        "profile.participeTo": '',
        "profile.avatar": ''
    };

    vm.error = '';

    vm.avatar = null;
    vm.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

    vm.login = function () {
        $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
            function () {
                $state.go('projects-list');
            },
            function (err) {
                vm.error = 'Login error - ' + err;
            }
        );
    };

    vm.register = function () {
        if(!vm.avatar){
            vm.error = "L'avatar est obligatoire";
            return;
        }
        $meteor.createUser(vm.credentials).then(
            function () {

                $meteor.call('setAvatar', $rootScope.currentUser._id, vm.avatar ? vm.avatar._id : null).then(
                  function(data){
                      $state.go('projects-list');
                  },
                  function(err){
                    console.log('failed', err);
                  }
                );

            },
            function (err) {
                vm.error = 'Registration error - ' + err;
            }
        );
    };

    vm.reset = function () {
        $meteor.forgotPassword({email:vm.credentials.email}).then(
            function () {
                $state.go('projects-list');
            },
            function (err) {
                vm.error = 'Error sending forgot password email - ' + err;
            }
        );
    };

    vm.addImage = function (files) {
        if (files.length > 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                vm.$apply(function() {
                    vm.imgSrc = e.target.result;
                    vm.myCroppedImage = '';
                });
            };
            reader.readAsDataURL(files[0]);
        }
        else {
            vm.imgSrc = undefined;
        }

    };
    vm.saveCroppedImage = function() {
      if (vm.myCroppedImage !== '') {
        vm.images.save(vm.myCroppedImage).then(function(result) {
          vm.avatar = result[0]._id;
          vm.imgSrc = undefined;
          vm.myCroppedImage = '';
          $('#popup').modal('hide');
        });
      }

    };
    vm.showPopup = function() {
      $('#popup').modal('show');
    };

    $scope.getImageUrl = function(idToFind) {
        return ImageService.getImageUrl(images, idToFind);
    };
});
