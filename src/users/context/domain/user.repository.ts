import { Criteria } from '@shared/context';
import { UserPrimitives, UserPrimitivesWithoutMetadata } from './user.entity';

export abstract class UserRepository {
  abstract create(user: UserPrimitivesWithoutMetadata): Promise<void>;
  abstract update(id: string, user: Partial<UserPrimitives>): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract match(criteria: Criteria): Promise<UserPrimitives[]>;
}
