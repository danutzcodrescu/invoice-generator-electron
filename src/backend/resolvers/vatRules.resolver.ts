import { identity, pickBy } from 'lodash';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Event } from '../entities/Event.entity';
import { VatRule } from '../entities/VatRule.entity';

@Resolver(VatRule)
export class VatRuleResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(returns => [VatRule])
  vatRules(): Promise<VatRule[]> {
    return this.entityManager.find(VatRule);
  }

  @Mutation(returns => VatRule)
  async addVatRule(
    @Arg('percentage') percentage: number,
    @Arg('name', { nullable: true }) name?: string,
  ): Promise<VatRule> {
    let vatRule: VatRule;
    const obj = pickBy(
      {
        name,
        percentage,
      },
      identity,
    );
    await this.entityManager.transaction(async transactionManager => {
      const vatRuleEntity = await this.entityManager.create(VatRule, obj);
      const eventEntity = await this.entityManager.create(Event, {
        data: JSON.stringify(obj),
      });
      vatRule = await transactionManager.save(vatRuleEntity);
      await transactionManager.save(eventEntity);
    });
    return vatRule!;
  }
}
