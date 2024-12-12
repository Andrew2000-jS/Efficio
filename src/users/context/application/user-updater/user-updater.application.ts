import { Injectable } from '@shared/utils';
import {
  User,
  UserEmailNotValidException,
  UserLastNameNotValidException,
  UserNameNotValidException,
  UserNotFoundException,
  UserPasswordNotValidException,
  UserPrimitives,
  UserRepository,
  UserUpdated,
} from '../../domain';
import { ApiResponse, Criteria, errorHanlder } from '@shared/context';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class UserUpdater {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(
    id: string,
    user: Partial<UserPrimitives>,
  ): Promise<ApiResponse<Partial<UserPrimitives> | null>> {
    try {
      const criteria = new Criteria({ id });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) throw new UserNotFoundException();

      const updatedUser = User.fromPatialPrimitives(
        user,
        foundUser[0],
      ).toPrimitives();

      await this.eventBus.publish(
        new UserUpdated(
          id,
          updatedUser.name,
          updatedUser.lastName,
          updatedUser.email,
          updatedUser.password,
          updatedUser.birthday,
          new Date(),
        ),
      );
      await this.repository.update(id, {
        ...updatedUser,
        updatedAt: new Date(),
      });
      return {
        message: 'User updated successfully',
        statusCode: 200,
        data: updatedUser,
      };
    } catch (error) {
      errorHanlder(error, [
        UserNotFoundException,
        UserNameNotValidException,
        UserLastNameNotValidException,
        UserPasswordNotValidException,
        UserEmailNotValidException,
      ]);
    }
  }
}
