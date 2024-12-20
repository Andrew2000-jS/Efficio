import { AuthRepository } from '../../domain/auth.repository';
import {
  Auth,
  AuthPrimitives,
  AuthPrimitivesWithoutMetadata,
} from '../../domain/auth.entity';
import { ApiResponse, errorHanlder } from '@shared/context';
import { Injectable } from '@shared/utils';
import { SendEmail } from '@shared/modules';

@Injectable()
export class AuthCreator {
  constructor(
    private readonly repository: AuthRepository,
    private readonly sendEmail: SendEmail,
  ) {}

  async run(
    auth: AuthPrimitivesWithoutMetadata,
  ): Promise<ApiResponse<AuthPrimitives>> {
    try {
      const newAuth = Auth.create(auth).toPrimitives();
      await this.repository.create(newAuth);
      await this.sendEmail.run(
        process.env.EMAIL_USERNAME,
        newAuth.email,
        'User Created Successfully',
        `Hi ${newAuth.email}, welcome to our platform! We're glad to have you here.`,
      );
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
