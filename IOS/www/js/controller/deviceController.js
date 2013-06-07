var dispositivo = null;

DeviceController = function(){
	
	this.states = {};
    this.states[Connection.UNKNOWN]  = 'Unknown connection';
    this.states[Connection.ETHERNET] = 'Ethernet connection';
    this.states[Connection.WIFI]     = 'WiFi connection';
    this.states[Connection.CELL_2G]  = 'Cell 2G connection';
    this.states[Connection.CELL_3G]  = 'Cell 3G connection';
    this.states[Connection.CELL_4G]  = 'Cell 4G connection';
    this.states[Connection.NONE]     = 'No network connection';

	this.name= device.name;
	this.platform = device.platform;
	this.cordova = device.cordova;
	this.uuid = device.uuid;
	this.version = device.version;
	
	this.battery=null;
	this.connected=null;
	
	this.networkStatus = function(){
		return states[navigator.network.connection.type];
	};
	
	this.batteryStatus = function(){
		return battery;
	};
	
	this.isConnected = function(){
		return connected;
	};
	
	this.beep = function(){
		navigator.notification.beep();
	};
	
	this.vibrate = function(milis){
		navigator.notification.vibrate(milis);
	};
	
};