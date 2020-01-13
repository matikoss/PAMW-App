import express from 'express';
import jwt from 'jsonwebtoken';
const { User } = require('../models/user');
import { parseError, sessionizeUser } from "../utils/helpers";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../config';

const registerRouter = express.Router();

registerRouter.post('', async (request, response) => {
    const { username, email, password } = request.body;
    console.log("Nazwa uz " + username)
    let usernameDuplicate = await User.findOne({ username: username });
    let emailDuplicate = await User.findOne({ email: email });
    console.log(usernameDuplicate);
    try {
        if (usernameDuplicate || emailDuplicate) {
            throw Error("User is already in the database.")
        } else {
            const user = new User({
                username: username,
                email: email,
                password: password
            });
            const accessToken = jwt.sign({ _id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
            const refreshToken = jwt.sign({ _id: user.id }, REFRESH_TOKEN_SECRET);
            const sessionUser = sessionizeUser(user, accessToken, refreshToken);
            await user.save();
            console.log(request.session)
            request.session.user = sessionUser;
            response.send(sessionUser);
        }
    } catch (err) {
        response.status(422).send(parseError(err));
    }
})

export default registerRouter;