import { gql } from '@apollo/client';

//Mutacja polubienia treści dla widoku Home.
export const likePost = gql`
    mutation likePost($user: ID!, $post: ID!) {
        likePost(user: $user, post: $post)
    }
`;

//Mutacja polubienia treści dla widoku CQRS 1.
export const likePostOne = gql`
    mutation likePostOne($user: ID!, $post: ID!) {
        likePostOne(user: $user, post: $post)
    }
`;

//Mutacja polubienia treści dla widoku CQRS 2.
export const likePostTwo = gql`
    mutation likePostTwo($user: ID!, $post: ID!) {
        likePostTwo(user: $user, post: $post)
    }
`;

//Mutacja polubienia treści dla widoku CQRS 3.
export const likePostThree = gql`
    mutation likePostThree($user: ID!, $post: ID!) {
        likePostThree(user: $user, post: $post)
    }
`;

//Mutacja wycofania polubienia treści dla widoku Home.
export const unlikePost = gql`
    mutation unlikePost($user: ID!, $post: ID!) {
        unlikePost(user: $user, post: $post)
    }
`;

//Mutacja wycofania polubienia treści dla widoku CQRS 1.
export const unlikePostOne = gql`
    mutation unlikePostOne($user: ID!, $post: ID!) {
        unlikePostOne(user: $user, post: $post)
    }
`;

//Mutacja wycofania polubienia treści dla widoku CQRS 2.
export const unlikePostTwo = gql`
    mutation unlikePostTwo($user: ID!, $post: ID!) {
        unlikePostTwo(user: $user, post: $post)
    }
`;

//Mutacja wycofania polubienia treści dla widoku CQRS 3.
export const unlikePostThree = gql`
    mutation unlikePostThree($user: ID!, $post: ID!) {
        unlikePostThree(user: $user, post: $post)
    }
`;
