import { makeSchema, fieldAuthorizePlugin } from 'nexus';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import path from 'path';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

import * as objectTypes from './nexus-prisma/objectTypes';
import * as inputTypes from './nexus-prisma/inputTypes';
import * as queries from './nexus-prisma/queries/queries';
import * as filteredQueries from './nexus-prisma/queries/filteredQueries';
import * as createMutation from './nexus-prisma/mutations/createMutations';
import * as updateMutation from './nexus-prisma/mutations/updateMutations';
// import * as fauxDeleteMutations from './nexus-prisma/mutations/fauxDeleteMutations';
import * as subscriptions from './nexus-prisma/subscriptions/subscriptions';

import './generated/graphql-types'; // import types as side-effect
// .d.ts files can only be "auto-imported" if they have no exports

// Import PrismaClient
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 5050;

// Initialize Prisma Client
const db = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET;

const schema = makeSchema({
    // nonNullDefaults: {
    //     // defaults to non-nullable (e.g. Person!)
    //     input: true,
    //     output: true,
    // },
    types: [
        objectTypes,
        inputTypes,
        queries,
        filteredQueries,
        createMutation,
        updateMutation,
        // fauxDeleteMutations,
        subscriptions,
    ],
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
    // context: {
    //     db,
    // },
    context: async ({ req }) => {
        const context = { db };

        if (req.body.operationName === 'IntrospectionQuery') {
            return context;
        }

        console.log('req body', req.body.operationName);

        if (
            req.body.operationName === 'CoacheeLogin' ||
            req.body.operationName === 'CoachLogin' ||
            req.body.operationName === 'CreateCoachee' ||
            req.body.operationName === 'CreateCoach'
        ) {
            return context;
        }

        const token = req.headers.authorization;

        if (!token) {
            throw new Error('No token provided');
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return context;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    },
});

server
    .start() // start Apollo Server first
    .then(() => {
        server.applyMiddleware({ app });

        // Start the Express server and capture the HTTP server instance
        const httpServer = app.listen(PORT, () => {
            console.log(
                `Apollo server has started at http://localhost:${PORT}`,
            );
        });

        // WebSocket server
        const wsServer = new WebSocketServer({
            server: httpServer, // Use the HTTP server instance
            path: '/graphql',
        });

        // Integrate the WebSocket server with Apollo Server
        useServer({ schema }, wsServer);
    });
