import { identity, pickBy } from 'lodash';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Client } from '../entities/Client.entity';
import { Event } from '../entities/Event.entity';

@Resolver(Client)
export class ClientResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(returns => [Client])
  clients(): Promise<Client[]> {
    return this.entityManager.find(Client);
  }

  @Mutation(returns => Client)
  async addClient(
    @Arg('firstName', { nullable: true }) firstName?: string,
    @Arg('lastName', { nullable: true }) lastName?: string,
    @Arg('company', { nullable: true }) company?: string,
    @Arg('email', { nullable: true }) email?: string,
    @Arg('address', { nullable: true }) address?: string,
    @Arg('vat', { nullable: true }) vat?: string,
  ): Promise<Client> {
    let client: Client;
    const obj = pickBy(
      {
        firstName,
        lastName,
        address,
        email,
        company,
        vat,
      },
      identity,
    );
    await this.entityManager.transaction(async transactionManager => {
      const clientEntity = await this.entityManager.create(Client, obj);
      const eventEntity = await this.entityManager.create(Event, {
        data: JSON.stringify(obj),
      });
      client = await transactionManager.save(clientEntity);
      await transactionManager.save(eventEntity);
    });
    return client!;
  }
}
