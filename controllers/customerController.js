const CustomerService = require('../services/customerService')


exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.getAll()
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getCustomer = async (req, res) => {
    try {
        const id = req.params.id
        const customer = await CustomerService.filterById(id)
        if (!customer) {
            return res.status(404).json({ "message": "Cliente no encontrado" })
        }
        res.status(200).json(customer)
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({ error: error.message })
    }
}

// request y response para sus salidas
exports.createCustomer = async (req, res) => {
    try {
        let data = req.body
        await CustomerService.create(data)
        res.status(201).send("Cliente registrado")

    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({ error: error.message })
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const user = await CustomerService.update(id, data)
        if (!user) {
            return res.status(404).json({ "message": "Cliente no encontrado" })
        }
        res.status(200).send('Se modificó el cliente correctamente')
    } catch (error) {
        const status = error.name === 'CastError' || error.name === 'ValidationError' ? 400 : 500
        res.status(status).json({ error: error.message })
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id
        const result = await CustomerService.delete(id)
        if (result.deletedCount === 0) {
            return res.status(404).json({ "message": "Cliente no encontrado" })
        }
        res.status(200).send('Se eliminó el cliente correctamente"')
    } catch (error) {
        res.status(error.name === 'CastError' ? 400 : 500).json({ error: error.message })
    }
}
