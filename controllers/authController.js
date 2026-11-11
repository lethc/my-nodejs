const AuthService = require('../services/authService')
const bcrypt = require('bcrypt')
const authService = new AuthService()

exports.register = async (req, res) => {
    try {
        await authService.register(req.body)
        res.status(201).json({ "message": "Usuario del Administrador Registrado" })
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body
        const userAuth = await authService.filterByEmail(email)
        // NOTA: esta validacion revisa el body (email), no el resultado de la busqueda (userAuth).
        // Si el correo no existe, userAuth es null y el acceso a userAuth.password cae en el catch (500).
        if (!email) {
            return res.status(400).json({ "message": "Usuario de administrador no encontrado" })
        }
        const passwordMatch = bcrypt.compareSync(password, userAuth.password)
        if (!passwordMatch) {
            return res.status(400).json({ "message": "Contraseña incorrecta" })
        }
        // El payload solo lleva el email: el JWT va firmado pero no cifrado, por eso no se incluye la contraseña
        const payload = {
            email:userAuth.email
        }
        const token = authService.generateToken(payload)
        res.status(200).send(token)
    } catch (error) {
        res.status(500).json({ "error": error.message })

    }
}