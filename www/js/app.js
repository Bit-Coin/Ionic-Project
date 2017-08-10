angular.module('starter', [
    'ionic',
    'ngStorage',
    'ngCordovaOauth',
    'starter.controllers',
    'starter.services',
    'app.envconfig'
  ])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.hide();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push(['$injector', '$q','$rootScope', function ($injector, $q, $rootScope) {
      return {
          'request': function (config) {
              config.headers = config.headers || {};
              var token = window.localStorage.getItem('auth_token');
                  config.headers['X-Auth-Token']  = token;
              return config;
          },
          'responseError': function (res) {

              // Unauthorized error (Token expired)
              if (res.status === 401) {

                 // clear user cookies and interval requests
              }

              return $q.reject(res);
         }
      };
  }]);


  $stateProvider

  /**********************************
   * WELCOME
   *********************************/
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome/intro.html',
    controller: 'WelcomeCtrl',
    controllerAs: 'welcome'
  })

  /**********************************
   * [ABSTRACT] TAB
   *********************************/
  .state('home', {
    url: '/home',
    templateUrl: 'templates/homepage/homepage.html',
    controller: 'HomeController',
    controllerAs: 'homeCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profileCtrl'
  })

  .state('deal', {
    url: '/deal',
    templateUrl: 'templates/deals/deals.html',
    controller: 'DealsController',
    controllerAs: 'dealsCtrl'
  })


  /**********************************
   * TAB. TIMELINE
   *********************************/
  // .state('timeline', {
  //   url: '/timeline',
  //   views: {
  //     'tab-timeline': {
  //       templateUrl: 'templates/timeline/tab-timeline.html',
  //       controller: 'TimelineCtrl'
  //     }
  //   }
  // })

  // /**********************************
  //  * TAB. LOVE
  //  *********************************/
  // .state('tab.love', {
  //   url: '/love',
  //   views: {
  //     'tab-love': {
  //       templateUrl: 'templates/love/tab-love.html',
  //       controller: 'LoveCtrl'
  //     }
  //   }
  // })

  /**********************************
   * TAB. ACCOUNT [PERSO]
   *********************************/
  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/account/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // })

  // /**********************************
  //  * TAB. SEARCH
  //  *********************************/
  // .state('tab.search', {
  //   url: '/search',
  //   views: {
  //     'tab-search': {
  //       templateUrl: 'templates/search/tab-search.html',
  //       controller: 'SearchCtrl'
  //     }
  //   }
  // })

  // /**********************************
  //  * TAB. DETAIL. ID
  //  *********************************/
  // .state('tab.detail', {
  //   url: '/detail/:id',
  //   views: {
  //     'tab-search': {
  //       templateUrl: 'templates/search/detail.html',
  //       controller: 'DetailCtrl'
  //     }
  //   }
  // });

  /**********************************
   * DEFAULT ROUTE
   *********************************/
  $urlRouterProvider.otherwise('/welcome');

});
