const UserService=require('../services/userService')


exports.getAllUsers=async(req, res)=>{
    try {
        const users=await UserService.getAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.getUser=async(req, res)=>{
    try {
        const id=req.params.id
        const user=await UserService.filterById(id)
        if(!user){
            return res.status(404).json({"message":"Usuario no encontrado"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({error:error.message})
    }
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
