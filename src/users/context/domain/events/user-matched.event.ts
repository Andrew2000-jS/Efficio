import { Criteria, Event } from '@shared/context';

export class UserMatched implements Event {
  constructor(public readonly criteria: Criteria) {}
}
