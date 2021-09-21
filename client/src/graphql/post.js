import { gql } from '@apollo/client';

export const postsQuery = gql`
    query posts($user: ID!, $limit: Int!, $cursor: Int!) {
        posts(user: $user, limit: $limit, cursor: $cursor) {
            hasMore
            posts {
                id
                content
                likes
                userRequesting
                isLikedByUser
                user {
                    id
                    name
                }
            }
        }
    }
`;

export const postsOneQuery = gql`
    query postsOne($user: ID!, $limit: Int!, $cursor: Int!) {
        postsOne(user: $user, limit: $limit, cursor: $cursor) {
            hasMore
            posts {
                id
                content
                likes
                userRequesting
                isLikedByUser
                user {
                    id
                    name
                }
            }
        }
    }
`;

export const postsTwoQuery = gql`
    query postsTwo($user: ID!, $limit: Int!, $cursor: Int!) {
        postsTwo(user: $user, limit: $limit, cursor: $cursor) {
            hasMore
            posts {
                id
                content
                likes
                userRequesting
                isLikedByUser
                user {
                    id
                    name
                }
            }
        }
    }
`;

export const postsThreeQuery = gql`
    query postsThree($user: ID!, $limit: Int!, $cursor: Int!) {
        postsThree(user: $user, limit: $limit, cursor: $cursor) {
            hasMore
            posts {
                id
                content
                likes
                userRequesting
                isLikedByUser
                user {
                    id
                    name
                }
            }
        }
    }
`;

export const createPostQuery = gql`
    mutation createPost($user: ID!, $content: String!) {
        createPost(user: $user, content: $content) {
            id
            content
        }
    }
`;

export const createPostOneQuery = gql`
    mutation createPostOne($user: ID!, $content: String!) {
        createPostOne(user: $user, content: $content) {
            id
            content
        }
    }
`;

export const createPostTwoQuery = gql`
    mutation createPostTwo($user: ID!, $content: String!) {
        createPostTwo(user: $user, content: $content)
    }
`;

export const createPostThreeQuery = gql`
    mutation createPostThree($user: ID!, $content: String!) {
        createPostThree(user: $user, content: $content)
    }
`;
