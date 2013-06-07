var facade;

FacadeController = function(){
		
	this.getSomething = function(storage, callback, isRemoto){
		if(isRemoto){
			remote.getSomething(storage, callback);
		}else{
			local.getSomething(storage, callback);
		}
	};
	
};

facade = new FacadeController();