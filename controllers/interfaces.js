export class ICommandService {
    constructor() {
        if (!this.createPost) {
            throw new Error('CommandService requires createPost method');
        }

        if (!this.likePost) {
            throw new Error('CommandService requires likePost method');
        }

        if (!this.unlikePost) {
            throw new Error('CommandService requires unlikePost method');
        }
    }
}

export class IQueryService {
    constructor() {
        if (!this.fetchPosts) {
            throw new Error('QueryService requires fetchPosts method');
        }
    }
}
