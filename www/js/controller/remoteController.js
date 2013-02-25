var remote;

RemoteController = function(){
	
	this.getSomething = function(storage, callback){
		try{
			util.showLoading();
			$.ajax({   	
		    	type: 'POST',
		        url: 'www....//Matricular en config',
		        dataType: 'json',
		        timeout: TIMEOUTMS,
		        data:'{"Definir el json que se envia//Si es necesario":"valor"}',
			}).done(function(datos){
				util.closeLoading();
		    	window.localStorage.setItem(storage,datos);
		    	callback(datos);
		    }).error(function(jqXHR, textStatus, m){
		    	util.closeLoading();
		    	callback(null);
		    	util.showAlert(util.decodeMessage(jqXHR,textStatus,servicioLLamado),true);
		    });	        
	    }catch(exception){
	    	util.closeLoading();
	    	util.showAlert(util.decodeMessage(null,null,servicioLLamado),true);
	    }
	};

};

remote = new RemoteController();