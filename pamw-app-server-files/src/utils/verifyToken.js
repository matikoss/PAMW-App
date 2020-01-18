import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../../config';

const verifyToken = (request, response, next) => {
    const authHeader = request.header('authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return response.sendStatus(401);

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return response.sendStatus(403);
        request.user = user;
        next();
    })
}

export default verifyToken;