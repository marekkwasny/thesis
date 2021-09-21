import { useQuery } from "@apollo/client";
import React from "react";
import { client } from "../..";
import { PostCreatorTwo } from "../../components/cqrs/PostCreator2";
import { PostsDataTwo } from "../../components/cqrs/PostsData2";
import { Header } from "../../components/Header";
import { postsTwoQuery } from "../../graphql/post";
import { meQuery } from "../../graphql/user";

export function HomeTwo() {
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

    const { loading, data, fetchMore, refetch } = useQuery(postsTwoQuery, {
        variables: {
            user: user,
            limit: 10,
            cursor: 0,
        },
        fetchPolicy: "network-only",
    });

    return (
        <div>
            <div>
                <Header props />
            </div>
            <br />
            <div>
                <PostCreatorTwo user={user} refetch={refetch} />
                <PostsDataTwo
                    user={user}
                    loading={loading}
                    data={data}
                    fetchMore={fetchMore}
                />
            </div>
        </div>
    );
}
