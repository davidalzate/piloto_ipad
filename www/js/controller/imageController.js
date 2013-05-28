var beanImage = function(identificador, url, ubicacion){
	this.key = identificador;
	this.internetURL = url;
	this.location;
	
	if(ubicacion!=null){
		this.location= ubicacion;
	}else{
		this.location= "/images/crash.jpg";
	}
		
};

function downloadImage(objImageToDownload, intentos){
	if(intentos>0){
		console.log("Downloading: "+objImageToDownload.internetURL);
		var url = objImageToDownload.internetURL;
		var extension = (objImageToDownload.internetURL).substr((objImageToDownload.internetURL).lastIndexOf(".")+1);
		//var extension = "jpg";
        var fileTransfer = new FileTransfer();
            fileTransfer.download(
            	url,
            	rutaCarpetaImages + objImageToDownload.key + "." + extension,
                function(imageLocation) {
                    console.log("download complete: " + imageLocation.toURL());
                    objImageToDownload.location = imageLocation.toURL();
                },
                function(error) {
                    console.log("download error source " + error.source);
                    console.log("download error target " + error.target);
                    downloadImage(objImageToDownload, intentos-1);
                }
        );
	}
};