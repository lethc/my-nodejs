const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Mensaje del chat: quien lo envia y su contenido. Aun no se usa en socket.js
const messageSchema = Schema({
    username:String,
    message:String
})

// Sin tercer argumento, Mongoose guarda estos documentos en la coleccion "messages"
const Message = mongoose.model('Message',messageSchema)
module.exports = Message
