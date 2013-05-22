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
		    	window.sessionStorage.setItem(storage,datos);
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

function getResource(){
	console.log("Obteniendo la info asociada del restaurante");
    try{
        util.showLoading();
        $.ajax({
               type: "GET",
               url: urlObtenerResource
        }).done(function(data){
        	data = data[0];
        	util.closeLoading();
        	window.sessionStorage.setItem(storageCuentaResource, JSON.stringify(data));
        	//console.log(data);
        	if(data.idRestaurante!==undefined && data.idRestaurante!=null && data.idRestaurante!=""){
        		console.log("Info asociada del restaurante encontada. Continuar carga inicial");
        		doCargaInicial();
        	}else{
        		util.showAlert("Lo sentimos, no se ha podido recuperar la informacion asociada del restaurante.");
        		window.sessionStorage.removeItem(storageCuentaResource);
        	}
        }).fail(function(jqXHR, textStatus, errorThrown) {
              util.closeLoading();
              console.log("Fail buscando la info asociada del restaurante.");
              console.log(JSON.stringify(jqXHR));
              util.showAlert("Lo sentimos, no se ha podido recuperar la informacion asociada del restaurante.");
              window.sessionStorage.removeItem(storageCuentaResource);
         });
    }catch(e){
        util.closeLoading();
        console.log("Fail buscando la info asociada del restaurante.");
        util.showAlert("Lo sentimos, no se ha podido recuperar la informacion asociada del restaurante.");
        window.sessionStorage.removeItem(storageCuentaResource);
    }	
}

function doCargaInicial(){
	getInfoRestaurante();
	getCategorias();
}

function getInfoRestaurante(){
    try{
    	console.log("Obteniendo la informacion completa del restaurante");
        util.showLoading();
        var resource = JSON.parse(window.sessionStorage.getItem(storageCuentaResource));
        $.ajax({
               type: "GET",
               url: urlObtenerRestaurante+(resource.idRestaurante)
        }).done(function(data){
        	util.closeLoading();
        	//console.log(data);
        	if(data.name!==undefined && data.name!=null && data.name!=""){
        		window.sessionStorage.setItem(storageInfoRestaurante, JSON.stringify(data));
        		console.log("Informacion completa del restaurante obtenida");
        		//sincronize();
        	}else{
        		util.showAlert("Lo sentimos, no se ha podido recuperar la informacion completa del restaurante.");
        		console.log("Informacion completa del restaurante en blanco");
        		window.sessionStorage.removeItem(storageInfoRestaurante);
        	}
        }).fail(function(jqXHR, textStatus, errorThrown) {
              util.closeLoading();
              util.showAlert("Lo sentimos, no se ha podido recuperar la informacion completa del restaurante.");
              console.log("ERROR obteniendo la informacion completa del restaurante");
              //console.log(JSON.stringify(jqXHR));
              window.sessionStorage.removeItem(storageInfoRestaurante);
         });
    }catch(e){
        util.closeLoading();
        util.showAlert("Lo sentimos, no se ha podido recuperar la informacion completa del restaurante.");
        console.log("ERROR obteniendo la informacion completa del restaurante");
        window.sessionStorage.removeItem(storageInfoRestaurante);
    }	
}

function getCategorias(){
    //Consumo del servicio de categorias
	var resource = JSON.parse(window.sessionStorage.getItem(storageCuentaResource));
    try{
    	console.log("Obteniendo las categorias del restaurante");
        util.showLoading();
        $.ajax({
            type: "GET",
            url: urlObtenerPautas+(resource.idRestaurante)
        }).done(function(data){
        	util.closeLoading();
        	if(data!==undefined && data!=null && data.length!==undefined && data.length!=0){
        		window.sessionStorage.setItem(storagePautas,JSON.stringify(data));
        		//sincronize
        		console.log("Pautas del restaurante obtenidas");
        	}else{
        		console.log("Pautas del restaurante en blanco");
        		window.sessionStorage.removeItem(storagePautas);
        	}
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            window.sessionStorage.removeItem(storagePautas);
            util.closeLoading();
            console.log("ERROR obteniendo las pautas del restaurante");
            util.showAlert("Lo sentimos, no se ha podido recuperar las pautas del restaurante.");
            console.log(JSON.stringify(jqXHR));
        });
    }catch(e){
        window.sessionStorage.removeItem(storagePautas);
        util.closeLoading();
        console.log("ERROR obteniendo las pautas del restaurante");
        util.showAlert("Lo sentimos, no se ha podido recuperar las pautas del restaurante.");
    }
}

function getCategorias(){
    //Consumo del servicio de categorias
	var resource = JSON.parse(window.sessionStorage.getItem(storageCuentaResource));
    try{
    	console.log("Obteniendo las categorias del restaurante");
        util.showLoading();
        $.ajax({
            type: "GET",
            url: urlObtenerCategorias+(resource.idRestaurante)
        }).done(function(data){
        	util.closeLoading();
        	if(data!==undefined && data!=null && data.length!==undefined && data.length!=0){
        		window.sessionStorage.setItem(storageCategorias,JSON.stringify(data));
        		//sincronize
        		console.log("Categorias del restaurante obtenidas");
        		doTraerElementos(data);
        	}else{
        		console.log("Categorias del restaurante en blanco");
        		window.sessionStorage.removeItem(storageCategorias);
        	}
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            window.sessionStorage.removeItem(storageCategorias);
            util.closeLoading();
            console.log("ERROR obteniendo las categorias del restaurante");
            util.showAlert("Lo sentimos, no se ha podido recuperar las categorias del restaurante.");
            console.log(JSON.stringify(jqXHR));
        });
    }catch(e){
        window.sessionStorage.removeItem(storageCategorias);
        util.closeLoading();
        console.log("ERROR obteniendo las categorias del restaurante");
        util.showAlert("Lo sentimos, no se ha podido recuperar las categorias del restaurante.");
    }
}


function doTraerElementos(data){
	for(var i=0; i<data.length; i++){
		getElementosCategoria(data[i].idCategoria);
	}
}

function getElementosCategoria(idCategoria){
	console.log("Obteniendo los elementos de la categoria "+idCategoria);
    try{
        util.showLoading();
        $.ajax({
            type: "GET",
            url: urlObtenerElementosxCategoria+idCategoria
        }).done(function(data){
        	util.closeLoading();
        	if(data!==undefined && data!=null && data.length!==undefined && data.length!=0){
        		window.sessionStorage.setItem(storageElementos+idCategoria,JSON.stringify(data));
        	}else{
        		window.sessionStorage.removeItem(storageElementos+idCategoria);
        	}
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	window.sessionStorage.removeItem(storageElementos+idCategoria);
            util.closeLoading();
            util.showAlert("Lo sentimos, no se ha podido recuperar la informacion de los elementos de la categoria " + idCategoria);
            console.log(JSON.stringify(jqXHR));
        });
    }catch(e){
    	window.sessionStorage.removeItem(storageElementos+idCategoria);
        util.closeLoading();
        util.showAlert("Lo sentimos, no se ha podido recuperar la informacion de los elementos de la categoria " + idCategoria);
    }	
}