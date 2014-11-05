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

## create a Beacon on your machine using VirtualBox
Install bluez 5, ubuntu 14.10 is using bluez 4. ppa:vidplace7/bluez5

sudo hciconfig hci0 up
sudo hciconfig hci0 leadv 3
sudo hciconfig hci0 noscan
sudo hcitool -i hci0 cmd 0x08 0x0008 1E 02 01 1A 1A FF 4C 00 02 15 63 6F 3F 8F 64 91 4B EE 95 F7 D8 CC 64 A8 63 B5 00 00 00 00 C8 00
