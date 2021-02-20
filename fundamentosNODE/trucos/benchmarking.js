//---------------------------------
//Ejecutamos el inicio y el final del bucle para saber
//cuanto tiempo tardo entre uno y otro y asi saber
//cuando dura nuestro proceso
console.time('todo');
let suma = 0;
console.time('bucle');
for (let i = 0; i < 100000000; i++) {
    suma += 1;
}
console.timeEnd('bucle');
//-------------------------------------------------------------
let suma2 = 0;
console.time('bucle 2');
for (let j = 0; j < 1000000000; j++) {
    suma2 += 1;
}
console.timeEnd('bucle 2');
//----------------------------------------------------------
console.time('asincrono');
console.log('Empieza el proceso async')
//llamamos una funcion asincrona declarada despes de usar timeend
asincrona()
    .then(() => {
        console.timeEnd('asincrono');
    });

console.timeEnd('todo');//asi entendemos cuanto tardan todos nuestros procesos
//----------------------------------------------------------------------
function asincrona() {
    return new Promise( (resolve) => {
        setTimeout(function () {
            console.log('Termina el proceso asíncrono');
            resolve();
        }, 1000)
    })
}
//---------------------------------------------------------------