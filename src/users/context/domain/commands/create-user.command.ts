import { Command } from '@shared/context';

export class CreateUserCommand extends Command {
  constructor(
    public readonly name,
    public readonly lastName,
    public readonly email,
    public readonly password,
    public readonly birthday,
  ) {
    super();
  }
}
