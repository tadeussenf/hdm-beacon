var app = {};

app.ourBeacons =
[
  {identifier:"beacon1", uuid:"f0018b9b-7509-4c31-a905-1a27d39c003c", major:"37471", minor:"23614" },
  {identifier:"beacon2", uuid:"f0018b9b-7509-4c31-a905-1a27d39c003c", major:"14895", minor:"36879" }
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
    app.showPage(app.currentPage)
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
            var pageid = pluginResult.region.identifier;

            if (beacon.proximity == "ProximityImmediate")
              {
                app.showPage(pageid);
                app.stopScan();
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
          app.showPage("default")
          return
        }
  }
});

locationManager.setDelegate(delegate);

for (var index in app.ourBeacons) {
  var unit = app.ourBeacons[index];

  var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(unit.identifier, unit.uuid, unit.major, unit.minor);

  // get Authorization on iOS8+
  cordova.plugins.locationManager.requestAlwaysAuthorization()

  locationManager.startMonitoringForRegion(beaconRegion)
    .fail(console.error)
    .done();

  cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
    .fail(console.error)
    .done();
}
}

app.showPage = function(pageid) {
  document.getElementById(pageid).style.display = "block"

  if (app.currentPage != pageid)
    {
      document.getElementById(app.currentPage).style.display = "none"
    }
  app.currentPage = pageid;
}

app.stopScan = function() {
  for (var index in app.ourBeacons) {
    var unit = app.ourBeacons[index];

    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(unit.identifier, unit.uuid, unit.major, unit.minor);

    locationManager.stopMonitoringForRegion(beaconRegion)
      .fail(console.error)
      .done();

    cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
      .fail(console.error)
      .done();
  }
}
