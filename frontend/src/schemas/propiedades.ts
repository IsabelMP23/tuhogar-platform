import { z } from "zod";

export const detallesPropiedadSchema = z.object({
  cuartos: z.number().min(0),
  banos: z.number().min(0),
});

export const ubicacionSchema = z.object({
  direccion: z.string(),
  ciudad: z.string(),
  colonia: z.string(),
});

export const PropertySchema = z.object({
 id_propiedad: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  tipo: z.enum(["casa", "departamento", "terreno", "local", "oficina"]),
  precio: z.number(),
  estado: z.enum(["disponible", "vendido", "rentado"]),
  imagen_principal: z.string().url(),
  fecha_publicacion: z.string(),
  detalles_propiedad: detallesPropiedadSchema.nullable(),
  ubicaciones: ubicacionSchema.nullable(),
});

export type Property = z.infer<typeof PropertySchema>;
