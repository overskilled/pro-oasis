import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Pencil, MoreHorizontal, Star } from 'lucide-react'
import { format } from 'date-fns'
import { File } from '../types'
import formatDate from "@/lib/FormatDate"

interface FileListProps {
    files: File[]
    onFileSelect: (file: File) => void
    onFilePreview: (file: File) => void
    onFileDownload: (file: File) => void
    onFileEmail: (file: File) => void
    onFileShare: (file: File) => void
    onStarFile: (id: string) => void
    onFileDelete: (id: string) => void
}

export function FileList({
    files,
    onFileSelect,
    onFilePreview,
    onFileDownload,
    onFileEmail,
    onFileShare,
    onStarFile,
    onFileDelete
}: FileListProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {files.map(file => (
                    <TableRow key={file.id} onClick={() => onFileSelect(file)} className="cursor-pointer">
                        <TableCell className="font-medium">
                            <div className="flex items-center">
                                {file.type === 'pdf' && <Download className="w-4 h-4 mr-2 text-muted-foreground" />}
                                {file.type === 'jpg' && <img src={file.url} alt={file.name} className="w-4 h-4 mr-2 object-cover" />}
                                {file.type === 'xlsx' && <Pencil className="w-4 h-4 mr-2 text-muted-foreground" />}
                                {file.type === 'docx' && <Pencil className="w-4 h-4 mr-2 text-muted-foreground" />}
                                {file.type === 'pptx' && <Pencil className="w-4 h-4 mr-2 text-muted-foreground" />}
                                {file.name}
                            </div>
                        </TableCell>
                        <TableCell>{formatDate(file.lastModified)}</TableCell>
                        <TableCell>{(file.size / 1024 / 1024).toFixed(2)} MB</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onFilePreview(file)}>
                                        Preview
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onFileDownload(file)}>
                                        Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onFileEmail(file)}>
                                        Email
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onFileShare(file)}>
                                        Share
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => onStarFile(file.id || "")} className="flex items-center">
                                        <Star className={`w-4 h-4 mr-2 ${file.starred ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                                        {file.starred ? 'Unstar' : 'Star'}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onFileDelete(file.id || "")} className="text-red-600">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}