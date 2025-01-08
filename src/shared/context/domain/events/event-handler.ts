import { IEventHandler as NestJsIEventHandler } from '@nestjs/cqrs';
import { Event } from './event';

export interface IEventHandler<T extends Event>
  extends NestJsIEventHandler<T> {}
