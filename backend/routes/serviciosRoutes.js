const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosControllers');

//Rutas para los servicios
router.get('/', serviciosController.getAllServices);
router.get('/:id', serviciosController.getServiceById);
router.post('/', serviciosController.createService);
router.put('/:id', serviciosController.updateService);
router.delete('/:id', serviciosController.deleteService);   

module.exports = router;