import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { client } from '..';
import { loginUserMutation, meQuery } from '../graphql/user';
import { setAccessToken } from '../utils/token';
import {
    Avatar,
    Container,
    Grid,
    makeStyles,
    TextField,
    Typography,
    Button,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

//Komponent definiujący widok logowania.
export function Login({ history }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useMutation(loginUserMutation);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="textPrimary">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmitCapture={async (e) => {
                        e.preventDefault();
                        const response = await login({
                            variables: {
                                email,
                                password,
                            },
                            update: (store, { data }) => {
                                if (!data.loginUser) {
                                    return null;
                                }
                                store.writeQuery({
                                    query: meQuery,
                                    data: {
                                        me: data.loginUser.user,
                                    },
                                });
                            },
                        });

                        if (response && response.data.loginUser) {
                            setAccessToken(response.data.loginUser.accessToken);
                        }

                        await client.clearStore();
                        history.push('/');
                    }}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                to={'/register'}
                                variant="body2"
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography color="textSecondary">
                                    Don't have an account? Sign Up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
