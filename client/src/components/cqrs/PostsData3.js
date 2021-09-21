import React from 'react';
import { Waypoint } from 'react-waypoint';
import { List } from '@material-ui/core';
import { PostThree } from './Post3';

export const PostsDataThree = ({ user, loading, data, fetchMore }) => {
    if (loading) return <div></div>;

    return (
        <div>
            <center>
                {data.postsThree.posts.map((x, i) => (
                    <React.Fragment key={`${i}-${user}-${x.id}-3`}>
                        <List>
                            <PostThree item={x} user={user} />
                        </List>
                        {data.postsThree.hasMore && i === data.postsThree.posts.length - 5 && (
                            <Waypoint
                                onEnter={() => {
                                    fetchMore({
                                        variables: {
                                            user: user,
                                            limit: 5,
                                            cursor: parseInt(
                                                data.postsThree.posts[data.postsThree.posts.length - 1].id
                                            ),
                                        },
                                        updateQuery: (pv, { fetchMoreResult }) => {
                                            if (!fetchMoreResult) {
                                                return pv;
                                            }

                                            return {
                                                postsThree: {
                                                    __typename: 'PostsType',
                                                    hasMore: fetchMoreResult.postsThree.hasMore,
                                                    posts: [
                                                        ...pv.postsThree.posts,
                                                        ...fetchMoreResult.postsThree.posts,
                                                    ],
                                                },
                                            };
                                        },
                                    });
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </center>
        </div>
    );
};
