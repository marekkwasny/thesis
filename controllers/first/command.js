import { ICommandService } from '../interfaces.js';
import * as db from '../../db/index.js';

export class CommandService1 extends ICommandService {
    constructor() {
        super();
    }

    async createPost(pool, userId, content) {
        return await db.createNewPost(pool, userId, content);
    }

    async likePost(pool, userId, postId) {
        return await db.likePost(pool, userId, postId);
    }

    async unlikePost(pool, userId, postId) {
        return await db.unlikePost(pool, userId, postId);
    }
}
