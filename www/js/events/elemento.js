$(document).on('onLoadPage', '#'+hashElemento, function() {
	
	$(document).on(appEvent, '.btnElementoToCategorias', function(evt) {
		evt.preventDefault();
		navigation.goPage(urlCategoria,hashCategoria);
	} );
	
});

$(document).on('onUnloadPage', '#'+hashElemento, function() {
	$(document).on(appEvent, '.btnElementoToCategorias');
} );