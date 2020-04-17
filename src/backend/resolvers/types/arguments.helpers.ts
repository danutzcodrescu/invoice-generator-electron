import { Field, InputType } from 'type-graphql';
import { Discount } from '../../entities/Discount.entity';
import { Expense } from '../../entities/Expense.entity';
import { Invoice } from '../../entities/Invoice.entity';
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
  @Field()
  discount: number;
}

@InputType()
export class OfferUpdate implements Partial<Offer> {
  @Field()
  id: string;
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
  @Field()
  discount: number;
}

@InputType()
export class InvoiceUpdate implements Partial<Invoice> {
  @Field()
  id: string;
  @Field()
  invoiceDate: string;
  @Field({ nullable: true })
  clientId: string;
  @Field()
  clientData: string;
  @Field()
  profileData: string;
  @Field({ nullable: true })
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
  invoiceNumber: string;
  @Field()
  paymentDeadline: string;
  @Field()
  discount: number;
}

@InputType()
export class ExpenseUpdate implements Partial<Expense> {
  @Field()
  id: string;
  @Field()
  invoiceDate: string;
  @Field({ nullable: true })
  clientId: string;
  @Field()
  clientName: string;
  @Field()
  amount: number;
  @Field()
  vat: number;
  @Field({ nullable: true })
  description: string;
  @Field()
  invoiceNumber: string;
}

@InputType()
export class DiscountInsert implements Partial<Discount> {
  @Field({ nullable: true })
  name?: string;
  @Field()
  percentage: number;
}
