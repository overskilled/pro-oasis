import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore"; // Firestore functions
import { useEffect, useState, useTransition } from "react";
import { firestore } from "@/firebase/config"; // Firebase Firestore config
import { ModalBehavior, useModal } from "@/hooks/useModal";
import { OptionsSelect } from "@/lib/utils";

export interface UseAddProductUnitbehaviour {
  addUnitModal: ModalBehavior;
  productUnit?: string;
  handleChangeProductUnit: (value: string) => void;
  allProductsUnits: OptionsSelect[];
  addNewProductUnit: () => void;
  cancelAddNewProductUnit: () => void;
  isPending: boolean;
}

export const useAddProductUnit = (): UseAddProductUnitbehaviour => {
  const addUnitModal = useModal();

  const [productUnit, setProductUnit] = useState<string>();

  const handleChangeProductUnit = (value: string) => {
    setProductUnit(value);
  };

  const [allProductsUnits, setAllProductsUnits] = useState<OptionsSelect[]>([]);

  const [isPending, startTransition] = useTransition();

  const addNewProductUnit = async () => {
    startTransition(async () => {
      try {
        await addDoc(collection(firestore, "products-units"), {
          name: productUnit,
          description: "",
        });
        await getAllProductUnits();
        setProductUnit(undefined);
        addUnitModal.close();
      } catch (error) {
        console.error("Error adding product unit: ", error);
      }
    });
  };

  const cancelAddNewProductUnit = () => {
    setProductUnit(undefined);
    addUnitModal.close();
  };

  const getAllProductUnits = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "products-units")
      );
      const units = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        ...doc.data(),
      }));

      const formattedUnits = units.map((unit) => ({
        id: unit.id,
        text: unit.name,
        value: unit.id,
      }));

      setAllProductsUnits(formattedUnits);
    } catch (error) {
      console.error("Error fetching product units: ", error);
    }
  };

  useEffect(() => {
    getAllProductUnits();

    // Realtime updates
    const unsubscribe = onSnapshot(
      collection(firestore, "products-units"),
      () => {
        getAllProductUnits();
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    addUnitModal,
    productUnit,
    handleChangeProductUnit,
    allProductsUnits: allProductsUnits,
    addNewProductUnit,
    cancelAddNewProductUnit,
    isPending,
  };
};
