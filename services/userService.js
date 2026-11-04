const User=require('../models/userModel')
class UserService{
    constructor() {}

    // Metodo estatico para llamar UserService.create(data) desde el controlador.
    static async create(data){
        const user = new User(data)
        return await user.save()
    }
}

module.exports=UserService
