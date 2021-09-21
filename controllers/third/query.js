import { IQueryService } from '../interfaces.js';
import * as db from '../../db/index.js';

export class QueryService3 extends IQueryService {
    constructor() {
        super();
    }

    async fetchPosts(pool, userId, limit, cursor) {
        const data = await db.fetchPostsDenormalized(pool, userId);
        const posts = new Map();
        data.map((entry) => {
            aggregate(entry, posts, userId);
        });

        const res = [];
        posts.forEach((value) => {
            if (cursor === 0) {
                res.push(value);
            } else if (value.id < cursor) {
                res.push(value);
            }
        });

        return { hasMore: res.length - limit > 0, posts: res.reverse().slice(0, limit) };
    }
}

function aggregate(entry, posts, user) {
    if (entry.is_create) {
        posts.set(entry.id, {
            id: entry.id,
            content: entry.content,
            likes: entry.likes,
            userRequesting: user,
            isLikedByUser: false,
            user: {
                id: entry.author_id,
                name: entry.author_name,
            },
        });
    }

    if (entry.is_like) {
        const post = posts.get(entry.like_post_id);

        if (!post) {
            return;
        }

        if (user == entry.like_user_id) {
            post.isLikedByUser = true;
        }
    }
}
