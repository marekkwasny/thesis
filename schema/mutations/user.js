import { GraphQLBoolean, GraphQLString } from 'graphql';
import { compare } from 'bcrypt';
import { UserInputType, UserType, LoginResponseType } from '../types.js';
import * as db from '../../db/index.js';
import { createRefreshToken, createAccessToken, sendRefreshToken } from '../../utils/tokens.js';

export const createUser = {
    type: UserType,
    args: {
        user: { type: UserInputType },
    },
    resolve: async (_, args, ctx) => {
        const { name, email, password } = args.user;
        return await db.createUser(ctx.pool, name, email, password);
    },
};

export const loginUser = {
    type: LoginResponseType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(_, args, ctx) {
        const { id, email, name, password } = await db.findUser(ctx.pool, 'email', args.email);

        if (!email || !id) {
            return null;
        }

        const valid = await compare(args.password, password);

        if (!valid) {
            return null;
        }

        const { tokenVersion } = await db.getTokenVersion(ctx.pool, id);
        sendRefreshToken(ctx.res, createRefreshToken(id, tokenVersion));

        return {
            accessToken: createAccessToken(id),
            user: { id: id, name: name, email: email },
        };
    },
};

export const logoutUser = {
    type: GraphQLBoolean,
    async resolve(_, __, ctx) {
        sendRefreshToken(ctx.res, '');

        return true;
    },
};

export const logoutUserFromAllSessions = {
    type: GraphQLBoolean,
    async resolve(_, __, ctx) {
        await db.revokeToken(ctx.pool, ctx.payload.id);
        sendRefreshToken(ctx.res, '');

        return true;
    },
};
