import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
import UserModel from '../models/user';
import { ExpressRequestInterface } from '../types/expressRequest.inteface';

export default async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader) return res.sendStatus(403);

        const token = authHeader.split(' ')[1];
        const userData = jwt.verify(token, secret) as {
            id: string;
            userName: string;
        };
        const user = await UserModel.findById(userData.id)

        if(!user) return res.sendStatus(401);

        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(401)
    }
}
