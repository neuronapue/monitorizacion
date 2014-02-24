console.log('iniciando agente.');

var os = require('os');

console.log('Memoria Libre :');
console.log('');
console.log(parseInt(os.freemem()) + ' Bytes.');
console.log(parseInt(os.freemem()/1024/1024) + ' MB.');
console.log('');

var datosCPU = os.cpus();
// console.log('Info CPUs :' + JSON.stringify(datosCPU));

console.log('Info CPUs :');
var SumaTiemposTotales = 0;
var tiempoIdle = 0;
var tiempoSys = 0;
var tiempoIrq = 0;
var tiempoNice = 0;
var tiempoUser = 0;
for (var i=0; i < datosCPU.length; i++) {
	var cpuActual = datosCPU[i];
	console.log('');
	console.log(cpuActual);
	for(var o=0; o < datosCPU.length; o++) {
		console.log('tiempo de usuario: ' + datosCPU[i].times.user);
		console.log('tiempo de Systema: ' + datosCPU[i].times.sys);
		console.log('tiempo de Inactivo: ' + datosCPU[i].times.idle);
		console.log('tiempo de Inactivo: ' + datosCPU[i].times.irq);
		console.log('tiempo de Inactivo: ' + datosCPU[i].times.nice);
		SumaTiemposTotales = SumaTiemposTotales + datosCPU[i].times.user + datosCPU[i].times.nice + datosCPU[i].times.sys + datosCPU[i].times. idle + datosCPU[i].times. irq;
		console.log('Tiempo total de l procesador '+ o + ' : ' +SumaTiemposTotales);
	}
	console.log('Tiempo total de los procesador: ' + SumaTiemposTotales);
}


// console.log('Network :' + os.networkInterfaces());

console.log('finalizando agente.');