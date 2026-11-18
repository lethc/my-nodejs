const MessageService = require('./services/messageService')
const messageService = new MessageService()

// Eventos de Socket.IO del servidor.
// app.js lo invoca con la instancia io para registrar aqui los listeners.
module.exports = (io) => {
    io.on('connection', async (socket) => {
        console.log("Un nuevo usuario conectado")
        
        // broadcast avisa a los demas clientes, sin mostrar el aviso al autor.
        socket.on('writing', (username)=>{
            if(typeof username === 'string' && username.trim()){
                socket.broadcast.emit('writing', username.trim())
            }
        })
        
        socket.on('new-message', async (data) => {
            // El cliente y el servidor usan el mismo campo: message, en singular.
            if(!data || typeof data.username !== 'string' || typeof data.message !== 'string') return
            const username = data.username.trim()
            const message = data.message.trim()
            // Se valida tambien en el servidor porque un cliente puede omitir el formulario.
            if(!username || !message) return
            try {
                // await garantiza que el guardado termine antes de consultar y transmitir.
                // MongoDB conserva el documento aunque despues se reinicie Node.js.
                await messageService.create({username, message})
                const messages = await messageService.getAll()
                // Todos reciben el historial actualizado, incluido el autor.
                io.emit('all-messages', messages)
            } catch (error) {
                console.error('Error al guardar o consultar los mensajes:', error.message)
                socket.emit('chat-error', {message: 'No se pudo actualizar el chat. Revisa la conexion con MongoDB.'})
            }
        })

        try {
            // Solo el cliente que acaba de entrar necesita cargar el historial inicial.
            // Los listeners ya estan registrados para atender los eventos durante esta consulta.
            const messages = await messageService.getAll()
            socket.emit('all-messages', messages)
        } catch (error) {
            console.error('Error al cargar el historial:', error.message)
            socket.emit('chat-error', {message: 'No se pudo cargar el historial. Revisa la conexion con MongoDB.'})
        }
    })

}
