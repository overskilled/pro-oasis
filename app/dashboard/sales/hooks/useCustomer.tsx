import { auth, firestore } from '@/firebase/config';
import { addDoc, collection, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';

interface CustomerType {
    id?: string;  // Optional as we assign it on fetching from Firestore
    name: string;
    email: string;
    tel: string;
    purchases?: any[];
    createdAt?: any;
}

const useCustomer = () => {
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [user] = useAuthState(auth);
    const [customers, setCustomers] = useState<CustomerType[]>([]);

    // Set up query to fetch customers associated with the authenticated user's store
    const customersQuery = user
        ? query(
            collection(firestore, 'customers'),
            where('store', '==', user.uid),
        )
        : null;

    // Fetch customer data and states from Firestore
    const [customerCollection, customerLoading, customerError] = useCollectionData(customersQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    // Update customers state when Firestore data changes
    useEffect(() => {
        if (customerCollection && !customerLoading) {
            const fetchedCustomers = customerCollection.map((doc: any) => ({
                id: doc.id,
                name: doc.name,
                email: doc.email,
                tel: doc.tel,
                purchases: doc.purchases || [],
                createdAt: doc.createdAt
            }));
            setCustomers(fetchedCustomers);
        }

        // Sync Firestore loading and error states with local state
        setLoading(customerLoading);
        setErrors(customerError ? customerError.message : null);
    }, [customerCollection, customerLoading, customerError]);

    
    const addCustomer = async (input: CustomerType) => {
        const customerData = {
            ...input,
            purchases: [],
            createdAt: serverTimestamp(),
            store: user?.uid
        };

        try {
            setLoading(true);
            setErrors(null);

            await addDoc(collection(firestore, "customers"), customerData);
            toast.success("New customer created successfully");
        } catch (error: any) {
            setErrors(error.message);
            toast.error(`Failed to create customer: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { addCustomer, customers, customerLoading, customerError, loading, errors };
};

export default useCustomer;
