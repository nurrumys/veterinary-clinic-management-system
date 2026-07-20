import { z } from "zod";

export const petSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters."),

  species: z
    .string()
    .trim()
    .min(2, "Species is required."),

  breed: z
    .string()
    .trim()
    .min(2, "Breed is required."),

  birthDate: z
    .string()
    .min(1, "Birth date is required."),

  ownerId: z
    .number()
    .positive("Owner is required."),
});

export type PetFormValues = z.infer<typeof petSchema>;