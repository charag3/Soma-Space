import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  message: z.string().min(5, "El mensaje es obligatorio"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida (formato YYYY-MM-DD)"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida (formato HH:MM)"),
  call_type: z.enum(["telefono", "videollamada"], {
    errorMap: () => ({ message: "Selecciona tipo de llamada" }),
  }),
  phone: z
    .string()
    .min(7, "Número de teléfono obligatorio para llamadas")
    .or(z.literal("")), // Permitimos vacío si es videollamada
  jitsi_url: z
    .string()
    .url("El enlace debe ser una URL válida")
    .optional()
    .or(z.literal("")), // Permitimos vacío
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;