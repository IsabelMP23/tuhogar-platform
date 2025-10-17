const usuariosModel = require('../models/usuariosModel');

//Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await usuariosModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;  
    try {
        const user = await usuariosModel.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

const createUser = async (req, res) => {
    const newUser = req.body;
    try {
        const createdUser = await usuariosModel.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
        const user = await usuariosModel.updateUser(id, updatedUser);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await usuariosModel.deleteUser(id);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};