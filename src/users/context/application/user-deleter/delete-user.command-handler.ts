import { CommandHandler, ICommandHandler } from '@shared/context';
import { DeleteUserCommand } from '../../domain/commands';
import { UserDeleter } from './user-deleter.application';
import { Injectable } from '@shared/utils';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(private readonly userDeleter: UserDeleter) {}

  async execute(command: DeleteUserCommand): Promise<any> {
    return await this.userDeleter.run(command.id);
  }
}
