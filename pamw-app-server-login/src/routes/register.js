import express from 'express';
import Joi from '@hapi/joi';
const { User } = require('../models/user');
import { parseError, sessionizeUser } from "../utils/helpers";

const registerRouter = express.Router();


registerRouter.post('', async (request, response) => {
    const { username, email, password } = request.body;
    console.log(username)
    // let found = false;
    let usernameDuplicate = await User.findOne({ username: username });
    let emailDuplicate = await User.findOne({ email: email });
    if (usernameDuplicate || emailDuplicate) {
        return response.json({ wasAdded: false });
    } else {
        const user = new User({
            username: username,
            email: email,
            password: password
        });
        const sessionUser = sessionizeUser(user);
        await user.save();
        console.log(request.session)
        request.session.user = sessionUser;
        response.json({ wasAdded: true, user: sessionUser});
    }
})

export default registerRouter;