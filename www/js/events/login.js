$(document).on('onLoadPage', '#'+hashLogin, function() {
	$("#txt_login").val("");
	$("#txt_password").val("");
} );

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
	var rta = validateLogin();
	if(!rta){
		util.closeLoading();
		return;
	}
	
	var login_ = util.trim($("#txt_login").val());
	var pass_ = util.trim($("#txt_password").val());
	
	//Validar a servidor
	
	if(login_==pass_ && pass_=="admin"){
		navigation.goPage(urlCategorias,hashCategorias);
	}else{
		util.showTooltip("#txt_login",msgLoginInvalido);
	}
	
	util.closeLoading();
}


$(document).on('click', '#btnLogin', function(evt) {
	util.quitTooltips();
	doLogin();
	evt.preventDefault();
} );