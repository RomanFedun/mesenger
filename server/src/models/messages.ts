import { model, Schema } from "mongoose";
import { MessagesDocument } from "../types/user-messages.interface";

const messagesSchema = new Schema<MessagesDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    connectedUserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    messages: {
        type: [{
            text: String,
            files: String,
            id: Schema.Types.ObjectId,
            whoSendId: Schema.Types.ObjectId,
            createdAt: Date
        }],
        required: true
    }
}, {timestamps: true})

export default model<MessagesDocument>('messages', messagesSchema)
