/**
 * @class Clase de utilidades varias
 */


var util; //Instancia de la clase

Util = /**
 * @returns {Util}
 */
function(){

	/**
	 * Función para anteponer un numero cero si el numero pasado es de un solo digito
	 * @param i 	-Caracter al que se le antepone un cero (un número de una sola cifra)
	 * @returns 	-el parametro concatenado con 0
	 */
	this.prependZero = function(i){
		if (i<10){ i="0" + i; }
		return i;
	};
	
	/**
	 * Funcion para obtener una hora a partir de un objeto fecha en formato hh:mm:ss
	 * @param date_		-Objeto tipo fecha completo
	 * @returns		 	-Cadena con horas, minutos y segundos
	 */
	this.getSimpleTime = function(date_){
		var h=util.prependZero(date_.getHours());
		var m=util.prependZero(date_.getMinutes());
		var s=util.prependZero(date_.getSeconds());
		return h+":"+m+":"+s;
	};
	
	/**
	 * Funcion para obtener la diferencia entre 2 dias
	 * @param d1		-String que representa la Primera fecha con formato yyyy-mm-dd  
	 * @param d1		-String que representa la Segunda fecha con formato yyyy-mm-dd
	 * @returns		 	-Diferencia entre la fecha 2 y la fecha 1 representada en dias
	 */
	this.betweenDays = function(d1, d2){
		var mdy = d1.split('-');
	    date1 = new Date(mdy[0], mdy[1]-1, mdy[2]);
	    
	    mdy = d2.split('-');
		var date2 = new Date(mdy[0], mdy[1]-1, mdy[2]);
		
	    return (date2-date1)/(1000*60*60*24);
	};
	
	//Crea una fecha actual con formato yyyy-mm-dd
	this.sysDate = function(){
		var date_ = new Date();
		var d=util.prependZero(date_.getDate());
		var m=util.prependZero(date_.getMonth()+1);
		var a=util.prependZero(date_.getFullYear());
		return a+"-"+m+"-"+d;
	};
	
	/**
	 * Función que despliega o muestra un dialogo "Cargando datos", con el propósito de bloquear la pantalla 
	 * para no permitir interacción del usuario con la aplicación mientras se espera por el resultado de alguna operación.
	 */
	this.showLoading = function(){
		$("body").trigger("click");
		var html = "";
		html ="<div class='blackPage loadingPage'>";
			html+="<div class='loadingGif'>";
				html+='<br><img align="middle" id="spin" alt="loading" src="img/loading.gif">';
			html+='</div>';
		html+='</div>';
		$("body").append(html);
	};

	/**
	 * Función para quitar cualquier elemento con id '.loadingPage' existente en el html, es decir, cerrar o quitar
	 * la pantalla de "Cargando datos"
	 */
	this.closeLoading = function(){
		$(".loadingPage").first().remove();
	};
	
	/**
	 * Función para mostrar un dialogo  para simular un alert
	 * @param txtAlert 		-Mensaje que indica el propósito del dialog
	 * @param callback		-Función que se ejecuta al hacer clic en boton aceptar, puede ser vacío (se ejecuta callback por defecto)
	 */
	this.showAlert = function(txtAlert, callback){
		var html = "";
		html ="<div id='pageAlert' class='blackPage alertaPage ventEmergente'>";
			html+="<div class='msgAlert' id='msgBox'>";
				html+="<p>"+txtAlert+"</p>";
				html+="<a href='#' class='btnRojo aceptarAlert'>Aceptar</a>";
			html+='</div>';
		html+='</div>';
		$("body").append(html);
		window.setTimeout(function(){
			$("#msgBox").show("fade", 1000);
		}, 500);
		if(callback===undefined || callback==null){
			callback = function(evt) {
				$(this).parent().parent().remove();
				evt.stopPropagation();
				evt.preventDefault();
			};
		}
		zIndex = $('.alertaPage').css("zIndex");
		$('.alertaPage').each(function(){
			$(this).css("zIndex",--zIndex);
		});
		//MAC NO CAMBIAR CLICK
		$(".aceptarAlert:last").on("click",callback);
	};

	/**
	 * Función para mostrar un dialog de con dos botones (aceptar y cancelar) para simular un confirm
  	 * @param txtAlert 		-Mensaje que indica el propósito del dialog
	 * @param callback		-Función que se ejecuta al hacer clic en boton aceptar, puede ser vacío (se ejecuta callback por defecto)
	 */
	this.showConfirm = function(txtAlert, callback){
		$('.alertaPage').remove();
		var html = "";
		html ="<div id='pageAlert' class='blackPage alertaPage ventEmergente'>";
			html+="<div class='msgAlert' id='msgBox'>";
				html+="<p>"+txtAlert+"</p>";
				html+="<a href='#' id='aceptarAlert' class='btnRojo'>Aceptar</a>  ";
				html+="<a href='#' id='cancelarAlert' class='btnRojo'>Cancelar</a>";
			html+='</div>';
		html+='</div>';
		$("body").append(html);
		window.setTimeout(function(){
				$("#msgBox").show("fade", 1000);
		}, 500);
		
		var callbackCancel = function(evt) {
			$('.alertaPage').remove();
			evt.stopPropagation();
			evt.preventDefault();
		};
		
		var callbackAccept;
		if(callback==null){
			callbackAccept = callbackCancel;
		}else{
			callbackAccept = function(evt){
				callbackCancel(evt);
				callback();
			};
		}
		$("#aceptarAlert").on("click",callbackAccept);
		$("#cancelarAlert").on("click",callbackCancel);
	};

	/**
	 * Función para extraer espacios al principio y al final de un texto
	 * @returns 	-string sin espacios
	 */
	this.trim = function(str){
		if(str===undefined || str==null){
			return "";
		}
		return str.replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g,"");
	};
	
	/**
	 * Funcion para comprobar si la cadena ingresada cumple con el formato (expresión regular) 
	 * de correo, estandar RFC822 
	 * @param mail	-Cadena con la dirección de correo electrónico
	 * @returns		-true si la dirección está bien formada, false en caso contrario
	 */
	this.validar_email = function(mail){
	        var filter = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
	        // utilizamos test para comprobar si el parametro valor cumple la regla
	        if(filter.test(mail))
	            return true;
	        else
	            return false;
	};
	
	/**
	 * Funcion para comprobar si un texto es alfanumerico 
	 * @param text	-Texto a evaluar
	 * @returns		-true si el texto es alfanumerico, false en caso contrario
	 */
	this.isAlfanumeric = function(text){
		if(text==null || text.length==0){
			return true;
		}
        var filter = /^[0-9A-Za-zÃ¡Ã©Ã­Ã³ÃºÃ�Ã‰Ã�Ã“ÃšÃ±Ã‘Ã¼Ãœ\-\.\s]+$/i;
        if(filter.test(text)){
            return true;
        }
        else{
            return false;
        }
	};
	
	/**
	 * Funcion para comprobar si un texto es alfabetico 
	 * @param text	-Texto a evaluar
	 * @returns		-true si el texto es alfabetico, false en caso contrario
	 */
	this.isAlfabetic = function(text){
		if(text==null || text.length==0){
			return true;
		}		
        var filter = /^[a-zA-ZÃ¡Ã©Ã­Ã³ÃºÃ�Ã‰Ã�Ã“ÃšÃ±Ã‘Ã¼Ãœ\-\.\s]*$/; //
        if(filter.test(text)){
            return true;
        }
        else{
            return false;
        }
	};
	
	/**
	 * Funcion para comprobar si un texto es numerico 
	 * @param text	-Texto a evaluar
	 * @returns		-true si el texto es numerico, false en caso contrario
	 */
	this.isNumeric = function(text){
		if(text==null || text.length==0){
			return true;
		}
        var filter = /^[0-9]+$/;
        if(filter.test(text)){
            return true;
        }
        else{
            return false;
        }
	};
	
	/**
	 * Funcion que muestra o despliega un tooltip de acuerdo a la posición del elemento html (por id) 
	 * que se le pase como parámetro.
	 * @param element	-Elemento (input) al que se le desplegara el tooltip
	 * @param msg		-Cadena con el mensaje que se mostrará en el tooltip
	 */
	this.showTooltip = function(elemento, msg){
		util.quitTooltip(elemento.substr(1));
		var idTip = elemento.substr(1) + "Tip";
		var offSet = $(elemento).offset();
		
		offSet.left = ( offSet.left  + $(elemento).width()) + (parseInt($(elemento).css("paddingLeft"))*2) + 20;
		offSet.top = ( offSet.top - 2);
		
		var html="<div id=" + idTip +" class='tooltip'>"+msg;
		//Esta linea es especifica para el tooltip en el login, cuando el usuario o password es invalido
		//ya que el tooltipo va flotando en medio de los 2 elementos.
		if(msg==msgLoginInvalido){
			offSet.top += 5;
			html += "<img src='img/pico.png' style='left:" + (-14) + "px;top:" + 27 + "px;'>";
		}else{
			html += "<img src='img/pico.png' style='left:" + (-14) + "px;top:" + 16 + "px;'>";
		}
		html+="</div>";
		$("body").append(html);
		if(offSet.left>640){
			offSet.left  = offSet.left - (offSet.left-640);
		}
		$("#"+idTip).css("left",offSet.left);
		$("#"+idTip).css("top",offSet.top);		
	};
	
	/**
	 * Funcion que quita o elimina todos los tooltips desplegados en el mometno
	 */
	this.quitTooltips = function(){
		$('.tooltip').remove();
	};
	
	/**
	 * Funcion que quita o elimina un tooltip de acuerdo al elemento html (por id) 
	 * que se le pase como parámetro.
	 * @param element	-Elemento (input) al que se le quitará el tooltip
	 */
	this.quitTooltip = function(element){
		$('#'+element+"Tip").remove();
	};
		
	/**
	 * Función que permite presentar un numero en formato: (.) como separador de miles y (') como separador de millones: 0'000.000
	 * @param: numero		-Numero al cual se le requere aplicar el formato.
	 * @param: signo		-Caracter que precede al numero, por ejemplo '$'.
	 */
	this.formatoMoneda = function(numero,signo){
		var number = new String(numero);
		var result = '';
		var suiche = true; 
		var separador;
		while( number.length > 3 )
		{
			if(suiche){
				separador='.';
				suiche = false;
			}
			else{
				separador='\'';
				suiche = true;
			}
			result = separador + number.substr(number.length - 3) + result;
			number = number.substring(0, number.length - 3);
		}
		if(signo){
			result = signo+number+result;
		}
		else{
			result = number+result;
		}
		return result;
	};
	
	/**
	 * Función para generar un numero aleatorio de la cantidad de cifras determinada
	 * @param: cantidadCifras	-Cantidad de cifras del numero aleatorio.
	 */
	this.generarAleatorio = function(cantidadCifras){
		var numero="";
		var cifra=[];
		for(var a=0;a<cantidadCifras;a++){
			cifra[a]=parseInt(Math.random()*10);
		};
		for(var a=0;a<cantidadCifras;a++){
			numero+=cifra[a];
		}
		return numero;
	};
	
	this.checkdate = function(m, d, y) {
	    // Returns true(1) if it is a valid date in gregorian calendar  
	    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
	};
	
	this.getUltimoDiaMes = function(mes,ano){ 
		   var ultimo_dia=28; 
		   while (util.checkdate(mes+1,ultimo_dia + 1,ano)){ 
		      ultimo_dia++; 
		   } 
		   return ultimo_dia; 
	};
	
	this.formatNumerToMiles = function(number){
		var result = '';
		while( number.length > 3 ){
		 result = '.' + number.substr(number.length - 3) + result;
		 number = number.substring(0, number.length - 3);
		}
		result = number + result;
		return result;
	};
	
	this.stringToDate = function(strFecha){
		var fecha = new Date(parseInt((strFecha).substr(0,4),10),parseInt((strFecha).substr(5,2)-1,10),parseInt((strFecha).substr(8),10),0,0,0,0);
		return fecha;
	};
	
	this.dateToString = function(fecha){
		var strFecha = "" + fecha.getFullYear() + "-" + util.prependZero( (parseInt(fecha.getMonth(),10)+1) ) + "-" + util.prependZero( fecha.getDate() );
		return strFecha;
	};
	
	this.capitalizarPalabra = function(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	
	this.decodeMessage = function(jqXHR, textStatus, metodoInvocado){		
		var msg = "";
		if(jqXHR!==undefined && jqXHR!=null && !jqXHR.responseText!==undefined && jqXHR.responseText!=null && jqXHR.responseText!=""){
			msg = jqXHR.responseText;
			try{
				msg = (JSON.parse(msg)).message;
			}catch(e){
				if(jqXHR.status=="404"){
					msg = undefined;
				}else{
					msg = jqXHR.responseText;
				}
			}
			if(msg!==undefined){
				msg = msgErrorGenerico.replace("%",sistema + ". <br>Error: " + "S-" + mediacion);
			}else{
				msg = msgErrorGenerico;
			}
		}else if(textStatus!=null){
			if(textStatus.indexOf("timeout")!=-1){
				msg = msgErrorGenerico.replace("%",sistema + ". <br>Error: " + "T-" + mediacion);
			}else{
				msg = msgErrorGenerico;
			}
		}
		util.closeLoading();
		return msg;
	};
	
	this.formatDate = function(strDate){
		return strDate.substr(8,2) + "/" + strDate.substr(5,2) + "/" + strDate.substr(0,4); 
	};
	
	/**
	 * Funcion para setear el placeHolder en los campos tipo date, ya que por defecto en el explorador
	 * muestran day/month/year y en el IPAD no muestra el placeHolder 
	 */
	this.placeDateHolder = function(){
		$("input[type=date]").each(function(){
			var idPlaceholderDate = $(this).prop("id") + "Placeholder";
			var textDate = $(this).val();
			$("#"+idPlaceholderDate).remove();
			
			if(textDate!=null && textDate.length>0){
				return;
			}
			
			var placeholderString = $(this).attr("placeholder");
			var ancho = $(this).width()-50;
			var offSet = $(this).offset();
			var padding = $(this).css("paddingLeft");
			
			var html = '<span id="' + idPlaceholderDate + '" class="datePlaceholder">' + placeholderString + '</span>';
			$("body").append(html);
			
			$("#"+idPlaceholderDate).css("left",offSet.left + parseInt(padding,10));
			$("#"+idPlaceholderDate).css("top",offSet.top + 10 + "px");
			$("#"+idPlaceholderDate).width(ancho);
			
		});	
	};
};

util = new Util();


/**
 * Función para realizar precarga de imágenes, inicialmente empleada en nivel de protección, se invoca así:
 * jQuery.preLoadImages("pathToImage/image.png","pathToImage/image2.png", ... );
 */
(function($) {
	  var cache = [];
	  $.preLoadImages = function() {
	    var args_len = arguments.length;
	    for (var i = args_len; i--;) {
	      var cacheImage = document.createElement('img');
	      cacheImage.src = arguments[i];
		  cache.push(cacheImage);
	    }
	  };
})(jQuery);

/*
 * Evento para quitar el placeholder del date y darle foco al campo date
 */
$(document).on('click','.datePlaceholder', function(){
	var id=$(this).prop("id");
	id = id.substr(0,(id.length-11));
	$("#"+id).trigger("focus");
	$(this).remove();
});

/*
 * Evento para poner el placeholder al date en el caso donde la fecha es vacia
 */
$(document).on('blur change',"input[type=date]", function(evt){
	placeDateHolder();
});

function llenarComboDesplegable(idSelect, data){
	var opciones = '<option value="-1">Seleccione plan</option>';
	if(!(data===undefined || data==null || data.length==0)){		
		for(var i=0;i<data.length;i++){
			opciones+='<option value="'+data[i].codigo+'">'+data[i].valor+'</option>';
		}
	}
	$("#"+idSelect).html(opciones);
}