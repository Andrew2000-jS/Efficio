import { EventsHandler as NestJsEventsHandler } from '@nestjs/cqrs';
import { Event } from './event';

export const EventHandler = (event: Event) => {
  return NestJsEventsHandler(event);
};
