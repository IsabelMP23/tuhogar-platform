const propiedadModel = require('../models/propiedadModel');

// Controladores para manejar las rutas de propiedades
const getAllProperties = async (req, res) => {
    try {
        const propiedades = await propiedadModel.getAllProperties();
        res.json(propiedades);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener las propiedades'});
    }   
};

const getPropertyById = async (req, res) => {
    const { id } = req.params;
    try {
        const propiedad = await propiedadModel.getPropertyById(id);
        if (propiedad) {
            res.json(propiedad);
        } else {
            res.status(404).json({error: 'Propiedad no encontrada'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al obtener la propiedad'});
    }
};

const getPropertyDetailsById = async (req, res) => {
    const { id } = req.params;
    try {
        const detalles = await propiedadModel.getPropertyDetailsById(id);
        if (detalles) {
            res.json(detalles);
        } else {
            res.status(404).json({error: 'Detalles de propiedad no encontrados'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los detalles de la propiedad'});
    }
};

const createProperty = async (req, res) => {
    const newProperty = req.body;
    try {
        const createdProperty = await propiedadModel.createProperty(newProperty);
        res.status(201).json(createdProperty);
    } catch (error) {
        res.status(500).json({
            error: 'Error al crear la propiedad'
        }); 
    }
};

const updateProperty = async (req, res) => {
    const { id } = req.params;
    const updatedProperty = req.body;
    try {
        const result = await propiedadModel.updateProperty(id, updatedProperty);
        if (result) {
            res.json(result, {message: 'Propiedad actualizada correctamente'});
        } else {
            res.status(404).json({error: 'Propiedad no encontrada'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar la propiedad', detalles: error.message});
    }
};

const deleteProperty = async (req, res) => {
    const { id } = req.params;
    try {
        await propiedadModel.deleteProperty(id);
        res.json({message: 'Propiedad eliminada correctamente'});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la propiedad'});
    }
};

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    getPropertyDetailsById
};