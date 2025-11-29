const supabase = require("../db/db");

//Función para obtener todas las propiedades
const getAllProperties = async () => {
  const { data, error } = await supabase.from("propiedades").select("*");

  if (error) throw new Error(error.message);
  return data;
};

//Funcion para obtener las propiedades con paginación
const getPropertiesPaginated = async (page = 1, limit = 10) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("propiedades")
    .select(
      `
            id_propiedad,
            titulo,
            descripcion,
            tipo,
            precio,
            estado,
            imagen_principal,
            fecha_publicacion,
            detalles_propiedad(
                cuartos,
                banos
            ),
            ubicaciones(
                direccion,
                ciudad,
                colonia
            )
        `,
      { count: "exact" }
    )
    .range(from, to)
    .order("fecha_publicacion", { ascending: false });

  if (error) throw new Error(error.message);
  if (!data) return { data: [], count: 0 };

  const propiedadesLimpias = data.map((p) => {
    const detalles = Array.isArray(p.detalles_propiedad)
      ? p.detalles_propiedad[0]
      : p.detalles_propiedad;

    const ubicacion = Array.isArray(p.ubicaciones)
      ? p.ubicaciones[0]
      : p.ubicaciones;

    return {
      ...p,
      detalles_propiedad: detalles || null,
      ubicaciones: ubicacion || null,
    };
  });
  
  return { data: propiedadesLimpias, count };
};

//Función para obtener una propiedad por su ID
const getPropertyById = async (id) => {
  const { data, error } = await supabase
    .from("propiedades")
    .select("*")
    .eq("id_propiedad", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

//Funcion para obtener los detalles de una propiedad por su ID
const getPropertyDetailsById = async (id) => {
  const { data, error } = await supabase
    .from("propiedades")
    .select(
      `
            id_propiedad,
            titulo,
            descripcion,
            tipo,
            precio,
            estado,
            imagen_principal,
            fecha_publicacion,
            detalles_propiedad(
                area_construida,
                cuartos,
                banos,
                estacionamientos,
                pisos,
                amenidades,
                servicios,
                imagenes_adicionales
            ),
            ubicaciones(
                direccion,
                ciudad,
                colonia,
                codigo_postal,
                latitud,
                longitud
            )
        `
    )
    .eq("id_propiedad", id)
    .single();

  if (error) throw new Error(error.message);

  if (!data) return null;

  const detalles = Array.isArray(data.detalles_propiedad)
    ? data.detalles_propiedad[0]
    : data.detalles_propiedad;
  const ubicacion = Array.isArray(data.ubicaciones)
    ? data.ubicaciones[0]
    : data.ubicaciones;

  return {
    id_propiedad: data.id_propiedad,
    titulo: data.titulo,
    descripcion: data.descripcion,
    tipo: data.tipo,
    precio: data.precio,
    estado: data.estado,
    imagen_principal: data.imagen_principal,
    fecha_publicacion: data.fecha_publicacion,
    ...(detalles && { ...detalles }),
    ...(ubicacion && { ...ubicacion }),
  };
};

//Función para crear una nueva propiedad
const createProperty = async (property) => {
  const { data, error } = await supabase
    .from("propiedades")
    .insert(property)
    .select()
    .single();

  if (error) throw error;
  return data;
};

//Función para actualizar una propiedad
const updateProperty = async (id, property) => {
  const { data, error } = await supabase
    .from("propiedades")
    .update(property)
    .eq("id_propiedad", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// Eliminar una propiedad
const deleteProperty = async (id) => {
  const { data, error } = await supabase
    .from("propiedades")
    .delete()
    .eq("id_propiedad", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyDetailsById,
  getPropertiesPaginated,
};
