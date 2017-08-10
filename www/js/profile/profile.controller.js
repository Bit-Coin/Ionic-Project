(function() {
	  'use strict';
	  angular
        .module('starter.controllers')
        .controller('ProfileController', ProfileController);

	  ProfileController.$inject = [
        '$state',
        '$rootScope',
        '$scope',
        'ProfileService',
        '$ionicModal',
        '$cordovaCamera',
        '$cordovaDialogs',
        '$cordovaOauth',
        '$ionicLoading'
	  ]
    function ProfileController(
        $state,
        $rootScope,
        $scope,
        ProfileService,
        $ionicModal,
        $cordovaCamera,
        $cordovaDialogs,
        $cordovaOauth,
        $ionicLoading
    ) {
        var vm = this;
        var bucket_url = 'https://s3.amazonaws.com/fortunate/';

        vm.imgURI = '';
        vm.description = '';
        vm.user = {};
        vm.flag = false;

        activate();

        function activate() {

            vm.getProfileInfo = function(){
                var fb_token = window.localStorage.getItem('fb_token');
                console.log("--->FAceobook token....", fb_token);
                if (fb_token) {
                    vm.flag = true;
                    ProfileService.getInfoFromFB(fb_token).then(function(response) {
                        console.log("---->Facebook account is....",JSON.stringify(response));
                        vm.imgURI = response.picture.data.url;
                        vm.username = response.name;
                    })
                } else {
                    vm.flag = false;
                    ProfileService.getMyInfo().then(function(response) {
                        if(response.type == "success") {
                          console.log("--->Response for getting user's info", response.user);
                          vm.imgURI = response.user.profile_img;
                          vm.username = response.user.username;
                          vm.user = response.user;
                        }
                    });
                }
            }

            vm.gotoHome = function() {
                // Storage.remove();
                $state.go('home');
            }

            vm.logout = function() {

                // $rootScope.posts = [];
                $rootScope.$broadcast("logout");
                window.localStorage.clear();
                console.log("---->Local Storage...", window.localStorage.getItem('auth_token'), window.localStorage.getItem('fb_token'));
                $state.go('welcome');
            }

            vm.resetPass = function() {

            }

            vm.choosePhoto = function() {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {

                    $ionicLoading.show({
                        template: '<ion-spinner icon="ios"></ion-spinner><br/>Image uploading...'
                    });
                    console.log("---->Getting image from local....", imageData);
                    vm.imgURI = "data:image/jpeg;base64," + imageData;

                    ProfileService.uploadProfileImg(vm.imgURI).then(function(response) {
                        if (response.type == "success") {
                            $ionicLoading.hide();
                            $cordovaDialogs.alert('Uploading Success', 'Success', 'OK');
                        } else {
                            $ionicLoading.hide();
                            $cordovaDialogs.alert('Uploading Failure. Try again', 'Error', 'OK');
                        }
                    });
                }, function (err) {
                    // An error occured. Show a message to the user
                    $cordovaDialogs.alert('Something is wrong', 'Error', 'OK');
                });
            }
        }
    }
})();
