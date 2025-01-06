import { Criteria } from '@shared/context';
import { Injectable } from '@shared/utils';
import {
  AuthPrimitivesWithoutMetadata,
  AuthPrimitives,
  AuthRepository,
  AuthEmail,
} from '@auth/context/domain';

@Injectable()
export class AuthMockRepository extends AuthRepository {
  private createMock: jest.Mock;
  private updateMock: jest.Mock;
  private deleteMock: jest.Mock;

  private sessions: AuthPrimitives[] = [];

  constructor() {
    super();
    this.createMock = jest.fn();
    this.updateMock = jest.fn();
    this.deleteMock = jest.fn();
  }

  async create(auth: AuthPrimitivesWithoutMetadata): Promise<void> {
    this.sessions.push(auth as AuthPrimitives);
    this.createMock(auth);
  }

  async delete(id: string): Promise<void> {
    this.deleteMock(id);
  }

  async update(id: string, auth: Partial<AuthPrimitives>): Promise<void> {
    this.updateMock(id, auth);
  }

  async match(criteria: Criteria): Promise<AuthPrimitives[]> {
    return this.sessions.filter((session) => {
      return Object.entries(criteria.filters).every(
        ([key, value]) => session[key] === value,
      );
    });
  }

  assertUpdateHaveBeenCalledWith(id: string, data: Partial<AuthPrimitives>) {
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

  assertCreateHaveBeenCalledWith(user: AuthPrimitives) {
    expect(this.createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: new AuthEmail(user.email),
      }),
    );
  }
}
