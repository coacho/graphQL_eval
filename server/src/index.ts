import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import { resolvers } from './generated/resolvers';
import { typeDefs } from './generated/typeDefs';
import { tokenJWS }  from './tokenJWS'; // toDo: implement tokenJWS

const prisma = new PrismaClient();

const server = new ApolloServer({
    typeDefs,
    resolvers
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = tokenJWS.verifyToken(token, 'secret');
    if (!user) throw new Error('Not authenticated');
    return { ...user, prisma };
  }
});
  
  console.log(`Server ready at: ${url}`);



