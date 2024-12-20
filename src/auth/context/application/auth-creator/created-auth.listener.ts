import { IEventHandler } from '@shared/context';
import { EventHandler, UserCreatedEvent } from '@shared/context/domain/events';
import { AuthCreator } from './auth-creator.application';
import { AuthPrimitivesWithoutMetadata } from '../../domain/auth.entity';
import { Injectable } from '@shared/utils';

@Injectable()
@EventHandler(UserCreatedEvent)
export class CreatedAuthListener implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly authCreator: AuthCreator) {}

  async handle(event: UserCreatedEvent) {
    return await this.authCreator.run(this.adapter(event));
  }

  private adapter(event: UserCreatedEvent): AuthPrimitivesWithoutMetadata {
    return {
      userId: event.userId,
      email: event.email,
      password: event.password,
      token: null,
    };
  }
}
