// Eventos de Socket.IO del servidor.
// app.js lo invoca con la instancia io para registrar aqui los listeners.
module.exports = (io) => {
    // Historial de ejemplo en memoria: se reinicia al reiniciar el servidor.
    // Todavia no se lee ni se guarda en la coleccion de mensajes de MongoDB.
    let messages = [{ username: "fake-user", message: "Welcome" }]
    io.on('connection', (socket) => {
        console.log("Un nuevo usuario conectado")
        // io.emit envia el historial a todos los clientes conectados,
        // incluido el que acaba de entrar. La vista escucha este mismo evento.
        io.emit('all-messages', messages)
    })
}
