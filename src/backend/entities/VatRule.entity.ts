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
export class VatRule extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  percentage: number;

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

  @BeforeInsert()
  defaultRuleName() {
    if (!this.name) {
      this.name = this.percentage + '%';
    }
  }
}
