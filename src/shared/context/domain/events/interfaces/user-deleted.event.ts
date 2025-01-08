import { Event } from '@shared/context';

export class UserDeletedEvent implements Event {
  constructor(public readonly id: string) {}
}
