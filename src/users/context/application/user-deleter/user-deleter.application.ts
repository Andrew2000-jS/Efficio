import { Injectable } from '@shared/utils';
import { UserNotFoundException, UserRepository } from '../../domain';
import {
  ApiResponse,
  Criteria,
  errorHanlder,
  UserDeletedEvent,
} from '@shared/context';
import { EventBus } from '@nestjs/cqrs';
import { SendEmail } from '@shared/modules';

@Injectable()
export class UserDeleter {
  constructor(
    private readonly repository: UserRepository,
    private readonly sendEmail: SendEmail,
    private readonly eventBus: EventBus,
  ) {}

  async run(id: string): Promise<ApiResponse<null>> {
    try {
      const criteria = new Criteria({ id });
      const foundUser = await this.repository.match(criteria);

      if (foundUser.length < 1) throw new UserNotFoundException();

      await this.eventBus.publish(new UserDeletedEvent(id));
      await this.repository.delete(id);
      await this.sendEmail.run(
        process.env.EMAIL_USERNAME,
        foundUser[0].email,
        'Account Deletion Notification',
        `Hi ${foundUser[0].name}, 
        We want to inform you that your account has been successfully deleted from our platform. If you have any questions or believe this was done in error, please don't hesitate to contact us.

        Best regards,  
        Test.inc`,
      );
      return {
        message: 'User deleted successfully',
        statusCode: 200,
        data: null,
      };
    } catch (error) {
      errorHanlder(error, [UserNotFoundException]);
    }
  }
}
