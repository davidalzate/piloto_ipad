$(document).on('onLoadPage', '#'+hashCategorias, function() {
    myScroll = new iScroll('categoriasDiv');
    
    $(document).on(appEvent, '.categoriaDiv', function(evt) {
        var categoria = $(this).prop("id").substr(3);
        alert("Se debe ir a la categoria: "+categoria);
    });
               
    $(document).on(appEvent, '#bannerDiv', function(evt) {
        console.log("Banner");
        alert("Se debe ir a la info del banner");
    });
               
    $(document).on(appEvent, '#btnRevisarPedido', function(evt) {
        alert("Se debe ir a revisar pedido");
    });
               
    $(document).on(appEvent, '#btnToRestaurante', function(evt) {
        alert("Se debe retornar al restaurante");
    });           
               
    //Consumo del servicio de categorias
    try{
        $.ajax({
            type: "GET",
            url: urlObtenerCategorias+"?idRestaurante=1"
        }).done(fillCategorias)
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert( "fail " + errorThrown );
              console.log(JSON.stringify(jqXHR));
        });
    }catch(e){
        alert( "Exception " + e);       
    }
});

$(document).on('onUnloadPage', '#'+hashCategorias, function() {
    $(document).off(appEvent, '.categoriaDiv');
    $(document).off(appEvent, '#bannerDiv');
    $(document).off(appEvent, '#btnRevisarPedido');
    $(document).off(appEvent, '#btnToRestaurante');
});


function fillCategorias(categorias){
    var html = "";
    for(var i=0; i<categorias.length; i++){
        html+='<div class="categoriaDiv" id="cat'+categorias[i].idCategoria+'">';
            html+='<p>idCategoria: '+categorias[i].idCategoria+'</p>';
            html+='<p>nombre: '+categorias[i].nombre+'</p>';
            html+='<p>foto: '+categorias[i].foto+'</p>';
        html+='</div>';
    }
    $("#categoriasContent").append(html);
    myScroll.refresh();
}


