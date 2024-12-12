import { CommandHandler, ICommandHandler } from '@shared/context';
import { UpdateUserCommand } from '../../domain/commands';
import { UserUpdater } from './user-updater.application';
import { Injectable } from '@shared/utils';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(private readonly userUpdater: UserUpdater) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    return await this.userUpdater.run(command.id, command);
  }
}
