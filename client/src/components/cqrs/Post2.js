import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { likePostTwo, unlikePostTwo } from '../../graphql/like';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton, Grid, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

const useStyles = makeStyles({
    post: {
        maxWidth: 1250,
        minWidth: 100,
        marginTop: 15,
    },
});

export function PostTwo({ item, user }) {
    const classes = useStyles();
    const [likeButton, setLikeButton] = useState(item.isLikedByUser ? Favorite : FavoriteBorder);
    const [likeButtonText, setLikeButtonText] = useState(item.likes);
    const [like] = useMutation(likePostTwo);
    const [unlike] = useMutation(unlikePostTwo);

    return (
        <Grid item xs>
            <Paper elevation={3} className={classes.post}>
                <ListItem>
                    <ListItemText
                        style={{ wordWrap: 'break-word' }}
                        primary={item.user.name}
                        secondary={item.content}
                    />
                    <ListItemIcon>
                        <IconButton
                            size="small"
                            key={`${item.id}-2`}
                            onClick={async () => {
                                if (likeButton === Favorite) {
                                    setLikeButton(FavoriteBorder);
                                    setLikeButtonText(parseInt(likeButtonText) - 1);
                                    await unlike({ variables: { user: user, post: item.id } });
                                } else {
                                    setLikeButton(Favorite);
                                    setLikeButtonText(parseInt(likeButtonText) + 1);
                                    await like({ variables: { user: user, post: item.id } });
                                }
                            }}
                        >
                            <IconText icon={likeButton} text={likeButtonText} key={item.id} />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            </Paper>
        </Grid>
    );
}

const IconText = ({ icon, text }) => (
    <div>
        {React.createElement(icon)}
        {text}
    </div>
);
