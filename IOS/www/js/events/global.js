$(document).on(appEvent, '#lnkBanner', function(evt) {
	evt.preventDefault();
	navigation.goPage(urlPauta,hashPauta);
} );

$(document).on(appEvent, '#btnCerrarPauta', function(evt) {
	evt.preventDefault();
	navigation.goPage(urlCategorias,hashCategorias);
} );

$(document).on(appEvent, '#btnEnviarPauta', function(evt) {
	evt.preventDefault();
	navigation.goPage(urlCategorias,hashCategorias);
} );