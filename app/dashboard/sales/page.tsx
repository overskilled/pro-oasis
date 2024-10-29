"use client"

import React, { useState } from 'react'
import SalesHeader from '@/app/dashboard/sales/components/SalesHeader'
import SalesSearchAndFilter from '@/app/dashboard/sales/components/SalesSearchAndFilter'
import SalesTable from '@/app/dashboard/sales/components/SalesTable'
import SalesPagination from '@/app/dashboard/sales/components/SalesPagination'

// Define the type for sales data items
interface Sale {
    id: number
    customerName: string
    reference: string
    date: string
    status: 'Completed' | 'Pending'
    grandTotal: number
    paid: number
    due: number
    paymentStatus: 'Paid' | 'Due'
    biller: string
}

// Direct salesData declaration within the component
const salesData: Sale[] = [
    { id: 1, customerName: "Thomas", reference: "SL0101", date: "19 Jan 2023", status: "Completed", grandTotal: 550, paid: 550, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 2, customerName: "Rose", reference: "SL0102", date: "26 Jan 2023", status: "Completed", grandTotal: 250, paid: 250, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 3, customerName: "Benjamin", reference: "SL0103", date: "08 Feb 2023", status: "Completed", grandTotal: 570, paid: 570, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 4, customerName: "Lilly", reference: "SL0104", date: "12 Feb 2023", status: "Pending", grandTotal: 300, paid: 0, due: 300, paymentStatus: "Due", biller: "Admin" },
    { id: 5, customerName: "Freda", reference: "SL0105", date: "17 Mar 2023", status: "Pending", grandTotal: 700, paid: 0, due: 700, paymentStatus: "Due", biller: "Admin" },
    { id: 6, customerName: "Alwin", reference: "SL0106", date: "24 Mar 2023", status: "Completed", grandTotal: 400, paid: 400, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 7, customerName: "Maybelle", reference: "SL0107", date: "06 Apr 2023", status: "Pending", grandTotal: 120, paid: 0, due: 120, paymentStatus: "Due", biller: "Admin" },
    { id: 8, customerName: "Ellen", reference: "SL0108", date: "16 Apr 2023", status: "Completed", grandTotal: 830, paid: 830, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 9, customerName: "Kaitlin", reference: "SL0109", date: "04 May 2023", status: "Pending", grandTotal: 800, paid: 0, due: 800, paymentStatus: "Due", biller: "Admin" },
    { id: 10, customerName: "Grace", reference: "SL0110", date: "29 May 2023", status: "Completed", grandTotal: 460, paid: 460, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 11, customerName: "Oliver", reference: "SL0111", date: "03 Jun 2023", status: "Completed", grandTotal: 680, paid: 680, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 12, customerName: "Sophie", reference: "SL0112", date: "10 Jun 2023", status: "Pending", grandTotal: 350, paid: 0, due: 350, paymentStatus: "Due", biller: "Admin" },
    { id: 13, customerName: "Lucas", reference: "SL0113", date: "18 Jun 2023", status: "Completed", grandTotal: 920, paid: 920, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 14, customerName: "Emma", reference: "SL0114", date: "25 Jun 2023", status: "Pending", grandTotal: 540, paid: 0, due: 540, paymentStatus: "Due", biller: "Admin" },
    { id: 15, customerName: "Liam", reference: "SL0115", date: "02 Jul 2023", status: "Completed", grandTotal: 730, paid: 730, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 16, customerName: "Ava", reference: "SL0116", date: "09 Jul 2023", status: "Pending", grandTotal: 280, paid: 0, due: 280, paymentStatus: "Due", biller: "Admin" },
    { id: 17, customerName: "Noah", reference: "SL0117", date: "16 Jul 2023", status: "Completed", grandTotal: 610, paid: 610, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 18, customerName: "Isabella", reference: "SL0118", date: "23 Jul 2023", status: "Pending", grandTotal: 420, paid: 0, due: 420, paymentStatus: "Due", biller: "Admin" },
    { id: 19, customerName: "Ethan", reference: "SL0119", date: "30 Jul 2023", status: "Completed", grandTotal: 890, paid: 890, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 20, customerName: "Mia", reference: "SL0120", date: "06 Aug 2023", status: "Pending", grandTotal: 370, paid: 0, due: 370, paymentStatus: "Due", biller: "Admin" },
    { id: 21, customerName: "James", reference: "SL0121", date: "13 Aug 2023", status: "Completed", grandTotal: 750, paid: 750, due: 0, paymentStatus: "Paid", biller: "Admin" },
    { id: 22, customerName: "Charlotte", reference: "SL0122", date: "20 Aug 2023", status: "Pending", grandTotal: 490, paid: 0, due: 490, paymentStatus: "Due", biller: "Admin" },
    { id: 23, customerName: "William", reference: "SL0123", date: "27 Aug 2023", status: "Completed", grandTotal: 630, paid: 630, due: 0, paymentStatus: "Paid", biller: "Admin" },
]


const SalesList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [sortField, setSortField] = useState<keyof Sale>("date")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const itemsPerPage = 10

    // Filtering and sorting logic
    const filteredAndSortedData = salesData
        .filter(sale =>
            sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sale.reference.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

    const handleSort = (field: keyof Sale) => {
        if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <SalesHeader />
            <SalesSearchAndFilter 
                setSearchTerm={setSearchTerm}
                sortField={sortField as string}
                sortDirection={sortDirection}
                onSort={(field: string) => handleSort(field as keyof Sale)}
            />
            <SalesTable 
                salesData={currentItems}
                sortField={sortField as string}
                sortDirection={sortDirection}
                onSort={(field: string) => handleSort(field as keyof Sale)}
            />
            <SalesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={setCurrentPage}
            />
        </div>
    )
}

export default SalesList
