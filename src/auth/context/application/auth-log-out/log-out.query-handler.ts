import { IQueryHandler, QueryHandler } from '@shared/context';
import { Injectable } from '@shared/utils';
import { LogOutQuery } from '../../domain/queries';
import { LogOut } from './log-out.application';

@Injectable()
@QueryHandler(LogOutQuery)
export class LogOutQueryHandler implements IQueryHandler<LogOutQuery> {
  constructor(private readonly logOut: LogOut) {}

  async execute({ id }: LogOutQuery): Promise<any> {
    return await this.logOut.run(id);
  }
}
