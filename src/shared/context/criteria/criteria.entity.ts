export interface IOrder {
  field: string;
  direction: 'ASC' | 'DESC' | 'NONE';
}

export class Criteria {
  readonly filters: Record<string, any>;
  readonly orders: IOrder[];
  readonly limit?: number;
  readonly offset?: number;

  constructor(
    filters: Record<string, any> = {},
    orders: IOrder[] = [],
    limit?: number,
    offset?: number,
  ) {
    this.filters = filters;
    this.orders = orders;
    this.limit = limit;
    this.offset = offset;
  }
}
