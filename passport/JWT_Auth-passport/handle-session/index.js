const express = require ('express')
const session = require ('express-session')

const app = express()
//definimos el manejo de session
//resave: no guarde la cookie cada vez que se haga un cambio
//saveUninitialized: si la cookie no se ha inicializado no se guarde por defecto
//secred: string minimo de 256 bits

app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: "keyboard dog"
}))

//ruta que hara en el home el uso de nuestra session
app.get('/',(req, res)=>{
    //al usar app.use ahora podemos hacer uso de req.session
    req.session.count = req.session.count ? req.session.count + 1 : 1
    res.status(200).json({hello: 'world', counter: req.session.count})
})

app.listen(3000, ()=>{
    console.log("Listening http://localhost:3000");
} )