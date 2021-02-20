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


    async function main(){
        let nombre = await hola('ivan')
        await hablar()
        await hablar()
        await hablar()
        await hablar()
        await adios(nombre)

    }
    console.log('empezamos el proceso')
    main()
    console.log('terminael proceso')