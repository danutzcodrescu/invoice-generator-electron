import { Field, Float, ID, InputType } from 'type-graphql';

@InputType()
export class ClientInput {
  @Field(type => ID, { nullable: true })
  clientId?: string;

  @Field()
  clientData: string;
}

@InputType()
export class ProfileInput {
  @Field(type => ID)
  profileId: string;

  @Field()
  profileData: string;
}

@InputType()
export class InvoiceInput {
  @Field()
  invoiceDate: string;

  @Field()
  items: string;

  @Field(type => Float)
  vat: number;

  @Field(type => Float)
  amount: number;

  @Field()
  invoiceNumber: string;
}
