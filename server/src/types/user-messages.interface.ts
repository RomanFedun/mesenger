import { Schema, Document } from "mongoose";

interface UserMessagesInterface {
    userId: Schema.Types.ObjectId;
    createdAt: Date;
    updated: Date;
    connectedUserId: Schema.Types.ObjectId;
    messages: {
        text?: string | null;
        files?: FileList;
        id: Schema.Types.ObjectId;
        whoSendId: Schema.Types.ObjectId;
        createdAt: Date;
    }[]
}

export interface MessagesDocument extends Document, UserMessagesInterface { }
