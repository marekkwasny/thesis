import { GraphQLObjectType } from 'graphql';
import {
    likePost,
    likePost1,
    likePost2,
    likePost3,
    unlikePost,
    unlikePost1,
    unlikePost2,
    unlikePost3,
} from './like.js';
import { createPost, createPost1, createPost2, createPost3 } from './post.js';
import { createUser, loginUser, logoutUser, logoutUserFromAllSessions } from './user.js';

export const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: createUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        fullLogoutUser: logoutUserFromAllSessions,
        createPost: createPost,
        likePost: likePost,
        unlikePost: unlikePost,
        createPostOne: createPost1,
        likePostOne: likePost1,
        unlikePostOne: unlikePost1,
        createPostTwo: createPost2,
        likePostTwo: likePost2,
        unlikePostTwo: unlikePost2,
        createPostThree: createPost3,
        likePostThree: likePost3,
        unlikePostThree: unlikePost3,
    },
});
