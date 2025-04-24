import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  message: z.string().min(1, { message: "El mensaje es requerido" })
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
