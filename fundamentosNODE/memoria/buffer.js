//Guarda en memoria ram un espacio, un byte de informacion
// let buffer = Buffer.alloc(4);

//Guardamos un conjunto de datos binarios (espacios)
// let buffer = Buffer.from([1, 2, 5]);

//guardamos una palabra en binario
let buffer = Buffer.from('Hola');

// console.log(buffer);

// --
//trabajamos con buffer, psicion a posicion
//creamos 26 espacios
let abc = Buffer.alloc(26);
console.log(abc);

//A cada posicion del buffer le asignamos un nomero
for (let i = 0; i < 26; i++) {
    abc[i] = i + 97;
}

console.log(abc.toString());
