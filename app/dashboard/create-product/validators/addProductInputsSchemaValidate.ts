import { z } from "zod";

export const addProductInputsSchemaValidate = () =>
  z
    .object({
      productName: z.string().min(1, { message: "Le nom du produit est requis" }),
      productCategory: z
        .string()
        .min(1, { message: "La catégorie du produit est requise" }),
      productBrand: z.string().min(1, { message: "La marque du produit est requise" }),
        productType: z.string().min(1, { message: "Le type du produit est requise" }),
        taxType: z.string().min(1, { message: "Le type du tax est requise" }),
        discountType: z.string().min(1, { message: "Le type du tax est requise" }),
        discountValue: z.string().min(1, { message: "la valeur de la reduction est requise" }),
      description: z
        .string()
        .min(1, { message: "La description est requise" })
        .max(60, {
          message: "La description ne doit pas dépasser 60 caractères",
        }),
      quantity: z
        .string()
        .min(1, { message: "La quantité est requise" })
        .regex(/^\d+$/, { message: "La quantité doit être un nombre" }),
      price: z
        .string()
        .min(1, { message: "Le prix est requis" })
        .regex(/^\d+(\.\d{1,2})?$/, {
          message: "Le prix doit être un nombre valide",
        }),
      alertQuantity: z
        .string()
        .min(1, { message: "La quantité d'alerte est requise" })
        .regex(/^\d+$/, { message: "La quantité d'alerte doit être un nombre" }),
      unit: z.string().min(1, { message: "L'unité est requise" }),
      supplier: z.string().min(1, { message: "Le fournisseur est requis" }),
      manufacturedDate: z.optional(
        z.string()
        // .min(1, { message: "La date de fabrication est requise" })
        // .regex(/^\d{4}-\d{2}-\d{2}$/, {
        //   message: "La date de fabrication doit être au format AAAA-MM-JJ",
        // })
      ),
      expireDate: z.optional(
        z.string()
        // .min(1, { message: "La date d'expiration est requise" })
        // .regex(/^\d{4}-\d{2}-\d{2}$/, {
        //   message: "La date d'expiration doit être au format AAAA-MM-JJ",
        // })
      ),
    })
    .refine(
      (data) =>
        !data.expireDate ||
        !data.manufacturedDate ||
        new Date(data.expireDate) > new Date(data.manufacturedDate),
      {
        message: "La date d'expiration doit être après la date de fabrication",
        path: ["expireDate"], // L'erreur sera affichée sur le champ expireDate
      }
    );
