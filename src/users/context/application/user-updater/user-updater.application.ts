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
} from '../../domain';
import {
  ApiResponse,
  Criteria,
  errorHanlder,
  UserUpdatedEvent,
} from '@shared/context';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class UserUpdater {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async run(
    id: string,
    user: Partial<UserPrimitives>,
  ): Promise<ApiResponse<Partial<UserPrimitives> | null>> {
    try {
      const criteria = new Criteria({ id });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) throw new UserNotFoundException();

      const updatedUser = User.fromPatialPrimitives(user, foundUser[0]);
      const updatedUserPrimitives = updatedUser.toPrimitives();

      updatedUser.apply(
        new UserUpdatedEvent(
          id,
          id,
          updatedUserPrimitives.name,
          updatedUserPrimitives.lastName,
          updatedUserPrimitives.email,
          updatedUserPrimitives.password,
          updatedUserPrimitives.birthday,
          new Date(),
        ),
      );

      await this.repository.update(id, {
        ...updatedUserPrimitives,
        updatedAt: new Date(),
      });

      await this.eventPublisher.mergeObjectContext(updatedUser).commit();

      return {
        message: 'User updated successfully',
        statusCode: 200,
        data: updatedUserPrimitives,
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
