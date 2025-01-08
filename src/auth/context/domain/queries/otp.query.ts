import { Query } from '@shared/context';

export class OtpQuery implements Query {
  constructor(
    public readonly otp: string,
    public readonly email: string,
  ) {}
}
