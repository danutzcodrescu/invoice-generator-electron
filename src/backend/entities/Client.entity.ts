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

@Entity()
@ObjectType()
export class Client extends BaseEntity {
  @Field(type => ID)
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

  @Field(type => [Invoice])
  @OneToMany(
    type => Invoice,
    invoice => invoice.client,
    { lazy: true },
  )
  invoices: Promise<Invoice[]>;

  @Field(type => [Expense])
  @OneToMany(
    type => Expense,
    expense => expense.client,
    { lazy: true },
  )
  expenses: Promise<Expense[]>;

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
