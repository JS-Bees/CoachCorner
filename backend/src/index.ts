// import { makeSchema, fieldAuthorizePlugin } from 'nexus';
// import { ApolloServer } from 'apollo-server-express';
// import express from 'express';
// import path from 'path';

// // import * as types from './nexus-prisma/schema'; // can remove if it restructuring directory works

// import * as enums from './nexus-prisma/enums';
// import * as objectTypes from './nexus-prisma/objectTypes';
// import * as queries from './nexus-prisma/queries/queries';

// import './generated/graphql-types'; // import types as side-effect
// // .d.ts files can only be "auto-imported" if they have no exports 🤮
// // this is for the authorize

// const app = express();
// const PORT = 5050;

// const schema = makeSchema({
//     nonNullDefaults: {
//         // defaults to non-nullable (e.g. Person!)
//         input: true,
//         output: true,
//     },
//     types: [enums, objectTypes, queries],
//     outputs: {
//         typegen: path.join(__dirname, 'generated/graphql-types.ts'),
//         schema: path.join(__dirname, '../../frontend/schema.graphql'),
//         // ^ generates the schema.graphql file in the frontend
//     },
//     plugins: [
//         // just for demo that GraphQL is security at field level
//         fieldAuthorizePlugin(),
//         // can use this to protect specific fields
//     ],
// });

// // this server inside a server handles the GraphQL part
// const server = new ApolloServer({
//     schema,
// });

// server
//     .start() // start Apollo Server first
//     .then(() => {
//         server.applyMiddleware({ app });
//         app.listen(PORT, () => {
//             // then start Express
//             console.log(
//                 `Apollo server has started at http://localhost:${PORT}`,
//             );
//         });
//     });

// TEST

import { makeSchema, fieldAuthorizePlugin } from 'nexus';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import path from 'path';

// import * as types from './nexus-prisma/schema'; // can remove if it restructuring directory works

import * as enums from './nexus-prisma/enums';
import * as objectTypes from './nexus-prisma/objectTypes';
import * as queries from './nexus-prisma/queries/queries';

import './generated/graphql-types'; // import types as side-effect
// .d.ts files can only be "auto-imported" if they have no exports 🤮
// this is for the authorize

// Import PrismaClient
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 5050;

// Initialize Prisma Client
const db = new PrismaClient();

const schema = makeSchema({
    nonNullDefaults: {
        // defaults to non-nullable (e.g. Person!)
        input: true,
        output: true,
    },
    types: [enums, objectTypes, queries],
    outputs: {
        typegen: path.join(__dirname, 'generated/graphql-types.ts'),
        schema: path.join(__dirname, '../../frontend/schema.graphql'),
        // ^ generates the schema.graphql file in the frontend
    },
    // just for demo that GraphQL is security at field level
    plugins: [fieldAuthorizePlugin()],
    // can use this to protect specific fields
});

// Set up Apollo Server with context
// this server inside a server handles the GraphQL part
const server = new ApolloServer({
    schema,
    // Provide context with Prisma Client
    context: {
        db,
    },
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
