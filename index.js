const { PrismaClient } = require('@prisma/client');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const cors = require('cors');
const bodyParser = require('body-parser');


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');


const prisma = new PrismaClient();
const pubsub = new PubSub();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            prisma,
            req,
            pubsub
        }
    }
});

const app = express();
app.use('/graphql', bodyParser.json({ limit: '20mb' }));
app.use(cors());
apolloServer.applyMiddleware({ app });


// const server = createServer(app);
// apolloServer.installSubscriptionHandlers(server);
const PORT = 3000;
app.listen({ port: PORT }, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
});


