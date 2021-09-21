import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { client } from '..';
import { meQuery } from '../graphql/user';
import { useQuery } from '@apollo/react-hooks';

export const PublicRoute = ({ component: Component, ...rest }) => {
    const cache = client.readQuery({ query: meQuery });

    const { data } = useQuery(meQuery, {
        fetchPolicy: 'network-only',
        skip: cache,
    });

    let isUser = false;

    if ((cache && cache.me) || (data && data.me)) {
        isUser = true;
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                !isUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};
