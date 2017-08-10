(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('WelcomeCtrl', WelcomeCtrl);

    WelcomeCtrl.$inject = [
        '$state',
        '$rootScope',
        '$stateParams',
        '$scope',
        '$timeout',
        'WelcomeService',
        '$ionicLoading',
        '$ionicModal',
        '$cordovaDialogs',
        '$cordovaOauth',
        'ProfileService',
        'EnvironmentConfig'
    ]
    function WelcomeCtrl(
        $state,
        $rootScope,
        $stateParams,
        $scope,
        $timeout,
        WelcomeService,
        $ionicLoading,
        $ionicModal,
        $cordovaDialogs,
        $cordovaOauth,
        ProfileService,
        EnvironmentConfig
    )   {
        var vm = this;

        $scope.reg = {email:"",  password: "", confirm: "", username: ""};

        $scope.forget = {email: ""};

        activate();

        function activate() {

            $scope.$on('$ionicView.beforeEnter', function() {
                vm.email = "";
                vm.password = "";
            });
 

            $ionicModal.fromTemplateUrl('templates/welcome/forget.html', {
                scope: $scope,
                animation: 'slide-in-up'
			}).then(function(modal) {
				  $scope.modalForget = modal;
			});

			// Open the modal
			$scope.openForget = function() {
				  $scope.modalForget.show();
			};

			// Close the modal
			$scope.closeForget = function() {
				  $scope.modalForget.hide();
			};

            /**********************************
            * [MODAL] REGISTER
            *********************************/

            // Configuration (File, animation, function)
            $ionicModal.fromTemplateUrl('templates/welcome/register.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalRegister = modal;
            });

            // Open the modal
            $scope.openRegister = function() {
                $scope.modalRegister.show();
            };

            // Close the modal
            $scope.closeRegister = function() {
                $scope.modalRegister.hide();
            };


            vm.loginWithEmail = function($event) {
                $event.preventDefault();
                // $rootScope.posts = [];
                var user = {};
                if (vm.email && vm.password) {
                    if (validateEmail(vm.email)) {
                        $ionicLoading.show({
                            template: '<ion-spinner icon="ios"></ion-spinner><br/>Login...'
                        });
                        user.email = vm.email;
                        user.password = vm.password;
                        $timeout(WelcomeService.loginWithEmail(user).then(function(response) {
                            console.log("--->user is...", JSON.stringify(response));
                            // $cordovaProgress.hide();
                            $ionicLoading.hide();
                            if (response.type == "success") {
                                // $localStorage.auth_token = response.auth_token;
                                window.localStorage.setItem('auth_token', response.auth_token);
                                $cordovaDialogs.alert('Login Success', 'Alert', 'OK');
                                // $state.go('home');
                                $state.go('home');
                            } else {
                                $cordovaDialogs.alert(response.message, 'Alert', 'OK');
                            }
                        }), 10000);
                    } else {
                        $cordovaDialogs.alert('Please enter valid email', 'Alert', 'OK')
                            .then(function() {
                            });
                    }
                } else {
                    $cordovaDialogs.alert('Please fill out the forms', 'Alert', 'OK')
                        .then(function() {
                        });
                }
            }

            $scope.loginWithFacebook = function() {
                $rootScope.posts = [];
                console.log("facebook client ID is...", EnvironmentConfig.FACEBOOK_CLIENT_ID);
                $cordovaOauth.facebook(EnvironmentConfig.FACEBOOK_CLIENT_ID, ["email", "user_website", "user_location", "user_relationships"]).then(function(result) {
                    console.log("Result is...", JSON.stringify(result));
                    if (result.access_token != "") {
                        window.localStorage.setItem('fb_token', result.access_token);
                        $cordovaDialogs.alert('Facebook login Success', 'Alert', 'OK');
                        $state.go('home');
                    }
                }, function(error) {
                    // error
                    $cordovaDialogs.alert('Facebook login Failed', 'Alert', 'OK');
                    console.log("ERROR", error);
                });
            }

            $scope.signupWithEmail = function(reg) {
                console.log("--->Sign up with email is calling...", reg);
                var user = {};
                if($scope.reg.email && $scope.reg.password && $scope.reg.confirm && $scope.reg.username) {
                    if ($scope.reg.password != $scope.reg.confirm) {
                        $cordovaDialogs.alert('Password does not match', 'Alert', 'OK')
                            .then(function() {
                                console.log("--->Success");
                            });
                    } else {
                        $ionicLoading.show({
                            template: '<ion-spinner icon="ios"></ion-spinner><br/>Signup...'
                        });
                        user.email = $scope.reg.email;
                        user.password = $scope.reg.password;
                        user.username = $scope.reg.username;

                        WelcomeService.signupWithEmail(user).then(function(response) {
                          // $cordovaProgress.hide();
                            $ionicLoading.hide();
                            if (response.type == "success") {
                                $cordovaDialogs.alert(response.message, 'Alert', 'OK')
                                    .then(function() {
                                        window.localStorage.setItem('auth_token', response.auth_token);
                                        $scope.closeRegister();
                                        $state.go('home');
                                    });
                            } else {
                                $cordovaDialogs.alert(response.message, 'Alert', 'OK')
                                    .then(function() {
                                        console.log("--->Success");
                                });
                            }
                        })
                    }
                } else {
                    $cordovaDialogs.alert('Please fill out the forms', 'Alert', 'OK')
                    .then(function() {
                        console.log("--->Success");
                    });
                }
            }

            $scope.forgotPassword = function(forgot) {
                if(!forgot.email) {
                    $cordovaDialogs.alert("Please enter email address", 'Alert', 'OK');
                    return;
                }
                $ionicLoading.show({
                    template: '<ion-spinner icon="ios"></ion-spinner><br/>Loading...'
                });
                WelcomeService.forgotPassword($scope.forget.email).then(function(response) {
                    console.log("---->Forgot password response", response);
                    $ionicLoading.hide();
                    if (response.type == "success") {
                        $cordovaDialogs.alert(response.message, 'Alert', 'OK')
                            .then(function() {
                                $scope.closeForget();
                            });
                    } else  {
                        $cordovaDialogs.alert(response.message, 'Alert', 'OK')
                            .then(function() {
                                console.log("--->Success");
                            });
                    }
                });
            }

            function validateEmail(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
        }
    }
})();
