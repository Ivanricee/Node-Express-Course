//por debajo trabajo con una utilidad llamada util.format()
//La consola se alimenta del paquete util.format
//util.format("Un %s y %s", "perrito", "gatito")
// %s -> string
// %d -> numbers
// %j -> json
console.log("Un %s y un %s", "perrito", "gatito")

//es un alias del console.log
console.info("hello world")

//alias de error
console.warn("hello error")

//si hay un error, muestra que hay un error 
//de assert es decir: en un booleano, una verficacion
console.assert(42 === "42")

//trace indica la linea del error
//cons/ole.trace("hello")

//

const util = require("util")
const debuglog = util.debuglog("foo")

debuglog("hello from foo")