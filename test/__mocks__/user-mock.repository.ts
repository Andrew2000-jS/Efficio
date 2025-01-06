import { Criteria } from '@shared/context';
import { Injectable } from '@shared/utils';
import {
  UserEmail,
  UserLastName,
  UserName,
  UserPrimitives,
  UserRepository,
} from '@users/context/domain';

@Injectable()
export class UserMockRepository extends UserRepository {
  private createMock: jest.Mock;
  private updateMock: jest.Mock;
  private deleteMock: jest.Mock;

  private users: UserPrimitives[] = [];

  constructor() {
    super();
    this.createMock = jest.fn();
    this.updateMock = jest.fn();
    this.deleteMock = jest.fn();
  }

  async create(newUser: UserPrimitives): Promise<void> {
    this.users.push(newUser);
    this.createMock(newUser);
  }

  async update(id: string, data: Partial<UserPrimitives>): Promise<void> {
    this.updateMock(id, data);
  }

  async delete(id: string): Promise<void> {
    this.deleteMock(id);
  }

  async match(criteria: Criteria): Promise<UserPrimitives[]> {
    const criteriaFilters = criteria.filters;
    return this.users.filter((user) => {
      return Object.entries(criteriaFilters).every(
        ([key, value]) => user[key] === value,
      );
    });
  }

  assertUpdateHaveBeenCalledWith(id: string, data: Partial<UserPrimitives>) {
    expect(this.updateMock).toHaveBeenCalledWith(
      id,
      expect.objectContaining({
        email: data.email,
      }),
    );
  }

  assertDeleteHaveBeenCalledWith(id: string) {
    expect(this.deleteMock).toHaveBeenCalledWith(id);
  }

  assertCreateHaveBeenCalledWith(user: UserPrimitives) {
    expect(this.createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: new UserName(user.name),
        lastName: new UserLastName(user.lastName),
        email: new UserEmail(user.email),
      }),
    );
  }
}
