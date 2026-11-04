const SupplierService = require('../services/supplierService')


exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await SupplierService.getAll()
        res.status(200).json(suppliers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getSupplier = async (req, res) => {
    try {
        const id = req.params.id
        const supplier = await SupplierService.filterById(id)
        if (!supplier) {
            return res.status(404).json({ "message": "Proveedor no encontrado" })
        }
        res.status(200).json(supplier)
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({ error: error.message })
    }
}

// request y response para sus salidas
exports.createSupplier = async (req, res) => {
    try {
        let data = req.body
        await SupplierService.create(data)
        res.status(201).send("Proveedor registrado")

    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({ error: error.message })
    }
}

exports.updateSupplier = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const user = await SupplierService.update(id, data)
        if (!user) {
            return res.status(404).json({ "message": "Proveedor no encontrado" })
        }
        res.status(200).send('Se modificó el proveedor correctamente')
    } catch (error) {
        const status = error.name === 'CastError' || error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({ error: error.message })
    }
}

exports.deleteSupplier = async (req, res) => {
    try {
        const id = req.params.id
        const result = await SupplierService.delete(id)
        if (result.deletedCount === 0) {
            return res.status(404).json({ "message": "Proveedor no encontrado" })
        }
        res.status(200).send('Se eliminó el proveedor correctament')
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({ error: error.message })
    }
}
