"use client"

import { useEffect, useState } from 'react';
import { ChevronDown, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from '../LogoutButton';

const UserDropdownMenu = () => {
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const userInfo = localStorage.getItem('user-info');
        if (userInfo) {
            const { name } = JSON.parse(userInfo);
            setUserName(name || 'User');
        }
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                    <img
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        alt="User"
                        className="h-8 w-8 rounded-full"
                    />
                    <div className="text-left">
                        <div className="text-sm font-medium">{userName}</div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Button variant="ghost" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdownMenu;
