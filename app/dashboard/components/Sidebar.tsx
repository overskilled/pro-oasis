"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
    CirclePercent,
    Contact,
    Container,
    FileChartPie,
    FileDiff,
    HandPlatter,
    LayoutDashboard,
    Package,
    PackagePlus,
    PieChart,
    ReceiptText,
    Sheet,
    ShoppingCartIcon,
    Store,
    Tag,
    User,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const sidebarData = [
    {
        title: "Main",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            // { icon: Store, label: "Stores", href: "/dashboard/stores" },
            // { icon: BarChart2, label: "Sales Dashboard", href: "/sales-dashboard" },
        ],
    },
    {
        title: "Product",
        items: [
            { icon: Package, label: "Product List", href: "/dashboard/product" },
            { icon: HandPlatter, label: "Services List", href: "/dashboard/services" },
            { icon: Sheet, label: "Stock Sheet", href: "/dashboard/stock" },
            { icon: FileChartPie, label: "Service Appointements", href: "/dashboard/appointement" },
            { icon: FileDiff, label: "Supply watch", href: "/dashboard/appointement" },
        ],
    },
    {
        title: "Sales",
        items: [
            { icon: ShoppingCartIcon, label: "Sales", href: "/dashboard/sales" },
            { icon: CirclePercent, label: "POS", href: "/dashboard/pos" },
            { icon: CirclePercent, label: "Estimate", href: "/dashboard/estimates" },
            { icon: CirclePercent, label: "Purchase order", href: "/dashboard/pos" },
            { icon: CirclePercent, label: "Delivery slip", href: "/dashboard/pos" },
            { icon: CirclePercent, label: "Credit note", href: "/dashboard/pos" },
            { icon: ReceiptText, label: "Invoice", href: "/dashboard/invoice" },
            { icon: ReceiptText, label: "Customer follow-up", href: "/dashboard/invoice" },
        ],
    },
    {
        title: "Purchases",
        items: [
            { icon: Container, label: "Supply Sheet", href: "/dashboard/supplies" },
            { icon: Container, label: "Estimate", href: "/dashboard/supplies" },
            { icon: Container, label: "Order slip", href: "/dashboard/supplies" },
            { icon: Container, label: "Facturation", href: "/dashboard/supplies" },
            { icon: Container, label: "deliver slip", href: "/dashboard/supplies" },
            { icon: Container, label: "Credit note", href: "/dashboard/supplies" },
            { icon: PackagePlus, label: "Supplier follow-up", href: "/dashboard/suppliers" },
        ],
    },
    {
        title: "Finances",
        items: [
            { icon: User, label: "Money box", href: "/dashboard/employees" },
            { icon: Contact, label: "Cash Collection Details", href: "/dashboard/customers" },
            { icon: Contact, label: "Disbursement Details", href: "/dashboard/customers" },
            { icon: Contact, label: "Report", href: "/dashboard/customers" },
        ],
    },
    {
        title: "Analyse",
        items: [
            { icon: User, label: "Sale and recipe", href: "/dashboard/employees" },
            { icon: Contact, label: "Purchase and expenses", href: "/dashboard/customers" },
        ],
    },
    {
        title: "Personnel",
        items: [
            { icon: User, label: "Staff list", href: "/dashboard/employees" },
            { icon: Contact, label: "Petty cash", href: "/dashboard/customers" },
        ],
    },
    {
        title: "Situation interne",
        items: [
            { icon: User, label: "Purchase / investments", href: "/dashboard/employees" },
            { icon: Contact, label: "Outings", href: "/dashboard/customers" },
            { icon: Contact, label: "Depreciation Table", href: "/dashboard/customers" },
            { icon: Contact, label: "Inventaire du patrimoine", href: "/dashboard/customers" },
        ],
    },
];

const Sidebar = () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const toggleSection = (title: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <aside className="w-45 bg-white shadow-md overflow-y-auto">
            <div className="p-4">
                <Link href="/" className="flex items-center space-x-2">
                    <PieChart className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold">Pro Oasis</span>
                </Link>
            </div>
            <nav className="mt-8">
                <Accordion type="multiple" className="space-y-4">
                    {sidebarData.map((section, index) => (
                        <AccordionItem key={index} value={section.title}>
                            <AccordionTrigger className="px-4 py-2 text-gray-500 uppercase text-xs font-semibold">
                                {section.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-1">
                                    {section.items.map((item, itemIndex) => (
                                        <Link
                                            key={itemIndex}
                                            href={item.href}
                                            className="flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:rounded-lg transition-all duration-200"
                                        >
                                            <div className="flex items-center space-x-2 text-xs">
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </nav>
        </aside>
    );
};

export default Sidebar;
