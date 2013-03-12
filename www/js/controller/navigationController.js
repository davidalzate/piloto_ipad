//Variable global para el control de la navegación.
var navigation;

//"Clase" para el control de la navegación 
navigationController = function(){
	this.hashCurrentPage;
	this.urlCurrentPage;
	this.funcionSwipeAdelante;
	this.funcionSwipeAtras;

	//Metodo cambiar página. Recibe de parametro el id de la página a mostrar.
	this.goPage = function(urlPage, hashPage, direction){
		
		//Recupero la memoria empleada por el scroll
		if(myScroll!=null){
			myScroll.destroy();
			myScroll = null;
		}

		navigation.resetSwipe();
		$.get(urlPage, function(data) {
			$("#"+navigation.hashCurrentPage).trigger('onUnloadPage');
			$('body').html(data);
			navigation.hashCurrentPage = hashPage;
			navigation.urlCurrentPage = urlPage;
			$("#"+hashPage).trigger('onLoadPage');
						
			direction = direction || "forward";
			navigation.applyAnimate(direction);			
		},'html');
	};
	
	this.reload = function(){
		navigation.goPage(this.urlCurrentPage,this.hashCurrentPage);
	};
		
	//Metodo para aplicar una animacion al mostrarse la pagina.
	this.applyAnimate = function(direction){		
		if(direction=='forward'){
			$("#"+navigation.hashCurrentPage).show( "drop", { direction: "right" }, 700, function(){
				util.placeDateHolder();
				window.scrollTo(0,0);
				});
		}else{
			$("#"+navigation.hashCurrentPage).show( "drop", { direction: "left" }, 700, function(){
				util.placeDateHolder();
				window.scrollTo(0,0);
			});
		}
	};
	
	//Metodo para redirigir la navegacion al login.
	this.goLogin = function(){
		//Mirar validaciones antes de redirigir a login
		navigation.goPage(urlLogin,hashLogin,backward);
		$("#txt_login").val("");
		$("#txt_password").val("");
	};	
	
	this.resetSwipe = function(){
		navigation.funcionSwipeAdelante = function(){};
		navigation.funcionSwipeAtras = function(){};
		navigation.funcionBtnRegresar = function(){};
	};
	
};

navigation = new navigationController();


$(document).on('swipeleft','body', function(){
	if( !$('.ventEmergente').length ){
		navigation.funcionSwipeAdelante();
	}
});

$(document).on('swiperight','body', function(){
	if( !$('.ventEmergente').length ){
		navigation.funcionSwipeAtras();
	}
});