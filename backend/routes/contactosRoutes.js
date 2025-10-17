const express = require('express');
const router = express.Router();
const contactosController = require('../controllers/contactosControllers');

//Rutas para los contactos
router.get('/', contactosController.getAllContacts);
router.get('/:id', contactosController.getContactById);
router.post('/', contactosController.createContact);
router.put('/:id', contactosController.updateContact);
router.delete('/:id', contactosController.deleteContact);

module.exports = router;
