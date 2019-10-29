import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { VatRule } from '../entities/VatRule.entity';
import { insertTransaction, nonNullObjectProperties } from '../utils/helpers';

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
    const obj = nonNullObjectProperties({
      name,
      percentage,
    });
    await this.entityManager.transaction(async transactionManager => {
      vatRule = await insertTransaction(
        VatRule,
        transactionManager,
        obj as any,
      );
    });
    return vatRule!;
  }
}
