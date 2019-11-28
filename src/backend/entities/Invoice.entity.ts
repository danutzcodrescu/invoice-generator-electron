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
import { Client, ClientData } from './Client.entity';
import { Profile, ProfileData } from './Profile.entity';

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

  @Field(type => ProfileData)
  @Column('text')
  profileData: string;

  @Field(type => Client, { nullable: true })
  @ManyToOne(type => Client, { lazy: true })
  client: Promise<Client>;
  @Column({ nullable: true })
  clientId: string;

  @Field(type => ClientData)
  @Column('text')
  clientData: string;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  @Field(type => [Item])
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
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
  }

  @BeforeInsert()
  createDate() {
    this.createdAt = format(new Date(), 'yyyy-MM:dd HH:mm:SS');
    this.updatedAt = format(new Date(), 'yyyy-MM-dd HH:mm:SS');
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

@ObjectType()
export class Item {
  @Field()
  name: string;

  @Field()
  value: string;
}
