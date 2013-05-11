//En este controlador se implementan funciones que son necesarias ejecutarlas al iniciar la aplicacion.
var cb;
$(document).ready(function(){
	navigation.goPage(urlLogin,hashLogin);
    //navigation.goPage(urlCategorias,hashCategorias);
    //document.location.href = "http://nuevaeramedellin.appspot.com/login";
    session.banderaTimer = new Date();
});

$(document).on('click','li a',function(evt){
	if($(this).attr("disabled")=="disabled"){
		return;
	}
	
	var ulFather = $(this).parent().parent().filter(":parent");
	var border = $(ulFather).css("borderRadius") || $(ulFather).css("border-top-left-radius");
	
	if($(ulFather).parent().prop("tagName").indexOf("BODY")!=-1 || $(ulFather).prop("id").indexOf("Option")!=-1){
		evt.preventDefault();
		return;	
	}

	$(ulFather).find("li a").removeClass("active");
	$(this).addClass("active");
	$(ulFather).find("li a").css("borderRadius","0px");	
	
	var firstLi = border + " 0px 0px " + border;
	var lastLi = "0px " + border + " " + border + " 0px";
		
	$(ulFather).find("li:first-child").children().css("borderRadius",firstLi);
	$(ulFather).find("li:last-child").children().css("borderRadius",lastLi);	
	
	if($("#"+hashNivelProteccionGenero).length>0){
		changeGenero($(this));
	}
	
	var idContenedorUl = ulFather.parent().prop("id"); 
	if(!(idContenedorUl===undefined) && idContenedorUl!=null){
		util.quitTooltip(idContenedorUl);
	}
	
	util.quitTooltip( $(ulFather).attr("id") );
	evt.preventDefault();
});

//Evento de asociar los metodos por los que puede hacerse interaccion 
$(document).on("click keyup","body",function(evt){
	session.doInteraccion();
});

$(document).on("focus","input[type='date']",function(evt){
    var idPlaceholderDate = $(this).prop("id") + "Placeholder";
    $("#"+idPlaceholderDate).remove();
});

$(document).on('click','.tooltip',function(){
	$(this).remove();
});

//Para longitud máxima en textarea
$(document).on('keyup','textarea',function(){
	//Respeta longitud máxima definida en el html
	if( $(this).length > $(this).attr("maxLength") ){
        $(this).val( $(this).val().substring(0, parseInt($(this).attr("maxLength"))));
    }
});

//This variable is used to keep the current accordion object. I setted in null when a page is unloaded.
var myScroll;
$(document).on('accordionchange',function(evt,ui){
	if(parseInt($("#accordion").accordion("option","active"))>=0){
		window.setTimeout(function(){myScroll.refresh();}, 500);
	}
});

$(document).on("focus keyup","input, textarea", function(){
	var idElement = $(this).prop("id");
	if(idElement===undefined || idElement==null || idElement==""){
		return;
	}	
	util.quitTooltip(idElement);
});

//var numericoAnterior="";
$(document).on("blur",".numerico",function(evt){
	var num = $(this).val();
	num = ""+parseInt(num.replace(/\D/g,""),10);
	if(num=="NaN"){
		num="";
	}
	var val = util.formatNumerToMiles(num);
	$(this).val(val);
});

//Para controlar campos numéricos
$(document).on('keyup','input[type=tel],input[type=number]',function(e){
	var valor = $(this).val();
	
	if( $(this).hasClass("porcentDecimal") && valor.indexOf(".")!=-1 ){
		var pattern= /^[0-9]{1}[0-9]{0,1}(\.[1-9]{0,1})?$/i; //Para un decimal
		if( !pattern.test(valor) ){
			$(this).val(valor.substring(0, valor.length-1 ));
		}
	}else{
		valor = ""+parseInt(valor.replace(/\D/g,""),10);
		if(valor=="NaN"){
	        valor="";
	        $(this).val("");
	    }
		//Respeta longitud máxima definida en el html en atributo maxLength
	    if(valor.length >= parseInt($(this).attr("maxLength")) ){
	    	$(this).val(valor.substring(0, parseInt($(this).attr("maxLength")) ));
	    }
	}
	e.preventDefault();
});

$(document).on('click','.selfPage',function(){
	navigation.reload();
});

//Propio para el dispositivo
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
   
//    var debug = true;
    
    /*
     * Setup and install the ChildBrowser plugin to Phongap/Cordova.
     */
    if(window.plugins.childBrowser == null) {
        ChildBrowser.install();
    }

    // Use ChildBrowser instead of redirecting the main page.
//    jso_registerRedirectHandler(window.plugins.childBrowser.showWebPage);
    
    /*
     * Register a handler on the childbrowser that detects redirects and
     * lets JSO to detect incomming OAuth responses and deal with the content.
     */
//    window.plugins.childBrowser.onLocationChange = function(url){
//        url = decodeURIComponent(url);
//        console.log("Checking location: " + url);
//        jso_checkfortoken('google', url, function() {
//                          console.log("Closing child browser, because a valid response was detected.");
//                          window.plugins.childBrowser.close();
//                          });
//    };
    
    /*
     * Configure the OAuth providers to use.
     */
//    jso_configure({
//                  "google": {
//                  client_id: "148227528928.apps.googleusercontent.com",
//                  redirect_uri: "http://localhost",
//                  authorization: " https://accounts.google.com/o/oauth2/auth",
//                  scope: "https://www.googleapis.com/auth/userinfo.email"
//                  }
//    }, {"debug": debug});
    
    // For debugging purposes you can wipe existing cached tokens...
    // jso_wipe();
    
    // jso_dump displays a list of cached tokens using console.log if debugging is enabled.
//    jso_dump();
//
//    // Perform the protected OAuth calls.
//    $.oajax({
//            url: 'http://nuevaeramedellin.appspot.com/login',
//            jso_provider: "google",
//                       jso_allowia: true,
//            dataType: 'json',
//            success: function(data) {
//                console.log("Response (google):");
//                console.log(data);
//            }
//    });

    
	console.log("Name: " + window.device.name);
    
	$(document).on('touchend',function(e){
        var targetFoco = $(e.target);
        //console.log("target en un "+targetFoco.prop("tagName")); 
        if(!(targetFoco.prop("tagName")=="INPUT" || targetFoco.prop("tagName")=="TEXTAREA" || targetFoco.prop("tagName")=="SELECT")){
            window.setTimeout(function(){
                    var inputFoco = $(document.activeElement);
                    //console.log("tocuhend active is a: "+inputFoco.prop("tagName"));
                    if(inputFoco!==undefined && inputFoco!=null && inputFoco!="" && inputFoco.length!=0){
                        if((inputFoco.prop("tagName")=="INPUT" || inputFoco.prop("tagName")=="TEXTAREA" || inputFoco.prop("tagName")=="SELECT")){
                            inputFoco.trigger("blur");
                        }
                    }
                    window.scrollTo(0,0);
            },100);	        
        }
    });

	$(document).on('touchmove',function(e){
        var inputFoco = $(document.activeElement);
        if(inputFoco!==undefined && inputFoco!=null && inputFoco!="" && inputFoco.length!=0){
            if(!(inputFoco.prop("tagName")=="INPUT" || inputFoco.prop("tagName")=="TEXTAREA" || inputFoco.prop("tagName")=="SELECT")){
                window.scrollTo(0,0);
            }
        }
        e.preventDefault();
    });

	$(document).on('blur','input[type=password],input[type=text],input[type=textarea],input[type=email],input[type=tel],input[type=email],input[type=number],select,textarea',function(e){
        window.setTimeout(function(){
            var inputFoco = $(document.activeElement);
            //console.log("Blur ... active is a: "+inputFoco.prop("tagName"));
            if(inputFoco!==undefined && inputFoco!=null && inputFoco!="" && inputFoco.length!=0){
                if(!(inputFoco.prop("tagName")=="INPUT" || inputFoco.prop("tagName")=="TEXTAREA" || inputFoco.prop("tagName")=="SELECT")){
                    window.scrollTo(0,0);
                }
            }
        },100);	
	});
	
    $(document).on("keyup","input[type='date']",function(evt){
        $(this).val("");
    });
    
	dispositivo = new DeviceController();
	
	window.addEventListener("batterystatus", function(status){
												dispositivo.battery = status.level;
												dispositivo.connected = status.isPlugged;
											}, false);
	
	
	window.addEventListener("batterycritical", function(status){
												if(!status.isPlugged)
													util.showAlert(msgBatteryCritical,true);
											}, false);
	
	window.addEventListener("batterylow", function(status){
												if(!status.isPlugged)
													util.showAlert(msgBatteryLow,true);
											}, false);
	
	document.addEventListener("resume", function(){
											session.doInteraccion();
										}, false);
	
	document.addEventListener("pause", function(){
												//session.kick();
										}, false);
	
	window.addEventListener("offline", function(){
											util.showAlert(msgOffline,true);
										}, false);
	
	
	//Para android
	document.addEventListener("backbutton", function(){
		return false;
	}, false);
	
	
	//dispositivo.beep();
	//dispositivo.vibrate(1000);
	
	var info = dispositivo.uuid + " " + dispositivo.platform + " " + dispositivo.version + " " + dispositivo.name + " Cordova: " + dispositivo.cordova;
	//util.showAlert(info,true);
    
    if((dispositivo.platform).indexOf("iPad")!=-1){
        plataforma = platIOS;
        appEvent = TOUCHEEVENT;
    }

}
$.event.special.swipe.horizontalDistanceThreshold="180";