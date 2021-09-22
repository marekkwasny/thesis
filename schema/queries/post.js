import { GraphQLID, GraphQLInt } from 'graphql';
import { PostsType } from '../types.js';
import * as db from '../../db/index.js';
import { QueryService1 } from '../../controllers/first/query.js';
import { QueryService2 } from '../../controllers/second/query.js';
import { QueryService3 } from '../../controllers/third/query.js';

//Zapytanie zwracające treści.
export const Posts = {
    type: PostsType,
    args: {
        user: { type: GraphQLID },
        limit: { type: GraphQLInt },
        cursor: { type: GraphQLInt },
    },
    resolve: async (_, args, ctx) => {
        return await db.fetchPosts(
            ctx.pool,
            parseInt(args.user),
            args.limit,
            args.cursor
        );
    },
};

//Zapytanie zwracające treści dla pierwszego kroku CQRS.
export const Posts1 = {
    type: PostsType,
    args: {
        user: { type: GraphQLID },
        limit: { type: GraphQLInt },
        cursor: { type: GraphQLInt },
    },
    resolve: async (_, args, ctx) => {
        const qs = new QueryService1();
        return await qs.fetchPosts(
            ctx.pool,
            parseInt(args.user),
            args.limit,
            args.cursor
        );
    },
};

//Zapytanie zwracające treści dla drugiego kroku CQRS.
export const Posts2 = {
    type: PostsType,
    args: {
        user: { type: GraphQLID },
        limit: { type: GraphQLInt },
        cursor: { type: GraphQLInt },
    },
    resolve: async (_, args, ctx) => {
        const qs = new QueryService2();
        return await qs.fetchPosts(
            ctx.pool,
            parseInt(args.user),
            args.limit,
            args.cursor
        );
    },
};

//Zapytanie zwracające treści dla trzeciego kroku CQRS.
export const Posts3 = {
    type: PostsType,
    args: {
        user: { type: GraphQLID },
        limit: { type: GraphQLInt },
        cursor: { type: GraphQLInt },
    },
    resolve: async (_, args, ctx) => {
        const qs = new QueryService3();
        return await qs.fetchPosts(
            ctx.pool,
            parseInt(args.user),
            args.limit,
            args.cursor
        );
    },
};
