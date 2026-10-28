exports.getAllUsers=(req, res)=>{
    console.log(req.query.enabled)
    // console.log("Accediendo a todos los usuarios");
    res.status(200).send("Accediendo a todos los usuarios")
}

exports.getUser=(req, res)=>{
    res.status(201).send("Accediendo al usuario con ID: "+req.params.id)
}

// request y response para sus salidas
exports.createUser = (req, res) => {
    const { nombre, apellido, email, telefono } = req.body

    res.status(201).json({
        mensaje: "Usuario creado",
        usuario: { nombre, apellido, email, telefono }
    })
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