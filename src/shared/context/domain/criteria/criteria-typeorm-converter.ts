import { Criteria } from './criteria.entity';

export interface IConverter {
  where: any;
  orderBy: any;
  take?: number;
  skip?: number;
}

export class CriteriaTypeormConverter {
  static convert(criteria: Criteria) {
    const typeOrmFilters = {};

    for (const [key, value] of Object.entries(criteria.filters)) {
      typeOrmFilters[key] = value;
    }

    const typeOrmOrders = criteria.orders.map((order) => ({
      [order.field]: order.direction.toLowerCase(),
    }));

    return {
      where: typeOrmFilters,
      orderBy: typeOrmOrders,
      take: criteria.limit,
      skip: criteria.offset,
    };
  }
}
