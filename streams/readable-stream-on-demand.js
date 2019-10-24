//pedazo por pedazo

const { Readable } = require('stream');
const readableStream = new Readable({
    //recibe un tamaño de buffer
    read(size) {
        setTimeout(() => {
            if(this.currentCharCode > 90){
                //para decirle a readableStream que dejó de recibir datos usamos:
                this.push(null)
                return
            }
            //escribe el abecedario letra por letra
            this.push(String.fromCharCode(this.currentCharCode++))
        },100)
    }
});
//inicia el abecedario en este numero
readableStream.currentCharCode = 65;

//al igual que con los writeable streams es importante hacer pipe
//process.stdout -> funcionalidad por defecto que imprime en consola
// console.log llama a esta funcion por debajo
readableStream.pipe(process.stdout);