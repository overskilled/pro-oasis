"use client"
import { AddProductFormInputs } from "../validators/AddProductInputs";
import {
  useAddProductBrand,
  UseAddProductBrandBehaviour,
} from "./useAddProductBrand";
import {
  useAddProductCategory,
  UseAddProductCategoryBehaviour,
} from "./useAddProductCategory";
import {
  useAddProductUnit,
  UseAddProductUnitbehaviour,
} from "./useAddProductUnit";
import { useAddSupplier, UseAddSupplierBehaviour } from "./useAddSupplier";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductInputsSchemaValidate } from "../validators/addProductInputsSchemaValidate";
import { OptionsSelect } from "@/lib/utils";
import { toast } from "react-toastify";
import {useEffect, useState, useTransition} from "react";
import { addDoc, collection } from "firebase/firestore";
import {firestore, storage} from "@/firebase/config";
import {getDownloadURL, ref, uploadBytes} from "@firebase/storage";

export interface UseAddProductBehaviour {
  addProductBrandBehaviour: UseAddProductBrandBehaviour;
  addProductCategoryBehaviour: UseAddProductCategoryBehaviour;
  addProductUnitBehaviour: UseAddProductUnitbehaviour;
  addSupplierBehaviour: UseAddSupplierBehaviour;
  form: UseFormReturn<AddProductFormInputs>;
  isPending: boolean;
  onSubmit: (data: AddProductFormInputs) => void;
  imagePreviewUrl: string | null
}

export const useAddProduct = (): UseAddProductBehaviour => {
  const addProductBrandBehaviour = useAddProductBrand();
  const addProductCategoryBehaviour = useAddProductCategory();
  const addProductUnitBehaviour = useAddProductUnit();
  const addSupplierBehaviour = useAddSupplier();

  const [isPending, startTransition] = useTransition();


  const form = useForm<AddProductFormInputs>({
    resolver: zodResolver(addProductInputsSchemaValidate()),
  });

  const imageFile = form.watch("image"); // Watch the image field from React Hook Form
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const selectedProductCategory = (): OptionsSelect => {
    return (
      addProductCategoryBehaviour.productCategories.find(
        (option) => option.value === form.watch("productCategory")
      ) ?? addProductCategoryBehaviour.productCategories[0]
    );
  };

  const selectedProductBrand = (): OptionsSelect => {
    return (
      addProductBrandBehaviour.allProductsBrands.find(
        (option) => option.value === form.watch("productBrand")
      ) ?? addProductBrandBehaviour.allProductsBrands[0]
    );
  };

  const selectedProductUnit = (): OptionsSelect => {
    return (
      addProductUnitBehaviour.allProductsUnits.find(
        (option) => option.value === form.watch("unit")
      ) ?? addProductUnitBehaviour.allProductsUnits[0]
    );
  };

  const selectedSupplier = (): OptionsSelect => {
    return (
      addSupplierBehaviour.allSuppliers.find(
        (option) => option.value === form.watch("supplier")
      ) ?? addSupplierBehaviour.allSuppliers[0]
    );
  };

  const clearForm = () => {
    form.reset({
      alertQuantity: "",
      description: "",
      expireDate: "",
      manufacturedDate: "",
      price: "",
      productBrand: "",
      productCategory: "",
      productName: "",
      quantity: "",
      supplier: "",
      unit: "",
      productType: "",
      taxType: "",
      discountType: "",
      discountValue: ""
    });
  };

  const onSubmit = (data: AddProductFormInputs) => {
    startTransition(async () => {
      try {
        let imageUrl = "";

        // Upload image if it exists
        if (data.image) {
          const imageRef = ref(storage, `product-images/${data.image.name}`);
          const uploadResult = await uploadBytes(imageRef, data.image);
          imageUrl = await getDownloadURL(uploadResult.ref);
        }

        // Add product data to Firestore
        await addDoc(collection(firestore, "products"), {
          productName: data.productName,
          productCategory: selectedProductCategory().text,
          productBrand: selectedProductBrand().text,
          description: data.description,
          quantity: +data.quantity,
          price: +data.price,
          alertQuantity: +data.alertQuantity,
          unit: selectedProductUnit().text,
          supplier: selectedSupplier().text,
          imageUrl,
          manufacturedDate: data.manufacturedDate === "" ? null : data.manufacturedDate,
          expireDate: data.expireDate === "" ? null : data.expireDate,
        });

        clearForm();
        toast("Produit enregistré avec succès");
      } catch (error) {
        toast.error("Erreur lors de l'enregistrement du produit");
        console.error("Error adding product: ", error);
      }
    });
  };

  useEffect(() => {
    if (imageFile instanceof File) {
      const newImageUrl = URL.createObjectURL(imageFile);
      setImagePreviewUrl(newImageUrl);

      // Cleanup the object URL to avoid memory leaks
      return () => {
        URL.revokeObjectURL(newImageUrl);
      };
    } else {
      setImagePreviewUrl(null); // Reset preview if no valid file
    }
  }, [imageFile]);
  console.log(imagePreviewUrl)

  return {
    addProductBrandBehaviour,
    addProductCategoryBehaviour,
    addProductUnitBehaviour,
    addSupplierBehaviour,
    form,
    isPending,
    onSubmit,
    imagePreviewUrl
  };
};
