import { z } from "zod";

export const veterinarianSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters."),

  specialty: z
    .string()
    .min(2, "Specialty is required."),

  licenseNo: z
    .string()
    .min(2, "License number is required."),

  workHours: z
    .string()
    .min(1, "Work hours are required."),
});

export type VeterinarianFormValues = z.infer<typeof veterinarianSchema>;