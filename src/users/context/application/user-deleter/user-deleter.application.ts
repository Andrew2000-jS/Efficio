import { Injectable } from '@shared/utils';
import { UserNotFoundException, UserRepository } from '../../domain';
import { ApiResponse, Criteria } from '@shared/context';
import { errorHanlder } from '@shared/context/exceptions';

@Injectable()
export class UserDeleter {
  constructor(private readonly repository: UserRepository) {}

  async run(id: string): Promise<ApiResponse<null>> {
    try {
      const criteria = new Criteria({ id });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) throw new UserNotFoundException();

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
