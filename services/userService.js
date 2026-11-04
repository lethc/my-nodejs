const User=require('../models/userModel')
class UserService{
    constructor() {}
    
    static async getAll() {
        const users = await User.find({})
        return users
    }
    
    static async filterById(id){
        const user=await User.findOne({_id:id})
        return user
    }

    // Metodo estatico para llamar UserService.create(data) desde el controlador.
    static async create(data){
        const user = new User(data)
        return await user.save()
    }

    static async update(id,data){
        return await User.findByIdAndUpdate(id,data,{new:true,runValidators:true})
    }

    static async delete(id){
        return await User.deleteOne({_id:id})
    }
}

module.exports=UserService
