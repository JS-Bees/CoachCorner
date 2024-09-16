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

import * as subscriptions from './nexus-prisma/subscriptions/subscriptions';
import { Context } from './nexus-prisma/context';
import './generated/graphql-types'; 


import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 5050;


const db = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET;

const schema = makeSchema({

    types: [
        objectTypes,
        inputTypes,
        queries,
        filteredQueries,
        createMutation,
        updateMutation,
        subscriptions,
    ],
    outputs: {
        typegen: path.join(__dirname, 'generated/graphql-types.ts'),
        schema: path.join(__dirname, '../../frontend/schema.graphql'),

    },

    plugins: [fieldAuthorizePlugin()],

});


const server = new ApolloServer({
    schema,

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

            const contextWithUser = { ...context, decoded };
            return contextWithUser;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    },
});

server
    .start() 
    .then(() => {
        server.applyMiddleware({ app });

  
        const httpServer = app.listen(PORT, () => {
            console.log(
                `Apollo server has started at http://localhost:${PORT}`,
            );
        });

        const wsServer = new WebSocketServer({
            server: httpServer, 
            path: '/graphql',
        });

        useServer({ schema }, wsServer);
    });
