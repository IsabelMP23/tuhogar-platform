const serviciosModel = require('../models/serviciosModel');

//Controlador para obtener todos los servicios
const getAllServices = async (req, res) => {
    try {
        const services = await serviciosModel.getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

//Controlador para obtener un servicio por su ID
const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await serviciosModel.getServiceById(id);
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ error: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el servicio' });
    }
};

//Controlador para crear un nuevo servicio
const createService = async (req, res) => {
    const newService = req.body;
    try {
        const createdService = await serviciosModel.createService(newService);
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
};

//Controlador para actualizar un servicio
const updateService = async (req, res) => {
    const { id } = req.params;
    const updatedService = req.body;
    try {
        const service = await serviciosModel.updateService(id, updatedService);
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ error: 'Servicio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
};

//Controlador para eliminar un servicio
const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        await serviciosModel.deleteService(id);
        res.json({message: 'Servicio eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};