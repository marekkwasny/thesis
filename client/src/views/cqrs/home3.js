import { useQuery } from "@apollo/client";
import React from "react";
import { client } from "../..";
import { PostCreatorThree } from "../../components/cqrs/PostCreator3";
import { PostsDataThree } from "../../components/cqrs/PostsData3";
import { Header } from "../../components/Header";
import { postsThreeQuery } from "../../graphql/post";
import { meQuery } from "../../graphql/user";

export function HomeThree() {
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

    const { loading, data, fetchMore, refetch } = useQuery(postsThreeQuery, {
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
                <PostCreatorThree user={user} refetch={refetch} />
                <PostsDataThree
                    user={user}
                    loading={loading}
                    data={data}
                    fetchMore={fetchMore}
                />
            </div>
        </div>
    );
}
