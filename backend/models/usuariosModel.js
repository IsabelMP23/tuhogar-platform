const supabase = require('../db/db');

//Función para obtener todos los usuarios
const getAllUsers = async () => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) throw new Error(error.message);
    return data;
};

//Función para obtener un usuario por su ID
const getUserById = async (id) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id_usuario', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};



//Función para crear un nuevo usuario
const createUser = async (user) => {
    const { nombre, correo, contrasena, rol, telefono } = user;
    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nombre, correo, contrasena, rol, telefono }])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

//Función para actualizar un usuario
const updateUser = async (id, user) => {
    const { nombre, correo, contrasena, rol, telefono } = user;
    const { data, error } = await supabase
        .from('usuarios')
        .update({ nombre, correo, contrasena, rol, telefono })
        .eq('id_usuario', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

//Función para eliminar un usuario
const deleteUser = async (id) => {
    const { data, error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id_usuario', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};