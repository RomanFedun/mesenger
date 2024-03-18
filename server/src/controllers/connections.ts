import { ExpressRequestInterface } from "../types/expressRequest.inteface";
import { NextFunction, Response } from "express";
import ConnectionModel from "../models/connection"

export const getConnections = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            return res.sendStatus(401);
        }

        const connections = await ConnectionModel.find({userId: req.user.id});
        console.log('contacts', connections);
        res.send(connections);

    } catch (err) {
        next(err);
    }
}

export const addContact = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try {
        if(!req.user) return res.sendStatus(401);
        console.log('PARAMS', req.body);

        const userConnection = await ConnectionModel.findOneAndUpdate(
            {userId: req.user.id},
            {$push: {contacts: req.body}},{new: true, upsert: true}
        );

        // const savedConnections = await userConnection.save();

        res.send(userConnection);
    } catch (err) {
        next(err)
    }
}
