import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Download, Printer, RefreshCw, Upload, FileText } from 'lucide-react'
import SalesModal from './SalesModal'  // Assuming the modal component is in the same directory

const SalesHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold">Sales List</h1>
                <p className="text-sm text-gray-600">Manage Your Sales</p>
            </div>
            <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                    <FileText className="h-4 w-4 text-red-500" />
                </Button>
                <Button variant="outline" size="icon">
                    <Download className="h-4 w-4 text-green-500" />
                </Button>
                <Button variant="outline" size="icon">
                    <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                </Button>
                <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-400 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Add New Sales
                </Button>
            </div>
            <SalesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default SalesHeader
