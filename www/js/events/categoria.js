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
        navigation.goPage(urlCategorias,hashCategorias);
    });
    
    scrollElementos = new iScroll("wrapper");
    
    scrollElementos.refresh();
    
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

function fillCategoriasNav(){
    var categorias = $.data(document, arrayCategorias, categorias);
    var html = "";
    for(var i=0; i<categorias.length; i++){
        html+='<input type="button" class="btnNavCategorias" id="btnCategoria' + categorias[i].idCategoria + '" value="' + categorias[i].nombre + '">';
    }
    $(".divReturn").append(html);
}