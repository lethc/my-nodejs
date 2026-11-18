const Message=require('../models/messageModel')

// Este servicio concentra las consultas del chat a la base configurada en config.js.
// socket.js utiliza una instancia porque getAll y create no son metodos estaticos.
class MessageService{
    constructor(){}
    async getAll(){
        // _id mantiene el orden habitual de creacion al recuperar el historial.
        return await Message.find({}).sort({_id:1})
    }
    async create(msg){
        // save() valida e inserta el documento en messages; await espera a que MongoDB responda.
        // Si falla, la promesa se rechaza y socket.js informa el error al cliente.
        const message  = new Message(msg)
        return await message.save()
    }
    async getRecent(limit = 20){
        // Solo enviamos a OpenRouter una ventana del historial, ordenada de antiguo a reciente.
        const messages = await Message.find({}).sort({_id:-1}).limit(limit)
        return messages.reverse()
    }
}

module.exports = MessageService
