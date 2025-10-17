const contactosModel = require('../models/contactosModel');

//Controladores para gestionar contactos
const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactosModel.getAllContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los contactos' });
    }
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await contactosModel.getContactById(id);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ error: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el contacto' });
    }
};


const createContact = async (req, res) => {
    const newContact = req.body;
    try {
        const createdContact = await contactosModel.createContact(newContact);
        res.status(201).json(createdContact);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el contacto', detail: error.message });
    }
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        const contact = await contactosModel.updateContact(id, { estado });
        if (contact) {
            res.json(contact, { message: 'Contacto actualizado' });
        } else {
            res.status(404).json({ error: 'Contacto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el contacto' });
    }
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        await contactosModel.deleteContact(id);
        res.json({ message: 'Contacto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el contacto' });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};