import { ApiResponse, errorHanlder } from '@shared/context';
import { Injectable } from '@shared/utils';
import { AuthRepository, AuthNotFoundException } from '../../domain';

@Injectable()
export class AuthDeleter {
  constructor(private readonly repository: AuthRepository) {}

  async run(userId: string): Promise<ApiResponse<null>> {
    try {
      await this.repository.delete(userId);
      return {
        message: 'Authentication record deleted successfully.',
        statusCode: 200,
        data: null,
      };
    } catch (error) {
      errorHanlder(error, [AuthNotFoundException]);
    }
  }
}
