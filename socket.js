const MessageService = require('./services/messageService')
const OpenRouterService = require('./services/openRouterService')

// Eventos de Socket.IO del servidor.
// app.js lo invoca con la instancia io para registrar aqui los listeners.
module.exports = (io, {messageService = new MessageService(), openRouterService = new OpenRouterService()} = {}) => {
    // El historial y el asistente pertenecen a una sala compartida.
    // Atendemos una pregunta a la vez para no mezclar turnos de varios usuarios.
    let botBusy = false
    io.on('connection', async (socket) => {
        console.log("Un nuevo usuario conectado")
        socket.emit('bot-status', {busy: botBusy})
        
        // broadcast avisa a los demas clientes, sin mostrar el aviso al autor.
        socket.on('writing', (username)=>{
            if(typeof username === 'string' && username.trim()){
                socket.broadcast.emit('writing', username.trim())
            }
        })
        
        socket.on('new-message', async (data, acknowledge) => {
            const respond = result => {
                if (typeof acknowledge === 'function') acknowledge(result)
            }
            const reject = message => {
                socket.emit('chat-error', {message})
                respond({ok: false, saved: false, error: message})
            }
            // El cliente y el servidor usan el mismo campo: message, en singular.
            if(!data || typeof data.username !== 'string' || typeof data.message !== 'string') return reject('El nombre y el mensaje son requeridos.')
            const username = data.username.trim()
            const message = data.message.trim()
            // Se valida tambien en el servidor porque un cliente puede omitir el formulario.
            if(!username || !message) return reject('El nombre y el mensaje son requeridos.')
            if(username.length > 100 || message.length > 4000) return reject('Usa un nombre de hasta 100 caracteres y un mensaje de hasta 4000.')
            if(!openRouterService.isConfigured()) return reject('Configura OPENROUTER_API_KEY en .env y reinicia el servidor.')
            if(botBusy) return reject('OpenRouter esta respondiendo otra pregunta. Espera a que termine y vuelve a enviar.')
            botBusy = true
            io.emit('bot-status', {busy: true})
            let saved = false
            let stage = 'MongoDB'
            try {
                // await garantiza que el guardado termine antes de consultar y transmitir.
                // MongoDB conserva el documento aunque despues se reinicie Node.js.
                await messageService.create({username, message, role: 'user'})
                saved = true
                const messages = await messageService.getAll()
                // Todos reciben el historial actualizado, incluido el autor.
                io.emit('all-messages', messages)

                const history = await messageService.getRecent(20)
                stage = 'OpenRouter'
                const answer = await openRouterService.reply(history)
                stage = 'MongoDB'
                await messageService.create({username: 'OpenRouter', message: answer, role: 'assistant'})
                io.emit('all-messages', await messageService.getAll())
                respond({ok: true, saved: true})
            } catch (error) {
                const detail = stage === 'OpenRouter' ? error.message : 'No se pudo guardar o consultar el chat. Revisa MongoDB.'
                const publicMessage = saved ? `Tu mensaje esta guardado. ${detail}` : detail
                console.error(`Error del chat (${stage}):`, detail)
                socket.emit('chat-error', {message: publicMessage})
                respond({ok: false, saved, error: publicMessage})
            } finally {
                botBusy = false
                io.emit('bot-status', {busy: false})
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
