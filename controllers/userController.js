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

exports.updateUser = async (req, res) => {
    try {
        const data=req.body
        const id=req.params.id
        const user=await UserService.update(id, data)
        if(!user){
            return res.status(404).json({"message": "Usuario no encontrado"})
        }
        res.status(200).send('Se modificó el registro correctamente')
    } catch (error) {
        const status=error.name === 'CastError' || error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({error:error.message})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id=req.params.id
        const result=await UserService.delete(id)
        if(result.deletedCount === 0){
            return res.status(404).json({"message":"Usuario no encontrado"})
        }
        res.status(200).send('Se eliminó el usuario correctamente')
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({error:error.message})
    }
}
