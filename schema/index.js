import { GraphQLSchema } from 'graphql';
import { Query } from './queries/index.js';
import { Mutation } from './mutations/index.js';

//Definicja schematu grafowego języka zapytań.
export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
