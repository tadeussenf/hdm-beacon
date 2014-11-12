var app = {
  initialize: function() {
    // Important to stop scanning when page reloads/closes!
    window.addEventListener('beforeunload', function(e)
    {
      //iBeacon.stopScan();
    });

    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    //console.log('cordova: ' + JSON.stringify(cordova, null, "\t"));
    //window.LocationManager = cordova.plugins.LocationManager;
    window.locationManager = cordova.plugins.locationManager;

    if (typeof cordova.plugins.locationManager === 'undefined') {
      alert("window.locationManager has not been defined!");
    }
    alert("Device ready!");
    app.scanForBeacons();
},

scanForBeacons: function() {
  var ourBeacons = [
    //{identifier:"test", uuid:"636f3f8f-6491-4bee-95f7-d8cc64a863b5", major:"0", minor:"0" },
    {identifier:"beacon-inside1", uuid:"f0018b9b-7509-4c31-a905-1a27d39c003c", major:"37471", minor:"23614" },
  ]

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
          var bcnName = pluginResult.region.identifier
          alert("Beacon detected: " + bcnName);
        }
      else
        {
          alert("nothing found");
        }
  }
});
locationManager.setDelegate(delegate);

var identifier = ourBeacons[0].identifier;
var uuid = ourBeacons[0].uuid;
var minor = ourBeacons[0].minor;
var major = ourBeacons[0].major;
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
  .fail(console.error)
  .done();
  },
};
