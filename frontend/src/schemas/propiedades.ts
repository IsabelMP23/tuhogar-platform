import { z } from "zod";

export const PropertySchema = z.object({
  id_propiedad: z.number().int(),
  titulo: z.string(),
  descripcion: z.string().nullable(),
  tipo: z.enum(["departamento", "casa", "terreno", "local"]),
  precio: z.string().transform(Number),
  estado: z.enum(["disponible", "vendida", "rentada"]),
  imagen_principal: z.string(),
  agente_id: z.number().nullable(),
  id_ubicacion: z.number().nullable(),
  id_detalle: z.number().nullable(),
  fecha_publicacion: z.string(), 
});

export type Property = z.infer<typeof PropertySchema>;
