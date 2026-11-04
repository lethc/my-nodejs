const CategoryService = require('../services/categoryService')


exports.getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAll()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await CategoryService.filterById(id)
        if (!category) {
            return res.status(404).json({ "message": "Categoría no encontrada" })
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({ error: error.message })
    }
}

// request y response para sus salidas
exports.createCategory = async (req, res) => {
    try {
        let data = req.body
        await CategoryService.create(data)
        res.status(201).send("Categoría registrada")

    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({ error: error.message })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const user = await CategoryService.update(id, data)
        if (!user) {
            return res.status(404).json({ "message": "Categoría no encontrada" })
        }
        res.status(200).send('Se modificó el registro correctamente')
    } catch (error) {
        const status = error.name === 'CastError' || error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({ error: error.message })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const result = await CategoryService.delete(id)
        if (result.deletedCount === 0) {
            return res.status(404).json({ "message": "Categoría no encontrada" })
        }
        res.status(200).send('Se eliminó la categoría correctamente')
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({ error: error.message })
    }
}
