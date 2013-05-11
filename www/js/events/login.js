$(document).on('onLoadPage', '#'+hashLogin, function() {
	$("#txt_login").val("");
	$("#txt_password").val("");
               
    $(document).on(appEvent, '#btnLogin', function(evt) {
        //util.quitTooltips();
        var oAuth = liquid.helper.oauth;
                   
        if (oAuth.isAuthorized()) {
            navigation.goPage(urlCategorias,hashCategorias);
            return;
        }
                   
        liquid.helper.oauth.authorize(doLogin);
        evt.preventDefault();
    });
});

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
		
	return isValido;
}


function doLogin(uriLocation){
//	util.showLoading();
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
//		navigation.goPage(urlCategorias,hashCategorias);
//        //showCustomSpinner();
//        //util.downloadFile();
//	}else{
//		util.showTooltip("#txt_login",msgLoginInvalido);
//	}
//	
//	util.closeLoading();
//    
//    console.log("Location Changed: " + uriLocation);
	var oAuth = liquid.helper.oauth;
    
	// oAuth process is successful!
    if (oAuth.requestStatus == oAuth.status.SUCCESS) {
        var authCode = oAuth.authCode;
        
        // have the authCode, now save the refreshToken and start Page TaskList
        oAuth.saveRefreshToken({
                               auth_code: oAuth.authCode
                               }, function() {
                               //Get id resource
                               console.log("Get id resource");
                               });
        
    }
    else if (oAuth.requestStatus == oAuth.status.ERROR)
    {
    	console.log("ERROR - status received = oAuth.status.ERROR");
    }
    else {
        // do nothing, since user can be visiting different urls
    }

    
//    $.oajax({
//        url: 'http://nuevaeramedellin.appspot.com/login',
//        jso_provider: "google",
//        jso_allowia: true,
//        jso_scopes: ["https://www.googleapis.com/auth/userinfo.email"],
//        dataType: 'json',
//        success: function(data) {
//        console.log("Response (google):");
//        console.log(data);
//    }
//    });
}