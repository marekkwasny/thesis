import { GraphQLBoolean, GraphQLID } from 'graphql';
import { CommandService1 } from '../../controllers/first/command.js';
import { CommandService2 } from '../../controllers/second/command.js';
import { CommandService3 } from '../../controllers/third/command.js';
import * as db from '../../db/index.js';

//Mutacja polubienia treści.
export const likePost = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        post: { type: GraphQLID },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.post) {
            return null;
        }

        return await db.likePost(ctx.pool, parseInt(args.user), parseInt(args.post));
    },
};

//Mutacja wycofania polubienia treści.
export const unlikePost = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        post: { type: GraphQLID },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.post) {
            return null;
        }

        return await db.unlikePost(ctx.pool, parseInt(args.user), parseInt(args.post));
    },
};

//Mutacja polubienia treści dla pierwszego kroku CQRS.
export const likePost1 = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        post: { type: GraphQLID },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.post) {
            return null;
        }

        const cs = new CommandService1();
        return await cs.likePost(ctx.pool, parseInt(args.user), parseInt(args.post));
    },
};

//Mutacja wycofania polubienia treści dla pierwszego kroku CQRS.
export const unlikePost1 = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        post: { type: GraphQLID },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.post) {
            return null;
        }

        const cs = new CommandService1();
        return await cs.unlikePost(ctx.pool, parseInt(args.user), parseInt(args.post));
    },
};

//Mutacja polubienia treści dla drugiego kroku CQRS.
export const likePost2 = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        post: { type: GraphQLID },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.post) {
            return null;
        }

        const cs = new CommandService2();
        return await cs.likePost(ctx.pool, parseInt(args.user), parseInt(args.post));
    },
};

//Mutacja wycofania polubienia treści dla drugiego kroku CQRS.
export const unlikePost2 = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        post: { type: GraphQLID },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.post) {
            return null;
        }

        const cs = new CommandService2();
        return await cs.unlikePost(ctx.pool, parseInt(args.user), parseInt(args.post));
    },
};

//Mutacja polubienia treści dla trzeciego kroku CQRS.
export const likePost3 = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        post: { type: GraphQLID },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.post) {
            return null;
        }

        const cs = new CommandService3();
        return await cs.likePost(ctx.pool, parseInt(args.user), parseInt(args.post));
    },
};

//Mutacja wycofania polubienia treści dla trzeciego kroku CQRS.
export const unlikePost3 = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        post: { type: GraphQLID },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.post) {
            return null;
        }

        const cs = new CommandService3();
        return await cs.unlikePost(ctx.pool, parseInt(args.user), parseInt(args.post));
    },
};
