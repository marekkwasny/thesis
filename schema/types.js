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

export const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
});

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    },
});

export const LoginResponseType = new GraphQLObjectType({
    name: 'Login',
    fields: {
        accessToken: { type: GraphQLNonNull(GraphQLString) },
        user: { type: UserType },
    },
});

export const LogoutResponseType = new GraphQLObjectType({
    name: 'Logout',
    fields: {
        id: { type: GraphQLID },
    },
});

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

export const PostsType = new GraphQLObjectType({
    name: 'PostsType',
    fields: {
        hasMore: { type: GraphQLBoolean },
        posts: { type: GraphQLList(PostsListType) },
    },
});
