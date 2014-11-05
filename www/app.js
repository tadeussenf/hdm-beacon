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
    alert("Device rdy!");
    //app.scanForBeacons();
},

scanForBeacons: function() {
  var ourBeacons = [
    {identifier:"test", uuid:"636f3f8f-6491-4bee-95f7-d8cc64a863b5", minor:"0", major:"0", },
  ]

  var delegate = locationManager.delegate.implement({
    didDetermineStateForRegion: function (pluginResult) {
      //console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
    },

  didStartMonitoringForRegion: function (pluginResult) {
    //console.log('didStartMonitoringForRegion:', pluginResult);
  },

  didRangeBeaconsInRegion: function (pluginResult) {
    // This is where the magic happens
    alert("Beacon detected!");
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
