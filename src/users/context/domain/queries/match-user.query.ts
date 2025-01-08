import { Criteria, Query } from '@shared/context';

export class MatchUserQuery implements Query {
  constructor(public readonly criteria: Criteria) {}
}
