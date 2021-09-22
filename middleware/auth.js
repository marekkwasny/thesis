import jwt from 'jsonwebtoken';
const { verify } = jwt;

//Middleware autoryzujący. Na podstawie tokenu dostępu identyfikuje konsumenta.
export function auth(req, res, next) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        const bearer = req.headers.authorization.split(' ')[1];

        try {
            req.user = verify(bearer, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            req.user = err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : '';
        }
    }

    next();
}
