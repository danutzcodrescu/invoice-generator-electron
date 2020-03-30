import {
  Arg,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { EntityManager, Raw } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Client } from '../entities/Client.entity';
import { Expense } from '../entities/Expense.entity';
import { Invoice } from '../entities/Invoice.entity';
import { Offer } from '../entities/Offer.entity';
import { insertTransaction, nonNullObjectProperties } from '../utils/helpers';
import { UpdateClientInput } from './types/operations.helpers';

@Resolver(Client)
export class ClientResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query((returns) => [Client])
  clients(): Promise<Client[]> {
    // need to add data-loader
    return this.entityManager.find(Client, {
      relations: ['invoices', 'expenses', 'offers'],
    });
  }

  @Query((returns) => Client)
  client(
    @Arg('clientId', (type) => ID) clientId: string,
  ): Promise<Client | undefined> {
    return this.entityManager.findOne(Client, clientId);
  }

  @Mutation((returns) => Client)
  async updateClient(
    @Arg('id', (type) => ID) id: string,
    @Arg('clientData') clientData: UpdateClientInput,
  ): Promise<any> {
    await this.entityManager.update(Client, id, clientData);
    return this.entityManager.findOne(Client, id, { relations: ['invoices'] });
  }

  @Mutation((returns) => Client)
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
    await this.entityManager.transaction(async (transactionManager) => {
      client = await insertTransaction(Client, transactionManager, obj as any);
    });
    return client!;
  }

  @FieldResolver(() => [Invoice])
  async invoices(
    @Root() client: Client,
    @Arg('startDate', { nullable: true })
    startDate?: string,
  ) {
    return this.entityManager.find(Invoice, {
      where: Object.assign(
        { clientId: client.id },
        startDate
          ? { invoiceDate: Raw((alias) => `${alias} >= date("${startDate}")`) }
          : {},
      ),
    });
  }

  @FieldResolver(() => [Expense])
  async expenses(
    @Root() client: Client,
    @Arg('startDate', { nullable: true }) startDate?: string,
  ) {
    return this.entityManager.find(Expense, {
      where: Object.assign(
        { clientId: client.id },
        startDate
          ? { invoiceDate: Raw((alias) => `${alias} >= date("${startDate}")`) }
          : {},
      ),
    });
  }

  @FieldResolver(() => [Offer])
  async offers(
    @Root() client: Client,
    @Arg('startDate', { nullable: true }) startDate?: string,
  ) {
    return this.entityManager.find(Offer, {
      where: Object.assign(
        { clientId: client.id, invoiced: false },
        startDate
          ? { invoiceDate: Raw((alias) => `${alias} >= date("${startDate}")`) }
          : {},
      ),
    });
  }
}
