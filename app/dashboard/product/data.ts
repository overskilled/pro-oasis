import { auth, firestore } from '@/firebase/config';
import { Product } from './types';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useProducts() {
    const [user] = useAuthState(auth)

    const productsQuery = user ? query(
        collection(firestore, 'products'),
        where('userId', '==', user.uid)
    ) : null;

    const [products, loading, error] = useCollectionData(
        productsQuery,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return { products, loading, error };
}

// Export the products variable
export const products = useProducts().products;

// export const products: Product[] = [
//     { id: 1, name: "Lenovo 3rd Generation", image: "/placeholder.svg?height=40&width=40", sku: "PT001", category: "Laptop", brand: "Lenovo", price: 12500.00, unit: "Pc", qty: 100, createdBy: { name: "Arroon", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 2, name: "Bold V3.2", image: "/placeholder.svg?height=40&width=40", sku: "PT002", category: "Electronics", brand: "Bolt", price: 1600.00, unit: "Pc", qty: 140, createdBy: { name: "Kenneth", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 3, name: "Nike Jordan", image: "/placeholder.svg?height=40&width=40", sku: "PT003", category: "Shoe", brand: "Nike", price: 6000.00, unit: "Pc", qty: 780, createdBy: { name: "Gooch", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 4, name: "Apple Series 5 Watch", image: "/placeholder.svg?height=40&width=40", sku: "PT004", category: "Electronics", brand: "Apple", price: 25000.00, unit: "Pc", qty: 450, createdBy: { name: "Nathan", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 5, name: "Amazon Echo Dot", image: "/placeholder.svg?height=40&width=40", sku: "PT005", category: "Speaker", brand: "Amazon", price: 1600.00, unit: "Pc", qty: 477, createdBy: { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 6, name: "Lobar Handy", image: "/placeholder.svg?height=40&width=40", sku: "PT006", category: "Furnitures", brand: "Woodmart", price: 4521.00, unit: "Kg", qty: 145, createdBy: { name: "Robb", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 7, name: "Red Premium Handy", image: "/placeholder.svg?height=40&width=40", sku: "PT007", category: "Bags", brand: "Versace", price: 2024.00, unit: "Kg", qty: 747, createdBy: { name: "Steven", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 8, name: "Iphone 14 Pro", image: "/placeholder.svg?height=40&width=40", sku: "PT008", category: "Phone", brand: "Iphone", price: 1698.00, unit: "Pc", qty: 897, createdBy: { name: "Gravely", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 9, name: "Black Slim 200", image: "/placeholder.svg?height=40&width=40", sku: "PT009", category: "Chairs", brand: "Bently", price: 6794.00, unit: "Pc", qty: 741, createdBy: { name: "Kevin", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 10, name: "Woodcraft Sandal", image: "/placeholder.svg?height=40&width=40", sku: "PT010", category: "Bags", brand: "Woodcraft", price: 4547.00, unit: "Kg", qty: 148, createdBy: { name: "Grillo", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 11, name: "Lobar Handy", image: "/placeholder.svg?height=40&width=40", sku: "PT006", category: "Furnitures", brand: "Woodmart", price: 4521.00, unit: "Kg", qty: 145, createdBy: { name: "Robb", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 12, name: "Red Premium Handy", image: "/placeholder.svg?height=40&width=40", sku: "PT007", category: "Bags", brand: "Versace", price: 2024.00, unit: "Kg", qty: 747, createdBy: { name: "Steven", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 13, name: "Iphone 14 Pro", image: "/placeholder.svg?height=40&width=40", sku: "PT008", category: "Phone", brand: "Iphone", price: 1698.00, unit: "Pc", qty: 897, createdBy: { name: "Gravely", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 14, name: "Black Slim 200", image: "/placeholder.svg?height=40&width=40", sku: "PT009", category: "Chairs", brand: "Bently", price: 6794.00, unit: "Pc", qty: 741, createdBy: { name: "Kevin", avatar: "/placeholder.svg?height=32&width=32" } },
//     { id: 15, name: "Woodcraft Sandal", image: "/placeholder.svg?height=40&width=40", sku: "PT010", category: "Bags", brand: "Woodcraft", price: 4547.00, unit: "Kg", qty: 148, createdBy: { name: "Grillo", avatar: "/placeholder.svg?height=32&width=32" } },
// ];
