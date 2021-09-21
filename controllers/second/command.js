import { ICommandService } from '../interfaces.js';
import * as db from '../../db/index.js';

export class CommandService2 extends ICommandService {
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

        return await db.logPostEvent(pool, JSON.stringify(event));
    }

    async likePost(pool, userId, postId) {
        const event = {
            like: {
                user: userId,
                post: postId,
            },
        };

        return await db.logPostEvent(pool, JSON.stringify(event));
    }

    async unlikePost(pool, userId, postId) {
        const event = {
            unlike: {
                user: userId,
                post: postId,
            },
        };

        return await db.logPostEvent(pool, JSON.stringify(event));
    }
}
