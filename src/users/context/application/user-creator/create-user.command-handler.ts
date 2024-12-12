import { CommandHandler, ICommandHandler } from '@shared/context';
import { CreateUserCommand } from '../../domain/commands';
import { UserCreator } from './user-creator.application';
import { Injectable } from '@shared/utils';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHanlder
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly userCreator: UserCreator) {}

  async execute(command: CreateUserCommand): Promise<any> {
    return await this.userCreator.run(command);
  }
}
