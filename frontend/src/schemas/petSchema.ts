import { z } from "zod";

export const petSchema = z.object({
  ownerId: z
    .number()
    .positive("Owner is required."),

  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters."),

  species: z
    .string()
    .trim()
    .min(1, "Species is required."),

  breed: z
    .string()
    .trim(),

  speciesNote: z.string().nullable(),

  birthDate: z
    .string()
    .min(1, "Birth date is required."),

  sex: z
    .string()
    .trim()
    .min(1, "Sex is required."),

  weightKg: z
    .number()
    .positive("Weight must be greater than 0."),

  allergies: z.string().nullable(),

  chronicConditions: z.string().nullable(),
});

export type PetFormValues = z.infer<typeof petSchema>;