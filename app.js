import express from 'express';
import ws from 'ws';
import pg from 'pg';
import cookies from 'cookie-parser';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './schema/index.js';
import { auth } from './middleware/index.js';
import { grantToken } from './routes/authorize.js';

const { Pool } = pg;
const pool = new Pool();

const PORT = 4000;
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(cookies());
app.use(auth);

app.post('/auth', async (req, res) => {
    grantToken(pool, req, res);
});

app.use(
    '/graphql',
    graphqlHTTP((req, res) => {
        return {
            schema: schema,
            pretty: true,
            graphiql: true,
            context: {
                res,
                pool,
                payload: req.user,
            },
        };
    })
);

app.get('*', (_, res) => {
    res.redirect('/');
});

const server = app.listen(process.env.PORT || PORT, () => {
    const wsServer = new ws.Server({
        server,
        path: '/graphql',
    });

    useServer(
        {
            schema: schema,
            execute,
            subscribe,
            onConnect: (ctx) => {
                console.log('Connect', ctx);
            },
            onSubscribe: (ctx, msg) => {
                console.log('Subscribe', { ctx, msg });
            },
            onNext: (ctx, msg, args, result) => {
                console.debug('Next', { ctx, msg, args, result });
            },
            onError: (ctx, msg, errors) => {
                console.error('Error', { ctx, msg, errors });
            },
            onComplete: (ctx, msg) => {
                console.log('Complete', { ctx, msg });
            },
        },
        wsServer
    );

    console.log(`SERVER READY`);
});
