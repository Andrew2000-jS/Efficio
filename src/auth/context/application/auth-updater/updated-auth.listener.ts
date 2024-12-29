import {
  errorHanlder,
  EventHandler,
  IEventHandler,
  UserUpdatedEvent,
} from '@shared/context';
import { Injectable } from '@shared/utils';
import { AuthUpdater } from './auth-updater.application';

@Injectable()
@EventHandler(UserUpdatedEvent)
export class UpdatedAuthListener implements IEventHandler<UserUpdatedEvent> {
  constructor(private readonly authUpdater: AuthUpdater) {}

  async handle(event: UserUpdatedEvent) {
    return await this.authUpdater.run(event.userId, this.adapter(event));
  }

  private adapter = (event: UserUpdatedEvent) => {
    return {
      id: event.id,
      email: event.email,
      password: event.password,
    };
  };
}
