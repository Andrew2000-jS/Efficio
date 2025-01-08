import { AggregateRoot, CreatedAt, UpdatedAt } from '@shared/context';
import { AuthId, AuthOtp, AuthToken, AuthUser } from './value-object';

export interface AuthPrimitives {
  id: string;
  token: string | null;
  otpCode: string | null;
  user: Record<string, any>;
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
    private readonly token: AuthToken,
    private readonly otpCode: AuthOtp,
    private readonly user: AuthUser,
    private readonly createdAt: CreatedAt,
    private readonly updatedAt: UpdatedAt,
  ) {
    super();
  }

  static create(plainData: AuthPrimitivesWithoutMetadata): Auth {
    return new Auth(
      AuthId.generate(),
      new AuthToken(plainData.token),
      new AuthOtp(null),
      new AuthUser(plainData.user),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );
  }

  static fromPrimitives(plainData: AuthPrimitives): Auth {
    return new Auth(
      new AuthId(plainData.id),
      new AuthToken(plainData.token),
      new AuthOtp(plainData.otpCode),
      new AuthUser(plainData.user),
      new CreatedAt(plainData.createdAt),
      new UpdatedAt(plainData.updatedAt),
    );
  }

  toPrimitives(): AuthPrimitives {
    return {
      id: this.id.getValue(),
      token: this.token.getValue(),
      otpCode: this.otpCode.getValue(),
      user: this.user,
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }
}
