import {
  Auth,
  AuthPrimitives,
  AuthPrimitivesWithoutMetadata,
  AuthRepository,
} from '../../domain';
import { ApiResponse, errorHanlder } from '@shared/context';
import { Injectable } from '@shared/utils';

@Injectable()
export class AuthCreator {
  constructor(private readonly repository: AuthRepository) {}

  async run(
    auth: AuthPrimitivesWithoutMetadata,
    userId: string,
  ): Promise<ApiResponse<AuthPrimitives>> {
    try {
      const newAuth = Auth.create(auth).toPrimitives();
      await this.repository.create(newAuth, userId);

      return {
        message: 'Authentication record created successfully.',
        statusCode: 200,
        data: newAuth,
      };
    } catch (error) {
      errorHanlder(error, []);
    }
  }
}
