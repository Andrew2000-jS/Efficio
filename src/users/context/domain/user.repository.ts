import { User, UserPrimitives } from './user.entity';

export interface UserRepository {
  create: (user: UserPrimitives) => Promise<void>;
  update: (id: string, user: Partial<UserPrimitives>) => Promise<void>;
  delete: (id: string) => Promise<void>;
  match: (id: string) => Promise<User[]>;
}
