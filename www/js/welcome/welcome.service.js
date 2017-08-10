angular
	.module('starter.services')
	.factory('WelcomeService', WelcomeService);

WelcomeService.$inject = ['$http', 'EnvironmentConfig'];
function WelcomeService($http, EnvironmentConfig) {
	return {
		loginWithEmail: loginWithEmail,
		signupWithEmail: signupWithEmail,
		forgotPassword: forgotPassword,
    	saveFacebookCred: saveFacebookCred
	}

	function loginWithEmail(params) {
		return $http({
			url: EnvironmentConfig.prod_api + '/user/login',
			method: 'POST',
			data: {
				user: params
			}
		})
		.then(getDataSuccess)
		.catch(getDataFailed);

		function getDataSuccess(response) {
			return response.data;
		}

		function getDataFailed(error) {
			return error.data;
		}
	}

	function saveFacebookCred(params) {
	    return $http({
	      url: EnvironmentConfig.prod_api + '/user/saveFacebookCred',
	      method: 'POST',
	      data: {
	        user: params
	      }
	    })
      	.then(getDataSuccess)
      	.catch(getDataFailed);

	    function getDataSuccess(response) {
	      	return response.data;
	    }

	    function getDataFailed(error) {
	      	return error.data;
	    }
  	}

	function signupWithEmail(params) {
		return $http({
			url: EnvironmentConfig.prod_api + '/user/signup',
			method: 'POST',
			data: {
				user: params
			}
		})
		.then(getDataSuccess)
		.catch(getDataFailed);

		function getDataSuccess(response) {
			return response.data;
		}

		function getDataFailed(error) {
			return error.data;
		}
	}

	function forgotPassword(params) {
		return $http({
			url: EnvironmentConfig.prod_api + '/user/forgotPassword',
			method: 'POST',
			data: {
				params: params
			}
		})
		.then(getDataSuccess)
		.catch(getDataFailed);

		function getDataSuccess(response) {
			return response.data;
		}

		function getDataFailed(error) {
			return error.data;
		}
	}
}
