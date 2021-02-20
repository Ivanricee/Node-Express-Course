const fs = require('fs');
const stream = require('stream');
//trabaajmos con herenci automatica
const util = require('util');

let data = '';

let readableStream = fs.createReadStream(__dirname + '/input.txt');
readableStream.setEncoding('UTF8');

// readableStream.on('data', function (chunk) {
//     data += chunk;
// });

// readableStream.on('end', function() {
//     console.log(data);
// });
//Escribimos en el buffer de salida del sistema
// process.stdout.write('hola')
// process.stdout.write('que')
// process.stdout.write('tal')

//Crea un stream de transformacion que puede leer y escribir
const Transform = stream.Transform;

function Mayus() {
    //constructor del transform
    Transform.call(this);
}
// Le decimos que Mayos obtenga todo lo de Transform
util.inherits(Mayus, Transform);

//Accedemos a la funcionalidad adquierida de transmor en su prototype de mayus

Mayus.prototype._transform = function(chunk, codif, cb) {
    chunkMayus = chunk.toString().toUpperCase();
    //Enviamos el push a donde lo necesitemos
    this.push(chunkMayus);
    cb();
}

//par poder ver la transformacion necesitamos crearla
let mayus = new Mayus();

readableStream
    .pipe(mayus)
    .pipe(process.stdout);