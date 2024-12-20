import { Query } from '@shared/context';

export class LoginQuery implements Query {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
