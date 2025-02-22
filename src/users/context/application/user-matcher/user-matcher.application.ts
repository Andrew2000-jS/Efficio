import { Injectable } from '@shared/utils';
import { UserPrimitives, UserRepository } from '../../domain';
import { ApiResponse, Criteria } from '@shared/context';

@Injectable()
export class UserMatcher {
  constructor(private readonly repository: UserRepository) {}

  async run(criteria: Criteria): Promise<ApiResponse<UserPrimitives[]>> {
    try {
      const foundUser = await this.repository.match(criteria);
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
