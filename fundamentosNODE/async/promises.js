function hola(nombre){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('hola', nombre)
            resolve(nombre)
        },1500)
    })
}

function adios(nombre){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("adios", nombre)
            resolve()
        },1000)
    })

}
function hablar (nombre){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("bla bla bla bla bla bla bla")
            resolve(nombre)
        },1000)
    })
}
console.log('iniciando el terminado')
hola('iván')
    .then(hablar)
    .then(adios)
    .then((nombre)=>{
        console.log('proceso terminado')
    })
    .catch(error =>{
        console.error("ocurrior un error")
        console.error(error)
    })