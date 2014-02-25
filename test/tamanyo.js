
var fs = require('fs');

var Size = function (dir,done) {
	var results = [];
	var suma = 0;
	fs.readdir(dir, function(err, list) { //fs.readdir(path, callback) where callback arguments (err, list)
    	if (err) return done(err);
    	var pending = list.length;
    	if (!pending) return done(null, results, suma);
     	for (var index = 0; index < list.length; ++index) {
     		var file;
    		console.log(list[index]);
	     	filePath = dir + '/' + list[index];
      		console.log('Fichero con path:' + filePath);
      		fs.stat(filePath, function(err, stat) {	//fs.stat(path, callback) where callback arguments (err, stats) where stats is a fs.Stats object.
				console.log('El Tamaño del Fichero es:' + stat.size);
	        	if (stat && stat.isDirectory()) {
    	    		//Size(file, function(err, res) {
        	    		results = results.concat(filePath);
        	    		suma = suma + stat.size;
        	    		console.log('Sumo:' + suma);		        	

            			if (!--pending) done(null, results);
          			//});
        		} 
        		else {
          			results.push(file);
          			suma = suma + stat.size;
          			if (!--pending) done(null, results);
        		}
      		});				
		}
	});
}

if (process.argv.length < 3) {
	console.warn('***************************************');
	console.warn('El path es por defecto es: ' + __dirname);
	console.warn('***************************************');
	Size(__dirname, function(err, results, suma) {
		for (var index = 0; index < results.length; ++index) 
			console.warn('Los ficheros son: ' + results[index]);
		console.warn('y pesan la suma de: ' + suma);
	});

} else {
	var path = process.argv[2];
	console.warn('---------------------------------------');
	console.warn('El path que me dan es: ' + path);
	console.warn('---------------------------------------');

//	fs.exists(path, function (exists) {
//  		util.debug(exists ? "it's there" : "no passwd!");
//  	}
	Size(path, function(err, results, suma) {
		for (var index = 0; index < results.length; ++index) 
			console.warn('Los ficheros son: ' + results[index]);
		console.warn('y pesan la suma de: ' + suma);
	});
}

