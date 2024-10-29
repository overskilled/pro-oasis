import { z } from "zod";

export const addProductInputsSchemaValidate = () =>
    z
        .object({
            productName: z.string().min(1, { message: "Le nom du produit est requis" }),
            productCategory: z.string().min(1, { message: "La catégorie du produit est requise" }),
            productBrand: z.string().min(1, { message: "La marque du produit est requise" }),
            supplier: z.string().min(1, { message: "Le fournisseur est requis" }),
            unit: z.string().min(1, { message: "L'unité est requise" }),
            description: z
                .string()
                .min(1, { message: "La description est requise" })
                .max(60, { message: "La description ne doit pas dépasser 60 caractères" }),
            productType: z.string().min(1, { message: "Le type du produit est requis" }),
            taxType: z.string().min(1, { message: "Le type de taxe est requis" }),

            quantity: z
                .string()
                .min(1, { message: "La quantité est requise" })
                .regex(/^\d+$/, { message: "La quantité doit être un nombre" }),
            price: z
                .string()
                .min(1, { message: "Le prix est requis" })
                .regex(/^\d+(\.\d{1,2})?$/, { message: "Le prix doit être un nombre valide" }),
            alertQuantity: z
                .string()
                .min(1, { message: "La quantité d'alerte est requise" })
                .regex(/^\d+$/, { message: "La quantité d'alerte doit être un nombre" }),

            // Optional fields
            discountType: z.string().optional(),
            discountValue: z.string().optional(),
            manufacturedDate: z.string().optional(),
            expireDate: z.string().optional(),

            // Image field required as a File
            image: z.instanceof(File).refine(file => file.size > 0, {
                message: "L'image est requise",
            }),
        })
        .refine(
            (data) =>
                !data.expireDate ||
                !data.manufacturedDate ||
                new Date(data.expireDate) > new Date(data.manufacturedDate),
            {
                message: "La date d'expiration doit être après la date de fabrication",
                path: ["expireDate"],
            }
        );
