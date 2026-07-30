import { z } from "zod";

export const supportSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required."),

  message: z
    .string()
    .trim()
    .min(1, "Message is required."),
});

export type SupportFormValues = z.infer<
  typeof supportSchema
>;