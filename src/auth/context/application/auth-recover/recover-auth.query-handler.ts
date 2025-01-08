import { QueryHandler } from '@nestjs/cqrs';
import { IQueryHandler } from '@shared/context';
import { Injectable } from '@shared/utils';
import { RecoverAuthQuery } from '../../domain/queries';
import { AuthRecover } from './auth-recover.application';

@Injectable()
@QueryHandler(RecoverAuthQuery)
export class RecoverAuthQueryHandler
  implements IQueryHandler<RecoverAuthQuery>
{
  constructor(private readonly authRecover: AuthRecover) {}

  async execute({ email }: RecoverAuthQuery): Promise<any> {
    return await this.authRecover.run(email);
  }
}
