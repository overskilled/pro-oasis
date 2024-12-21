import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { File } from '../types'
import formatDate from '@/lib/FormatDate'

interface FileDetailsProps {
    file: File
    onPreview: () => void
    onDownload: () => void
    onEmail: () => void
    onShare: () => void
    onStar: () => void
    onDelete: () => void
}

export function FileDetails({
    file,
    onPreview,
    onDownload,
    onEmail,
    onShare,
    onStar,
    onDelete
}: FileDetailsProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="text-md font-semibold mb-4">{file.name}</h2>
                <div className="space-y-2 text-sm">
                    <p>
                        <span className="font-medium uppercase">Type:</span> {file.type.split(/[/\.]/).pop()}
                    </p>
                    <p><span className="font-medium">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p><span className="font-medium">Last Modified:</span> {formatDate(file.lastModified)}</p>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col space-y-2 text-sm">
                    <Button onClick={onPreview} size={"sm"}>Preview</Button>
                    <Button onClick={onDownload} size={"sm"}>Download</Button>
                    <Button onClick={onEmail} size={"sm"}>Email</Button>
                    <Button onClick={onShare} size={"sm"}>Share</Button>
                    <Button variant="outline" size={"sm"} onClick={onStar}>
                        {file.starred ? 'Unstar' : 'Star'}
                    </Button>
                    <Button variant="destructive" size={"sm"} onClick={onDelete}>Delete</Button>
                </div>
            </CardContent>
        </Card>
    )
}