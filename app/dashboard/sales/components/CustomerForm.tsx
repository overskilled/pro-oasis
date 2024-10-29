"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import useCustomer from "../hooks/useCustomer";
import { Loader2 } from "lucide-react";

interface CustomerType {
    name: string;
    email: string;
    tel: string;
}

const CustomerForm = () => {
    const { addCustomer, loading, errors } = useCustomer()
    const [inputs, setInputs] = useState<CustomerType>({
        name: '',
        email: '',
        tel: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Customer Registered:", inputs);
        addCustomer(inputs)

        setInputs({
            name: '',
            email: '',
            tel: ''
        })
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                    id="name"
                    placeholder="Customer name"
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Label htmlFor="tel">Telephone number *</Label>
                <Input
                    id="tel"
                    placeholder="Customer telephone number"
                    type="tel"
                    name="tel"
                    value={inputs.tel}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Label htmlFor="email">Email </Label>
                <Input
                    id="email"
                    placeholder="Customer email"
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                />
            </div>
            
            <div className="flex justify-end space-x-2 mt-5">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-400" size="sm">
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            Register
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default CustomerForm;
