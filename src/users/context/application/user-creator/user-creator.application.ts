import { Injectable } from '@shared/utils';
import { ApiResponse, Criteria, errorHanlder } from '@shared/context';
import {
  User,
  UserAlreadyExistException,
  UserCreatedEvent,
  UserEmailNotValidException,
  UserLastNameNotValidException,
  UserNameNotValidException,
  UserPasswordNotValidException,
  UserPrimitives,
  UserPrimitivesWithoutMetadata,
  UserRepository,
} from '../../domain';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class UserCreator {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(
    data: UserPrimitivesWithoutMetadata,
  ): Promise<ApiResponse<UserPrimitives | null>> {
    try {
      const criteria = new Criteria({ email: data.email });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length >= 1) throw new UserAlreadyExistException();

      const user = User.create(data).toPrimitives();
      await this.repository.create(user);
      await this.eventBus.publish(
        new UserCreatedEvent(
          user.id,
          user.name,
          user.lastName,
          user.email,
          user.password,
          user.birthday,
          user.createdAt,
          user.updatedAt,
        ),
      );
      return {
        message: 'User created successfully',
        statusCode: 201,
        data: user,
      };
    } catch (error) {
      errorHanlder(error, [
        UserAlreadyExistException,
        UserNameNotValidException,
        UserLastNameNotValidException,
        UserPasswordNotValidException,
        UserEmailNotValidException,
      ]);
    }
  }
}
