import { InjectRepository } from '@nestjs/typeorm';
import { Criteria, CriteriaTypeormConverter } from '@shared/context';
import { Injectable } from '@shared/utils';
import {
  AuthPrimitivesWithoutMetadata,
  AuthPrimitives,
  Auth,
  AuthRepository,
} from '@auth/context/domain';
import { Repository } from 'typeorm';
import { Auth as AuthEntity } from './entities';

@Injectable()
export class PostgresAuthRepository extends AuthRepository {
  constructor(
    @InjectRepository(Auth)
    private readonly repository: Repository<AuthEntity>,
  ) {
    super();
  }

  async create(auth: AuthPrimitivesWithoutMetadata): Promise<void> {
    const newAuth = await this.repository.create(auth);
    await this.repository.save({ ...newAuth, user: { id: auth.userId } });
  }
  async delete(userId: string): Promise<void> {
    await this.repository.delete({ user: { id: userId } });
  }

  async update(userId: string, auth: Partial<AuthPrimitives>): Promise<void> {
    await this.repository.update({ user: { id: userId } }, auth);
  }

  async match(criteria: Criteria): Promise<AuthPrimitives[]> {
    const converter = CriteriaTypeormConverter.convert(criteria);
    const foundAuths = await this.repository.find(converter);
    return foundAuths;
  }
}
