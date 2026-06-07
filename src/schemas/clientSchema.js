import { z } from "zod";

export const registerClientSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Informe seu nome completo."),

    document: z
      .string()
      .min(11, "Informe um CPF válido."),

    email: z
      .string()
      .email("Informe um e-mail válido."),

    phone: z
      .string()
      .min(10, "Informe um telefone válido."),

    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres."),

    confirmPassword: z
      .string()
      .min(6, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });