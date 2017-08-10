(function() {
	'use strict';
	angular
		.module('starter.controllers')
		.controller('DealsController', DealsController);

	DealsController.$inject = [
		'$state',
		'$rootScope',
		'$stateParams',
		'$scope',
    	'$timeout',
		'$ionicModal',
		'$cordovaCamera',
		'$cordovaDialogs',
		'$cordovaOauth',
		'$localStorage',
		'$compile',
		'EnvironmentConfig'
	]
	function DealsController(
		$state,
		$rootScope,
		$stateParams,
		$scope,
    	$timeout,
		$ionicModal,
		$cordovaCamera,
		$cordovaDialogs,
		$cordovaOauth,
		$localStorage,
		EnvironmentConfig,
		$compile
	) {
		var vm = this;
		vm.imgURI = '';
		vm.nearby = "cliked";
		vm.claimed = "";

		activate();

		function activate() {
			vm.gotoHome = function() {
				$state.go('home');
			}

			vm.logout = function() {
				$state.go('welcome');
			}

			vm.resetPass = function() {

			}

			vm.linkedAcc = function() {

			}

			vm.nearbySearch = function() {
				vm.nearby = "cliked";
				vm.claimed = "";
			}

			vm.claimedSearch = function() {
				vm.nearby = "";
				vm.claimed = "cliked";
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
                    vm.imgURI = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    // An error occured. Show a message to the user
                });
			}

      		vm.initMap = function() {
		        var map = new google.maps.Map(document.getElementById('map'), {
		          	center: {lat: -34.397, lng: 150.644},
		          	zoom: 6
		        });
		        var infoWindow = new google.maps.InfoWindow({map: map});

		        // Try HTML5 geolocation.
		        if (navigator.geolocation) {
		          	navigator.geolocation.getCurrentPosition(function(position) {
			            var pos = {
			              	lat: position.coords.latitude,
			              	lng: position.coords.longitude
			            };

		            	infoWindow.setPosition(pos);
		            	infoWindow.setContent('Location found.');
	            		map.setCenter(pos);
		          	}, function() {
		            	handleLocationError(true, infoWindow, map.getCenter());
		          	});
		        } else {
		          	// Browser doesn't support Geolocation
		          	handleLocationError(false, infoWindow, map.getCenter());
		        }
	      	}

	      	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		        infoWindow.setPosition(pos);
		        infoWindow.setContent(browserHasGeolocation ?
	                              'Error: The Geolocation service failed.' :
	                              'Error: Your browser doesn\'t support geolocation.');
	      	}

		}
	}
})();
