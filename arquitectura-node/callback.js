//es valido pero hay soluciones mas actuiales, inteligentes
//y entendibles
const asyncCallback = function (cb) {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            //error first callback
            //cuando un callback tiene un error se envia 
            //como primer parametro el error
            //si no hay error se envia un null
            return cb(null, 'hello world')
        } else {
            cb(new Error("good bye error"))
        }
    }, 2000)
}

asyncCallback((err, msg) => {
    if (err) {
        console.log('error', err)
    } else {
        console.log('message', msg)
    }
}) 