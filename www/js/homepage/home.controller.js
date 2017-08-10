(function() {
		'use strict';
		angular
			.module('starter.controllers')
			.controller('HomeController', HomeController);

		HomeController.$inject = [
			'$state',
			'$rootScope',
			'$scope',
			'HomeService',
			'$ionicModal',
			'$ionicLoading',
			'$cordovaDialogs',
			'$cordovaCamera'
		]
		function HomeController(
			$state,
			$rootScope,
			$scope,
			HomeService,
			$ionicModal,
			$ionicLoading,
			$cordovaDialogs,
			$cordovaCamera
		)
		{
			var vm = this;
			var map;
			var service;
			var infowindow;
			var lat, lng;
	        vm.pageNo = 0;
	        vm.postPerPage = 3;
	        var pageNo = 0;

	        $scope.latLong = {};
	        $scope.restaurants = [];
	        $scope.lat, $scope.long;
	        $scope.post = {};

			activate();

			function activate() {

				var fb_token = window.localStorage.getItem('fb_token');

	            $scope.$on('$ionicView.beforeEnter', function() {
	                console.log("--->Before enter is calling...");

	                $scope.posts = [];

	                vm.pageNo = 0;
	                pageNo = 0;

	                vm.getPosts();

	                $scope.searchKey = "";
	                $scope.post.location = "";
	                $scope.moreDataCanBeLoaded = false;
	            });

				$scope.setLocation = function (place) {
						console.log("--->selected place is..", place);

						// var selected_place = $scope.restaurants[$index];
						$scope.post.location = place.name;
						$scope.closeList();

				}
				if (navigator.geolocation) {
					console.log("navigator",navigator);
					console.log("navigator",navigator.getlocation);
					navigator.geolocation.getCurrentPosition(function(position) {
						console.log("position", position);
						lat = position.coords.latitude;
						lng = position.coords.longitude;
						console.log("---->lat, lng", lat, lng);
						var pyrmont = new google.maps.LatLng(lat, lng);

						map = new google.maps.Map(document.createElement('map'), {
							center: pyrmont,
							zoom: 15
						});

						var request = {
							location: pyrmont,
							radius: '500',
							query: ['restaurant', 'cafe'],
							rankby: google.maps.places.RankBy.DISTANCE
						};

						service = new google.maps.places.PlacesService(map);
						service.textSearch(request, function (results, status) {
								if (status == google.maps.places.PlacesServiceStatus.OK) {
										console.log("----> places...", results);
										$scope.restaurants = results;
								}
						});
					}, function() {
					});
				} else {

				}

				function callback(results, status) {
						if (status == google.maps.places.PlacesServiceStatus.OK) {
								$scope.restaurants = results;
						}
				}

				vm.getPosts = function () {
					pageNo = vm.pageNo;
					var params = {
							pageNo: pageNo,
							postPerPage: vm.postPerPage
					};
					console.log("---->Posted params...", params);

					HomeService.getPosts(params).then(function (response) {
						console.log("---->response for getting posts...", response);
						if (response.type == "success") {
			                if (!response.posts.length == 0) {
			                    $scope.posts = $scope.posts.concat(response.posts);
			                } else {
			                    $scope.moreDataCanBeLoaded = true;
			                }
						} else {
								$scope.moreDataCanBeLoaded = true;
						}
					})
				}

				$scope.loadMoreData = function () {
					vm.pageNo++;
					console.log("--->load more function is calling..", vm.pageNo);
					vm.getPosts();
            		$scope.$broadcast('scroll.infiniteScrollComplete');
				}

				vm.gotoProfile = function() {
					$state.go('profile');
				}

				vm.gotoDeal = function() {
					$state.go('deal');
				}

				vm.takePhoto = function() {
					var options = {
						quality: 75,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: Camera.PictureSourceType.CAMERA,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 300,
						targetHeight: 300,
						popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: false
					};

					$cordovaCamera.getPicture(options).then(function (imageData) {
							$scope.post.image = "data:image/jpeg;base64," + imageData;
							$scope.openPost();
					}, function (err) {
							// An error occured. Show a message to the user
							console.log("---->error", err);
							$cordovaDialogs.alert('Error', 'Alert', 'OK');
					});
				}

				vm.choosePhoto = function () {
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
						$scope.imgURI = "data:image/jpeg;base64," + imageData;
						$scope.openPost();
					}, function (err) {
							// An error occured. Show a message to the user
					});
				}

				/**********************************
				* [MODAL] REGISTER
				*********************************/

				// Configuration (File, animation, function)

				$ionicModal.fromTemplateUrl('templates/homepage/post.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modalPost = modal;
				});

				// Open the modal
				$scope.openPost = function() {
					$scope.modalPost.show();
				};

				// Close the modal
				$scope.closePost = function() {
					$scope.modalPost.hide();
				};

				$scope.shareImg = function() {
					// var message = $scope.desc;
					// var image = $scope.imgURI;
					// var place = $scope.location;
					//
					// $cordovaSocialSharing
					//     .shareViaFacebook(message, image, "")
					//     .then(function(result) {
					//       // Success!
					//       console.log("---->Social sharing result....", result);
					//     }, function(err) {
					//     // An error occurred. Show a message to the user
					//     console.log("---->Error for sharing via social", err);
					//     });
					console.log("Posting image....", $scope.post);
					$ionicLoading.show({
							template: '<ion-spinner icon="ios"></ion-spinner><br/>Image uploading...'
					});

					if(fb_token) {
						ProfileService.getInfoFromFB(fb_token).then(function(response) {
	                        console.log("---->Facebook account is....",JSON.stringify(response));
	                        var username = response.name;
	                        var imageURI = response.picture.data.url;
	                        $scope.post.ownername = username;
	                        $scope.post.ownerimage = imageURI;
	                        $scope.post.is_fb = true;

	                        HomeService.postImg($scope.post).then(function (response) {

								if (response.type == "success") {
									
									$ionicLoading.hide();

					                var post = {};
					                post.image = response.post.image;
					                post.owner_info = response.owner_info;
					                post._id = response.post._id;
					                post.description = response.post.description;
					                post.place = response.post.place;
					                $scope.posts.unshift(post);
					                $scope.modalPost.hide();
								} else {
									$cordovaDialogs.alert(response.message, 'Error', 'OK');
								}
							})
	                    })
					} else {
						HomeService.postImg($scope.post).then(function (response) {

							if (response.type == "success") {
								$ionicLoading.hide();
								
				                var post = {};
				                post.image = response.post.image;
				                post._id = response.post._id;
				                post.owner_info = response.owner_info;
				                post.description = response.post.description;
				                post.place = response.post.place;
				                $scope.posts.unshift(post);
				                $scope.modalPost.hide();
							} else {
								$cordovaDialogs.alert(response.message, 'Error', 'OK');
								$ionicLoading.hide();
							}
						})
					}
				}

				$ionicModal.fromTemplateUrl('templates/homepage/search-list.html', function(modal) {
					$scope.locationModal = modal;
				}, {
					scope: $scope,
					animation: 'slide-in-up'
				});

				$scope.searchPopup = function() {
					console.log("---->search popup is calling..");
					$scope.locationModal.show();
				};

				$scope.closeList = function () {
					$scope.locationModal.hide();
				}
			}
		}
})();
