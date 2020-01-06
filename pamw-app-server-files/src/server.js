import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { filesRouter } from './routes/index';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/files', filesRouter);

app.listen(3001, () => {
    console.log("pamw-app-server-files is running on port 3001")
})