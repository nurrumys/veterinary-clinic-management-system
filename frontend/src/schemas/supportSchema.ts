import { z } from "zod";

export const supportSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(100, "Subject must be at most 100 characters"),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(4000, "Message must be at most 4000 characters"),
});

export type SupportFormValues = z.infer<typeof supportSchema>;