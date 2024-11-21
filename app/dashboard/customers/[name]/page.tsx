'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerDetails {
    id: string
    name: string
    email: string
    phone: string
    address: string
    status: 'active' | 'inactive'
    notes: string
    loyaltyPoints: number
}

interface Activity {
    id: string
    type: string
    description: string
    date: string
    amount?: number
}

const mockCustomer: CustomerDetails = {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '680462509',
    address: 'Makepe, Douala',
    status: 'active',
    notes: 'Loyal customer since 2020',
    loyaltyPoints: 1250
}

const mockActivities: Activity[] = [
    { id: '1', type: 'Purchase', description: 'Bought Product X', date: '2023-06-01', amount: 50000 },
    { id: '1', type: 'Purchase', description: 'Bought Product T', date: '2023-06-01', amount: 10000 },
    { id: '1', type: 'Purchase', description: 'Bought Product Z', date: '2023-06-01', amount: 25000 },
    { id: '4', type: 'Purchase', description: 'Bought Product Y', date: '2023-05-20', amount: 18000 },
]

interface ParamsProps {
    params: {
        name: string;
    };
}

export default function CustomerDetailPage({ params }: ParamsProps) {

    const customerName = decodeURIComponent(params.name)

    const router = useRouter()
    const [customer, setCustomer] = useState<CustomerDetails>(mockCustomer)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCustomer(prev => ({ ...prev, [name]: value }))
    }

    const handleStatusChange = (value: string) => {
        setCustomer(prev => ({ ...prev, status: value as 'active' | 'inactive' }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the updated customer data to your backend
        console.log('Updated customer:', customer)
    }

    return (
        <div className="container max-w-6xl">
            <Button variant="outline" onClick={() => router.back()} className="mb-6 text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customers
            </Button>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-1">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={customer.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={customer.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    value={customer.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={customer.status}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div> */}
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    value={customer.notes}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-400">
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockActivities.map((activity) => (
                                        <TableRow key={activity.id}>
                                            <TableCell>{activity.type}</TableCell>
                                            <TableCell>{activity.description}</TableCell>
                                            <TableCell>{activity.date}</TableCell>
                                            <TableCell>{activity.amount ? `${activity.amount.toFixed(2)}` : '-'} FCFA</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}