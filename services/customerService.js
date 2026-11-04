const Customer = require('../models/customerModel')

class CustomerService {
    static async getAll() {
        return await Customer.find({})
    }

    static async filterById(id) {
        return await Customer.findById(id)
    }

    static async create(data) {
        const customer = new Customer(data)
        return await customer.save()
    }

    static async update(id, data) {
        return await Customer.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
    }

    static async delete(id) {
        return await Customer.deleteOne({ _id: id })
    }
}

module.exports = CustomerService