import { z } from "zod";

export const registerCompanySchema = z
  .object({
    companyName: z.string().min(2, "Informe o nome da empresa."),

    cnpj: z.string().min(14, "Informe um CNPJ válido."),

    categories: z
      .array(z.string())
      .min(1, "Selecione pelo menos uma categoria."),

    email: z.string().email("Informe um e-mail válido."),

    phone: z.string().min(10, "Informe um telefone válido."),

    zipCode: z.string().min(8, "Informe um CEP válido."),

    street: z.string().min(2, "Informe a rua."),

    number: z.string().min(1, "Informe o número."),

    neighborhood: z.string().min(2, "Informe o bairro."),

    city: z.string().min(2, "Informe a cidade."),

    state: z.string().min(2, "Informe o estado."),

    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),

    confirmPassword: z.string().min(6, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });

export const updateCompanySchema = z.object({
  companyName: z.string().min(2, "Informe o nome da empresa."),

  phone: z.string().min(10, "Informe um telefone válido."),

  whatsapp: z.string().min(10, "Informe um WhatsApp válido."),

  categories: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma categoria."),

  description: z
    .string()
    .max(1000, "A descrição deve ter no máximo 1000 caracteres."),

  instagram: z.string().optional(),

  website: z.string().optional(),

  address: z.object({
    zipCode: z.string().min(8, "Informe um CEP válido."),

    street: z.string().min(2, "Informe a rua."),

    number: z.string().min(1, "Informe o número."),

    neighborhood: z.string().min(2, "Informe o bairro."),

    city: z.string().min(2, "Informe a cidade."),

    state: z.string().min(2, "Informe o estado."),
  }),
});