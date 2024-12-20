import { Query } from '@shared/context';

export class RecoverAuthQuery implements Query {
  constructor(public readonly email: string) {}
}
