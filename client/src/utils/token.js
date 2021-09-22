import jwtDecode from 'jwt-decode';

let accessToken = '';

//Funkcja zapisująca token dostępu.
export function setAccessToken(token) {
    accessToken = token;
}

//Funkcja zwracająca token dostępu.
export function getAccessToken() {
    return accessToken;
}

//Funkcja walidująca token dostępu.
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
