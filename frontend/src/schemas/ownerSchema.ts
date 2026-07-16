import { z } from "zod";

export const ownerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters."),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters."),

  email: z
    .string()
    .email("Invalid email address."),

  phone: z
    .string()
    .min(6, "Phone number is required."),

  address: z
    .string()
    .min(5, "Address is required."),
});

export type OwnerFormValues = z.infer<typeof ownerSchema>;