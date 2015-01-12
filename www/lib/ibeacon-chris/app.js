var app = {};


// list our Beacons here
app.ourBeacons =
[
  {identifier:"1", uuid:"f0018b9b-7509-4c31-a905-1a27d39c003c", major:"37471", minor:"23614" },
  {identifier:"2", uuid:"f0018b9b-7509-4c31-a905-1a27d39c003c", major:"14895", minor:"36879" }
]

  app.currentPage = "default"
  pageid = "default"

  app.initialize = function() {
    // Important to stop scanning when page reloads/closes!
    window.addEventListener('beforeunload', function(e)
    {
      //iBeacon.stopScan();
    });

    app.bindEvents();
  },

  app.bindEvents = function() {
    document.addEventListener('deviceready', app.onDeviceReady, false)
  },

  app.onDeviceReady = function() {
    //console.log('cordova: ' + JSON.stringify(cordova, null, "\t"));
    //window.LocationManager = cordova.plugins.LocationManager;
    window.locationManager = cordova.plugins.locationManager;

    if (typeof cordova.plugins.locationManager === 'undefined') {
      alert("window.locationManager has not been defined!");
    }
    app.scanForBeacons();
}

  app.scanForBeacons = function() {

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
      if (pluginResult.beacons.length != 0)
        {
          for (var i in pluginResult.beacons) {
            var beacon = pluginResult.beacons[i];
            var beaconid = pluginResult.region.identifier;

            if (beacon.proximity == "ProximityImmediate")
              {
                app.stopScan();
                angular.element(document.getElementById('radarCtrl')).scope().foundBeacon(beaconid);
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

locationManager.setDelegate(delegate);

for (var index in app.ourBeacons) {
  var unit = app.ourBeacons[index];

  var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(unit.identifier, unit.uuid, unit.major, unit.minor);

  cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
    .fail(console.error)
    .done();
}
}

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