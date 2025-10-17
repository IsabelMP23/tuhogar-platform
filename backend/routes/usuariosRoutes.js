const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosControllers');

//Rutas para los usuarios
router.get('/', usuarioController.getAllUsers);
router.get('/:id', usuarioController.getUserById);
router.post('/', usuarioController.createUser);
router.put('/:id', usuarioController.updateUser);
router.delete('/:id', usuarioController.deleteUser);


module.exports = router;