// Eventos de Socket.IO del servidor.
// app.js lo invoca con la instancia io para registrar aqui los listeners.
module.exports=(io)=>{
    // Se ejecuta cada vez que un navegador abre la pagina y conecta con el servidor
    io.on('connection', (socket)=>{
        console.log('Se ha conectado a un nuevo cliente al servidor')
        // "socket" representa a ese cliente en particular; su evento disconnect
        // se dispara al cerrar la pestana o perder la conexion
        socket.on('disconnect', ()=>{
            console.log('El cliente se ha desconectado del servidor ')
        })
    })
}