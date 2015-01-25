var app = {};


// this array holds information about our beacons
app.ourBeacons =
[
  {identifier:"0", uuid:"f0018b9b-7509-4c31-a905-1a27d39c003c", major:"37471", minor:"23614" },
  {identifier:"1", uuid:"f0018b9b-7509-4c31-a905-1a27d39c003c", major:"14895", minor:"36879" },
  {identifier:"2", uuid:"f0018b9b-7509-4c31-a905-1a27d39c003c", major:"8204", minor:"31946" }
]

  // init the vars with the dafult page, not used in the angularjs versions
  app.currentPage = "default"
  pageid = "default"

  // this method takes care about starting everything from even handling, loading the plugin and search for beacons in range
  app.initialize = function() {
    // Important to stop scanning when page reloads/closes!
    window.addEventListener('beforeunload', function(e)
    {
      //iBeacon.stopScan();
    });

    app.bindEvents();
  },

  // registert even handler for deviceready (app is fully loaded)
  app.bindEvents = function() {
    document.addEventListener('deviceready', app.onDeviceReady, false)
  },

  // when device is ready, enable blueetooth and load the beacon plugin or display error message
  app.onDeviceReady = function() {
    //console.log('cordova: ' + JSON.stringify(cordova, null, "\t"));
    //window.LocationManager = cordova.plugins.LocationManager;
    window.bluetooth.enable();
    window.locationManager = cordova.plugins.locationManager;

    if (typeof cordova.plugins.locationManager === 'undefined') {
      alert("window.locationManager has not been defined!");
    }
    app.scanForBeacons();
}

  // start scanning for beacons in range
  app.scanForBeacons = function() {

  // configure what happens if a beacon is found, we only care about didRangeBeaconsInRegion
  var delegate = locationManager.delegate.implement(
    {
      didDetermineStateForRegion: function (pluginResult) {
        //console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
      },

      didStartMonitoringForRegion: function (pluginResult) {
      //console.log('didStartMonitoringForRegion:', pluginResult);
    },

      didRangeBeaconsInRegion: function (pluginResult) {

      // This is where the magic happens
      // if beacons are found, check for every beacon if it is in immediate proximity (this is defined by the beacon). If yes stop scanning and tell angularjs (the ui) which beacon has been found.
      // if no beacon has been found, or nothing is in range keep scanning till a beacon has been found.
      if (pluginResult.beacons.length != 0)
        {
          for (var i in pluginResult.beacons) {
            var beacon = pluginResult.beacons[i];
            var beaconid = pluginResult.region.identifier;

            if (beacon.proximity == "ProximityImmediate")
              {
                app.stopScan();
                angular.element(document.getElementById('radarCtrl')).scope().foundBeacon(beaconid);
                angular.element(document.getElementById('radarCtrl')).scope().interface = false;
                return
              }

            else
              {
                return
              }
          }
          return
        }
      else
        {
          //app.stopScan();
          //angular.element(document.getElementById('radarCtrl')).scope().foundBeacon(0);
          return
        }
  }
});


// send the configuration above to the plugin.
locationManager.setDelegate(delegate);

// start scanning for the beacons defined in ourBeacons.
for (var index in app.ourBeacons) {
  var unit = app.ourBeacons[index];

  var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(unit.identifier, unit.uuid, unit.major, unit.minor);

  cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
    .fail(console.error)
    .done();
}
}

// stop scanning for the beacons defined in ourBeacons.
app.stopScan = function() {
  for (var index in app.ourBeacons) {
    var unit = app.ourBeacons[index];

    beaconRegion = new cordova.plugins.locationManager.BeaconRegion(unit.identifier, unit.uuid, unit.major, unit.minor);

    cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
      .fail(console.error)
      .done();
    }
    console.log("Scan stopped");
}
