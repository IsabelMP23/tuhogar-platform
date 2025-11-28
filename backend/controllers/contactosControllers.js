const { Resend } = require('resend');
const contactosModel = require('../models/contactosModel');
const resend = new Resend(process.env.RESEND_API_KEY);

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

        // Enviar correo de confirmación usando Resend
        await resend.emails.send({
            from: 'TuHogar <noreply@resend.dev>',
            to: "tuhogar.platform@gmail.com",
            subject: 'Nuevo contacto recibido',
            html: `
                <h2>Nuevo contacto registrado</h2>
                <p><strong>Nombre:</strong> ${newContact.nombre}</p>
                <p><strong>Correo:</strong> ${newContact.correo}</p>
                <p><strong>Teléfono:</strong> ${newContact.telefono}</p>
                <p><strong>Mensaje:</strong> ${newContact.mensaje}</p>
                <p><strong>Fecha:</strong> ${createdContact.fecha_contacto}</p>
            `
        });

         res.status(201).json({
            message: "Contacto creado y correo enviado",
            data: createdContact
        });
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
