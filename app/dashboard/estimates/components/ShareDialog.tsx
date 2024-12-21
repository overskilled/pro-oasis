import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { File, User } from '../types'

interface ShareDialogProps {
    file: File | null
    isOpen: boolean
    onClose: () => void
    onShare: (userId: string, permission: string) => void
    users: User[]
}

export function ShareDialog({ file, isOpen, onClose, onShare, users }: ShareDialogProps) {
    const [selectedUser, setSelectedUser] = useState('')
    const [permission, setPermission] = useState('view')

    const handleShare = () => {
        onShare(selectedUser, permission)
        onClose()
    }

    if (!file) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share File</DialogTitle>
                    <DialogDescription>Share the selected file with other users.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user" className="text-right">
                            User
                        </Label>
                        <Select
                            value={selectedUser}
                            onValueChange={setSelectedUser}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a user" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map(user => (
                                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="permission" className="text-right">
                            Permission
                        </Label>
                        <Select
                            value={permission}
                            onValueChange={setPermission}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select permission" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="view">View</SelectItem>
                                <SelectItem value="edit">Edit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleShare}>Share</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}