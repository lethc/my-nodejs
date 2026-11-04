const Category = require('../models/categoryModel')

class CategoryService {
    static async getAll() {
        return await Category.find({})
    }

    static async filterById(id) {
        return await Category.findById(id)
    }

    static async create(data) {
        const category = new Category(data)
        return await category.save()
    }

    static async update(id, data) {
        return await Category.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
    }

    static async delete(id) {
        return await Category.deleteOne({ _id: id })
    }
}

module.exports = CategoryService