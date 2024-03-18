import { Document } from "mongoose";

export interface UserInterface {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
}

export interface UserDocument extends UserInterface, Document {
    validatePassword(param1: string): string;
}
