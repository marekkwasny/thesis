import { logToConsole } from '../utils/logging.js';

//Funkcja zwracająca wersję tokenu odświeżania dla danego użytkownika.
export async function getTokenVersion(pool, userId) {
    const tokens = new TokenRepository(pool);
    return await tokens.find(userId);
}

//Funkcja zmieniająca oczekiwany stan tokenu odświeżania poprzez podniesienie jego wersji.
export async function revokeToken(pool, userId) {
    const tokens = new TokenRepository(pool);
    await tokens.increment(userId);
}

class TokenRepository {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    }

    async find(id) {
        try {
            const query = {
                name: 'fetch-token-version',
                text: 'SELECT token_version FROM refresh_tokens WHERE fk_users = $1 LIMIT 1',
                values: [id],
            };

            logToConsole(query);
            const ret = await this.#pool.query(query);

            return { tokenVersion: ret.rows[0].token_version };
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async increment(id) {
        try {
            const query = {
                name: `increment-token-version-for-${id}`,
                text:
                    'UPDATE refresh_tokens SET token_version = token_version + 1 ' +
                    'WHERE fk_users = $1',
                values: [id],
            };

            logToConsole(query);

            await this.#pool.query(query);
        } catch (err) {
            console.log(err);
        }
    }
}
