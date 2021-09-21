import { IQueryService } from '../interfaces.js';
import * as db from '../../db/index.js';

export class QueryService1 extends IQueryService {
    constructor() {
        super();
    }

    async fetchPosts(pool, userId, limit, cursor) {
        return await db.fetchPosts(pool, userId, limit, cursor);
    }
}
