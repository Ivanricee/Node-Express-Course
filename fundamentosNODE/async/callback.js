function hola(nombre, miCallback){
    console.log('Hola, soy una funcion asincrona')
    setTimeout(()=>{
        console.log('hola', nombre)
        miCallback("ivan-asu")
    },1500)
}

function adios(nombre, otroCallback){
    setTimeout(()=>{
        console.log("adios", nombre)
    },1000)
}

console.log('iniciando')
hola('Ay chuchin',(nombre)=>{
    adios(nombre,() => {
        console.log("terminando procesop")
    })
})
//hola('ivan',()=>{})
//adios('ivan',()=>{})