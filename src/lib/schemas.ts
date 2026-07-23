import { z } from 'zod';

export const categoryCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100, 'Máximo 100 caracteres'),
  slug: z
    .string()
    .min(1)
    .max(100)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
  description: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
});

export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;

export const photoCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .max(200, 'Máximo 200 caracteres'),
  description: z
    .string()
    .max(2000, 'Máximo 2000 caracteres')
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
  r2_object_key: z
    .string()
    .min(1, 'La object key es requerida')
    .max(1024, 'Máximo 1024 caracteres'),
  image_url: z
    .string()
    .min(1, 'La URL de imagen es requerida')
    .url('Debe ser una URL válida')
    .max(2048, 'Máximo 2048 caracteres'),
  category_id: z.string().uuid('Seleccioná una categoría válida'),
  spotify_url: z
    .string()
    .url('Debe ser una URL de Spotify válida')
    .max(2048)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
  taken_at: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
  location: z
    .string()
    .max(255, 'Máximo 255 caracteres')
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
  favorite: z.boolean().default(false),
});

export type PhotoCreateInput = z.infer<typeof photoCreateSchema>;
