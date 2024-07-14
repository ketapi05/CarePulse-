import {z} from "zod";

export const UserFormValidation = z.object({
    name: z.string()
    .min(2, "Minimum 2 characters required.")
    .max(50, "Maximum 50 characters allowed."),
    email: z.string().email("Invalid email address."),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),

  });