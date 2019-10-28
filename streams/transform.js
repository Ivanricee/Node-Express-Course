const {Transform} = require('stream')

//el constructor es muy similar a duplex
//solo que l sintaxis es mucho mas corta
const transformStream = new Transform({
    transform(chunk,encode,callback){
        //el string que reciba lo pasare a mayus
        this.push(chunk.toString().toUpperCase())
        callback()
    }
})

process.stdin.pipe(transformStream).pipe(process.stdout)