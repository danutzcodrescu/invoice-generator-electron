import { format } from 'date-fns';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expense } from './Expense.entity';
import { Invoice } from './Invoice.entity';
import { Offer } from './Offer.entity';

@Entity()
@ObjectType()
export class Client extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  company?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  vat?: string;

  @Field()
  @Column({ type: 'text' })
  updatedAt: string;

  @Field()
  @Column({ type: 'text' })
  createdAt: string;

  @OneToMany((type) => Invoice, (invoice) => invoice.client, { lazy: true })
  invoices: Promise<Invoice[]>;

  @OneToMany((type) => Expense, (expense) => expense.client, { lazy: true })
  expenses: Promise<Expense[]>;

  @OneToMany((type) => Offer, (offer) => offer.client, { lazy: true })
  offers: Promise<Offer[]>;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
  }

  @BeforeInsert()
  createDate() {
    this.createdAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
  }
}

@ObjectType()
export class ClientData {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  company?: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  vat?: string;
}
