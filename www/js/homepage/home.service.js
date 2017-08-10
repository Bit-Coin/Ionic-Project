angular
	.module('starter.services')
	.factory('HomeService', HomeService);

HomeService.$inject = ['$http', 'EnvironmentConfig'];
function HomeService($http, EnvironmentConfig) {
	return {
		getPosts: getPosts,
		postImg: postImg,
		getDetail: getDetail
	}

	function getPosts(params) {
		return $http({
			url: EnvironmentConfig.prod_api + '/post/getAll',
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

	function postImg(params) {
		return $http({
			url: EnvironmentConfig.prod_api + '/post/postImg',
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

	function getDetail(params) {
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
