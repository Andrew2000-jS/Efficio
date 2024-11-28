import { CreatedAt, UpdatedAt } from '@shared/context';
import {
  UserBirthday,
  UserEmail,
  UserId,
  UserLastName,
  UserName,
  UserPassword,
} from './value-object';

export interface UserPrimitives {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserPrimitivesWithoutMetadata = Omit<
  UserPrimitives,
  'id' | 'createdAt' | 'updatedAt'
>;

export class User {
  constructor(
    private readonly id: UserId,
    private readonly name: UserName,
    private readonly lastName: UserLastName,
    private readonly email: UserEmail,
    private readonly password: UserPassword,
    private readonly birthday: UserBirthday,
    private readonly createdAt: CreatedAt,
    private readonly updatedAt: UpdatedAt,
  ) {}

  static create(data: UserPrimitivesWithoutMetadata): User {
    return new User(
      UserId.generate(),
      new UserName(data.name),
      new UserLastName(data.lastName),
      new UserEmail(data.email),
      new UserPassword(data.password),
      new UserBirthday(data.birthday),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );
  }

  static fromPrimitives(plainData: UserPrimitives): User {
    return new User(
      new UserId(plainData.id),
      new UserName(plainData.name),
      new UserLastName(plainData.lastName),
      new UserEmail(plainData.email),
      new UserPassword(plainData.password),
      new UserBirthday(plainData.birthday),
      new CreatedAt(plainData.createdAt),
      new UpdatedAt(plainData.updatedAt),
    );
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      lastName: this.lastName.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      birthday: this.birthday.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }
}
