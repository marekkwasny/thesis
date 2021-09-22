import React from 'react';
import { Waypoint } from 'react-waypoint';
import { List } from '@material-ui/core';
import { PostTwo } from './Post2';

//Komponent wczytujący posty dla widoku CQRS 2.
export const PostsDataTwo = ({ user, loading, data, fetchMore }) => {
    if (loading) return <div></div>;

    return (
        <div>
            <center>
                {data.postsTwo.posts.map((x, i) => (
                    <React.Fragment key={`${i}-${user}-${x.id}-2`}>
                        <List>
                            <PostTwo item={x} user={user} />
                        </List>
                        {data.postsTwo.hasMore && i === data.postsTwo.posts.length - 5 && (
                            <Waypoint
                                onEnter={() => {
                                    fetchMore({
                                        variables: {
                                            user: user,
                                            limit: 5,
                                            cursor: parseInt(
                                                data.postsTwo.posts[
                                                    data.postsTwo.posts.length - 1
                                                ].id
                                            ),
                                        },
                                        updateQuery: (pv, { fetchMoreResult }) => {
                                            if (!fetchMoreResult) {
                                                return pv;
                                            }

                                            return {
                                                postsTwo: {
                                                    __typename: 'PostsType',
                                                    hasMore:
                                                        fetchMoreResult.postsTwo.hasMore,
                                                    posts: [
                                                        ...pv.postsTwo.posts,
                                                        ...fetchMoreResult.postsTwo.posts,
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
