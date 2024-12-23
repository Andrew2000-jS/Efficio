import { AggregateRoot, CreatedAt, UpdatedAt } from '@shared/context';
import {
  AuthEmail,
  AuthId,
  AuthOtp,
  AuthPassword,
  AuthToken,
  AuthUserId,
} from './value-object';

export interface AuthPrimitives {
  id: string;
  userId: string;
  email: string;
  password: string;
  token: string | null;
  otpCode: string | null;
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
    private readonly userId: AuthUserId,
    private readonly email: AuthEmail,
    private readonly password: AuthPassword,
    private readonly token: AuthToken,
    private readonly otpCode: AuthOtp,
    private readonly createdAt: CreatedAt,
    private readonly updatedAt: UpdatedAt,
  ) {
    super();
  }

  static create(plainData: AuthPrimitivesWithoutMetadata): Auth {
    return new Auth(
      AuthId.generate(),
      new AuthUserId(plainData.userId),
      new AuthEmail(plainData.email),
      new AuthPassword(plainData.password),
      new AuthToken(plainData.token),
      new AuthOtp(null),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );
  }

  static fromPrimitives(plainData: AuthPrimitives): Auth {
    return new Auth(
      new AuthId(plainData.id),
      new AuthUserId(plainData.userId),
      new AuthEmail(plainData.email),
      new AuthPassword(plainData.password),
      new AuthToken(plainData.token),
      new AuthOtp(plainData.otpCode),
      new CreatedAt(plainData.createdAt),
      new UpdatedAt(plainData.updatedAt),
    );
  }

  toPrimitives(): AuthPrimitives {
    return {
      id: this.id.getValue(),
      userId: this.userId.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      token: this.token.getValue(),
      otpCode: this.otpCode.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }
}
