import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { filesRouter, biblioRouter } from './routes/index';
import { DB_ADDRESS } from '../../addressConfig';


(async () => {
    try {
        const databasePath = DB_ADDRESS;
        await mongoose.connect(process.env.MONGODB_URI || databasePath);
        console.log('Connected to MongoDB!');
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        app.use('/files', filesRouter);
        app.use('/biblio', biblioRouter);

        app.listen(3001, () => {
            console.log("pamw-app-server-files is running on port 3001")
        })
    } catch (err) {
        console.log(err)
    }
})();
