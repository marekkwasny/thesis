import { GraphQLObjectType } from 'graphql';
import { Posts, Posts1, Posts2, Posts3 } from './post.js';
import { Users, Me } from './user.js';

export const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users: Users,
        me: Me,
        posts: Posts,
        postsOne: Posts1,
        postsTwo: Posts2,
        postsThree: Posts3,
    },
});
