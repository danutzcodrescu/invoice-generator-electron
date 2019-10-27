import { Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Event } from '../entities/Event';

@Resolver(Event)
export class EventResolver {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  // @ts-ignore
  @Query(returns => [Event])
  events(): Promise<Event[]> {
    return this.eventRepository.find();
  }
}
