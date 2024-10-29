// Fix for data fetching and table display

"use client";

import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { ProductTable } from '@/components/product/ProductTable';
import { SearchAndSort } from '@/components/product/SearchAndSort';
import ProductPagination from '@/components/product/ProductPagination';
import { ChevronDown, Download, FileUp, Plus, Printer, RefreshCcw, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name'); // Default sort by 'name'
    const itemsPerPage = 10;

    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            console.log("User ID:", user.uid);  // Log the UID when the user is authenticated
        } else {
            console.log("No user is logged in.");
        }
    }, [user]);

    const productsQuery = user
        ? query(
            collection(firestore, 'products'),
            where('userId', '==', user.uid),
            // orderBy(sortBy) // Default sorting by 'name'
        )
        : null;

    const [productCollection, loading, error] = useCollectionData(productsQuery, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        if (productCollection && !loading) {
            // Ensure Firestore data is correctly transformed into Product[]
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

    const filteredProducts = products?.filter(product =>
        product?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // product?.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Product List</h1>
                    <p className="text-gray-600">Manage your products</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Link href={"./create-product"}>
                        <Button className="bg-blue-500 hover:bg-blue-400 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Product
                        </Button>
                    </Link>
                    <Button variant="secondary">
                        <FileUp className="h-4 w-4 mr-2" />
                        Import Product
                    </Button>
                </div>
            </div>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>Error fetching products: {error.message}</p>
            ) : (
                <>
                    <SearchAndSort
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <div className="bg-white shadow-md p-5 rounded-lg overflow-hidden">
                        <ProductTable products={currentItems as Product[]} />
                    </div>
                    <ProductPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={paginate}
                    />
                </>
            )}
        </div>
    );
}
