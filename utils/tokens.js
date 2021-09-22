import jwt from 'jsonwebtoken';
const { sign } = jwt;

//Funkcja tworząca token odświeżania.
export function createRefreshToken(userId, tokenVersion) {
    const token = sign(
        { id: userId, version: tokenVersion },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1y',
        }
    );

    return token;
}

//Funkcja tworząca token dostępu.
export function createAccessToken(userId) {
    const token = sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5m',
    });

    return token;
}

//Funkcja wystawiająca ciasteczko z tokenem odświeżania.
export function sendRefreshToken(res, token) {
    res.cookie('REFRESH_TOKEN', token, {
        httpOnly: true,
        path: '/auth',
    });
}
