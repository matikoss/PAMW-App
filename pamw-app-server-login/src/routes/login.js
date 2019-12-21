import express from 'express';
import Joi from '@hapi/joi';
const { User } = require('../models/user');
import { parseError, sessionizeUser } from "../utils/helpers";
import { SESS_NAME } from "../../config";

const loginRouter = express.Router();

loginRouter.post('', async (request, response) => {
    try {
        const { username, password } = request.body;

        const user = await User.findOne({ username });
        if (user && user.password === password) {
            const sessionUser = sessionizeUser(user);

            request.session.user = sessionUser;
            console.log(request.session)
            response.send(sessionUser);
        } else {
            throw new Error('Invalid login');
        }
    } catch (err) {
        response.status(401).send(parseError(err))
    }
});

loginRouter.delete('', ({ session }, response) => {
    try {
        const user = session.user;
        if (user) {
            session.destroy(err => {
                if (err) throw (err);
                response.clearCookie(SESS_NAME);
                response.send(user);
            });
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        response.status(422).send(parseError(err));
    }
});

loginRouter.get('', ({ session: { user } }, response) => {
    response.send({ user });
});

export default loginRouter;