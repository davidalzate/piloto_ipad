$(document).on('onLoadPage', '#'+hashLogin, function() {
	$("#txt_login").val("");
	$("#txt_password").val("");
	$.data(document, banderaBtnRegresar, true);  ; //En esta pagina no se debe mostrar el bot�n Regresar
} );

$(document).on('blur', '#txt_login', function() {
	//Si el usario esta vacio no hace nada.
	var user = util.trim($("#txt_login").val());
	if(user.length==0){
		util.closeLoading();
		return;
	}
	$("#listAlmacenes").html('<option value="-1">Seleccione almacen</option>');
    util.showLoading();
    window.setTimeout(function(){
        remote.getIdAsesor(user,function(docUser){
            //Compruebo que el usuario actual sea igual al ultimo usuario que se logeo
            //con el fin de usar el mismo listado de almacenes.
            var lastUserDoc = window.localStorage.getItem(storageAsesorAlmacenes);
            if(docUser!=lastUserDoc){
                //Va directamente a remoto
                facade.getAlmacenes(docUser,"listAlmacenes","almac&eacute;n", true);
            }else{
                //Por defecto va local
                facade.getAlmacenes(docUser, "listAlmacenes","almac&eacute;n");
            }
        },true);
    },100);
	util.closeLoading();
});

$(document).on('keypress', '#txt_password', function(evt){
    if($(".loadingPage").length>0){
        console.log("retorning false");
        return false;       
    }
});


$(document).on('input', '#txt_login', function() {
	var user = util.trim($("#txt_login").val());
	if(user.length==0){
		$("#listAlmacenes").html('<option value="-1">Seleccione almacen</option>');
	}
});

function validateLogin(){
	var isValido = true;
	
	//Intentos fallidos 5
	
	//Usuario vacia
	var login_ = util.trim($("#txt_login").val());
	if(login_ == null || login_ == ""){
		isValido = false;
		util.putError("txt_login");
	}
	
	//Clave vacia
	var pass_ = util.trim($("#txt_password").val());
	if(pass_ == null || pass_ == ""){
		isValido = false;
		util.putError("txt_password");
	}
	
	//Clave excede 30 caracteres
	if(pass_.length > 30){
		util.putError("txt_password");
		util.showTooltip("#txt_password",msgPasswordLength);
		isValido = false;
	}
	
	//No ha seleccionado almacen
	//Como el select de almacenes usa un plugin, el cual cambia el display, lo seteo a block
	//para poder obtener la posicion correcta y despues de mostrar el tooltip lo regreso a none
	if($("#listAlmacenes").val()==null || $("#listAlmacenes").val()=="-1"){
		util.showTooltip("#listAlmacenes",msgNoAlmacen);
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
	var ip_ = "190.248.133.46";
	
	//Validar a servidor
	try{
        $.ajax( {        	
        	type: 'POST',
            url: urlServiceLogin,
            dataType: 'json',
            timeout: 10000,
            data: "{'login':'" + login_ + "','clave':'" + pass_ + "','ip':'" + ip_ + "'}" } )
        .done(
            function(datos) {
            	util.closeLoading();            	
                if(datos!=null && datos.token!=null){
                	session.token = datos.token;
                	//Almacenamiento en localstorage del usuario que inicia sesion exitosamente.
                	window.localStorage.setItem("user",login_);
                	window.localStorage.setItem("almacenInformacion",JSON.stringify({nombreAlmacen:$("#listAlmacenes").find(":selected").text(),idAlmacen:$("#listAlmacenes").val()}));
                	//Servicio que obtiene la cedula del asesor a partir del usuario
                	remote.getIdAsesor(login_, function(){
                    	footer.setFooterEventsOn(); //setea los eventos y la bandera la 1ra vez
                    	navigation.goPage(urlAsesor,hashAsesor);
                    	session.doInteraccion();
                	});                	
                }
                else{
                	//Login invalido
//                	if(!(datos.message===undefined) && datos.message!=null && datos.message!=""){
//                		util.showAlert(datos.message);
//                	}
                	util.showTooltip("#txt_login",msgLoginInvalido);
                }
                return;
        }).error(
                function(jqXHR, textStatus, m) {
                	util.showAlert(util.decodeMessage(jqXHR,textStatus,SEUS, codAutenticarSEUS),true);
                    return;
        });
    }catch(exception){
    	console.log(exception);
    	util.showAlert(util.decodeMessage(null,null,SEUS, codAutenticarSEUS),true);
    }	
	
}


$(document).on('click', '#btnLogin', function(evt) {
	util.quitTooltips();
	doLogin();
	evt.preventDefault();
} );