import { IQueryHandler as NestJsIQueryHandler } from '@nestjs/cqrs';
import { Query } from './query';

export interface IQueryHandler<T extends Query>
  extends NestJsIQueryHandler<T> {}
