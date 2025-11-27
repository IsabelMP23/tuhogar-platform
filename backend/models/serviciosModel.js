const supabase = require('../db/db');

//Función para obtener todos los servicios  
const getAllServices = async () => {
    const { data, error } = await supabase
        .from('servicios')
        .select('*');

    if (error) throw new Error(error.message);
    return data;
};

//Función para obtener un servicio por su ID
const getServiceById = async (id) => {
    const { data, error } = await supabase
        .from('servicios')
        .select('*')
        .eq('id_servicio', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

//Función para crear un nuevo servicio
const createService = async (service) => {
    const { nombre, descripcion, icono } = service;
    const { data, error } = await supabase
        .from('servicios')
        .insert([{ nombre, descripcion, icono }])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

//Función para actualizar un servicio
const updateService = async (id, service) => {
    const { nombre, descripcion, icono } = service;
    const { data, error } = await supabase
        .from('servicios')
        .update({ nombre, descripcion, icono })
        .eq('id_servicio', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

//Función para eliminar un servicio
const deleteService = async (id) => {
    const { data, error } = await supabase
        .from('servicios')
        .delete()
        .eq('id_servicio', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};


module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};  