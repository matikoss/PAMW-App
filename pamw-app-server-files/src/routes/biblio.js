import express, { response } from 'express';
import verifyToken from '../utils/verifyToken';
const { Biblio } = require('../models/biblio');

const biblioRouter = express.Router();

biblioRouter.get('/:userId', verifyToken, async (req, res) => { //get an array of bibliographics positions
    try {
        const ownerId = req.user._id;
        const allUserBiblios = await Biblio.find({ ownerId: ownerId });
        console.log(allUserBiblios);
        res.send(allUserBiblios);
    } catch (err) {
        console.log(err);
    }
})

biblioRouter.post('/:userId', verifyToken, async (req, res) => {
    try {
        const ownerId = req.user._id;
        console.log(req.body)
        const { title, author, description } = req.body;
        const files = [];
        const biblioDuplicate = await Biblio.findOne({ title: title, ownerId: ownerId });
        if (biblioDuplicate) {
            throw Error("User already has this bibliographics position.");
        }
        const biblio = new Biblio({
            title: title,
            author: author,
            description: description,
            ownerId: ownerId,
            files: files
        })
        await biblio.save();
        res.send(biblio);
    } catch (err) {
        console.log(err);
        res.status(422).send("User already has this biblio.")
    }
})

biblioRouter.put('/:userId/:title', verifyToken, async (req, res) => { //update specific biblio pos
    try {
        const ownerId = req.user._id;
        const { title, author, description, files } = req.body;
        const biblioAfterUpdate = await Biblio.findOneAndUpdate(
            { ownerId: ownerId, title: title },
            { $set: { author: author, description: description, files: files } },
            { new: true }
        )
        res.send(biblioAfterUpdate);
    } catch (err) {
        console.log(err);
        res.status(404).send("Entity to update not found.")
    }
})

biblioRouter.delete('/:userId/:title', verifyToken, async (req, res) => {
    try {
        const ownerId = req.user._id;
        const title = req.params.title;
        const biblioToDelete = await Biblio.findOneAndDelete({ title: title, ownerId: ownerId });
        if (!biblioToDelete) {
            throw Error("Problem with delete")
        }
        console.log(biblioToDelete);
        res.send(biblioToDelete);
    } catch (err) {
        res.send(404).send("Element to delete not found.")
    }
})

export default biblioRouter;
