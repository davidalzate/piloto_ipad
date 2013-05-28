var scrollCategorias = null;
$(document).on('onLoadPage', '#'+hashCategorias, function() {
	
	$(document).on(appEvent, '.btnToCategoria', function(evt) {
		evt.preventDefault();
	} );

	$(document).on(appEvent, '#btntoCategorias', function(evt) {
		evt.preventDefault();
		navigation.goPage(urlCategorias,hashCategorias);
	} );
	
	$(document).on(appEvent, '.producto', function(evt) {
		evt.preventDefault();
		navigation.goPage(urlCategoria,hashCategoria);
	} );
	
	scrollCategorias = new iScroll("wrapper");
	fillCategorias();
} );

$(document).on('onUnloadPage', '#'+hashCategorias, function() {
	$(document).off(appEvent, '.btnToCategoria');
	$(document).off(appEvent, '#btntoCategorias');
	$(document).off(appEvent, '.producto');
	
	scrollCategorias.destroy();
	scrollCategorias = null;
} );

function fillCategorias(){
    var categorias = JSON.parse(window.sessionStorage.getItem(storageCategorias));
    var html = "";
    for(var i=0; i<categorias.length; i++){
    	
    	html+='<div class="producto" id="cat'+categorias[i].idCategoria+'">';
    		html+='<div id="categoria">';
    			html+='<span id="txtCategoria">' + categorias[i].nombre + '</span>';
			html+='</div>';
			html+='<a href="#" class="btnToCategoria" id="btnCat'+categorias[i].idCategoria+'">';
				var urlImageCategoria = "/images/crash.jpg";
				for(var j=0; j<arrayImagenes.length; j++){
					if(arrayImagenes[j].key==("categoria"+categorias[i].idCategoria)){
						urlImageCategoria = arrayImagenes[j].location;
						break;
					}
				}
				html+='<img src="' + urlImageCategoria + '" width="768" height="200">';
			html+='</a>';
		html+='</div>';
		
    }
    $("#contenedorCategorias").append(html);
    
    console.log(html);
    
    scrollCategorias.refresh();
    util.closeLoading();
}


