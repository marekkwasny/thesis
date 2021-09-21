import jwt from 'jsonwebtoken';
import * as db from '../db/index.js';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../utils/tokens.js';

const { verify } = jwt;

export async function grantToken(pool, req, res) {
    const token = req.cookies.REFRESH_TOKEN;

    if (!token) {
        return res.send(getAccessToken(''));
    }

    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        console.log(err);
        return res.send(getAccessToken(''));
    }

    const { tokenVersion } = await db.getTokenVersion(pool, payload.id);

    if (tokenVersion !== payload.version) {
        return res.send(getAccessToken(''));
    }

    sendRefreshToken(res, createRefreshToken(payload.id, tokenVersion));

    return res.send(getAccessToken(createAccessToken(payload.id)));
}

function getAccessToken(token) {
    return { accessToken: token };
}
