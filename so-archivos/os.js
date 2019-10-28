const os = require('os')

//usamos este metodo ( cpus() ) para saber los requerimientos de la pc
//console.log("CPU info", os.cpus())

//conocer nuestra ip
//console.log("IP addrress", os.networkInterfaces().en0.map(i => i.address))

//conmsultar memoria de nuestro sistema
//console.log("Free memory", os.freemem)

//tipo de sistema operativo
//console.log("Type", os.type())

//version
//console.log("SP version", os.release)

//info de ususario
console.log("User info", os.userInfo())