const pool = require('../db/db');

//Función para obtener todas las propiedades
const getAllProperties = async () => {
    const res = await pool.query('SELECT * FROM propiedades');
    return res.rows;
};

//Función para obtener una propiedad por su ID
const getPropertyById = async (id) => {
    const res = await pool.query('SELECT * FROM propiedades WHERE id_propiedad = $1', [id]);
    return res.rows[0];
};

//Funcion para obtener los detalles de una propiedad por su ID
const getPropertyDetailsById = async (id) => {
    const res = await pool.query(
        `SELECT 
         p.id_propiedad, p.titulo, p.descripcion, p.tipo, p.precio, p.estado, p.imagen_principal, p.fecha_publicacion,
         d.area_construida, d.cuartos, d.banos, d.estacionamientos, d.pisos, d.amenidades, d.servicios, d.imagenes_adicionales,
         u.direccion, u.ciudad, u.colonia, u.codigo_postal, u.latitud, u.longitud
         FROM propiedades p
         JOIN detalles_propiedad d ON p.id_detalle = d.id_detalle
         JOIN ubicaciones u ON p.id_ubicacion = u.id_ubicacion
         WHERE p.id_propiedad = $1`,
        [id]
    );
    return res.rows[0];
};

//Función para crear una nueva propiedad
const createProperty = async (property) => {
    const { titulo, descripcion, tipo, precio, estado, imagen_principal, agente_id, id_ubicacion, id_detalle } = property;
    const res = await pool.query(
        'INSERT INTO propiedades (titulo, descripcion, tipo, precio, estado, imagen_principal, agente_id, id_ubicacion, id_detalle) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [titulo, descripcion, tipo, precio, estado, imagen_principal, agente_id, id_ubicacion, id_detalle]
    );
    return res.rows[0];
};

//Función para actualizar una propiedad
const updateProperty = async (id, property) => {
    const {titulo, descripcion, tipo, precio, estado, imagen_principal, agente_id, id_ubicacion, id_detalle, fecha_publicacion} = property;
    const res = await pool.query(
        'UPDATE propiedades SET titulo = $1, descripcion = $2, tipo = $3, precio = $4, estado = $5, imagen_principal = $6, agente_id = $7, id_ubicacion = $8, id_detalle = $9, fecha_publicacion = $10 WHERE id_propiedad = $11 RETURNING *',
        [titulo, descripcion, tipo, precio, estado, imagen_principal, agente_id, id_ubicacion, id_detalle, fecha_publicacion, id]
    );
    return res.rows[0];
};

//Función para eliminar una propiedad
const deleteProperty = async (id) => {
    const res = await pool.query('DELETE FROM propiedades WHERE id_propiedad = $1 RETURNING *', [id]);
    return res.rows[0];
};


module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyDetailsById,
};