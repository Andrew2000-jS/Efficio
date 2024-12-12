import { Query } from './query';

export class QueryNotRegisteredException extends Error {
  constructor(query: Query) {
    super(`This query ${query.constructor.name} hasn't a handler associated`);
  }
}
