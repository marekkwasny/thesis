import { IQueryService } from '../interfaces.js';
import * as db from '../../db/index.js';

export class QueryService2 extends IQueryService {
    constructor() {
        super();
    }

    async fetchPosts(pool, userId, limit, cursor) {
        const data = await db.fetchPostLogs(pool);
        const posts = new Map();
        data.map((event) => {
            restore(event, posts, userId);
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

function restore(event, posts, user) {
    const data = JSON.parse(event.event_log);

    if (data.create) {
        posts.set(event.id, {
            id: parseInt(event.id),
            content: data.create.content,
            likes: 0,
            userRequesting: user,
            isLikedByUser: false,
            user: {
                id: parseInt(data.create.author),
                name: data.create.author_name,
            },
        });
    }

    if (data.like) {
        const post = posts.get(data.like.post);

        if (!post) {
            return;
        }

        post.likes += 1;

        if (user == data.like.user) {
            post.isLikedByUser = true;
        }
    }

    if (data.unlike) {
        const post = posts.get(data.unlike.post);

        if (!post) {
            return;
        }

        post.likes -= 1;

        if (user == data.unlike.user) {
            post.isLikedByUser = false;
        }
    }
}
