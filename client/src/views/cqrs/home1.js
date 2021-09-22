import { useQuery } from '@apollo/client';
import React from 'react';
import { client } from '../..';
import { PostCreatorOne } from '../../components/cqrs/PostCreator1';
import { PostsDataOne } from '../../components/cqrs/PostsData1';
import { Header } from '../../components/Header';
import { postsOneQuery } from '../../graphql/post';
import { meQuery } from '../../graphql/user';

//Komponent definiujący widok CQRS 1.
export function HomeOne() {
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

    const { loading, data, fetchMore, refetch } = useQuery(postsOneQuery, {
        variables: {
            user: user,
            limit: 10,
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
                <PostCreatorOne user={user} refetch={refetch} />
                <PostsDataOne
                    user={user}
                    loading={loading}
                    data={data}
                    fetchMore={fetchMore}
                />
            </div>
        </div>
    );
}
