import { useEffect, useState, useTransition } from "react";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { ModalBehavior, useModal } from "@/hooks/useModal";
import { OptionsSelect } from "@/lib/utils";
import { firestore } from "@/firebase/config";

export interface UseAddProductBrandBehaviour {
  addBrandModal: ModalBehavior;
  productBrand?: string;
  handleChangeProductBrand: (value: string) => void;
  allProductsBrands: OptionsSelect[];
  isPending: boolean;
  addNewProductBrand: () => void;
  cancelAddNewProductBrand: () => void;
}

export const useAddProductBrand = (): UseAddProductBrandBehaviour => {
  const addBrandModal = useModal();

  const [productBrand, setProductBrand] = useState<string>();

  const [allProductsBrands, setAllProductsBrands] = useState<OptionsSelect[]>([]);

  const [isPending, startTransition] = useTransition();

  const handleChangeProductBrand = (value: string) => {
    setProductBrand(value);
  };

  const addNewProductBrand = async () => {
    startTransition(async () => {
      try {
        await addDoc(collection(firestore, "products-brands"), {
          name: productBrand,
          description: "",
        });
        // Fetch updated brands immediately after adding a new brand
        await getAllProductBrands();
        setProductBrand(undefined);
        addBrandModal.close();
      } catch (error) {
        console.error("Error adding brand: ", error);
      }
    });
  };

  const cancelAddNewProductBrand = () => {
    setProductBrand(undefined);
    addBrandModal.close();
  };

  const getAllProductBrands = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "products-brands")
      );
      const brands = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        ...doc.data(),
      }));

      const formattedBrands = brands.map((brand) => ({
        id: brand.id,
        text: brand.name,
        value: brand.id,
      }));
      setAllProductsBrands(formattedBrands);
    } catch (error) {
      console.error("Error fetching brands: ", error);
    }
  };

  useEffect(() => {
    getAllProductBrands();

    // Realtime updates
    const unsubscribe = onSnapshot(
      collection(firestore, "products-brands"),
      () => {
        getAllProductBrands();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    addBrandModal,
    productBrand,
    handleChangeProductBrand,
    allProductsBrands,
    addNewProductBrand,
    cancelAddNewProductBrand,
    isPending,
  };
};
