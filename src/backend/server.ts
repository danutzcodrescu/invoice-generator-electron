import { ApolloServer } from 'apollo-server';
import * as path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { Client } from './entities/Client.entity';
import { Event } from './entities/Event.entity';
import { Expense } from './entities/Expense.entity';
import { Invoice } from './entities/Invoice.entity';
import { Offer } from './entities/Offer.entity';
import { Profile } from './entities/Profile.entity';
import { Service } from './entities/Service.entity';
import { VatRule } from './entities/VatRule.entity';
import { ClientResolver } from './resolvers/client.resolver';
import { EventResolver } from './resolvers/event.resolver';
import { ExpenseResolver } from './resolvers/expense.resolver';
import { InvoiceResolver } from './resolvers/invoices.resolver';
import { OfferResolver } from './resolvers/offers.resolver';
import { ProfileResolver } from './resolvers/profile.resolver';
import { ServiceResolver } from './resolvers/service.resolver';
import { VatRuleResolver } from './resolvers/vatRules.resolver';
import { init } from '@sentry/electron/dist/main';
import { SENTRY_DSN } from './constants';

if (process.env.NODE_ENV === 'production') {
  init({
    dsn: SENTRY_DSN,
    enableNative: false,
    release: `${process.env.npm_package_productName}_${process.env.npm_package_version}`,
  });
}

useContainer(Container);

async function bootstrap() {
  try {
    await createConnection({
      type: 'sqlite',
      synchronize: true,
      logging: true,
      database: path.resolve(process.argv.slice(-1)[0], 'database.sqlite'),
      entities: [
        Event,
        Client,
        VatRule,
        Profile,
        Invoice,
        Expense,
        Service,
        Offer,
      ],
    });
    // build TypeGraphQL executable schema
    const schema = await buildSchema({
      resolvers: [
        EventResolver,
        ClientResolver,
        VatRuleResolver,
        ProfileResolver,
        InvoiceResolver,
        ExpenseResolver,
        ServiceResolver,
        OfferResolver,
      ],
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
