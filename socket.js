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
        
        // broadcast avisa a los demas clientes, sin mostrar el aviso al autor.
        socket.on('writing', (username)=>{
            if(typeof username === 'string' && username.trim()){
                socket.broadcast.emit('writing', username.trim())
            }
        })
        
        socket.on('new-message', (data) => {
            // El cliente y el servidor usan el mismo campo: message, en singular.
            if(!data || typeof data.username !== 'string' || typeof data.message !== 'string') return
            const username = data.username.trim()
            const message = data.message.trim()
            // Se valida tambien en el servidor porque un cliente puede omitir el formulario.
            if(!username || !message) return
            messages.push({username, message})
            // Todos reciben la misma lista, incluido quien envio el mensaje.
            io.emit('all-messages', messages)
        })

    })
}
