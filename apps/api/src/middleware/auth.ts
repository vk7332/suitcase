import jwt from 'jsonwebtoken';

export function verifyUser(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) return res.status(401).send('Unauthorized');

    const decoded: any = jwt.decode(token);

    req.user = { id: decoded.sub };

    next();
}