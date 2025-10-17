const pool = require('../db/db');

//Función para obtener todos los contactos
const getAllContacts = async () => {
    const res = await pool.query('SELECT * FROM contactos');
    return res.rows;
};

//Función para obtener un contacto por su ID
const getContactById = async (id) => {
    const res = await pool.query('SELECT * FROM contactos WHERE id_contacto = $1', [id]);
    return res.rows[0];
};

//Función para crear un nuevo contacto
const createContact = async (contact) => {
    const { nombre, correo, telefono, mensaje, fecha_contacto, id_propiedad, id_agente, estado } = contact;
    const res = await pool.query(
        'INSERT INTO contactos (nombre, correo, telefono, mensaje, fecha_contacto, id_propiedad, id_agente, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [nombre, correo, telefono, mensaje, fecha_contacto, id_propiedad, id_agente, estado]
    );
    return res.rows[0];
};

//Función para actualizar un contacto
const updateContact = async (id, contact) => {
    const { estado } = contact;
    const res = await pool.query(
        'UPDATE contactos SET estado = $1 WHERE id_contacto = $2 RETURNING *',
        [estado, id]
    );
    return res.rows[0];
};

//Función para eliminar un contacto
const deleteContact = async (id) => {
    const res = await pool.query('DELETE FROM contactos WHERE id_contacto = $1 RETURNING *', [id]);
};


module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};