const jwt = require('jsonwebtoken')
// Middleware que exige un JWT valido en el header. PENDIENTE: la firma no recibe el parametro `next`,
// por lo que next() lanza ReferenceError y el catch responde 401 incluso con un token valido.
exports.verifyToken=(req,res)=>{
    // NOTA: Node normaliza los headers a minusculas y los clientes envian "Authorization" (con z);
    // "authorisation" nunca coincide, asi que siempre se responde "Token no enviado".
    const authorisation = req.headers.authorisation
    console.log(authorisation)
    if(!authorisation){
        return res.status(401).json({error:"Token no enviado"})
    }
    try {
        // Formato esperado del header: "Bearer <token>"
        const token = authorisation.split(" ")[1]
        // Debe usar la misma clave con la que authService.generateToken firma el JWT
        req.user = jwt.verify(token, "secret-key")
        next()
    } catch (error) {
        return res.status(401).json({error:error.message})
    }
}