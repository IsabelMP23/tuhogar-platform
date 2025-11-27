import { PropertySchema } from "../schemas/propiedades";
import {PropertyDetailSchema} from "../schemas/propiedadesDetalles";

const API_URL = "https://tuhogar-platform-production.up.railway.app/api/propiedades";

export async function fetchPropiedades() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const parsed = PropertySchema.array().safeParse(data);
  if (!parsed.success) {
    console.error("Error validando propiedades:", parsed.error);
    return [];
  }

  return parsed.data;
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