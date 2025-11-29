import { PropertySchema } from "../schemas/propiedades";
import {PropertyDetailSchema} from "../schemas/propiedadesDetalles";

const API_URL = "https://tuhogar-platform-production.up.railway.app/api/propiedades";

export async function fetchPropiedades(page = 1, limit = 10) {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  const data = await res.json();

  const parsed = PropertySchema.array().safeParse(data.data);
  if (!parsed.success) {
    console.error("Error validando propiedades:", parsed.error);
    return [];
  }

  return {
    propiedades: parsed.data,
    totalPage: data.totalPage,
    total: data.total,  
    page: data.page
  };
}

export async function fetchPropiedadById(id: string) {
  const res = await fetch(`${API_URL}/${id}/detalles`);
  const data = await res.json();

  const parsed = PropertyDetailSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Error validando propiedad por ID:", parsed.error);
    return null;
  }

  return parsed.data;
}

export async function fetchServicios() {
  const res = await fetch("https://tuhogar-platform-production.up.railway.app/api/servicios");
  const data = await res.json();
  return data; 
}

export async function createContacto(contact: { nombre: string; correo: string; telefono: string; mensaje: string }) {
  try {
    const res = await fetch("https://tuhogar-platform-production.up.railway.app/api/contactos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al crear contacto");
    } 

    return await res.json();
  } catch (error) {
    console.error("Error creando contacto:", error);
    throw error;
  }
}