const express = require('express');
const router = express.Router();
const propiedadController = require('../controllers/propiedadControllers');

//Rutas para las propiedades
router.get('/', propiedadController.getAllProperties);
router.get('/:id', propiedadController.getPropertyById);
router.post('/', propiedadController.createProperty);
router.put('/:id', propiedadController.updateProperty);
router.delete('/:id', propiedadController.deleteProperty);
router.get('/:id/detalles', propiedadController.getPropertyDetailsById);

module.exports = router;