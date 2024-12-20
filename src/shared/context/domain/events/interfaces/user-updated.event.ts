import { Event } from '@shared/context';

export class UserUpdatedEvent implements Event {
  constructor(
    public readonly id,
    public readonly name,
    public readonly lastName,
    public readonly email,
    public readonly password,
    public readonly birthday,
    public readonly updatedAt,
  ) {}
}
