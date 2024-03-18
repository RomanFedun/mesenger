import {Socket as SocketIo} from "socket.io";
import {UserDocument} from "./user.interface";

export interface SocketInterface extends SocketIo {
    user?: UserDocument;
}
