angular.module('starter.controllers', [])

.controller('radarCtrl', function($scope, $location) {
  /*

  Legacy:

  $scope.chgVal = function(){
    $scope.id =  2;
  };

  // sobald eine Änderung festgestellt wird, weiterleitung auf die jeweilige Single Seite und ID anhängen
  $scope.$watch('id' , function(newVal,oldVal,scope){
    if (typeof $scope.id != 'undefined')
    $location.path('/app/single/'+$scope.id);
  });

*/
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
  

  $scope.favArray =  localStorageService.get('favList');
/*
  // Prüfen ob der Eintrag bereits ein Favorit ist
  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
  //$scope.check = function(){
  		console.log(isInArray(parseInt($stateParams.id), $scope.favArray));
  //}

  //$scope.check() // true
*/

 $http.get('js/data.json').then(function(articlesResponse) {
    $scope.articles = articlesResponse.data[$stateParams.id];
 	console.log($scope.articles)
  });
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  slides.push({ image: "http://fakeimg.pl/1600x636/282828/eae0d0/"});
  slides.push({ image: "http://fakeimg.pl/1600x636/ff0000/eae0d0/"});
  slides.push({ image: "http://fakeimg.pl/1600x636/ffffff/eae0d0/"});

$scope.makeFav = function(val){
		
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