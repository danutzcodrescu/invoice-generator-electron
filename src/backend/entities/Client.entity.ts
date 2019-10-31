import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
