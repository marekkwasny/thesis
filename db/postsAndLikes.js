import { logToConsole } from '../utils/logging.js';

//Funkcja zapisująca treść dla trzeciego kroku CQRS.
export async function createPostDenormalized(pool, userId, userName, content) {
    const postsAndLikes = new PostsAndLikesRepository(pool);
    return await postsAndLikes.create(userId, userName, content);
}

//Funkcja zwracająca treści dla trzeciego kroku CQRS.
export async function fetchPostsDenormalized(pool, userId) {
    const postsAndLikes = new PostsAndLikesRepository(pool);
    return await postsAndLikes.fetch(userId);
}

//Funkcja zapisująca polubienie dla trzeciego kroku CQRS.
export async function likePostDenormalized(pool, userId, postId) {
    const postsAndLikes = new PostsAndLikesRepository(pool);
    return await postsAndLikes.like(userId, postId);
}

//Funkcja wycofująca polubienie dla trzeciego kroku CQRS.
export async function unlikePostDenormalized(pool, userId, postId) {
    const postsAndLikes = new PostsAndLikesRepository(pool);
    return await postsAndLikes.unlike(userId, postId);
}

class PostsAndLikesRepository {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    }

    async create(userId, userName, content) {
        try {
            const query = {
                name: `create-post-denormalized`,
                text:
                    'INSERT INTO posts_and_likes(is_create, author_id, author_name, content, likes)' +
                    'VALUES ($1, $2, $3, $4, $5)',
                values: [true, userId, userName, content, 0],
            };

            logToConsole(query);
            await this.#pool.query(query);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async fetch(userId) {
        try {
            const query = {
                name: `fetch-denormalized-posts-for-${userId}`,
                text:
                    'SELECT * FROM posts_and_likes ' +
                    'WHERE is_create = TRUE OR (is_like = TRUE AND like_user_id = $1) ' +
                    `ORDER BY id`,
                values: [userId],
            };

            logToConsole(query);
            const res = await this.#pool.query(query);

            return res.rows;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async like(userId, postId) {
        try {
            const likeQuery = {
                name: `like-denormalized-post-${postId}-by-${userId}`,
                text: 'INSERT INTO posts_and_likes(is_like, like_user_id, like_post_id) VALUES ($1, $2, $3)',
                values: [true, userId, postId],
            };

            const updateLikesQuery = {
                name: `update-likes-denormalized-post-${postId}`,
                text: 'UPDATE posts_and_likes SET likes = likes + 1 WHERE id = $1',
                values: [postId],
            };

            logToConsole(likeQuery);
            await this.#pool.query(likeQuery);

            logToConsole(updateLikesQuery);
            await this.#pool.query(updateLikesQuery);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async unlike(userId, postId) {
        try {
            const unlikeQuery = {
                name: `unlike-denormalized-post-${postId}-by-${userId}`,
                text: 'DELETE FROM posts_and_likes WHERE is_like = TRUE AND like_user_id = $1 AND like_post_id = $2',
                values: [userId, postId],
            };

            const updateLikesQuery = {
                name: `update-unlikes-denormalized-posts-${postId}`,
                text: 'UPDATE posts_and_likes SET likes = likes - 1 WHERE id = $1',
                values: [postId],
            };

            logToConsole(unlikeQuery);
            await this.#pool.query(unlikeQuery);

            logToConsole(updateLikesQuery);
            await this.#pool.query(updateLikesQuery);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
