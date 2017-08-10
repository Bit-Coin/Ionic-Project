angular.module('starter.services', [])

/*********************************
* [FACTORY] SEARCH RESULT
*********************************/

.factory('Results', function() {

  /*********************************
  * DATA FOR TESTING
  *********************************/

  var results = [{
    id: 0,
    title: 'Chocolate cupcake',
    description: 'New recipe for<br/> chocolate lovers!',
    account: 'Sweet Cupcake',
    image: 'img/example2.jpeg'
  }, {
    id: 1,
    title: 'Maccron',
    description: 'Simple, pretty and<br/> delicious, we love them!',
    account: 'Sweet Cupcake',
    image: 'img/example3.jpg'
  }, {
    id: 3,
    title: 'Lemon Pie',
    description: 'A classic delicious<br/> dessert!',
    account: 'Sweet Cupcake',
    image: 'img/example4.png'
  }];

  return {
    all: function() {
      return results;
    },
    remove: function(res) {
      results.splice(results.indexOf(res), 1);
    },
    get: function(resultId) {
      for (var i = 0; i < results.length; i++) {
        if (results[i].id === parseInt(resultId)) {
          return results[i];
        }
      }
      return null;
    }
  };
})

/*********************************
* [FACTORY] FAVORITE RECIPES
*********************************/

.factory('Favorite', function() {

  /*********************************
  * DATA FOR TESTING
  *********************************/

  var favorite = [{
    id: 0,
    title: 'Chocolate cupcake',
    description: 'New recipe for<br/>chocolate lovers!',
    account: 'Sweet Cupcake',
    image: 'img/example2.jpeg'
  }];

  return {
    all: function() {
      return favorite;
    },
    remove: function(fav) {
      favorite.splice(favorite.indexOf(fav), 1);
    },
    get: function(favoriteId) {
      for (var i = 0; i < favorite.length; i++) {
        if (favorite[i].id === parseInt(favoriteId)) {
          return favorite[i];
        }
      }
      return null;
    },
    add: function(fav) {
      favorite.push(fav);
    }
  };
});