//es una mejor manera que las anteriores
//es una manera de hacer codigo asyncrono y que se vea asyncrono
//nuestra funcion devuelve una promesa

const promiseFunction = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve('hello world')
        } else {
            reject(new Error("good bye error"))
        }
    }, 0)
})

async function asyncAwait() {
    try {
        const msg = await promiseFunction()
        console.log("message", msg)
    } catch (err){
        console.log("error",err)
    }
}

asyncAwait()