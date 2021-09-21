import jwtDecode from 'jwt-decode';

let accessToken = '';

export function setAccessToken(token) {
    accessToken = token;
}

export function getAccessToken() {
    return accessToken;
}

export function isAccessTokenValid() {
    const accessToken = getAccessToken();

    if (!accessToken) {
        return true;
    }

    try {
        const { exp } = jwtDecode(accessToken);
        return Date.now() < exp * 1000;
    } catch {
        return false;
    }
}
