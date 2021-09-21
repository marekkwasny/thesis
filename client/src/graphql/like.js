import { gql } from '@apollo/client';

export const likePost = gql`
    mutation likePost($user: ID!, $post: ID!) {
        likePost(user: $user, post: $post)
    }
`;

export const likePostOne = gql`
    mutation likePostOne($user: ID!, $post: ID!) {
        likePostOne(user: $user, post: $post)
    }
`;

export const likePostTwo = gql`
    mutation likePostTwo($user: ID!, $post: ID!) {
        likePostTwo(user: $user, post: $post)
    }
`;

export const likePostThree = gql`
    mutation likePostThree($user: ID!, $post: ID!) {
        likePostThree(user: $user, post: $post)
    }
`;

export const unlikePost = gql`
    mutation unlikePost($user: ID!, $post: ID!) {
        unlikePost(user: $user, post: $post)
    }
`;

export const unlikePostOne = gql`
    mutation unlikePostOne($user: ID!, $post: ID!) {
        unlikePostOne(user: $user, post: $post)
    }
`;

export const unlikePostTwo = gql`
    mutation unlikePostTwo($user: ID!, $post: ID!) {
        unlikePostTwo(user: $user, post: $post)
    }
`;

export const unlikePostThree = gql`
    mutation unlikePostThree($user: ID!, $post: ID!) {
        unlikePostThree(user: $user, post: $post)
    }
`;
