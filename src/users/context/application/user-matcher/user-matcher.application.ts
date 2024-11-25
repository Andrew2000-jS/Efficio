import { Injectable } from '@shared/utils';
import { User, UserRepository } from '../../domain';
import { ApiResponse, Criteria } from '@shared/context';

@Injectable()
export class UserMatcher {
  constructor(private readonly repository: UserRepository) {}

  async run(criteria: Criteria): Promise<ApiResponse<User[] | []>> {
    try {
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 0) {
        return {
          message: 'User not found!',
          statusCode: 404,
          data: [],
        };
      }

      return {
        message: 'Found users',
        statusCode: 200,
        data: foundUser,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Something was wrong',
        statusCode: 500,
        data: [],
      };
    }
  }
}
