import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import connectStore from 'connect-mongo';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from './models/user';
import { registerRouter, loginRouter } from './routes/index'
import { PORT, NODE_ENV, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from '../config'

(async () => {
    try {
        const databasePath = 'mongodb://localhost:27017'
        await mongoose.connect(databasePath);
        console.log('Connected to MongoDB!');
        const app = express();
        const MongoStore = connectStore(session);

        dotenv.config();
        app.use(bodyParser.json());
        app.use(cors());
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
                maxAge: parseInt(SESS_LIFETIME)
            }
        }));


        app.use('/register', registerRouter);
        app.use('/login', loginRouter);

        const userDatabase = {
            users: [
                {
                    id: '1',
                    username: 'testowyUzytkownik',
                    email: 'testowy@mail.com',
                    password: 'testowe123'
                }
            ]
        }

        app.get('/', async (request, response) => {
            User.find({}, function (err, users) {
                var userMap = {};

                users.forEach(function (user) {
                    userMap[user._id] = user;
                });

                response.send(userMap);
            });
            // response.json(userDatabase.users);
        })

        // app.post('/register', async (request, response) => {
        //     const { username, email, password } = request.body;
        //     // let found = false;
        //     let usernameDuplicate = await User.findOne({ username: username });
        //     let emailDuplicate = await User.findOne({ email: email });
        //     if (usernameDuplicate || emailDuplicate) {
        //         return response.json({ wasAdded: false });
        //     } else {
        //         user = new User({
        //             username: username,
        //             email: email,
        //             password: password
        //         });
        //         await user.save();
        //         response.json({ wasAdded: true });
        //     }


        //     // userDatabase.users.forEach(user => {
        //     //     if (user.username === username || user.email === email) {
        //     //         found = true;
        //     //         response.json({wasAdded: false});
        //     //     }
        //     // })
        //     // if (!found) {
        //     //     userDatabase.users.push({
        //     //         id: userDatabase.users.length + 1,
        //     //         username: username,
        //     //         email: email,
        //     //         password: password
        //     //     })
        //     //     response.json({wasAdded: true});
        //     // }
        // })

        const authenticateToken = (request, response, next) => {
            const authHeader = request.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return response.sendStatus(401);

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return response.sendStatus(403);
                request.user = user
                next()
            });
        }

        const generateAccessToken = (user) => {
            return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
        }

        app.get('/tokentest', authenticateToken, (request, response) => {
            response.json({ access: true })
        })

        app.post('/login', (request, response) => {
            const { username, password } = request.body;
            const user = { name: username }

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            response.json({ accessToken: accessToken });
        })

        app.listen(3000, () => {
            console.log("pamw-app-server-login is running on port 3000");
        })
    } catch (err) {
        console.log(err)
    }
})();
