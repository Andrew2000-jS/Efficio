import { IEventHandler } from '@shared/context';
import { EventHandler, UserDeletedEvent } from '@shared/context/domain/events';
import { Injectable } from '@shared/utils';
import { AuthDeleter } from './auth-deleter.application';

@Injectable()
@EventHandler(UserDeletedEvent)
export class DeletedAuthListener implements IEventHandler<UserDeletedEvent> {
  constructor(private readonly authDeleter: AuthDeleter) {}

  async handle({ id }: UserDeletedEvent) {
    return await this.authDeleter.run(id);
  }
}
