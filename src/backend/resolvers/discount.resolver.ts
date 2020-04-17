import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { VatRule } from '../entities/VatRule.entity';
import { insertTransaction, nonNullObjectProperties } from '../utils/helpers';
import { VatRuleUpdate } from './types/operations.helpers';
import { Discount } from '../entities/Discount.entity';
import { DiscountInsert } from './types/arguments.helpers';

@Resolver(Discount)
export class DiscountResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(() => [Discount])
  discounts() {
    return this.entityManager.find(Discount);
  }

  @Mutation(() => Discount)
  async addDiscount(@Arg('data') data: DiscountInsert) {
    const ds = this.entityManager.create(Discount, {
      name: data.name,
      percentage: data.percentage,
    });
    const discountCreated = await this.entityManager.save(ds);
    return discountCreated;
  }

  @Mutation(() => Discount)
  async updateDiscount(
    @Arg('id', () => ID) id: string,
    @Arg('data') data: DiscountInsert,
  ) {
    await this.entityManager
      .createQueryBuilder()
      .update(Discount)
      .set(data)
      .where({ id })
      .execute();
    return this.entityManager.findOne(Discount, { id });
  }

  @Mutation(() => Boolean)
  async deleteDiscount(@Arg('id', () => ID) id: string) {
    await this.entityManager.delete(Discount, id);
    return true;
  }
}
