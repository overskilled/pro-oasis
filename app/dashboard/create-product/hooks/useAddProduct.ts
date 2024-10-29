import { AddProductFormInputs } from "../validators/AddProductInputs";
import { useAddProductBrand, UseAddProductBrandBehaviour } from "./useAddProductBrand";
import { useAddProductCategory, UseAddProductCategoryBehaviour } from "./useAddProductCategory";
import { useAddProductUnit, UseAddProductUnitbehaviour } from "./useAddProductUnit";
import { useAddSupplier, UseAddSupplierBehaviour } from "./useAddSupplier";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductInputsSchemaValidate } from "../validators/addProductInputsSchemaValidate";
import { OptionsSelect } from "@/lib/utils";
import { toast } from "react-toastify";
import { useEffect, useState, useTransition } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

export interface UseAddProductBehaviour {
  addProductBrandBehaviour: UseAddProductBrandBehaviour;
  addProductCategoryBehaviour: UseAddProductCategoryBehaviour;
  addProductUnitBehaviour: UseAddProductUnitbehaviour;
  addSupplierBehaviour: UseAddSupplierBehaviour;
  form: UseFormReturn<AddProductFormInputs>;
  isPending: boolean;
  onSubmit: (data: AddProductFormInputs) => void;
  imagePreviewUrl: string | null;
}

export const useAddProduct = (): UseAddProductBehaviour => {
  const addProductBrandBehaviour = useAddProductBrand();
  const addProductCategoryBehaviour = useAddProductCategory();
  const addProductUnitBehaviour = useAddProductUnit();
  const addSupplierBehaviour = useAddSupplier();

  const [isPending, startTransition] = useTransition();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const form = useForm<AddProductFormInputs>({
    resolver: zodResolver(addProductInputsSchemaValidate()),
  });

  const imageFile = form.watch("image");

  // Utility functions for selected values
  const getSelectedOption = (
      options: OptionsSelect[],
      selectedValue: string
  ): OptionsSelect =>
      options.find((option) => option.value === selectedValue) ?? options[0];

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
      discountValue: "",
      image: null,
    });
    setImagePreviewUrl(null);
  };

  // const onSubmit = (data: AddProductFormInputs) => {
  //   startTransition(async () => {
  //     try {
  //       let imageUrl = "";
  //
  //       if (data.image instanceof File) {
  //         const imageRef = ref(storage, `product-images/${data.image.name}`);
  //         const uploadResult = await uploadBytes(imageRef, data.image);
  //         imageUrl = await getDownloadURL(uploadResult.ref);
  //       } else {
  //         console.warn("No valid image file detected.");
  //       }
  //
  //       const addedProduct = await addDoc(collection(firestore, "products"), {
  //         productName: data.productName,
  //         productCategory: getSelectedOption(
  //             addProductCategoryBehaviour.productCategories,
  //             data.productCategory
  //         ).text,
  //         productBrand: getSelectedOption(
  //             addProductBrandBehaviour.allProductsBrands,
  //             data.productBrand
  //         ).text,
  //         description: data.description,
  //         quantity: +data.quantity,
  //         price: +data.price,
  //         alertQuantity: +data.alertQuantity,
  //         unit: getSelectedOption(
  //             addProductUnitBehaviour.allProductsUnits,
  //             data.unit
  //         ).text,
  //         supplier: getSelectedOption(
  //             addSupplierBehaviour.allSuppliers,
  //             data.supplier
  //         ).text,
  //         imageUrl,
  //         manufacturedDate: data.manufacturedDate || null,
  //         expireDate: data.expireDate || null,
  //       });
  //
  //       console.log("Product added with ID:", addedProduct.id);
  //       clearForm();
  //       toast("Produit enregistré avec succès");
  //     } catch (error) {
  //       toast.error("Erreur lors de l'enregistrement du produit");
  //       console.error("Error adding product:", error);
  //     }
  //   });
  // };
  const onSubmit = async (data:AddProductFormInputs) => {
    console.log("Submitting data: ", data);
    try {
      // API call logic
    } catch (error) {
      console.error("Submission error: ", error);
    }
  };
  useEffect(() => {
    if (imageFile instanceof File) {
      const newImageUrl = URL.createObjectURL(imageFile);
      setImagePreviewUrl(newImageUrl);

      return () => URL.revokeObjectURL(newImageUrl);
    } else {
      setImagePreviewUrl(null);
    }
  }, [imageFile]);

  return {
    addProductBrandBehaviour,
    addProductCategoryBehaviour,
    addProductUnitBehaviour,
    addSupplierBehaviour,
    form,
    isPending,
    onSubmit,
    imagePreviewUrl,
  };
};
