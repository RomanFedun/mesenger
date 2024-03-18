import { Schema, Document } from "mongoose";

interface ConnectionInterface {
    createdAt: Date;
    updatedAt: Date;
    userId: Schema.Types.ObjectId;
    contacts: {_id: Schema.Types.ObjectId, userName: string}[];
}

export interface ConnectionDocument extends Document, ConnectionInterface { }
