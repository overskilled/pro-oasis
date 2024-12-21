import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface SearchAndFilterBarProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    filterType: string
    onFilterChange: (value: string) => void
    sortBy: string
    onSortChange: (value: string) => void
    viewMode: 'grid' | 'list'
    onViewModeChange: (mode: 'grid' | 'list') => void
}

export function SearchAndFilterBar({
    searchTerm,
    onSearchChange,
    filterType,
    onFilterChange,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange
}: SearchAndFilterBarProps) {
    return (

        <div className="mb-6 flex items-center space-x-4">
            <div className="flex border rounded-md">
                <Button variant="ghost" size="sm" onClick={() => onViewModeChange('grid')} className={viewMode === 'grid' ? 'bg-muted' : ''}>
                    Grid
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onViewModeChange('list')} className={viewMode === 'list' ? 'bg-muted' : ''}>
                    List
                </Button>
            </div>
            <div className="relative flex-grow">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search files..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <Select value={filterType} onValueChange={onFilterChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="jpg">Image</SelectItem>
                    <SelectItem value="xlsx">Spreadsheet</SelectItem>
                    <SelectItem value="docx">Document</SelectItem>
                    <SelectItem value="pptx">Presentation</SelectItem>
                </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}