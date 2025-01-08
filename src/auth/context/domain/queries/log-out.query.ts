import { Query } from '@shared/context';

export class LogOutQuery implements Query {
  constructor(public readonly id: string) {}
}
