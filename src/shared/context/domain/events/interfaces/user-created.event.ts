import { Event } from '@shared/context';

export class UserCreatedEvent implements Event {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly birthday: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
