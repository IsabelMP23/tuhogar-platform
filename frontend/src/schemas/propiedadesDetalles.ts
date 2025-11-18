import { z } from "zod";

export const PropertyDetailSchema = z.object({
  id_propiedad: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  tipo: z.enum(["departamento", "casa", "terreno", "local"]),
  precio: z.string().transform(Number),
  estado: z.enum(["disponible", "vendida", "rentada"]),
  imagen_principal: z.string(),
  fecha_publicacion: z.string(),

  area_construida: z.string().transform(Number),
  cuartos: z.number(),
  banos: z.number(),
  estacionamientos: z.number(),
  pisos: z.number(),

  amenidades: z.array(z.string()),
  servicios: z.array(z.string()),
  imagenes_adicionales: z.array(z.string()),

  direccion: z.string(),
  ciudad: z.string(),
  colonia: z.string(),
  codigo_postal: z.string(),

  latitud: z.string(),
  longitud: z.string()
});

export type PropertyDetail = z.infer<typeof PropertyDetailSchema>;