//Este metodo de call back es mas entendible
//sin embargo ocurre lo contrario y es cuando comienza haber
//muchos encadenamientos
const promise = new Promise((resolve,reject) =>{
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve('hello world')
        } else {
            reject(new Error("good bye error"))
        }
    }, 0)
})
//las promesas se encadenan con then

promise.then(msg => msg.toUpperCase())
.then(msg => console.log('message',msg))
.catch(err => console.log('error',err))