$(document).on('onLoadPage', '#'+hashLogin, function() {
	$("#txt_login").val("");
	$("#txt_password").val("");
	
	 var oAuth = liquid.helper.oauth;
     if (oAuth.isAuthorized()) {
    	 console.log("Esta autorizado, cambiando ingresar por continuar");
    	 $("#btnLogin").text("Continuar");
     }else{
    	 $("#btnLogin").text("Ingresar");
     }
	
	$(document).on(appEvent, '#btnLogin', function(evt) {
		util.quitTooltips();
		//doLogin();
		
        var oAuth = liquid.helper.oauth;
        if (oAuth.isAuthorized()) {
        	console.log("Evento del boton, ya esta autorizado. Proceder carga inicial.");
        	getResource();
            navigation.goPage(urlCategorias,hashCategorias);
        }else{
        	console.log("Evento del boton, aun no esta autorizado. Proceder hacer login.");
        	liquid.helper.oauth.authorize(doLogin);
        }

		evt.preventDefault();
	} );
	
} );

$(document).on('onUnloadPage', '#'+hashLogin, function() {
    $(document).off(appEvent, '#btnLogin');
});

function validateLogin(){
	var isValido = true
	
	//Usuario vacio
	var login_ = util.trim($("#txt_login").val());
	if(login_ == null || login_ == ""){
		isValido = false;
	}
	
	//Clave vacia
	var pass_ = util.trim($("#txt_password").val());
	if(pass_ == null || pass_ == ""){
		isValido = false;
	}
	
	//Clave excede 30 caracteres
	if(pass_.length > 30){
		util.putError("txt_password");
		util.showTooltip("#txt_password",msgPasswordLength);
		isValido = false;
	}
		
	return isValido;
}


function doLogin(){
	util.showLoading();
//	var rta = validateLogin();
//	if(!rta){
//		util.closeLoading();
//		return;
//	}
//	
//	var login_ = util.trim($("#txt_login").val());
//	var pass_ = util.trim($("#txt_password").val());
//	
//	//Validar a servidor
//	
//	if(login_==pass_ && pass_=="admin"){
//		//Hacer carga inicial
//		navigation.goPage(urlCategorias,hashCategorias);
//	}else{
//		util.showTooltip("#txt_login",msgLoginInvalido);
//	}
	
	var oAuth = liquid.helper.oauth;
    
	// oAuth process is successful!
    if (oAuth.requestStatus == oAuth.status.SUCCESS) {
        var authCode = oAuth.authCode;
        
        console.log("El login fue exitoso.");
        
        // have the authCode, now save the refreshToken and start Page TaskList
        oAuth.saveRefreshToken({
           auth_code: oAuth.authCode
           }, function() {
               //Get id resource
               console.log("Se cambia el texto del boton a continuar");
               $("#btnLogin").text("Continuar");
       	});
    }else if (oAuth.requestStatus == oAuth.status.ERROR){
    	console.log("Error en login");
    	//console.log("ERROR - status received = oAuth.status.ERROR");
    }else {
        // do nothing, since user can be visiting different urls
    }
	util.closeLoading();
}