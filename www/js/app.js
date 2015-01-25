// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ui.bootstrap.tpls',
'ionic', "ui.bootstrap",'starter.controllers', 'LocalStorageModule', 'ngRoute', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })



      
  .state('app.radar', {
    url: "/radar",
    views: {
      'menuContent': {
        templateUrl: "templates/radar.html",
            controller: "radarCtrl"

      }
    }
  })

  .state('app.fav', {
    url: "/fav",
    views: {
      'menuContent': {
        templateUrl: "templates/fav.html",
        controller: "favListCtrl"
      }
    }
  })
    .state('app.liste', {
      url: "/liste",
      views: {
        'menuContent': {
          templateUrl: "templates/liste.html",
          controller: "ausstellerListeCtrl"
        }
      }
    })
    .state('app.maps', {
      url: "/maps",
      views: {
        'menuContent': {
          templateUrl: "templates/maps.html"
        }
      }
    })
    .state('app.anreisen', {
      url: "/anreisen",
      views: {
        'menuContent': {
          templateUrl: "templates/anreisen.html",
          controller: "anreisenCtrl"
        }
      }
    })


    .state('app.parken', {
      url: "/parken",
      views: {
        'menuContent': {
          templateUrl: "templates/parken.html",
          controller: "parkCtrl"
        }
      }
    })

    .state('app.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "templates/about.html"
        }
      }
    })

    .state('app.impressum', {
      url: "/impressum",
      views: {
        'menuContent': {
          templateUrl: "templates/impressum.html"
        }
      }
    })
    .state('app.datenschutz', {
      url: "/datenschutz",
      views: {
        'menuContent': {
          templateUrl: "templates/datenschutz.html"
        }
      }
    })


  .state('app.single', {
    url: "/single/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/single.html",
        controller: 'singleCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/radar');
})

.directive('disableAnimation', function($animate){

  // Bugfix from:https://github.com/angular-ui/bootstrap/issues/1350#issuecomment-34595075


    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }


});

