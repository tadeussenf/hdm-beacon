hdm-beacon
==========

HDM Beacon app for media night
Using
* PhoneGap
* https://github.com/petermetz/cordova-plugin-ibeacon
* estimote beacons  

# HowTo

* Create BeaconRegion (Beacon[s]) with identifier, uuid, minor, major using var locationManager = new cordova.plugins.locationManager(id, uuid, min, maj)
* Monitoring and ranging of Beacons with locationManager.delegate.implement(code here). Enables you to take actions, when you are near a specific beacon.

## First Steps
### set following variables
```
var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9'; // mandatory
var identifier = 'beaconAtTheMacBooks'; // mandatory
var minor = 1000; // optional, defaults to wildcard if left empty
var major = 5; // optional, defaults to wildcard if left empty
```

### Initalise BeaconRegion
```
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor); // throws an error if the parameters are not valid
```
### Delegate to the plugin
```
var delegate = locationManager.delegate.implement({code here});
```

# Notes
Tadeus Senf's test beacon UUID: 636f3f8f-6491-4bee-95f7-d8cc64a863b5
