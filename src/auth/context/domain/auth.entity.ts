import { AggregateRoot, CreatedAt, UpdatedAt } from '@shared/context';
import { AuthEmail, AuthId, AuthPassword } from './value-object';

export interface AuthPrimitives {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthPrimitivesWithoutMetadata = Omit<
  AuthPrimitives,
  'id' | 'createdAt' | 'updatedAt'
>;

export class Auth extends AggregateRoot {
  constructor(
    private readonly id: AuthId,
    private readonly email: AuthEmail,
    private readonly password: AuthPassword,
    private readonly createdAt: CreatedAt,
    private readonly updatedAt: UpdatedAt,
  ) {
    super();
  }

  static create(plainData: AuthPrimitivesWithoutMetadata): Auth {
    return new Auth(
      AuthId.generate(),
      new AuthEmail(plainData.email),
      new AuthPassword(plainData.password),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );
  }

  static fromPrimitives(plainData: AuthPrimitives): Auth {
    return new Auth(
      new AuthId(plainData.id),
      new AuthEmail(plainData.email),
      new AuthPassword(plainData.password),
      new CreatedAt(plainData.createdAt),
      new UpdatedAt(plainData.updatedAt),
    );
  }

  toPrimitives(): AuthPrimitives {
    return {
      id: this.id.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }
}
