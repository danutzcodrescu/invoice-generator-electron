import { Field, Float, ID, InputType } from 'type-graphql';
import { Client } from '../../entities/Client.entity';
import { Expense } from '../../entities/Expense.entity';
import { Invoice } from '../../entities/Invoice.entity';
import { Profile } from '../../entities/Profile.entity';

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
export class InvoiceInput implements Partial<Invoice> {
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

@InputType()
export class UpdateClientInput implements Partial<Client> {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  vat?: string;
}

@InputType()
export class UpdateProfileInput implements Partial<Profile> {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  vat?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  bankAccount?: string;
}

@InputType()
export class CreateExpense implements Partial<Expense> {
  @Field()
  invoiceDate: string;

  @Field()
  invoiceNumber: string;

  @Field()
  vat: number;

  @Field()
  amount: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  clientId?: string;

  @Field()
  clientName: string;
}
