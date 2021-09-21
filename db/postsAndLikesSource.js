import { logToConsole } from '../utils/logging.js';

export async function logPostLikesEvent(pool, event) {
    const postLikeSource = new PostLikeSourceRepository(pool);
    return await postLikeSource.log(event);
}

export async function fetchPostLikesLogs(pool) {
    const postLikeSource = new PostLikeSourceRepository(pool);
    return await postLikeSource.fetchLogs();
}

class PostLikeSourceRepository {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    }

    async log(event) {
        try {
            const query = {
                name: `log-event-backup`,
                text: 'INSERT INTO posts_and_likes_source(event_log) VALUES ($1)',
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
                name: `fetch-logs-backup`,
                text: 'SELECT * FROM posts_and_likes_source',
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
