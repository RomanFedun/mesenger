import { model, Schema } from "mongoose";
import { ConnectionDocument } from "../types/connection.interface";

const connectionSchema = new Schema<ConnectionDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    contacts: {
        type: [{_id: Schema.Types.ObjectId, userName: String}],
        required: true
    }
});

export default model<ConnectionDocument>('connection', connectionSchema)

