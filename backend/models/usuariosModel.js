const pool = require('../db/db');

//Función para obtener todos los usuarios
const getAllUsers = async () => {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
};

//Función para obtener un usuario por su ID
const getUserById = async (id) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
    return res.rows[0];
};


//Función para crear un nuevo usuario
const createUser = async (user) => {
    const { nombre, correo, contrasena, rol, telefono } = user;
    const res = await pool.query(
        'INSERT INTO usuarios (nombre, correo, contrasena, rol, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre, correo, contrasena, rol, telefono]
    );
    return res.rows[0];
};

//Función para actualizar un usuario
const updateUser = async (id, user) => {
    const { nombre, correo, contrasena, rol, telefono } = user;
    const res = await pool.query(
        'UPDATE usuarios SET nombre = $1, correo = $2, contrasena = $3, rol = $4, telefono = $5 WHERE id_usuario = $6 RETURNING *',
        [nombre, correo, contrasena, rol, telefono, id]
    );
    return res.rows[0];
};

//Función para eliminar un usuario
const deleteUser = async (id) => {
    const res = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [id]);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};