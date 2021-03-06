import { addDays, format } from 'date-fns';
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
import { Profile } from './Profile.entity';

@Entity()
@ObjectType()
export class Invoice extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'text', nullable: false })
  invoiceDate: string;

  @Field()
  @Column({ type: 'text', nullable: false, unique: true })
  invoiceNumber: string;

  @Field()
  @Column({ type: 'text' })
  updatedAt: string;

  @Field()
  @Column({ type: 'text' })
  createdAt: string;

  @Field((type) => Profile)
  @ManyToOne((type) => Profile, { lazy: true, onDelete: 'SET NULL' })
  profile: Promise<Profile>;
  @Column()
  profileId: string;

  @Column('text')
  profileData: string;

  @Field((type) => Client, { nullable: true })
  @ManyToOne((type) => Client, { lazy: true, onDelete: 'SET NULL' })
  client: Promise<Client>;
  @Column({ nullable: true })
  clientId: string;

  @Column('text')
  clientData: string;

  @Column('text')
  items: string;

  @Field()
  @Column()
  vat: number;

  @Field()
  @Column({ nullable: true })
  vatRuleName: string;

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column({ default: false })
  paid: boolean;

  @Column({ default: format(addDays(new Date(), 15), 'yyyy-MM-dd HH:mm:SS') })
  paymentDeadline: string;

  @Field()
  @Column({ default: 0 })
  discount: number;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
    this.invoiceDate = format(
      new Date(this.invoiceDate),
      'yyyy-MM-dd HH:mm:SS',
    );
    this.paymentDeadline = format(
      new Date(this.paymentDeadline),
      'yyyy-MM-dd HH:mm:SS',
    );
  }

  @BeforeInsert()
  createDate() {
    this.createdAt = format(new Date(), 'yyyy-MM:dd HH:mm:SS');
    this.updatedAt = format(new Date(), 'yyyy-MM-dd HH:mm:SS');
    if (this.paymentDeadline) {
      this.paymentDeadline = format(
        new Date(this.paymentDeadline),
        'yyyy-MM-dd HH:mm:SS',
      );
    }
    if (!this.invoiceDate) {
      this.invoiceDate = format(new Date(), 'yyyy-MM-dd HH:mm:SS');
    } else {
      this.invoiceDate = format(
        new Date(this.invoiceDate),
        'yyyy-MM-dd HH:mm:SS',
      );
    }
  }
}

@ObjectType()
export class Item {
  @Field()
  name: string;

  @Field()
  value: number;

  @Field({ nullable: true })
  measurement: string;

  @Field()
  quantity: number;
}
