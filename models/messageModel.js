const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Mensaje persistido por MessageService: autor y contenido son obligatorios.
// trim elimina espacios al principio y al final; required rechaza cadenas vacias.
const messageSchema = Schema({
    username:{type:String,required:true,trim:true},
    message:{type:String,required:true,trim:true}
})

// Sin tercer argumento, Mongoose guarda estos documentos en la coleccion "messages"
const Message = mongoose.model('Message',messageSchema)
module.exports = Message
