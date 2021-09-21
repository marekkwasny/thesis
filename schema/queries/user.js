import { GraphQLList } from 'graphql';
import { UserType } from '../types.js';
import * as db from '../../db/index.js';

export const Users = {
    type: GraphQLList(UserType),
    async resolve(_, __, ctx) {
        return await db.getUsers(ctx.pool);
    },
};

export const Me = {
    type: UserType,
    async resolve(_, __, ctx) {
        if (!ctx.payload || ctx.payload === 'TOKEN_EXPIRED') {
            return null;
        }

        return await db.findUser(ctx.pool, 'id', ctx.payload.id);
    },
};
