import { ICommandService } from '../interfaces.js';
import * as db from '../../db/index.js';

//Implementacja CommandService dla trzeciego kroku CQRS.
export class CommandService3 extends ICommandService {
    constructor() {
        super();
    }

    async createPost(pool, userId, content) {
        const user = await db.findUser(pool, 'id', userId);
        const event = {
            create: {
                author: userId,
                author_name: user.name,
                content: content,
            },
        };

        await db.logPostLikesEvent(pool, JSON.stringify(event));
        return await db.createPostDenormalized(pool, userId, user.name, content);
    }

    async likePost(pool, userId, postId) {
        const event = {
            like: {
                user: userId,
                post: postId,
            },
        };

        await db.logPostLikesEvent(pool, JSON.stringify(event));
        return await db.likePostDenormalized(pool, userId, postId);
    }

    async unlikePost(pool, userId, postId) {
        const event = {
            unlike: {
                user: userId,
                post: postId,
            },
        };

        await db.logPostLikesEvent(pool, JSON.stringify(event));
        return await db.unlikePostDenormalized(pool, userId, postId);
    }
}
