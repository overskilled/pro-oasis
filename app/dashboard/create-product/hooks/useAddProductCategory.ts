import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore"; // Firestore functions
import { useEffect, useState, useTransition } from "react";
import { firestore } from "@/firebase/config"; // Firebase Firestore config
import { ModalBehavior, useModal } from "@/hooks/useModal";
import { OptionsSelect } from "@/lib/utils";

export interface UseAddProductCategoryBehaviour {
  addCategoryModal: ModalBehavior;
  productCategory?: string;
  handleChangeProductCategory: (value: string) => void;
  productCategories: OptionsSelect[];
  isPending: boolean;
  addNewProductCategory: () => void;
  cancelAddNewProductCategory: () => void;
}

export const useAddProductCategory = (): UseAddProductCategoryBehaviour => {
  const addCategoryModal = useModal();

  const [productCategory, setProductCategory] = useState<string>();

  const [productCategories, setProductCategories] = useState<OptionsSelect[]>([]);

  const [isPending, startTransition] = useTransition();

  const handleChangeProductCategory = (value: string) => {
    setProductCategory(value);
  };

  const addNewProductCategory = async () => {
    startTransition(async () => {
      try {
        await addDoc(collection(firestore, "product-categories"), {
          name: productCategory,
          description: "",
        });
        // Fetch updated categories immediately after adding a new category
        await getAllProductCategories();
        setProductCategory(undefined);
        addCategoryModal.close();
      } catch (error) {
        console.error("Error adding category: ", error);
      }
    });
  };

  const cancelAddNewProductCategory = () => {
    setProductCategory(undefined);
    addCategoryModal.close();
  };

  const getAllProductCategories = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "product-categories")
      );
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        ...doc.data(),
      }));

      const formattedCategories = categories.map((category) => ({
        id: category.id,
        text: category.name,
        value: category.id,
      }));
      setProductCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    getAllProductCategories();

    // Realtime updates
    const unsubscribe = onSnapshot(
      collection(firestore, "product-categories"),
      () => {
        getAllProductCategories();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    addCategoryModal,
    productCategory,
    handleChangeProductCategory,
    productCategories,
    isPending,
    addNewProductCategory,
    cancelAddNewProductCategory,
  };
};
