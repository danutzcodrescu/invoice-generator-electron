import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Service } from '../entities/Service.entity';
import { insertTransaction, nonNullObjectProperties } from '../utils/helpers';
import { ServiceUpdate } from './types/operations.helpers';

@Resolver(Service)
export class ServiceResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(returns => [Service])
  services(): Promise<Service[]> {
    return this.entityManager.find(Service);
  }

  @Mutation(returns => Service)
  async addService(
    @Arg('name') name: string,
    @Arg('measurement') measurement: string,
    @Arg('cost', { nullable: true }) cost: number,
  ): Promise<Service> {
    const obj = nonNullObjectProperties({
      name,
      measurement,
      cost,
    });
    let item: Service;
    await this.entityManager.transaction(async transactionManager => {
      item = await insertTransaction(Service, transactionManager, obj as any);
    });
    return item!;
  }

  @Mutation(returns => Service)
  async updateService(
    @Arg('id', type => ID) id: string,
    @Arg('data') data: ServiceUpdate,
  ): Promise<Service | undefined> {
    await this.entityManager.update(Service, id, data);
    return this.entityManager.findOne(Service, id);
  }
}
