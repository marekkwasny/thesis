import React from 'react';
import { Waypoint } from 'react-waypoint';
import { List } from '@material-ui/core';
import { PostOne } from './Post1';

export const PostsDataOne = ({ user, loading, data, fetchMore }) => {
    if (loading) return <div></div>;

    return (
        <div>
            <center>
                {data.postsOne.posts.map((x, i) => (
                    <React.Fragment key={`${i}-${user}-${x.id}-1`}>
                        <List>
                            <PostOne item={x} user={user} />
                        </List>
                        {data.postsOne.hasMore && i === data.postsOne.posts.length - 5 && (
                            <Waypoint
                                onEnter={() => {
                                    fetchMore({
                                        variables: {
                                            user: user,
                                            limit: 5,
                                            cursor: parseInt(data.postsOne.posts[data.postsOne.posts.length - 1].id),
                                        },
                                        updateQuery: (pv, { fetchMoreResult }) => {
                                            if (!fetchMoreResult) {
                                                return pv;
                                            }

                                            return {
                                                postsOne: {
                                                    __typename: 'PostsType',
                                                    hasMore: fetchMoreResult.postsOne.hasMore,
                                                    posts: [...pv.postsOne.posts, ...fetchMoreResult.postsOne.posts],
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
