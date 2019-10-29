import { identity, pickBy } from 'lodash';
import { DeepPartial, EntityManager } from 'typeorm';
import { Event } from '../entities/Event.entity';

export function nonNullObjectProperties<T extends object>(obj: T) {
  return pickBy(
    {
      ...obj,
    },
    identity,
  ) as DeepPartial<T>;
}

export async function insertTransaction<T>(
  entity: T,
  transactionManager: EntityManager,
  obj: T,
): Promise<T> {
  const entityInstance = await transactionManager.create(entity as any, obj);
  const eventEntity = await transactionManager.create(Event, {
    data: JSON.stringify(obj),
  });
  const entityValue = (await transactionManager.save(
    entityInstance,
  )) as Promise<T>;
  await transactionManager.save(eventEntity);
  return entityValue;
}
