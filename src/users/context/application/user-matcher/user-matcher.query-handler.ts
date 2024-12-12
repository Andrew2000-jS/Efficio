import { ApiResponse, IQueryHandler, QueryHandler } from '@shared/context';
import { UserMatched, UserPrimitives } from '../../domain';
import { UserMatcher } from './user-matcher.application';
import { Injectable } from '@shared/utils';

@Injectable()
@QueryHandler(UserMatched)
export class UserMatcherQueryHandler implements IQueryHandler<UserMatched> {
  constructor(private readonly userMatcher: UserMatcher) {}

  async execute({
    criteria,
  }: UserMatched): Promise<ApiResponse<UserPrimitives[] | []>> {
    return await this.userMatcher.run(criteria);
  }
}
