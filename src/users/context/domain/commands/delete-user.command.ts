import { Command } from '@shared/context';

export class DeleteUserCommand extends Command {
  constructor(public readonly id: string) {
    super();
  }
}
