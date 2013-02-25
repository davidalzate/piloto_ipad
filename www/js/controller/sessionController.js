//Variable global para el control de la sesion.
var session;

//"Clase" para el control de la sesion.
SessionController = function(){
	//Bandera con un Date que determina el ultimo instante en que hubo interaccion.
	this.banderaTimer;
	//Token
	this.token=null;
	//Constante con el tiempo maximo permito de inactividad en ms
	this.consInactividad = configInactividad;
	//Valor calculado del tiempo en que se encuentra en actividad
	this.tiempoVivo;
	//numero del identificador del ultimo timeout.
	this.numHandle=0;
	
	//Metodo para marcar y evaluar una interaccion. Si el tiempo de actividad se encuentra dentro del limite
	//se cancela el timeout y se lanza uno nuevo.
	this.doInteraccion = function(){	
		var actual = new Date();
		if(session.token==null || session.tiempoVivo>session.consInactividad)
			session.banderaTimer = actual;
		session.tiempoVivo = actual - session.banderaTimer;
		if( session.token!=null && (session.tiempoVivo < session.consInactividad) ){
			window.clearTimeout(session.numHandle);
			session.banderaTimer = actual;
			session.numHandle=window.setTimeout(session.kick,session.consInactividad);
		} 
	};
	
	//Método que dispara un evento de finalizar sesion (eliminar token, redirigir al inicio)
	//ademas evalua y cierra alerts y confirm presentes.
	this.kick = function(){
		if(session.token==null)
			return;
      	$("#dialog-message").dialog('close');		
		session.token=null;
		navigation.goLogin();
	};
	
	//Funcion que manejara el evento de hacer un logout.
	this.logout = function() {
		util.showConfirm("\u00BFEst\u00E1 seguro que desea cerrar sesi\u00f3n?",true,session.kick);		
	};
};

session = new SessionController();