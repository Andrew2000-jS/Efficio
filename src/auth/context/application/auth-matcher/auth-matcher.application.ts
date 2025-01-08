import { Injectable } from '@shared/utils';
import { AuthRepository } from '../../domain/auth.repository';
import { ApiResponse, Criteria } from '@shared/context';
import { AuthPrimitives } from '../../domain/auth.entity';

@Injectable()
export class AuthMatcher {
  constructor(private readonly repository: AuthRepository) {}

  async run(criteria: Criteria): Promise<ApiResponse<AuthPrimitives[]>> {
    try {
      const foundAuth = await this.repository.match(criteria);
      return {
        message: 'Search results',
        statusCode: 200,
        data: foundAuth,
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
