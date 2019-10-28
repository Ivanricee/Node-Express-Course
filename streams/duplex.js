//al igual que con los writable 
//en esta caso vamos a obtener la clase duplex
//La diferencia e:
//implementa ambas interfaces writable and readable

const {Duplex} = require('stream')
const duplexStream = new Duplex({
    //el constructor recibe write() y read()
    write(chunk,encoding,callback){
        console.log(chunk.toString())
        callback();
    },
    read(size){
        if(this.currentCharCode > 90){
            this.push(null)
            return
        }
        this.push(String.fromCharCode(this.currentCharCode++))
    }
});

duplexStream.currentCharCode = 65;

process.stdin.pipe(duplexStream).pipe(process.stdout)