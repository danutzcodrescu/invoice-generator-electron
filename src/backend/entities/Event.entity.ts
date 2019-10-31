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
export class Event extends BaseEntity {
  // @ts-ignore
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column('text')
  data: string;

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
