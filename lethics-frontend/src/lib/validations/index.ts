import { z } from "zod";

export const LoginSchema = z.object({
  correo: z
    .string()
    .min(1, "El correo electrónico es requerido.")
    .email("Ingresa un correo electrónico válido."),
  contrasena: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegistroPaso1Schema = z.object({
  nombreCompleto: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(80, "El nombre no puede exceder 80 caracteres.")
});

export const RegistroPaso2Schema = z.object({
  correo: z
    .string()
    .min(1, "El correo electrónico es requerido.")
    .email("Ingresa un correo institucional o personal válido.")
});

export const RegistroPaso3Schema = z
  .object({
    contrasena: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula.")
      .regex(/[0-9]/, "Debe contener al menos un número."),
    confirmarContrasena: z.string().min(1, "Confirma tu contraseña."),
    rol: z.enum(["estudiante", "profesionista", "casual"])
  })
  .refine((data) => data.contrasena === data.confirmarContrasena, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarContrasena"]
  });

export const RegistroCompletoSchema = z
  .object({
    nombreCompleto: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres.")
      .max(80, "El nombre no puede exceder 80 caracteres."),
    correo: z
      .string()
      .min(1, "El correo electrónico es requerido.")
      .email("Ingresa un correo electrónico válido."),
    contrasena: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula.")
      .regex(/[0-9]/, "Debe contener al menos un número."),
    confirmarContrasena: z.string(),
    rol: z.enum(["estudiante", "profesionista", "casual"])
  })
  .refine((data) => data.contrasena === data.confirmarContrasena, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarContrasena"]
  });

export type RegistroCompletoFormData = z.infer<typeof RegistroCompletoSchema>;

export const RecuperarContrasenaSchema = z.object({
  correo: z
    .string()
    .min(1, "El correo electrónico es requerido.")
    .email("Ingresa un correo electrónico válido.")
});

export type RecuperarContrasenaFormData = z.infer<typeof RecuperarContrasenaSchema>;

export const VerificarCorreoSchema = z.object({
  codigo: z
    .string()
    .length(6, "El código de verificación consta de exactamente 6 dígitos.")
    .regex(/^[0-9]+$/, "El código solo debe contener números.")
});

export type VerificarCorreoFormData = z.infer<typeof VerificarCorreoSchema>;

export const SimuladorRespuestaSchema = z.object({
  textoRespuesta: z
    .string()
    .min(40, "Tu análisis reflexivo debe tener al menos 40 caracteres para una evaluación significativa.")
    .max(2500, "Tu respuesta no debe exceder los 2500 caracteres.")
});

export type SimuladorRespuestaFormData = z.infer<typeof SimuladorRespuestaSchema>;

export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed"
];

export const ProyectoEntregaSchema = z
  .object({
    titulo: z
      .string()
      .min(5, "El título del proyecto debe tener al menos 5 caracteres.")
      .max(120, "El título no puede exceder 120 caracteres."),
    descripcion: z
      .string()
      .min(30, "La justificación y descripción técnica debe tener al menos 30 caracteres.")
      .max(2000, "La descripción no puede exceder 2000 caracteres."),
    enlaceRepositorio: z
      .string()
      .url("Ingresa una URL válida de repositorio (GitHub, GitLab, etc.).")
      .optional()
      .or(z.literal("")),
    archivoNombre: z.string().optional()
  })
  .refine(
    (data) => (data.enlaceRepositorio && data.enlaceRepositorio.trim().length > 0) || data.archivoNombre,
    {
      message: "Debes adjuntar un archivo (PDF/ZIP) o proporcionar un enlace a tu repositorio.",
      path: ["enlaceRepositorio"]
    }
  );

export type ProyectoEntregaFormData = z.infer<typeof ProyectoEntregaSchema>;
