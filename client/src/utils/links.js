import { getAccessToken, isAccessTokenValid, setAccessToken } from './token';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { HttpLink, ApolloLink } from '@apollo/client';

export const httpLink = new HttpLink({
    uri: '/graphql',
    credentials: 'include',
});

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
