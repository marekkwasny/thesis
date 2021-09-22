import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql';
import { CreatePostType } from '../types.js';
import * as db from '../../db/index.js';
import { CommandService1 } from '../../controllers/first/command.js';
import { CommandService2 } from '../../controllers/second/command.js';
import { CommandService3 } from '../../controllers/third/command.js';

//Mutacja tworzenia nowej treści.
export const createPost = {
    type: CreatePostType,
    args: {
        user: { type: GraphQLID },
        content: { type: GraphQLString },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.content) {
            return null;
        }

        return await db.createNewPost(ctx.pool, args.user, args.content);
    },
};

//Mutacja tworzenia nowej treści dla pierwszego kroku CQRS.
export const createPost1 = {
    type: CreatePostType,
    args: {
        user: { type: GraphQLID },
        content: { type: GraphQLString },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.content) {
            return null;
        }

        const cs = new CommandService1();
        return await cs.createPost(ctx.pool, args.user, args.content);
    },
};

//Mutacja tworzenia nowej treści dla drugiego kroku CQRS.
export const createPost2 = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        content: { type: GraphQLString },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.content) {
            return null;
        }

        const cs = new CommandService2();
        return await cs.createPost(ctx.pool, args.user, args.content);
    },
};

//Mutacja tworzenia nowej treści dla trzeciego kroku CQRS.
export const createPost3 = {
    type: GraphQLBoolean,
    args: {
        user: { type: GraphQLID },
        content: { type: GraphQLString },
    },
    resolve: async (_, args, ctx) => {
        if (!args.user || !args.content) {
            return null;
        }

        const cs = new CommandService3();
        return await cs.createPost(ctx.pool, args.user, args.content);
    },
};
