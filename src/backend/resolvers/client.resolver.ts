import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Client } from '../entities/Client.entity';
import { insertTransaction, nonNullObjectProperties } from '../utils/helpers';
import { UpdateClientInput } from './types/invoice.helpers';

@Resolver(Client)
export class ClientResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(returns => [Client])
  clients(): Promise<Client[]> {
    // need to add data-loader
    return this.entityManager.find(Client, { relations: ['invoices'] });
  }

  @Query(returns => Client)
  client(
    @Arg('clientId', type => ID) clientId: string,
  ): Promise<Client | undefined> {
    // need to add data-loader
    return this.entityManager.findOne(Client, clientId, {
      relations: ['invoices'],
    });
  }

  @Mutation(returns => Client)
  async updateClient(
    @Arg('id', type => ID) id: string,
    @Arg('clientData') clientData: UpdateClientInput,
  ): Promise<any> {
    await this.entityManager.update(Client, id, clientData);
    return this.entityManager.findOne(Client, id, { relations: ['invoices'] });
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
    const obj = nonNullObjectProperties({
      firstName,
      lastName,
      address,
      email,
      company,
      vat,
    });
    await this.entityManager.transaction(async transactionManager => {
      client = await insertTransaction(Client, transactionManager, obj as any);
    });
    return client!;
  }
}
