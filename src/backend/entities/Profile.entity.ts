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
import { Invoice } from './Invoice.entity';

@Entity()
@ObjectType()
export class Profile extends BaseEntity {
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

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  phone?: string;

  @Field()
  @Column({ type: 'text' })
  updatedAt: string;

  @Field()
  @Column({ type: 'text' })
  createdAt: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bankAccount: string;

  @Field(type => [Invoice])
  @OneToMany(type => Invoice, invoice => invoice.client, { lazy: true })
  invoices: Promise<Invoice[]>;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date().toUTCString();
  }

  @BeforeInsert()
  createDate() {
    this.createdAt = new Date().toUTCString();
    this.updatedAt = new Date().toUTCString();
  }
}
