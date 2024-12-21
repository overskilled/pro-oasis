'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FileUploadDialog } from './FileUploadDialog'
// import { FileUploadDialog } from './FileUploadDialog'

interface FileUploadButtonProps {
    onFileUpload: (file: { name: string; url: string; size: number; type: string }) => void
}

export function FileUploadButton({ onFileUpload }: FileUploadButtonProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleUploadComplete = (file: { name: string; url: string; size: number; type: string }) => {
        onFileUpload(file)
        setIsDialogOpen(false)
    }

    return (
        <>
            <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Upload File
            </Button>
            <FileUploadDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onUploadComplete={handleUploadComplete}
            />
        </>
    )
}