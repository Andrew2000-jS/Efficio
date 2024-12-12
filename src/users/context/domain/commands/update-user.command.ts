import { Command } from '@shared/context';

export class UpdateUserCommand extends Command {
  constructor(
    public readonly id,
    public readonly name,
    public readonly lastName,
    public readonly email,
    public readonly password,
    public readonly birthday,
    public readonly updatedAt,
  ) {
    super();
  }
}
