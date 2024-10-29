import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, ChevronDown } from 'lucide-react'

// Update the interface to include the new props
interface SalesSearchAndFilterProps {
    setSearchTerm: (term: string) => void
    sortField: string
    sortDirection: "asc" | "desc"
    onSort: (field: string) => void
}

const SalesSearchAndFilter: React.FC<SalesSearchAndFilterProps> = ({ 
    setSearchTerm, 
    sortField, 
    sortDirection, 
    onSort 
}) => (
    <div className="flex justify-between items-center mb-4">
        <div className="relative">
            <Input
                type="search"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
                <Filter className="h-4 w-4 text-blue-500" />
            </Button>
            <Button variant="outline" onClick={() => onSort(sortField)}>
                {sortField.charAt(0).toUpperCase() + sortField.slice(1)}
                <ChevronDown className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
            </Button>
        </div>
    </div>
)

export default SalesSearchAndFilter
