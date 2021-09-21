import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { authLink, httpLink, tokenRefreshLink } from './utils/links';

export const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            posts: {
                keyFields: ['id', 'userRequesting'],
            },
        },
    }),
    credentials: 'include',
    link: from([tokenRefreshLink, authLink, httpLink]),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
