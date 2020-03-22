import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Base } from './Base.entity';

@Entity()
@ObjectType()
export class Service extends Base {
  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  measurement: string;

  @Field({ nullable: true })
  @Column({ default: 0 })
  cost: number;
}
