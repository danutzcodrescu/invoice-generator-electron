import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Expense } from '../entities/Expense.entity';
import { setParams } from '../utils/helpers';
import { CreateExpense } from './types/operations.helpers';

@Resolver(Expense)
export class ExpenseResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query((returns) => [Expense])
  expenses(
    @Arg('startDate', { nullable: true }) startDate: string,
    @Arg('endDate', { nullable: true }) endDate: string,
  ): Promise<Expense[]> {
    const params = setParams({ relations: ['client'], startDate, endDate });
    // @ts-ignore
    return this.entityManager.find(Expense, params);
  }

  @Mutation((returns) => Expense)
  async createExpense(
    @Arg('expense') expense: CreateExpense,
  ): Promise<Expense> {
    const expenseInstance = this.entityManager.create(Expense, expense);
    return await this.entityManager.save(expenseInstance);
  }

  @FieldResolver(() => String)
  invoiceDate(@Root() expense: Expense) {
    return expense.invoiceDate.split(' ')[0];
  }
}
