$(document).on('onLoadPage', '#'+hashCategorias, function() {
	
	$(document).on(appEvent, '.btnToCategoria', function(evt) {
		evt.preventDefault();
		navigation.goPage(urlCategoria,hashCategoria);
	} );

	$(document).on(appEvent, '#btntoCategorias', function(evt) {
		evt.preventDefault();
		navigation.goPage(urlCategorias,hashCategorias);
	} );
	
} );

$(document).on('onUnloadPage', '#'+hashCategorias, function() {
	$(document).off(appEvent, '.btnToCategoria');
	$(document).off(appEvent, '#btntoCategorias');
} );

