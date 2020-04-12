import { format } from 'date-fns';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from './Client.entity';

@Entity()
@ObjectType()
export class Expense extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'text', nullable: false })
  invoiceDate: string;

  @Field()
  @Column({ type: 'text', nullable: false })
  invoiceNumber: string;

  @Field()
  @Column({ type: 'text' })
  updatedAt: string;

  @Field()
  @Column({ type: 'text' })
  createdAt: string;

  @Field((type) => Client, { nullable: true })
  @ManyToOne((type) => Client, { lazy: true, onDelete: 'SET NULL' })
  client: Promise<Client>;
  @Column({ nullable: true })
  clientId: string;

  @Field()
  @Column('text')
  clientName: string;

  @Field()
  @Column()
  vat: number;

  @Field()
  @Column()
  amount: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
    this.invoiceDate = format(
      new Date(this.invoiceDate),
      'yyyy-MM-dd HH:mm:SS',
    );
  }

  @BeforeInsert()
  createDate() {
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
    this.createdAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
    if (!this.invoiceDate) {
      // TODO format it
      this.invoiceDate = format(new Date(), 'yyyy-MM-dd HH:mm:SS');
    } else {
      this.invoiceDate = format(
        new Date(this.invoiceDate),
        'yyyy-MM-dd HH:mm:SS',
      );
    }
  }
}
