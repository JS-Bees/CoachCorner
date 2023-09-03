import { makeSchema, fieldAuthorizePlugin } from 'nexus';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import path from 'path';

import * as types from './schema';

import './generated/graphql-types'; // import types as side-effect
// .d.ts files can only be "auto-imported" if they have no exports 🤮
// this is for the authorize

const app = express();
const PORT = 5050;

const schema = makeSchema({
    nonNullDefaults: {
        // defaults to non-nullable (e.g. Person!)
        input: true,
        output: true,
    },
    types, // this is imported as `import * from schema.ts`
    outputs: {
        typegen: path.join(__dirname, 'generated/graphql-types.ts'),
        schema: path.join(__dirname, 'schema.graphql'),
    },
    plugins: [
        // just for demo that GraphQL is security at field level
        fieldAuthorizePlugin(),
        // can use this to protect specific fields
    ],
});

// this server inside a server handles the GraphQL part
const server = new ApolloServer({
    schema,
});

server
    .start() // start Apollo Server first
    .then(() => {
        server.applyMiddleware({ app });
        app.listen(PORT, () => {
            // then start Express
            console.log(
                `Apollo server has started at http://localhost:${PORT}`,
            );
        });
    });

//^above works
