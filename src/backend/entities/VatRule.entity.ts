import { format } from 'date-fns';
import { Field, ObjectType } from 'type-graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Base } from './Base.entity';

@Entity()
@ObjectType()
export class VatRule extends Base {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  percentage: number;

  @Field()
  @Column({ type: 'text' })
  updatedAt: string;

  @Field()
  @Column({ type: 'text' })
  createdAt: string;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
  }

  @BeforeInsert()
  defaultRuleName() {
    if (!this.name) {
      this.name = this.percentage + '%';
    }
    this.updatedAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
    this.createdAt = format(new Date(), 'yyyy-mm-dd HH:MM:SS');
  }
}
