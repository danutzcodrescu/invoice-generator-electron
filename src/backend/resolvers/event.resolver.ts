import { Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Event } from '../entities/Event.entity';

@Resolver(Event)
export class EventResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(returns => [Event])
  events(): Promise<Event[]> {
    return this.entityManager.find(Event);
  }
}
