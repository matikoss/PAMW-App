import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import connectStore from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import { User } from './models/user';
import { registerRouter, loginRouter } from './routes/index';
import { PORT, NODE_ENV, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from '../config'
import { DB_ADDRESS } from '../../addressConfig'

(async () => {
    try {
        const app = express();
        const PORT = 3000;
        const databasePath = DB_ADDRESS;
        await mongoose.connect(process.env.MONGODB_URI || databasePath);
        console.log('Connected to MongoDB!');
        const MongoStore = connectStore(session);

        dotenv.config();
        app.use(bodyParser.json());
        app.use(cors({ credentials: true, origin: 'http://localhost:8000' }));
        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET,
            saveUninitialized: false,
            resave: false,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                collection: 'session',
                ttl: parseInt(SESS_LIFETIME) / 1000
            }),
            cookie: {
                sameSite: true,
                secure: NODE_ENV === 'production',
                maxAge: parseInt(SESS_LIFETIME),
                path: '/'
            }
        }));


        app.use('/register', registerRouter);
        app.use('/login', loginRouter);

        app.get('/', async (request, response) => {
            User.find({}, function (err, users) {
                var userMap = {};

                users.forEach(function (user) {
                    userMap[user._id] = user;
                });
                response.send(userMap);
            });
        })

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static('client/build'));

            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '..', 'pamw-app', 'build', 'index.html'));
            })
        }

        app.listen(3000, () => {
            console.log("pamw-app-server-login is running on port 3000");
        })
    } catch (err) {
        console.log(err)
    }
})();
