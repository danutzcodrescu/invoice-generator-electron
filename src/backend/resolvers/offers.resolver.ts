import crypto from 'crypto';
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
import { Offer } from '../entities/Offer.entity';
import { Profile, ProfileData } from '../entities/Profile.entity';
import { setParams } from '../utils/helpers';
import { OfferInsert } from './types/arguments.helpers';

@Resolver(Offer)
export class OfferResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(() => [Offer])
  offers(
    @Arg('startDate', { nullable: true }) startDate: string,
    @Arg('endDate', { nullable: true }) endDate: string,
  ): Promise<Offer[]> {
    const params = setParams({
      relations: ['client', 'profile'],
      startDate,
      endDate,
    });
    // @ts-ignore
    return this.entityManager.find(Offer, params);
  }

  @Mutation(() => Offer)
  async insertOffer(@Arg('objet') obj: OfferInsert): Promise<Offer> {
    const currentProfile = await this.entityManager.findOne(
      Profile,
      obj.profileId,
    );
    const clientDB = obj.clientId
      ? await this.entityManager.findOne(Client, obj.clientId)
      : undefined;
    // @ts-ignore
    const offer = this.entityManager.create(Offer, {
      invoiceDate: obj.invoiceDate,
      amount: obj.amount,
      vat: obj.vat,
      items: obj.items,
      profile: currentProfile,
      profileData: obj.profileData,
      client: clientDB,
      clientData: obj.clientData,
      vatRuleName: obj.vatRuleName,
      validUntil: obj.validUntil,
    });
    const offerCreated = await this.entityManager.save(offer);
    return offerCreated;
  }

  @Mutation(() => Invoice)
  async invoiceOffer(@Arg('id', (type) => ID) id: string) {
    await this.entityManager.update(Offer, id, {
      invoiced: true,
    });
    const offer = await this.entityManager.findOne(Offer, id, {
      relations: ['client', 'profile'],
    });
    // eslint-disable-next-line no-undef
    const [profile, client] = await Promise.all([
      offer?.profile,
      offer?.client,
    ]);
    // @ts-ignore
    const invoice = this.entityManager.create(Invoice, {
      invoiceDate: offer?.invoiceDate,
      amount: offer?.amount,
      vat: offer?.vat,
      items: offer?.items,
      profile: profile,
      profileId: profile!.id,
      profileData: offer?.profileData,
      client: client,
      clientData: offer?.clientData,
      vatRuleName: offer?.vatRuleName,
      invoiceNumber: crypto.randomBytes(16).toString('hex'),
    });
    const invoiceCreated = await this.entityManager.save(invoice);
    return invoiceCreated;
  }

  @FieldResolver(() => ClientData)
  clientData(@Root() offer: Offer) {
    return JSON.parse(offer.clientData);
  }

  @FieldResolver(() => ProfileData)
  profileData(@Root() offer: Offer) {
    return JSON.parse(offer.profileData);
  }

  @FieldResolver(() => [Item])
  items(@Root() offer: Offer) {
    return JSON.parse(offer.items);
  }

  @FieldResolver(() => String)
  validUntil(@Root() offer: Offer) {
    return offer.validUntil.split(' ')[0];
  }

  @FieldResolver(() => String)
  invoiceDate(@Root() offer: Offer) {
    return offer.invoiceDate.split(' ')[0];
  }
}
