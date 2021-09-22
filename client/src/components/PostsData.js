import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Post } from './Post';
import { List } from '@material-ui/core';

//Komponent wczytujący posty dla widoku Home.
export const PostsData = ({ user, loading, data, fetchMore }) => {
    if (loading) return <div>...</div>;

    return (
        <div>
            <center>
                {data.posts.posts.map((x, i) => (
                    <React.Fragment key={`${i}-${user}-${x.id}`}>
                        <List>
                            <Post item={x} user={user} />
                        </List>
                        {data.posts.hasMore && i === data.posts.posts.length - 5 && (
                            <Waypoint
                                onEnter={() => {
                                    fetchMore({
                                        variables: {
                                            user: user,
                                            limit: 5,
                                            cursor: parseInt(
                                                data.posts.posts[
                                                    data.posts.posts.length - 1
                                                ].id
                                            ),
                                        },
                                        updateQuery: (pv, { fetchMoreResult }) => {
                                            if (!fetchMoreResult) {
                                                return pv;
                                            }

                                            return {
                                                posts: {
                                                    __typename: 'PostsType',
                                                    hasMore:
                                                        fetchMoreResult.posts.hasMore,
                                                    posts: [
                                                        ...pv.posts.posts,
                                                        ...fetchMoreResult.posts.posts,
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
