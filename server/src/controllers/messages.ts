import { ExpressRequestInterface } from "../types/expressRequest.inteface";
import { NextFunction, Response } from "express";
import MessageModel from '../models/messages'

export const addFirstMessage = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        if(!req.user)  return res.sendStatus(401);
        console.log('PARAMS MESSAGE', req.body);

        const newMessage = new MessageModel({
            userId: req.user.id,
            connectedUserId: req.body.connectedUserId,
            messages: [{
                text: req.body.message,
                files: req.body.files,
                whoSendId: req.user.id,
                createdAt: Date()
            }]
        });
        const savedMessage = await newMessage.save();
        console.log('SAVEDMASSEGE', savedMessage)

        res.send(savedMessage)

    } catch (err) {
        next(err)
    }
}
