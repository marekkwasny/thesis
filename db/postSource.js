import { logToConsole } from '../utils/logging.js';

//Funkcja zapisująca wydarzenia dla drugiego kroku CQRS.
export async function logPostEvent(pool, event) {
    const postSource = new PostSourceRepository(pool);
    return await postSource.log(event);
}

//Funkcja zwracająca wydarzenia dla drugiego kroku CQRS.
export async function fetchPostLogs(pool) {
    const postSource = new PostSourceRepository(pool);
    return await postSource.fetchLogs();
}

class PostSourceRepository {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    }

    async log(event) {
        try {
            const query = {
                name: `log-event`,
                text: 'INSERT INTO posts_source(event_log)' + 'VALUES ($1)',
                values: [event],
            };

            logToConsole(query);
            await this.#pool.query(query);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async fetchLogs() {
        try {
            const query = {
                name: `fetch-logs`,
                text: 'SELECT * FROM posts_source',
            };

            logToConsole(query);
            const res = await this.#pool.query(query);

            return res.rows;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
