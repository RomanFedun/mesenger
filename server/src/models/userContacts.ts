import { model, Schema } from "mongoose";
import { UserContacts } from "../types/userContact.interface";

const UserContactsSchema = new Schema<UserContacts>({
    connectedUsers: {
        type: [{
            userName: String,
            firstName: String,
            lastName: String,
            createdAt: Date
        }],
        required: true
    },
    title: {
        type: String,
        required: false
    }
}, {timestamps: true})

export default model<UserContacts>('UserContacts', UserContactsSchema)
