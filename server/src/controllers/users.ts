import UserModel from '../models/user';
import ConnectionModel from '../models/connection'
import { NextFunction, Request, Response } from 'express';
import { UserDocument } from '../types/user.interface';
import { Error } from 'mongoose';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
import { ExpressRequestInterface } from '../types/expressRequest.inteface';


const normalizedUser = (user: UserDocument) => {
    const token = jwt.sign({id: user.id, userName: user.userName}, secret)
    return {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        token
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = new UserModel({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        });

        const savedUser = await newUser.save();
        const userConnections = new ConnectionModel({
            userId: savedUser.id,
            contacts: []
        });
        res.send(normalizedUser(savedUser));
        await userConnections.save();

        // res.send(contacts);
    } catch (err) {
        if(err instanceof Error.ValidationError) {
            const messages = Object.values(err.errors).map(err => err.message);
            return res.status(422).json(messages);
        }
        next(err);
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await UserModel.findOne({
            userName: req.body.userName
        }).select('+password');
        const errors = { userNameOrPassword: "userName or password is incorrect"};

        if (!user) {
            return res.status(422).json(errors);
        }

        const isSamePassword = await user.validatePassword(req.body.password);

        if (!isSamePassword) {
            return res.status(422).json(errors);
        }

        res.setHeader('Set-Cookie', 'yummy_cookie=choco');
        res.status(200);

        res.send(normalizedUser(user));

    } catch (error) {
        next(error);
    }
};

export const currentUser = async (req: ExpressRequestInterface, res: Response) => {
    if(!req.user) return res.status(403);

    res.send(normalizedUser(req.user))
}

export const user = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        if(!req.user?.id) return res.status(403)
        let user = await UserModel.findById(req.params.userId);

        res.send(user);
    } catch (err) {
        next(err)
    }
}

export const allUsers = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try{
        if(!req.user) return res.status(403);
        const allUsers = await UserModel.find();

        res.send(allUsers)
    } catch (err) {
        next(err);
    }
}
