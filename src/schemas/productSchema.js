import { z } from "zod";

const pricingSchema = z
  .object({
    showPrice: z.boolean(),

    value: z
      .union([
        z.number(),
        z.null(),
      ]),

    label: z
      .string()
      .min(2, "Informe o rótulo do preço."),
  })
  .refine(
    (data) => {
      if (data.showPrice) {
        return typeof data.value === "number" && data.value > 0;
      }

      return data.value === null;
    },
    {
      message: "Informe um valor válido ou desative a exibição do preço.",
      path: ["value"],
    }
  );

const mediaSchema = z.object({
  images: z.array(z.string()).max(5, "Máximo de 5 imagens."),
  videos: z.array(z.string()).max(2, "Máximo de 2 vídeos."),
});

const availabilitySchema = z.object({
  requiresBookingDate: z.boolean(),
  unavailableDates: z.array(z.string()),
});

export const createProductSchema = z.object({
  title: z
    .string()
    .min(3, "Informe o título do produto ou serviço."),

  description: z
    .string()
    .min(10, "Informe uma descrição mais detalhada.")
    .max(5000, "A descrição deve ter no máximo 5000 caracteres."),

  categories: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma categoria."),

  pricing: pricingSchema,

  pricingNotes: z
    .string()
    .max(1000, "As observações devem ter no máximo 1000 caracteres.")
    .optional(),

  media: mediaSchema,

  availability: availabilitySchema,

  isActive: z.boolean(),
});

export const updateProductSchema = createProductSchema;