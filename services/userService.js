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
}

module.exports=UserService
