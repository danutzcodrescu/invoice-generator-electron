import {
  Arg,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Expense } from '../entities/Expense.entity';
import { setParams } from '../utils/helpers';
import { ExpenseUpdate } from './types/arguments.helpers';
import { CreateExpense } from './types/operations.helpers';

@Resolver(Expense)
export class ExpenseResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(() => [Expense])
  expenses(
    @Arg('startDate', { nullable: true }) startDate: string,
    @Arg('endDate', { nullable: true }) endDate: string,
  ): Promise<Expense[]> {
    const params = setParams({ relations: ['client'], startDate, endDate });
    // @ts-ignore
    return this.entityManager.find(Expense, params);
  }
  @Query(() => Expense)
  getExpense(@Arg('id', () => ID) id: string) {
    return this.entityManager.findOne(Expense, id);
  }

  @Mutation(() => Expense)
  async createExpense(
    @Arg('expense') expense: CreateExpense,
  ): Promise<Expense> {
    const expenseInstance = this.entityManager.create(Expense, expense);
    return await this.entityManager.save(expenseInstance);
  }
  @Mutation(() => Boolean)
  async deleteExpense(@Arg('id', () => ID) id: string) {
    await this.entityManager.delete(Expense, id);
    return true;
  }
  @Mutation(() => Expense)
  async updateExpense(@Arg('data') data: ExpenseUpdate) {
    await this.entityManager
      .createQueryBuilder()
      .update(Expense)
      .set(data)
      .where({ id: data.id })
      .execute();
    return this.entityManager.findOne(data.id);
  }

  @FieldResolver(() => String)
  invoiceDate(@Root() expense: Expense) {
    return expense.invoiceDate.split(' ')[0];
  }
}
