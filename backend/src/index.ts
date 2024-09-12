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
// this is for the authorize

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
        // First, provide the db context
        const context = { db };

        // Then, add the authentication logic
        if (req.body.operationName === 'IntrospectionQuery') {
            return context;
        }

        // Add sign up here
        if (
            req.body.operationName === 'CoacheeLogin' ||
            req.body.operationName === 'CoachLogin' ||
            req.body.operationName === 'CreateCoachee' ||
            req.body.operationName === 'CreateCoach'
        ) {
            return context;
        }

        // Get the user token from the headers
        const token = req.headers.authorization;
        // const token =
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3MCwiZW1haWwiOiJtazd4bnRnMTBiQHp2dnp1di5jb20iLCJpYXQiOjE3MjYxMzQzNTAsImV4cCI6MTcyNjEzNzk1MH0.7EQEbVqiAWz9woMCpBiwl_IgPLn4OWLzIrPLC8vOLC0';
        console.log(token);
        // try hard coding it
        if (!token) {
            throw new Error('No token provided');
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            console.log('decoded', decoded);
            // Have to check if decoded user actually exists
            // Verify the user exists in the database
            const coachee = await db.coachee.findUnique({
                where: { id: decoded.userId, email: decoded.email },
            });
            const coach = await db.coach.findUnique({
                where: { id: decoded.userId, email: decoded.email },
            });

            if (coachee || coach) {
                return context;
            }
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    },
    // context: async ({ req }) => {
    //     //   console.log(req.body.operationName);
    //     if (req.body.operationName === 'IntrospectionQuery') {
    //         // console.log('blocking introspection query..');
    //         return {};
    //     }
    //     // allowing the 'CreateUser' and 'Login' queries to pass without giving the token
    //     if (
    //         req.body.operationName === 'CoacheeLogin' ||
    //         req.body.operationName === 'CoachLogin'
    //     ) {
    //         return {};
    //     }

    //     // get the user token from the headers
    //     const token = req.headers.authorization;
    //     // const token = req.headers.authorization?.split(' ')[1];
    //     console.log('header.authorization', req.headers.authorization);

    //     if (!token) {
    //         throw new Error('No token provided');
    //     }
    //     try {
    //         console.log('token', token);
    //         const decoded = jwt.verify(token, SECRET_KEY);
    //         console.log('decoded', decoded);
    //         // // Check if the decoded token has the necessary claims
    //         // if (!decoded || !decoded.userId || !decoded.email) {
    //         //     throw new Error('Invalid token');
    //         // }

    //         // // Verify the user exists in the database
    //         // const user = await db.user.findUnique({
    //         //     where: { id: decoded.userId },
    //         //     select: { email: true },
    //         // });

    //         // if (!user) {
    //         //     throw new Error('User not found');
    //         // }

    //         // // Store the decoded token in the request for later use
    //         // return { user: decoded };
    //         return;
    //     } catch (err) {
    //         console.error('error', err);
    //         throw err;
    //     }
    // },
});

server
    .start() // start Apollo Server first
    .then(() => {
        server.applyMiddleware({ app });

        // app.listen(PORT, () => {
        //     // then start Express
        //     console.log(
        //         `Apollo server has started at http://localhost:${PORT}`,
        //     );
        // });

        // Start the Express server and capture the HTTP server instance
        const httpServer = app.listen(PORT, () => {
            console.log(
                `Apollo server has started at http://localhost:${PORT}`,
            );
        });

        // Create a WebSocket server for subscriptions using the HTTP server instance
        const wsServer = new WebSocketServer({
            server: httpServer, // Use the HTTP server instance
            path: '/graphql',
            // path: '/graphql', // This should match the path you use for Apollo Server
        });

        // Integrate the WebSocket server with Apollo Server
        useServer({ schema }, wsServer);
    });
