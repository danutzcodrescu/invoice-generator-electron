import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { EntityManager, Raw } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Client, ClientData } from '../entities/Client.entity';
import { Invoice, Item } from '../entities/Invoice.entity';
import { Profile, ProfileData } from '../entities/Profile.entity';
import {
  ClientInput,
  InvoiceInput,
  ProfileInput,
} from './types/operations.helpers';

@Resolver(Invoice)
export class InvoiceResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query((returns) => [Invoice])
  invoices(
    @Arg('startDate', { nullable: true }) startDate: string,
  ): Promise<Invoice[]> {
    return this.entityManager.find(
      Invoice,
      Object.assign(
        {
          relations: ['client', 'profile'],
          order: { invoiceDate: 'DESC' },
        },
        startDate
          ? {
              where: {
                invoiceDate: Raw((alias) => `${alias} >= date("${startDate}")`),
              },
            }
          : {},
      ),
    );
  }

  @Mutation((returns) => Invoice)
  async createInvoice(
    @Arg('client') client: ClientInput,
    @Arg('profile') profile: ProfileInput,
    @Arg('invoiceData') invoiceData: InvoiceInput,
  ): Promise<Invoice> {
    const currentProfile = await this.entityManager.findOne(
      Profile,
      profile.profileId,
    );
    const clientDB = await this.entityManager.findOne(Client, client.clientId);
    // @ts-ignore
    const invoice = this.entityManager.create(Invoice, {
      createDate: invoiceData.invoiceDate,
      amount: invoiceData.amount,
      vat: invoiceData.vat,
      items: invoiceData.items,
      profile: currentProfile,
      profileData: profile.profileData,
      client: clientDB,
      clientData: client.clientData,
      vatRuleName: invoiceData.vatRuleName,
      invoiceNumber: invoiceData.invoiceNumber,
    });
    const inv = await this.entityManager.save(invoice);
    return inv;
  }

  @FieldResolver((returns) => ClientData)
  clientData(@Root() invoice: Invoice) {
    return JSON.parse(invoice.clientData);
  }

  @FieldResolver((returns) => ProfileData)
  profileData(@Root() invoice: Invoice) {
    return JSON.parse(invoice.profileData);
  }

  @FieldResolver((returns) => [Item])
  items(@Root() invoice: Invoice) {
    return JSON.parse(invoice.items);
  }

  @FieldResolver((returns) => String)
  invoiceDate(@Root() invoice: Invoice) {
    return invoice.invoiceDate.split(' ')[0];
  }
}
