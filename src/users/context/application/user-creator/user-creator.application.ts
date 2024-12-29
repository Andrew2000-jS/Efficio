import { Injectable } from '@shared/utils';
import {
  ApiResponse,
  Criteria,
  errorHanlder,
  UserCreatedEvent,
} from '@shared/context';
import {
  User,
  UserAlreadyExistException,
  UserEmailNotValidException,
  UserLastNameNotValidException,
  UserNameNotValidException,
  UserPasswordNotValidException,
  UserPrimitives,
  UserPrimitivesWithoutMetadata,
  UserRepository,
} from '../../domain';
import { EventPublisher } from '@nestjs/cqrs';
import { SendEmail } from '@shared/modules/notification/application';

@Injectable()
export class UserCreator {
  constructor(
    private readonly repository: UserRepository,
    private readonly sendEmail: SendEmail,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async run(
    data: UserPrimitivesWithoutMetadata,
  ): Promise<ApiResponse<UserPrimitives | null>> {
    try {
      const criteria = new Criteria({ email: data.email });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length >= 1) throw new UserAlreadyExistException();

      const user = User.create(data);
      const userPrimitives = user.toPrimitives();

      await this.repository.create(userPrimitives);
      await this.eventPublisher.mergeObjectContext(user).commit();
      await this.sendEmail.run(
        process.env.EMAIL_USERNAME,
        userPrimitives.email,
        'User Created Successfully',
        `Hi ${userPrimitives.name}, welcome to our platform! We're glad to have you here.`,
      );

      return {
        message: 'User created successfully',
        statusCode: 201,
        data: userPrimitives,
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
