import express from 'express';
import  verifyToken  from '../utils/verifyToken'
import fs from 'fs';
import { IncomingForm } from 'formidable';

const filesRouter = express.Router();

filesRouter.get('/:userId', verifyToken, (req, res) => { // get an array of files from the user dir
    const uploadDir = `${__dirname}/uploads/${req.user._id}`;
    const uploads = [];
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    else fs.readdirSync(uploadDir).forEach(file => uploads.push({
        file: `/app/user/${req.user._id}/${file}`,
        name: file
    }));
    res.send(uploads);
});

filesRouter.post('/:userId', verifyToken, (req, res) => { // post a new file to the user dir
    const form = new IncomingForm();
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;

    const uploadDir = `${__dirname}/uploads/${req.user._id}`;
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    
    form.parse(req);

    form.on('fileBegin', (field, file) => {
        file.path = `${uploadDir}/${file.name}`;
    });

    form.on('file', (field, file) => {
        res.send({
            file: `/app/user/${req.user._id}/${file.name}`,
            name: file.name
        });
    });
});

filesRouter.get('/:userId/:fileName', verifyToken, (req, res) => { // get a specific file from the user dir
    const filePath = `${__dirname}/uploads/${req.user._id}/${req.params.fileName}`;
    if (!fs.existsSync(filePath)) return res.status(400).send('No file or user in a storage.');
    res.download(filePath);
});

export default filesRouter;