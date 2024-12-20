import { Injectable } from '@shared/utils';
import { AuthRepository } from '../../domain/auth.repository';
import { Criteria, errorHanlder } from '@shared/context';
import { AuthNotFoundException } from '../../domain/exceptions';
import { AuthPrimitives } from '../../domain/auth.entity';

@Injectable()
export class AuthUpdater {
  constructor(private readonly repository: AuthRepository) {}

  async run(userId: string, data: Partial<AuthPrimitives>) {
    try {
      const criteria = new Criteria({ userId });
      const foundAuth = await this.repository.match(criteria)[0];

      if (!foundAuth) throw new AuthNotFoundException();

      await this.repository.update(userId, data);
    } catch (error) {
      errorHanlder(error, [AuthNotFoundException]);
    }
  }
}
