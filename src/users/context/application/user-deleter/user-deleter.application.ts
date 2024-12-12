import { Injectable } from '@shared/utils';
import { UserNotFoundException, UserRepository } from '../../domain';
import { ApiResponse, Criteria, errorHanlder } from '@shared/context';
import { UserDeletedEvent } from '../../domain/events';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class UserDeleter {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(id: string): Promise<ApiResponse<null>> {
    try {
      const criteria = new Criteria({ id });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) throw new UserNotFoundException();

      await this.eventBus.publish(new UserDeletedEvent(id));
      await this.repository.delete(id);
      return {
        message: 'User deleted successfully',
        statusCode: 204,
        data: null,
      };
    } catch (error) {
      errorHanlder(error, [UserNotFoundException]);
    }
  }
}
