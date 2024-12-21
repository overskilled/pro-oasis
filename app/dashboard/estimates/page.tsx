'use client'

import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { File, User } from './types'
import { FileList } from './components/FileList'
import { FileGrid } from './components/FileGrid'
import { FileUploadButton } from './components/FileUploadbutton'
import { SearchAndFilterBar } from './components/SearchAndFilterBar'
import { FileDetails } from './components/FileDetails'
import { StorageUsage } from './components/StorageUsage'
import { FilePreviewDialog } from './components/FilePreviewDialog'
import { EmailDialog } from './components/EmailDialog'
import { ShareDialog } from './components/ShareDialog'
import useAuth from '@/app/(auth)/Hooks/useAuth'
import useEstimates from './hooks/useEstimates'
import { serverTimestamp, Timestamp } from 'firebase/firestore'

const initialFiles: File[] = [
    { id: '1', name: 'Project Proposal.pdf', type: 'pdf', size: 1024000, url: '/placeholder.svg', shared: true, starred: false },
    { id: '2', name: 'Team Photo.jpg', type: 'jpg', size: 2048000, url: '/placeholder.svg', shared: false, starred: true },
    { id: '3', name: 'Budget.xlsx', type: 'xlsx', size: 512000, url: '/placeholder.svg', shared: true, starred: false },
    { id: '4', name: 'Presentation.pptx', type: 'pptx', size: 3072000, url: '/placeholder.svg', shared: false, starred: false },
    { id: '5', name: 'Meeting Notes.docx', type: 'docx', size: 256000, url: '/placeholder.svg', shared: true, starred: true },
]

const users: User[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avatar: '/placeholder.svg' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', avatar: '/placeholder.svg' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', avatar: '/placeholder.svg' },
]

export default function page() {
    const { estimate } = useEstimates()
    const [files, setFiles] = useState<File[]>(estimate)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [sortBy, setSortBy] = useState('name')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [isEmailOpen, setIsEmailOpen] = useState(false)
    const [isShareOpen, setIsShareOpen] = useState(false)
    const { user } = useAuth()

    const handleFileUpload = async (file: File) => {

        const newFile: File = {
            lastModified: serverTimestamp() as Timestamp,
            owner: user?.uid,
            shared: false,
            starred: false,
            name: file.name,
            url: file.url,
            size: file.size,
            type: file.type
        }

        setFiles([...files, newFile])
    }

    const handleFileSelect = (file: File) => {
        setSelectedFile(file)
    }

    const handleFileDelete = (id: string) => {
    }

    const handleFileDownload = (file: File) => {
        // Placeholder for file download logic
        console.log(`Downloading file: ${file.name}`)
    }

    const handleFilePreview = (file: File) => {
        setSelectedFile(file)
        setIsPreviewOpen(true)
    }

    const handleEmailSend = (to: string, subject: string, message: string) => {
        // Placeholder for email sending logic
        console.log('Sending email:', { to, subject, message })
    }

    const handleShareFile = (userId: string, permission: string) => {
        // Placeholder for file sharing logic
        console.log('Sharing file:', { userId, permission })
    }

    const handleStarFile = (id: string) => {
        // setFiles(files.map(file =>
        //     file.id === id ? { ...file, starred: !file.starred } : file
        // ))
    }

    const filteredFiles = estimate
        .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(file => filterType === 'all' || file.type === filterType)
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name)
            // if (sortBy === 'date') return new Date(b.lastModified).getTime() - new Date(a.lastModified || 0).getTime();
            if (sortBy === 'size') return b.size - a.size
            return 0
        })

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Estimates</h1>
                <FileUploadButton onFileUpload={handleFileUpload} />
            </div>

            <SearchAndFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterType={filterType}
                onFilterChange={setFilterType}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            <div className="grid gap-8 grid-cols-1 lg:grid-cols-[3fr_1fr]">
                <ScrollArea className="h-[calc(100vh-200px)]">
                    {viewMode === 'grid' ? (
                        <FileGrid
                            files={filteredFiles}
                            onFileSelect={handleFileSelect}
                            onStarFile={handleStarFile}
                        />
                    ) : (
                        <FileList
                            files={filteredFiles}
                            onFileSelect={handleFileSelect}
                            onFilePreview={handleFilePreview}
                            onFileDownload={handleFileDownload}
                            onFileEmail={() => setIsEmailOpen(true)}
                            onFileShare={() => setIsShareOpen(true)}
                            onStarFile={handleStarFile}
                            onFileDelete={handleFileDelete}
                        />
                    )}
                </ScrollArea>

                <div className="space-y-6">
                    {selectedFile && (
                        <FileDetails
                            file={selectedFile}
                            onPreview={() => setIsPreviewOpen(true)}
                            onDownload={() => handleFileDownload(selectedFile)}
                            onEmail={() => setIsEmailOpen(true)}
                            onShare={() => setIsShareOpen(true)}
                            onStar={() => handleStarFile(selectedFile.id || "")}
                            onDelete={() => handleFileDelete(selectedFile.id || "")}
                        />
                    )}
                    <StorageUsage used={3.3} total={10} />
                </div>
            </div>

            <FilePreviewDialog
                file={selectedFile}
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
            />

            <EmailDialog
                file={selectedFile}
                isOpen={isEmailOpen}
                onClose={() => setIsEmailOpen(false)}
                onSend={handleEmailSend}
            />

            <ShareDialog
                file={selectedFile}
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                onShare={handleShareFile}
                users={users}
            />
        </div>
    )
}