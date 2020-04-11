import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { VatRule } from '../entities/VatRule.entity';
import { insertTransaction, nonNullObjectProperties } from '../utils/helpers';
import { VatRuleUpdate } from './types/operations.helpers';

@Resolver(VatRule)
export class VatRuleResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(() => [VatRule])
  vatRules(): Promise<VatRule[]> {
    return this.entityManager.find(VatRule);
  }

  @Mutation(() => VatRule)
  async addVatRule(
    @Arg('percentage') percentage: number,
    @Arg('name', { nullable: true }) name?: string,
  ): Promise<VatRule> {
    let vatRule: VatRule;
    const obj = nonNullObjectProperties({
      name,
      percentage,
    });
    await this.entityManager.transaction(async (transactionManager) => {
      vatRule = await insertTransaction(
        VatRule,
        transactionManager,
        obj as any,
      );
    });
    return vatRule!;
  }

  @Mutation(() => VatRule)
  async updateVatRule(
    @Arg('id', (type) => ID) id: string,
    @Arg('data') data: VatRuleUpdate,
  ): Promise<VatRule | undefined> {
    await this.entityManager.update(VatRule, id, data);
    return this.entityManager.findOne(VatRule, id);
  }

  @Mutation(() => Boolean)
  async deleteVat(@Arg('id', () => ID) id: string) {
    await this.entityManager.delete(VatRule, id);
    return true;
  }
}
