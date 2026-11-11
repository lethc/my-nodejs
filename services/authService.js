const UserAuth = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
    constructor() {
        
    }
    async register(data){
        data.password = bcrypt.hashSync(data.password, 10)
        const userAuth = new UserAuth(data)
        return await userAuth.save()
    }
    async filterByEmail(email){
        const userAuth = await UserAuth.findOne({email})
        return userAuth
    }
    // Firma el JWT con una clave fija de desarrollo; en produccion debe leerse de una variable de entorno
    generateToken(payload) {
        // expiresIn agrega el campo "exp" al token: pasados 5 segundos jwt.verify lo rechaza
        // (en verifyToken eso responde 401 "jwt expired"). Valor corto pensado solo para pruebas.
        const token=jwt.sign(payload, 'secret-key', { expiresIn: '5s' })
        return token
    }
}

module.exports=AuthService
