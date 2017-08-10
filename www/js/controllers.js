/**********************************
 * [MODULE] PLAIN TEXT
 *********************************/

angular.module('starter.controllers', ['ngCordova', 'ionic']).
  filter('plainText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
)


/**********************************
 * [CONTROLLER] TIMELINE
 *********************************/
.controller('TimelineCtrl', function($scope) {})



/**********************************
 * [CONTROLLER] LOVE
 *********************************/
.controller('LoveCtrl', function($scope, Favorite) {

  /**********************************
   * DATA RECUPERATION
   *********************************/

  $scope.favorite = Favorite.all();

  /**********************************
   * REMOVE FAVORITE
   *********************************/

  $scope.removeFavorite = function(fav) {
    Favorite.remove(fav);
  }

  /**********************************
   * SHOW SEARCH INPUT
   *********************************/

  // Boolean for show input
  $scope.search = false;

  $scope.showSearch = function() {
    if($scope.search) {
      $scope.search = false;
    } else {
      $scope.search = true;
    }
  }
})



/**********************************
 * [CONTROLLER] SEARCH
 *********************************/
.controller('SearchCtrl', function($scope, $stateParams, $ionicModal, Results, Favorite) {

  /**********************************
   * DATA RECUPERATION
   *********************************/

  $scope.results = Results.all();

  /**********************************
   * ADD FAVORITE
   *********************************/

  $scope.addFavorite = function(id) {
    Favorite.add(Results.get(id)); 
  }

})



/**********************************
 * [CONTROLLER] DETAILS
 *********************************/
.controller('DetailCtrl', function($scope, $stateParams, Results) {
  var currentId = $stateParams.id;

  $scope.detail = Results.get(currentId);
})



/**********************************
 * [CONTROLLER] ACCOUNT
 *********************************/
.controller('AccountCtrl', function($scope,$ionicHistory, Results) {


});
