$(document).on('onLoadPage', '#'+hashCategoria, function() {
        var catSeleccionada = $.data(document, categoriaSeleccionada);
        if(catSeleccionada===undefined || catSeleccionada==null || catSeleccionada==""){
            navigation.goPage(urlCategorias,hashCategorias);
        }
               
        fillCategoriasNav();
               
        myScroll = new iScroll('categoriasDiv');
               
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
               
        //Consumo del servicio de elementos de la categoria
        loadServiceElementosxCategoria(catSeleccionada);
});

$(document).on('onUnloadPage', '#'+hashCategoria, function() {
    $(document).off(appEvent, '.categoriaDiv');
    $(document).off(appEvent, '.btnNavCategorias');
    $(document).off(appEvent, '#bannerDiv');
    $(document).off(appEvent, '#btnRevisarPedido');
    $(document).off(appEvent, '#btnToCategorias');
});

function fillCategoriasNav(){
    var categorias = $.data(document, arrayCategorias, categorias);
    var html = "";
    for(var i=0; i<categorias.length; i++){
        html+='<input type="button" class="btnNavCategorias" id="btnCategoria' + categorias[i].idCategoria + '" value="' + categorias[i].nombre + '">';
    }
    $(".divReturn").append(html);
}

function loadServiceElementosxCategoria(catSeleccionada){
    try{
        util.showLoading();
        $.ajax({
               type: "GET",
               url: urlObtenerElementosxCategoria+"?idCategoria="+catSeleccionada
        }).done(fillDetalleCategoria)
        .fail(function(jqXHR, textStatus, errorThrown) {
              $.removeData(document, arrayElementosCategoria+catSeleccionada);
              util.closeLoading();
              alert( "fail " + errorThrown );
              console.log(JSON.stringify(jqXHR));
              });
    }catch(e){
        $.removeData(document, arrayElementosCategoria+catSeleccionada);
        util.closeLoading();
        alert( "Exception " + e);
    }
}

function fillDetalleCategoria(elementos){
    $("#categoriasContent").html("");
    var catSeleccionada = $.data(document, categoriaSeleccionada);
    $.data(document, arrayElementosCategoria+catSeleccionada, elementos);
    var html = "";
    for(var i=0; i<elementos.length; i++){
        html+='<div class="categoriaDiv" id="ele'+elementos[i].idElemento+'">';
        html+='<p>idElemento: '+elementos[i].idElemento+'</p>';
        html+='<p>nombre: '+elementos[i].nombre+'</p>';
        html+='<p>idCategoria: '+elementos[i].idCategoria+'</p>';
        html+='<p>descripcionLarga: '+elementos[i].descripcionLarga+'</p>';
        html+='<p>fotoSmall: '+elementos[i].fotoSmall+'</p>';
        html+='<p>precio: '+elementos[i].precio+'</p>';
        html+='<p>disponible: '+elementos[i].disponible+'</p>';
        html+='</div>';
    }
    $("#categoriasContent").append(html);
    myScroll.refresh();
    util.closeLoading();
}


