import { format } from 'date-fns';
import { Field, ObjectType } from 'type-graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './Base.entity';
import { Client } from './Client.entity';
import { Profile } from './Profile.entity';

@Entity()
@ObjectType()
export class Offer extends Base {
  @Column({ type: 'text', nullable: false })
  invoiceDate: string;

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

  @Column()
  validUntil: string;

  @Field()
  @Column({ default: 0 })
  discount: number;

  @Column({ default: false })
  invoiced: boolean;

  @BeforeInsert()
  createDate() {
    this.createdAt = format(new Date(), 'yyyy-MM:dd HH:mm:SS');
    console.log('created', this.createdAt);
    this.updatedAt = format(new Date(), 'yyyy-MM-dd HH:mm:SS');
    console.log('update', this.updatedAt);
    this.invoiceDate = format(
      new Date(this.invoiceDate),
      'yyyy-MM-dd HH:mm:SS',
    );
    this.validUntil = format(new Date(this.validUntil), 'yyyy-MM-dd HH:mm:SS');
  }

  @BeforeUpdate()
  updateDate() {
    console.log('0');
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
    console.log('1');
    this.invoiceDate = format(
      new Date(this.invoiceDate),
      'yyyy-MM-dd HH:mm:SS',
    );
    console.log('2');
    this.validUntil = format(new Date(this.validUntil), 'yyyy-MM-dd HH:mm:SS');
    console.log('3');
  }
}
