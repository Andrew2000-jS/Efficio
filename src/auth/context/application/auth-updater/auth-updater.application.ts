import { Injectable } from '@shared/utils';
import { AuthRepository } from '../../domain/auth.repository';
import { Criteria, errorHanlder } from '@shared/context';
import { AuthNotFoundException } from '../../domain/exceptions';
import { AuthPrimitives } from '../../domain/auth.entity';

@Injectable()
export class AuthUpdater {
  constructor(private readonly repository: AuthRepository) {}

  async run(id: string, updatedData: Partial<AuthPrimitives>) {
    try {
      const criteria = new Criteria({ user: { id } });
      const foundAuth = await this.repository.match(criteria);

      if (foundAuth.length < 0) throw new AuthNotFoundException();

      await this.repository.update(id, updatedData);
    } catch (error) {
      errorHanlder(error, [AuthNotFoundException]);
    }
  }
}
