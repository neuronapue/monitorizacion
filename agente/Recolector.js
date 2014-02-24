
var http = require('http'), url = require('url'); //son librerias que tiene nodejs

var procesarRegistrar = function(request, response, urlParseada){
	if (request.method == 'GET') {
			response.writeHead(200, { 
				'Content-Type' : 'text/html'
			});			
			response.write('<p>Instancia ' + 
                           urlParseada.query.instancia + 
						   ' registrada</p>');
	} else {
		response.writeHead(405);
	}
	response.end(); //corta comunicaciones.
}

var procesarEstadisticas = function(request,response){
	if (request.method == 'POST') {
		var datos = '';
		request.on('data', function(nuevosDatos) {   	//request tiene la función on. Cuando se envia "data" se ejecuta la función request.on
			datos = datos + nuevosDatos.toString();		// puedo emplear el datos porque utilizas clousure.
														// nuevosDatos es un objeto. si utilizas toString() te lo convierte en string. 
		})
		request.on('end',function() {				//request.on se ejecutará solo cuando se envia "end". Es como la ejecución de una interrupcion de teclado.
			// !!!! 
			response.writeHead(200);
			console.log('*************************');
			console.log(datos);
			console.log('*************************');
			response.end();

		})
	} else {
		response.writeHead(405);
		response.end(); 	//corta comunicaciones.
	}

}


var procesador = function(request, response) {
	var urlParseada = url.parse(request.url, true);
	
	if (urlParseada.pathname == '/registrar') {
		procesarRegistrar(request, response, urlParseada);
	
	} 
	else if (urlParseada.pathname = '/estadisticas'){
				procesarEstadisticas(request,response);
		} else {
			response.writeHead(404); // No te he encontrado
			response.end(); 	//corta comunicaciones.
		}
	}

var server = http.createServer(procesador);	
server.listen(80);

// ejecutar en el explorador http://127.0.0.1/registrar?instancia=8080 para pasar como GET.