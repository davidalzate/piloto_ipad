var scrollElementos = null;

$(document).on('onLoadPage', '#'+hashCategoria, function() {
	
	$(document).on(appEvent, '.btnVerMas, .imgItem', function(evt) {
		evt.preventDefault();
		navigation.goPage(urlElemento,hashElemento);    
	});
	
    var catSeleccionada = $.data(document, categoriaSeleccionada);
    if(catSeleccionada===undefined || catSeleccionada==null || catSeleccionada==""){
        //navigation.goPage(urlCategorias,hashCategorias);
    }
    var categorias = JSON.parse(window.localStorage.getItem(storageCategorias));
    var html = "";
    for(var i=0; i<categorias.length; i++){
    	if(categorias[i].idCategoria==catSeleccionada){
    		$("#categoriaActual").text(categorias[i].nombre);
    		console.log("setting el nombre de la categoria actual: " + categorias[i].nombre);
    	}
    }
           
    $(document).on(appEvent, '.categoriaDiv', function(evt) {
        var elemento = $(this).prop("id").substr(3);
        alert("Se debe ir al detalle del elemento: "+elemento);
    });
           
    $(document).on(appEvent, '.btnNavCategorias', function(evt) {
        var cat = $(this).prop("id").substr(("btnCategoria").length);
        loadServiceElementosxCategoria(cat);
    });
           
    $(document).on(appEvent, '#bannerDiv', function(evt) {
        console.log("Banner");
        alert("Se debe ir a la info del banner");
    });
           
    $(document).on(appEvent, '#btnRevisarPedido', function(evt) {
        alert("Se debe ir a revisar pedido");
    });
           
    $(document).on(appEvent, '#btnToCategorias', function(evt) {
    	console.log("Regresando al menu");
        navigation.goPage(urlCategorias,hashCategorias);
    });
    
    scrollElementos = new iScroll("wrapper");    
    scrollElementos.refresh();
    
    fillElementosCategoria();
    
});

$(document).on('onUnloadPage', '#'+hashCategoria, function() {
    $(document).off(appEvent, '.categoriaDiv');
    $(document).off(appEvent, '.btnNavCategorias');
    $(document).off(appEvent, '#bannerDiv');
    $(document).off(appEvent, '#btnRevisarPedido');
    $(document).off(appEvent, '#btnToCategorias');
    
    $(document).off(appEvent, '.btnVerMas, .imgItem');
    
    scrollElementos.destroy();
    scrollElementos = null;
});

function fillElementosCategoria(){
	util.showLoading();
	alert(storageElementos+$.data(document, categoriaSeleccionada));
    var elementos = JSON.parse(window.localStorage.getItem(storageElementos+$.data(document, categoriaSeleccionada)));
    var html = "";
    for(var i=0; i<elementos.length; i++){
    	html+='<div class ="itemCategoria">';
    		html+='<div class ="imgItem">';    		
	    		var urlImageElemento = "/images/crash.jpg";
				for(var j=0; j<arrayImagenes.length; j++){
					if(arrayImagenes[j].key==("elemento"+elementos[i].idElemento+"small")){
						urlImageElemento = arrayImagenes[j].location;
						break;
					}
				}
				html+='<img src="' + urlImageElemento + '" width="210" height="144">';
			html+='</div>';
			html+='<div id="contenedorDescripcion">';
	    		html+='<div id="tituloItem">' + elementos[i].nombre + '</div>';
    			html+='<div id="descripcionItem">' + elementos[i].descripcionCorta + '</div>';
	    	html+='</div>';
	    	html+='<div id="contenedorVerMas">';
	    		html+='<div id="precioItem">' + util.formatoMoneda(elementos[i].precio, " $ ") + '</div>';
	    		html+='<div id="botonVerMas">';
	    			html+='<a class="btnVerMas" href="#">Ver m&aacute;s</a>';
    			html+='</div>';
			html+='</div>';
		html+='</div>';
    }
    $("#contenedorElementos").append(html);
    
    console.log(html);
    
    scrollElementos.refresh();
    util.closeLoading();
}