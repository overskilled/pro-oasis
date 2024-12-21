import { FieldValue, Timestamp } from "firebase/firestore"

interface Product {
    id: string
    name: string
    quantity?: number
    price: number
}

export interface SaleProduct extends Product {
    customerName: string
    date: Timestamp | null
    productName: string
    // quantitySold: number
    quantityOrdered: number
    subtotal: number
    biller?: string
    saleReference?: string;
}


export interface SaleData {
    id?: string
    customerName: string
    products: SaleProduct[]
    grandTotal: number
    status: 'Completed' | 'Pending'
    paid: number
    due: number
    taxRate?: number
    taxAmount?: number
    paymentStatus: 'Paid' | 'Due'
    reference?: string;
    biller?: string
    saleReference?: string
    date: Timestamp | number
}