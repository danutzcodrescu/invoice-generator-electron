import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager, Raw } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Expense } from '../entities/Expense.entity';
import { CreateExpense } from './types/operations.helpers';

@Resolver(Expense)
export class ExpenseResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(returns => [Expense])
  expenses(
    @Arg('startDate', { nullable: true }) starDate: string,
  ): Promise<Expense[]> {
    return this.entityManager.find(
      Expense,
      Object.assign(
        { relations: ['client'] },
        starDate
          ? {
              where: {
                invoiceDate: Raw(alias => `${alias} >= date(${starDate})`),
              },
            }
          : {},
      ),
    );
  }

  @Mutation(returns => Expense)
  async createExpense(
    @Arg('expense') expense: CreateExpense,
  ): Promise<Expense> {
    const expenseInstance = this.entityManager.create(Expense, expense);
    return await this.entityManager.save(expenseInstance);
  }
}
