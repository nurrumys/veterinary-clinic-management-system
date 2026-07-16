import { z } from "zod";

export const petSchema = z.object({
  ownerId: z
    .number()
    .positive("Owner is required."),

  name: z
    .string()
    .min(2, "Pet name must be at least 2 characters."),

  species: z
    .string()
    .min(1, "Species is required."),

  breed: z
    .string()
    .min(2, "Breed is required."),

  speciesNote: z
    .string()
    .nullable(),

  birthDate: z
    .string()
    .min(1, "Birth date is required."),

  sex: z
    .string()
    .min(1, "Sex is required."),

  weightKg: z
    .number()
    .positive("Weight must be greater than 0."),

  allergies: z
    .string()
    .nullable(),

  chronicConditions: z
    .string()
    .nullable(),
});

export type PetFormValues = z.infer<typeof petSchema>;