import { ExpressRequestInterface } from "../types/expressRequest.inteface";
import { NextFunction, Response } from "express";
import UserContactsModel from '../models/userContacts';
import { Server } from 'socket.io'
import { SocketInterface } from "../types/socket.interface";
import { UserInterface } from "../types/user.interface";
import { SocketEvents } from "../types/socket-events.enum";
import userContacts from "../models/userContacts";

export const createUserContact = async (io: Server,
                                        socket: SocketInterface,
                                        data: {connectedUsers: UserInterface[]; title?: string | undefined}) => {
    try{
        if(!socket.user) {
            socket.emit(SocketEvents.USER_CONTACT_FAILURE, 'User is unauthorized');
            return
        }

        const userContact = await UserContactsModel.find();

        if(!userContact) {
            const title = data.title ? data.title : data.connectedUsers.join('&*&');

            const newUserContact = new UserContactsModel({
                title,
                connectedUsers: data.connectedUsers
            });

            const savedContact = await newUserContact.save();
            console.log('SAVED CONTACT', savedContact);
            io.to(title).emit(SocketEvents.USER_CONTACT_CREATE, savedContact);
        }

        // const newContact = new UserContactsModel({
        //     title: data.title,
        //     connectedUsers: data.connectedUsers,
        // });
        //
        // const savedContact = await newContact.save();
        // io.to(socket.user.id).emit(SocketEvents.USER_CONTACT_CREATE, savedContact);
    } catch(err) {
        socket.emit(SocketEvents.USER_CONTACT_FAILURE, 'User is unauthorized');
        return;
    }
}
