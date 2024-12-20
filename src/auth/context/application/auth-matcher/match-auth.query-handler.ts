import { IQueryHandler, QueryHandler } from '@shared/context';
import { Injectable } from '@shared/utils';
import { MatchAuthQuery } from '../../domain/queries';
import { AuthMatcher } from './auth-matcher.application';

@Injectable()
@QueryHandler(MatchAuthQuery)
export class MatchAuthQueryHandler implements IQueryHandler<MatchAuthQuery> {
  constructor(private readonly authMatcher: AuthMatcher) {}

  async execute({ criteria }: MatchAuthQuery): Promise<any> {
    return await this.authMatcher.run(criteria);
  }
}
