import express from 'express';
import jwt from 'jsonwebtoken';
const { User } = require('../models/user');
import { parseError, sessionizeUser } from "../utils/helpers";
import { SESS_NAME,  ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from "../../config";

const loginRouter = express.Router();

loginRouter.post('', async (request, response) => {
    try {
        const { username, password } = request.body;

        const user = await User.findOne({ username });
        if (user && user.password === password) {
            const accessToken = jwt.sign({ _id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
            const refreshToken = jwt.sign({ _id: user.id }, REFRESH_TOKEN_SECRET);
            const sessionUser = sessionizeUser(user, accessToken, refreshToken);
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