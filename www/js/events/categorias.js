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
} );

$(document).on('onUnloadPage', '#'+hashCategorias, function() {
	$(document).off(appEvent, '.btnToCategoria');
	$(document).off(appEvent, '#btntoCategorias');
	$(document).off(appEvent, '.producto');
	
	scrollCategorias.destroy();
	scrollCategorias = null;
} );

