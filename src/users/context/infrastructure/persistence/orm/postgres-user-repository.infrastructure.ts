import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Criteria } from '@shared/context';
import { Injectable } from '@shared/utils';
import { User, UserPrimitives, UserRepository } from 'src/users/context/domain';
import { User as UserEntity } from './entities';
import { CriteriaTypeormConverter } from '@shared/context/criteria';

@Injectable()
export class PostgresUserRepository extends UserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<UserEntity>,
  ) {
    super();
  }

  async create(user: UserPrimitives): Promise<void> {
    const newUser = await this.repository.create(user);
    await this.repository.save(newUser);
  }

  async update(id: string, user: Partial<UserPrimitives>): Promise<void> {
    await this.repository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async match(criteria: Criteria): Promise<User[]> {
    const converter = CriteriaTypeormConverter.convert(criteria);
    const foundUsers = await this.repository.find(converter);
    return foundUsers.map((u) => User.fromPrimitives(u));
  }
}
