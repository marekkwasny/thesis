import { gql } from '@apollo/client';

//Zapytanie pobierające listę treści dla widoku Home.
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

//Zapytanie pobierające listę treści dla widoku CQRS 1.
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

//Zapytanie pobierające listę treści dla widoku CQRS 2.
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

//Zapytanie pobierające listę treści dla widoku CQRS 3.
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

//Mutacja tworząca treść dla widoku Home.
export const createPostQuery = gql`
    mutation createPost($user: ID!, $content: String!) {
        createPost(user: $user, content: $content) {
            id
            content
        }
    }
`;

//Mutacja tworząca treść dla widoku CQRS 1.
export const createPostOneQuery = gql`
    mutation createPostOne($user: ID!, $content: String!) {
        createPostOne(user: $user, content: $content) {
            id
            content
        }
    }
`;

//Mutacja tworząca treść dla widoku CQRS 2.
export const createPostTwoQuery = gql`
    mutation createPostTwo($user: ID!, $content: String!) {
        createPostTwo(user: $user, content: $content)
    }
`;

//Mutacja tworząca treść dla widoku CQRS 3.
export const createPostThreeQuery = gql`
    mutation createPostThree($user: ID!, $content: String!) {
        createPostThree(user: $user, content: $content)
    }
`;
