import { identity, pickBy, set } from 'lodash';
import { DeepPartial, EntityManager, Raw } from 'typeorm';
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

interface ParamsArg {
  startDate: string;
  endDate: string;
  relations: string[];
}

export function setParams({ startDate, endDate, relations }: ParamsArg) {
  const params = {
    relations,
    order: { invoiceDate: 'DESC' },
  };
  if (startDate && !endDate) {
    set(
      params,
      'where.invoiceDate',
      Raw((alias) => `${alias} >= date("${startDate}")`),
    );
  }
  if (endDate && !startDate) {
    set(
      params,
      'where.invoiceDate',
      Raw((alias) => `${alias} < date("${endDate}")`),
    );
  }
  if (startDate && endDate) {
    set(
      params,
      'where.invoiceDate',
      Raw(
        (alias) =>
          `${alias} >= date("${startDate}") and ${alias} < date("${endDate}")`,
      ),
    );
  }
  return params;
}
