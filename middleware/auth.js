import jwt from 'jsonwebtoken';
const { verify } = jwt;

export function auth(req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const bearer = req.headers.authorization.split(' ')[1];
        req.user = verify(bearer, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return 'TOKEN_EXPIRED';
                } else {
                    return '';
                }
            } else return decoded;
        });
    }

    next();
}
