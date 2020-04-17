import {
  Arg,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Client, ClientData } from '../entities/Client.entity';
import { Invoice, Item } from '../entities/Invoice.entity';
import { Profile, ProfileData } from '../entities/Profile.entity';
import { setParams } from '../utils/helpers';
import { getInvoiceNumber } from '../utils/invoices';
import { InvoiceUpdate } from './types/arguments.helpers';
import {
  ClientInput,
  InvoiceInput,
  ProfileInput,
} from './types/operations.helpers';

@Resolver(Invoice)
export class InvoiceResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(() => String)
  async lastInvoiceNumber() {
    return getInvoiceNumber();
  }
  @Query(() => [Invoice])
  invoices(
    @Arg('startDate', { nullable: true }) startDate: string,
    @Arg('endDate', { nullable: true }) endDate: string,
  ): Promise<Invoice[]> {
    const params = setParams({
      relations: ['client', 'profile'],
      startDate,
      endDate,
    });
    return this.entityManager.find(
      // @ts-ignore
      Invoice,
      Object.assign(params, {
        relations: ['client', 'profile'],
        order: { invoiceNumber: 'DESC' },
      }),
    );
  }

  @Query(() => Invoice)
  async getInvoice(@Arg('id', () => ID) id: string) {
    return this.entityManager.findOne(Invoice, id);
  }

  @Mutation(() => Invoice)
  async createInvoice(
    @Arg('client') client: ClientInput,
    @Arg('profile') profile: ProfileInput,
    @Arg('invoiceData') invoiceData: InvoiceInput,
  ) {
    const [currentProfile, clientDB] = await Promise.all([
      this.entityManager.findOne(Profile, { id: profile.profileId }),
      this.entityManager.findOne(Client, { id: client.clientId }),
    ]);
    // @ts-ignore
    const invoice = this.entityManager.create(Invoice, {
      invoiceDate: invoiceData.invoiceDate,
      amount: invoiceData.amount,
      vat: invoiceData.vat,
      items: invoiceData.items,
      profile: currentProfile,
      profileData: profile.profileData,
      client: clientDB,
      clientData: client.clientData,
      vatRuleName: invoiceData.vatRuleName,
      invoiceNumber: invoiceData.invoiceNumber,
      paymentDeadline: invoiceData.paymentDeadline,
      discount: invoiceData.discount,
    });
    const inv = await this.entityManager.save(invoice);
    return inv;
  }

  @Mutation(() => Invoice)
  async updateInvoice(@Arg('data') data: InvoiceUpdate) {
    const [currentProfile, clientDB] = await Promise.all([
      this.entityManager.findOne(Profile, { id: data.profileId }),
      this.entityManager.findOne(Client, { id: data.clientId }),
    ]);
    // @ts-ignore
    await this.entityManager
      .createQueryBuilder()
      .update(Invoice)
      .set({
        invoiceDate: data.invoiceDate,
        amount: data.amount,
        vat: data.vat,
        items: data.items,
        profileId: currentProfile?.id,
        profileData: data.profileData,
        clientId: clientDB?.id,
        clientData: data.clientData,
        vatRuleName: data.vatRuleName,
        invoiceNumber: data.invoiceNumber,
        paymentDeadline: data.paymentDeadline,
        discount: data.discount,
      })
      .where({ id: data.id })
      .execute();
    return this.entityManager.findOne(Invoice, data.id);
  }

  @Mutation(() => Boolean)
  async deleteInvoice(@Arg('id', (type) => ID) id: string) {
    await this.entityManager.delete(Invoice, id);
    return true;
  }

  @Mutation(() => Invoice)
  async toggleInvoiceStatus(
    @Arg('status', () => Boolean) status: boolean,
    @Arg('id', () => ID) id: string,
  ) {
    await this.entityManager
      .createQueryBuilder()
      .update(Invoice)
      .set({ paid: status })
      .where({ id })
      .execute();
    return this.entityManager.findOne(Invoice, id);
  }

  @FieldResolver(() => ClientData)
  clientData(@Root() invoice: Invoice) {
    return JSON.parse(invoice.clientData);
  }

  @FieldResolver(() => ProfileData)
  profileData(@Root() invoice: Invoice) {
    return JSON.parse(invoice.profileData);
  }

  @FieldResolver(() => [Item])
  items(@Root() invoice: Invoice) {
    return JSON.parse(invoice.items);
  }

  @FieldResolver(() => String)
  invoiceDate(@Root() invoice: Invoice) {
    return invoice.invoiceDate.split(' ')[0];
  }

  @FieldResolver(() => String)
  paymentDeadline(@Root() invoice: Invoice) {
    return invoice.paymentDeadline.split(' ')[0];
  }
}
