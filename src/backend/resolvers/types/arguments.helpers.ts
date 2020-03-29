import { Field, InputType } from 'type-graphql';
import { Offer } from '../../entities/Offer.entity';

@InputType()
export class OfferInsert implements Partial<Offer> {
  @Field()
  invoiceDate: string;
  @Field({ nullable: true })
  clientId?: string;
  @Field()
  clientData: string;
  @Field()
  profileData: string;
  @Field()
  profileId: string;
  @Field()
  items: string;
  @Field()
  amount: number;
  @Field()
  vat: number;
  @Field()
  vatRuleName: string;
  @Field()
  validUntil: string;
}
