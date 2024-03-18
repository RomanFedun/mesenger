import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import * as mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as usersController from './controllers/users';
import * as connectionsController from './controllers/connections';
import * as messagesController from './controllers/messages';
import * as userContactsController from './controllers/userContacts'
import authMiddleWare from './middlewares/auth';
import cors from 'cors';
import { secret } from './config'
import jwt from 'jsonwebtoken';
import { SocketInterface } from "./types/socket.interface";
import User from "./models/user";
import { SocketEvents } from "./types/socket-events.enum";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is working');
});

app.post('/api/user', usersController.register);
app.post('/api/user/login', usersController.login);
app.get('/api/users', authMiddleWare, usersController.allUsers);
app.get('/api/user',authMiddleWare, usersController.currentUser);

app.get('/api/connections', authMiddleWare, connectionsController.getConnections);
app.post('/api/addcontact', authMiddleWare, connectionsController.addContact);

app.get('/api/contact:userId', authMiddleWare, usersController.user);

app.post('/api/firstMessage', authMiddleWare, messagesController.addFirstMessage);

io.use(async (socket: SocketInterface, next) => {
    try{
        const token = (socket.handshake.auth.token as string) ?? '';
        const data = jwt.verify(token.split(' ')[1], secret) as {
            id: string;
            userName: string;
        };

        const user = await User.findById(data.id);
        if(!user) return next(new Error('Authentication error'));
        socket.user = user;
    } catch (err) {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {
    console.log('socket is connected...', socket.rooms);
    socket.on(SocketEvents.USER_CONTACT_CREATE, (data) => {
        userContactsController.createUserContact(io, socket, data).then(d => console.log('CONTACT_CREATE: ', d));
    })
});

mongoose.connect('mongodb://localhost:27017/posts').then(() => {
    console.log('data base connected...');
    httpServer.listen(4001, () => {
        console.log('server is listening on PORT 4001...');
    });
});
