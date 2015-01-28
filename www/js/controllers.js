angular.module('starter.controllers', [])

.controller('radarCtrl', function($scope, $location) {
  $scope.do = function(){
      if ($scope.interface != true) {
        app.initialize()
        $scope.interface =true;
      } else {
        $scope.interface =false
        app.stopScan()
      }
  };

  $scope.foundBeacon = function(id){
    console.log("ausgeführt");
    console.log(id);

    $location.path('/app/single/'+id);
    $scope.$apply();
  };
})



.controller('ausstellerListeCtrl', function($scope, $http) {
  $http.get('js/data.json').then(function(articlesResponse) {
    $scope.articles = articlesResponse.data;
  });
})



.controller('anreisenCtrl', function($scope, $http, $timeout, $log) {
    $scope.map = { center: { latitude: 48.740422, longitude: 9.101605 }, zoom: 12, bounds: {} };
    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 48.740422,
        longitude: 9.101605
      },
      options: { draggable: false, icon:'img/hdm.png' },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: false,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };

    $scope.click = function(){
      //alert("test")
    }

})




.controller('parkCtrl', function($scope, $http) {
  $scope.map = { center: { latitude: 48.740422, longitude: 9.101605 }, zoom: 15, bounds: {} };
    var createRandomMarker = function(i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
        lat_range = bounds.northeast.latitude - lat_min,
        lng_min = bounds.southwest.longitude,
        lng_range = bounds.northeast.longitude - lng_min;
      if (idKey == null) {
        idKey = "id";
      }

      var latitude = lat_min + (Math.random() * lat_range);
      var longitude = lng_min + (Math.random() * lng_range);
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i,
        icon:"img/parking.png"
      };

      ret[idKey] = i;
      return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function(nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        for (var i = 0; i < 3; i++) {
          markers.push(createRandomMarker(i, $scope.map.bounds))
          console.log(markers)
        }
        $scope.randomMarkers = markers;
      }
    }, true);


})










.controller('favListCtrl', function($scope, $http, localStorageService) {
    $http.get('js/data.json').then(function(articlesResponse) {
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
})











.controller('singleCtrl', function($scope, $http, $stateParams,$location , $route ,$state,localStorageService) {




 // Logik der Funktion zur FAV delete/hinzufügen
 // erstmal wird geprüft ist die Seite gerade FAV
 //     Hier aufpassen , was wenn der array leer ist?
 // wenn ja => $scope.fav = true
 // wenn nein $scope.fav = false


function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }



  $scope.favArray =  localStorageService.get('favList');
  // prüfen ob überhaupt favoriten gesetzt sind. Sonst empty und indexofnull => error
  if($scope.favArray != null){
    $scope.fav = isInArray(parseInt($stateParams.id), $scope.favArray);
  } else {
    $scope.fav = false;
  }
  /*
  // Prüfen ob der Eintrag bereits ein Favorit ist
  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
  $scope.check = function(){
  		return(isInArray(parseInt($stateParams.id), $scope.favArray));
  }

//  console.log($scope.check())
$scope.fav = $scope.check();
*/

 $http.get('js/data.json').then(function(articlesResponse) {
    $scope.articles = articlesResponse.data[$stateParams.id];
 	console.log($scope.articles)
  });
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
        slides.push({ image: "img/demoContent/demoslider.gif"});
        slides.push({ image: "img/demoContent/demoslider.gif"});
        slides.push({ image: "img/demoContent/demoslider.gif"});
        slides.push({ image: "img/demoContent/demoslider.gif"});
        slides.push({ image: "img/demoContent/demoslider.gif"});


$scope.makeFav = function(val){
		$scope.fav = true;
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
 $scope.rmFav = function(id){
  $scope.fav = false;
 	// einladen
	var array = localStorageService.get('favList');
	// rausschmeissen
	var index = array.indexOf(id);
	if (index > -1) {
    array.splice(index, 1);
	}
	// abspeichern
	localStorageService.set('favList', array);
	console.log("-")
}


});
