console.log('iniciando agente.');
console.log('');

var os = require('os');
// API timer --> All of the timer functions are globals. You do not need to require() this module in order to use them. 

var Estadistica = function  () {
	var fecha = new Date();
	this.timestamp = fecha.getTime();
	console.log('Guardo Estadistica con Timestamp: ' + this.timestamp);
	this.memorialibre = os.freemem();
	this.tiempoCPU = this._getTiempoCPU();
	this.tiempoCPUIdle = this._getTiempoCPUIdle();

}

var Agente = function (id) {	//constructor del agente.
	this.id = id;  //this.id esta en Head y id esta Stack de la function.
	this.memoriaTotal = os.totalmem();  // Defino memoriaTotal en el objeto inicial porque no cambia en el tiempo y ahorro memoria por cada objeto Estadistica que creo.
	this.datosEstadisticos = []; //creo un array donde almacenar mis datos estadisticos.
//	this._agregarEstadistica = function (){......};  No ponemos el código de agregar en el objeto Agente, para no repetir codigo de la función por cada agente "Herencia".
	GetUsoCPUMedioLastMinute();
}

Estadistica.prototype._getTiempoCPU = function() {
	console.log('');
	console.log('_getTiempoCPU');
	var SumaTiemposTotales = 0;
	var datosCPU = os.cpus();
	for (var i=0; i < datosCPU.length; i++) {
		var cpuActual = datosCPU[i];
		console.log('');
//		console.log(cpuActual);
		for(var o=0; o < datosCPU.length; o++) {
/*			console.log('tiempo de usuario: ' + datosCPU[i].times.user);
			console.log('tiempo de Systema: ' + datosCPU[i].times.sys);
			console.log('tiempo de Inactivo: ' + datosCPU[i].times.idle);
			console.log('tiempo de Inactivo: ' + datosCPU[i].times.irq);
			console.log('tiempo de Inactivo: ' + datosCPU[i].times.nice); */
			SumaTiemposTotales = SumaTiemposTotales + datosCPU[i].times.user + datosCPU[i].times.nice + datosCPU[i].times.sys + datosCPU[i].times. idle + datosCPU[i].times. irq;
//			console.log('Tiempo total del procesador '+ o + ' : ' + SumaTiemposTotales);
		}
	console.log('Tiempo total de los procesador: ' + SumaTiemposTotales);
	return SumaTiemposTotales;
	}
}

Estadistica.prototype._getTiempoCPUIdle = function() {
	console.log('');
	console.log('_getTiempoCPUIdle');
	var SumaTiemposIdleTotal = 0;
	var datosCPU = os.cpus();
	for (var i=0; i < datosCPU.length; i++) {
		var cpuActual = datosCPU[i];
		console.log('');
		for(var o=0; o < datosCPU.length; o++) {
//			console.log('tiempo de Inactivo: ' + datosCPU[i].times.idle);
			SumaTiemposIdleTotal = SumaTiemposIdleTotal + datosCPU[i].times. idle; 
		}
	}
	console.log('Tiempo total de procesador Idle: ' + SumaTiemposIdleTotal);
	return SumaTiemposIdleTotal;
}

Agente.prototype._agregarEstadistica = function() { //creo un prototype para Heredar ._agregarEstadistica para todos los objetos "Agente".
	var estadisticaActual = new Estadistica();
	this.datosEstadisticos.push(estadisticaActual); // el this es del Agente. Push añade al final.
	if (this.datosEstadisticos.length > 60) {
		this.datosEstadisticos.shift();	// Borra el primer elemento del string (con push y shift tienes una cola FIFO).
	}
}

Agente.prototype.activar = function() {
	var self = this; //copio en el stack la referencia de miAgente para poderla usar en una función de S.O. (el stack no se borra debido a la propiedad "closure")
	console.log('>>>> El ID de mi agente es: ' + this.id)
//	var intervalId = setInterval(function() {console.log('Lo ejecuta el S.O. y mi this.id es: '+ this.id)}, 1000); // Este this.id no funciona porque lo ejecuta el S.O. y te dice "undefined".
/*	setInterval(function() {
		console.log('Lo ejecuta el S.O. y mi this.id es: '+ self.id)
	}, 1000); //Ahora mediante closure hacemos uso de una variable self para almacenar en el stack el this.id.
*/
	setInterval(function() {
		self._agregarEstadistica(); //Ahora puedo utilizar this porque lo hemos guardado en self y esta en el stack.
	}, 1000);

}


var miAgente = new Agente('Id_Agente_ENA');
miAgente.activar();

// miAgente._agregarEstadistica();

//console.log(JSON.stringify(miAgente));
console.log('');
console.log('finalizando agente.');