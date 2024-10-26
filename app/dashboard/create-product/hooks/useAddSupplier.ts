import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore"; // Firestore functions
import { useEffect, useState, useTransition } from "react";
import { firestore } from "@/firebase/config"; // Firebase Firestore config
import { ModalBehavior, useModal } from "@/hooks/useModal";
import { OptionsSelect } from "@/lib/utils";

export interface UseAddSupplierBehaviour {
  addSupplierModal: ModalBehavior;
  supplier?: string;
  handleChangeSupplier: (value: string) => void;
  allSuppliers: OptionsSelect[];
  isPending: boolean;
  addNewSupplier: () => void;
  cancelAddNewSupplier: () => void;
}

export const useAddSupplier = (): UseAddSupplierBehaviour => {
  const addSupplierModal = useModal();

  const [supplier, setSupplier] = useState<string>();

  const handleChangeSupplier = (value: string) => {
    setSupplier(value);
  };

  const [allSuppliers, setAllSuppliers] = useState<OptionsSelect[]>([]);

  const [isPending, startTransition] = useTransition();

  const addNewSupplier = async () => {
    startTransition(async () => {
      try {
        await addDoc(collection(firestore, "suppliers"), {
          name: supplier,
          description: "",
        });
        await getAllSuppliers();
        setSupplier(undefined);
        addSupplierModal.close();
      } catch (error) {
        console.error("Error adding supplier: ", error);
      }
    });
  };

  const cancelAddNewSupplier = () => {
    setSupplier(undefined);
    addSupplierModal.close();
  };

  const getAllSuppliers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "suppliers"));
      const suppliers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        ...doc.data(),
      }));

      const formattedSuppliers = suppliers.map((supplier) => ({
        id: supplier.id,
        text: supplier.name,
        value: supplier.id,
      }));

      setAllSuppliers(formattedSuppliers);
    } catch (error) {
      console.error("Error fetching suppliers: ", error);
    }
  };

  useEffect(() => {
    getAllSuppliers();

    // Realtime updates
    const unsubscribe = onSnapshot(collection(firestore, "suppliers"), () => {
      getAllSuppliers();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    addSupplierModal,
    supplier,
    handleChangeSupplier,
    allSuppliers,
    isPending,
    addNewSupplier,
    cancelAddNewSupplier,
  };
};
