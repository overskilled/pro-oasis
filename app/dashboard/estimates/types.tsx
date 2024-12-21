import { Timestamp } from "firebase/firestore"

export interface User {
    id: string
    name: string
    email: string
    avatar: string
}

export interface File {
    id?: string;
    name: string;
    type: string;
    size: number;
    lastModified?: Timestamp; 
    url: string;
    owner?: string;
    shared?: boolean;
    starred?: boolean;
}

export interface CustomFile {
    id?: string;
    name: string;
    type: string;
    size: number;
    lastModified?: Timestamp;
    url: string;
    owner?: string;
    shared?: boolean;
    starred?: boolean;
}


