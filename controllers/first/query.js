import { IQueryService } from '../interfaces.js';
import * as db from '../../db/index.js';

//Implementacja QueryService dla pierwszego kroku CQRS.
export class QueryService1 extends IQueryService {
    constructor() {
        super();
    }

    async fetchPosts(pool, userId, limit, cursor) {
        return await db.fetchPosts(pool, userId, limit, cursor);
    }
}
