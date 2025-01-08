import { AggregateRoot as NestJsAggregateRoot } from '@nestjs/cqrs';
import { Event } from './events';

export abstract class AggregateRoot extends NestJsAggregateRoot<Event> {}
