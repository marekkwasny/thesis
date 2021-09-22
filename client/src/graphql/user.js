import { gql } from '@apollo/client';

//Zapytanie pobierające dane użytkownika.
export const meQuery = gql`
    {
        me {
            id
            name
            email
        }
    }
`;

//Zapytanie pobierającę listę użytkowników.
export const usersQuery = gql`
    {
        users {
            id
            name
            email
        }
    }
`;

//Mutacja tworząca użytkownika.
export const createUserMutation = gql`
    mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(user: { name: $name, email: $email, password: $password }) {
            id
            name
            email
        }
    }
`;

//Mutacja logująca użytkownika.
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

//Mutacja do wylogowania użytkownika z konkretnej sesji.
export const logoutUserMutation = gql`
    mutation {
        logoutUser
    }
`;

//Mutacja do wylogowania użytkownika z wszystkich sesji.
export const fullLogoutUserMutation = gql`
    mutation {
        fullLogoutUser
    }
`;
