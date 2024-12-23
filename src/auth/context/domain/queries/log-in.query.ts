import { Query } from '@shared/context';

export class LoginQuery implements Query {
  constructor(
    public readonly email: string | null,
    public readonly password: string | null,
    public readonly ctx: string,
  ) {}
}
