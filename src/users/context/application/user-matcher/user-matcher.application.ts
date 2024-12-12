import { Injectable } from '@shared/utils';
import {
  User,
  UserMatched,
  UserPrimitives,
  UserRepository,
} from '../../domain';
import { ApiResponse, Criteria } from '@shared/context';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class UserMatcher {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(criteria: Criteria): Promise<ApiResponse<UserPrimitives[] | []>> {
    try {
      const foundUser = await this.repository.match(criteria);
      await this.eventBus.publish(new UserMatched(criteria));
      return {
        message: 'Search results',
        statusCode: 200,
        data: foundUser,
      };
    } catch (error) {
      return {
        message: 'Something was wrong',
        statusCode: 500,
        data: [],
      };
    }
  }
}
