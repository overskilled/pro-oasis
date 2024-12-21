import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { File } from '../types'

interface FilePreviewDialogProps {
    file: File | null
    isOpen: boolean
    onClose: () => void
}

export function FilePreviewDialog({ file, isOpen, onClose }: FilePreviewDialogProps) {
    if (!file) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{file.name}</DialogTitle>
                </DialogHeader>
                <div className="w-full h-[60vh] bg-muted flex items-center justify-center">
                    {file.type === 'pdf' && <embed src={file.url} type="application/pdf" width="100%" height="100%" />}
                    {file.type === 'jpg' && <img src={file.url} alt={file.name} className="max-w-full max-h-full object-contain" />}
                    {(file.type === 'xlsx' || file.type === 'docx' || file.type === 'pptx') && (
                        <p className="text-center">Preview not available for this file type</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}