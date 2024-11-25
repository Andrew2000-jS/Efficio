import { Injectable } from '@shared/utils';
import { UserRepository } from '../../domain';
import { ApiResponse, Criteria } from '@shared/context';

@Injectable()
export class UserDeleter {
  constructor(private readonly repository: UserRepository) {}

  async run(id: string): Promise<ApiResponse<null>> {
    try {
      const criteria = new Criteria({ id });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) {
        return {
          message: 'User not found!',
          statusCode: 404,
          data: null,
        };
      }
      await this.repository.delete(id);
      return {
        message: 'User deleted successfully',
        statusCode: 204,
        data: null,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Something was wrong',
        statusCode: 500,
        data: null,
      };
    }
  }
}
