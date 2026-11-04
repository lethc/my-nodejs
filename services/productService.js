const Product = require('../models/productModel')

class ProductService {
    static async getAll() {
        return await Product.find({})
    }

    static async filterById(id) {
        return await Product.findById(id)
    }

    static async create(data) {
        const product = new Product(data)
        return await product.save()
    }

    static async update(id, data) {
        return await Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
    }

    static async delete(id) {
        return await Product.deleteOne({ _id: id })
    }
}

module.exports = ProductService