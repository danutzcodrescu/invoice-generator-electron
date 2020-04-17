import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Base } from './Base.entity';

@Entity()
@ObjectType()
export class Discount extends Base {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: 1 })
  percentage: number;
}
