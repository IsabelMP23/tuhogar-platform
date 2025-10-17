const pool = require('../db/db');

//Función para obtener todos los servicios  
const getAllServices = async () => {
    const res = await pool.query('SELECT * FROM servicios');
    return res.rows;
};

//Función para obtener un servicio por su ID
const getServiceById = async (id) => {
    const res = await pool.query('SELECT * FROM servicios WHERE id_servicio = $1', [id]);
    return res.rows[0];
};

//Función para crear un nuevo servicio
const createService = async (service) => {
    const { nombre, descripcion, icono } = service;
    const res = await pool.query(
        'INSERT INTO servicios (nombre, descripcion, icono) VALUES ($1, $2, $3) RETURNING *',
        [nombre, descripcion, icono]
    );
    return res.rows[0];
};

//Función para actualizar un servicio
const updateService = async (id, service) => {
    const { nombre, descripcion, icono } = service;
    const res = await pool.query(
        'UPDATE servicios SET nombre = $1, descripcion = $2, icono = $3 WHERE id_servicio = $4 RETURNING *',
        [nombre, descripcion, icono, id]
    );
    return res.rows[0];
};

//Función para eliminar un servicio
const deleteService = async (id) => {
    const res = await pool.query('DELETE FROM servicios WHERE id_servicio = $1 RETURNING *', [id]);
};


module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};  