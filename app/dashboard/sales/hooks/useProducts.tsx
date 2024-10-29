"use client";

import React, { useEffect, useState } from 'react';
import { Product } from '../../product/types';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where } from 'firebase/firestore';

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [user] = useAuthState(auth);

    // Set up query based on authentication status
    const productsQuery = user
        ? query(
            collection(firestore, 'products'),
            where('userId', '==', user.uid),
        )
        : null;

    // Fetch product data and states from Firestore
    const [productCollection, loading, error] = useCollectionData(productsQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    // Transform and set product data on change
    useEffect(() => {
        if (productCollection && !loading) {
            const fetchedProducts = productCollection.map((doc: any) => ({
                id: doc.id,
                productName: doc.productName,
                userId: doc.userId,
                category: doc.category,
                brand: doc.brand,
                price: doc.price,
                unit: doc.unit,
                quantity: doc.quantity,
            }));
            setProducts(fetchedProducts as Product[]);
        }
    }, [productCollection, loading]);

    // Return products along with loading and error states
    return { products, loading, error };
};

export default useProducts;
