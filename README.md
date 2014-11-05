hdm-beacon
==========

HDM Beacon app for media night

# Notes

* Create BeaconRegion (Beacon[s]) with identifier, uuid, minor, major using var locationManager = new cordova.plugins.locationManager(id, uuid, min, maj)
* Monitoring and ranging of Beacons with locationManager.delegate.implement(code here). Enables you to take actions, when you are near a specific beacon.
*
var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9'; // mandatory
var identifier = 'beaconAtTheMacBooks'; // mandatory
var minor = 1000; // optional, defaults to wildcard if left empty
var major = 5; // optional, defaults to wildcard if left empty

// throws an error if the parameters are not valid
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

https://build.phonegap.com/plugins/986


636f3f8f-6491-4bee-95f7-d8cc64a863b5
