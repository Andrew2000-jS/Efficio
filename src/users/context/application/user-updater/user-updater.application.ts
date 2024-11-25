import { Injectable } from '@shared/utils';
import { UserPrimitives, UserRepository } from '../../domain';
import { ApiResponse, Criteria } from '@shared/context';

@Injectable()
export class UserUpdater {
  constructor(private readonly repository: UserRepository) {}

  async run(
    id: string,
    user: Partial<UserPrimitives>,
  ): Promise<ApiResponse<Partial<UserPrimitives> | null>> {
    try {
      const criteria = new Criteria({ id });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) {
        return {
          message: 'User not found',
          statusCode: 404,
          data: null,
        };
      }

      await this.repository.update(id, user);
    } catch (error) {
      return {
        message: 'Something was wrong',
        statusCode: 500,
        data: null,
      };
    }
  }
}
