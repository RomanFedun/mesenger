import { Schema, Document } from "mongoose";
import { UserInterface } from "./user.interface";

interface UserContactInterface {
    title?: string | undefined
    createdAt: Date;
    updatedAt: Date;
    connectedUsers: UserInterface[]
}

export interface UserContacts extends UserContactInterface, Document { }
