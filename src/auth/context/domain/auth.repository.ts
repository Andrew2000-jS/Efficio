import { Criteria } from '@shared/context';
import { AuthPrimitives, AuthPrimitivesWithoutMetadata } from './auth.entity';

export abstract class AuthRepository {
  abstract create(
    auth: AuthPrimitivesWithoutMetadata,
    userId: string,
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, auth: Partial<AuthPrimitives>): Promise<void>;
  abstract match(criteria: Criteria): Promise<AuthPrimitives[]>;
}
