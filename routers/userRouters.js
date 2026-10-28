const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')

router.get('/', userController.getAllUsers)

// Mostrar Usuario
router.get('/:id',userController.getUser)

// Crear Usuario
router.post('/', userController.createUser)

// Actualizar Usuario
router.put('/:id', userController.updateUser)

// Borrar Usuario
router.delete('/:id', userController.deleteUser)


module.exports=router