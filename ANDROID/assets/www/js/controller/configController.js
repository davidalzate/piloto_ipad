/***************************************************** PARAMETROS DE CONFIGURACION *********************************************************************/
var platPC = "PC";
var platIOS = "IOS";
var plataforma = platPC;
var TOUCHEEVENT = "touchend";
var CLICKEVENT = "click";
var appEvent = CLICKEVENT;

/************************************************ URLS SERVICIOS ***************************************************/
//Si quieres ver todos los restaurantes en la BD:
var urlObtenerRestaurantes = "http://nuevaeramedellin.appspot.com/nuevaera/identityresource";

//Si quieres identificar un restaurante y obtener la información base (le pasas el parámetro id //?id=1):
var urlObtenerRestaurante = "http://nuevaeramedellin.appspot.com/nuevaera/identityresource?id=";

//Identificar resource
var urlObtenerResource = 'http://nuevaeramedellin.appspot.com/nuevaera/userresource';

//Si quires ver las categorías asociadas a un restaurante (le pasas el parámetro idRestaurante //?idRestaurante=1):
var urlObtenerCategorias = "http://nuevaeramedellin.appspot.com/nuevaera/categoryresource?idRestaurante=";

//Obtener las pautas asociada al restaurante
var urlObtenerPautas = "http://nuevaeramedellin.appspot.com/nuevaera/adresource?idRestaurante=";

//Si quieres ver todos los elementos dentro de una categoría (le pasas el parámetro idCategoria //?idCategoria=1001):
var urlObtenerElementosxCategoria = "http://nuevaeramedellin.appspot.com/nuevaera/elementresource?idCategoria=";

/*********************************************** OBJETOS LOCALSTORAGE ********************************************/
var storageCategorias = "categorias";
var storageCuentaResource = "resource";
var storageInfoRestaurante = "restaurante";
var storageElementos = "elementosCat";
var storagePautas= "pautas";
var storageImagesLocatoin = "imagenes";
var storageLastRestaunte = "ultimoRestaurante";
var storageImagenesTotales = "todasLasImagenes";

/************************************************ OBJETOS EN CACHE $.data() *****************************************/
var arrayCategorias = "arrayCategorias";
var categoriaSeleccionada = "categoriaSeleccionada";
var arrayElementosCategoria = "arrayElementosCategoria";


/*********************************************** CONSTANTES APLICACION **************************************************/
var configInactividad = 360000; //Tiempo máximo que se le permite al usuario estar sin interactuar con la aplicación (en milisegundos)

//Para definir la dirección de la navegación en la transición de páginas
var backward = 'backward';
var forward = 'forward';

var nombreCarpetaImagenes = "imagesNE";

var TIMEOUTMS = 20000;

/************************************************* URLS Y HASHS PAGINAS *************************************************/
var urlLogin = "html/login.html";
var hashLogin = "loginPage";

var urlCategorias = "html/categorias.html";
var hashCategorias = "categoriasPage";

var urlCategoria = "html/categoria.html";
var hashCategoria = "categoriaPage";

var urlElemento = "html/elemento.html";
var hashElemento = "elementoPage";

var urlPauta = "html/pauta.html";
var hashPauta = "pautaPage";

/******************************************* MENSAJES DE ERROR Y ADVERTENCIAS *****************************************/
var msgSeleccioneCompartir = "Debe seleccionar una opci\u00F3n";
var msgNoPassword = "Ingrese la contrase\u00F1a.";
var msgNoUser = "Ingrese el nombre de usuario.";
var msgLoginInvalido = "El nombre de usuario y/o contrase\u00F1a son incorrectos";
var msgCorreoInvalido = "El formato de email es inv\u00E1lido";
var msgNetworkError = "Existen problemas con la comunicaci\u00F3n.";
var msgBatteryCritical = "La bater\u00EDa se encuentra en estado cr\u00EDtico. Guarde para evitar p\u00E9rdidas y cargue lo mas pronto posible.";
var msgBatteryLow = "La bater\u00EDa se encuentra en estado bajo. Guarde para evitar p\u00E9rdidas y cargue lo mas pronto posible.";
var msgOffline = "Se ha detectado que no tiene conexi\u00F3n a internet. Verifique su conexi\u00F3n.";
var msgTxtNoPermitido = "Existen caracteres no permitidos.";
var msgTxtNoNumerico = "Solo se permite caracteres num\u00E9ricos";
var msgTxtNegativo = "No se permite valores negativos.";
var msgTxtNoPeriodicidad = "Seleccione una periodicidad de pago";
var msgTxtNoCumpleFormato = "No es un n\u00FAmero de celular v\u00E1lido";
var msgDateBigger = "La fecha no puede ser igual/mayor a la fecha del d\u00EDa";
var msgNoOpcion="Debe seleccionar una opci\u00F3n.";
var msgTimeout = "Se super\u00F3 el tiempo de espera para obtener respuesta del servicio.";
var msgNoLongCel = "El n\u00FAmero de celular debe ser de 10 d\u00EDgitos";