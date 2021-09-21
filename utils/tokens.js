import jwt from 'jsonwebtoken';
const { sign } = jwt;

export function createRefreshToken(userId, tokenVersion) {
    const token = sign({ id: userId, version: tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1y',
    });

    return token;
}

export function createAccessToken(userId) {
    const token = sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5m',
    });

    return token;
}

export function sendRefreshToken(res, token) {
    res.cookie('REFRESH_TOKEN', token, {
        httpOnly: true,
        path: '/auth',
    });
}
