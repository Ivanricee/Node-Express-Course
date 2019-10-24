const {Readable} = require('stream');
const readableStream = new Readable();

readableStream.push(`${0/0} `.repeat(10).concat("batman batman!"))
//para decirle a readableStream que dejó de recibir datos usamos:
readableStream.push(null);

//al igual que con los writeable streams es importante hacer pipe
//process.stdout -> funcionalidad por defecto que imprime en consola
// console.log llama a esta funcion por debajo
readableStream.pipe(process.stdout);