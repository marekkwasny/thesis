import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { client } from '..';
import { Header } from '../components/Header';
import { PostCreator } from '../components/PostCreator';
import { PostsData } from '../components/PostsData';
import { postsQuery } from '../graphql/post';
import { meQuery } from '../graphql/user';

export function Home() {
    const [state, setState] = useState(0);

    let user = null;
    const cache = client.readQuery({ query: meQuery });

    if (cache && cache.me) {
        user = cache.me.id;
    }

    const query = useQuery(meQuery, {
        skip: cache,
    });

    if (query && query.me) {
        user = query.me.id;
    }

    const { loading, data, fetchMore, refetch } = useQuery(postsQuery, {
        variables: {
            user: user,
            limit: 5,
            cursor: 0,
        },
        fetchPolicy: 'network-only',
    });

    return (
        <div>
            <div>
                <Header props />
            </div>
            <br />
            <div>
                <PostCreator user={user} refetch={refetch} />
                <PostsData user={user} loading={loading} data={data} fetchMore={fetchMore} />
            </div>
        </div>
    );
}
