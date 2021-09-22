import { useMutation, useQuery } from '@apollo/react-hooks';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { fullLogoutUserMutation, logoutUserMutation, meQuery } from '../graphql/user';
import { setAccessToken } from '../utils/token';
import { useScrollTrigger, Slide } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: 5,
        color: 'inherit',
    },
}));

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

//Komponent definiujący nagłówek.
export function Header(props) {
    const classes = useStyles();
    const history = useHistory();
    const [logout, { client }] = useMutation(logoutUserMutation);
    const [fullLogout] = useMutation(fullLogoutUserMutation);

    const cache = client.readQuery({ query: meQuery });

    const { data } = useQuery(meQuery, {
        fetchPolicy: 'network-only',
        skip: cache,
    });

    let isUser = false;

    if ((cache && cache.me) || (data && data.me)) {
        isUser = true;
    }

    if (isUser) {
        return (
            <HideOnScroll {...props} block="true">
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            Hello, {cache.me.name}!
                        </Typography>
                        <Button
                            className={classes.button}
                            onClick={async () => {
                                history.push({
                                    pathname: '/',
                                    state: { refetch: true },
                                });
                            }}
                        >
                            Home
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={async () => {
                                history.push({
                                    pathname: '/cqrs1',
                                    state: { refetch: true },
                                });
                            }}
                        >
                            CQRS 1
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={async () => {
                                history.push({
                                    pathname: '/cqrs2',
                                    state: { refetch: true },
                                });
                            }}
                        >
                            CQRS 2
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={async () => {
                                history.push({
                                    pathname: '/cqrs3',
                                    state: { refetch: true },
                                });
                            }}
                        >
                            CQRS 3
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={async () => {
                                await logout();
                                setAccessToken('');
                                await client.resetStore();
                                history.push('/login');
                            }}
                        >
                            Logout
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={async () => {
                                await fullLogout();
                                setAccessToken('');
                                await client.resetStore();
                                history.push('/login');
                            }}
                        >
                            Logout everywhere
                        </Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        );
    } else {
        return (
            <header>
                <div>
                    <Link to={'/login'}>login</Link>
                </div>
                <div>
                    <Link to={'/register'}>register</Link>
                </div>
            </header>
        );
    }
}
