import { ObjectType } from 'type-graphql';
import { Entity } from 'typeorm';
import { Client } from './Client.entity';

@Entity()
@ObjectType()
export class Profile extends Client {}
