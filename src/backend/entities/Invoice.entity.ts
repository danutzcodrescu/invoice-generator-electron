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
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ type: 'text', nullable: false })
  invoiceDate: string;

  @Field()
  @Column({ type: 'text', nullable: false })
  invoiceNumber: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  bankAccount: string;

  @Field()
  @Column({ type: 'text' })
  updatedAt: string;

  @Field()
  @Column({ type: 'text' })
  createdAt: string;

  @Field(type => Profile)
  @ManyToOne(type => Profile, { lazy: true })
  profile: Promise<Profile>;
  @Column()
  profileId: string;

  @Field()
  @Column('text')
  profileData: string;

  @Field(type => Client, { nullable: true })
  @ManyToOne(type => Client, { lazy: true })
  client: Promise<Client>;
  @Column({ nullable: true })
  clientId: string;

  @Field()
  @Column('text')
  clientData: string;

  @Field()
  @Column('text')
  items: string;

  @Field()
  @Column()
  vat: number;

  @Field()
  @Column()
  amount: number;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date().toUTCString();
  }

  @BeforeInsert()
  createDate() {
    this.createdAt = new Date().toUTCString();
    this.updatedAt = new Date().toUTCString();
    if (!this.invoiceDate) {
      // TODO format it
      this.invoiceDate = new Date().toUTCString();
    }
  }
}
