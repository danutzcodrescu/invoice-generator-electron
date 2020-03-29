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
import { Item } from '../entities/Invoice.entity';
import { Offer } from '../entities/Offer.entity';
import { Profile, ProfileData } from '../entities/Profile.entity';
import { OfferInsert } from './types/arguments.helpers';

@Resolver(Offer)
export class OfferResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query((returns) => [Offer])
  offers(
    @Arg('startDate', { nullable: true }) startDate: string,
  ): Promise<Offer[]> {
    return this.entityManager.find(
      Offer,
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

  @Mutation((returns) => Offer)
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

  @FieldResolver((returns) => ClientData)
  clientData(@Root() offer: Offer) {
    return JSON.parse(offer.clientData);
  }

  @FieldResolver((returns) => ProfileData)
  profileData(@Root() offer: Offer) {
    return JSON.parse(offer.profileData);
  }

  @FieldResolver((returns) => [Item])
  items(@Root() offer: Offer) {
    return JSON.parse(offer.items);
  }

  @FieldResolver((returns) => String)
  validUntil(@Root() offer: Offer) {
    return offer.validUntil.split(' ')[0];
  }

  @FieldResolver((returns) => String)
  invoiceDate(@Root() offer: Offer) {
    return offer.invoiceDate.split(' ')[0];
  }
}
