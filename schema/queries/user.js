import { GraphQLList } from 'graphql';
import { UserType } from '../types.js';
import * as db from '../../db/index.js';

//Zapytanie zwracające listę użytkowników.
export const Users = {
    type: GraphQLList(UserType),
    async resolve(_, __, ctx) {
        return await db.getUsers(ctx.pool);
    },
};

//Zapytanie zwracające informacje o obecnie zalogowanym użytkowniku.
export const Me = {
    type: UserType,
    async resolve(_, __, ctx) {
        if (!ctx.payload || ctx.payload === 'TOKEN_EXPIRED') {
            return null;
        }

        return await db.findUser(ctx.pool, 'id', ctx.payload.id);
    },
};
