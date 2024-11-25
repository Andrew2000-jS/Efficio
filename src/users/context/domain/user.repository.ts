import { Criteria } from '@shared/context';
import { User, UserPrimitives } from './user.entity';

export abstract class UserRepository {
  abstract create(user: UserPrimitives): Promise<void>;
  abstract update(id: string, user: Partial<UserPrimitives>): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract match(criteria: Criteria): Promise<User[]>;
}
