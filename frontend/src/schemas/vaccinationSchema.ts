import { z } from "zod";

export const vaccinationSchema = z.object({
  petId: z
    .number()
    .positive("Please select a pet."),

  vaccineType: z
    .string()
    .trim()
    .min(2, "Vaccine type must be at least 2 characters.")
    .max(100, "Vaccine type cannot exceed 100 characters."),

  administeredAt: z
    .string()
    .min(1, "Administration date is required."),

  lotNumber: z
    .string()
    .trim()
    .min(1, "Lot number is required.")
    .max(100, "Lot number cannot exceed 100 characters."),

  administeredBy: z
    .string()
    .trim()
    .min(2, "Administrator name must be at least 2 characters.")
    .max(100, "Administrator name cannot exceed 100 characters."),
});

export type VaccinationFormValues = z.infer<
  typeof vaccinationSchema
>;