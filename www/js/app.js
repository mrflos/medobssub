// Ionic medobssub App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'medobssub' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'medobssub.services' is found in services.js
// 'medobssub.controllers' is found in controllers.js
angular.module('medobssub', ['ionic', 'medobssub.controllers', 'medobssub.services', 'geolocation', 'leaflet-directive'])

.run(function($ionicPlatform, $ionicPopup, $log) {

  $ionicPlatform.ready(function() {
    // connection test
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: "Pas de connection à l'Internet",
          content: "La connection est nécessaire pour votre inscription, pour visualiser les cartes ou pour la synchronisation des fiches.",
          buttons: [
            { text: 'Quitter' },
            {
              text: '<b>Continuer quand même</b>',
              type: 'button-positive',
            }]
        })
        .then(function(result) {
          if(!result)
            ionic.Platform.exitApp();
        });
      }
    }

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
  //$ionicConfigProvider.views.forwardCache(true);
  $ionicConfigProvider.views.maxCache(0);


  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html'
      }
    }
  })
  .state('tab.sites', {
    cache: false,
    url: '/sites/:formId',
    views: {
      'tab-sites': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl',
      }
    }
  })
  .state('tab.sentinelleitem', {
    url: '/sentinelleitem/:itemId',
    views: {
      'tab-sites': {
        templateUrl: 'templates/item.html',
        controller: 'ItemCtrl'
      }
    }
  })
  .state('tab.clubs', {
    url: '/clubs/:formId',
    views: {
      'tab-clubs': {
        templateUrl: 'templates/avatarlist.html',
        controller: 'ListCtrl'
      }
    }
  })
  .state('tab.clubsitem', {
    url: '/clubsitem/:itemId',
    views: {
      'tab-clubs': {
        templateUrl: 'templates/item.html',
        controller: 'ItemCtrl'
      }
    }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.accountitem', {
    url: '/accountitem/:itemId',
    views: {
      'tab-account': {
        templateUrl: 'templates/item.html',
        controller: 'ItemCtrl'
      }
    }
  })
  
  .state('tab.apropos', {
    url: '/apropos',
    views: {
      'tab-apropos': {
        templateUrl: 'templates/tab-apropos.html',
      }
    }
  })

  .state('tab.item', {
    url: '/item/:itemId',
    views: {
      'tab-home': {
        templateUrl: 'templates/item.html',
        controller: 'ItemCtrl'
      }
    }
  })

  .state('tab.map', {
    url: '/map/:formId',
    views: {
      'tab-home': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  })
  .state('tab.list', {
    url: '/list/:formId',
    views: {
      'tab-home': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    }
  })
  .state('tab.avatarlist', {
    url: '/avatarlist/:formId',
    views: {
      'tab-home': {
        templateUrl: 'templates/avatarlist.html',
        controller: 'ListCtrl'
      }
    }
  })
  .state('tab.form', {
    url: '/form/:formId',
    views: {
      'tab-home': {
        templateUrl: 'templates/form.html',
        controller: 'FormCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'WikiAuth'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

  .state('autoLogin', {
    url: '/autoLogin',
    templateUrl: 'templates/autoLogin.html',
    controller: 'WikiAuth'
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/autoLogin');

})

.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});
