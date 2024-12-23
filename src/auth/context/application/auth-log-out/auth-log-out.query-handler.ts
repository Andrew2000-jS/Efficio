import { IQueryHandler, QueryHandler } from '@shared/context';
import { Injectable } from '@shared/utils';
import { LogOutQuery } from '../../domain/queries';
import { AuthLogOut } from './auth-log-out.application';

@Injectable()
@QueryHandler(LogOutQuery)
export class LogOutQueryHandler implements IQueryHandler<LogOutQuery> {
  constructor(private readonly logOut: AuthLogOut) {}

  async execute({ id }: LogOutQuery): Promise<any> {
    return await this.logOut.run(id);
  }
}
