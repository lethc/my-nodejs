const Supplier = require('../models/supplierModel')

class SupplierService {
    static async getAll() {
        return await Supplier.find({})
    }

    static async filterById(id) {
        return await Supplier.findById(id)
    }

    static async create(data) {
        const supplier = new Supplier(data)
        return await supplier.save()
    }

    static async update(id, data) {
        return await Supplier.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
    }

    static async delete(id) {
        return await Supplier.deleteOne({ _id: id })
    }
}

module.exports = SupplierService