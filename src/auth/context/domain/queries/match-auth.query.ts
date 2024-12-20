import { Criteria, Query } from '@shared/context';

export class MatchAuthQuery implements Query {
  constructor(public readonly criteria: Criteria) {}
}
