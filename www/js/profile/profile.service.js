angular
	.module('starter.services')
	.factory('ProfileService', ProfileService);

ProfileService.$inject = ['$http', 'EnvironmentConfig'];
function ProfileService($http, EnvironmentConfig) {
	return {
		loginWithEmail: loginWithEmail,
		signupWithEmail: signupWithEmail,
		forgotPassword: forgotPassword,
		getPresignedUrl: getPresignedUrl,
		uploadProfileImg: uploadProfileImg,
		getMyInfo: getMyInfo,
		getInfoFromFB: getInfoFromFB
	}

	function loginWithEmail(params) {
		return $http({
			url: EnvironmentConfig.dev_api + '/user/login',
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

	function getPresignedUrl(file) {
		return $http({
			url: EnvironmentConfig.prod_api + '/user/getPresignedUrl',
			method: 'POST',
			data: {
				contentType: file
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

	function uploadProfileImg(img) {
		return $http({
			url: EnvironmentConfig.prod_api + '/user/uploadProfileImg',
			method: 'POST',
			data: {
				profile_img: img
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

	function getMyInfo(img) {
		return $http({
			url: EnvironmentConfig.dev_api + '/user/show',
			method: 'GET'
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

	function getInfoFromFB(token) {
		return $http({
			url: "https://graph.facebook.com/v2.2/me",
			method: 'GET',
			params: {
				access_token: token,
				fields: "id,name,gender,location,website,picture,relationship_status", 
				format: "json"
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