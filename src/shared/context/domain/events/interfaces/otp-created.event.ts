import { Event } from '../event';

export class OtpCreatedEvent implements Event {
  constructor(
    public readonly email: string,
    public readonly otp: string,
  ) {}
}
