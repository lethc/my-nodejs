const ProductService = require('../services/productService')


exports.getAllProducts = async (req, res) => {
    try {
        const users = await ProductService.getAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const user = await ProductService.filterById(id)
        if (!user) {
            return res.status(404).json({ "message": "Usuario no encontrado" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({ error: error.message })
    }
}

// request y response para sus salidas
exports.createProduct = async (req, res) => {
    try {
        let data = req.body
        await ProductService.create(data)
        res.status(201).send("Usuario Registrado")

    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({ error: error.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const user = await ProductService.update(id, data)
        if (!user) {
            return res.status(404).json({ "message": "Usuario no encontrado" })
        }
        res.status(200).send('Se modificó el registro correctamente')
    } catch (error) {
        const status = error.name === 'CastError' || error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({ error: error.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const result = await ProductService.delete(id)
        if (result.deletedCount === 0) {
            return res.status(404).json({ "message": "Usuario no encontrado" })
        }
        res.status(200).send('Se eliminó el usuario correctamente')
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({ error: error.message })
    }
}
