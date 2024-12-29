import { AuthRepository } from '../../domain/auth.repository';
import {
  Auth,
  AuthPrimitives,
  AuthPrimitivesWithoutMetadata,
} from '../../domain/auth.entity';
import { ApiResponse, errorHanlder } from '@shared/context';
import { Injectable } from '@shared/utils';

@Injectable()
export class AuthCreator {
  constructor(private readonly repository: AuthRepository) {}

  async run(
    auth: AuthPrimitivesWithoutMetadata,
  ): Promise<ApiResponse<AuthPrimitives>> {
    try {
      const newAuth = Auth.create(auth).toPrimitives();
      await this.repository.create(newAuth);

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
