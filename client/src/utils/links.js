import { getAccessToken, isAccessTokenValid, setAccessToken } from './token';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { HttpLink, ApolloLink } from '@apollo/client';

//Link definiujący domyślne wysyłanie zapytań pod punkt końcowy GraphQL.
export const httpLink = new HttpLink({
    uri: '/graphql',
    credentials: 'include',
});

//Link ustawiający odpowiedni nagłówek z tokenem dostępu przed wysłaniem zapytania.
export const authLink = new ApolloLink((operation, forward) => {
    const accessToken = getAccessToken();
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    }));

    return forward(operation);
});

//Link implementujący obsługę odświeżania tokenu dostępu.
export const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => isAccessTokenValid(),
    fetchAccessToken: () => {
        return fetch('/auth', {
            method: 'POST',
            credentials: 'include',
        });
    },
    handleFetch: (accessToken) => {
        setAccessToken(accessToken);
    },
});
