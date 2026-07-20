import { z } from "zod";

export const visitSchema = z.object({
  petId: z
    .number()
    .positive("Pet is required."),

  vetId: z
    .number()
    .positive("Veterinarian is required."),

  scheduledAt: z
    .string()
    .min(
      1,
      "Appointment date and time is required."
    ),

  chiefComplaint: z
    .string()
    .trim()
    .min(
      3,
      "Chief complaint must be at least 3 characters."
    )
    .max(
      500,
      "Chief complaint cannot exceed 500 characters."
    ),
});

export type VisitFormData =
  z.infer<typeof visitSchema>;