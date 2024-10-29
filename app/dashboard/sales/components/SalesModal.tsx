import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, PlusCircle, X } from "lucide-react"
import { format } from "date-fns"
import useProducts from '@/app/dashboard/sales/hooks/useProducts'
import NewCustomerModal from './NewCustomerModal'
import useCustomer from '../hooks/useCustomer'

interface SalesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SalesModal({ isOpen, onClose }: SalesModalProps) {
    const [date, setDate] = React.useState<Date>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { products, loading, error } = useProducts()
    const { customers, customerLoading, customerError } = useCustomer()

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Add Sales</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Label htmlFor="category">Customer Name *</Label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 text-xs"
                                    type="button"
                                    onClick={
                                        () => setIsModalOpen(true)
                                    }
                                >
                                    <PlusCircle className="mr-1 h-3 w-3" />
                                    Add New
                                </Button>
                            </div>
                            <Select
                                name="category"
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='pass-by customer'>
                                        Pass-by Customer
                                    </SelectItem>
                                    {customers?.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.name}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal mt-4 ${!date && "text-muted-foreground"}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Choose date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                className="mt-4"
                                placeholder="Enter quantity"
                                // value={formData.quantity}
                                // onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="productName">Product Name</Label>
                        <div className="flex">
                            <Select
                                name="product"
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products?.map((product) => (
                                        <SelectItem key={product.id} value={product.productName}>
                                            {product.productName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        <Button className="bg-blue-500 hover:bg-blue-400" size={"sm"}><PlusCircle /> Add product</Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                {/* <TableHead>Purchase Price($)</TableHead> */}
                                {/* <TableHead>Discount($)</TableHead>
                                <TableHead>Tax(%)</TableHead>
                                <TableHead>Tax Amount($)</TableHead> */}
                                <TableHead>Unit Price(FCFA)</TableHead>
                                <TableHead>Total Cost(FCFA)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Product 1</TableCell>
                                <TableCell>1</TableCell>
                                {/* <TableCell>100.00</TableCell> */}
                                {/* <TableCell>0.00</TableCell>
                                <TableCell>10</TableCell>
                                <TableCell>10.00</TableCell> */}
                                <TableCell>110</TableCell>
                                <TableCell>110</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {/* <div className="flex justify-end space-x-4">
                        <div className="text-right">
                            <p>Order Tax</p>
                            <p>Discount</p>
                            <p>Shipping</p>
                            <p className="font-bold">Grand Total</p>
                        </div>
                        <div className="text-right">
                            <p>$ 0.00</p>
                            <p>$ 0.00</p>
                            <p>$ 0.00</p>
                            <p className="font-bold">$ 0.00</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <Label htmlFor="orderTax">Order Tax</Label>
                            <Input id="orderTax" type="number" placeholder="0" />
                        </div>
                        <div>
                            <Label htmlFor="discount">Discount</Label>
                            <Input id="discount" type="number" placeholder="0" />
                        </div>
                        <div>
                            <Label htmlFor="shipping">Shipping</Label>
                            <Input id="shipping" type="number" placeholder="0" />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div> */}
                </div>
                <div className="flex justify-end space-x-2 p-4 border-t">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-blue-500 hover:bg-bkue-400">Submit</Button>
                </div>
            </div>
            <NewCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
