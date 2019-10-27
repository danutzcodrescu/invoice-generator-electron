import { ApolloServer } from 'apollo-server';
import * as path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { Event } from './entities/Event';
import { EventResolver } from './resolvers/event.resolver';

useContainer(Container);

async function bootstrap() {
  try {
    await createConnection({
      type: 'sqlite',
      synchronize: true,
      logging: true,
      database: path.resolve(process.argv.slice(-1)[0], 'database.sqlite'),
      entities: [Event],
    });
    // build TypeGraphQL executable schema
    const schema = await buildSchema({
      resolvers: [EventResolver],
      container: Container,
      // authChecker, // register auth checking function
    });

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      // context: () => {
      //   const ctx: Context = {
      //     // create mocked user in context
      //     // in real app you would be mapping user from `req.user` or sth
      //     user: {
      //       id: 1,
      //       name: 'Sample user',
      //       roles: ['REGULAR'],
      //     },
      //   };
      //   return ctx;
      // },
    });

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (e) {
    console.log(e);
  }
}

bootstrap();
