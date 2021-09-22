import {
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from 'graphql';

//Typ obiektu przyjmowanego jako argument dla mutacji tworzącej nowego użytkownika.
export const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
});

//Typ zwracanej odpowiedzi dla mutacji tworzącej nowego użytkownika.
export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

//Typ definiujący autora treści.
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    },
});

//Typ zwracanej odpowiedzi dla mutacji logowania.
export const LoginResponseType = new GraphQLObjectType({
    name: 'Login',
    fields: {
        accessToken: { type: GraphQLNonNull(GraphQLString) },
        user: { type: UserType },
    },
});

//Typ zwracanej odpowiedzi dla mutacji wylogowania.
export const LogoutResponseType = new GraphQLObjectType({
    name: 'Logout',
    fields: {
        id: { type: GraphQLID },
    },
});

//Typ zwracanej odpowiedzi mutacji tworzenia nowych treści dla widoku Home oraz CQRS 1.
export const CreatePostType = new GraphQLObjectType({
    name: 'CreatePost',
    fields: {
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        likes: { type: GraphQLInt },
    },
});

const PostsListType = new GraphQLObjectType({
    name: 'PostsListType',
    fields: {
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        likes: { type: GraphQLInt },
        userRequesting: { type: GraphQLID },
        isLikedByUser: { type: GraphQLBoolean },
        user: { type: AuthorType },
    },
});

//Typ odpowiedzi dla zapytania zwracającego listę treści.
export const PostsType = new GraphQLObjectType({
    name: 'PostsType',
    fields: {
        hasMore: { type: GraphQLBoolean },
        posts: { type: GraphQLList(PostsListType) },
    },
});
