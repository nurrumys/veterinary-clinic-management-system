import { z } from "zod";

export const supportSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required.")
    .max(100, "Subject cannot exceed 100 characters."),

  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(4000, "Message cannot exceed 4000 characters."),
});

export type SupportFormValues = z.infer<
  typeof supportSchema
>;