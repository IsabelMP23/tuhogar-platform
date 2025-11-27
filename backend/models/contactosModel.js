const supabase = require('../db/db');

//Función para obtener todos los contactos
const getAllContacts = async () => {
    const { data, error } = await supabase
        .from('contactos')
        .select('*');
    if (error) {
        throw new Error(error.message);
    }    
    return data;
};

//Función para obtener un contacto por su ID
const getContactById = async (id) => {
    const { data, error } = await supabase
        .from('contactos')
        .select('*')
        .eq('id_contacto', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

//Función para crear un nuevo contacto
const createContact = async (contact) => {
    const { data, error } = await supabase
        .from('contactos')
        .insert([contact])
        .select()
        .single(); 

    if (error) throw new Error(error.message);
    return data;
};

//Función para actualizar un contacto
const updateContact = async (id, contact) => {
    const { estado } = contact;
    const { data, error } = await supabase
        .from('contactos')
        .update({ estado })
        .eq('id_contacto', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

//Función para eliminar un contacto
const deleteContact = async (id) => {
    const { data, error } = await supabase
        .from('contactos')
        .delete()
        .eq('id_contacto', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};


module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
};