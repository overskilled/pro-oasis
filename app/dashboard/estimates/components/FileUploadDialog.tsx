'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from 'lucide-react'
// import { storage } from '../lib/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase/config'
import useEstimates from '../hooks/useEstimates'
import useAuth from '@/app/(auth)/Hooks/useAuth'
import { CustomFile } from '../types'
import { serverTimestamp, Timestamp } from 'firebase/firestore'

interface FileUploadDialogProps {
    isOpen: boolean
    onClose: () => void
    onUploadComplete: (file: { name: string; url: string; size: number; type: string }) => void
}

export function FileUploadDialog({ isOpen, onClose, onUploadComplete }: FileUploadDialogProps) {
    const [file, setFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const { saveEstimate, saveLoading } = useEstimates()
    const { user } = useAuth()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)
        const storageRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
            },
            (error) => {
                console.error('Upload error:', error)
                setIsUploading(false)
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

                const newFile: CustomFile = {
                    lastModified: serverTimestamp() as Timestamp,
                    owner: user?.uid,
                    shared: false,
                    starred: false,
                    name: file.name,
                    url: downloadURL,
                    size: file.size,
                    type: file.type,
                };

                onUploadComplete({
                    name: file.name,
                    url: downloadURL,
                    size: file.size,
                    type: file.type,
                })
                saveEstimate(newFile)

                setIsUploading(false)
                setProgress(0)
                setFile(null)
                onClose()
            }
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">
                            File
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                            className="col-span-3"
                            disabled={isUploading}
                        />
                    </div>
                    {file && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right text-sm text-muted-foreground">Selected:</span>
                            <span className="col-span-3 text-sm">{file.name}</span>
                        </div>
                    )}
                    {isUploading && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right text-sm text-muted-foreground">Progress:</span>
                            <Progress value={progress} className="col-span-3" />
                        </div>
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose} disabled={isUploading}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={!file || isUploading}>
                        <Upload className="w-4 h-4 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}