const jwt = require('jsonwebtoken')

// Middleware que exige un JWT valido en el header "Authorization: Bearer <token>".
// Si el token es valido guarda el payload en req.user y continua con next().
exports.verifyToken = (req, res, next) => {
    // Node normaliza los headers a minusculas: "Authorization" llega como "authorization"
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({ error: "Token no enviado" })
    }
    try {
        // Formato esperado del header: "Bearer <token>"
        const token = authorization.split(" ")[1]
        // Debe usar la misma clave con la que authService.generateToken firma el JWT
        req.user = jwt.verify(token, "secret-key")
        next()
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}