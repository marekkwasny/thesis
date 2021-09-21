import { logToConsole } from '../utils/logging.js';

export async function likePost(pool, userId, postId) {
    const likes = new LikeRepository(pool);
    return await likes.like(userId, postId);
}

export async function unlikePost(pool, userId, postId) {
    const likes = new LikeRepository(pool);
    return await likes.unlike(userId, postId);
}

class LikeRepository {
    #pool;

    constructor(pool) {
        this.#pool = pool;
    }

    async like(userId, postId) {
        try {
            const likeQuery = {
                name: `like-post-${postId}-by-${userId}`,
                text: 'INSERT INTO likes(fk_posts_likes, fk_users_likes) VALUES ($1, $2)',
                values: [postId, userId],
            };

            const updateLikesQuery = {
                name: `update-likes-on-post-${postId}-${userId}`,
                text: 'UPDATE posts SET likes = likes + 1 WHERE id = $1',
                values: [postId],
            };

            logToConsole(likeQuery);
            await this.#pool.query(likeQuery);

            logToConsole(updateLikesQuery);
            await this.#pool.query(updateLikesQuery);

            return true;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async unlike(userId, postId) {
        try {
            const unlikeQuery = {
                name: `unlike-post-${postId}-by-${userId}`,
                text: 'DELETE FROM likes WHERE fk_posts_likes = $1 AND fk_users_likes = $2',
                values: [postId, userId],
            };

            const updateLikesQuery = {
                name: `update-likes-on-post-${postId}`,
                text: 'UPDATE posts SET likes = likes - 1 WHERE id = $1',
                values: [postId],
            };

            logToConsole(unlikeQuery);
            await this.#pool.query(unlikeQuery);

            logToConsole(updateLikesQuery);
            await this.#pool.query(updateLikesQuery);

            return true;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
