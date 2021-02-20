const {app, BrowserWindow} = require('electron')

//ventana donde se vera ala aplicacion

let ventanaPrincipal

app.on('ready',crearVentana)

//cuando viene un browser window de electron
//y se sete en el mainWindow
function crearVentana(){
    ventanaPrincipal = new BrowserWindow({
        width:800,
        height:600,
    })
    ventanaPrincipal.loadFile('index.html')
}