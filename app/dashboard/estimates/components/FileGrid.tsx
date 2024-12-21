import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Pencil, Star } from 'lucide-react'
import { File } from "../types"

interface FileGridProps {
    files: File[]
    onFileSelect: (file: File) => void
    onStarFile: (id: string) => void
}

export function  FileGrid({ files, onFileSelect, onStarFile }: FileGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {files.map(file => (
                <Card
                    key={file.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => onFileSelect(file)}
                >
                    <CardContent className="p-4 flex flex-col items-center">
                        <div className="w-full h-24 bg-muted flex items-center justify-center mb-4 relative">
                            {file.type === 'pdf' && <Download className="w-12 h-12 text-muted-foreground" />}
                            {file.type === 'jpg' && <img src={file.url} alt={file.name} className="max-w-full max-h-full object-cover" />}
                            {file.type === 'image/png' && <img src={file.url} alt={file.name} className="max-w-full max-h-full object-cover" />}
                            {file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && <Pencil className="w-12 h-12 text-muted-foreground" />}
                            {file.type === 'docx' && <Pencil className="w-12 h-12 text-muted-foreground" />}
                            {file.type === 'pptx' && <Pencil className="w-12 h-12 text-muted-foreground" />}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-1 right-1"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onStarFile(file.id || "")
                                }}
                            >
                                <Star className={`w-4 h-4 ${file.starred ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                            </Button>
                        </div>
                        <p className="font-medium text-center text-sm truncate w-full">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}