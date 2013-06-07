var infoOK;
var pautasOK;
var categoriasOK;
var elementosOK;

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
        	window.localStorage.setItem(storageCuentaResource, JSON.stringify(data));
        	console.log(JSON.stringify(data));
        	//Mirar si el restaurante actual es el mismo de la ultima vez
        	if(data.idRestaurante!==undefined && data.idRestaurante!=null && data.idRestaurante!=""){
        		console.log("Info asociada del restaurante encontada. Continuar carga inicial");        	
        		var ultimoRestaurante = window.localStorage.getItem(storageLastRestaunte); 
        		console.log("Ultimo restaurante: "+ultimoRestaurante);
        		console.log("Actual restaurante: "+data.idRestaurante);
        		if(ultimoRestaurante!=null && ultimoRestaurante!="" && ultimoRestaurante==data.idRestaurante){
        			//es el mismo!!. Mostrar pagina de categorias
        			navigation.goPage(urlCategorias,hashCategorias);
        			console.log("Este restaurante es el mismo que el ultimo. No es necesario descargar.");
        			arrayImagenes = JSON.parse(window.localStorage.getItem(storageImagenesTotales));
        			
        			var arrayUrlImagenes = new Array();
        			for(var i=0; i<arrayImagenes.length;i++){
        				arrayUrlImagenes.push(arrayImagenes[i].location);
        			}
        			
        			$.imageloader({
        		         urls: arrayUrlImagenes,
        		        //smoothing: true,
        		        onComplete: function(images){
        		            // when load is complete
        		        	util.closeLoading();
        		        	navigation.goPage(urlCategorias,hashCategorias);
        		        },
        		        onUpdate: function(ratio, image){
        		            // ratio: the current ratio that has been loaded
        		            // image: the URL to the image that was just loaded
        		        },
        		        onError: function(err){
        		            // err: error message if images couldn't be loaded
//        		        	util.closeLoading();
//        					navigator.notification.alert(
//        					    'No fue posible precargar las imagenes.',  // message
//        					    function(){},         // callback
//        					    'Atenci\u00F3n',           // title
//        					    'Aceptar'             // buttonName
//        					);        	
        		        }
        		    });
        		}else{
        			//No es el mismo!!. Borrar las imagenes descargadas, e iniciar proceso de carga inicial
        			alert("Este restaurante no es el mismo que el ultimo. " + data.idRestaurante + " Es necesario descargar.");
        			window.localStorage.setItem(storageLastRestaunte,data.idRestaurante);
        			carpetaImagenes.removeRecursively(function(directorioBorrado){
        				sitemaFicheros.getDirectory(
        						nombreCarpetaImagenes, 
        						{create: true}, 
        						function(directorio){
        							carpetaImagenes = directorio;        							
        							doCargaInicial();
        						}, 
        						function fail(error) {
        							console.log(error);
        							navigator.notification.alert(
        							    'No fue posible acceder al almacenamiento.',  // message
        							    function(){},         // callback
        							    'Atenci\u00F3n',           // title
        							    'Aceptar'             // buttonName
        							);
        						}
        					);
        			},function fail(error) {
    					console.log(error);
    					navigator.notification.alert(
    					    'No fue posible limpiar las imagenes almacenadas anteriormente.',  // message
    					    function(){},         // callback
    					    'Atenci\u00F3n',           // title
    					    'Aceptar'             // buttonName
    					);
    				});
        			
        		}
        	}else{
        		util.showAlert("Lo sentimos, no se ha podido recuperar la informacion asociada del restaurante.");
        		window.localStorage.removeItem(storageCuentaResource);
        	}
        }).fail(function(jqXHR, textStatus, errorThrown) {
              util.closeLoading();
              console.log("Fail buscando la info asociada del restaurante.");
              console.log(JSON.stringify(jqXHR));
              util.showAlert("Lo sentimos, no se ha podido recuperar la informacion asociada del restaurante.");
              window.localStorage.removeItem(storageCuentaResource);
         });
    }catch(e){
        util.closeLoading();
        console.log("Fail buscando la info asociada del restaurante.");
        util.showAlert("Lo sentimos, no se ha podido recuperar la informacion asociada del restaurante.");
        window.localStorage.removeItem(storageCuentaResource);
    }	
}

var intervalId;

function doCargaInicial(){
	
	infoOK=null;
	pautasOK=null;
	categoriasOK=null;
	elementosOK=null
	
	intervalId=setInterval(function(){
		if(infoOK==true && pautasOK==true && categoriasOK==true && elementosOK==true){
			window.clearInterval(intervalId);
			//exito
			console.log("Todo ha sido descargado con exito");
			doCargaImagenes();
		}else if((infoOK!=null && infoOK==false) || (pautasOK!=null && pautasOK==false) || (categoriasOK!=null && categoriasOK==false) || (elementosOK!=null && elementosOK==false)){
			//fracaso
			window.clearInterval(intervalId);
			console.log("Algun recurso no se descargo. No se puede continuar.");
			console.log(infoOK + " " + pautasOK + " " + categoriasOK + " " + elementosOK);
			//do nothing else
		}
	},1000);
	
	getInfoRestaurante();
	getCategorias();
	getPautas();
}

function getInfoRestaurante(){
    try{
    	console.log("Obteniendo la informacion completa del restaurante");
        util.showLoading();
        var resource = JSON.parse(window.localStorage.getItem(storageCuentaResource));
        $.ajax({
               type: "GET",
               url: urlObtenerRestaurante+(resource.idRestaurante)
        }).done(function(data){
        	util.closeLoading();
        	//console.log(data);
        	if(data.name!==undefined && data.name!=null && data.name!=""){
        		window.localStorage.setItem(storageInfoRestaurante, JSON.stringify(data));
        		console.log("Informacion completa del restaurante obtenida");
        		infoOK=true;
        	}else{
        		infoOK=false;
        		util.showAlert("Lo sentimos, no se ha podido recuperar la informacion completa del restaurante.");
        		console.log("Informacion completa del restaurante en blanco");
        		window.localStorage.removeItem(storageInfoRestaurante);
        	}
        }).fail(function(jqXHR, textStatus, errorThrown) {
        	 infoOK=false;
			 util.closeLoading();
			 util.showAlert("Lo sentimos, no se ha podido recuperar la informacion completa del restaurante.");
			 console.log("ERROR obteniendo la informacion completa del restaurante");
			 //console.log(JSON.stringify(jqXHR));
			 window.localStorage.removeItem(storageInfoRestaurante);
         });
    }catch(e){
    	infoOK=false;
        util.closeLoading();
        util.showAlert("Lo sentimos, no se ha podido recuperar la informacion completa del restaurante.");
        console.log("ERROR obteniendo la informacion completa del restaurante");
        window.localStorage.removeItem(storageInfoRestaurante);
    }	
}

function getPautas(){
    //Consumo del servicio de pautas
	var resource = JSON.parse(window.localStorage.getItem(storageCuentaResource));
    try{
    	console.log("Obteniendo las pautas del restaurante");
        util.showLoading();
        $.ajax({
            type: "GET",
            url: urlObtenerPautas+(resource.idRestaurante)
        }).done(function(data){
        	util.closeLoading();
        	if(data!==undefined && data!=null && data.length!==undefined && data.length!=0){
        		window.localStorage.setItem(storagePautas,JSON.stringify(data));
        		console.log("Pautas del restaurante obtenidas");
        		pautasOK=true;
        	}else{
        		console.log("Pautas del restaurante en blanco");
        		window.localStorage.removeItem(storagePautas);
        		pautasOK=false;
        	}
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            window.localStorage.removeItem(storagePautas);
            util.closeLoading();
            console.log("ERROR obteniendo las pautas del restaurante");
            util.showAlert("Lo sentimos, no se ha podido recuperar las pautas del restaurante.");
            console.log(JSON.stringify(jqXHR));
            pautasOK=false;
        });
    }catch(e){
        window.localStorage.removeItem(storagePautas);
        util.closeLoading();
        console.log("ERROR obteniendo las pautas del restaurante");
        util.showAlert("Lo sentimos, no se ha podido recuperar las pautas del restaurante.");
        pautasOK=false;
    }
}

function getCategorias(){
    //Consumo del servicio de categorias
	var resource = JSON.parse(window.localStorage.getItem(storageCuentaResource));
    try{
    	console.log("Obteniendo las categorias del restaurante");
        util.showLoading();
        $.ajax({
            type: "GET",
            url: urlObtenerCategorias+(resource.idRestaurante)
        }).done(function(data){
        	util.closeLoading();
        	if(data!==undefined && data!=null && data.length!==undefined && data.length!=0){
        		window.localStorage.setItem(storageCategorias,JSON.stringify(data));
        		console.log("Categorias del restaurante obtenidas");
        		categoriasOK=true;
        		doTraerElementos(data);
        	}else{
        		categoriasOK=false;
        		console.log("Categorias del restaurante en blanco");
        		window.localStorage.removeItem(storageCategorias);
        	}
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            window.localStorage.removeItem(storageCategorias);
            util.closeLoading();
            console.log("ERROR obteniendo las categorias del restaurante");
            util.showAlert("Lo sentimos, no se ha podido recuperar las categorias del restaurante.");
            console.log(JSON.stringify(jqXHR));
            categoriasOK=false;
        });
    }catch(e){
        window.localStorage.removeItem(storageCategorias);
        util.closeLoading();
        console.log("ERROR obteniendo las categorias del restaurante");
        util.showAlert("Lo sentimos, no se ha podido recuperar las categorias del restaurante.");
        categoriasOK=false;
    }
}


function doTraerElementos(data){
	for(var i=0; i<data.length; i++){
		if(i==(data.length-1)){
			getElementosCategoria(data[i].idCategoria, true);
		}else{
			getElementosCategoria(data[i].idCategoria);
		}
	}
}

function getElementosCategoria(idCategoria, last){
	console.log("Obteniendo los elementos de la categoria "+idCategoria);
    try{
        util.showLoading();
        $.ajax({
            type: "GET",
            url: urlObtenerElementosxCategoria+idCategoria
        }).done(function(data){
        	util.closeLoading();
        	if(data!==undefined && data!=null && data.length!==undefined && data.length!=0){
        		window.localStorage.setItem(storageElementos+idCategoria,JSON.stringify(data));
        		if(last){
        			elementosOK=true;
        		}
        	}else{
        		window.localStorage.removeItem(storageElementos+idCategoria);
        		elementosOK=false;
        	}
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
        	window.localStorage.removeItem(storageElementos+idCategoria);
            util.closeLoading();
            util.showAlert("Lo sentimos, no se ha podido recuperar la informacion de los elementos de la categoria " + idCategoria);
            console.log(JSON.stringify(jqXHR));
            elementosOK=false;
        });
    }catch(e){
    	window.localStorage.removeItem(storageElementos+idCategoria);
        util.closeLoading();
        util.showAlert("Lo sentimos, no se ha podido recuperar la informacion de los elementos de la categoria " + idCategoria);
        elementosOK=false;
    }	
}

var arrayImagenes;

function doCargaImagenes(){
	
	console.log("Cargar imagenes");
	util.showLoading();
	
	arrayImagenes = new Array();
	
	var resource = JSON.parse(window.localStorage.getItem(storageCuentaResource));
	var infoRestaurante = JSON.parse(window.localStorage.getItem(storageInfoRestaurante));
	var pautas = JSON.parse(window.localStorage.getItem(storagePautas));
	var categorias = JSON.parse(window.localStorage.getItem(storageCategorias));
	
	var imageTemp = new beanImage("fondoRestaurante"+resource.idRestaurante, infoRestaurante.fondo);
	arrayImagenes.push(imageTemp);
	
	var imageTemp = new beanImage("bannerRestaurante"+resource.idRestaurante, infoRestaurante.banner);
	arrayImagenes.push(imageTemp);
	
	for(var i=0; i<pautas.length; i++){
		imageTemp = new beanImage("pauta"+pautas[i].idAnuncio+"small",pautas[i].fotoSmall);
		arrayImagenes.push(imageTemp);
		
		imageTemp = new beanImage("pauta"+pautas[i].idAnuncio+"big",pautas[i].fotoBig);
		arrayImagenes.push(imageTemp);
	}
	
	for(var i=0; i<categorias.length; i++){
		imageTemp = new beanImage("categoria"+categorias[i].idCategoria, categorias[i].foto);
		arrayImagenes.push(imageTemp);
		
		var elementos = JSON.parse(window.localStorage.getItem(storageElementos+categorias[i].idCategoria));
		for(var j=0; j<elementos.length; j++){
			imageTemp = new beanImage("elemento"+elementos[j].idElemento+"small", elementos[j].fotoSmall);
			arrayImagenes.push(imageTemp);
			
			imageTemp = new beanImage("elemento"+elementos[j].idElemento+"big", elementos[j].fotoBig);
			arrayImagenes.push(imageTemp);
		}		
	}
	
	//console.log(JSON.stringify(arrayImagenes));
	
	for(var i=0; i<arrayImagenes.length; i++){
		downloadImage(arrayImagenes[i],2);
	}
	
	window.setTimeout(function(){
		console.log(JSON.stringify(arrayImagenes));
		window.localStorage.setItem(storageImagenesTotales, JSON.stringify(arrayImagenes));
		var arrayUrlImagenes = new Array();
		for(var i=0; i<arrayImagenes.length;i++){
			arrayUrlImagenes.push(arrayImagenes[i].location);
		}
		
		$.imageloader({
	        urls: arrayUrlImagenes,
	        //smoothing: true,
	        onComplete: function(images){
	            // when load is complete
	        	util.closeLoading();
	        	navigation.goPage(urlCategorias,hashCategorias);
	        },
	        onUpdate: function(ratio, image){
	            // ratio: the current ratio that has been loaded
	            // image: the URL to the image that was just loaded
	        },
	        onError: function(err){
	            // err: error message if images couldn't be loaded
//	        	util.closeLoading();
//				navigator.notification.alert(
//				    'No fue posible precargar las imagenes.',  // message
//				    function(){},         // callback
//				    'Atenci\u00F3n',           // title
//				    'Aceptar'             // buttonName
//				);        	
	        }
	    });
		
	}, 15000);
}