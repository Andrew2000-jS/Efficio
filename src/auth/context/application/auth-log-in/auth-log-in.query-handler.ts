import { IQueryHandler, QueryHandler } from '@shared/context';
import { Injectable } from '@shared/utils';
import { LoginQuery } from '../../domain/queries';
import { AuthLogIn } from './auth-log-in.application';

@Injectable()
@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(private readonly login: AuthLogIn) {}

  async execute({ email, password, ctx }: LoginQuery): Promise<any> {
    return await this.login.run(email, password, ctx);
  }
}
