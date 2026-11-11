const express = require('express')
const router = express.Router()
const{verifyToken} = require('../middleware/verifyToken')

// Ruta protegida: req.user lo llena verifyToken con el payload del JWT (email).
router.get('/', verifyToken, (req,res)=>{
    res.status(200).send('Dashboard.Usuario'+req.user.email)
})

module.exports = router