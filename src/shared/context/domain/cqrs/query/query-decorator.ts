import { QueryHandler as NestJsQueryHandler } from '@nestjs/cqrs';
import { Query } from './query';

export const QueryHandler = (query: Query) => {
  return NestJsQueryHandler(query);
};
