import { Criteria } from '@shared/context';
import { AuthPrimitives, AuthPrimitivesWithoutMetadata } from './auth.entity';

export abstract class AuthRepository {
  abstract create(auth: AuthPrimitivesWithoutMetadata): Promise<void>;
  abstract delete(userId: string): Promise<void>;
  abstract update(userId: string, auth: Partial<AuthPrimitives>): Promise<void>;
  abstract match(criteria: Criteria): Promise<AuthPrimitives[]>;
}
