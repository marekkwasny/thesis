import { logToConsole } from '../utils/logging.js';

export async function createNewPost(pool, userId, content) {
    const posts = new PostRepository(pool);
    return await posts.create(userId, content);
}

export async function fetchPosts(pool, userId, limit, cursor) {
    const posts = new PostRepository(pool);
    return await posts.fetch(userId, limit, cursor);
}

class PostRepository {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    }

    async create(userId, content) {
        try {
            const query = {
                name: 'create-post',
                text:
                    'INSERT INTO posts(fk_users, content)' +
                    'VALUES ($1, $2) RETURNING *',
                values: [userId, content],
            };

            logToConsole(query);
            const res = await this.#pool.query(query);

            return res.rows[0];
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async fetch(userId, limit, cursor) {
        try {
            const fetchQuery = {
                name: `fetch-posts-for-${userId}`,
                text:
                    'SELECT posts.id, posts.content, posts.likes, posts.fk_users, users.name, ' +
                    'users.email, fk_users_likes = $1 AS is_liked_by_user ' +
                    'FROM posts ' +
                    'LEFT JOIN likes ON (fk_posts_likes = posts.id AND fk_users_likes = $1) ' +
                    'JOIN users ON posts.fk_users = users.id ' +
                    'WHERE posts.id < $2 ' +
                    'ORDER BY posts.id DESC LIMIT $3',
                values: [userId, cursor, limit],
            };

            const entryFetchQuery = {
                name: `fetch-entry-posts-for${userId}`,
                text:
                    'SELECT posts.id, posts.content, posts.likes, posts.fk_users, users.name, ' +
                    'users.email, fk_users_likes = $1 AS is_liked_by_user ' +
                    'FROM posts ' +
                    'LEFT JOIN likes ON (fk_posts_likes = posts.id AND fk_users_likes = $1) ' +
                    'JOIN users ON posts.fk_users = users.id ' +
                    'ORDER BY posts.id DESC LIMIT $2',
                values: [userId, limit],
            };

            let hasMoreQuery = {
                name: `has-more-posts-${cursor}-${limit}`,
                text: '',
            };

            if (cursor !== 0) {
                hasMoreQuery.text = 'SELECT posts.id FROM posts WHERE id < $1 LIMIT 1';
                hasMoreQuery.values = [cursor - limit];
            } else {
                hasMoreQuery.text = 'SELECT posts.id FROM posts LIMIT 1';
            }

            const query = cursor !== 0 ? fetchQuery : entryFetchQuery;

            logToConsole(query);
            const res = await this.#pool.query(query);

            logToConsole(hasMoreQuery);
            const hasMore = await this.#pool.query(hasMoreQuery);

            return fetchConvert(res.rows, hasMore.rowCount, userId);
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

function fetchConvert(data, rowCount, userId) {
    let output = { hasMore: rowCount > 0, posts: [] };

    data.map((x) => {
        output.posts.push({
            id: x.id,
            content: x.content,
            likes: x.likes,
            userRequesting: userId,
            isLikedByUser: x.is_liked_by_user ? true : false,
            user: {
                id: x.fk_users,
                name: x.name,
            },
        });
    });

    return output;
}
