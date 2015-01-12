var app = angular.module('beaconApp', [
  'ngRoute',
  'ngTouch',
  'mobile-angular-ui',
  'mobile-angular-ui.drag',
  'ngAnimate',
  'LocalStorageModule',
]);

app.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('beacon');
  // localStorageServiceProvider.setStorageCookieDomain('example.com');
  // localStorageServiceProvider.setStorageType('sessionStorage');
  
}]);

app.config(function($routeProvider) {
  $routeProvider.when('/',          {templateUrl: 'radar.html', reloadOnSearch: false});
  $routeProvider.when('/single/:param1/',    {templateUrl: 'single.html', reloadOnSearch: false, checked:true,  controller: 'SingleCtrl'});
  $routeProvider.when('/radar',    {templateUrl: 'radar.html', reloadOnSearch: false, checked:true}); 
  $routeProvider.when('/favoriten',    {templateUrl: 'favoriten.html', reloadOnSearch: false}); 
  $routeProvider.when('/ausstellerliste',    {templateUrl: 'austellerliste.html', reloadOnSearch: false}); 
  $routeProvider.when('/messegelaende',    {templateUrl: 'messegelaende.html', reloadOnSearch: false}); 
  $routeProvider.when('/anreise',    {templateUrl: 'anreise.html', reloadOnSearch: false}); 
  $routeProvider.when('/parkplaetze',    {templateUrl: 'parkplaetze.html', reloadOnSearch: false}); 
  $routeProvider.when('/ueberBeacon',    {templateUrl: 'ueberBeacon.html', reloadOnSearch: false}); 
  $routeProvider.when('/impressum',    {templateUrl: 'impressum.html', reloadOnSearch: false});
  $routeProvider.when('/datenschutz',    {templateUrl: 'datenschutz.html', reloadOnSearch: false});
  $routeProvider.when('/over',    {templateUrl: 'overlaytest.html', reloadOnSearch: false});

});


app.controller("radarCtrl", function($scope,$location){
/* backup
funktioniert mit
 angular.element(document.getElementById('radarCtrl')).scope().foundBeacon(3);
 angular.element(document.getElementById('radarCtrl')).scope().$apply();

  // beacon simulieren auf klick
  $scope.foundBeacon = function(id){
    console.log("ausgeführt");
    console.log(id);

    $location.path('/single/'+id);

  };
 */







  $scope.foundBeacon = function(id){
    console.log("ausgeführt");
    console.log(id);

    $location.path('/single/'+id);
    $scope.$apply();
  };










  // legacy:
  /*
  // sobald eine Änderung festgestellt wird, weiterleitung auf die jeweilige Single Seite und ID anhängen
  $scope.$watch('id' , function(newVal,oldVal,scope){
    if (typeof $scope.id != 'undefined')
    $location.path('/single/'+$scope.id);
  });

  */
});












app.controller('favListeCtrl', [
  '$scope',
  'localStorageService',
  function($scope, localStorageService) {
    // Array in Scope Variable einladen um auf der Single Seite bei aktiven Fav das Symbol zu färben und eine lösch funktion einzubauen
    $scope.favArray =  localStorageService.get('favList');


    $scope.init = function(id)
    {
      //This function is sort of private constructor for controller
      $scope.id = id;

    };



    $scope.click = function(val){
		
		var workVar = localStorageService.get('favList');
	
		if ( workVar) {
		// favList hat Inhalt.
		// prüfen ob es bereits ein Array ist
		// wenn ja Push
		// wenn nein, mach einen draus
		
			if( typeof workVar === 'string'|| typeof workVar ==='number' ) {
				workVar = [ workVar ];
				workVar.push(val)
				localStorageService.set('favList', workVar);
			} else {
			  // WorkVar ist bereits ein Array also wird nur das Value hinzugefügt.


              // prüfen ob bereits in array
              if(workVar.indexOf(val) == -1){
                workVar.push(val)
                localStorageService.set('favList', workVar);
              } else {
                // bereits drinnen:
                console.log("halt stop")
              }





			}
		
		
		
		} else {

         val = [val];
		localStorageService.set('favList', val);
		// einfach nur val speichern
		}



	};
  
  /*
    $scope.$watch('localStorageDemo', function(value){
      localStorageService.set('localStorageDemo',value);
      $scope.localStorageDemoValue = localStorageService.get('localStorageDemo');
    });
	
	*/

    $scope.storageType = 'Local storage';

    if (localStorageService.getStorageType().indexOf('session') >= 0) {
      $scope.storageType = 'Session storage';
    }

    if (!localStorageService.isSupported) {
      $scope.storageType = 'Cookie';
    }
  }
]);


// Ausgabe für favoritenliste, wird gematched mit der FAV Liste aus dem localstorage

app.controller('favListCtrl', function($scope, $http, localStorageService){
    $http.get('data/data.json').then(function(articlesResponse) {
      $scope.groups = articlesResponse.data;

      //  $scope.assignedGroups = [0,1,2];
        $scope.assignedGroups = localStorageService.get('favList');



      if ( $scope.assignedGroups!==null) {



      $scope.availableGroups = (function () {
        var assignedGroupsIds = {};
        var groupsIds = {};
        var result = [];

        $scope.assignedGroups.forEach(function (el, i) {
          assignedGroupsIds[el] = $scope.assignedGroups[i];
        });

        $scope.groups.forEach(function (el, i) {
          groupsIds[el.id] = $scope.groups[i];
        });

        for (var i in groupsIds) {
          if (assignedGroupsIds.hasOwnProperty(i)) {
            result.push(groupsIds[i]);
          }
        }

        return result;
      }());

      } // If !Null zu
    });





  // Remove Funktion:

  $scope.remove = function(val) {


    // 1 Localstorage einladen
    var workVar =  localStorageService.get('favList');


    // 2 ermittel den Index der zum value gehört

    var index = workVar.indexOf(val);
    // 3 entferne Datensatz mit dem Value

    if (index > -1) {
      workVar.splice(index, 1);
    }

    // 4 Localstorage wieder speichern

    localStorageService.set('favList', workVar);

// Nochmal neu aufbauen, faulerweise code kopiert statt sauber aufzurufen:


    //  $scope.assignedGroups = [0,1,2];
    $scope.assignedGroups = localStorageService.get('favList');



    if ( $scope.assignedGroups!==null) {



      $scope.availableGroups = (function () {
        var assignedGroupsIds = {};
        var groupsIds = {};
        var result = [];

        $scope.assignedGroups.forEach(function (el, i) {
          assignedGroupsIds[el] = $scope.assignedGroups[i];
        });

        $scope.groups.forEach(function (el, i) {
          groupsIds[el.id] = $scope.groups[i];
        });

        for (var i in groupsIds) {
          if (assignedGroupsIds.hasOwnProperty(i)) {
            result.push(groupsIds[i]);
          }
        }

        return result;
      }());

    } // If !Null zu


    /// fauler aufruf zuende
  }

  });







// remove test
app.controller('RemoveTest', function($scope, $http){
  $http.get('data/data.json').then(function(articlesResponse) {
    $scope.persons = articlesResponse.data;
  });


  $scope.delete = function (idx) {

    var delPerson = $scope.persons[idx];

    DeletePerson({ id: delPerson.id }, function (success) {

      $scope.persons.splice(idx, 1);
    });
  };
});






app.controller('ArticlesCtrl', function($scope, $http){
  $http.get('data/data.json').then(function(articlesResponse) {
    $scope.articles = articlesResponse.data;
  });
});


app.controller('SingleCtrl', function ($scope, $routeParams,$http){

  // Anhand der routeParam soll die jeweilige Zeile im JSON ausgewählt und anschließend auf der single dargestellt werden.



  var param1 = $routeParams.param1;
  console.log(param1);
// Überträgt den paramter, noch mit einer JSON ausgabe zu koppeln



  $http.get('data/data.json').then(function(articlesResponse) {
    $scope.articles = articlesResponse.data[param1];
  });









  // Galerie Test 000XXXX

  $scope.items = new Array();
  $scope.items.push({ src: "http://fakeimg.pl/940x336/282828/eae0d0/"});
  $scope.items.push({ src: "http://fakeimg.pl/940x336/ff0000/eae0d0/"});
  $scope.items.push({ src: "http://fakeimg.pl/940x336/ffffff/eae0d0/"});

});


app.directive('cycle', function() {
  return {
    restrict: 'A',
    priority: 1001,
    link: function(scope, element, attrs) {
      setTimeout(function(){
        $(element).cycle({
          fx: 'fade',
          timeout: 10,
          swipe: true,
          swipeFx: 'scrollHorz'
        });



      }, 0);
    }
  };
});

app.controller('MainController', function($rootScope, $scope , localStorageService, $routeParams){







/* localstorage part start

function submit(key, val) {
   return localStorageService.set(key, value);
  }
  function getItem(key) {
   return localStorageService.get(key);
  }
  
  * /
  
  
  $scope.$watch('localStorageDemo', function(value){
      localStorageService.set('localStorageDemo',value);
      $scope.localStorageDemoValue = localStorageService.get('localStorageDemo');
    });

    $scope.storageType = 'Local storage';

    if (localStorageService.getStorageType().indexOf('session') >= 0) {
      $scope.storageType = 'Session storage';
    }

    if (!localStorageService.isSupported) {
      $scope.storageType = 'Cookie';
    }

/*localstorage part ende*/

    


  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });

	// Platzhaltertext
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

   $scope.$back = function() { 
    window.history.back();
  };
  
  
  

  
  
  
});



