import { gql } from '@apollo/client';

export const meQuery = gql`
    {
        me {
            id
            name
            email
        }
    }
`;

export const usersQuery = gql`
    {
        users {
            id
            name
            email
        }
    }
`;

export const createUserMutation = gql`
    mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(user: { name: $name, email: $email, password: $password }) {
            id
            name
            email
        }
    }
`;

export const loginUserMutation = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            accessToken
            user {
                id
                name
                email
            }
        }
    }
`;

export const logoutUserMutation = gql`
    mutation {
        logoutUser
    }
`;

export const fullLogoutUserMutation = gql`
    mutation {
        fullLogoutUser
    }
`;
