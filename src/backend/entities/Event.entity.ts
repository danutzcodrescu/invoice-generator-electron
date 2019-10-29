import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
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
  @Column({ type: 'text', default: new Date().toUTCString() })
  updatedAt: string;

  @Field()
  @Column({ type: 'text', default: new Date().toUTCString() })
  createdAt: string;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date().toUTCString();
  }
}
