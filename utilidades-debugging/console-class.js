const fs = require('fs')
//cada vez que escriba o imprima en el stdout nos cree un archivo  log
const out = fs.createWriteStream('./out.log')
const err = fs.createWriteStream('./err.log')

//recibe como primer parametro:
//donde va a imprimir lo que le pasemos en console.log o console.info
//y segundo parametro:
//donde va a imprimir todo lo que llame con console.error
const consoleFile = new console.Console(out,err)

setInterval( ()=>{    
    consoleFile.log(new Date())
    consoleFile.error(new Error("Ooops!"))
},2000)