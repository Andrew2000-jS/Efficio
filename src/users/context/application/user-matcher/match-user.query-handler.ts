import { ApiResponse, IQueryHandler, QueryHandler } from '@shared/context';
import { MatchUserQuery, UserPrimitives } from '../../domain';
import { UserMatcher } from './user-matcher.application';
import { Injectable } from '@shared/utils';

@Injectable()
@QueryHandler(MatchUserQuery)
export class MatcheUserQueryHandler implements IQueryHandler<MatchUserQuery> {
  constructor(private readonly userMatcher: UserMatcher) {}

  async execute({
    criteria,
  }: MatchUserQuery): Promise<ApiResponse<UserPrimitives[]>> {
    return await this.userMatcher.run(criteria);
  }
}
