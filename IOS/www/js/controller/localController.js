var local;

LocalController = function(){
	this.getSomething = function(storage, callback){
		var data = window.localStorage.getItem(storage);
		if(data==null || data.length==0){
			console.log("No local data. Going Remote");
			remote.getSomething(storage, callback);
		}else{
			callback(data);
		}
	};	
};

local = new LocalController();