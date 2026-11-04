const UserService=require('../services/userService')


exports.getAllUsers=(req, res)=>{
    console.log(req.query.enabled)
    // console.log("Accediendo a todos los usuarios");
    res.status(200).send("Accediendo a todos los usuarios")
}

exports.getUser=(req, res)=>{
    res.status(201).send("Accediendo al usuario con ID: "+req.params.id)
}

// request y response para sus salidas
exports.createUser = async (req, res) => {
    try {
        let data = req.body
            await UserService.create(data)
        res.status(201).send("Usuario Registrado")

    } catch (error) {
        res.status(500).json({"error":error.message})
    }
}

exports.updateUser = (req, res) => {
    const { nombre, apellido, email, telefono } = req.body

    res.status(200).json({
        id: req.params.id,
        nombre,
        apellido,
        email,
        telefono
    })
}

exports.deleteUser = (req, res) => {
    res.status(200).json({
        id: req.params.id,
        mensaje: "ID eliminado"
    })
}
